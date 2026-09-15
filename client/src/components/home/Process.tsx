import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiPaintBrush,
  HiCommandLine,
  HiRocketLaunch,
  HiArrowTrendingUp,
  HiCheckCircle,
  HiArrowRight,
  HiArrowLeft,
  HiSparkles,
  HiClock,
} from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";

const steps = [
  {
    step: "01",
    id: "discovery",
    title: "Discovery & AI Feasibility",
    shortDesc: "Understand business goals, technical boundaries, and AI feasibility parameters.",
    icon: HiMagnifyingGlass,
    duration: "Week 1",
    tagline: "Laying the Technical Foundation",
    description:
      "We begin every engagement with an intensive technical discovery phase. Our solutions architects audit your functional specifications, target audience demographics, high-throughput scaling requirements, and third-party API dependencies to eliminate architectural risks upfront.",
    deliverables: [
      "Technical Architecture Blueprint & System Flow",
      "AI Model Feasibility & Latency Benchmarks",
      "Detailed Fixed-Scope Milestone Roadmap & SLA",
      "Non-Disclosure Agreement (NDA) & IP Handover Guarantee",
    ],
    techStack: ["Miro", "Jira", "Notion", "Postman", "OpenAI API", "Draw.io"],
  },
  {
    step: "02",
    id: "design",
    title: "Architecture & UI/UX Design",
    shortDesc: "Design pixel-perfect Figma user flows, design systems, and database schemas.",
    icon: HiPaintBrush,
    duration: "Weeks 2 - 3",
    tagline: "Crafting Intuitive, High-Converting Interfaces",
    description:
      "Our product designers craft modern, accessible, and responsive user experiences. We translate complex product workflows into clean, interactive Figma prototypes accompanied by complete design tokens, typography scales, and modular component libraries.",
    deliverables: [
      "Interactive High-Fidelity Figma Prototypes",
      "Comprehensive Design System (Tokens, Typography, Colors)",
      "Relational & Vector Database Schema Specifications",
      "REST & GraphQL API Contract Documentation",
    ],
    techStack: ["Figma", "Adobe CC", "TailwindCSS Design Tokens", "Lucidchart", "Swagger"],
  },
  {
    step: "03",
    id: "engineering",
    title: "Agile Engineering Sprints",
    shortDesc: "Develop the full-stack codebase in 2-week agile sprints with automated unit tests.",
    icon: HiCommandLine,
    duration: "Weeks 4 - 8",
    tagline: "Clean, Maintainable, Production-Grade Code",
    description:
      "Our dedicated senior engineering pods write clean, modular, and type-safe code in two-week agile sprints. You receive weekly live staging deployments, transparent Git commit logs, and regular sprint reviews to provide real-time feedback.",
    deliverables: [
      "Modular Full-Stack Codebase (React 19, Next.js, Node.js, Python)",
      "Automated Unit & Integration Test Suites (>85% Coverage)",
      "Bi-Weekly Staging Builds for Stakeholder Review",
      "Real-Time Slack/Jira Collaboration with Lead Developers",
    ],
    techStack: ["React 19", "Next.js 16", "TypeScript", "Python / FastAPI", "PostgreSQL", "Redis"],
  },
  {
    step: "04",
    id: "deployment",
    title: "Cloud Deployment & QA",
    shortDesc: "Perform end-to-end QA, load testing, security audits, and zero-downtime deployment.",
    icon: HiRocketLaunch,
    duration: "Weeks 9 - 10",
    tagline: "Hardened Security & Zero-Downtime Releases",
    description:
      "Prior to production release, our QA and DevOps engineers execute rigorous load testing, vulnerability scanning, and multi-device cross-browser validation. We deploy to multi-region cloud clusters with automated blue/green CI/CD pipelines.",
    deliverables: [
      "Automated End-to-End Cypress / Playwright QA Tests",
      "OWASP Security & Penetration Vulnerability Audit",
      "Zero-Downtime AWS/Azure Blue-Green Deployment Pipeline",
      "Complete Source Code, Git Repository & Cloud Ownership Transfer",
    ],
    techStack: ["AWS EKS", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Playwright"],
  },
  {
    step: "05",
    id: "scaling",
    title: "Continuous Scaling & SLA",
    shortDesc: "24/7 cloud telemetry, performance tuning, bug resolution, and continuous feature evolution.",
    icon: HiArrowTrendingUp,
    duration: "Ongoing SLA",
    tagline: "Guaranteed Uptime & Continuous Evolution",
    description:
      "Our partnership continues post-launch with 24/7 proactive cloud telemetry, database index optimization, real-time error alerts, and iterative feature development backed by an enterprise uptime service level agreement.",
    deliverables: [
      "24/7 Cloud Telemetry & Distributed Tracing (Prometheus/Grafana)",
      "Under-15-Minute Critical Incident Response Guarantee",
      "Continuous Database Query Tuning & Cache Invalidation",
      "Quarterly Security Patching & Feature Upgrades",
    ],
    techStack: ["Prometheus", "Grafana", "Datadog", "Sentry", "AWS CloudWatch", "PgBouncer"],
  },
];

const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { openQuoteModal } = useModal();

  const current = steps[activeStep];
  const Icon = current.icon;

  const nextStep = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
  };

  return (
    <section id="how-we-work" className="relative overflow-hidden bg-transparent py-20 sm:py-28 border-t border-white/10">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-[#00D2FF]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#7C3AED]/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF]" />
              <span>ENGINEERING METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.18] font-['Outfit'] tracking-tight">
              How We Build &{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Scale Your Software
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              We follow a milestone-driven product engineering lifecycle that combines strategic discovery, user-centric design, robust full-stack engineering, and continuous SLA monitoring.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevStep}
              aria-label="Previous step"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#070e1e]/80 text-white transition hover:border-[#00D2FF] hover:text-[#00D2FF] hover:bg-[#00D2FF]/10 active:scale-95 cursor-pointer shadow-lg"
            >
              <HiArrowLeft className="text-lg" />
            </button>
            <button
              onClick={nextStep}
              aria-label="Next step"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#070e1e]/80 text-white transition hover:border-[#00D2FF] hover:text-[#00D2FF] hover:bg-[#00D2FF]/10 active:scale-95 cursor-pointer shadow-lg"
            >
              <HiArrowRight className="text-lg" />
            </button>
          </div>
        </div>

        {/* Step Progression Tabs Rail */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {steps.map((item, index) => {
            const StepIcon = item.icon;
            const isActive = activeStep === index;
            return (
              <button
                key={item.id}
                onClick={() => setActiveStep(index)}
                className={`group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-[#00D2FF] bg-gradient-to-b from-[#0c1e40] to-[#070e1e] shadow-[0_0_25px_rgba(0,210,255,0.25)] scale-[1.02]"
                    : "border-white/10 bg-[#070e1e]/70 hover:border-white/20 hover:bg-[#0c1835]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#00D2FF] text-black shadow-md"
                        : "bg-white/5 text-slate-300 group-hover:text-white"
                    }`}
                  >
                    <StepIcon className="text-lg" />
                  </div>
                  <span
                    className={`font-mono text-xs font-black ${
                      isActive ? "text-[#00D2FF]" : "text-slate-500"
                    }`}
                  >
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-xs sm:text-sm font-bold leading-snug ${
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.duration}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Active Step Detail Card */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#091632] via-[#060e20] to-[#030610] p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="flex h-8 items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3.5 text-xs font-bold text-[#00D2FF]">
                      <Icon className="text-sm" />
                      <span>STEP {current.step}</span>
                    </span>
                    <span className="flex h-8 items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 text-xs font-semibold text-slate-300">
                      <HiClock className="text-cyan-400 text-sm" />
                      <span>{current.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Outfit'] leading-tight">
                    {current.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#00D2FF] font-semibold mt-1">
                    {current.tagline}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {current.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="mt-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Key Milestone Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs sm:text-sm text-slate-200"
                        >
                          <HiCheckCircle className="text-emerald-400 text-base shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Stack & CTA Box */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-[#070e1e]/90 p-6 sm:p-8 backdrop-blur-xl">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                        Tooling & Frameworks
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Stage {current.step}/05</span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {current.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-semibold text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 p-4 rounded-xl border border-white/5 bg-white/[0.03]">
                      <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                        <HiSparkles className="text-[#00D2FF]" />
                        <span>NexoraLab Quality Guarantee</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Every milestone undergoes automated regression suites, code reviews, and stakeholder approval before advancing to the next stage.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={openQuoteModal}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95"
                    >
                      <span>Start Discovery Phase</span>
                      <HiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Process;