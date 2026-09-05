import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { HiSparkles, HiArrowRight, HiGlobeAlt } from "react-icons/hi2";

const PortfolioBuilder = () => {
  const [portfolio, setPortfolio] = useState({
    name: "",
    title: "",
    bio: "",
    projects: "",
    skills: "",
  });
  const [generated, setGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPortfolio({ ...portfolio, [e.target.name]: e.target.value });
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10 px-4"
    >
      <SEO
        title="AI Portfolio Website Builder | Showcase Your Work - NexoraLab"
        description="Build a beautiful, responsive portfolio website to showcase your engineering, design, or writing projects. Instantly publish and share with employers."
      />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4">
          <HiSparkles className="text-sm" />
          <span>PORTFOLIO FORGE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Developer{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Portfolio Generator
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Generate an ultra-modern, glassmorphic developer showcase site complete with live case studies and GitHub sync.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-5">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
              <input
                type="text"
                name="name"
                value={portfolio.name}
                onChange={handleChange}
                placeholder="e.g. Johnathan Vance"
                required
                className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Professional Engineering Title *</label>
              <input
                type="text"
                name="title"
                value={portfolio.title}
                onChange={handleChange}
                placeholder="e.g. Lead Full-Stack Architect"
                required
                className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Executive Bio & Impact Statement</label>
            <textarea
              name="bio"
              value={portfolio.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Tell employers about your engineering focus, high-scale projects, and technical vision..."
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Key Featured Projects (Comma-separated)</label>
            <input
              type="text"
              name="projects"
              value={portfolio.projects}
              onChange={handleChange}
              placeholder="e.g. Cloud ERP, AI Mock Interviewer, Multi-tenant SaaS, Fintech Gateway"
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Tech Stack & Tools</label>
            <input
              type="text"
              name="skills"
              value={portfolio.skills}
              onChange={handleChange}
              placeholder="e.g. React 19, TypeScript, Node.js, AWS, Kubernetes, PostgreSQL"
              className="mt-1.5 w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Generate & Preview Live Portfolio</span>
            <HiArrowRight />
          </button>
        </form>

        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-slate-800 bg-[#0b132b]/95 p-6 text-center space-y-3"
          >
            <div className="flex justify-center">
              <HiGlobeAlt className="text-4xl text-[#00D2FF]" />
            </div>
            <h4 className="text-lg font-black text-white">Live Portfolio URL Ready!</h4>
            <p className="text-xs text-slate-300">
              Your portfolio is deployed to <span className="text-cyan-400 font-bold">nexoralab.me/{portfolio.name.toLowerCase().replace(/\s+/g, '-') || 'developer'}</span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PortfolioBuilder;