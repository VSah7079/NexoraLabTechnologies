import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import SEO from "@/components/common/SEO";
import {
  HiBriefcase,
  HiMapPin,
  HiClock,
  HiArrowRight,
  HiUsers,
  HiRocketLaunch,
  HiHeart,
  HiLightBulb,
  HiCheckCircle,
  HiEnvelope,
  HiPhone,
  HiSparkles,
  HiXMark,
  HiMagnifyingGlass,
  HiCurrencyDollar,
  HiDocumentText,
  HiShieldCheck,
  HiAcademicCap,
  HiCpuChip,
} from "react-icons/hi2";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";

interface JobPosition {
  id: number;
  title: string;
  department: "Engineering" | "AI & Data" | "Design" | "Business";
  location: string;
  type: string;
  experience: string;
  salary: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}

const openPositions: JobPosition[] = [
  {
    id: 1,
    title: "Lead Full-Stack Architect (React 19 & Node.js)",
    department: "Engineering",
    location: "Siwan, Bihar / Remote",
    type: "Full-Time",
    experience: "5+ Years",
    salary: "₹18 - ₹32 LPA / Commensurate with skill",
    tags: ["React 19", "Next.js 16", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    description:
      "We are seeking an exceptional Lead Full-Stack Architect to direct the technical architecture, code standards, and microservices design across high-concurrency client applications.",
    responsibilities: [
      "Architect and scale modular full-stack web applications sustaining high concurrent throughput.",
      "Lead technical design reviews, database indexing strategies, and API contracts.",
      "Mentor senior and mid-level developers and ensure strict type-safe TypeScript standards.",
      "Collaborate directly with clients and solutions architects during sprint planning.",
    ],
    requirements: [
      "5+ years of production experience building high-scale React, Next.js, and Node.js systems.",
      "Deep mastery of PostgreSQL, Redis caching, Docker containerization, and AWS cloud.",
      "Proven track record of designing fault-tolerant REST and GraphQL architectures.",
      "Strong communication skills and proactive technical leadership.",
    ],
    perks: [
      "Top-tier compensation + Annual Performance Bonus",
      "100% Remote flexibility with home office gear allowance",
      "Full Health Insurance coverage for you and family",
      "Annual AWS / Cloud certification budget",
    ],
  },
  {
    id: 2,
    title: "Senior AI & LLM Systems Engineer",
    department: "AI & Data",
    location: "Siwan, Bihar / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    salary: "₹16 - ₹28 LPA",
    tags: ["Python", "FastAPI", "OpenAI / Claude API", "pgvector", "Pinecone", "PyTorch"],
    description:
      "Join our core AI research pod to engineer state-of-the-art semantic parsers, autonomous ATS scoring engines, and enterprise RAG pipelines.",
    responsibilities: [
      "Develop low-latency Python/FastAPI microservices for document OCR and semantic parsing.",
      "Engineer vector search pipelines with hybrid BM25 + cosine similarity indexing.",
      "Fine-tune transformer models and optimize token usage across LLM provider APIs.",
      "Benchmark model inference latency and ensure sub-15ms parsing SLAs.",
    ],
    requirements: [
      "3+ years of experience with Python, FastAPI, and generative AI architectures.",
      "Hands-on production expertise with vector databases (Pinecone, pgvector, Milvus, Qdrant).",
      "Familiarity with LangChain, LlamaIndex, or raw API orchestration frameworks.",
      "Solid understanding of embedding spaces, semantic clustering, and prompt hardening.",
    ],
    perks: [
      "High-performance cloud GPU clusters for experimentation",
      "Opportunity to publish proprietary AI benchmarks",
      "Flexible schedule and wellness stipend",
      "Equity & profit-sharing opportunities",
    ],
  },
  {
    id: 3,
    title: "Senior UI/UX Product Designer",
    department: "Design",
    location: "Siwan, Bihar / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    salary: "₹10 - ₹18 LPA",
    tags: ["Figma", "Design Systems", "Interactive Prototyping", "Design Tokens", "Framer"],
    description:
      "Craft visually stunning, high-converting digital product interfaces, comprehensive design systems, and delightful micro-interactions for global startups and enterprises.",
    responsibilities: [
      "Design end-to-end user journeys, wireframes, and high-fidelity interactive Figma prototypes.",
      "Build and maintain modular token-driven design systems with dark/light variants.",
      "Conduct user research, persona audits, and usability benchmark tests.",
      "Collaborate with frontend engineers to ensure 100% pixel-perfect implementation.",
    ],
    requirements: [
      "3+ years of product design experience with a portfolio of live production web/mobile apps.",
      "Expert-level command of Figma, auto-layout, component variables, and design tokens.",
      "Deep understanding of accessibility (WCAG), typography hierarchy, and visual aesthetics.",
      "Ability to translate complex business workflows into simple, elegant interfaces.",
    ],
    perks: [
      "Figma Enterprise subscription & premium asset subscriptions",
      "Latest M-series Apple MacBook Pro setup",
      "Flexible working hours and creative freedom",
      "Health insurance & bi-annual skill increments",
    ],
  },
  {
    id: 4,
    title: "Senior DevOps & Cloud Infrastructure Engineer",
    department: "Engineering",
    location: "Siwan, Bihar / Remote",
    type: "Full-Time",
    experience: "4+ Years",
    salary: "₹15 - ₹26 LPA",
    tags: ["AWS EKS", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Prometheus"],
    description:
      "Architect, automate, and safeguard multi-region cloud infrastructures, Kubernetes clusters, and automated CI/CD pipelines across client deployments.",
    responsibilities: [
      "Manage multi-tenant AWS and Azure environments with Infrastructure as Code (Terraform).",
      "Build automated CI/CD pipelines with zero-downtime blue/green deployment strategies.",
      "Implement 24/7 observability, Prometheus metrics, Grafana dashboards, and Sentry alerts.",
      "Conduct security audits, penetration tests, and database backup verification.",
    ],
    requirements: [
      "4+ years of dedicated DevOps experience managing Kubernetes and Docker in production.",
      "Strong scripting abilities in Bash and Python.",
      "Solid understanding of networking, VPC peering, SSL/TLS, and IAM least-privilege security.",
      "Experience with AWS (EKS, RDS, S3, CloudFront, Route53, IAM).",
    ],
    perks: [
      "AWS & Kubernetes exam vouchers covered 100%",
      "Remote work stipend and ergonomic equipment",
      "Competitive compensation + high-reliability bonus",
      "Health & wellness benefits",
    ],
  },
  {
    id: 5,
    title: "Senior Mobile Application Developer (Flutter / React Native)",
    department: "Engineering",
    location: "Siwan, Bihar / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    salary: "₹12 - ₹22 LPA",
    tags: ["Flutter", "React Native", "Dart", "TypeScript", "iOS/Android", "Firebase"],
    description:
      "Engineer smooth, 60fps cross-platform iOS and Android mobile apps for FinTech, healthcare, on-demand marketplaces, and enterprise clients.",
    responsibilities: [
      "Develop responsive, offline-first mobile applications with Flutter or React Native.",
      "Integrate biometrics, WebRTC video calling, push notifications, and payment SDKs.",
      "Optimize rendering performance, memory leaks, and startup bundle sizes.",
      "Manage App Store and Google Play Store automated CI/CD release lifecycles.",
    ],
    requirements: [
      "3+ years of professional mobile development experience with shipped apps on App Stores.",
      "Proficiency in state management (Riverpod/Bloc for Flutter, Zustand/Redux for React Native).",
      "Experience integrating native device capabilities (Camera, GPS, Bluetooth, Keychain).",
      "High attention to UI fluid micro-animations and device responsiveness.",
    ],
    perks: [
      "Test device budget (iOS & Android)",
      "Remote work freedom and flexible timings",
      "Health insurance & generous leave policy",
      "Annual performance increments",
    ],
  },
  {
    id: 6,
    title: "Technical Business Analyst & Product Owner",
    department: "Business",
    location: "Siwan, Bihar (On-site / Hybrid)",
    type: "Full-Time",
    experience: "2+ Years",
    salary: "₹8 - ₹15 LPA",
    tags: ["Product Scoping", "Agile / Scrum", "Jira", "User Stories", "Client Liaison"],
    description:
      "Bridge client business visions with agile technical execution, writing crystal-clear user stories and tracking milestone velocity.",
    responsibilities: [
      "Lead discovery workshops with enterprise stakeholders to gather functional requirements.",
      "Author detailed PRDs, user stories, acceptance criteria, and system workflow diagrams.",
      "Facilitate sprint planning, daily standups, and backlog grooming alongside engineering leads.",
      "Track project deliverables against agreed SLAs and budget milestones.",
    ],
    requirements: [
      "2+ years of experience as a Technical Business Analyst or Associate Product Manager.",
      "Strong understanding of modern software development life cycles and API concepts.",
      "Impeccable verbal and written English communication skills.",
      "Experience using Jira, Confluence, and Figma.",
    ],
    perks: [
      "Rapid career progression to Product Lead",
      "Direct exposure to international enterprise clients",
      "Health insurance and annual bonuses",
      "On-site perks at Siwan Innovation Hub",
    ],
  },
];

const hiringSteps = [
  {
    step: "01",
    title: "Application & Portfolio Review",
    time: "24 - 48 Hours",
    desc: "Our engineering leads review your GitHub repositories, live projects, and technical background.",
  },
  {
    step: "02",
    title: "Technical & Problem Solving Call",
    time: "45 Minutes",
    desc: "A conversational technical discussion diving into system design, practical challenges, and code samples.",
  },
  {
    step: "03",
    title: "Architecture & Culture Alignment",
    time: "30 Minutes",
    desc: "Connect with our founders and team leads to discuss vision, values, compensation, and team dynamics.",
  },
  {
    step: "04",
    title: "Offer Letter & Fast-Track Onboarding",
    time: "Within 24 Hours",
    desc: "Receive a transparent, competitive offer and get set up with team gear and development environments.",
  },
];

const culturePerks = [
  {
    icon: HiRocketLaunch,
    title: "Cutting-Edge Tech Stack",
    desc: "Build with React 19, Next.js 16, Python AI models, vector databases, and modern cloud microservices.",
  },
  {
    icon: HiMapPin,
    title: "Flexible Work Culture",
    desc: "Join our Siwan, Bihar Innovation Hub or work remotely with collaborative agile pods.",
  },
  {
    icon: HiCurrencyDollar,
    title: "Top-Tier Compensation",
    desc: "Market-leading salaries, bi-annual performance reviews, and annual bonus incentives.",
  },
  {
    icon: HiAcademicCap,
    title: "Learning & Certification Budget",
    desc: "100% company-sponsored AWS, GCP, and Kubernetes certifications, books, and courses.",
  },
  {
    icon: HiHeart,
    title: "Comprehensive Healthcare",
    desc: "Comprehensive health and medical insurance covering you and your immediate dependents.",
  },
  {
    icon: HiShieldCheck,
    title: "Zero Bureaucracy",
    desc: "High trust, flat hierarchy, and clear ownership. Ship high-impact code directly to production.",
  },
];

import { contentService } from "@/services/content.service";

const Careers: React.FC = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/careers";

  const [activeDepartment, setActiveDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applyingJob, setApplyingJob] = useState<JobPosition | null>(null);
  const [positionsList, setPositionsList] = useState<JobPosition[]>(openPositions);

  useEffect(() => {
    const fetchCmsCareers = async () => {
      try {
        const items = await contentService.getContent("careers");
        if (items && items.length > 0) {
          const mapped: JobPosition[] = items.map((item: any, idx: number) => ({
            id: item._id || item.id || idx + 1,
            title: item.title,
            department: (item.department || "Engineering") as any,
            location: item.location || "Siwan, Bihar / Remote",
            type: item.jobType || "Full-Time",
            experience: item.experience || "3+ Years",
            salary: item.salary || "Competitive",
            tags: Array.isArray(item.tags) ? item.tags : ["Engineering"],
            description: item.description || "",
            responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities : [],
            requirements: Array.isArray(item.requirements) ? item.requirements : [],
            perks: Array.isArray(item.perks) ? item.perks : [],
          }));
          setPositionsList(mapped);
        }
      } catch {
        // Fallback to openPositions
      }
    };
    fetchCmsCareers();
  }, []);

  // Application form state
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantExperience, setApplicantExperience] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantCover, setApplicantCover] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = ["All", "Engineering", "AI & Data", "Design", "Business"];

  const filteredJobs = positionsList.filter((job) => {
    const matchesDept =
      activeDepartment === "All" || job.department === activeDepartment;
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(job.tags) && job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPhone) {
      toast.error("Please fill all required fields.", { theme: "dark" });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        `Application submitted for ${applyingJob?.title}! Our team will contact you within 48 hours.`,
        { theme: "dark", autoClose: 4000 }
      );

      // Trigger WhatsApp pre-fill option
      const waMsg = `Hi NexoraLab Careers Team,%0A%0AI would like to apply for the *${applyingJob?.title}* role:%0A%0A👤 *Name:* ${applicantName}%0A📧 *Email:* ${applicantEmail}%0A📱 *Phone:* ${applicantPhone}%0A💼 *Experience:* ${applicantExperience}%0A🔗 *Portfolio/GitHub:* ${applicantPortfolio}%0A📝 *Note:* ${applicantCover}%0A%0APlease review my profile.`;
      
      setApplyingJob(null);
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
      setApplicantExperience("");
      setApplicantPortfolio("");
      setApplicantCover("");

      window.open(`https://wa.me/917079884369?text=${waMsg}`, "_blank");
    }, 1200);
  };

  return (
    <section className={`relative overflow-hidden bg-transparent min-h-screen transition-colors duration-300 ${
      isStandalone ? "pt-36 sm:pt-40 md:pt-44 pb-20" : "py-16 md:py-24"
    }`}>
      {isStandalone && (
        <SEO
          title="Careers at NexoraLab Technologies | Build AI & Modern Software"
          description="Join NexoraLab Technologies in Siwan, Bihar or remotely. Explore job openings in Full-Stack Engineering, AI Systems, UI/UX Design, and DevOps."
          keywords={[
            "careers at NexoraLab Technologies",
            "software engineering jobs Siwan Bihar",
            "React developer jobs Bihar",
            "Python AI engineer hiring",
            "remote tech jobs India",
            "UI UX designer jobs Siwan",
            "software developer jobs Bihar",
          ]}
          canonical="https://nexoralabtechnologies.in/careers"
        />
      )}

      {/* Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[300px] rounded-full bg-[#00D2FF]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-[600px] h-[300px] rounded-full bg-[#7C3AED]/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#00D2FF] animate-ping" />
            <span>WE ARE ACTIVELY HIRING</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-['Outfit']"
          >
            Build your career with{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              NexoraLab Technologies
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Work alongside passionate engineers, product designers, and AI researchers building the next generation of scalable software products and intelligent talent suites.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-300">
            <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5">📍 Siwan, Bihar HQ</span>
            <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5">🌍 100% Remote Options</span>
            <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5">⚡ Fast 3-Day Hiring SLA</span>
          </div>
        </div>

        {/* Culture & Perks Grid */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-2">
              WHY JOIN US
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              Engineered for high autonomy, growth, and impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturePerks.map((perk, idx) => {
              const PerkIcon = perk.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="rounded-3xl border border-white/10 bg-[#070e1e]/85 p-7 backdrop-blur-xl transition hover:border-[#00D2FF]/40 hover:-translate-y-1 shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-[#00D2FF] mb-5">
                    <PerkIcon className="text-2xl" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{perk.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {perk.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Open Positions Filter & Directory */}
        <div id="openings" className="mt-24 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-2">
                CURRENT OPENINGS
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-['Outfit']">
                Explore Available Roles{" "}
                <span className="text-sm font-bold text-[#00D2FF] font-mono">
                  ({filteredJobs.length} Open Positions)
                </span>
              </h2>
            </div>

            {/* Live Search */}
            <div className="w-full md:w-80">
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search role, skills (e.g. React)..."
                  className="w-full rounded-2xl border border-white/15 bg-[#070e1e]/90 pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none backdrop-blur-xl"
                />
              </div>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDepartment(dept)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeDepartment === dept
                    ? "bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white shadow-[0_0_18px_rgba(0,210,255,0.35)]"
                    : "border border-white/10 bg-[#070e1e]/80 text-slate-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full text-center py-16 rounded-3xl border border-white/10 bg-[#070e1e]/70">
                <HiBriefcase className="text-4xl text-slate-500 mx-auto mb-3" />
                <p className="text-base text-white font-semibold">No open roles found matching your query.</p>
                <p className="text-xs text-slate-400 mt-1">Send your general CV to nexoralabtechnologies@gmail.com</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#070e1e]/90 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:bg-[#09152b] hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]"
                >
                  <div>
                    {/* Role Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-0.5 text-[11px] font-bold text-[#00D2FF] uppercase tracking-wider mb-2">
                          {job.department}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors font-['Outfit']">
                          {job.title}
                        </h3>
                      </div>
                      <span className="shrink-0 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                        {job.type}
                      </span>
                    </div>

                    {/* Metadata Pills */}
                    <div className="mt-4 flex flex-wrap gap-2.5 text-xs text-slate-300">
                      <span className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/5 px-3 py-1.5">
                        <HiMapPin className="text-[#00D2FF]" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/5 px-3 py-1.5">
                        <HiClock className="text-[#00D2FF]" />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 px-3 py-1.5 text-cyan-300 font-semibold">
                        <HiCurrencyDollar className="text-base text-cyan-400" />
                        {job.salary}
                      </span>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2 font-normal">
                      {job.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {job.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-lg bg-white/5 border border-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition cursor-pointer"
                    >
                      View Details & Perks
                    </button>

                    <button
                      onClick={() => setApplyingJob(job)}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <HiArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* 4-Step Hiring Process */}
        <div className="mt-24 pt-10 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-2">
              OUR HIRING PROCESS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              Fast, respectful, and transparent recruitment
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal">
              We respect your time. Our hiring cycle takes under 4 days from first review to final offer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#070e1e]/85 p-6 backdrop-blur-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-[#00D2FF] font-mono font-black text-sm">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold text-cyan-300 bg-white/5 px-2.5 py-1 rounded-full">
                      {step.time}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Application Banner */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-[#091838] via-[#070e1e] to-[#0a1530] p-8 sm:p-12 text-center shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00D2FF]/20 to-[#7C3AED]/20 border border-cyan-500/30 text-cyan-300 mb-4">
              <HiSparkles className="text-3xl" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              Don't see an exact match for your skills?
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              We are constantly scouting outstanding developers, system architects, and AI researchers. Send your resume and portfolio directly to our engineering leadership.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:nexoralabtechnologies@gmail.com?subject=General%20Engineering%20Application%20-%20NexoraLab"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95"
              >
                <HiEnvelope className="text-base" />
                <span>Email Your Resume (nexoralabtechnologies@gmail.com)</span>
              </a>

              <a
                href="https://wa.me/917079884369?text=Hi%20NexoraLab%20Recruitment%20Team%2C%20I%20would%20like%20to%20apply%20for%20an%20engineering%20role."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/30 px-6 py-3.5 text-xs sm:text-sm font-bold text-emerald-400 transition hover:bg-emerald-900/40"
              >
                <FaWhatsapp className="text-base" />
                <span>Chat with HR on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* JOB DETAILS MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#070e1e] p-6 sm:p-10 shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
              >
                <HiXMark className="text-xl" />
              </button>

              <div className="pr-12">
                <span className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-bold text-[#00D2FF] uppercase tracking-wider mb-2">
                  {selectedJob.department} • {selectedJob.type}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                  {selectedJob.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-lg bg-white/5 border border-white/5 px-2.5 py-1">📍 {selectedJob.location}</span>
                  <span className="rounded-lg bg-white/5 border border-white/5 px-2.5 py-1">⏳ {selectedJob.experience}</span>
                  <span className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 text-cyan-300 font-bold">💰 {selectedJob.salary}</span>
                </div>
              </div>

              <div className="mt-8 space-y-6 text-xs sm:text-sm text-slate-300 font-normal">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2 font-['Outfit']">
                    Role Overview
                  </h3>
                  <p className="leading-relaxed">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-3 font-['Outfit']">
                    Key Responsibilities
                  </h3>
                  <div className="space-y-2">
                    {selectedJob.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <HiCheckCircle className="text-cyan-400 text-base shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-3 font-['Outfit']">
                    Candidate Requirements
                  </h3>
                  <div className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <HiCheckCircle className="text-[#00D2FF] text-base shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-3 font-['Outfit']">
                    Perks & Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedJob.perks.map((p, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-xl bg-white/[0.03] border border-white/5 p-3">
                        <HiSparkles className="text-yellow-400 text-base shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const jobToApply = selectedJob;
                    setSelectedJob(null);
                    setApplyingJob(jobToApply);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Apply For This Position</span>
                  <HiArrowRight />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUICK APPLY FORM MODAL */}
      <AnimatePresence>
        {applyingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#070e1e] p-6 sm:p-10 shadow-2xl text-left"
            >
              <button
                onClick={() => setApplyingJob(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
              >
                <HiXMark className="text-xl" />
              </button>

              <div>
                <span className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider">
                  QUICK APPLICATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-1">
                  Apply for {applyingJob.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Submit your details below for fast-track engineering review within 48 hours.
                </p>
              </div>

              <form onSubmit={handleApplySubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Arjun Sharma"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="arjun@domain.com"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Years of Experience
                    </label>
                    <input
                      type="text"
                      value={applicantExperience}
                      onChange={(e) => setApplicantExperience(e.target.value)}
                      placeholder="e.g. 4.5 Years"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Portfolio / GitHub / LinkedIn URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={applicantPortfolio}
                    onChange={(e) => setApplicantPortfolio(e.target.value)}
                    placeholder="https://github.com/yourhandle or linkedin.com/in/you"
                    className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Brief Introduction / Highlights (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={applicantCover}
                    onChange={(e) => setApplicantCover(e.target.value)}
                    placeholder="Tell us about top projects you have built or why you want to join NexoraLab..."
                    className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none resize-none font-normal"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-xs sm:text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <HiBriefcase className="text-base" />
                        <span>Submit Application & Connect on WhatsApp</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Careers;