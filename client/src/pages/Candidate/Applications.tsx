import { motion } from "framer-motion";

const CandidateApplications = () => {
  const applications = [
    { id: 1, title: "Senior Full Stack Architect", company: "TechNova Enterprises", status: "Interview", date: "2026-02-15" },
    { id: 2, title: "Lead UI/UX Product Designer", company: "EduSmart Platforms", status: "Applied", date: "2026-02-10" },
    { id: 3, title: "DevOps & Cloud Engineer", company: "HealthCare Plus", status: "Under Review", date: "2026-02-05" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Interview':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Applied':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
      case 'Under Review':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">My Applications</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
          Real-time tracking of candidate submissions and recruiter engagement
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 text-center">
          <p className="text-3xl font-black text-[#00D2FF]">12</p>
          <p className="text-xs text-slate-400 mt-1 font-medium">Total Applications</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 text-center">
          <p className="text-3xl font-black text-amber-400">3</p>
          <p className="text-xs text-slate-400 mt-1 font-medium">In Interview</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 text-center">
          <p className="text-3xl font-black text-emerald-400">2</p>
          <p className="text-xs text-slate-400 mt-1 font-medium">Offers Received</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0b132b]/90 border-b border-slate-800">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Job Title</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Company</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{app.title}</td>
                  <td className="p-4 text-slate-300 text-sm">{app.company}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-xs">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateApplications;