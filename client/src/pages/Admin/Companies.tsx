import { motion } from "framer-motion";
import { HiMagnifyingGlass, HiPencil, HiTrash, HiBuildingOffice } from "react-icons/hi2";

const Companies = () => {
  const companies = [
    { id: 1, name: "Tech Corp", industry: "Technology", jobs: 12, status: "Active" },
    { id: 2, name: "Startup Inc", industry: "SaaS", jobs: 8, status: "Active" },
    { id: 3, name: "Design Co", industry: "Design", jobs: 5, status: "Inactive" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Companies</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Company</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Industry</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Jobs</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-t border-gray-100">
                <td className="p-4 font-medium text-gray-900 flex items-center gap-2">
                  <HiBuildingOffice className="text-cyan-600" />
                  {company.name}
                </td>
                <td className="p-4 text-gray-600">{company.industry}</td>
                <td className="p-4 text-gray-600">{company.jobs}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    company.status === "Active" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {company.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                      <HiPencil />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                      <HiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Companies;