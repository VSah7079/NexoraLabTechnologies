import { motion } from "framer-motion";

const CandidateJobs = () => {
  const jobs = [
    { id: 1, title: "Senior Full Stack Developer", company: "TechNova", location: "Remote", salary: "₹15-25 LPA" },
    { id: 2, title: "UI/UX Designer", company: "EduSmart", location: "Siwan", salary: "₹8-12 LPA" },
    { id: 3, title: "DevOps Engineer", company: "HealthCare Plus", location: "Remote", salary: "₹12-18 LPA" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Available Jobs</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search jobs..."
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
          />
          <button className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-4 py-2 text-sm text-white">
            Search
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-cyan-400 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <p className="text-gray-500">{job.company}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-400">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                </div>
              </div>
              <button className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-2 text-sm text-white hover:-translate-y-1 transition-all duration-300">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CandidateJobs;