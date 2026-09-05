import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { HiSparkles, HiChatBubbleLeftRight, HiArrowRight } from "react-icons/hi2";

const CareerCoach = () => {
  const [goal, setGoal] = useState("");
  const [coached, setCoached] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCoaching = () => {
    if (goal) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCoached(true);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10 px-4"
    >
      <SEO
        title="AI Career Coach | Personalized Career Advice - NexoraLab"
        description="Chat with an AI-powered professional career coach to map your career paths, prepare for salary negotiations, and plan your career transitions."
      />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4">
          <HiSparkles className="text-sm" />
          <span>CAREER STRATEGY ADVISOR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Professional{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Career Coach
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Receive personalized engineering roadmap guidance, executive interview tactics, and promotion strategy.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-5">
        <div>
          <label className="text-xs sm:text-sm font-semibold text-slate-300">
            Your Career Objective or Transition Challenge *
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={4}
            placeholder="e.g., I have 4 years in frontend engineering with React and want to transition to a Principal Full-Stack / Staff Architect role at a global SaaS company..."
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none resize-none font-normal"
          />
        </div>

        <button
          onClick={handleCoaching}
          disabled={!goal || loading}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white transition-all duration-300 ${
            goal && !loading
              ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Synthesizing Strategic Guidance..." : "Get AI Career Strategy"}
          <HiArrowRight />
        </button>

        {coached && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            <div className="rounded-2xl border border-cyan-500/30 bg-[#0b132b]/95 p-6">
              <h4 className="font-bold text-white flex items-center gap-2 text-base">
                <HiChatBubbleLeftRight className="text-cyan-400" />
                Strategic Action Plan
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">▹</span>
                  <span><strong>Architectural Scope:</strong> Build end-to-end distributed system prototypes highlighting concurrency, message brokers, and DB sharding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">▹</span>
                  <span><strong>Executive Presence:</strong> Frame project achievements in terms of EBITDA impact, latency reductions, and infra cost savings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">▹</span>
                  <span><strong>Target Compensation:</strong> Benchmark against tier-1 remote compensation brackets ($140k - $190k USD equivalent).</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CareerCoach;