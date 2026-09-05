import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "@/components/common/SEO";
import {
  HiArrowRight,
  HiSparkles,
  HiXMark,
  HiCheckCircle,
  HiCpuChip,
  HiChartBar,
  HiClock,
  HiBuildingOffice2,
  HiEye,
  HiBolt,
} from "react-icons/hi2";
import {
  cloudSaasImg,
  mobileFintechImg,
  aiSolutionsImg,
  aboutTechImg,
} from "@/assets/images";

export interface CaseStudyProject {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  impact: string;
  client: string;
  timeline: string;
  challenge: string;
  solution: string;
  modules: string[];
  results: string[];
  techStack: string[];
  liveDemoLink?: string;
}

const categories = ["All", "AI Systems", "Enterprise Cloud", "Mobile & Web", "FinTech"];

const portfolioProjects: CaseStudyProject[] = [
  {
    id: 1,
    title: "AI Talent Intelligence & ATS Scoring Engine",
    category: "AI Systems",
    image: aiSolutionsImg,
    description: "Semantic NLP resume parsing and automated match scoring algorithm for enterprise recruiters.",
    tags: ["Python", "FastAPI", "OpenAI", "React", "TailwindCSS"],
    impact: "+85% Screening Speed",
    client: "Global Staffing Corp (USA)",
    timeline: "6 Weeks",
    challenge:
      "The client was overwhelmed with over 40,000 resumes monthly. Human recruiters spent 8+ minutes manually evaluating each candidate, causing severe hiring bottlenecks, candidate drop-offs, and subjective screening biases.",
    solution:
      "Engineered an autonomous ATS scoring pipeline using semantic vector embeddings, large language models (LLMs), and custom skill extraction to parse, score, and rank candidate profiles in under 15 milliseconds.",
    modules: [
      "Semantic PDF & DOCX OCR Resume Parser",
      "Vector DB Semantic Matching Engine (pgvector / Pinecone)",
      "Dynamic ATS Scoring & Confidence Meter (0 - 100%)",
      "Recruiter Dashboard with 1-Click Shortlisting & Export",
      "Bias-Free Candidate Anonymization Filter",
    ],
    results: [
      "+85% reduction in initial resume screening turnaround time",
      "4.8x increase in recruiter candidate placement throughput",
      "99.4% accuracy benchmarked against senior technical recruiters",
    ],
    techStack: ["Python", "FastAPI", "OpenAI API", "React 19", "TailwindCSS", "PostgreSQL", "Docker"],
    liveDemoLink: "/ai-tools/resume-analyzer",
  },
  {
    id: 2,
    title: "Synapse Cloud Microservices & Analytics Platform",
    category: "Enterprise Cloud",
    image: cloudSaasImg,
    description: "High-throughput cloud architecture monitoring distributed microservices with real-time telemetry.",
    tags: ["Node.js", "Kubernetes", "AWS", "TypeScript", "Redis"],
    impact: "99.99% Uptime",
    client: "SaaS Enterprise Group (UK)",
    timeline: "8 Weeks",
    challenge:
      "A legacy monolithic backend crashed under unpredictable peak enterprise traffic, resulting in 504 gateway timeouts, unmonitored silent failures, and sky-high hosting costs.",
    solution:
      "Decomposed the monolith into 18 resilient, auto-scaling Kubernetes microservices managed via AWS EKS, Redis caching layers, and sub-10ms event telemetry.",
    modules: [
      "Distributed Event Mesh Orchestrated with Apache Kafka",
      "Sub-10ms API Gateway with Smart Rate Limiting & Auth",
      "Automated Kubernetes Horizontal Pod Autoscaling (HPA)",
      "Real-Time Cloud Telemetry & Observability Visualizer",
      "Zero-Downtime Blue/Green CI/CD Pipeline",
    ],
    results: [
      "99.99% continuous production uptime maintained across 12 months",
      "64% reduction in monthly cloud infrastructure expenses",
      "Sub-12ms global median latency across US, EU, and APAC clusters",
    ],
    techStack: ["Node.js / TypeScript", "Go", "Kubernetes", "AWS EKS", "Terraform", "Redis", "Grafana"],
    liveDemoLink: "/services",
  },
  {
    id: 3,
    title: "FinTech Intelligence & Crypto Mobile App",
    category: "FinTech",
    image: mobileFintechImg,
    description: "Next-gen multi-platform mobile trading interface with AI market predictions and portfolio optimization.",
    tags: ["React Native", "WebSockets", "Go", "PostgreSQL"],
    impact: "250K+ Monthly Txns",
    client: "FinTech Capital Partners (Singapore)",
    timeline: "7 Weeks",
    challenge:
      "The client required a fluid, ultra-secure cross-platform mobile trading application capable of streaming live crypto and fiat market data without battery drain or network lag.",
    solution:
      "Engineered a high-velocity React Native mobile app backed by low-latency WebSocket streams, hardware-backed biometric security, and microservices ledger sync.",
    modules: [
      "Sub-second WebSocket Live Price Streaming & Candlestick Charts",
      "Biometric Secure Enclave Storage & PIN Fallback Security",
      "AI-Driven Portfolio Rebalancing & Smart Volatility Alerts",
      "Multi-Currency Fiat On-Ramp & Crypto Custody Integration",
      "Automated Regulatory KYC & AML Verification Flow",
    ],
    results: [
      "250,000+ monthly financial transactions processed flawlessly",
      "4.9 / 5.0 star average rating on Apple App Store & Google Play",
      "Zero security vulnerabilities identified during SOC2 audit",
    ],
    techStack: ["React Native", "Expo", "Go", "WebSockets", "PostgreSQL", "Redis", "Stripe API"],
    liveDemoLink: "/contact",
  },
  {
    id: 4,
    title: "Next-Gen AI Research & Engineering Lab Portal",
    category: "AI Systems",
    image: aboutTechImg,
    description: "Holographic enterprise command portal for automated robotics, neural pipelines, and 3D modeling.",
    tags: ["Next.js 15", "Three.js", "Python", "PyTorch"],
    impact: "10x Render Velocity",
    client: "Industrial Robotics Lab (Germany)",
    timeline: "6 Weeks",
    challenge:
      "Research engineers required an interactive in-browser 3D command portal to monitor real-time robotic telemetry, neural sensor arrays, and digital twins simultaneously.",
    solution:
      "Architected a WebGL / Three.js digital twin visualization platform integrated with Python PyTorch inference servers for sub-second robotic telemetry playback.",
    modules: [
      "Interactive Three.js 3D Digital Twin Simulation Engine",
      "Real-Time Neural Model Weights & Sensor Telemetry Graph",
      "Hardware Telemetry Streaming via MQTT & WebSockets",
      "Automated Anomaly Detection & Collision Warning Triggers",
      "Multi-Engineer Real-Time Collaboration Workspace",
    ],
    results: [
      "10x acceleration in complex 3D digital twin rendering speeds",
      "40% reduction in physical robot testbench downtime",
      "Global remote engineering telemetry enabled with sub-50ms sync",
    ],
    techStack: ["Next.js 15", "Three.js / WebGL", "Python", "PyTorch", "FastAPI", "WebSockets"],
    liveDemoLink: "/ai-tools",
  },
  {
    id: 5,
    title: "OmniChannel E-Commerce & Marketplace Suite",
    category: "Mobile & Web",
    image: mobileFintechImg,
    description: "High-scale multi-vendor online marketplace with instant Stripe checkout and inventory automation.",
    tags: ["React", "Express", "Stripe API", "MongoDB"],
    impact: "$12M+ GMV Processed",
    client: "Retail Hub Global (UAE)",
    timeline: "5 Weeks",
    challenge:
      "A traditional e-commerce store suffered from slow page loads (>4.5s), high cart abandonment, and chaotic inventory synchronization across 120+ vendor warehouses.",
    solution:
      "Engineered a headless, sub-second Next.js storefront paired with an automated multi-vendor portal, instant Stripe Connect payouts, and Elasticsearch indexing.",
    modules: [
      "Sub-Second Headless Next.js Storefront (<0.8s load time)",
      "Multi-Vendor Merchant Portal with Automated Payouts",
      "Elasticsearch Instant Typeahead & Faceted Search Engine",
      "Stripe 1-Click Checkout & Apple Pay / Google Pay Native Flows",
      "Automated Courier Dispatch Webhooks & SMS Tracking",
    ],
    results: [
      "$12M+ in gross merchandise value processed in the first year",
      "38% uplift in mobile checkout conversion rate",
      "Sub-second average search response across 100,000+ SKUs",
    ],
    techStack: ["Next.js", "Node.js", "Stripe Connect", "Elasticsearch", "MongoDB", "TailwindCSS"],
    liveDemoLink: "/contact",
  },
  {
    id: 6,
    title: "Hospital & Medical Health Intelligence ERP",
    category: "Enterprise Cloud",
    image: cloudSaasImg,
    description: "HIPAA-compliant hospital management ERP with electronic health records, telemedicine, and automated billing.",
    tags: ["React", "PostgreSQL", "Docker", "WebRTC"],
    impact: "40+ Clinics Onboarded",
    client: "HealthCare Systems Network (India & Middle East)",
    timeline: "9 Weeks",
    challenge:
      "A network of hospitals struggled with paper-based patient charts, disconnected pharmacy stock, and slow insurance claim validation.",
    solution:
      "Built a secure, HIPAA-ready cloud ERP connecting electronic medical records (EMR), HD WebRTC video telemedicine, and automated insurance claim settlement.",
    modules: [
      "Unified Electronic Health Records (EMR/EHR) & Lab Sync",
      "End-to-End Encrypted WebRTC Video Telemedicine Consultations",
      "Intelligent Doctor Appointment Scheduling & Bed Allocation",
      "Automated Pharmacy Inventory & E-Prescription Generator",
      "Insurance Claim Pre-Authorization & Direct Billing Gateway",
    ],
    results: [
      "40+ hospitals and outpatient clinics successfully onboarded",
      "60% reduction in patient check-in and waiting times",
      "100% HIPAA & Medical Data Privacy compliance achieved",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "WebRTC", "Docker", "AWS HealthLake"],
    liveDemoLink: "/contact",
  },
];

