import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (file) {
      setAnalyzed(true);
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
        title="AI Resume Analyzer | Get Instant PDF Feedback - NexoraLab"
        description="Upload your resume to receive immediate, actionable AI-powered feedback on layout, formatting, content, and language to land your dream role."
      />
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        AI Resume Analyzer
      </h1>
      <p className="text-gray-500 text-center mt-2">
        Upload your resume and get AI-powered analysis
      </p>

      <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-cyan-400 transition-colors">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-gray-500">Drop your resume here or click to upload</p>
          <p className="text-sm text-gray-400 mt-2">PDF, DOC, DOCX (Max 5MB)</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
          />
          {file && (
            <p className="mt-4 text-sm text-green-600">✅ {file.name} uploaded</p>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file}
          className={`mt-6 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-300 ${
            file
              ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/25 hover:-translate-y-1 hover:shadow-2xl"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Analyze Resume
        </button>

        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            <h3 className="text-xl font-bold text-gray-900">Analysis Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-sm text-green-600">ATS Score</p>
                <p className="text-2xl font-bold text-green-700">92%</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-600">Grammar</p>
                <p className="text-2xl font-bold text-blue-700">95%</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <p className="text-sm text-yellow-600">Missing Keywords</p>
                <p className="text-sm font-medium text-yellow-700">Docker, Redis, AWS</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="text-sm text-purple-600">Suggestions</p>
                <p className="text-sm font-medium text-purple-700">Add Projects, Improve Summary</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeAnalyzer;