import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";

const PortfolioBuilder = () => {
  const [portfolio, setPortfolio] = useState({
    name: "",
    title: "",
    bio: "",
    projects: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPortfolio({ ...portfolio, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-10"
    >
      <SEO
        title="AI Portfolio Website Builder | Showcase Your Work - NexoraLab"
        description="Build a beautiful, responsive portfolio website to showcase your engineering, design, or writing projects. Instantly publish and share with employers."
      />
      <h1 className="text-3xl font-bold text-gray-900 text-center">AI Portfolio Builder</h1>
      <p className="text-gray-500 text-center mt-2">
        Create your professional portfolio website
      </p>

      <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            value={portfolio.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Professional Title</label>
          <input
            type="text"
            name="title"
            value={portfolio.title}
            onChange={handleChange}
            placeholder="Full Stack Developer"
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={portfolio.bio}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us about yourself..."
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Projects</label>
          <input
            type="text"
            name="projects"
            value={portfolio.projects}
            onChange={handleChange}
            placeholder="Project 1, Project 2, Project 3"
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Skills</label>
          <input
            type="text"
            name="skills"
            value={portfolio.skills}
            onChange={handleChange}
            placeholder="React, Node.js, TypeScript"
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <button className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          Generate Portfolio
        </button>
      </div>
    </motion.div>
  );
};

export default PortfolioBuilder;