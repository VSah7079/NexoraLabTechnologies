import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SEO from "@/components/common/SEO";
import { aiAPI } from "@/services/api";
import {
  HiSparkles,
  HiArrowRight,
  HiArrowLeft,
  HiCheckCircle,
  HiArrowPath,
  HiClock,
  HiLightBulb,
  HiExclamationTriangle,
  HiTrophy,
} from "react-icons/hi2";

interface QuestionItem {
  id: number;
  question: string;
  topic: string;
  expectedKeywords: string[];
  idealAnswer: string;
}

const tracks: Record<string, { label: string; icon: string; questions: QuestionItem[] }> = {
  fullstack: {
    label: "Full-Stack & React/Node",
    icon: "⚛️",
    questions: [
      {
        id: 1,
        topic: "React 19 & Hydration",
        question:
          "Explain how React 19 concurrent features work, and how Server Components differ from traditional Client Component hydration under heavy traffic.",
        expectedKeywords: ["server components", "hydration", "bundle size", "streaming", "suspense", "concurrency", "dom"],
        idealAnswer:
          "React Server Components execute strictly on the server and emit a serialized virtual DOM stream without shipping runtime JavaScript to the browser, reducing bundle size. Traditional client hydration downloads the bundle and re-executes React to attach event listeners. React 19 concurrency uses non-blocking transitions to prioritize high-urgency user inputs while streaming async data chunks via Suspense.",
      },
      {
        id: 2,
        topic: "Distributed APIs & Rate Limiting",
        question:
          "How would you design a distributed rate limiter for a Node.js microservice handling 50,000 requests/second across multiple container replicas?",
        expectedKeywords: ["redis", "token bucket", "sliding window", "distributed", "atomic", "latency", "headers"],
        idealAnswer:
          "A distributed rate limiter should utilize Redis with a Sliding Window Log or Token Bucket algorithm using atomic Lua scripts to prevent race conditions across container replicas. Requests increment counters in Redis with sliding TTLs. If the threshold is exceeded, return 429 Too Many Requests with standard Retry-After and X-RateLimit headers.",
      },
      {
        id: 3,
        topic: "Database Optimization & Sharding",
        question:
          "Describe your strategy for scaling a PostgreSQL database that has exceeded 100 million rows and is experiencing read/write lock contention.",
        expectedKeywords: ["indexing", "read replicas", "sharding", "partitioning", "connection pooling", "pgbouncer", "wal"],
        idealAnswer:
          "1. Implement PgBouncer for lightweight connection pooling. 2. Implement horizontal table partitioning based on date/tenant ID. 3. Configure primary-replica streaming replication, routing all analytical reads to read replicas. 4. Audit slow queries using EXPLAIN ANALYZE, applying composite B-tree or BRIN indexes and partial indexes.",
      },
    ],
  },
  cloud: {
    label: "Cloud & DevOps Architecture",
    icon: "☁️",
    questions: [
      {
        id: 1,
        topic: "Zero-Downtime Deployment",
        question:
          "How do you implement a Zero-Downtime Blue/Green or Canary deployment pipeline on AWS using Docker, ECS/EKS, and Application Load Balancer?",
        expectedKeywords: ["blue/green", "canary", "alb", "health check", "rollback", "traffic", "target group"],
        idealAnswer:
          "We spin up a new Green target group alongside the existing Blue target group. The CI/CD pipeline triggers automated health checks. The ALB shifts 10% traffic (Canary) to monitor error rates and latency in CloudWatch. If error thresholds stay below 0.01%, traffic shifts 100% to Green, with automated instant rollback if anomalous 5xx spikes occur.",
      },
      {
        id: 2,
        topic: "High-Availability Infrastructure",
        question:
          "What strategies do you use to ensure 99.99% uptime for multi-region cloud workloads with automatic failover?",
        expectedKeywords: ["multi-region", "route 53", "failover", "replication", "active-active", "latency", "disaster recovery"],
        idealAnswer:
          "Deploy an Active-Active multi-region topology using Route 53 Latency & Health-Based DNS routing. Maintain cross-region global databases (e.g. AWS DynamoDB Global Tables or Aurora Global Database). Use automated health checks to reroute traffic to the healthy secondary region within 10 seconds of a primary zone outage.",
      },
    ],
  },
  ai_ml: {
    label: "AI Systems & LLM Engineering",
    icon: "🤖",
    questions: [
      {
        id: 1,
        topic: "RAG & Vector Retrieval",
        question:
          "Explain the architecture of a Retrieval-Augmented Generation (RAG) system with hybrid search, vector embeddings, and chunking strategies.",
        expectedKeywords: ["embeddings", "vector database", "chunking", "cosine similarity", "reranking", "context", "prompt"],
        idealAnswer:
          "A production RAG pipeline chunks source documents semantically (e.g., 512 tokens with 50-token overlap), generates vector embeddings via models like text-embedding-3-small, and stores them in a Vector DB (Pinecone/pgvector). Queries perform hybrid search (BM25 keyword + cosine vector similarity), re-rank the top 10 results with a Cohere re-ranker, and inject context into the LLM system prompt.",
      },
    ],
  },
};

interface AnswerEvaluation {
  score: number;
  matchedCount: number;
  strengths: string[];
  missingPoints: string[];
  feedback: string;
}

const Interview = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>("fullstack");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluations, setEvaluations] = useState<Record<number, AnswerEvaluation>>({});
  const [currentEval, setCurrentEval] = useState<AnswerEvaluation | null>(null);
  const [completed, setCompleted] = useState(false);

  // Timer
  useEffect(() => {
    let interval: any = null;
    if (sessionStarted && !completed) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStarted, completed]);

  const activeQuestions = tracks[selectedTrack]?.questions || tracks.fullstack.questions;
  const currentQ = activeQuestions[currentIndex];

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim()) return;

    setEvaluating(true);

    try {
      const res = await aiAPI.evaluateInterview({
        question: currentQ.question,
        idealAnswer: currentQ.idealAnswer,
        userAnswer: userAnswer.trim(),
        topic: currentQ.topic,
      });

      if (res.success && res.data) {
        const rawScore = res.data.score || 8.0;
        const normalizedScore =
          rawScore > 10 ? Math.round((rawScore / 10) * 10) / 10 : Math.round(rawScore * 10) / 10;

        const evalData: AnswerEvaluation = {
          score: Math.min(10, Math.max(1, normalizedScore)),
          matchedCount: res.data.matchedCount || currentQ.expectedKeywords.length,
          strengths: Array.isArray(res.data.strengths) && res.data.strengths.length > 0
            ? res.data.strengths
            : ["Clear concise framing."],
          missingPoints: Array.isArray(res.data.missingPoints) && res.data.missingPoints.length > 0
            ? res.data.missingPoints
            : ["Continue practicing detailed architectural depth."],
          feedback: res.data.feedback || "Good technical reasoning and structured delivery.",
        };

        setCurrentEval(evalData);
        setEvaluations((prev) => ({ ...prev, [currentQ.id]: evalData }));
        setEvaluating(false);
        return;
      }
    } catch (err) {
      console.warn("Interview evaluation live AI fallback:", err);
    }

    setTimeout(() => {
      const ansLower = userAnswer.toLowerCase();
      const expected = currentQ.expectedKeywords;
      const matched = expected.filter((k) => ansLower.includes(k.toLowerCase()));

      const matchRatio = matched.length / expected.length;
      const lengthBonus = Math.min(2.5, userAnswer.split(/\s+/).length / 30);
      const score = Math.round(Math.min(10, Math.max(4.5, matchRatio * 7 + lengthBonus + 1.5)) * 10) / 10;

      const evalData: AnswerEvaluation = {
        score,
        matchedCount: matched.length,
        strengths: [
          matched.length >= 3
            ? `Solid technical breadth: correctly incorporated ${matched.slice(0, 3).join(", ")}.`
            : "Direct structured response addressing the core prompt.",
          userAnswer.length > 150
            ? "Thorough architectural depth with concrete explanation."
            : "Clear concise framing.",
        ],
        missingPoints: expected
          .filter((k) => !matched.includes(k))
          .slice(0, 3)
          .map((k) => `Deepen understanding of "${k}" in context.`),
        feedback:
          score >= 8.5
            ? "🌟 Staff Engineer caliber answer. Demonstrates deep operational maturity."
            : score >= 7.0
            ? "✅ Solid Senior Developer answer with clear system reasoning."
            : "⚠️ Needs more depth on distributed tradeoffs, fault tolerance, and exact protocols.",
      };

      setCurrentEval(evalData);
      setEvaluations((prev) => ({ ...prev, [currentQ.id]: evalData }));
      setEvaluating(false);
    }, 800);
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer("");
      setCurrentEval(null);
    } else {
      setCompleted(true);
    }
  };

  const calculateOverallScore = () => {
    const scores = Object.values(evaluations).map((e) => e.score);
    if (scores.length === 0) return 8.2;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg * 10) / 10;
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <SEO
        title="AI Mock Technical Interview Studio | Real-Time Live Scoring - NexoraLab"
        description="Practice technical and architecture interview rounds with real-time scoring, keyword verification, and model ideal answers."
      />

      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
          <HiSparkles className="text-sm" />
          <span>AI TECHNICAL INTERVIEW SIMULATOR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Mock Technical{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Interview Studio
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Simulate realistic hiring rounds with real-time question evaluation, keyword grading, and model ideal answers.
        </p>
      </div>

      {!sessionStarted ? (
        /* Track Selection Screen */
        <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none" />

          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider text-center">
            Select an Interview Track:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(tracks).map(([key, track]) => (
              <button
                key={key}
                onClick={() => setSelectedTrack(key)}
                className={`p-6 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer ${
                  selectedTrack === key
                    ? "border-[#00D2FF] bg-[#0c1838] shadow-lg shadow-cyan-500/20 scale-105"
                    : "border-slate-800 bg-[#0a1128]/70 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span className="text-4xl">{track.icon}</span>
                <span className="font-bold text-sm text-white font-['Outfit']">{track.label}</span>
                <span className="text-[11px] text-slate-400">{track.questions.length} Scenario Questions</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSessionStarted(true);
              setSeconds(0);
              setCurrentIndex(0);
              setCompleted(false);
              setEvaluations({});
            }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Begin Real-Time Mock Interview</span>
            <HiArrowRight />
          </button>
        </div>
      ) : !completed ? (
        /* Active Interview Simulator Screen */
        <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none" />

          {/* Session Header Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs font-bold text-cyan-300">
                Question {currentIndex + 1} of {activeQuestions.length}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentQ.topic}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-[#0a1228] px-3 py-1.5 rounded-full border border-slate-800">
              <HiClock className="text-base" />
              <span>Session Time: {formatTimer(seconds)}</span>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c1630]">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              Interviewer Prompt
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1 leading-relaxed font-['Outfit']">
              "{currentQ.question}"
            </h3>
          </div>

          {/* User Answer Textarea */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span>Your Technical Explanation *</span>
              <span className="text-slate-500">
                {userAnswer.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              rows={5}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your structured answer here. Include architectural tradeoffs, protocols, edge cases, and performance considerations..."
              className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] p-4 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none resize-none font-normal"
            />
          </div>

          {/* Submit / Evaluate Button */}
          {!currentEval ? (
            <button
              onClick={handleEvaluateAnswer}
              disabled={!userAnswer.trim() || evaluating}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white transition-all cursor-pointer ${
                userAnswer.trim() && !evaluating
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 hover:scale-[1.01]"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              {evaluating ? (
                <>
                  <HiArrowPath className="animate-spin text-lg" />
                  <span>AI Grading Response & Analyzing Terminology...</span>
                </>
              ) : (
                <>
                  <HiSparkles />
                  <span>Submit Answer for Live AI Evaluation</span>
                </>
              )}
            </button>
          ) : (
            /* Live Evaluation Feedback Block */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 text-center flex flex-col justify-center items-center">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Question Score</span>
                  <p className="text-3xl font-black text-white font-['Outfit'] mt-1">{currentEval.score}/10</p>
                  <span className="text-[10px] text-slate-300 mt-0.5">{currentEval.feedback}</span>
                </div>

                <div className="sm:col-span-2 p-4 rounded-2xl border border-slate-800 bg-[#0a1128] space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Key Strengths Detected</span>
                  <ul className="text-xs text-slate-200 space-y-1">
                    {currentEval.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ideal Model Answer Accordion */}
              <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20 space-y-2">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
                  <HiLightBulb className="text-base" />
                  <span>Ideal Model Architecture Answer</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">{currentQ.idealAnswer}</p>
              </div>

              {/* Next Question / Finish Button */}
              <button
                onClick={handleNextQuestion}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <span>{currentIndex < activeQuestions.length - 1 ? "Proceed to Next Question" : "Complete Round & View Scorecard"}</span>
                <HiArrowRight />
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        /* Final Comprehensive Interview Scorecard */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-8 backdrop-blur-2xl shadow-2xl space-y-6 text-center"
        >
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-3xl text-white shadow-[0_0_25px_rgba(0,210,255,0.4)]">
              <HiTrophy />
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              Technical Interview Completed!
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
              Track: {tracks[selectedTrack]?.label} • Total Time: {formatTimer(seconds)}
            </p>
          </div>

          <div className="max-w-md mx-auto p-6 rounded-3xl border border-cyan-500/30 bg-cyan-950/20">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Overall Candidate Hiring Score
            </span>
            <div className="text-5xl font-black bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] bg-clip-text text-transparent font-['Outfit'] mt-2">
              {calculateOverallScore()}<span className="text-xl text-slate-400 font-normal">/10</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <span>Recommendation:</span>
              <span>{calculateOverallScore() >= 8.0 ? "STRONG HIRE" : "HIRE"}</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setSessionStarted(false);
                setCompleted(false);
                setCurrentIndex(0);
                setUserAnswer("");
                setCurrentEval(null);
                setEvaluations({});
              }}
              className="px-6 py-3 rounded-full bg-[#0a1228] border border-slate-700 text-slate-200 text-xs font-bold hover:border-cyan-400 transition-all cursor-pointer"
            >
              Start Another Interview Track
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Interview;