import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { HiSparkles, HiArrowRight, HiMap } from "react-icons/hi2";

const SkillGap = () => {
  const [targetRole, setTargetRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (targetRole && currentSkills) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAnalyzed(true);
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
        title="AI Skill Gap Analyzer | Career Roadmap Tools - NexoraLab"
        description="Identify missing technical and soft skills for your target roles. Get personalized learning recommendations and action items to level up."
      />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4">
          <HiSparkles className="text-sm" />
          <span>SKILL GAP INTELLIGENCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Skill Gap{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            & Learning Roadmap
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Identify high-leverage technical proficiencies needed to transition into senior and staff engineering roles.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-5">
        <div>
          <label className="text-xs font-semibold text-slate-300">Target Aspirational Role *</label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Senior Cloud Architect / Staff AI Engineer"
            className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300">Current Technical Stack & Years of Experience *</label>
          <input
            type="text"
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            placeholder="e.g. React, Node.js, Express, MongoDB, 3 years"
            className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!targetRole || !currentSkills || loading}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white transition-all duration-300 ${
            targetRole && currentSkills && !loading
              ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Synthesizing Roadmap..." : "Analyze Skill Gaps"}
          <HiArrowRight />
        </button>

        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5">
              <p className="text-xs font-bold text-rose-400 uppercase tracking-wider">High-Priority Missing Capabilities</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Kubernetes Orchestration", "AWS ECS / Fargate", "Distributed Caching (Redis)", "System Design at Scale", "gRPC & Protobuf"].map((skill) => (
                  <span key={skill} className="rounded-full border border-rose-500/40 bg-rose-900/30 px-3 py-1 text-xs font-semibold text-rose-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-500/30 bg-[#0b132b]/95 p-6">
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <HiMap className="text-base" /> Accelerated 90-Day Transition Roadmap
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">1</span>
                  <span><strong>Month 1:</strong> Master Docker multi-stage builds and deploy auto-scaling Kubernetes clusters on AWS EKS.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">2</span>
                  <span><strong>Month 2:</strong> Implement Redis distributed locks, rate-limiters, and read-replica database failover patterns.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold">3</span>
                  <span><strong>Month 3:</strong> Design end-to-end event-driven microservices with Kafka & complete mock system design interviews.</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillGap;