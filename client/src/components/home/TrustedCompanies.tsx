import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMicrosoft,
  FaAws,
  FaMeta,
  FaStripe,
  FaSalesforce,
  FaDocker,
  FaReact,
  FaPython,
  FaGithub,
  FaBrain,
  FaServer,
  FaDatabase,
  FaBolt,
} from "react-icons/fa6";
import {
  SiGooglecloud,
  SiRazorpay,
  SiKubernetes,
  SiPostgresql,
  SiRedis,
  SiNextdotjs,
  SiFlutter,
  SiTypescript,
  SiTerraform,
  SiFastapi,
  SiApachekafka,
} from "react-icons/si";
import {
  HiSparkles,
  HiShieldCheck,
  HiArrowTrendingUp,
  HiCpuChip,
  HiCheckBadge,
} from "react-icons/hi2";

interface PartnerItem {
  name: string;
  category: "cloud" | "ai" | "frameworks" | "fintech";
  tag: string;
  icon: React.ElementType;
  iconColor: string;
  accentGlow: string;
  badge: string;
}

const partners: PartnerItem[] = [
  {
    name: "Amazon AWS",
    category: "cloud",
    tag: "Multi-Region Cloud Infrastructure",
    icon: FaAws,
    iconColor: "text-[#FF9900]",
    accentGlow: "group-hover:border-[#FF9900]/50 group-hover:shadow-[0_0_30px_rgba(255,153,0,0.25)]",
    badge: "Cloud Partner",
  },
  {
    name: "Microsoft Azure",
    category: "cloud",
    tag: "Enterprise Cloud & Microservices",
    icon: FaMicrosoft,
    iconColor: "text-[#00A4EF]",
    accentGlow: "group-hover:border-[#00A4EF]/50 group-hover:shadow-[0_0_30px_rgba(0,164,239,0.25)]",
    badge: "Cloud Partner",
  },
  {
    name: "Google Cloud",
    category: "cloud",
    tag: "BigQuery, Vertex & Compute Mesh",
    icon: SiGooglecloud,
    iconColor: "text-[#4285F4]",
    accentGlow: "group-hover:border-[#4285F4]/50 group-hover:shadow-[0_0_30px_rgba(66,133,244,0.25)]",
    badge: "Infrastructure",
  },
  {
    name: "OpenAI Models",
    category: "ai",
    tag: "LLM Orchestration & RAG Pipelines",
    icon: FaBrain,
    iconColor: "text-[#10A37F]",
    accentGlow: "group-hover:border-[#10A37F]/50 group-hover:shadow-[0_0_30px_rgba(16,163,127,0.25)]",
    badge: "AI Ecosystem",
  },
  {
    name: "Meta Tech",
    category: "frameworks",
    tag: "React Core & Business Platform",
    icon: FaMeta,
    iconColor: "text-[#0668E1]",
    accentGlow: "group-hover:border-[#0668E1]/50 group-hover:shadow-[0_0_30px_rgba(6,104,225,0.25)]",
    badge: "Tech Provider",
  },
  {
    name: "Stripe Payments",
    category: "fintech",
    tag: "Global Multi-Currency Billing",
    icon: FaStripe,
    iconColor: "text-[#635BFF]",
    accentGlow: "group-hover:border-[#635BFF]/50 group-hover:shadow-[0_0_30px_rgba(99,91,255,0.25)]",
    badge: "FinTech Gateway",
  },
  {
    name: "Razorpay Enterprise",
    category: "fintech",
    tag: "India Banking & Smart Checkout",
    icon: SiRazorpay,
    iconColor: "text-[#0C2340] text-cyan-400",
    accentGlow: "group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(0,210,255,0.25)]",
    badge: "FinTech Gateway",
  },
  {
    name: "Kubernetes (K8s)",
    category: "cloud",
    tag: "Zero-Downtime Container Mesh",
    icon: SiKubernetes,
    iconColor: "text-[#326CE5]",
    accentGlow: "group-hover:border-[#326CE5]/50 group-hover:shadow-[0_0_30px_rgba(50,108,229,0.25)]",
    badge: "Orchestration",
  },
  {
    name: "Docker Containers",
    category: "cloud",
    tag: "OCI Microservices & CI/CD",
    icon: FaDocker,
    iconColor: "text-[#2496ED]",
    accentGlow: "group-hover:border-[#2496ED]/50 group-hover:shadow-[0_0_30px_rgba(36,150,237,0.25)]",
    badge: "Containerization",
  },
  {
    name: "PostgreSQL Cluster",
    category: "ai",
    tag: "ACID Database & pgvector Index",
    icon: SiPostgresql,
    iconColor: "text-[#4169E1]",
    accentGlow: "group-hover:border-[#4169E1]/50 group-hover:shadow-[0_0_30px_rgba(65,105,225,0.25)]",
    badge: "Vector DB",
  },
  {
    name: "Redis Enterprise",
    category: "ai",
    tag: "Sub-Millisecond Cache & PubSub",
    icon: SiRedis,
    iconColor: "text-[#DC382D]",
    accentGlow: "group-hover:border-[#DC382D]/50 group-hover:shadow-[0_0_30px_rgba(220,56,45,0.25)]",
    badge: "High-Speed Cache",
  },
  {
    name: "Salesforce Cloud",
    category: "fintech",
    tag: "CRM Data & Enterprise Connectors",
    icon: FaSalesforce,
    iconColor: "text-[#00A1E0]",
    accentGlow: "group-hover:border-[#00A1E0]/50 group-hover:shadow-[0_0_30px_rgba(0,161,224,0.25)]",
    badge: "Enterprise CRM",
  },
  {
    name: "React 19 & Next.js 16",
    category: "frameworks",
    tag: "High-Velocity Frontend Architecture",
    icon: FaReact,
    iconColor: "text-[#00D2FF]",
    accentGlow: "group-hover:border-[#00D2FF]/50 group-hover:shadow-[0_0_30px_rgba(0,210,255,0.25)]",
    badge: "SSR Framework",
  },
  {
    name: "Python & FastAPI",
    category: "ai",
    tag: "High-Throughput AI Backend APIs",
    icon: FaPython,
    iconColor: "text-[#3776AB]",
    accentGlow: "group-hover:border-[#3776AB]/50 group-hover:shadow-[0_0_30px_rgba(55,118,171,0.25)]",
    badge: "AI Backend",
  },
  {
    name: "Flutter & React Native",
    category: "frameworks",
    tag: "60fps Cross-Platform Mobile Apps",
    icon: SiFlutter,
    iconColor: "text-[#02569B] text-sky-400",
    accentGlow: "group-hover:border-sky-400/50 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]",
    badge: "Mobile Engine",
  },
  {
    name: "TypeScript 5+",
    category: "frameworks",
    tag: "Type-Safe Enterprise Contracts",
    icon: SiTypescript,
    iconColor: "text-[#3178C6]",
    accentGlow: "group-hover:border-[#3178C6]/50 group-hover:shadow-[0_0_30px_rgba(49,120,198,0.25)]",
    badge: "Type-Safe Core",
  },
  {
    name: "Apache Kafka",
    category: "cloud",
    tag: "Real-Time Event Streaming",
    icon: SiApachekafka,
    iconColor: "text-white",
    accentGlow: "group-hover:border-white/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    badge: "Event Streaming",
  },
  {
    name: "Terraform IaC",
    category: "cloud",
    tag: "Automated Cloud Provisioning",
    icon: SiTerraform,
    iconColor: "text-[#844FBA]",
    accentGlow: "group-hover:border-[#844FBA]/50 group-hover:shadow-[0_0_30px_rgba(132,79,186,0.25)]",
    badge: "Infra as Code",
  },
];

const stats = [
  {
    label: "Production Deployments",
    value: "150+",
    sub: "Enterprise SaaS & Cloud Apps",
    icon: HiCheckBadge,
    color: "text-[#00D2FF]",
    bg: "from-cyan-500/15 via-blue-500/5 to-transparent",
    border: "border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,210,255,0.2)]",
  },
  {
    label: "Cloud Uptime SLA",
    value: "99.99%",
    sub: "High-Availability AWS & K8s",
    icon: HiShieldCheck,
    color: "text-emerald-400",
    bg: "from-emerald-500/15 via-teal-500/5 to-transparent",
    border: "border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
  },
  {
    label: "AI Neural Latency",
    value: "<15ms",
    sub: "Sub-Second LLM & OCR Engines",
    icon: FaBolt,
    color: "text-purple-400",
    bg: "from-purple-500/15 via-indigo-500/5 to-transparent",
    border: "border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
  },
  {
    label: "IP & Code Transfer",
    value: "100%",
    sub: "Full Source & Commercial Rights",
    icon: HiSparkles,
    color: "text-amber-400",
    bg: "from-amber-500/15 via-orange-500/5 to-transparent",
    border: "border-amber-500/20 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
  },
];

const filterTabs = [
  { id: "all", label: "🌟 All Ecosystem Partners" },
  { id: "cloud", label: "☁️ Cloud & DevOps" },
  { id: "ai", label: "🤖 AI & Vector DBs" },
  { id: "frameworks", label: "⚡ Web & Mobile" },
  { id: "fintech", label: "💳 FinTech & CRM" },
];

const marqueeLogos = [
  { name: "AMAZON WEB SERVICES", icon: FaAws, color: "text-[#FF9900]" },
  { name: "MICROSOFT AZURE", icon: FaMicrosoft, color: "text-[#00A4EF]" },
  { name: "GOOGLE CLOUD PLATFORM", icon: SiGooglecloud, color: "text-[#4285F4]" },
  { name: "OPENAI LLM MODELS", icon: FaBrain, color: "text-[#10A37F]" },
  { name: "STRIPE PAYMENTS", icon: FaStripe, color: "text-[#635BFF]" },
  { name: "RAZORPAY ENTERPRISE", icon: SiRazorpay, color: "text-cyan-400" },
  { name: "DOCKER CONTAINERS", icon: FaDocker, color: "text-[#2496ED]" },
  { name: "KUBERNETES MESH", icon: SiKubernetes, color: "text-[#326CE5]" },
  { name: "POSTGRESQL & PGVECTOR", icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "REDIS IN-MEMORY", icon: SiRedis, color: "text-[#DC382D]" },
  { name: "REACT 19 ARCHITECTURE", icon: FaReact, color: "text-[#00D2FF]" },
  { name: "NEXT.JS 16 ENTERPRISE", icon: SiNextdotjs, color: "text-white" },
];

const TrustedCompanies: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPartners =
    activeFilter === "all"
      ? partners
      : partners.filter((p) => p.category === activeFilter);

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#040814]/80 py-20 sm:py-24 backdrop-blur-xl">
      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#00D2FF]/8 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#7C3AED]/8 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header Section: 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, description and value pillars */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-[#00D2FF] animate-ping" />
              <span>GLOBAL ENTERPRISE TECH ECOSYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.15] font-['Outfit']">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                global enterprises
              </span>{" "}
              and ambitious innovators
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Leading businesses, high-growth startups, and visionary founders partner with NexoraLab Technologies to architect resilient cloud microservices, high-throughput web platforms, and proprietary AI automation pipelines.
            </p>

            {/* Value Trust Tags */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-cyan-400/40 transition">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Zero Vendor Lock-In</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-emerald-400/40 transition">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>SOC2 / GDPR Ready</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-purple-400/40 transition">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>Direct Senior Engineering Pods</span>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 High-Impact Metric Cards */}
          <div className="lg:col-span-6 xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {stats.map((s, idx) => {
              const StatIcon = s.icon;
              return (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-2xl border ${s.border} bg-gradient-to-br ${s.bg} bg-[#070e1e]/90 p-4 sm:p-5 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-[1.02] group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors">
                      {s.label}
                    </span>
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 ${s.color}`}>
                      <StatIcon className="text-sm" />
                    </div>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
                    {s.value}
                  </div>

                  <p className="mt-1 text-[11px] text-slate-400 font-normal leading-tight">
                    {s.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-b border-white/10 pb-5">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white shadow-[0_0_20px_rgba(0,210,255,0.35)] scale-105"
                  : "border border-white/10 bg-[#070e1e]/80 text-slate-300 hover:border-white/20 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Partner Logo Grid */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {filteredPartners.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03, duration: 0.3 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#070e1e]/90 p-5 backdrop-blur-xl transition-all duration-300 hover:bg-[#0c1a38] ${item.accentGlow}`}
                  >
                    {/* Top Glow Sheen */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                    <div>
                      {/* Logo Icon & Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-2xl transition-transform duration-300 group-hover:scale-110 shadow-inner">
                          <ItemIcon className={item.iconColor} />
                        </div>
                        <span className="rounded-full bg-white/5 border border-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-slate-400">
                          {item.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-['Outfit'] truncate">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-400 leading-relaxed line-clamp-2 font-normal">
                        {item.tag}
                      </p>
                    </div>

                    {/* Bottom Status Dot */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Production Ready
                      </span>
                      <span>✦ Enterprise</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Infinite Dual-Layer Marquee Ticker with Edge Masks */}
        <div className="mt-16 pt-10 border-t border-white/10 relative">
          {/* Left/Right Edge Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#040814] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#040814] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex w-max items-center gap-10 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-400"
          >
            {[...marqueeLogos, ...marqueeLogos].map((item, index) => {
              const MarqueeIcon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-[#070e1e]/80 px-5 py-2.5 backdrop-blur-md transition hover:border-[#00D2FF]/40 hover:text-white"
                >
                  <MarqueeIcon className={`text-base ${item.color}`} />
                  <span className="text-white text-xs font-bold">{item.name}</span>
                  <span className="text-[#00D2FF] text-xs">✦</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;