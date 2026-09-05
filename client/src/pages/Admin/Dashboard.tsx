import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiUsers, HiBuildingOffice, HiBriefcase, HiShieldCheck, HiArrowRight } from "react-icons/hi2";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,234", icon: <HiUsers />, color: "text-cyan-400" },
    { title: "Partner Companies", value: "89", icon: <HiBuildingOffice />, color: "text-emerald-400" },
    { title: "Active Job Listings", value: "456", icon: <HiBriefcase />, color: "text-blue-400" },
    { title: "Platform Health", value: "99.9%", icon: <HiShieldCheck />, color: "text-violet-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Admin Command Center</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
          Platform-wide user management, corporate verification, and audit logs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 backdrop-blur-xl shadow-xl hover:border-[#00D2FF]/40 transition-all"
          >
            <div className={`text-2xl ${stat.color}`}>{stat.icon}</div>
            <p className="text-3xl font-black text-white mt-2 font-['Outfit']">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/users"
          className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl hover:border-[#00D2FF]/40 hover:shadow-cyan-500/10 transition-all group block"
        >
          <h3 className="font-bold text-white text-base group-hover:text-[#00D2FF] transition-colors flex items-center justify-between">
            <span>Manage Users</span>
            <HiArrowRight className="text-slate-500 group-hover:translate-x-1 group-hover:text-[#00D2FF] transition-all" />
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-normal">Review candidate & recruiter records</p>
        </Link>

        <Link
          to="/admin/companies"
          className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl hover:border-[#00D2FF]/40 hover:shadow-cyan-500/10 transition-all group block"
        >
          <h3 className="font-bold text-white text-base group-hover:text-[#00D2FF] transition-colors flex items-center justify-between">
            <span>Manage Companies</span>
            <HiArrowRight className="text-slate-500 group-hover:translate-x-1 group-hover:text-[#00D2FF] transition-all" />
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-normal">Audit enterprise verification statuses</p>
        </Link>

        <Link
          to="/admin/jobs"
          className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl hover:border-[#00D2FF]/40 hover:shadow-cyan-500/10 transition-all group block"
        >
          <h3 className="font-bold text-white text-base group-hover:text-[#00D2FF] transition-colors flex items-center justify-between">
            <span>Manage Jobs</span>
            <HiArrowRight className="text-slate-500 group-hover:translate-x-1 group-hover:text-[#00D2FF] transition-all" />
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-normal">Moderate posted requisitions</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default Dashboard;