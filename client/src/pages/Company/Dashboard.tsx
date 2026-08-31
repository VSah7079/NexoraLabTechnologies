import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiBriefcase, HiUsers, HiDocumentText, HiChartBar } from "react-icons/hi2";

const CompanyDashboard = () => {
  const stats = [
    { title: "Total Jobs", value: "24", icon: <HiBriefcase />, color: "text-cyan-600" },
    { title: "Active Jobs", value: "12", icon: <HiDocumentText />, color: "text-green-600" },
    { title: "Total Applicants", value: "156", icon: <HiUsers />, color: "text-blue-600" },
    { title: "Hired", value: "18", icon: <HiChartBar />, color: "text-purple-600" },
  ];

  const recentJobs = [
    { id: 1, title: "Senior Full Stack Developer", applicants: 45, status: "Active" },
    { id: 2, title: "UI/UX Designer", applicants: 28, status: "Active" },
    { id: 3, title: "DevOps Engineer", applicants: 12, status: "Closed" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
        <Link
          to="/recruiter/jobs/post"
          className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
        >
          + Post New Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Recent Job Postings</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Job Title</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Applicants</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentJobs.map((job) => (
              <tr key={job.id} className="border-t border-gray-100">
                <td className="p-4 font-medium text-gray-900">{job.title}</td>
                <td className="p-4 text-gray-600">{job.applicants}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === "Active" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {job.status}
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

export default CompanyDashboard;