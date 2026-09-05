import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { HiSparkles, HiCheckCircle, HiArrowRight, HiArrowLeft } from "react-icons/hi2";

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10 px-4"
    >
      <SEO
        title="AI Resume Builder | Write Professional Resumes Online - NexoraLab"
        description="Create a polished, recruiter-ready professional resume in minutes using modern layouts, expert phrases, and interactive step-by-step guidance."
      />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4">
          <HiSparkles className="text-sm" />
          <span>RESUME ARCHITECT STUDIO</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Resume{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Builder Studio
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Craft executive-grade, ATS-optimized CVs with intelligent prompt completions and modern layout styling.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
        {/* Steps Bar */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  s === step
                    ? "bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white shadow-lg shadow-cyan-500/30 scale-110"
                    : s < step
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-500 border border-slate-700"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 sm:w-24 h-1 mx-2 rounded transition-all duration-300 ${
                    s < step ? "bg-emerald-500" : "bg-slate-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-4">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-white mb-2">Step 1: Contact Information</h3>
              <div>
                <label className="text-xs font-semibold text-slate-300">Full Legal Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alexander Mitchell"
                  className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alexander@company.com"
                  className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 70798 84369"
                  className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-white mb-2">Step 2: Skills & Work Experience</h3>
              <div>
                <label className="text-xs font-semibold text-slate-300">Core Technical Competencies *</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React 19, TypeScript, Node.js, AWS Cloud, Docker, GraphQL"
                  className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Professional Experience Summary *</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Briefly describe key roles, impact, and engineering achievements..."
                  className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none resize-none"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-white mb-2">Step 3: Academic Credentials & Finalize</h3>
              <div>
                <label className="text-xs font-semibold text-slate-300">Degrees & Certifications *</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech Computer Science / AWS Solutions Architect"
                  className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                />
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center">
                <div className="text-3xl mb-2">🎉</div>
                <h4 className="text-lg font-black text-white">Your Resume is Formatted & Ready!</h4>
                <p className="text-xs text-slate-300 mt-1 font-normal">
                  All sections parsed, keyword-weighted, and prepped for PDF compilation.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-800">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold transition-all ${
              step === 1
                ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                : "border border-slate-700 bg-[#0a1128] text-slate-200 hover:border-[#00D2FF]"
            }`}
          >
            <HiArrowLeft /> Previous
          </button>
          <button
            onClick={() => (step < 3 ? setStep(step + 1) : null)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span>{step === 3 ? "Generate & Download PDF" : "Next Step"}</span>
            <HiArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;