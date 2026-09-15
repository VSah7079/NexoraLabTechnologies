import { motion } from "framer-motion";
import { useState } from "react";
import { HiCog6Tooth, HiShieldCheck } from "react-icons/hi2";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "NexoraLab Technologies",
    contactEmail: "nexoralabtechnologies@gmail.com",
    supportPhone: "+91 70798 84369",
    maintenanceMode: false,
    allowRegistration: true,
    aiRateLimit: 50,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Root System Configuration</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
          Manage system variables, API rate-limits, and platform operational modes
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300">Platform Brand Title</label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">System Notification Email</label>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Hotline Number</label>
            <input
              type="text"
              name="supportPhone"
              value={settings.supportPhone}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Max AI Prompts / Min / User</label>
            <input
              type="number"
              name="aiRateLimit"
              value={settings.aiRateLimit}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-3">
          <label className="flex items-center justify-between p-4 rounded-2xl bg-[#0a1128] border border-slate-800 cursor-pointer">
            <div>
              <p className="text-sm font-bold text-white">Enable Open Candidate Registration</p>
              <p className="text-xs text-slate-400">Allow public candidates to create self-service accounts</p>
            </div>
            <input
              type="checkbox"
              name="allowRegistration"
              checked={settings.allowRegistration}
              onChange={handleChange}
              className="h-5 w-5 rounded border-slate-700 bg-[#070e1e] text-cyan-500 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-2xl bg-[#0a1128] border border-slate-800 cursor-pointer">
            <div>
              <p className="text-sm font-bold text-white">Platform Maintenance Mode</p>
              <p className="text-xs text-slate-400">Temporarily redirect non-admin traffic to maintenance placeholder</p>
            </div>
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="h-5 w-5 rounded border-slate-700 bg-[#070e1e] text-cyan-500 focus:ring-0"
            />
          </label>
        </div>

        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95">
          <HiShieldCheck className="text-base" />
          <span>Save System Configurations</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Settings;