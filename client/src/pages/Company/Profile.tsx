import { motion } from "framer-motion";
import { useState } from "react";
import { HiBuildingOffice2, HiPencilSquare } from "react-icons/hi2";

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: "TechNova Solutions",
    email: "enterprise@technova.com",
    phone: "+91 70798 84369",
    website: "https://technova.io",
    industry: "Enterprise AI & Cloud SaaS",
    size: "50-100",
    description: "Architecting high-concurrency cloud systems and generative AI solutions for modern businesses.",
    address: "Siwan, Bihar 841226, India",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">Company Profile</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
          Manage corporate identity, branding, and verified company credentials
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-800">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] flex items-center justify-center text-2xl text-white font-black shadow-lg shadow-cyan-500/30">
            TN
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">{company.name}</h2>
            <p className="text-xs text-cyan-400 font-semibold mt-0.5">{company.industry}</p>
            <p className="text-xs text-slate-400 mt-0.5">{company.size} employees • Verified Enterprise</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-xs font-semibold text-slate-300">Company Name *</label>
            <input
              type="text"
              name="name"
              value={company.name}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none font-normal"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Official Contact Email *</label>
            <input
              type="email"
              name="email"
              value={company.email}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none font-normal"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Direct Phone *</label>
            <input
              type="tel"
              name="phone"
              value={company.phone}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none font-normal"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Website URL *</label>
            <input
              type="url"
              name="website"
              value={company.website}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none font-normal"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Industry Vertical</label>
            <select
              name="industry"
              value={company.industry}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none font-normal"
            >
              <option className="bg-[#070e1e]">Enterprise AI & Cloud SaaS</option>
              <option className="bg-[#070e1e]">Healthcare & Life Sciences</option>
              <option className="bg-[#070e1e]">Fintech & Web3</option>
              <option className="bg-[#070e1e]">E-Commerce & Retail</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Organization Headcount</label>
            <select
              name="size"
              value={company.size}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none font-normal"
            >
              <option className="bg-[#070e1e]">1-10 Employees</option>
              <option className="bg-[#070e1e]">11-50 Employees</option>
              <option className="bg-[#070e1e]">50-100 Employees</option>
              <option className="bg-[#070e1e]">100-500 Employees</option>
              <option className="bg-[#070e1e]">500+ Enterprise</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300">Company Overview</label>
            <textarea
              name="description"
              value={company.description}
              onChange={handleChange}
              rows={3}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none resize-none font-normal"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300">Headquarters Address</label>
            <input
              type="text"
              name="address"
              value={company.address}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none font-normal"
            />
          </div>
        </div>

        <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95">
          <span>Save Changes</span>
        </button>
      </div>
    </motion.div>
  );
};

export default CompanyProfile;