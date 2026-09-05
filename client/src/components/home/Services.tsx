import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  HiArrowRight,
  HiSparkles,
  HiXMark,
  HiCheckCircle,
  HiCpuChip,
  HiClock,
  HiShieldCheck,
  HiEye,
} from "react-icons/hi2";
import {
  FaGlobe,
  FaMobileAlt,
  FaBrain,
  FaCloud,
  FaDatabase,
  FaLaptopCode,
} from "react-icons/fa";
import SEO from "@/components/common/SEO";
import {
  webSaasImg,
  aiSolutionsImg,
  mobileFintechImg,
  enterpriseErpImg,
  cloudSaasImg,
  aboutTechImg,
} from "@/assets/images";

export interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  color: string;
  tags: string[];
  features: string[];
  deliverables: string[];
  timeline: string;
  sla: string;
}

const serviceDivisions: ServiceItem[] = [
  {
    id: 1,
    title: "Full-Stack Web & Enterprise SaaS",
    subtitle: "High-Velocity Cloud Platforms & Modern Web Applications",
    description:
      "High-performance, secure web applications built on React, Next.js, Node.js, and modern distributed architectures.",
    image: webSaasImg,
    icon: FaGlobe,
    color: "from-[#00D2FF] to-[#0066FF]",
    tags: ["React / Next.js", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL"],
    features: [
      "Sub-Second Server-Side Rendering (SSR) & Edge Caching",
      "Micro-Frontends & Modular Component Architecture",
      "Enterprise Multi-Tenant SaaS with RBAC & SSO",
      "Automated CI/CD Deployment & Global CDN Distribution",
    ],
    deliverables: [
      "Production-ready Next.js & Node.js application",
      "Complete API documentation & Swagger specs",
      "Automated unit & integration test suites",
      "Full source code ownership with Docker containers",
    ],
    timeline: "4 - 8 Weeks",
    sla: "99.9% Uptime Guarantee",
  },
  {
    id: 2,
    title: "AI Systems & Intelligent Hiring Tools",
    subtitle: "Proprietary ATS Engines, Neural Parsing & Mock Interview AI",
    description:
      "Proprietary AI pipelines for resume parsing, candidate scoring, mock interviews, and automated workflow intelligence.",
    image: aiSolutionsImg,
    icon: FaBrain,
    color: "from-[#0066FF] to-[#7C3AED]",
    tags: ["OpenAI / Claude API", "NLP & Vector DBs", "Python", "FastAPI", "React 19"],
    features: [
      "Semantic OCR Resume Parsing with 15ms Latency",
      "Dynamic Candidate Match Scoring (0-100% Score)",
      "Real-Time Voice & Video Mock Interview Analysis",
      "Autonomous Recruiter Workflow & Shortlist Automation",
    ],
    deliverables: [
      "Custom Fine-Tuned NLP/LLM inference endpoints",
      "Vector embeddings pipeline (pgvector / Pinecone)",
      "Interactive recruiter & candidate web dashboards",
      "Enterprise data privacy & anonymization filters",
    ],
    timeline: "3 - 6 Weeks",
    sla: "99.4% AI Accuracy SLA",
  },
  {
    id: 3,
    title: "Cross-Platform Mobile App Development",
    subtitle: "Native-Feeling iOS & Android Apps Engineered for Scale",
    description:
      "Native-feeling iOS and Android mobile experiences engineered with React Native and modern state management.",
    image: mobileFintechImg,
    icon: FaMobileAlt,
    color: "from-[#7C3AED] to-[#9333EA]",
    tags: ["React Native", "Expo", "iOS & Android", "WebSockets", "Push Notifications"],
    features: [
      "Smooth 60/120 FPS Fluid Animations & Gesture Controls",
      "Offline-First SQLite Sync & Background Data Workers",
      "Hardware Biometric Auth (FaceID / Fingerprint)",
      "App Store & Google Play Automated Review & Release",
    ],
    deliverables: [
      "iOS & Android compiled binary builds",
      "Backend REST / GraphQL API server integration",
      "Push notification & deep-linking infrastructure",
      "App Store optimization & submission support",
    ],
    timeline: "4 - 8 Weeks",
    sla: "Cross-Platform Feature Parity",
  },
  {
    id: 4,
    title: "Enterprise ERP, CRM & Operations",
    subtitle: "Tailored Operations Platforms & Process Automation",
    description:
      "Custom ERP & CRM software tailored for supply chain, healthcare, education, retail billing, and HR automation.",
    image: enterpriseErpImg,
    icon: FaDatabase,
    color: "from-[#9333EA] to-[#00D2FF]",
    tags: ["PostgreSQL", "Role-Based ACL", "Automated Billing", "Audit Trails"],
    features: [
      "Custom Multi-Department Workflow Automation",
      "Comprehensive Audit Logging & Regulatory Compliance",
      "Real-Time Executive Analytics & KPI Telemetry",
      "Seamless Integration with Existing ERP/Legacy Systems",
    ],
    deliverables: [
      "Custom ERP/CRM web platform with role permissions",
      "Automated invoice, billing & receipt generation",
      "Data migration scripts from legacy software",
      "Staff onboarding guides & 24/7 technical support",
    ],
    timeline: "6 - 12 Weeks",
    sla: "SOC2 & ISO 27001 Ready",
  },
  {
    id: 5,
    title: "Cloud Architecture, DevOps & Security",
    subtitle: "Resilient Multi-Cloud Infrastructure & Zero-Downtime Deployments",
    description:
      "Resilient cloud deployment on AWS, Azure, and Google Cloud with Docker, Kubernetes, and automated CI/CD pipelines.",
    image: cloudSaasImg,
    icon: FaCloud,
    color: "from-[#00D2FF] via-[#0066FF] to-[#7C3AED]",
    tags: ["AWS / GCP / Azure", "Docker & K8s", "Terraform", "GitHub Actions", "Redis"],
    features: [
      "Zero-Downtime Blue/Green & Canary Deployments",
      "Kubernetes Auto-Scaling Cluster Management",
      "Automated Infrastructure as Code (Terraform)",
      "24/7 Prometheus & Grafana System Observability",
    ],
    deliverables: [
      "Cloud architecture blueprint & Terraform manifests",
      "Fully configured CI/CD automated build pipelines",
      "Disaster recovery & automated backup policies",
      "Cloud security hardening & cost optimization audit",
    ],
    timeline: "2 - 5 Weeks",
    sla: "99.99% High-Availability SLA",
  },
  {
    id: 6,
    title: "Dedicated Engineering & Tech Consulting",
    subtitle: "Senior Engineers & Solutions Architects to Accelerate Your Roadmap",
    description:
      "Staff augmentation with senior engineers, solutions architects, and UI/UX specialists to accelerate product roadmaps.",
    image: aboutTechImg,
    icon: FaLaptopCode,
    color: "from-[#0066FF] to-[#00D2FF]",
    tags: ["Staff Augmentation", "Agile Sprints", "Code Audits", "24/7 SLA", "Solutions Architect"],
    features: [
      "Top 1% Pre-Vetted Senior Full-Stack & AI Engineers",
      "Direct Slack / Teams Integration & Daily Standups",
      "Fast 48-Hour Developer Onboarding & Matching",
      "Flexible Dedicated Monthly or Sprint-Based Retainers",
    ],
    deliverables: [
      "Dedicated senior engineers assigned to your team",
      "Transparent Jira/GitHub sprint task tracking",
      "Comprehensive architectural reviews & code audits",
      "Flexible scaling up or down with zero lock-in",
    ],
    timeline: "Immediate (48h)",
    sla: "100% Sprint Velocity Commitment",
  },
];

const Services = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/services";
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-transparent py-20 md:py-28"
    >
      {isStandalone && (
        <SEO
          title="Engineering Services & Digital Solutions | NexoraLab Technologies"
          description="Explore our full spectrum of software development services: Full-Stack Web, AI Solutions, Mobile Apps, Enterprise ERPs, and Cloud Architecture."
        />
      )}

      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-5 w-96 h-96 rounded-full bg-[#00D2FF]/05 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-5 w-96 h-96 rounded-full bg-[#7C3AED]/06 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        
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
            Full-Spectrum Digital Engineering Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-['Outfit']"
          >
            Enterprise Software{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              & AI Capabilities
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            From custom SaaS platforms and generative AI tools to high-uptime cloud deployments — we deliver end-to-end technical excellence.
          </motion.p>
        </div>

        {/* Services 6-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceDivisions.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service)}
                className="
                  group
                  relative
                  cursor-pointer
                  flex
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-800
                  bg-[#070e1e]/95
                  backdrop-blur-2xl
                  shadow-xl
                  transition-all
                  duration-300
                  hover:border-[#00D2FF]/50
                  hover:shadow-2xl
                  hover:shadow-cyan-500/15
                "
              >
                <div>
                  {/* Top Image Preview */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-black/30 to-transparent" />

                    {/* Floating Icon Emblem */}
                    <div className={`absolute top-3.5 left-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r ${service.color} text-lg text-white shadow-lg shadow-cyan-500/30 backdrop-blur-md`}>
                      <Icon />
                    </div>

                    {/* Hover Overlay Badge */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white text-xs font-bold shadow-lg shadow-cyan-500/40 transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                        <HiEye className="text-sm" />
                        Explore Details
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 pb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00D2FF] transition-colors font-['Outfit']">
                      {service.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {service.description}
                    </p>

                    {/* Key Features Bullets */}
                    <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3.5">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Tags and Action Button */}
                <div className="p-6 sm:p-7 pt-3">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-800 bg-[#0b132b] px-2.5 py-0.5 text-[10px] font-medium text-slate-300 group-hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D2FF] group-hover:text-cyan-300 transition-colors"
                    >
                      <span>Request Proposal</span>
                      <HiArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[11px] font-mono text-slate-400">
                      {service.timeline}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SERVICE PROPOSAL & SPECIFICATION MODAL DIALOG            */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="
                relative
                z-10
                w-full
                max-w-3xl
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
                onClick={() => setSelectedService(null)}
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

              {/* Service Banner Preview */}
              <div className="flex flex-col sm:flex-row gap-5 items-start pb-6 border-b border-white/[0.1]">
                <div className="w-full sm:w-44 aspect-[16/10] sm:aspect-square rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-white/[0.1]">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 pr-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-bold text-[#00D2FF] mb-2">
                    <HiSparkles className="text-xs" />
                    Specialized Engineering Division
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-['Outfit']">
                    {selectedService.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">
                    {selectedService.subtitle}
                  </p>
                </div>
              </div>

              {/* Specs Highlights */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                    <HiClock className="text-[#00D2FF]" />
                    Delivery Timeline
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {selectedService.timeline}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                    <HiShieldCheck className="text-emerald-400" />
                    Service Level SLA
                  </div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400">
                    {selectedService.sla}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                    <HiCpuChip className="text-[#7C3AED]" />
                    Source Ownership
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#A78BFA]">
                    100% IP Transfer
                  </div>
                </div>
              </div>

              {/* What We Deliver */}
              <div className="mt-6">
                <h4 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00D2FF]" />
                  What We Deliver Under This Service:
                </h4>
                <div className="space-y-2">
                  {selectedService.deliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm text-slate-200 font-medium"
                    >
                      <HiCheckCircle className="text-[#00D2FF] text-base shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Core Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-white font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-8 pt-6 border-t border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400 font-medium text-center sm:text-left">
                  Ready to start {selectedService.title}?
                </p>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-full border border-white/[0.12] bg-white/[0.04] text-xs sm:text-sm font-semibold text-slate-300 hover:bg-white/[0.08] hover:text-white transition-all"
                  >
                    Close
                  </button>

                  <Link
                    to={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                    onClick={() => setSelectedService(null)}
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
                    <span>Request Detailed Proposal</span>
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

export default Services;