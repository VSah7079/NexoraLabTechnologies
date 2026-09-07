const express = require('express');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Helper to call Google Gemini Generative Language API
async function callGemini(prompt, systemInstruction = '') {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in backend/.env');
  }

  const models = ['gemini-2.5-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini model ${model} failed with ${response.status}: ${errorText}`);
        lastError = new Error(`Gemini API error (${response.status}): ${errorText}`);
        continue;
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
    } catch (err) {
      console.warn(`Error calling Gemini model ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini AI');
}

// Helper to extract JSON from Gemini markdown output
function extractJSON(text) {
  try {
    const clean = text.replace(/```json\s*([\s\S]*?)\s*```/i, '$1').replace(/```([\s\S]*?)```/i, '$1').trim();
    return JSON.parse(clean);
  } catch (err) {
    // Try to find the first '{' and last '}'
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      try {
        const sliced = text.slice(firstBrace, lastBrace + 1);
        return JSON.parse(sliced);
      } catch (innerErr) {
        throw new Error('Could not parse JSON response from AI: ' + text);
      }
    }
    throw new Error('Could not parse JSON response from AI: ' + text);
  }
}

// 1. Resume Analyzer
router.post('/analyze-resume', async (req, res) => {
  try {
    const { text, role } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Resume text is required' });
    }

    const systemPrompt = `You are a Principal Technical Recruiter and Executive ATS Resume Auditor at NexoraLab Technologies.
Analyze the provided resume thoroughly and return ONLY a valid JSON object without markdown fences, with this exact schema:
{
  "overallScore": number (50 to 98),
  "wordCount": number,
  "detectedRole": string,
  "strengths": string[] (3-4 bullet points),
  "criticalIssues": string[] (3-4 bullet points highlighting what is missing or weak),
  "keywordMatch": [
    { "name": string, "found": boolean, "impact": string }
  ] (6-8 industry core technologies/skills evaluated),
  "sectionAudit": [
    { "section": "Contact & Digital Presence", "status": "good"|"warning"|"missing", "note": string },
    { "section": "Technical Skill Matrix", "status": "good"|"warning"|"missing", "note": string },
    { "section": "Work Experience & Projects", "status": "good"|"warning"|"missing", "note": string },
    { "section": "Academic & Certifications", "status": "good"|"warning"|"missing", "note": string }
  ],
  "bulletRewrites": [
    { "original": string, "improved": string, "rationale": string }
  ] (2-3 concrete bullet points extracted and rewritten with action verbs, metrics, and technical depth)
}`;

    const prompt = `Resume Content:
"""
${text}
"""
${role ? `Target Role: ${role}` : ''}

Provide your in-depth technical analysis in JSON format.`;

    const aiResponse = await callGemini(prompt, systemPrompt);
    const result = extractJSON(aiResponse);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Resume Analyzer Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. ATS Score Matcher
router.post('/ats-score', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ success: false, message: 'Both resumeText and jobDescription are required' });
    }

    const systemPrompt = `You are an Advanced ATS (Applicant Tracking System) Parser & Semantic Matcher.
Compare the resume text with the Job Description and return ONLY a valid JSON object without markdown formatting:
{
  "matchScore": number (20 to 98),
  "matchedKeywords": string[] (10-15 matched skills/terms found in both),
  "missingKeywords": string[] (8-12 crucial skills/terms requested in the JD but absent or weakly represented in the resume),
  "jobKeywordsCount": number,
  "resumeKeywordsCount": number,
  "hiringVerdict": string (e.g. "Exceptional Match - Guaranteed ATS Pass" or "Strong Candidate - Passes Recruiter Filter" or "Moderate Match - Requires Keyword Optimization" or "High Risk of Rejection"),
  "recommendations": string[] (4-5 concrete, actionable bullet points to boost ATS score)
}`;

    const prompt = `JOB DESCRIPTION:
"""
${jobDescription}
"""

CANDIDATE RESUME:
"""
${resumeText}
"""

Evaluate ATS compatibility and output JSON.`;

    const aiResponse = await callGemini(prompt, systemPrompt);
    const result = extractJSON(aiResponse);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('ATS Score Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. AI Career Coach
router.post('/career-coach', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const systemPrompt = `You are the AI Executive Career Coach at NexoraLab Technologies, a premier software engineering & digital transformation firm.
Your role:
- Provide elite, high-leverage career advice for software developers, cloud architects, engineering leaders, and tech professionals.
- Give crisp, actionable frameworks, negotiation scripts with exact phrasing, system design roadmaps, and resume impact formulas.
- Format responses beautifully using Markdown headers (###), bold bullet points, and code/script blocks where appropriate.
- Keep tone professional, empowering, analytical, and highly practical.`;

    let conversationContext = '';
    if (Array.isArray(history) && history.length > 0) {
      conversationContext = history.slice(-6).map(m => `${m.sender === 'user' ? 'User' : 'Coach'}: ${m.text}`).join('\n\n') + '\n\n';
    }

    const prompt = `${conversationContext}User Query: ${message}\n\nCoach Response:`;

    const aiResponse = await callGemini(prompt, systemPrompt);

    res.json({
      success: true,
      data: {
        text: aiResponse
      }
    });
  } catch (err) {
    console.error('Career Coach Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. AI Mock Interview Answer Evaluation
router.post('/evaluate-interview', async (req, res) => {
  try {
    const { question, idealAnswer, userAnswer, topic } = req.body;
    if (!question || !userAnswer) {
      return res.status(400).json({ success: false, message: 'Question and userAnswer are required' });
    }

    const systemPrompt = `You are a Principal Interviewer & Technical Bar Raiser at NexoraLab Technologies.
Evaluate the candidate's answer against the technical question and benchmark standards. Return ONLY a valid JSON object without markdown formatting:
{
  "score": number (0 to 100),
  "matchedCount": number (how many critical concepts the candidate covered),
  "strengths": string[] (2-3 solid technical points the candidate demonstrated),
  "missingPoints": string[] (2-3 key technical concepts, nuances, or architectural trade-offs the candidate omitted),
  "feedback": string (2-3 paragraphs of constructive technical feedback and the ideal refinement)
}`;

    const prompt = `Topic: ${topic || 'Software Engineering'}
Question: "${question}"
${idealAnswer ? `Ideal Answer Benchmark: "${idealAnswer}"` : ''}

Candidate's Answer:
"${userAnswer}"

Evaluate candidate's technical response in JSON format.`;

    const aiResponse = await callGemini(prompt, systemPrompt);
    const result = extractJSON(aiResponse);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Interview Evaluation Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Skill Gap Benchmark & Career Roadmap
router.post('/skill-gap', async (req, res) => {
  try {
    const { currentRole, targetRole, currentSkills, experienceYears } = req.body;
    if (!targetRole || !currentSkills) {
      return res.status(400).json({ success: false, message: 'Target role and current skills are required' });
    }

    const systemPrompt = `You are a Principal Engineering Staffing Lead & Technical Skills Architect at NexoraLab Technologies.
Analyze the candidate's current skillset against the target role and generate a comprehensive 90-day upskilling roadmap. Return ONLY a valid JSON object without markdown formatting:
{
  "matchPercentage": number (35 to 90),
  "salaryCurrent": string (e.g. "₹12 - ₹18 LPA" or "$80k - $120k"),
  "salaryTarget": string (e.g. "₹32 - ₹48 LPA" or "$160k - $220k"),
  "criticalMissing": string[] (4-6 must-have core architectural/technical skills missing),
  "recommendedSkills": string[] (4-6 high-demand secondary skills),
  "goodToHave": string[] (3-4 nice-to-have tools/frameworks),
  "phases": [
    {
      "phase": "Month 1: [Phase Title]",
      "duration": "Weeks 1 - 4",
      "focus": string,
      "topics": string[] (4 bullet points),
      "deliverable": string (Concrete hands-on project proof of work)
    },
    {
      "phase": "Month 2: [Phase Title]",
      "duration": "Weeks 5 - 8",
      "focus": string,
      "topics": string[] (4 bullet points),
      "deliverable": string
    },
    {
      "phase": "Month 3: [Phase Title]",
      "duration": "Weeks 9 - 12",
      "focus": string,
      "topics": string[] (4 bullet points),
      "deliverable": string
    }
  ],
  "keyRecommendations": string[] (3-4 strategic career advice bullets)
}`;

    const prompt = `Current Role: ${currentRole || 'Software Engineer'}
Target Role: ${targetRole}
Current Skills: ${currentSkills}
Experience: ${experienceYears || '3'} years

Generate the technical skill gap analysis and 90-day roadmap in JSON format.`;

    const aiResponse = await callGemini(prompt, systemPrompt);
    const result = extractJSON(aiResponse);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Skill Gap Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. Salary Prediction
router.post('/salary-prediction', async (req, res) => {
  try {
    const { role, experience, location } = req.body;
    if (!role || !experience) {
      return res.status(400).json({ success: false, message: 'Role and experience are required' });
    }

    const systemPrompt = `You are a Global Compensation Intelligence Analyst at NexoraLab Technologies.
Calculate realistic market compensation estimates based on current tech industry hiring data. Return ONLY a valid JSON object without markdown formatting:
{
  "currency": string (e.g. "₹" or "$"),
  "estimatedRange": string (e.g. "₹24,00,000 - ₹34,00,000 / year" or "$140,000 - $185,000 / year"),
  "median": string (e.g. "₹28,50,000 / year"),
  "percentile25": string,
  "percentile75": string,
  "percentile90": string,
  "marketDemand": "High" | "Very High" | "Moderate",
  "topPayingSkills": string[] (5-6 top skills that add +20-40% compensation premium for this role),
  "insights": string[] (3-4 analytical hiring market insights)
}`;

    const prompt = `Role: ${role}
Experience: ${experience} years
Location / Market: ${location || 'India / Remote'}

Estimate compensation benchmarks in JSON format.`;

    const aiResponse = await callGemini(prompt, systemPrompt);
    const result = extractJSON(aiResponse);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Salary Prediction Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 7. Resume Summary & Bullet Enhancer
router.post('/optimize-bullet', async (req, res) => {
  try {
    const { text, context } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }

    const systemPrompt = `You are an Executive Resume Optimization Specialist at NexoraLab Technologies.
Enhance the given work experience bullet or project description using Google XYX formula: [Accomplished X, as measured by Y, by doing Z].
Output ONLY a JSON object:
{
  "improved": string (polished high-impact version with strong action verbs and quantified metrics),
  "rationale": string (brief explanation of why this version performs better with recruiters)
}`;

    const prompt = `Context/Role: ${context || 'Software Engineer'}\nOriginal Bullet: "${text}"`;
    const aiResponse = await callGemini(prompt, systemPrompt);
    const result = extractJSON(aiResponse);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Bullet Optimizer Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
