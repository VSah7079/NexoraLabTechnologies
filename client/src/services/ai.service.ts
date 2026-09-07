import { aiAPI } from "./api";

export interface ResumeAnalysisResult {
  overallScore: number;
  wordCount: number;
  detectedRole: string;
  strengths: string[];
  criticalIssues: string[];
  keywordMatch: { name: string; found: boolean; impact: string }[];
  sectionAudit: { section: string; status: "good" | "warning" | "missing"; note: string }[];
  bulletRewrites: { original: string; improved: string; rationale: string }[];
}

export interface ATSScoreResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  jobKeywordsCount: number;
  resumeKeywordsCount: number;
  hiringVerdict: string;
  recommendations: string[];
}

export interface InterviewEvaluationResult {
  score: number;
  matchedCount: number;
  strengths: string[];
  missingPoints: string[];
  feedback: string;
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  focus: string;
  topics: string[];
  deliverable: string;
}

export interface SkillGapResult {
  matchPercentage: number;
  salaryCurrent: string;
  salaryTarget: string;
  criticalMissing: string[];
  recommendedSkills: string[];
  goodToHave: string[];
  phases: RoadmapPhase[];
  keyRecommendations: string[];
}

export interface SalaryPredictionResult {
  currency: string;
  estimatedRange: string;
  median: string;
  percentile25: string;
  percentile75: string;
  percentile90: string;
  marketDemand: "High" | "Very High" | "Moderate";
  topPayingSkills: string[];
  insights: string[];
}

export const aiService = {
  analyzeResume: async (text: string, role?: string): Promise<ResumeAnalysisResult> => {
    const res = await aiAPI.analyzeResume(text, role);
    return res.data;
  },

  calculateATSScore: async (resumeText: string, jobDescription: string): Promise<ATSScoreResult> => {
    const res = await aiAPI.calculateATSScore(resumeText, jobDescription);
    return res.data;
  },

  chatCareerCoach: async (message: string, history?: { sender: string; text: string }[]): Promise<string> => {
    const res = await aiAPI.chatCareerCoach(message, history);
    return res.data.text;
  },

  evaluateInterview: async (params: {
    question: string;
    idealAnswer?: string;
    userAnswer: string;
    topic?: string;
  }): Promise<InterviewEvaluationResult> => {
    const res = await aiAPI.evaluateInterview(params);
    return res.data;
  },

  benchmarkSkillGap: async (params: {
    currentRole?: string;
    targetRole: string;
    currentSkills: string;
    experienceYears?: string;
  }): Promise<SkillGapResult> => {
    const res = await aiAPI.benchmarkSkillGap(params);
    return res.data;
  },

  predictSalary: async (params: {
    role: string;
    experience: string;
    location?: string;
  }): Promise<SalaryPredictionResult> => {
    const res = await aiAPI.predictSalary(params);
    return res.data;
  },

  optimizeBullet: async (params: { text: string; context?: string }): Promise<{ improved: string; rationale: string }> => {
    const res = await aiAPI.optimizeBullet(params);
    return res.data;
  },
};

export default aiService;
