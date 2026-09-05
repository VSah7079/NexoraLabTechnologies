import { motion } from "framer-motion";
import { HiMagnifyingGlass, HiBriefcase } from "react-icons/hi2";

const RecruiterCandidates = () => {
  const candidates = [
    { id: 1, name: "Alexander Vance", skills: "React 19, TypeScript, Node.js", experience: "5.5 Years", status: "Shortlisted" },
    { id: 2, name: "Elena Rostova", skills: "UI/UX, Figma, Design Systems", experience: "4 Years", status: "Pending Review" },
    { id: 3, name: "Marcus Chen", skills: "AWS Cloud, Kubernetes, Terraform", experience: "6 Years", status: "Interview Scheduled" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'Interview Scheduled':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Pending Review':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Candidate Pool</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
            Filter, evaluate, and schedule interviews with qualified applicants
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search by skill or candidate..."
              className="rounded-full border border-slate-700 bg-[#0a1128] pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00D2FF]"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0b132b]/90 border-b border-slate-800">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Skill Profile</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Experience</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Pipeline Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white text-sm">{candidate.name}</td>
                  <td className="p-4 text-slate-300 text-xs font-normal">{candidate.skills}</td>
                  <td className="p-4 text-slate-300 text-xs font-semibold">{candidate.experience}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(candidate.status)}`}>
                      {candidate.status}
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

export default RecruiterCandidates;