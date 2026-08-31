import { motion } from "framer-motion";

const RecruiterCandidates = () => {
  const candidates = [
    { id: 1, name: "John Doe", skills: "React, Node.js", experience: "5 Years", status: "Shortlisted" },
    { id: 2, name: "Jane Smith", skills: "UI/UX, Figma", experience: "3 Years", status: "Pending" },
    { id: 3, name: "Mike Johnson", skills: "AWS, Docker", experience: "4 Years", status: "Rejected" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search candidates..."
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
          />
          <button className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-4 py-2 text-sm text-white">
            Search
          </button>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Skills</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Experience</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="border-t border-gray-100">
                <td className="p-4 font-medium text-gray-900">{candidate.name}</td>
                <td className="p-4 text-gray-600">{candidate.skills}</td>
                <td className="p-4 text-gray-600">{candidate.experience}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    candidate.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                    candidate.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {candidate.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecruiterCandidates;