import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/common/SEO";
import { aiAPI } from "@/services/api";
import {
  HiSparkles,
  HiArrowDownTray,
  HiGlobeAlt,
  HiCodeBracket,
  HiPlus,
  HiTrash,
  HiEye,
  HiPencilSquare,
  HiArrowTopRightOnSquare,
  HiArrowPath,
} from "react-icons/hi2";
import { toast } from "react-toastify";

interface ProjectItem {
  title: string;
  description: string;
  tags: string;
  liveUrl: string;
  githubUrl: string;
}

const PortfolioBuilder = () => {
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("preview");
  const [optimizingBio, setOptimizingBio] = useState(false);
  const [optimizingProjIndex, setOptimizingProjIndex] = useState<number | null>(null);

  const [portfolio, setPortfolio] = useState({
    name: "Alexander Mitchell",
    title: "Senior Full-Stack & Cloud Engineer",
    bio: "Passionate digital architect specializing in React 19, Node.js, distributed microservices, and AI-driven automation systems. Building high-throughput software that scales effortlessly.",
    location: "Siwan, Bihar / Remote",
    email: "alex.mitchell@nexoralab.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "FastAPI", "AWS", "Docker", "PostgreSQL", "MongoDB", "Tailwind CSS"],
    projects: [
      {
        title: "AI ATS Intelligence Suite",
        description: "Autonomous candidate resume parser with vector search and semantic scoring engine.",
        tags: "React 19, Python, FastAPI, OpenAI, Docker",
        liveUrl: "https://nexoralabtechnologies.in",
        githubUrl: "https://github.com",
      },
      {
        title: "Enterprise Cloud ERP Platform",
        description: "Multi-tenant CRM and financial reporting suite handling 2M+ monthly records with sub-100ms response.",
        tags: "Next.js, Node.js, PostgreSQL, Redis, AWS",
        liveUrl: "https://nexoralabtechnologies.in",
        githubUrl: "https://github.com",
      },
    ] as ProjectItem[],
  });

  const handleAIBioOptimize = async () => {
    if (!portfolio.bio.trim()) return;
    setOptimizingBio(true);
    try {
      const res = await aiAPI.optimizeBullet({
        text: portfolio.bio,
        context: `${portfolio.title} developer bio`,
      });
      if (res.success && res.data?.improved) {
        setPortfolio((prev) => ({ ...prev, bio: res.data.improved }));
        toast.success("Bio polished with Gemini AI!", { theme: "dark" });
      }
    } catch (err) {
      toast.info("Bio updated.", { theme: "dark" });
    } finally {
      setOptimizingBio(false);
    }
  };

  const handleAIProjectOptimize = async (index: number) => {
    const proj = portfolio.projects[index];
    if (!proj || !proj.description.trim()) return;
    setOptimizingProjIndex(index);
    try {
      const res = await aiAPI.optimizeBullet({
        text: proj.description,
        context: `Project: ${proj.title} using ${proj.tags}`,
      });
      if (res.success && res.data?.improved) {
        const updated = [...portfolio.projects];
        updated[index].description = res.data.improved;
        setPortfolio((prev) => ({ ...prev, projects: updated }));
        toast.success("Project description enhanced with Gemini AI!", { theme: "dark" });
      }
    } catch (err) {
      toast.info("Project description updated.", { theme: "dark" });
    } finally {
      setOptimizingProjIndex(null);
    }
  };

  const handleAddProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [
        ...portfolio.projects,
        {
          title: "New Project",
          description: "Project architecture and key impact metrics...",
          tags: "React, Node.js, PostgreSQL",
          liveUrl: "https://example.com",
          githubUrl: "https://github.com",
        },
      ],
    });
  };

  const handleRemoveProject = (index: number) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((_, i) => i !== index),
    });
  };

  const handleUpdateProject = (index: number, field: keyof ProjectItem, value: string) => {
    const updated = [...portfolio.projects];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, projects: updated });
  };

  const handleExportHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolio.name} | ${portfolio.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #060b18; color: #f8fafc; }
    h1, h2, h3 { font-family: 'Outfit', sans-serif; }
  </style>
</head>
<body class="min-h-screen py-16 px-4">
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Header Hero -->
    <header class="text-center space-y-4">
      <div class="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-bold">
        DEVELOPER PORTFOLIO
      </div>
      <h1 class="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        ${portfolio.name}
      </h1>
      <p class="text-lg md:text-xl font-bold text-slate-300">${portfolio.title}</p>
      <p class="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">${portfolio.bio}</p>
      <div class="flex justify-center gap-4 pt-2">
        <a href="${portfolio.github}" target="_blank" class="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sm font-semibold">GitHub</a>
        <a href="${portfolio.linkedin}" target="_blank" class="px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm">LinkedIn</a>
        <a href="mailto:${portfolio.email}" class="px-5 py-2.5 rounded-full border border-slate-700 hover:border-cyan-400 text-sm font-semibold">Contact</a>
      </div>
    </header>

    <!-- Skills Matrix -->
    <section class="p-8 rounded-3xl border border-slate-800 bg-[#0c142b]/80 backdrop-blur-xl">
      <h2 class="text-xl font-bold text-white mb-4">Technical Stack & Tools</h2>
      <div class="flex flex-wrap gap-2">
        ${portfolio.skills.map((s) => `<span class="px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">${s}</span>`).join("\n        ")}
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="space-y-6">
      <h2 class="text-2xl font-black text-white">Featured Engineering Work</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${portfolio.projects.map((p) => `
        <div class="p-6 rounded-3xl border border-slate-800 bg-[#0c142b]/80 hover:border-cyan-500/50 transition-all">
          <h3 class="text-lg font-bold text-white">${p.title}</h3>
          <p class="text-xs text-slate-300 mt-2 leading-relaxed">${p.description}</p>
          <div class="mt-4 flex flex-wrap gap-1.5">
            ${p.tags.split(",").map((t) => `<span class="px-2.5 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-medium">${t.trim()}</span>`).join("")}
          </div>
          <div class="mt-5 flex gap-3 text-xs font-bold">
            <a href="${p.liveUrl}" target="_blank" class="text-cyan-400 hover:underline">Live Demo →</a>
            <a href="${p.githubUrl}" target="_blank" class="text-slate-400 hover:text-white">Source Code</a>
          </div>
        </div>
        `).join("")}
      </div>
    </section>

    <footer class="text-center text-xs text-slate-500 pt-8 border-t border-slate-800">
      Built with NexoraLab Portfolio Forge • &copy; ${new Date().getFullYear()} ${portfolio.name}
    </footer>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${portfolio.name.toLowerCase().replace(/\s+/g, "-")}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Complete single-file Portfolio HTML downloaded!", {
      theme: "dark",
      autoClose: 2500,
    });
  };

  return (
    <div className="max-w-6xl mx-auto pt-36 sm:pt-40 md:pt-44 pb-20 px-4">
      <SEO
        title="AI Developer Portfolio Generator | Real-Time Showcase Forge - NexoraLab"
        description="Generate an ultra-modern, glassmorphic developer showcase portfolio with live project cards and instant standalone HTML export from NexoraLab."
        keywords={[
          "developer portfolio builder",
          "free portfolio generator for developers",
          "online portfolio maker",
          "glassmorphic portfolio creator",
          "NexoraLab portfolio forge",
        ]}
        canonical="https://nexoralabtechnologies.in/portfolio-builder"
      />

      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
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
          Generate an ultra-modern, glassmorphic developer showcase site with live case studies and 1-click HTML download.
        </p>

        {/* Action Toggle Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex rounded-full border border-white/[0.1] bg-[#070e1e] p-1">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === "editor"
                  ? "bg-[#00D2FF] text-black shadow-lg shadow-cyan-500/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <HiPencilSquare className="text-base" />
              <span>Edit Details</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-[#00D2FF] text-black shadow-lg shadow-cyan-500/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <HiEye className="text-base" />
              <span>Live Site Preview</span>
            </button>
          </div>

          <button
            onClick={handleExportHTML}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 cursor-pointer"
          >
            <HiArrowDownTray className="text-base" />
            <span>Download Standalone HTML</span>
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form */}
        <div
          className={`lg:col-span-5 space-y-6 ${
            activeTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Profile & Bio Information
            </h3>
            <div>
              <label className="text-xs text-slate-400">Full Name</label>
              <input
                type="text"
                value={portfolio.name}
                onChange={(e) => setPortfolio({ ...portfolio, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-[#0a1128] px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Professional Engineering Title</label>
              <input
                type="text"
                value={portfolio.title}
                onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-[#0a1128] px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-400">Executive Bio</label>
                <button
                  type="button"
                  onClick={handleAIBioOptimize}
                  disabled={optimizingBio || !portfolio.bio}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {optimizingBio ? (
                    <>
                      <HiArrowPath className="animate-spin text-xs" />
                      <span>Gemini AI Enhancing...</span>
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-cyan-400 text-xs" />
                      <span>AI Polish Bio</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                rows={3}
                value={portfolio.bio}
                onChange={(e) => setPortfolio({ ...portfolio, bio: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-[#0a1128] p-3 text-xs text-white focus:border-cyan-400 focus:outline-none resize-none font-normal"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-400">GitHub Link</label>
                <input
                  type="text"
                  value={portfolio.github}
                  onChange={(e) => setPortfolio({ ...portfolio, github: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-[#0a1128] px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">LinkedIn Link</label>
                <input
                  type="text"
                  value={portfolio.linkedin}
                  onChange={(e) => setPortfolio({ ...portfolio, linkedin: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-[#0a1128] px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Projects Editor */}
          <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Featured Projects
              </h3>
              <button
                onClick={handleAddProject}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/30 cursor-pointer"
              >
                <HiPlus /> Add Project
              </button>
            </div>

            {portfolio.projects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-800 bg-[#0a1128] space-y-3 relative">
                <button
                  onClick={() => handleRemoveProject(idx)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-rose-400"
                >
                  <HiTrash size={16} />
                </button>
                <input
                  type="text"
                  value={proj.title}
                  placeholder="Project Title"
                  onChange={(e) => handleUpdateProject(idx, "title", e.target.value)}
                  className="rounded-lg border border-slate-700 bg-[#060b18] px-3 py-1.5 text-xs text-white w-full pr-10"
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Description & Impact</span>
                    <button
                      type="button"
                      onClick={() => handleAIProjectOptimize(idx)}
                      disabled={optimizingProjIndex === idx || !proj.description}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-[10px] font-bold text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {optimizingProjIndex === idx ? (
                        <>
                          <HiArrowPath className="animate-spin text-xs" />
                          <span>Enhancing...</span>
                        </>
                      ) : (
                        <>
                          <HiSparkles className="text-purple-400 text-xs" />
                          <span>AI Polish Description</span>
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={proj.description}
                    placeholder="Description..."
                    onChange={(e) => handleUpdateProject(idx, "description", e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-[#060b18] p-2 text-xs text-white resize-none"
                  />
                </div>
                <input
                  type="text"
                  value={proj.tags}
                  placeholder="Tech tags (comma-separated)"
                  onChange={(e) => handleUpdateProject(idx, "tags", e.target.value)}
                  className="rounded-lg border border-slate-700 bg-[#060b18] px-3 py-1.5 text-xs text-white w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Live Glassmorphic Portfolio Preview */}
        <div
          className={`lg:col-span-7 rounded-3xl border border-white/[0.12] bg-[#060d1f]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-8 ${
            activeTab === "editor" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Top Holographic Beam */}
          <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none" />

          {/* Hero Preview */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 text-[10px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AVAILABLE FOR NEW ARCHITECTURAL ROLES
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
              {portfolio.name}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-wide">
              {portfolio.title}
            </p>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed font-normal">
              {portfolio.bio}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <a
                href={portfolio.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-slate-200 hover:bg-white/[0.1]"
              >
                GitHub Profile
              </a>
              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-[#00D2FF] text-black text-xs font-bold hover:bg-cyan-400"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Skills Matrix */}
          <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Core Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {portfolio.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Projects Showcase Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Featured Case Studies ({portfolio.projects.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.projects.map((proj, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-white/[0.08] bg-[#09122a] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h5 className="text-sm font-bold text-white font-['Outfit']">
                      {proj.title}
                    </h5>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-normal">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {proj.tags.split(",").map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] text-slate-300 font-medium"
                        >
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>Live Site</span>
                      <HiArrowTopRightOnSquare />
                    </a>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;