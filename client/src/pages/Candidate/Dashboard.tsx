import { motion } from "framer-motion";
import { HiBriefcase, HiChatBubbleLeftRight, HiTrophy, HiSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";

const CandidateDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Candidate Command Center</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Track your pipeline status, active interviews, and match scores
          </p>
        </div>
        <Link
          to="/candidate/jobs"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
        >
          <HiBriefcase className="text-sm" />
          <span>Explore Open Roles</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 backdrop-blur-xl shadow-xl hover:border-[#00D2FF]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Applications</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <HiBriefcase className="text-lg" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-white mt-3 font-['Outfit']">24</h3>
          <p className="text-xs text-cyan-400 mt-1">4 submitted this week</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 backdrop-blur-xl shadow-xl hover:border-[#00D2FF]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Interviews</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
              <HiChatBubbleLeftRight className="text-lg" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-white mt-3 font-['Outfit']">5</h3>
          <p className="text-xs text-amber-400 mt-1">Next: Senior Full-Stack at 2:00 PM</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 backdrop-blur-xl shadow-xl hover:border-[#00D2FF]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Offers Extended</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <HiTrophy className="text-lg" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-white mt-3 font-['Outfit']">2</h3>
          <p className="text-xs text-emerald-400 mt-1">Offers under negotiation</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateDashboard;