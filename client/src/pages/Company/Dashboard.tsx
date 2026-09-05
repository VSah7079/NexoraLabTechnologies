import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiBriefcase, HiUsers, HiDocumentText, HiChartBar, HiPlus } from "react-icons/hi2";

const CompanyDashboard = () => {
  const stats = [
    { title: "Total Job Openings", value: "24", icon: <HiBriefcase />, color: "text-cyan-400" },
    { title: "Active Requisitions", value: "12", icon: <HiDocumentText />, color: "text-emerald-400" },
    { title: "Total Applicants", value: "156", icon: <HiUsers />, color: "text-blue-400" },
    { title: "Engineers Hired", value: "18", icon: <HiChartBar />, color: "text-violet-400" },
  ];

  const recentJobs = [
    { id: 1, title: "Senior Full Stack Architect", applicants: 45, status: "Active" },
    { id: 2, title: "Lead UI/UX Product Designer", applicants: 28, status: "Active" },
    { id: 3, title: "DevOps & Cloud Engineer", applicants: 12, status: "Closed" },
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
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Company Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Enterprise recruitment and team expansion overview
          </p>
        </div>
        <Link
          to="/recruiter/jobs/post"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <HiPlus />
          <span>Post Open Position</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 backdrop-blur-xl shadow-xl hover:border-[#00D2FF]/40 transition-all"
          >
            <div className={`text-2xl ${stat.color}`}>{stat.icon}</div>
            <p className="text-3xl font-black text-white mt-2 font-['Outfit']">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">Active Talent Pipelines</h2>
          <Link to="/recruiter/jobs" className="text-xs text-cyan-400 hover:text-cyan-300 font-bold">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0b132b]/90 border-b border-slate-800">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Position Title</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Volume</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{job.title}</td>
                  <td className="p-4 text-slate-300 text-sm font-semibold">{job.applicants} candidates</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${
                        job.status === "Active"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-slate-800 border-slate-700 text-slate-400"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyDashboard;