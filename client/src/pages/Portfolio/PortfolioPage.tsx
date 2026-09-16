import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSparkles,
  HiArrowUpRight,
  HiCheckCircle,
  HiXMark,
  HiCpuChip,
  HiCloudArrowUp,
  HiDevicePhoneMobile,
  HiBuildingOffice,
  HiGlobeAlt,
  HiShieldCheck,
} from "react-icons/hi2";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";
import { contentService } from "@/services/content.service";
import {
  aiSolutionsImg,
  cloudSaasImg,
  mobileFintechImg,
  enterpriseErpImg,
  webSaasImg,
} from "@/assets/images";

interface CaseStudy {
  id: string;
  category: "ai" | "cloud" | "mobile" | "saas" | "fintech" | string;
  title: string;
  clientType: string;
  image: string;
  metric: string;
  metricLabel: string;
  overview: string;
  challenge: string;
  solution: string;
  impacts: string[];
  techStack: string[];
}

const defaultCaseStudiesData: CaseStudy[] = [
  {
    id: "ai-talent",
    category: "ai",
    title: "AI Talent Intelligence & Neural ATS Scoring Engine",
    clientType: "Global HRTech Scaleup",
    image: aiSolutionsImg,
    metric: "15ms",
    metricLabel: "Sub-15ms Resume Parsing Latency",
    overview:
      "Engineered an automated ATS parsing and skill-matching engine processing 10,000+ candidate profiles daily with high semantic accuracy.",
    challenge:
      "Legacy keyword-based parsers dropped 60% of qualified talent due to formatting irregularities and took over 4.5 seconds per document.",
    solution:
      "Trained proprietary OCR pipelines and LLM embedding transformers with vector similarity matching in PostgreSQL (pgvector).",
    impacts: [
      "+85% screening velocity for hiring managers",
      "99.4% parsing accuracy across complex multi-column resumes",
      "-70% manual candidate review overhead",
      "Real-time voice mock interview evaluations integrated",
    ],
    techStack: ["Next.js 16", "FastAPI", "Python", "OpenAI GPT-4", "pgvector", "Redis"],
  },
  {
    id: "synapse-cloud",
    category: "cloud",
    title: "Synapse Multi-Region Cloud Microservices Architecture",
    clientType: "Enterprise Logistics Provider",
    image: cloudSaasImg,
    metric: "-64%",
    metricLabel: "Cloud Spend Reduction with 99.99% SLA",
    overview:
      "Refactored a monolithic backend into high-throughput containerized microservices spanning multi-region AWS Kubernetes clusters.",
    challenge:
      "System suffered frequent downtime during peak holiday shipping spikes, and cloud infrastructure costs were spiraling out of control.",
    solution:
      "Designed an event-driven architecture using Apache Kafka, Docker containerization, AWS EKS auto-scaling pods, and CloudFront caching.",
    impacts: [
      "99.99% uptime maintained across peak 25,000 RPS traffic",
      "Cloud hosting costs slashed by 64% using spot instances",
      "Sub-40ms global API latency for mobile drivers",
      "Zero downtime zero-defect deployment pipelines",
    ],
    techStack: ["AWS EKS", "Docker", "Kubernetes", "Kafka", "Node.js", "Terraform"],
  },
  {
    id: "pulsecare-health",
    category: "mobile",
    title: "PulseCare Telehealth & Remote Patient Monitoring App",
    clientType: "Digital Health Provider",
    image: mobileFintechImg,
    metric: "120K+",
    metricLabel: "Active Patients on Silky 60fps Native App",
    overview:
      "Built a HIPAA-compliant cross-platform mobile application for real-time HD video consultations, vitals telemetry, and e-prescriptions.",
    challenge:
      "Existing web portal had high patient drop-off on mobile devices and lacked real-time appointment scheduling and video stability.",
    solution:
      "Built unified iOS and Android applications with Flutter, integrated WebRTC low-latency video streaming, and end-to-end encrypted chats.",
    impacts: [
      "Sub-100ms video latency for remote medical consultations",
      "100% HIPAA and GDPR compliance verified",
      "4.9 / 5.0 App Store rating across 15,000+ reviews",
      "Integrated Apple HealthKit and Google Fit biometric sync",
    ],
    techStack: ["Flutter", "Dart", "WebRTC", "Node.js", "PostgreSQL", "HIPAA Vault"],
  },
  {
    id: "finflow-gateway",
    category: "fintech",
    title: "FinFlow Multi-Currency Payment & Reconciliation Gateway",
    clientType: "FinTech Neo-Bank",
    image: webSaasImg,
    metric: "45K TPS",
    metricLabel: "Transaction Processing at 99.999% Reliability",
    overview:
      "Developed an ultra-low latency payment gateway with automated double-entry ledger settlement, fraud detection, and instant multi-currency conversion.",
    challenge:
      "Handling thousands of concurrent micro-transactions with zero race conditions and instant settlement across 12 banking partners.",
    solution:
      "Implemented a distributed Go microservice backend with Redis caching, PostgreSQL strict transactional isolation, and ML anomaly detection.",
    impacts: [
      "45,000 TPS peak throughput benchmarked",
      "Zero ledger discrepancy over 12 million transactions",
      "PCI-DSS Level 1 certified security architecture",
      "Automated automated Stripe and Razorpay fallback routing",
    ],
    techStack: ["Go (Golang)", "React 19", "PostgreSQL", "Redis", "Docker", "PCI-DSS"],
  },
  {
    id: "omnicart-marketplace",
    category: "saas",
    title: "OmniCart Multi-Vendor Marketplace & Operations ERP",
    clientType: "E-Commerce Enterprise",
    image: enterpriseErpImg,
    metric: "$2.4M",
    metricLabel: "Monthly GMV Powered with Zero Latency",
    overview:
      "Custom multi-vendor marketplace platform featuring vendor self-onboarding, real-time inventory synchronization, and dynamic commission splitting.",
    challenge:
      "Slow database bottlenecks and complex vendor commission tracking caused delayed payouts and inventory sync errors.",
    solution:
      "Engineered a Next.js 16 SSR frontend with Node.js microservices, Elasticsearch catalog search, and automated automated payouts.",
    impacts: [
      "Page load speed increased by 3.8x with Next.js 16 SSR",
      "Sub-20ms instant product search across 500,000+ SKUs",
      "Automated automated monthly vendor disbursements",
      "Seamless integration with 4 global courier delivery APIs",
    ],
    techStack: ["Next.js 16", "React 19", "Node.js", "Elasticsearch", "PostgreSQL", "Tailwind"],
  },
];

const PortfolioPage: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(defaultCaseStudiesData);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const { openQuoteModal } = useModal();

  useEffect(() => {
    const fetchDynamicPortfolio = async () => {
      try {
        const dynamicItems = await contentService.getContent("portfolio");
        if (dynamicItems && dynamicItems.length > 0) {
          const mapped: CaseStudy[] = dynamicItems.map((item: any) => ({
            id: item._id || item.slug || String(Date.now()),
            category: (item.category || "saas").toLowerCase(),
            title: item.title,
            clientType: item.clientName || "Enterprise Client",
            image: item.imageUrl || cloudSaasImg,
            metric: item.metrics || "+250% Growth",
            metricLabel: "Engineered by NexoraLab",
            overview: item.description || "Scalable custom architecture deliverable by NexoraLab Technologies.",
            challenge: "Overcoming legacy monolithic scaling limits and improving latency.",
            solution: "Delivered cloud-native microservices with enterprise grade SLA.",
            impacts: [
              "99.9% Uptime SLA delivered",
              "Sub-50ms API query response time",
              "100% IP and source code ownership transferred",
            ],
            techStack: Array.isArray(item.tags) ? item.tags : (item.tags ? String(item.tags).split(",").map((t: string) => t.trim()) : ["React 19", "Node.js", "AWS"]),
          }));
          setCaseStudies([...mapped, ...defaultCaseStudiesData]);
        }
      } catch (e) {
        console.warn("Using default portfolio data:", e);
      }
    };
    fetchDynamicPortfolio();
  }, []);

  const filteredStudies =
    activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <>
      <SEO
        title="Portfolio & Case Studies | NexoraLab Technologies"
        description="Explore NexoraLab Technologies real-world enterprise case studies: AI ATS intelligence, multi-region cloud microservices, mobile telehealth, fintech ledgers, and multi-vendor SaaS."
        keywords={[
          "software engineering portfolio",
          "NexoraLab case studies",
          "web app development projects",
          "mobile application case study",
          "AI talent ATS case study",
          "fintech ledger engineering case study",
          "cloud architecture projects India",
        ]}
        canonical="https://nexoralabtechnologies.in/portfolio"
      />

      <div className="relative min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-20">
        {/* Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
        <div className="absolute top-[700px] right-10 w-[500px] h-[450px] rounded-full bg-[#7C3AED]/08 blur-[170px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-[#00D2FF]">Home</Link>
            <span>/</span>
            <span className="text-[#00D2FF]">Case Studies & Portfolio</span>
          </div>

          {/* Header */}
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
              <HiSparkles />
              <span>Proven Track Record</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15]">
              Real Systems. Real Scale. <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">Measurable Results.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
              Explore how we've engineered mission-critical software, mobile applications, cloud infrastructures, and generative AI systems for leading brands worldwide.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar border-b border-white/10">
            {[
              { id: "all", label: "All Projects" },
              { id: "ai", label: "AI & ATS Intelligence" },
              { id: "cloud", label: "Cloud & DevOps" },
              { id: "mobile", label: "Mobile Apps (iOS/Android)" },
              { id: "fintech", label: "FinTech & Banking" },
              { id: "saas", label: "Enterprise SaaS & ERP" },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] scale-105"
                      : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Case Studies Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                onClick={() => setSelectedCaseStudy(study)}
                className="group cursor-pointer rounded-3xl border border-white/10 bg-[#070e1e]/90 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.15)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Media Image Frame */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-black/40 to-transparent" />

                  {/* Impact Metric Floating Badge */}
                  <div className="absolute top-3.5 right-3.5 rounded-xl bg-[#060b18]/90 border border-white/10 px-3 py-1.5 backdrop-blur-md text-right">
                    <div className="text-base font-black bg-gradient-to-r from-[#00D2FF] to-[#0066FF] bg-clip-text text-transparent">
                      {study.metric}
                    </div>
                    <div className="text-[9.5px] text-slate-400">{study.metricLabel}</div>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5">
                    <span className="rounded-full bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
                      {study.clientType}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {study.title}
                      </h3>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 group-hover:bg-[#00D2FF] group-hover:text-black group-hover:border-transparent transition-all shrink-0 ml-2 text-xs">
                        <HiArrowUpRight />
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                      {study.overview}
                    </p>

                    {/* Key Impacts */}
                    <div className="mt-5 space-y-1.5">
                      {study.impacts.slice(0, 2).map((imp, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <HiCheckCircle className="text-[#00D2FF] text-sm shrink-0" />
                          <span>{imp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {study.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Modal Details */}
          <AnimatePresence>
            {selectedCaseStudy && (
              <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedCaseStudy(null)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/15 bg-[#070e1e] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                >
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <HiXMark className="text-xl" />
                  </button>

                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-[#00D2FF] mb-3">
                    {selectedCaseStudy.clientType}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {selectedCaseStudy.title}
                  </h2>

                  <div className="my-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 p-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
                        Primary Impact Metric
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                        {selectedCaseStudy.metric}
                      </div>
                    </div>
                    <span className="text-xs text-slate-300 max-w-xs text-right">
                      {selectedCaseStudy.metricLabel}
                    </span>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1 text-cyan-400">
                        The Challenge
                      </h4>
                      <p className="text-slate-400">{selectedCaseStudy.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1 text-cyan-400">
                        Our Solution & Architecture
                      </h4>
                      <p className="text-slate-400">{selectedCaseStudy.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-cyan-400">
                        Measurable Outcomes
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedCaseStudy.impacts.map((imp, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <HiCheckCircle className="text-[#00D2FF] text-sm shrink-0" />
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 text-cyan-400">
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCaseStudy.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-400">Need a similar architecture for your business?</span>
                    <button
                      onClick={() => {
                        setSelectedCaseStudy(null);
                        openQuoteModal();
                      }}
                      className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0066FF] px-6 py-2.5 text-xs font-bold text-white shadow-lg"
                    >
                      Request Architecture Consultation →
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Bottom Pre-Footer CTA */}
          <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-[#091630] via-[#060e20] to-[#040914] p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-6 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white max-w-2xl">
              Have a Complex Architecture to Build?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We sign strict non-disclosure agreements (NDAs) and provide comprehensive feasibility audits and cost estimations in 24 hours.
            </p>
            <button
              onClick={openQuoteModal}
              className="rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-10 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] transition hover:scale-105 active:scale-95"
            >
              Consult Our Solutions Architects →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
