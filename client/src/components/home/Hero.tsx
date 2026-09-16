import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiRocketLaunch,
  HiShieldCheck,
  HiSparkles,
  HiCpuChip,
  HiCommandLine,
  HiCheckCircle,
  HiCodeBracket,
  HiServerStack,
  HiPlay,
} from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";

const techPills = [
  { name: "Next.js 16", color: "from-cyan-400 to-blue-500" },
  { name: "React 19", color: "from-blue-400 to-indigo-500" },
  { name: "Python / FastAPI", color: "from-emerald-400 to-teal-500" },
  { name: "AWS Cloud & EKS", color: "from-amber-400 to-orange-500" },
  { name: "15ms Neural ATS", color: "from-purple-400 to-pink-500" },
  { name: "Docker & K8s", color: "from-blue-500 to-cyan-500" },
];

const stats = [
  {
    number: "250+",
    label: "Shipped Systems",
    sublabel: "Web, Mobile & Cloud",
    icon: HiRocketLaunch,
    iconColor: "text-cyan-400",
    bgGradient: "from-cyan-500/15 to-blue-500/10",
    borderColor: "hover:border-cyan-500/40",
  },
  {
    number: "99.4%",
    label: "AI Accuracy SLA",
    sublabel: "Benchmarked Models",
    icon: HiSparkles,
    iconColor: "text-blue-400",
    bgGradient: "from-blue-500/15 to-indigo-500/10",
    borderColor: "hover:border-blue-500/40",
  },
  {
    number: "100%",
    label: "Dedicated Delivery",
    sublabel: "Siwan, Bihar HQ",
    icon: HiCpuChip,
    iconColor: "text-purple-400",
    bgGradient: "from-purple-500/15 to-pink-500/10",
    borderColor: "hover:border-purple-500/40",
  },
  {
    number: "24/7",
    label: "DevOps & SRE SLA",
    sublabel: "99.99% Uptime Guarantee",
    icon: HiShieldCheck,
    iconColor: "text-emerald-400",
    bgGradient: "from-emerald-500/15 to-teal-500/10",
    borderColor: "hover:border-emerald-500/40",
  },
];

const Hero: React.FC = () => {
  const { openQuoteModal } = useModal();

  return (
    <section className="relative min-h-[95vh] w-full overflow-hidden pt-32 sm:pt-36 md:pt-44 pb-16 md:pb-24 flex items-center bg-transparent">
      {/* Background Animated Glowing Blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-[#0066FF]/12 blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-5 w-[450px] h-[450px] rounded-full bg-[#00D2FF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-5 w-[550px] h-[550px] rounded-full bg-[#7C3AED]/12 blur-[160px] pointer-events-none" />

      {/* Cyber Grid Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#00D2FF 1px, transparent 1px), linear-gradient(to right, #00D2FF 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Kicker Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs md:text-sm font-semibold text-slate-200 backdrop-blur-md shadow-[0_0_25px_rgba(0,210,255,0.2)]"
            >
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#00D2FF] animate-ping" />
              <span className="text-[#00D2FF] font-bold tracking-wider">NEXORALAB</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Innovate • Build • Elevate</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.14] font-['Outfit']"
            >
              Architecting <span className="whitespace-nowrap">Next-Gen</span>{" "}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Software & AI Systems
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl"
            >
              We engineer mission-critical web applications, high-performance cross-platform mobile apps, proprietary neural ATS intelligence, and fault-tolerant cloud architectures for high-growth enterprises worldwide.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={openQuoteModal}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(0,102,255,0.6)] hover:scale-105 active:scale-95"
              >
                <span>Request Project Estimate</span>
                <HiArrowRight className="text-lg" />
              </button>

              <Link
                to="/resume-analyzer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-7 py-4 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#00D2FF]/60 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(0,210,255,0.25)]"
              >
                <HiSparkles className="text-cyan-400 text-lg" />
                <span>Try AI Talent Suite</span>
              </Link>
            </motion.div>

            {/* Floating Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                ✦ Core Engineering Tech Stacks
              </span>
              <div className="flex flex-wrap gap-2">
                {techPills.map((pill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#070e1e]/80 px-3 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-md transition hover:border-[#00D2FF]/50"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF]" />
                    {pill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Live Architecture Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Glow Capsule */}
            <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#09152e]/90 via-[#070e1e]/95 to-[#040813] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(0,210,255,0.12)] backdrop-blur-2xl overflow-hidden">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400">nexoralab-node-production</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  ● 99.99% Online
                </span>
              </div>

              {/* Terminal Execution Body */}
              <div className="py-4 space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-cyan-400">GET /api/v2/ai/resume-parse</span>
                  <span className="text-emerald-400 font-bold">14.2ms [200 OK]</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-blue-400">K8S Pods / AutoScale</span>
                  <span className="text-cyan-300">12 Nodes • 0% Loss</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-purple-400">DB Vector Search (pgvector)</span>
                  <span className="text-purple-300">99.4% Match SLA</span>
                </div>
              </div>

              {/* Showcase Mini Graphic Card */}
              <div className="mt-3 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border border-cyan-500/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Enterprise SLA SLA
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">SOC 2 & ISO 27001</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] w-[99.4%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                  <span>Latency: &lt; 20ms</span>
                  <span>Code Ownership: 100%</span>
                  <span>Uptime: 99.99%</span>
                </div>
              </div>

              {/* Bottom Trigger */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[11px] text-slate-400 block">Ready to deploy?</span>
                  <span className="text-xs font-bold text-white">Get a 24-hr scope estimate</span>
                </div>
                <button
                  onClick={openQuoteModal}
                  className="rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0066FF] px-4 py-2 text-xs font-bold text-white shadow-md hover:brightness-110"
                >
                  Consult Architects →
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom 4-Column Stat Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#070e1e]/85 p-6 text-left backdrop-blur-xl transition-all duration-300 ${stat.borderColor} hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.bgGradient} border border-white/10 shadow-md`}
                  >
                    <Icon className={`text-2xl ${stat.iconColor}`} />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      {stat.number}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;