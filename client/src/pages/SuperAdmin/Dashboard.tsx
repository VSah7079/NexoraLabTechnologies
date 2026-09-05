import { motion } from "framer-motion";
import { HiServer, HiUsers, HiBuildingOffice, HiBriefcase, HiShieldCheck } from "react-icons/hi2";

const Dashboard = () => {
  const stats = [
    { title: "Total Platform Users", value: "5,678", icon: <HiUsers />, color: "text-cyan-400" },
    { title: "Registered Companies", value: "234", icon: <HiBuildingOffice />, color: "text-emerald-400" },
    { title: "Total Job Matches", value: "1,234", icon: <HiBriefcase />, color: "text-blue-400" },
    { title: "Global Cluster Uptime", value: "99.99%", icon: <HiServer />, color: "text-violet-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Super Admin Global Control</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
          Infrastructure health, multi-tenant databases, microservices, and root administration
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

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl">
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <HiServer className="text-[#00D2FF]" />
            <span>Infrastructure Health</span>
          </h3>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0a1128] border border-slate-800">
              <span className="text-slate-300">MongoDB Primary Replica</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Optimal (1.2ms)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0a1128] border border-slate-800">
              <span className="text-slate-300">Node.js / Express API Cluster</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Operational (100%)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0a1128] border border-slate-800">
              <span className="text-slate-300">AWS CloudFront & Asset CDN</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Global Edge Active
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl">
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <HiShieldCheck className="text-[#00D2FF]" />
            <span>Security & Root Operations</span>
          </h3>
          <div className="space-y-2.5">
            <button className="w-full text-left p-3 rounded-2xl bg-[#0a1128] border border-slate-800 text-slate-200 text-xs sm:text-sm font-semibold hover:border-[#00D2FF] transition-colors">
              Manage Security ACLs & Admin Roles →
            </button>
            <button className="w-full text-left p-3 rounded-2xl bg-[#0a1128] border border-slate-800 text-slate-200 text-xs sm:text-sm font-semibold hover:border-[#00D2FF] transition-colors">
              Database Backup & Multi-Region Sync →
            </button>
            <button className="w-full text-left p-3 rounded-2xl bg-[#0a1128] border border-slate-800 text-slate-200 text-xs sm:text-sm font-semibold hover:border-[#00D2FF] transition-colors">
              View Real-Time Audit Telemetry Logs →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;