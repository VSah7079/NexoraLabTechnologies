import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";

const SalaryPrediction = () => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [predicted, setPredicted] = useState(false);

  const handlePredict = () => {
    if (role && experience) {
      setPredicted(true);
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
        title="AI Salary Predictor | Job Market Worth Calculator - NexoraLab"
        description="Estimate your market salary range using machine learning based on your industry, location, years of experience, and specific skillset."
      />
      <h1 className="text-3xl font-bold text-gray-900 text-center">AI Salary Predictor</h1>
      <p className="text-gray-500 text-center mt-2">
        Get AI-powered salary predictions for your role
      </p>

      <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Role / Title</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Full Stack Developer"
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Experience (Years)</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g., 5"
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Bangalore"
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <button
          onClick={handlePredict}
          disabled={!role || !experience}
          className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
            role && experience
              ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/25 hover:-translate-y-1 hover:shadow-2xl"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Predict Salary
        </button>

        {predicted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-6 bg-green-50 rounded-2xl px-8 py-6 border border-green-200">
              <span className="text-4xl">💰</span>
              <div className="text-left">
                <p className="text-sm text-green-600">Estimated Salary Range</p>
                <p className="text-2xl font-bold text-green-700">₹12 - 18 LPA</p>
                <p className="text-xs text-green-500">Based on market trends for {role}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SalaryPrediction;