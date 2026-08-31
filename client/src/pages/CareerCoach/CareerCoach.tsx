import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";

const CareerCoach = () => {
  const [goal, setGoal] = useState("");
  const [coached, setCoached] = useState(false);

  const handleCoaching = () => {
    if (goal) {
      setCoached(true);
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
        title="AI Career Coach | Personalized Career Advice - NexoraLab"
        description="Chat with an AI-powered professional career coach to map your career paths, prepare for salary negotiations, and plan your career transitions."
      />
      <h1 className="text-3xl font-bold text-gray-900 text-center">AI Career Coach</h1>
      <p className="text-gray-500 text-center mt-2">
        Get personalized career guidance and roadmap
      </p>

      <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Your Career Goal</label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
            placeholder="Describe your career goals..."
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <button
          onClick={handleCoaching}
          disabled={!goal}
          className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
            goal
              ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/25 hover:-translate-y-1 hover:shadow-2xl"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Get Career Advice
        </button>

        {coached && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
          >
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-bold text-blue-800">🎯 Your Career Roadmap</h4>
              <ul className="mt-4 space-y-3 text-sm text-blue-700">
                <li>📚 Complete Full Stack Development course</li>
                <li>💼 Build 3 portfolio projects</li>
                <li>🔗 Network with industry professionals</li>
                <li>📝 Apply to 10 companies per week</li>
                <li>🎯 Target: Senior Developer in 2 years</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <p className="text-sm text-purple-600">💡 Recommended: Learn Cloud & DevOps skills</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CareerCoach;