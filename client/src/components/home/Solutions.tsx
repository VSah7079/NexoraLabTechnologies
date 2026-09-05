import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { FaBrain, FaFileAlt, FaUserTie, FaChartPie } from "react-icons/fa";
import { aiSolutionsImg } from "@/assets/images";

const aiFeatures = [
  {
    id: "resume",
    title: "AI Resume Analyzer",
    desc: "Scan resumes with deep semantic NLP to measure formatting, impact verbs, and technical competency.",
    icon: FaFileAlt,
    path: "/resume-analyzer",
    badge: "99.4% Match Accuracy",
    color: "from-[#00D2FF] to-[#0066FF]",
  },
  {
    id: "ats",
    title: "ATS Compatibility Engine",
    desc: "Calculate exact keyword match percentages against targeted enterprise job descriptions.",
    icon: FaBrain,
    path: "/ats-score",
    badge: "Enterprise Standard",
    color: "from-[#0066FF] to-[#7C3AED]",
  },
  {
    id: "interview",
    title: "AI Mock Interview Coach",
    desc: "Real-time AI behavioral & technical interview simulator with instant scoring & feedback.",
    icon: FaUserTie,
    path: "/interview",
    badge: "Voice & Text AI",
    color: "from-[#7C3AED] to-[#9333EA]",
  },
  {
    id: "skillgap",
    title: "Skill Gap Benchmark",
    desc: "Interactive radar analytics identifying missing skills and recommended training trajectories.",
    icon: FaChartPie,
    path: "/skill-gap",
    badge: "Dynamic Radar",
    color: "from-[#9333EA] to-[#00D2FF]",
  },
];

const enterpriseSolutions = [
  {
    id: 1,
    title: "Enterprise ERP & Operations",
    icon: "🏢",
    desc: "Custom Enterprise Resource Planning software with automated financial and resource pipelines.",
    tags: ["ERP", "Automation", "Finance"],
  },
  {
    id: 2,
    title: "Cloud Infrastructure & DevOps",
    icon: "☁️",
    desc: "Resilient AWS/Azure cloud deployments with CI/CD automation and containerized microservices.",
    tags: ["Cloud", "DevOps", "Docker/K8s"],
  },
  {
    id: 3,
    title: "AI Hiring & Recruitment Suite",
    icon: "🤖",
    desc: "Automate top 1% candidate discovery with AI resume scoring and interview analytics.",
    tags: ["Recruiting AI", "ATS", "Talent"],
  },
  {
    id: 4,
    title: "B2B SaaS & Custom Portals",
    icon: "🚀",
    desc: "Scalable multi-tenant SaaS platforms with role-based access, stripe billing, and high uptime.",
    tags: ["SaaS", "Multi-Tenant", "Stripe"],
  },
  {
    id: 5,
    title: "High-Volume FinTech & POS",
    icon: "💳",
    desc: "Ultra-low latency payment workflows, automated GST billing, and bank-grade encryption.",
    tags: ["FinTech", "POS", "Security"],
  },
  {
    id: 6,
    title: "Healthcare & Education Systems",
    icon: "🏥",
    desc: "HIPAA/GDPR compliant management software for hospitals, clinics, universities, and colleges.",
    tags: ["Healthcare", "HIPAA", "EdTech"],
  },
];

const Solutions = () => {
  const [activeFeature, setActiveFeature] = useState(aiFeatures[0].id);

  return (
    <section
      id="solutions"
      className="relative overflow-hidden bg-transparent py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-[#070e1b]/90 px-5 py-2 text-xs sm:text-sm font-bold tracking-wide bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent shadow-[0_0_25px_rgba(0,210,255,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D2FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D2FF]" />
            </span>
            Next-Gen AI & Enterprise Suite
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
          >
            Intelligent{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              AI Solutions
            </span>{" "}
            & Digital Platforms
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Powering business operations with automated candidate evaluation tools, custom cloud software, and AI-driven growth frameworks.
          </motion.p>
        </div>

        {/* ======================================================== */}
        {/* FLAGSHIP SHOWCASE: AI Hiring & Talent Insights Mockup    */}
        {/* ======================================================== */}
        <div className="mb-20 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-3xl transition-all duration-300 hover:border-[#00D2FF]/40 hover:shadow-[0_25px_70px_rgba(0,102,255,0.2)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: AI Feature Tabs & Explanation */}
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-block rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 px-3.5 py-1 text-xs font-semibold text-[#00D2FF]">
                ⚡ Nexora AI Engine
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Talent Insights & AI Assessment Platform
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Replace manual screening with intelligent resume analytics, automated ATS scoring, and conversational AI mock evaluations.
              </p>

              {/* Interactive feature selector cards */}
              <div className="space-y-2.5 pt-2">
                {aiFeatures.map((feat) => (
                  <div
                    key={feat.id}
                    onClick={() => setActiveFeature(feat.id)}
                    className={`
                      cursor-pointer
                      rounded-2xl
                      p-4
                      border
                      transition-all
                      duration-300
                      ${
                        activeFeature === feat.id
                          ? "border-[#00D2FF]/70 bg-[#0e1938] shadow-lg shadow-cyan-500/20"
                          : "border-slate-800/90 bg-[#0b132b]/80 hover:border-slate-700 hover:bg-[#0f1b3d]"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <feat.icon className="text-[#00D2FF] text-lg" />
                        <span className="font-bold text-sm sm:text-base text-white">
                          {feat.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#00D2FF]/20 text-[#00D2FF]">
                        {feat.badge}
                      </span>
                    </div>
                    {activeFeature === feat.id && (
                      <p className="mt-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed pl-7">
                        {feat.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to="/resume-analyzer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                >
                  <span>Launch AI Analyzer Tool</span>
                  <HiArrowRight />
                </Link>
              </div>
            </div>

            {/* Right: Rich Image Mockup Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#00D2FF]/20 via-[#0066FF]/15 to-[#7C3AED]/20 blur-3xl opacity-75 pointer-events-none" />
              
              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-2 sm:p-2.5 shadow-2xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:shadow-[0_20px_50px_rgba(0,102,255,0.25)]">
                <img
                  src={aiSolutionsImg}
                  alt="AI Talent Insights Dashboard Interface"
                  className="w-full h-auto rounded-2xl object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ENTERPRISE SOLUTIONS GRID                                */}
        {/* ======================================================== */}
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Enterprise Custom Software Modules
          </h3>
          <p className="mt-2 text-sm sm:text-base text-slate-300 font-normal">
            Tailor-made software architectures for high-growth sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enterpriseSolutions.map((solution) => (
            <motion.div
              key={solution.id}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:bg-[#0f1b3d] hover:shadow-[0_12px_35px_rgba(0,102,255,0.18)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00D2FF]/15 to-[#0066FF]/20 border border-[#00D2FF]/30 text-3xl mb-4">
                {solution.icon}
              </div>

              <h4 className="text-lg font-bold text-white">
                {solution.title}
              </h4>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {solution.desc}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {solution.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700/70 bg-[#070e1b] px-2.5 py-0.5 text-[10px] text-slate-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  to="/services"
                  className="text-xs font-semibold text-[#00D2FF] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Architecture</span>
                  <HiArrowRight className="text-xs" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;