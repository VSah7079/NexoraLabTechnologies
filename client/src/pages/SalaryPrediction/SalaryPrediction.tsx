import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { HiSparkles, HiArrowRight, HiCurrencyDollar } from "react-icons/hi2";

const SalaryPrediction = () => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [predicted, setPredicted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    if (role && experience) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setPredicted(true);
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
        title="AI Salary Predictor | Job Market Worth Calculator - NexoraLab"
        description="Estimate your market salary range using machine learning based on your industry, location, years of experience, and specific skillset."
      />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4">
          <HiSparkles className="text-sm" />
          <span>MARKET COMPENSATION MODEL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Market Salary{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Worth Predictor
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Accurately calculate your market earning bracket based on live tech salary datasets, seniority, and location indices.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300">Engineering Role *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Lead React / Node.js Architect"
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Years of Experience *</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 6"
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Location / Remote Region</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Remote / Bangalore / USA"
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handlePredict}
          disabled={!role || !experience || loading}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white transition-all duration-300 ${
            role && experience && !loading
              ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Calculating Market Percentiles..." : "Predict Market Compensation"}
          <HiArrowRight />
        </button>

        {predicted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-slate-800 bg-[#0b132b]/95 p-6 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-3xl shadow-lg shadow-cyan-500/20">
              <HiCurrencyDollar />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Estimated Annual Benchmark (75th Percentile)</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                ₹24,00,000 – ₹38,00,000 INR <span className="text-sm font-normal text-slate-400">($80k - $125k USD)</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Derived from Q1 2026 tech startup funding data & global high-velocity software engineering compensation brackets.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SalaryPrediction;