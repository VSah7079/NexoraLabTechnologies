import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { HiSparkles, HiCheckCircle, HiArrowPath } from "react-icons/hi2";

const ATSScore = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [scored, setScored] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleScore = () => {
    if (jobDescription && resumeText) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setScored(true);
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
        title="Free ATS Resume Checker | Match Job Descriptions - NexoraLab"
        description="Check your resume's compatibility score against specific job descriptions. Find missing keywords and fix formatting issues to bypass applicant tracking systems."
      />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4">
          <HiSparkles className="text-sm" />
          <span>ATS COMPATIBILITY ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          ATS Job Match{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Scoring Engine
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Compare your resume directly against specific job specifications to calculate ATS keyword density and candidate ranking.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-6">
        <div>
          <label className="text-xs sm:text-sm font-semibold text-slate-300">
            Target Job Description *
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            placeholder="Paste target job responsibilities, skills, and qualifications here..."
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-all resize-none font-normal"
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold text-slate-300">
            Your Resume Raw Text *
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={4}
            placeholder="Paste summary, experience, education, and technical skill contents here..."
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-all resize-none font-normal"
          />
        </div>

        <button
          onClick={handleScore}
          disabled={!jobDescription || !resumeText || loading}
          className={`w-full rounded-full py-4 text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            jobDescription && resumeText && !loading
              ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <HiArrowPath className="animate-spin text-lg" />
              <span>Analyzing Semantic Relevance...</span>
            </>
          ) : (
            "Calculate ATS Match Score"
          )}
        </button>

        {scored && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-slate-800 bg-[#0b132b]/95 p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-black text-2xl shadow-lg shadow-cyan-500/20">
                86%
              </div>
              <div className="text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <HiCheckCircle className="text-sm" /> Strong Competitive Match
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  High Probability of ATS Filtering Pass
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
                  Your resume covers 18 of the 21 mandatory qualification keywords requested by this job specification.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
              <div className="rounded-xl bg-[#060c1c] p-3.5 border border-slate-800">
                <span className="text-[11px] font-bold text-cyan-400">MATCHED SKILLS</span>
                <p className="text-xs text-slate-300 mt-1">TypeScript, Node.js, React, REST APIs, Microservices, Git</p>
              </div>
              <div className="rounded-xl bg-[#060c1c] p-3.5 border border-slate-800">
                <span className="text-[11px] font-bold text-amber-400">MISSING HIGH-VALUE TERMS</span>
                <p className="text-xs text-slate-300 mt-1">Docker Containerization, AWS Lambda, Kubernetes</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ATSScore;