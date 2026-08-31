// pages/Candidate/Dashboard.tsx
import { motion } from "framer-motion";

const CandidateDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-gray-900">Candidate Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Total Applications</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">24</h3>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Interviews</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">5</h3>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Offers</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">2</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateDashboard;