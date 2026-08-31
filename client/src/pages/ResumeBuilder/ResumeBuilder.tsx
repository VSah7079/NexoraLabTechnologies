import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";

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
      className="max-w-4xl mx-auto py-10"
    >
      <SEO
        title="AI Resume Builder | Write Professional Resumes Online - NexoraLab"
        description="Create a polished, recruiter-ready professional resume in minutes using modern layouts, expert phrases, and interactive step-by-step guidance."
      />
      <h1 className="text-3xl font-bold text-gray-900 text-center">AI Resume Builder</h1>
      <p className="text-gray-500 text-center mt-2">
        Create a professional resume in minutes
      </p>

      <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200">
        {/* Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s === step
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                    : s < step
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 3 && <div className={`w-16 h-1 ${s < step ? "bg-green-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, TypeScript"
                  className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your work experience..."
                  className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="B.Tech - Computer Science"
                  className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-200 text-center">
                <p className="text-2xl mb-2">🎉</p>
                <p className="text-green-700 font-medium">Your resume is ready!</p>
                <p className="text-sm text-green-600">Download your professional resume now.</p>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`rounded-xl px-6 py-2.5 text-sm font-medium ${
              step === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-all duration-300`}
          >
            Previous
          </button>
          <button
            onClick={() => step < 3 ? setStep(step + 1) : null}
            className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
          >
            {step === 3 ? "Download Resume" : "Next"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeBuilder;