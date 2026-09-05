import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiSparkles,
  HiRocketLaunch,
  HiShieldCheck,
  HiUsers,
  HiCheckCircle,
  HiCpuChip,
  HiDocumentMagnifyingGlass,
  HiMicrophone,
  HiCloudArrowUp,
  HiCommandLine,
  HiCheck,
  HiBolt,
} from "react-icons/hi2";

type ShowcaseTab = "ats" | "interview" | "cloud" | "code";

const AnimatedCounter = ({ value, decimals = 0 }: { value: number; decimals?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1800;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = easeProgress * value;
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value]);

  return <span>{displayValue.toFixed(decimals)}</span>;
};

const statsData = [
  {
    numericValue: 250,
    suffix: "+",
    label: "Shipped Systems",
    tag: "Enterprise Grade",
    icon: HiRocketLaunch,
    iconBg: "from-[#00D2FF]/20 to-[#0066FF]/30",
    iconColor: "text-[#00D2FF]",
    borderColor: "hover:border-[#00D2FF]/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(0,210,255,0.25)]",
    topLine: "from-transparent via-[#00D2FF] to-transparent",
  },
  {
    numericValue: 99.4,
    decimals: 1,
    suffix: "%",
    label: "AI Accuracy SLA",
    tag: "Benchmarked",
    icon: HiSparkles,
    iconBg: "from-[#0066FF]/20 to-[#7C3AED]/30",
    iconColor: "text-[#38BDF8]",
    borderColor: "hover:border-[#0066FF]/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(0,102,255,0.25)]",
    topLine: "from-transparent via-[#0066FF] to-transparent",
  },
  {
    numericValue: 120,
    suffix: "+",
    label: "Global Clients",
    tag: "USA • EU • APAC",
    icon: HiUsers,
    iconBg: "from-[#7C3AED]/20 to-[#9333EA]/30",
    iconColor: "text-[#A78BFA]",
    borderColor: "hover:border-[#7C3AED]/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(124,58,237,0.25)]",
    topLine: "from-transparent via-[#7C3AED] to-transparent",
  },
  {
    isSpecial: true,
    valueString: "24/7",
    label: "DevOps & Cloud SLA",
    tag: "99.99% Uptime",
    icon: HiShieldCheck,
    iconBg: "from-emerald-500/20 to-cyan-500/30",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]",
    topLine: "from-transparent via-emerald-400 to-transparent",
  },
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("ats");
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Auto-cycle tabs every 6.5s unless user manually interacts
  useEffect(() => {
    if (!isAutoCycling) return;
    const tabs: ShowcaseTab[] = ["ats", "interview", "cloud", "code"];
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const nextIndex = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const handleManualTabChange = (tab: ShowcaseTab) => {
    setIsAutoCycling(false);
    setActiveTab(tab);
  };

  return (
    <section
      id="home"
      className="
        relative
        min-h-[94vh]
        w-full
        overflow-hidden
        flex
        items-center
        pt-24
        sm:pt-28
        md:pt-32
        pb-16
        md:pb-24
        bg-transparent
      "
    >
      {/* 1. Deep Space Cyber Lighting & Ambient Orbs */}
      <div className="absolute top-1/4 left-5 w-[500px] h-[500px] rounded-full bg-[#00D2FF]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-5 w-[550px] h-[550px] rounded-full bg-[#7C3AED]/12 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#0066FF]/05 blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Premium Headline, Badge, CTAs, KPIs          */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            
            {/* Shimmering Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="
                group
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-white/[0.12]
                bg-white/[0.04]
                hover:border-[#00D2FF]/50
                backdrop-blur-2xl
                px-4
                py-1.5
                mb-6
                shadow-[0_0_25px_rgba(0,210,255,0.15)]
                transition-all
                duration-300
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D2FF] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D2FF]" />
              </span>
              <span className="text-xs sm:text-[13px] font-bold tracking-wide bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                NEXT-GEN AI HIRING & DIGITAL PLATFORMS
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="
                text-3xl
                xs:text-4xl
                sm:text-5xl
                md:text-6xl
                xl:text-[64px]
                font-black
                tracking-tight
                leading-[1.1]
                text-white
                font-['Outfit']
              "
            >
              Engineering the{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,210,255,0.25)]">
                Next Frontier
              </span>{" "}
              of Digital Systems & AI
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="
                mt-5
                sm:mt-6
                text-base
                sm:text-lg
                text-slate-300
                leading-relaxed
                max-w-xl
                font-normal
              "
            >
              NexoraLab Technologies architects bespoke enterprise software, AI smart hiring engines (ATS Scoring, Semantic Resume Analyzers, Mock Interview AI), and high-velocity cloud infrastructures built for exponential scale.
            </motion.p>

            {/* CTA Buttons Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 sm:mt-10 flex flex-wrap gap-4 w-full sm:w-auto items-center"
            >
              <Link
                to="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-gradient-to-r
                  from-[#00D2FF]
                  via-[#0066FF]
                  to-[#7C3AED]
                  px-7
                  py-3.5
                  sm:px-8
                  sm:py-4
                  text-sm
                  sm:text-base
                  font-bold
                  text-white
                  shadow-[0_0_30px_rgba(0,210,255,0.35)]
                  transition-all
                  duration-300
                  hover:shadow-[0_0_45px_rgba(0,102,255,0.6)]
                  hover:scale-[1.02]
                  active:scale-95
                "
              >
                <span>Start Your Project</span>
                <HiArrowRight className="text-lg group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to="/ai-tools"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-white/[0.12]
                  bg-white/[0.04]
                  backdrop-blur-xl
                  px-7
                  py-3.5
                  sm:px-8
                  sm:py-4
                  text-sm
                  sm:text-base
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-black/40
                  transition-all
                  duration-300
                  hover:border-[#00D2FF]/50
                  hover:bg-white/[0.08]
                  hover:shadow-[0_0_25px_rgba(0,210,255,0.2)]
                  hover:scale-[1.02]
                  active:scale-95
                "
              >
                <HiSparkles className="text-[#00D2FF]" />
                <span>Explore AI Tools</span>
              </Link>
            </motion.div>

            {/* ======================================================== */}
            {/* LUXURY REDESIGNED KPI STATS CARDS                       */}
            {/* ======================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="
                mt-10
                sm:mt-12
                grid
                grid-cols-2
                sm:grid-cols-4
                gap-3.5
                sm:gap-3
                lg:gap-3.5
                w-full
              "
            >
              {statsData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/[0.1]
                      bg-gradient-to-b
                      from-[#0b1426]/90
                      to-[#050b17]/95
                      p-4
                      sm:p-4
                      backdrop-blur-2xl
                      shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                      transition-all
                      duration-300
                      ${item.borderColor}
                      ${item.glowColor}
                    `}
                  >
                    {/* Top Animated Gradient Accent Line */}
                    <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${item.topLine} opacity-80 group-hover:opacity-100 transition-opacity`} />
                    
                    {/* Header: Icon Pod + Live Status Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr ${item.iconBg} border border-white/[0.08] shadow-inner`}>
                        <Icon className={`text-lg ${item.iconColor}`} />
                      </div>
                      
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-slate-300">
                        {index === 3 ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ) : null}
                        {item.tag}
                      </span>
                    </div>

                    {/* Numeric Value */}
                    <div className="text-2xl sm:text-2xl lg:text-[26px] font-black text-white tracking-tight leading-none font-['Outfit'] flex items-baseline">
                      {item.isSpecial ? (
                        <span className="bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                          {item.valueString}
                        </span>
                      ) : (
                        <span className="bg-gradient-to-r from-white via-slate-100 to-[#38BDF8] bg-clip-text text-transparent">
                          <AnimatedCounter
                            value={item.numericValue || 0}
                            decimals={item.decimals || 0}
                          />
                          {item.suffix}
                        </span>
                      )}
                    </div>

                    {/* Metric Label */}
                    <div className="mt-1.5 text-[11px] sm:text-xs text-slate-300 font-medium leading-tight line-clamp-1">
                      {item.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Trust Assurance Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium"
            >
              <HiCheckCircle className="text-[#00D2FF] text-lg shrink-0" />
              <span>ISO Certified • SOC2 Ready • NDA Protected • Instant Consultation</span>
            </motion.div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Holographic AI Software & Smart Hiring Deck */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center w-full"
          >
            {/* Ambient Multi-Spectrum Halo Glow */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-r from-[#00D2FF]/20 via-[#0066FF]/15 to-[#7C3AED]/25 blur-3xl opacity-80 pointer-events-none" />

            {/* Main Cyber Glass Console Frame */}
            <div
              className="
                relative
                w-full
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.14]
                bg-[#070e1e]/95
                p-3.5
                sm:p-4
                shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(0,210,255,0.18),0_1px_1px_rgba(255,255,255,0.15)_inset]
                backdrop-blur-3xl
                transition-all
                duration-300
                hover:border-[#00D2FF]/40
              "
            >
              {/* Top Window Bar */}
              <div className="flex items-center justify-between px-2 sm:px-3 py-2 border-b border-white/[0.08] mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  <span className="hidden sm:inline-block text-[11px] font-mono font-semibold text-slate-400 pl-2">
                    nexoralab.ai/console
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D2FF] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D2FF]" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] bg-clip-text text-transparent uppercase">
                    AI PLATFORM v5.2 • LIVE
                  </span>
                </div>
              </div>

              {/* Interactive Navigation Switcher Tabs */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl mb-3.5">
                {[
                  { id: "ats", label: "ATS Parser", icon: HiDocumentMagnifyingGlass },
                  { id: "interview", label: "Mock AI", icon: HiMicrophone },
                  { id: "cloud", label: "Cloud Hub", icon: HiCloudArrowUp },
                  { id: "code", label: "AI Engine", icon: HiCommandLine },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleManualTabChange(tab.id as ShowcaseTab)}
                      className={`
                        relative
                        flex
                        items-center
                        justify-center
                        gap-1.5
                        py-2
                        px-2
                        rounded-lg
                        text-xs
                        font-bold
                        transition-all
                        duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] text-white shadow-[0_0_15px_rgba(0,210,255,0.3)]"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                        }
                      `}
                    >
                      <Icon className="text-sm shrink-0" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Interactive Display Area */}
              <div className="relative min-h-[350px] sm:min-h-[380px] w-full overflow-hidden rounded-2xl bg-[#040814] border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between">
                
                {/* Background Grid Pattern & Subtle Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(#00D2FF_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.07] pointer-events-none" />
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#00D2FF]/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#7C3AED]/10 blur-3xl pointer-events-none" />

                {/* Animated Vertical Laser Scan Bar for Active Futuristic Effect */}
                <motion.div
                  animate={{ y: [0, 340, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent shadow-[0_0_12px_#00D2FF] opacity-75 z-20 pointer-events-none"
                />

                <AnimatePresence mode="wait">
                  {/* TAB 1: AI SMART HIRING & ATS ENGINE */}
                  {activeTab === "ats" && (
                    <motion.div
                      key="ats"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 flex flex-col justify-between h-full space-y-4"
                    >
                      {/* Top Candidate & Match Score Card */}
                      <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-xl bg-gradient-to-tr from-[#00D2FF] to-[#7C3AED] p-0.5 shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                            <div className="h-full w-full rounded-[10px] bg-[#070e1e] flex items-center justify-center font-black text-base text-white font-['Outfit']">
                              AR
                            </div>
                            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#070e1e]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                                Alex Rivera
                              </h4>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                                Top 1% Match
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">
                              Lead AI & Full Stack Architect • 8+ Yrs Exp
                            </p>
                          </div>
                        </div>

                        {/* Circular Score Gauge */}
                        <div className="flex flex-col items-center">
                          <div className="relative flex items-center justify-center h-13 w-13">
                            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                              <path
                                className="text-white/10"
                                strokeWidth="3.5"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-[#00D2FF]"
                                strokeDasharray="99.2, 100"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                stroke="url(#scoreGrad)"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <defs>
                                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#00D2FF" />
                                  <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <span className="absolute text-xs font-black text-white font-['Outfit']">
                              99%
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">ATS Score</span>
                        </div>
                      </div>

                      {/* Extracted Skills Matrix */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <HiCpuChip className="text-[#00D2FF]" />
                            Semantic Skills Extracted (14 Verified)
                          </span>
                          <span className="text-[11px] font-mono text-[#00D2FF]">
                            Latency: 12ms
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { name: "React 19 / Next.js", score: "99%" },
                            { name: "TypeScript", score: "98%" },
                            { name: "PyTorch & AI/LLMs", score: "97%" },
                            { name: "Distributed Microservices", score: "99%" },
                            { name: "Cloud Architecture (AWS/K8s)", score: "96%" },
                          ].map((skill, i) => (
                            <span
                              key={i}
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                px-2.5
                                py-1
                                rounded-lg
                                bg-white/[0.04]
                                border
                                border-white/[0.08]
                                text-[11px]
                                font-semibold
                                text-slate-200
                                hover:border-[#00D2FF]/40
                                transition-colors
                              "
                            >
                              <HiCheck className="text-emerald-400 text-xs" />
                              {skill.name}
                              <span className="text-[10px] text-[#00D2FF] font-mono">
                                {skill.score}
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Match Breakdown Progress Bars */}
                      <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <div>
                          <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-1">
                            <span>Keyword & Experience Match</span>
                            <span className="text-emerald-400 font-bold">99.4%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "99.4%" }}
                              transition={{ duration: 0.8 }}
                              className="h-full rounded-full bg-gradient-to-r from-[#00D2FF] to-emerald-400"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-1">
                            <span>System Architecture & Technical Depth</span>
                            <span className="text-[#00D2FF] font-bold">98.1%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "98.1%" }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              className="h-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D2FF]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                          <span className="text-xs font-semibold text-emerald-300">
                            Auto-Shortlisted for Lead Round
                          </span>
                        </div>
                        <Link
                          to="/ai-tools/resume-analyzer"
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-3.5
                            py-1.5
                            rounded-lg
                            bg-gradient-to-r
                            from-[#00D2FF]
                            to-[#0066FF]
                            text-white
                            text-xs
                            font-bold
                            shadow-[0_0_15px_rgba(0,210,255,0.3)]
                            hover:scale-105
                            transition-transform
                          "
                        >
                          <HiBolt className="text-xs" />
                          Test Resume Analyzer
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: NEURAL MOCK INTERVIEW AI */}
                  {activeTab === "interview" && (
                    <motion.div
                      key="interview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 flex flex-col justify-between h-full space-y-3.5"
                    >
                      {/* Active AI Interview Session Prompt */}
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="flex items-center gap-2 text-xs font-bold text-white">
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                            Live AI Technical Interview • Question 3/5
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[10px] font-mono text-[#A78BFA] font-bold">
                            Confidence: 96.8%
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                          &ldquo;How do you guarantee idempotency and zero data loss in a distributed event-driven microservice system?&rdquo;
                        </p>
                      </div>

                      {/* Live Audio Waveform Visualizer */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col items-center justify-center">
                        <span className="text-[10px] font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                          <HiMicrophone className="text-[#00D2FF]" />
                          Candidate Audio Stream (Real-Time Neural Speech-to-Text)
                        </span>
                        <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-12 w-full px-2">
                          {[30, 65, 45, 80, 95, 60, 40, 75, 90, 100, 70, 50, 85, 60, 40, 75, 90, 55, 35, 70, 85, 60, 45, 80, 50].map((height, i) => (
                            <motion.span
                              key={i}
                              animate={{ height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`] }}
                              transition={{
                                duration: 0.8 + (i % 5) * 0.1,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: (i % 6) * 0.08,
                              }}
                              className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-[#00D2FF] via-[#0066FF] to-[#7C3AED]"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Live AI Analysis Metrics */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <div className="text-xs sm:text-sm font-black text-white font-['Outfit']">98.2%</div>
                          <div className="text-[10px] text-slate-400">Technical Depth</div>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <div className="text-xs sm:text-sm font-black text-emerald-400 font-['Outfit']">Confident</div>
                          <div className="text-[10px] text-slate-400">Tone & Pace</div>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <div className="text-xs sm:text-sm font-black text-[#00D2FF] font-['Outfit']">99.0%</div>
                          <div className="text-[10px] text-slate-400">Logic & Structure</div>
                        </div>
                      </div>

                      {/* Bottom AI Verdict */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                          <HiSparkles className="text-[#00D2FF]" />
                          Automated Rubric Evaluation Generated
                        </span>
                        <Link
                          to="/ai-tools/mock-interview"
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-3.5
                            py-1.5
                            rounded-lg
                            bg-gradient-to-r
                            from-[#7C3AED]
                            to-[#0066FF]
                            text-white
                            text-xs
                            font-bold
                            shadow-[0_0_15px_rgba(124,58,237,0.3)]
                            hover:scale-105
                            transition-transform
                          "
                        >
                          Launch Mock AI
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: CLOUD & ENTERPRISE INFRASTRUCTURE */}
                  {activeTab === "cloud" && (
                    <motion.div
                      key="cloud"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 flex flex-col justify-between h-full space-y-3.5"
                    >
                      {/* Cluster Status Top Bar */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { label: "API Throughput", val: "14.8k req/s", color: "text-[#00D2FF]" },
                          { label: "Global Latency", val: "9.2ms", color: "text-emerald-400" },
                          { label: "Uptime SLA", val: "99.99%", color: "text-[#7C3AED]" },
                          { label: "K8s Pods", val: "32 Active", color: "text-amber-400" },
                        ].map((stat, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
                            <div className={`text-xs sm:text-sm font-black font-['Outfit'] ${stat.color}`}>
                              {stat.val}
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Live Microservices Pipeline Telemetry */}
                      <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] font-mono text-[11px] text-slate-300 space-y-1.5 overflow-hidden">
                        <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/[0.06]">
                          <span>MICROSERVICE</span>
                          <span>HEALTH</span>
                          <span>LATENCY</span>
                        </div>
                        {[
                          { name: "auth-gateway.nexora.io", status: "HEALTHY", time: "8ms" },
                          { name: "ats-neural-parser-v5", status: "HEALTHY", time: "12ms" },
                          { name: "interview-voice-evaluator", status: "HEALTHY", time: "14ms" },
                          { name: "vector-search-embeddings", status: "HEALTHY", time: "6ms" },
                        ].map((srv, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-white truncate max-w-[170px]">{srv.name}</span>
                            <span className="text-emerald-400 font-bold">{srv.status}</span>
                            <span className="text-[#00D2FF]">{srv.time}</span>
                          </div>
                        ))}
                      </div>

                      {/* Cloud Scalability Footer */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                          <HiShieldCheck className="text-emerald-400 text-base" />
                          Multi-Region AWS & Kubernetes Mesh
                        </span>
                        <Link
                          to="/services"
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-3.5
                            py-1.5
                            rounded-lg
                            bg-gradient-to-r
                            from-[#00D2FF]
                            to-[#0066FF]
                            text-white
                            text-xs
                            font-bold
                            shadow-[0_0_15px_rgba(0,210,255,0.3)]
                            hover:scale-105
                            transition-transform
                          "
                        >
                          View Cloud Stack
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: LIVE AI DEV STUDIO */}
                  {activeTab === "code" && (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 flex flex-col justify-between h-full space-y-3 font-mono"
                    >
                      {/* Interactive Code Window */}
                      <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] text-[11px] leading-relaxed text-slate-300">
                        <div className="text-slate-500 mb-1">// NexoraLab Autonomous AI Hiring Pipeline</div>
                        <p>
                          <span className="text-[#7C3AED]">import</span> &#123; NexoraNeuralCore &#125;{" "}
                          <span className="text-[#7C3AED]">from</span>{" "}
                          <span className="text-emerald-300">&apos;@nexora/ai-engine&apos;</span>;
                        </p>
                        <p className="mt-1.5">
                          <span className="text-[#00D2FF]">const</span> ai ={" "}
                          <span className="text-amber-300">new</span> NexoraNeuralCore(&#123;
                        </p>
                        <p className="pl-4 text-slate-300">
                          model: <span className="text-emerald-300">&apos;ats-semantic-v5.2&apos;</span>,
                        </p>
                        <p className="pl-4 text-slate-300">
                          autoShortlistThreshold: <span className="text-[#00D2FF]">0.95</span>,
                        </p>
                        <p>&#125;);</p>
                        <p className="mt-1.5">
                          <span className="text-[#00D2FF]">const</span> result ={" "}
                          <span className="text-[#7C3AED]">await</span> ai.evaluateResume(candidatePdf);
                        </p>
                        <p className="text-emerald-400 font-bold mt-1">
                          &gt; Score: 99.2% • Decision: AUTO_QUALIFIED (12ms)
                        </p>
                      </div>

                      {/* Real-time Streaming Logs */}
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[10px] space-y-1 text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="text-[#00D2FF] font-bold">[13:28:40]</span>
                          <span>Vector DB Embedding Synced: 4,800 records</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">[13:28:41]</span>
                          <span>ATS Neural Model Warmup Completed (0.04s)</span>
                        </div>
                      </div>

                      {/* Dev Footer */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-300 font-sans font-medium flex items-center gap-1.5">
                          <HiCommandLine className="text-[#00D2FF]" />
                          TypeScript & Python SDK Available
                        </span>
                        <Link
                          to="/contact"
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-3.5
                            py-1.5
                            rounded-lg
                            bg-gradient-to-r
                            from-[#00D2FF]
                            to-[#7C3AED]
                            text-white
                            text-xs
                            font-sans
                            font-bold
                            shadow-[0_0_15px_rgba(0,210,255,0.3)]
                            hover:scale-105
                            transition-transform
                          "
                        >
                          Request API Key
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Feature Badges Bar */}
              <div className="mt-3.5 flex items-center justify-between px-2 text-[11px] font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]" />
                  Realtime Pipeline
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF]" />
                  Smart Resume ATS
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]" />
                  Custom Enterprise SaaS
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;