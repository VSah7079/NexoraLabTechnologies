import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { HiDocumentText, HiArrowUpTray, HiSparkles, HiCheckCircle } from "react-icons/hi2";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (file) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAnalyzed(true);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10 px-4"
    >
      <SEO
        title="AI Resume Analyzer | Get Instant PDF Feedback - NexoraLab"
        description="Upload your resume to receive immediate, actionable AI-powered feedback on layout, formatting, content, and language to land your dream role."
      />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4">
          <HiSparkles className="text-sm" />
          <span>AI INTELLIGENCE SUITE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Resume{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Analyzer & Auditor
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Upload your PDF or Word document to get real-time recruiter parsing metrics, formatting audits, and keyword match ratings.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
        <div className="group relative border-2 border-dashed border-slate-700 rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 hover:border-[#00D2FF] bg-[#0a1128]/50">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00D2FF]/20 to-[#7C3AED]/20 border border-cyan-500/30 text-3xl text-cyan-400">
              <HiArrowUpTray />
            </div>
          </div>
          <p className="text-white font-bold text-base sm:text-lg">
            Drag & drop your resume or browse files
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Supported formats: PDF, DOC, DOCX (Max 5MB)
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mt-5 block w-full text-xs sm:text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#00D2FF] file:text-black hover:file:bg-[#00b4db] file:cursor-pointer"
          />
          {file && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
              <HiCheckCircle className="text-base" />
              <span>{file.name} (Ready to scan)</span>
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className={`mt-6 w-full rounded-full py-4 text-sm font-bold text-white transition-all duration-300 ${
            file && !loading
              ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Scanning & Parsing Document..." : "Analyze Resume with AI"}
        </button>

        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-5"
          >
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <HiDocumentText className="text-cyan-400" />
              <span>AI Diagnostic Breakdown</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
                <p className="text-xs font-semibold text-emerald-400">ATS Pass Likelihood</p>
                <p className="text-3xl font-black text-emerald-300 mt-1">94% Match</p>
                <p className="text-xs text-emerald-400/80 mt-1">High compatibility with Workday & Greenhouse.</p>
              </div>
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5">
                <p className="text-xs font-semibold text-cyan-400">Grammar & Impact Score</p>
                <p className="text-3xl font-black text-cyan-300 mt-1">96 / 100</p>
                <p className="text-xs text-cyan-400/80 mt-1">Action-driven phrasing and strong metric indicators.</p>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5">
                <p className="text-xs font-semibold text-amber-400">Recommended Keywords</p>
                <p className="text-sm font-bold text-amber-200 mt-1">Kubernetes, CI/CD Pipelines, GraphQL, Redis</p>
                <p className="text-xs text-amber-400/80 mt-1">Incorporate these terms under your technical skills section.</p>
              </div>
              <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-5">
                <p className="text-xs font-semibold text-violet-400">Structural Optimizations</p>
                <p className="text-sm font-bold text-violet-200 mt-1">Quantify project outcomes with % growth figures</p>
                <p className="text-xs text-violet-400/80 mt-1">Add links to GitHub repos or live staging URLs.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeAnalyzer;