import { motion } from "framer-motion";
import { HiMagnifyingGlass, HiPencil, HiTrash, HiEye } from "react-icons/hi2";

const Jobs = () => {
  const jobs = [
    { id: 1, title: "Senior React Architect", company: "TechCorp Global", applicants: 45, status: "Active" },
    { id: 2, title: "Backend Systems Engineer", company: "NextGen AI", applicants: 28, status: "Active" },
    { id: 3, title: "Lead Product Designer", company: "PixelCraft", applicants: 12, status: "Closed" },
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
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Global Job Listings</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Platform-wide active and archived enterprise requisitions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search requisitions..."
              className="pl-10 pr-4 py-2 rounded-full border border-slate-700 bg-[#0a1128] text-xs sm:text-sm text-white focus:outline-none focus:border-[#00D2FF]"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0b132b]/90 border-b border-slate-800">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Job Title</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Enterprise</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Applicants</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{job.title}</td>
                  <td className="p-4 text-slate-300 text-xs font-normal">{job.company}</td>
                  <td className="p-4 text-slate-300 text-xs font-semibold">{job.applicants} candidates</td>
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
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="p-2 rounded-xl bg-[#0a1128] border border-slate-800 text-slate-300 hover:text-[#00D2FF] hover:border-[#00D2FF] transition-all">
                        <HiEye className="text-sm" />
                      </button>
                      <button className="p-2 rounded-xl bg-[#0a1128] border border-slate-800 text-slate-300 hover:text-[#00D2FF] hover:border-[#00D2FF] transition-all">
                        <HiPencil className="text-sm" />
                      </button>
                      <button className="p-2 rounded-xl bg-[#0a1128] border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500 transition-all">
                        <HiTrash className="text-sm" />
                      </button>
                    </div>
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

export default Jobs;