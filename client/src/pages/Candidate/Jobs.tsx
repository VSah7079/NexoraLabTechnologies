import { motion } from "framer-motion";
import { HiMagnifyingGlass, HiMapPin, HiCurrencyDollar, HiArrowRight } from "react-icons/hi2";

const CandidateJobs = () => {
  const jobs = [
    { id: 1, title: "Senior Full Stack Architect", company: "TechNova Enterprises", location: "Remote (Global)", salary: "₹18-28 LPA" },
    { id: 2, title: "Lead UI/UX Product Designer", company: "EduSmart Platforms", location: "Siwan, Bihar / Remote", salary: "₹12-18 LPA" },
    { id: 3, title: "DevOps & Cloud Engineer", company: "HealthCare Plus", location: "Remote (India)", salary: "₹15-24 LPA" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Available Opportunities</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Discover verified roles matched directly with your tech stack
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search roles..."
              className="rounded-full border border-slate-700 bg-[#0a1128] pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00D2FF]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 backdrop-blur-xl shadow-xl hover:border-[#00D2FF]/50 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">{job.title}</h3>
              <p className="text-xs text-cyan-400 font-semibold mt-0.5">{job.company}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <HiMapPin className="text-slate-400" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <HiCurrencyDollar className="text-emerald-400" /> {job.salary}
                </span>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all">
              <span>Quick Apply</span>
              <HiArrowRight />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CandidateJobs;