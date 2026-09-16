import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiShieldCheck,
  HiLockClosed,
  HiDocumentText,
  HiClock,
  HiPrinter,
  HiMagnifyingGlass,
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiSparkles,
  HiCheckCircle,
  HiCpuChip,
  HiGlobeAlt,
} from "react-icons/hi2";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";

interface Section {
  id: string;
  title: string;
  number: string;
  content: React.ReactNode;
}

const PrivacyPolicy: React.FC = () => {
  const { openQuoteModal } = useModal();
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const lastUpdated = "September 15, 2026";
  const effectiveDate = "January 01, 2025";

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionTop = (current as HTMLElement).offsetTop - 140;
        const sectionId = current.getAttribute("id") || "";

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const sections: Section[] = [
    {
      id: "overview",
      number: "01",
      title: "Introduction & Corporate Overview",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            Welcome to <strong className="text-white">NexoraLab Technologies</strong> (&quot;NexoraLab&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We operate the website <span className="text-[#00D2FF]">https://nexoralabtechnologies.in</span>, our proprietary AI Talent Intelligence Suite (including Resume Analyzer, ATS Score Checker, AI Resume Builder, and Mock Interview platform), custom software engineering portals, client dashboards, and related enterprise services (collectively, the &quot;Services&quot;).
          </p>
          <p>
            NexoraLab Technologies is headquartered in <strong className="text-white">Siwan, Bihar 841226, India</strong>. We are firmly committed to safeguarding your personal data, corporate intellectual assets, and digital privacy. This Privacy Policy delineates the exact categories of data we collect, why we collect it, how it is processed and secured, and your explicit rights under applicable global and national data privacy legislations, including India&apos;s <strong className="text-cyan-300">Digital Personal Data Protection (DPDP) Act 2023</strong>, the European Union&apos;s <strong className="text-cyan-300">General Data Protection Regulation (GDPR)</strong>, and other applicable data privacy frameworks.
          </p>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs text-cyan-200">
            <p className="font-semibold text-[#00D2FF] mb-1">Notice of Acceptance:</p>
            By accessing or using our websites, software services, AI tools, or entering into an engineering engagement with NexoraLab Technologies, you acknowledge that you have read, understood, and consented to the practices described in this policy.
          </div>
        </div>
      ),
    },
    {
      id: "data-collected",
      number: "02",
      title: "Information We Collect",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            We collect information that you directly provide to us, data generated automatically during your interactions with our platforms, and data obtained through authorized integrations.
          </p>
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF]" />
              A. Personal & Account Identification Data
            </h4>
            <p className="pl-3.5 text-xs text-slate-400">
              When you submit inquiry forms, book an engineering consultation, register for an account, or request a quote:
            </p>
            <ul className="pl-7 list-disc space-y-1 text-xs text-slate-300">
              <li>Full Legal Name, Business Email Address, and Contact Telephone Number (+91 or international).</li>
              <li>Company/Organization Name, Job Title, Industry Vertical, and Estimated Project Budget.</li>
              <li>Account login credentials (hashed passwords, authentication tokens, OAuth identifiers).</li>
              <li>Billing addresses, tax identifiers (GSTIN/PAN/VAT), and payment transaction receipts.</li>
            </ul>

            <h4 className="text-white font-semibold text-sm flex items-center gap-2 pt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              B. Uploaded Files & AI Talent Intelligence Input Data
            </h4>
            <p className="pl-3.5 text-xs text-slate-400">
              When you interact with our proprietary AI tools:
            </p>
            <ul className="pl-7 list-disc space-y-1 text-xs text-slate-300">
              <li>Resumes, CVs, portfolio documents, and job descriptions uploaded in PDF, DOCX, or text formats.</li>
              <li>Career history, educational credentials, certifications, skill tags, and portfolio URLs.</li>
              <li>Audio recordings or text transcripts generated during AI Mock Interview practice sessions.</li>
            </ul>

            <h4 className="text-white font-semibold text-sm flex items-center gap-2 pt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              C. Automated Technical Telemetry & Device Metrics
            </h4>
            <p className="pl-3.5 text-xs text-slate-400">
              Information logged automatically when you browse our site:
            </p>
            <ul className="pl-7 list-disc space-y-1 text-xs text-slate-300">
              <li>IP address, geolocation (city/region level), browser type, device OS, and screen resolution.</li>
              <li>Referring URLs, page dwell time, clickstream events, and API error reports.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "ai-privacy",
      number: "03",
      title: "AI Processing & Zero Model-Training Guarantee",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm mb-2">
              <HiCpuChip className="text-lg text-purple-400" />
              <span>Our Uncompromising AI Privacy Promise</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              NexoraLab Technologies uses enterprise-tier AI APIs (including Google Gemini Enterprise and secured LLM endpoints). <strong className="text-white">Your uploaded resumes, candidate data, source code, and private engineering requirements are NEVER used to train, retrain, or improve public foundation models.</strong>
            </p>
          </div>

          <p>
            All AI processing operates strictly on ephemeral compute or sandboxed inference pipelines:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs">
            <li>
              <strong className="text-white">Ephemeral In-Memory Parsing:</strong> Resume parsing and ATS scoring extract vector embeddings and structured JSON in memory, purging temporary raw payloads immediately post-execution.
            </li>
            <li>
              <strong className="text-white">Customer Data Isolation:</strong> Candidate evaluation data, mock interview feedback, and ATS scores remain strictly segregated within your private tenant database.
            </li>
            <li>
              <strong className="text-white">No Autonomous Hiring Decisions:</strong> Our AI talent utilities serve purely as assistive intelligence. NexoraLab does not make automated legal or employment termination decisions without human intervention.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "how-we-use",
      number: "04",
      title: "How We Use Your Information",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>We process your personal information strictly for legitimate, declared business purposes:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="rounded-2xl border border-white/5 bg-[#0b1426]/60 p-4">
              <h5 className="font-bold text-white text-xs flex items-center gap-2">
                <HiCheckCircle className="text-cyan-400 text-base shrink-0" />
                Service Delivery & Sprints
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                To architect, develop, deploy, and support custom web/mobile applications, cloud architectures, and client software deliverables.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#0b1426]/60 p-4">
              <h5 className="font-bold text-white text-xs flex items-center gap-2">
                <HiCheckCircle className="text-cyan-400 text-base shrink-0" />
                AI Tool Functionality
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                To compute ATS match percentages, generate tailored resume bullets, benchmark skill gaps, and produce mock interview rubrics.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#0b1426]/60 p-4">
              <h5 className="font-bold text-white text-xs flex items-center gap-2">
                <HiCheckCircle className="text-cyan-400 text-base shrink-0" />
                Communications & Quotes
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                To respond to RFQs, schedule discovery meetings, provide sprint status updates, and issue billing invoices.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#0b1426]/60 p-4">
              <h5 className="font-bold text-white text-xs flex items-center gap-2">
                <HiCheckCircle className="text-cyan-400 text-base shrink-0" />
                Security & Fraud Prevention
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                To detect unauthorized intrusion attempts, prevent abuse of free AI utilities, and maintain zero-trust cloud integrity.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "data-security",
      number: "05",
      title: "Data Security & Architecture Standards",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            NexoraLab Technologies adheres to enterprise-grade security protocols across all infrastructure layers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-[#070e1e] p-4 text-center">
              <div className="text-xl font-black text-cyan-300 mb-1">AES-256</div>
              <h5 className="text-xs font-bold text-white">Encryption at Rest</h5>
              <p className="text-[11px] text-slate-400 mt-1">All database volumes, file uploads & backups encrypted.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e] p-4 text-center">
              <div className="text-xl font-black text-cyan-300 mb-1">TLS 1.3</div>
              <h5 className="text-xs font-bold text-white">Encryption in Transit</h5>
              <p className="text-[11px] text-slate-400 mt-1">HTTPS/WSS encrypted traffic with HSTS preloaded.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e] p-4 text-center">
              <div className="text-xl font-black text-cyan-300 mb-1">Zero-Trust</div>
              <h5 className="text-xs font-bold text-white">Role-Based Access</h5>
              <p className="text-[11px] text-slate-400 mt-1">Strict RBAC, multi-factor auth, and audited access logs.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            While we implement state-of-the-art administrative, physical, and technical controls, no method of transmission over the internet or electronic storage is 100% impenetrable. In the improbable event of a data security breach, we maintain an automated incident response plan and will notify affected parties and regulatory authorities within statutory timelines (within 72 hours where required by GDPR/DPDP).
          </p>
        </div>
      ),
    },
    {
      id: "data-sharing",
      number: "06",
      title: "Third-Party Service Providers & Sharing",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            <strong className="text-white">We do not sell, rent, or trade your personal data.</strong> We only share information with vetted sub-processors essential to operating our business:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs">
            <li>
              <strong className="text-white">Cloud Infrastructure:</strong> Amazon Web Services (AWS), Google Cloud Platform (GCP), and secure PostgreSQL/Redis clusters.
            </li>
            <li>
              <strong className="text-white">Payment Gateways:</strong> PCI-DSS certified payment processors (Razorpay, Stripe) for secure online invoicing and subscription charges. We do not store raw credit/debit card numbers on our servers.
            </li>
            <li>
              <strong className="text-white">Communication & Email:</strong> SendGrid/Postmark/Nodemailer for transactional OTPs, system alerts, and sprint status reports.
            </li>
            <li>
              <strong className="text-white">Legal Obligations:</strong> When compelled by valid legal subpoenas, court orders, or statutory mandates under Indian or applicable international law.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "cookies",
      number: "07",
      title: "Cookies & Tracking Policy",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            Our website uses cookies and local storage tokens strictly to ensure optimal performance, remember your user session, and analyze aggregated platform traffic.
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <strong className="text-white">1. Strictly Necessary Cookies:</strong> Essential for account authentication, route protection, CSRF prevention, and session state.
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <strong className="text-white">2. Performance & Analytics Cookies:</strong> Anonymized telemetry to monitor page load latency, bounce rates, and browser compatibility.
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <strong className="text-white">3. User Preference Tokens:</strong> Remembering your UI preferences (dark mode states, dashboard filter layouts).
            </div>
          </div>
          <p className="text-xs text-slate-400">
            You can configure your browser to decline all non-essential cookies. Please note that disabling essential cookies may impact the functionality of authenticated portals.
          </p>
        </div>
      ),
    },
    {
      id: "user-rights",
      number: "08",
      title: "Your Rights (GDPR & DPDP Act 2023)",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            Depending on your jurisdiction, you possess explicit legal rights regarding your personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-white/10 bg-[#081224] p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ Right to Access & Review</span>
              Request a comprehensive digital copy of all personal records and uploaded files we hold about you.
            </div>
            <div className="rounded-xl border border-white/10 bg-[#081224] p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ Right to Rectification</span>
              Request correction or updating of any inaccurate, outdated, or incomplete personal data.
            </div>
            <div className="rounded-xl border border-white/10 bg-[#081224] p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ Right to Erasure (&quot;Right to be Forgotten&quot;)</span>
              Request complete permanent deletion of your user profile, uploaded resumes, and history from our active databases.
            </div>
            <div className="rounded-xl border border-white/10 bg-[#081224] p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ Right to Data Portability</span>
              Receive your structured data in an interoperable, machine-readable JSON or CSV format.
            </div>
          </div>
          <p className="text-xs text-slate-400">
            To exercise any of these rights, email our Data Protection Desk at <strong className="text-white">nexoralabtechnologies@gmail.com</strong> with the subject line <em className="text-cyan-300">&quot;Data Subject Request - [Your Name]&quot;</em>. We process all verified requests within 15 business days free of charge.
          </p>
        </div>
      ),
    },
    {
      id: "retention",
      number: "09",
      title: "Data Retention & Disposal",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or to satisfy contractual, tax, accounting, and legal requirements:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs">
            <li><strong className="text-white">Active Client Projects:</strong> Retained for the duration of the engagement plus 3 years for ongoing warranty, source code maintenance, and legal defense.</li>
            <li><strong className="text-white">AI Resume Analysis Logs:</strong> Unregistered guest uploads are purged after 24 hours. Registered candidate records are retained until the user deletes their account.</li>
            <li><strong className="text-white">Financial & Tax Invoices:</strong> Retained for 7 years to comply with statutory Indian GST and income tax audit requirements.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "children",
      number: "10",
      title: "Children's Privacy Protection",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            Our software engineering services and AI tools are intended exclusively for individuals aged 16 and older. We do not knowingly solicit, collect, or process personal data from children under the age of 16. If we become aware that an individual under 16 has submitted personal information without verifiable parental consent, we will promptly purge such data from our servers.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      number: "11",
      title: "Grievance Officer & Contact Channels",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            In accordance with the Information Technology Act 2000 and the DPDP Act 2023, if you have any questions, concerns, or grievances regarding our privacy practices, you may directly contact our designated Data Protection & Grievance Officer:
          </p>
          <div className="rounded-2xl border border-white/10 bg-[#060b18]/90 p-5 space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-[#00D2FF]">
                <HiShieldCheck className="text-lg" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Grievance & Privacy Officer</h5>
                <p className="text-slate-400">NexoraLab Technologies Corporate Headquarters</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <HiMapPin className="text-[#00D2FF] shrink-0" />
                <span>Siwan, Bihar 841226, India</span>
              </div>
              <a
                href="mailto:nexoralabtechnologies@gmail.com"
                className="flex items-center gap-2 hover:text-[#00D2FF] transition"
              >
                <HiEnvelope className="text-[#00D2FF] shrink-0" />
                <span>nexoralabtechnologies@gmail.com</span>
              </a>
              <a
                href="tel:+917079884369"
                className="flex items-center gap-2 hover:text-[#00D2FF] transition"
              >
                <HiPhone className="text-[#00D2FF] shrink-0" />
                <span>+91 70798 84369</span>
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const filteredSections = searchQuery.trim()
    ? sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sections;

  return (
    <>
      <SEO
        title="Privacy Policy | NexoraLab Technologies - Data Protection & GDPR Compliance"
        description="Read the official Privacy Policy of NexoraLab Technologies. Learn how we protect your personal data, secure AI talent parsing, ensure zero model training on your resumes, and comply with DPDP & GDPR."
        keywords={[
          "NexoraLab privacy policy",
          "data protection NexoraLab",
          "GDPR DPDP Act 2023 compliance",
          "AI resume data privacy",
          "software engineering privacy terms",
          "NexoraLab Technologies Siwan Bihar",
        ]}
        canonical="https://nexoralabtechnologies.in/privacy-policy"
      />

      <div className="relative min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-24 text-slate-200">
        {/* Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
        <div className="absolute top-[700px] left-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED]/08 blur-[160px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-[#00D2FF]">Home</Link>
            <span>/</span>
            <span className="text-slate-500">Legal</span>
            <span>/</span>
            <span className="text-[#00D2FF]">Privacy Policy</span>
          </div>

          {/* Header Hero */}
          <div className="relative rounded-3xl border border-white/10 bg-[#060b18]/85 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden mb-12">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#00D2FF]/10 blur-[120px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                  <HiShieldCheck className="text-sm" />
                  <span>Trust & Data Governance</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Privacy <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">Policy</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Your privacy and intellectual assets are sacred. Discover how NexoraLab Technologies collects, encrypts, and processes your data across our software engineering services and AI intelligence suite.
                </p>

                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <HiClock className="text-cyan-400" />
                    <span>Last Updated: <strong className="text-white">{lastUpdated}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <HiCheckCircle className="text-emerald-400" />
                    <span>Effective: <strong className="text-white">{effectiveDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-purple-200">
                    <HiSparkles className="text-purple-400" />
                    <span>DPDP Act 2023 & GDPR Compliant</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col gap-3 shrink-0">
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-3 text-xs font-bold text-slate-200 transition hover:text-white cursor-pointer"
                >
                  <HiPrinter className="text-base text-[#00D2FF]" />
                  <span>Print Policy</span>
                </button>
                <button
                  onClick={openQuoteModal}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00D2FF] to-[#0066FF] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <HiLockClosed className="text-base" />
                  <span>Enterprise Security Deck</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Highlights 4-Col Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-[#00D2FF] text-xl mb-3">
                <HiLockClosed />
              </div>
              <h4 className="text-sm font-bold text-white">AES-256 Encryption</h4>
              <p className="text-xs text-slate-400 mt-1">End-to-end data encryption across all database records and file uploads.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 text-xl mb-3">
                <HiCpuChip />
              </div>
              <h4 className="text-sm font-bold text-white">Zero Model Training</h4>
              <p className="text-xs text-slate-400 mt-1">Your uploaded resumes, codebases, and briefs are never used to train public AI models.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 text-xl mb-3">
                <HiShieldCheck />
              </div>
              <h4 className="text-sm font-bold text-white">DPDP 2023 & GDPR</h4>
              <p className="text-xs text-slate-400 mt-1">Strict adherence to Indian digital personal data and international privacy mandates.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-xl mb-3">
                <HiGlobeAlt />
              </div>
              <h4 className="text-sm font-bold text-white">100% Data Sovereignty</h4>
              <p className="text-xs text-slate-400 mt-1">Request complete access, export, or permanent deletion of your data within 15 days.</p>
            </div>
          </div>

          {/* Main Content Layout (Sidebar TOC + Content Body) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sticky Sidebar (TOC + Search) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              {/* Search Clause Box */}
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type="text"
                  placeholder="Search privacy clauses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#060b18]/90 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 backdrop-blur-xl focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF]"
                />
              </div>

              {/* TOC Card */}
              <div className="rounded-3xl border border-white/10 bg-[#060b18]/90 p-5 backdrop-blur-xl shadow-xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 flex items-center gap-1.5">
                  <HiDocumentText className="text-sm" />
                  <span>Table of Contents</span>
                </h3>

                <nav className="space-y-1 max-h-[55vh] overflow-y-auto pr-1">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition cursor-pointer ${
                        activeSection === sec.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-200 font-bold"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="truncate pr-2">
                        <span className="font-mono text-[10px] text-cyan-400 mr-2">{sec.number}.</span>
                        {sec.title}
                      </span>
                      {activeSection === sec.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF] shrink-0" />
                      )}
                    </button>
                  ))}
                </nav>

                {/* Direct Contact mini-card */}
                <div className="mt-5 pt-4 border-t border-white/10 text-xs text-slate-400 space-y-2">
                  <p className="font-semibold text-white">Need custom DPA or NDA?</p>
                  <p className="text-[11px] leading-relaxed">
                    We sign mutual NDAs and enterprise Data Processing Agreements for corporate clients.
                  </p>
                  <a
                    href="mailto:nexoralabtechnologies@gmail.com?subject=Enterprise%20NDA%20Inquiry"
                    className="inline-flex items-center gap-1 text-[#00D2FF] hover:underline font-bold text-xs"
                  >
                    <span>Contact Privacy Desk</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Content Sections */}
            <div className="lg:col-span-8 space-y-8">
              {filteredSections.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-[#060b18]/80 p-8 text-center text-slate-400">
                  <p className="text-sm">No privacy clauses matched &quot;{searchQuery}&quot;.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-xs font-bold text-[#00D2FF] underline cursor-pointer"
                  >
                    Clear Search Filter
                  </button>
                </div>
              ) : (
                filteredSections.map((sec) => (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-32 rounded-3xl border border-white/10 bg-[#070e1e]/85 p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 font-mono text-xs font-bold text-[#00D2FF]">
                        {sec.number}
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        {sec.title}
                      </h2>
                    </div>

                    {sec.content}
                  </section>
                ))
              )}

              {/* Bottom Quick Links to other legal pages */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#091630] via-[#060e20] to-[#040914] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Looking for other legal terms?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Explore our service contracts, milestone guarantees, and refund rules.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/terms-of-service"
                    className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-bold text-slate-200 transition"
                  >
                    Terms of Service →
                  </Link>
                  <Link
                    to="/refund-policy"
                    className="rounded-full border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 text-xs font-bold text-[#00D2FF] transition"
                  >
                    Refund Policy →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