const Portfolio = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/portfolio";
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyProject | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCaseStudy(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-transparent py-20 md:py-28"
    >
      {isStandalone && (
        <SEO
          title="Case Studies & Delivered Digital Products | NexoraLab Technologies"
          description="Discover our portfolio of successfully delivered software solutions, including AI Hiring Systems, Cloud Platforms, Mobile Apps, and Enterprise ERPs."
        />
      )}

      {/* Ambient Deep Space Cyber Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-[#00D2FF]/05 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/06 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
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
            Flagship Engineering Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-['Outfit']"
          >
            Delivered{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Digital Products
            </span>{" "}
            & Case Studies
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Explore our proven track record of architecting high-impact software, AI systems, and enterprise platforms across diverse industries.
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                rounded-full
                px-5
                py-2.5
                text-xs
                sm:text-sm
                font-bold
                transition-all
                duration-300
                ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] text-white shadow-lg shadow-cyan-500/25 scale-105"
                    : "bg-[#0b132b]/85 text-slate-300 border border-slate-800 hover:text-white hover:bg-[#0f1b3d] hover:border-[#00D2FF]/40"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCaseStudy(project)}
              className="
                group
                relative
                cursor-pointer
                flex
                flex-col
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-[#070e1e]/95
                backdrop-blur-xl
                shadow-xl
                transition-all
                duration-300
                hover:border-[#00D2FF]/50
                hover:shadow-2xl
                hover:shadow-cyan-500/15
              "
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-black/20 to-transparent" />

                {/* Floating Category Badge */}
                <div className="absolute top-3 left-3 rounded-full border border-slate-700/80 bg-[#070e1b]/95 px-3 py-1 text-[11px] font-semibold text-[#00D2FF] backdrop-blur-md">
                  {project.category}
                </div>

                {/* Floating Impact Metric */}
                <div className="absolute top-3 right-3 rounded-full border border-emerald-400/40 bg-[#070e1b]/95 px-3 py-1 text-[11px] font-mono font-semibold text-emerald-300 backdrop-blur-md">
                  {project.impact}
                </div>

                {/* Hover Overlay Badge */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white text-xs font-bold shadow-lg shadow-cyan-500/40 transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                    <HiEye className="text-sm" />
                    Read Case Study
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <HiBuildingOffice2 className="text-[#00D2FF]" />
                  <span>{project.client}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#00D2FF] transition-colors font-['Outfit']">
                  {project.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed flex-1 font-normal line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-800 bg-[#0b132b] px-2.5 py-0.5 text-[10px] font-medium text-slate-300 group-hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCaseStudy(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D2FF] group-hover:text-cyan-300 transition-colors"
                  >
                    <span>View Case Study</span>
                    <HiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400">
                    Delivered 2026
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-[#00D2FF]/10 via-[#070e1e] to-[#7C3AED]/15 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF] mb-4">
            <HiSparkles className="text-[#00D2FF]" />
            <span>Have a Project in Mind?</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-['Outfit']">
            Let&apos;s Build Your Next High-Growth Digital Platform
          </h3>

          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            From initial wireframing and AI model integration to scalable cloud deployment — our team is ready to accelerate your journey.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Get Free Technical Estimate</span>
              <HiArrowRight />
            </Link>
            <Link
              to="/meeting"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#0b132b]/90 px-8 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-[#00D2FF] hover:text-white"
            >
              Book 1-on-1 Consultation
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* FLAGSHIP CASE STUDY DEEP DIVE MODAL DIALOG               */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCaseStudy(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="
                relative
                z-10
                w-full
                max-w-4xl
                max-h-[92vh]
                overflow-y-auto
                rounded-3xl
                border
                border-white/[0.15]
                bg-[#070e1e]/98
                p-6
                sm:p-8
                md:p-10
                shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_70px_rgba(0,210,255,0.25)]
                backdrop-blur-3xl
                text-left
              "
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="
                  absolute
                  top-5
                  right-5
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.12]
                  bg-white/[0.04]
                  text-slate-300
                  transition-all
                  duration-200
                  hover:bg-red-500/20
                  hover:border-red-500/40
                  hover:text-white
                  hover:rotate-90
                "
                aria-label="Close Modal"
              >
                <HiXMark className="text-xl" />
              </button>

              {/* Case Study Header Banner */}
              <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-white/[0.1]">
                <div className="w-full md:w-5/12 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-white/[0.1]">
                  <img
                    src={selectedCaseStudy.image}
                    alt={selectedCaseStudy.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-bold text-[#00D2FF]">
                      {selectedCaseStudy.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
                      {selectedCaseStudy.impact}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-['Outfit']">
                    {selectedCaseStudy.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <HiBuildingOffice2 className="text-[#00D2FF]" />
                      Client: <strong className="text-white">{selectedCaseStudy.client}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiClock className="text-[#7C3AED]" />
                      Timeline: <strong className="text-white">{selectedCaseStudy.timeline}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-red-500/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    The Client Challenge:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedCaseStudy.challenge}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-cyan-500/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-2 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#00D2FF]" />
                    Engineered Solution:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedCaseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Key Modules Delivered */}
              <div className="mt-6">
                <h4 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2">
                  <HiCpuChip className="text-[#00D2FF]" />
                  Key Modules & Architecture Delivered:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCaseStudy.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm text-slate-200 font-medium"
                    >
                      <HiCheckCircle className="text-[#00D2FF] text-base shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantified Business ROI & Results */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-white/[0.02] to-cyan-500/10 border border-emerald-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                  <HiChartBar className="text-base" />
                  Measurable Business Impact & ROI:
                </h4>
                <div className="space-y-2">
                  {selectedCaseStudy.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-white font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-8 pt-6 border-t border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 font-medium text-center sm:text-left">
                  Want to architect a similar system for your business?
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedCaseStudy.liveDemoLink && (
                    <Link
                      to={selectedCaseStudy.liveDemoLink}
                      onClick={() => setSelectedCaseStudy(null)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/10 text-xs sm:text-sm font-bold text-[#00D2FF] hover:bg-[#00D2FF]/20 transition-all"
                    >
                      <HiBolt className="text-sm" />
                      Try Live Demo
                    </Link>
                  )}

                  <Link
                    to={`/contact?project=${encodeURIComponent(selectedCaseStudy.title)}`}
                    onClick={() => setSelectedCaseStudy(null)}
                    className="
                      flex-1
                      sm:flex-none
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-gradient-to-r
                      from-[#00D2FF]
                      via-[#0066FF]
                      to-[#7C3AED]
                      px-6
                      py-3
                      text-xs
                      sm:text-sm
                      font-bold
                      text-white
                      shadow-[0_0_25px_rgba(0,210,255,0.35)]
                      hover:shadow-[0_0_35px_rgba(0,102,255,0.5)]
                      hover:scale-105
                      active:scale-95
                      transition-all
                    "
                  >
                    <span>Request Similar System</span>
                    <HiArrowRight className="text-base" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;