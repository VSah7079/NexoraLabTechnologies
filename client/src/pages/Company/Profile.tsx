import { motion } from "framer-motion";
import { useState } from "react";

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: "TechNova Solutions",
    email: "info@technova.com",
    phone: "+91 98765 43210",
    website: "https://technova.com",
    industry: "Technology",
    size: "50-100",
    description: "We build innovative software solutions for businesses worldwide.",
    address: "Siwan, Bihar, India",
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
      <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-600 flex items-center justify-center text-3xl text-white font-bold">
            TN
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
            <p className="text-gray-500">{company.industry}</p>
            <p className="text-gray-400 text-sm">{company.size} employees</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              name="name"
              value={company.name}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={company.email}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={company.phone}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              name="website"
              value={company.website}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Industry</label>
            <select
              name="industry"
              value={company.industry}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:border-cyan-400"
            >
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Finance</option>
              <option>Manufacturing</option>
              <option>Retail</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Company Size</label>
            <select
              name="size"
              value={company.size}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:border-cyan-400"
            >
              <option>1-10</option>
              <option>11-50</option>
              <option>50-100</option>
              <option>100-500</option>
              <option>500+</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={company.description}
              onChange={handleChange}
              rows={3}
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={company.address}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <button className="mt-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default CompanyProfile;