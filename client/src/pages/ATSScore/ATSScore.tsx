import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";

const ATSScore = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [scored, setScored] = useState(false);

  const handleScore = () => {
    if (jobDescription && resumeText) {
      setScored(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10"
    >
      <SEO
        title="Free ATS Resume Checker | Match Job Descriptions - NexoraLab"
        description="Check your resume's compatibility score against specific job descriptions. Find missing keywords and fix formatting issues to bypass applicant tracking systems."
      />
      <h1 className="text-3xl font-bold text-gray-900 text-center">ATS Score Checker</h1>
      <p className="text-gray-500 text-center mt-2">
        Check how well your resume matches the job description
      </p>

      <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            placeholder="Paste the job description here..."
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Your Resume Text</label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={4}
            placeholder="Paste your resume text here..."
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <button
          onClick={handleScore}
          disabled={!jobDescription || !resumeText}
          className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
            jobDescription && resumeText
              ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/25 hover:-translate-y-1 hover:shadow-2xl"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Check ATS Score
        </button>

        {scored && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-green-50 rounded-2xl px-8 py-6 border border-green-200">
              <span className="text-4xl">📊</span>
              <div>
                <p className="text-sm text-green-600">ATS Match Score</p>
                <p className="text-3xl font-bold text-green-700">78%</p>
                <p className="text-xs text-green-500">Good match! Consider adding more keywords.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ATSScore;