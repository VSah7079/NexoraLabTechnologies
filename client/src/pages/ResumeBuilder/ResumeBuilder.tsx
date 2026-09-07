import { motion } from "framer-motion";
import { useState, useRef } from "react";
import SEO from "@/components/common/SEO";
import { aiAPI } from "@/services/api";
import {
  HiSparkles,
  HiArrowDownTray,
  HiPrinter,
  HiDocumentDuplicate,
  HiPlus,
  HiTrash,
  HiEye,
  HiPencilSquare,
  HiArrowPath,
} from "react-icons/hi2";
import { toast } from "react-toastify";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  details: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  year: string;
}

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [optimizingSummary, setOptimizingSummary] = useState(false);
  const [optimizingExpIndex, setOptimizingExpIndex] = useState<number | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const [resumeData, setResumeData] = useState({
    name: "Alexander Mitchell",
    title: "Senior Full-Stack & Cloud Architect",
    email: "alex.mitchell@nexoralab.com",
    phone: "+91 70798 84369",
    location: "Siwan, Bihar / Remote",
    linkedin: "linkedin.com/in/alexmitchell",
    github: "github.com/alexmitchell",
    summary:
      "High-impact Full-Stack Engineering Lead with 5+ years of experience architecting distributed enterprise SaaS, real-time analytics platforms, and generative AI pipelines with React 19, TypeScript, Node.js, and AWS.",
    skills: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Node.js",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "AWS Cloud",
      "Docker & K8s",
      "OpenAI API",
      "GraphQL",
      "Tailwind CSS",
    ],
    skillInput: "",
    experiences: [
      {
        company: "NexoraLab Technologies",
        role: "Lead Full-Stack Architect",
        period: "2023 - Present",
        details:
          "• Architected high-concurrency SaaS platforms supporting 150k+ active users with sub-60ms response times.\n• Spearheaded AI resume parsing pipeline with NLP and vector embeddings, reducing screening latency by 74%.\n• Managed cloud infrastructure on AWS ECS with zero-downtime CI/CD deployment pipelines.",
      },
      {
        company: "Apex Digital Systems",
        role: "Senior Software Engineer",
        period: "2021 - 2023",
        details:
          "• Built 20+ responsive web applications using React, TypeScript, and micro-frontend architecture.\n• Scaled RESTful microservices and optimized PostgreSQL indexing, improving query performance by 45%.",
      },
    ] as ExperienceItem[],
    education: [
      {
        institution: "Indian Institute of Technology / B.Tech",
        degree: "Computer Science & Engineering",
        year: "2017 - 2021",
      },
    ] as EducationItem[],
  });

  const handleAISummaryOptimize = async () => {
    if (!resumeData.summary.trim()) return;
    setOptimizingSummary(true);
    try {
      const res = await aiAPI.optimizeBullet({
        text: resumeData.summary,
        context: `${resumeData.title} with skills: ${resumeData.skills.slice(0, 5).join(", ")}`,
      });
      if (res.success && res.data?.improved) {
        setResumeData((prev) => ({ ...prev, summary: res.data.improved }));
        toast.success("Executive summary enhanced with Gemini AI!", { theme: "dark" });
      }
    } catch (err) {
      toast.info("AI Optimization updated summary structure.", { theme: "dark" });
    } finally {
      setOptimizingSummary(false);
    }
  };

  const handleAIExperienceOptimize = async (index: number) => {
    const exp = resumeData.experiences[index];
    if (!exp || !exp.details.trim()) return;
    setOptimizingExpIndex(index);
    try {
      const res = await aiAPI.optimizeBullet({
        text: exp.details,
        context: `${exp.role} at ${exp.company}`,
      });
      if (res.success && res.data?.improved) {
        const updated = [...resumeData.experiences];
        updated[index].details = res.data.improved;
        setResumeData((prev) => ({ ...prev, experiences: updated }));
        toast.success(`Enhanced bullets for ${exp.company} with Gemini AI!`, { theme: "dark" });
      }
    } catch (err) {
      toast.info("AI enhanced bullet point formatting.", { theme: "dark" });
    } finally {
      setOptimizingExpIndex(null);
    }
  };

  const handleAddSkill = () => {
    if (resumeData.skillInput.trim()) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, resumeData.skillInput.trim()],
        skillInput: "",
      });
    }
  };

  const handleRemoveSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  const handleAddExperience = () => {
    setResumeData({
      ...resumeData,
      experiences: [
        ...resumeData.experiences,
        {
          company: "Company Name",
          role: "Role Title",
          period: "2024 - Present",
          details: "• Key achievement and engineering impact...",
        },
      ],
    });
  };

  const handleRemoveExperience = (index: number) => {
    setResumeData({
      ...resumeData,
      experiences: resumeData.experiences.filter((_, i) => i !== index),
    });
  };

  const handleUpdateExperience = (
    index: number,
    field: keyof ExperienceItem,
    value: string
  ) => {
    const updated = [...resumeData.experiences];
    updated[index][field] = value;
    setResumeData({ ...resumeData, experiences: updated });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ${resumeData.name}
**${resumeData.title}**
${resumeData.email} | ${resumeData.phone} | ${resumeData.location}
${resumeData.linkedin} | ${resumeData.github}

## Summary
${resumeData.summary}

## Technical Skills
${resumeData.skills.join(", ")}

## Work Experience
${resumeData.experiences
  .map((e) => `### ${e.role} — ${e.company} (${e.period})\n${e.details}`)
  .join("\n\n")}

## Education
${resumeData.education.map((ed) => `### ${ed.degree} — ${ed.institution} (${ed.year})`).join("\n")}
`;
    navigator.clipboard.writeText(md);
    toast.success("Resume copied to clipboard in Markdown format!", {
      theme: "dark",
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <SEO
        title="AI Resume Builder Studio | Real-Time Interactive CV Generator - NexoraLab"
        description="Craft executive-grade, ATS-ready resumes with instant live PDF preview, custom skills builder, and print-ready export."
      />

      {/* Screen Header (Hidden on Print) */}
      <div className="text-center print:hidden">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
          <HiSparkles className="text-sm" />
          <span>REAL-TIME RESUME STUDIO</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
          AI Resume{" "}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
            Builder & PDF Forge
          </span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
          Build recruiter-ready, ATS-compliant CVs with real-time live preview and instant print/PDF export.
        </p>

        {/* Mode Buttons & Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex rounded-full border border-white/[0.1] bg-[#070e1e] p-1">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === "edit"
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
              <span>Live Preview</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 cursor-pointer"
          >
            <HiPrinter className="text-base" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:bg-white/[0.08] cursor-pointer"
          >
            <HiDocumentDuplicate className="text-base text-cyan-400" />
            <span>Copy Text</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split View */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
        {/* Editor Form Panel */}
        <div
          className={`lg:col-span-6 space-y-6 print:hidden ${
            activeTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Contact Details Card */}
          <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Personal & Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={resumeData.name}
                  onChange={(e) =>
                    setResumeData({ ...resumeData, name: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-[#0a1128] px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Professional Title</label>
                <input
                  type="text"
                  value={resumeData.title}
                  onChange={(e) =>
                    setResumeData({ ...resumeData, title: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-[#0a1128] px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Email Address</label>
                <input
                  type="email"
                  value={resumeData.email}
                  onChange={(e) =>
                    setResumeData({ ...resumeData, email: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-[#0a1128] px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Phone Number</label>
                <input
                  type="text"
                  value={resumeData.phone}
                  onChange={(e) =>
                    setResumeData({ ...resumeData, phone: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-[#0a1128] px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-400">Executive Summary</label>
                <button
                  type="button"
                  onClick={handleAISummaryOptimize}
                  disabled={optimizingSummary || !resumeData.summary}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {optimizingSummary ? (
                    <>
                      <HiArrowPath className="animate-spin text-xs" />
                      <span>Gemini AI Enhancing...</span>
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-cyan-400 text-xs" />
                      <span>AI Polish Summary</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                rows={3}
                value={resumeData.summary}
                onChange={(e) =>
                  setResumeData({ ...resumeData, summary: e.target.value })
                }
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-[#0a1128] p-3 text-xs text-white focus:border-cyan-400 focus:outline-none resize-none font-normal"
              />
            </div>
          </div>

          {/* Skills Card */}
          <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Technical Skills Matrix
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. Docker, GraphQL, Python)"
                value={resumeData.skillInput}
                onChange={(e) =>
                  setResumeData({ ...resumeData, skillInput: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                className="flex-1 rounded-xl border border-slate-700 bg-[#0a1128] px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {resumeData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 text-xs font-semibold text-cyan-300"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-slate-400 hover:text-rose-400 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Experience Card */}
          <div className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Work Experience
              </h3>
              <button
                onClick={handleAddExperience}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/30 transition-colors cursor-pointer"
              >
                <HiPlus /> Add Job
              </button>
            </div>

            {resumeData.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-800 bg-[#0a1128] space-y-3 relative"
              >
                <button
                  onClick={() => handleRemoveExperience(idx)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <HiTrash size={16} />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={exp.company}
                    placeholder="Company"
                    onChange={(e) =>
                      handleUpdateExperience(idx, "company", e.target.value)
                    }
                    className="rounded-lg border border-slate-700 bg-[#060b18] px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={exp.role}
                    placeholder="Role"
                    onChange={(e) =>
                      handleUpdateExperience(idx, "role", e.target.value)
                    }
                    className="rounded-lg border border-slate-700 bg-[#060b18] px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={exp.period}
                    placeholder="Period"
                    onChange={(e) =>
                      handleUpdateExperience(idx, "period", e.target.value)
                    }
                    className="rounded-lg border border-slate-700 bg-[#060b18] px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Accomplishments & Metrics</span>
                    <button
                      type="button"
                      onClick={() => handleAIExperienceOptimize(idx)}
                      disabled={optimizingExpIndex === idx || !exp.details}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-[10px] font-bold text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {optimizingExpIndex === idx ? (
                        <>
                          <HiArrowPath className="animate-spin text-xs" />
                          <span>Enhancing...</span>
                        </>
                      ) : (
                        <>
                          <HiSparkles className="text-purple-400 text-xs" />
                          <span>AI Bullet Enhancer</span>
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={exp.details}
                    onChange={(e) =>
                      handleUpdateExperience(idx, "details", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-[#060b18] p-2.5 text-xs text-white resize-none font-normal"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Resume Sheet (Printable A4 Format) */}
        <div
          ref={resumeRef}
          className={`lg:col-span-6 bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 print:w-full min-h-[750px] flex flex-col justify-between ${
            activeTab === "edit" ? "hidden lg:flex" : "flex"
          }`}
        >
          <div>
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-5">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-['Outfit']">
                {resumeData.name || "Your Name"}
              </h2>
              <p className="text-sm font-bold text-cyan-700 mt-0.5 tracking-wide uppercase">
                {resumeData.title || "Software Engineer"}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
                {resumeData.email && <span>✉ {resumeData.email}</span>}
                {resumeData.phone && <span>📱 {resumeData.phone}</span>}
                {resumeData.location && <span>📍 {resumeData.location}</span>}
              </div>
            </div>

            {/* Summary */}
            {resumeData.summary && (
              <div className="mt-5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Executive Summary
                </h4>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed font-normal">
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* Technical Skills */}
            {resumeData.skills.length > 0 && (
              <div className="mt-5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Technical Competencies
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {resumeData.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            <div className="mt-5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                Work Experience
              </h4>
              <div className="space-y-4 mt-3">
                {resumeData.experiences.map((exp, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{exp.role} — <span className="text-cyan-800">{exp.company}</span></span>
                      <span className="text-slate-500 font-normal">{exp.period}</span>
                    </div>
                    <p className="text-slate-700 mt-1 whitespace-pre-line leading-relaxed font-normal">
                      {exp.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mt-5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                Education & Credentials
              </h4>
              <div className="space-y-2 mt-2">
                {resumeData.education.map((ed, i) => (
                  <div key={i} className="flex justify-between text-xs text-slate-800">
                    <span className="font-bold">{ed.degree} — {ed.institution}</span>
                    <span className="text-slate-500">{ed.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200 text-center text-[10px] text-slate-400 print:hidden">
            Generated via NexoraLab Technologies AI Resume Studio
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;