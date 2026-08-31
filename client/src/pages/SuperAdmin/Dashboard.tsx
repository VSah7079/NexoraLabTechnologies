import { motion } from "framer-motion";
import { HiServer, HiUsers, HiBuildingOffice, HiBriefcase } from "react-icons/hi2";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "5,678", icon: <HiUsers />, color: "text-cyan-600" },
    { title: "Companies", value: "234", icon: <HiBuildingOffice />, color: "text-green-600" },
    { title: "Jobs", value: "1,234", icon: <HiBriefcase />, color: "text-blue-600" },
    { title: "System Health", value: "99.9%", icon: <HiServer />, color: "text-purple-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>

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

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div             className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Server</span>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">CDN</span>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
          </div>
        </div>
        <div             className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm transition-colors">
              Manage Admins
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm transition-colors">
              System Settings
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm transition-colors">
              View Logs
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;