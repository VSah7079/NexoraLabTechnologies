import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";

const SkillGap = () => {
  const [targetRole, setTargetRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (targetRole && currentSkills) {
      setAnalyzed(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10"
    >
      <SEO
        title="AI Skill Gap Analyzer | Career Roadmap Tools - NexoraLab"
        description="Identify missing technical and soft skills for your target roles. Get personalized learning recommendations and action items to level up."
      />
      <h1 className="text-3xl font-bold text-gray-900 text-center">AI Skill Gap Analysis</h1>
      <p className="text-gray-500 text-center mt-2">
        Identify missing skills for your target role
      </p>

      <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Target Role</label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g., Full Stack Developer"
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Current Skills</label>
          <input
            type="text"
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            placeholder="React, Node.js, MongoDB"
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!targetRole || !currentSkills}
          className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
            targetRole && currentSkills
              ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/25 hover:-translate-y-1 hover:shadow-2xl"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Analyze Skill Gap
        </button>

        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
          >
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-sm text-red-600">Missing Skills</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Docker</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">AWS</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Redis</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm text-green-600">Learning Roadmap</p>
              <ul className="mt-2 space-y-2 text-sm text-green-700">
                <li>1️⃣ Learn Docker & Containerization</li>
                <li>2️⃣ Build Redis Project</li>
                <li>3️⃣ Deploy on AWS</li>
                <li>4️⃣ Practice System Design</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillGap;