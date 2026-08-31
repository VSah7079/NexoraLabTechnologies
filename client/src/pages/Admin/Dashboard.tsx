import { motion } from "framer-motion";
import { HiUsers, HiBuildingOffice, HiBriefcase, HiShieldCheck } from "react-icons/hi2";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,234", icon: <HiUsers />, color: "text-cyan-600" },
    { title: "Companies", value: "89", icon: <HiBuildingOffice />, color: "text-green-600" },
    { title: "Total Jobs", value: "456", icon: <HiBriefcase />, color: "text-blue-600" },
    { title: "Active", value: "98%", icon: <HiShieldCheck />, color: "text-purple-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-cyan-400/50 transition-colors cursor-pointer">
          <h3 className="font-bold text-gray-900">Manage Users</h3>
          <p className="text-sm text-gray-500 mt-1">View and manage all users</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-cyan-400/50 transition-colors cursor-pointer">
          <h3 className="font-bold text-gray-900">Manage Companies</h3>
          <p className="text-sm text-gray-500 mt-1">View and manage companies</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-cyan-400/50 transition-colors cursor-pointer">
          <h3 className="font-bold text-gray-900">Manage Jobs</h3>
          <p className="text-sm text-gray-500 mt-1">View and manage job postings</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;