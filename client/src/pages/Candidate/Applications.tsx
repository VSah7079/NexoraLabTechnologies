import { motion } from "framer-motion";

const CandidateApplications = () => {
  const applications = [
    { id: 1, title: "Senior Full Stack Developer", company: "TechNova", status: "Interview", date: "2024-01-15" },
    { id: 2, title: "UI/UX Designer", company: "EduSmart", status: "Applied", date: "2024-01-10" },
    { id: 3, title: "DevOps Engineer", company: "HealthCare Plus", status: "Rejected", date: "2024-01-05" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Interview': return 'bg-yellow-100 text-yellow-700';
      case 'Applied': return 'bg-blue-100 text-blue-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-cyan-600">12</p>
          <p className="text-gray-500">Total Applications</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-yellow-600">3</p>
          <p className="text-gray-500">In Interview</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
          <p className="text-3xl font-bold text-green-600">2</p>
          <p className="text-gray-500">Offers Received</p>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Job Title</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Company</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-t border-gray-100">
                <td className="p-4 font-medium text-gray-900">{app.title}</td>
                <td className="p-4 text-gray-600">{app.company}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-sm">{app.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CandidateApplications;