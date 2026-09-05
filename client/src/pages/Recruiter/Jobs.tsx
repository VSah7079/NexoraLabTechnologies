import { motion } from "framer-motion";
import { HiPlus } from "react-icons/hi2";

const RecruiterJobs = () => {
  const jobs = [
    { id: 1, title: "Senior Full Stack Architect", applications: 45, status: "Active", date: "2026-02-15" },
    { id: 2, title: "Lead UI/UX Product Designer", applications: 28, status: "Active", date: "2026-02-10" },
    { id: 3, title: "DevOps & Cloud Specialist", applications: 12, status: "Closed", date: "2026-02-05" },
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
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Posted Job Requisitions</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Manage your active vacancies, hiring requirements, and candidate intake
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95">
          <HiPlus />
          <span>Create Requisition</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 text-center">
          <p className="text-3xl font-black text-[#00D2FF]">12</p>
          <p className="text-xs text-slate-400 mt-1 font-medium">Total Requisitions</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 text-center">
          <p className="text-3xl font-black text-emerald-400">8</p>
          <p className="text-xs text-slate-400 mt-1 font-medium">Active Openings</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 text-center">
          <p className="text-3xl font-black text-blue-400">85</p>
          <p className="text-xs text-slate-400 mt-1 font-medium">Total Applicants</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0b132b]/90 border-b border-slate-800">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Job Title</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Applicant Count</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date Posted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{job.title}</td>
                  <td className="p-4 text-slate-300 text-xs font-semibold">{job.applications} applicants</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${
                        job.status === 'Active'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-xs">{job.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default RecruiterJobs;