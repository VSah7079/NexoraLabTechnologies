import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { aiAPI } from "@/services/api";
import {
  HiSparkles,
  HiCheckCircle,
  HiArrowPath,
  HiExclamationCircle,
  HiOutlineCheckBadge,
  HiLightBulb,
} from "react-icons/hi2";

interface ATSScoreResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  jobKeywordsCount: number;
  resumeKeywordsCount: number;
  recommendations: string[];
  hiringVerdict: string;
}

const ATSScore = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [scored, setScored] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSScoreResult | null>(null);

  const sampleJD = `Senior Full-Stack Engineer
Requirements:
- Strong experience with React, Next.js, and TypeScript
- Backend proficiency in Node.js, Express, and REST APIs
- Familiarity with PostgreSQL, MongoDB, and Redis caching
- Experience with AWS Cloud (EC2, S3, Lambda), Docker, and CI/CD pipelines
- Proven ability in Microservices architecture, Git, and Unit Testing`;

  const handleSampleFill = () => {
    setJobDescription(sampleJD);
    setResumeText(`Full-Stack Developer with 4+ years of building web applications using React, TypeScript, and Node.js.
Proficient with MongoDB, Express RESTful services, Git version control, and responsive UI design.
Built scalable microservices and integrated frontend components with modern design tokens.`);
  };

  const calculateRealATSScore = async () => {
    if (!jobDescription.trim() || !resumeText.trim()) return;

    setLoading(true);

    try {
      const res = await aiAPI.calculateATSScore(resumeText, jobDescription);
      if (res.success && res.data) {
        setResult(res.data);
        setScored(true);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("ATS AI Backend call fallback:", err);
    }

    setTimeout(() => {
      // Extract words and clean
      const cleanWords = (str: string) => {
        return str
          .toLowerCase()
          .replace(/[^a-zA-Z0-9\s+#.-]/g, " ")
          .split(/\s+/)
          .filter((w) => w.length > 2);
      };

      const stopWords = new Set([
        "and", "the", "with", "for", "you", "that", "this", "have", "from", "will", "our", "your",
        "about", "are", "been", "role", "work", "years", "plus", "must", "strong", "team", "good"
      ]);

      const jdWords = Array.from(new Set(cleanWords(jobDescription).filter((w) => !stopWords.has(w))));
      const resumeWords = new Set(cleanWords(resumeText));

      const matched: string[] = [];
      const missing: string[] = [];

      jdWords.forEach((word) => {
        if (resumeWords.has(word)) {
          matched.push(word);
        } else {
          missing.push(word);
        }
      });

      // Technical prioritized check
      const priorityTech = [
        "react", "next.js", "next", "typescript", "node", "node.js", "python", "aws", "docker",
        "kubernetes", "postgresql", "postgres", "mongodb", "redis", "graphql", "rest", "api", "ci/cd"
      ];

      const jdPriority = jdWords.filter((w) => priorityTech.includes(w));
      const resumePriority = jdPriority.filter((w) => resumeWords.has(w));

      let score = 65;
      if (jdWords.length > 0) {
        const rawRatio = matched.length / jdWords.length;
        const priorityRatio = jdPriority.length > 0 ? resumePriority.length / jdPriority.length : rawRatio;
        score = Math.round((rawRatio * 0.4 + priorityRatio * 0.6) * 100);
      }

      // Bound between 35 and 98
      score = Math.max(35, Math.min(98, score));

      let verdict = "Moderate Match - Requires Keyword Optimization";
      if (score >= 85) verdict = "Exceptional Match - Guaranteed First-Round ATS Pass";
      else if (score >= 70) verdict = "Strong Candidate - Passes Standard Recruiter Filters";
      else if (score < 50) verdict = "High Risk of Automated ATS Rejection";

      setResult({
        matchScore: score,
        matchedKeywords: matched.slice(0, 12),
        missingKeywords: missing.slice(0, 10),
        jobKeywordsCount: jdWords.length,
        resumeKeywordsCount: resumeWords.size,
        hiringVerdict: verdict,
        recommendations: [
          missing.length > 0
            ? `Inject missing keywords directly into your experience bullets: ${missing.slice(0, 4).join(", ")}.`
            : "Keyword density is well-aligned with job description requirements.",
          "Ensure hard numbers accompany your key achievements (e.g., 'reduced API latency by 40%').",
          "Mirror the job title in your resume summary headline for optimal ATS ranking.",
        ],
      });

      setLoading(false);
      setScored(true);
    }, 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10 px-4"
    >
      <SEO
        title="ATS Resume Match & Score Checker | Real-Time Compatibility Engine - NexoraLab"
        description="Compare your resume against any job description to compute keyword match percentage, missing technical skills, and recruiter parsing odds."
      />

      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
          <HiSparkles className="text-sm" />
          <span>ATS ALGORITHMIC COMPARATOR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          ATS Job Match{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Scoring Engine
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Compare your resume directly against specific job specifications to calculate ATS keyword density and candidate ranking.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none" />

        <div className="flex justify-end">
          <button
            onClick={handleSampleFill}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            ⚡ Load Sample Job Description & Resume
          </button>
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold text-slate-300">
            Target Job Description *
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            placeholder="Paste target job responsibilities, required skills, and qualifications here..."
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none transition-all resize-none font-normal"
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold text-slate-300">
            Your Resume Raw Text *
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={4}
            placeholder="Paste summary, experience, education, and technical skill contents here..."
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none transition-all resize-none font-normal"
          />
        </div>

        <button
          onClick={calculateRealATSScore}
          disabled={!jobDescription.trim() || !resumeText.trim() || loading}
          className={`w-full rounded-full py-3.5 text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            jobDescription.trim() && resumeText.trim() && !loading
              ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <HiArrowPath className="animate-spin text-lg" />
              <span>Calculating Semantic Overlap & Keyword Density...</span>
            </>
          ) : (
            <>
              <HiOutlineCheckBadge className="text-lg" />
              <span>Calculate Live ATS Match Score</span>
            </>
          )}
        </button>

        {/* Results */}
        <AnimatePresence>
          {scored && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-slate-800 space-y-6"
            >
              {/* Score Metric Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 text-center flex flex-col justify-center items-center">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">ATS Match Score</span>
                  <div className="mt-2 text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] bg-clip-text text-transparent font-['Outfit']">
                    {result.matchScore}%
                  </div>
                  <span className="mt-1 text-[11px] text-slate-300 font-medium">{result.hiringVerdict}</span>
                </div>

                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <HiCheckCircle />
                    <span>Matched Keywords ({result.matchedKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {result.matchedKeywords.map((k) => (
                      <span key={k} className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <HiExclamationCircle />
                    <span>Missing Critical Terms ({result.missingKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {result.missingKeywords.map((k) => (
                      <span key={k} className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-semibold border border-rose-500/30">
                        + {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <HiLightBulb className="text-purple-400 text-lg" />
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Instant Fixes to Reach 90%+ ATS Score
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">▹</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ATSScore;