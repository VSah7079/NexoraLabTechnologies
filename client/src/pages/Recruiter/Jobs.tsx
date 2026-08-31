import { motion } from "framer-motion";

const RecruiterJobs = () => {
  const jobs = [
    { id: 1, title: "Senior Full Stack Developer", applications: 45, status: "Active", date: "2024-01-15" },
    { id: 2, title: "UI/UX Designer", applications: 28, status: "Active", date: "2024-01-10" },
    { id: 3, title: "DevOps Engineer", applications: 12, status: "Closed", date: "2024-01-05" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Posted Jobs</h1>
        <button className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1">
          + Post New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-cyan-600">12</p>
          <p className="text-gray-500">Total Jobs</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-green-600">8</p>
          <p className="text-gray-500">Active Jobs</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-blue-600">85</p>
          <p className="text-gray-500">Total Applications</p>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Job Title</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Applications</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Posted Date</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t border-gray-100">
                <td className="p-4 font-medium text-gray-900">{job.title}</td>
                <td className="p-4 text-gray-600">{job.applications}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-sm">{job.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecruiterJobs;