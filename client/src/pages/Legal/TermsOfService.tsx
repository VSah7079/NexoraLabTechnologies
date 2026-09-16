import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiScale,
  HiDocumentCheck,
  HiClock,
  HiPrinter,
  HiMagnifyingGlass,
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiSparkles,
  HiCheckCircle,
  HiShieldCheck,
  HiCodeBracket,
  HiCurrencyDollar,
  HiWrenchScrewdriver,
  HiExclamationTriangle,
} from "react-icons/hi2";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";

interface Section {
  id: string;
  title: string;
  number: string;
  content: React.ReactNode;
}

const TermsOfService: React.FC = () => {
  const { openQuoteModal } = useModal();
  const [activeSection, setActiveSection] = useState<string>("acceptance");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const lastUpdated = "September 15, 2026";
  const effectiveDate = "January 01, 2025";

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
      id: "acceptance",
      number: "01",
      title: "Acceptance of Terms & Contractual Framework",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            These Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally binding contract between you (either as an individual or on behalf of the business entity you represent, &quot;Client&quot;, &quot;User&quot;, &quot;You&quot;) and <strong className="text-white">NexoraLab Technologies</strong> (&quot;NexoraLab&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), headquartered in <strong className="text-white">Siwan, Bihar 841226, India</strong>.
          </p>
          <p>
            By accessing our website (<span className="text-[#00D2FF]">https://nexoralabtechnologies.in</span>), signing a project Statement of Work (SOW), executing an engineering Master Services Agreement (MSA), subscribing to our SaaS/AI solutions, or utilizing our AI Talent Intelligence Suite, you signify your full agreement to these Terms.
          </p>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs text-cyan-200">
            <p className="font-semibold text-[#00D2FF] mb-1">Corporate Authority:</p>
            If you are entering into this Agreement on behalf of a company, startup, or enterprise, you represent and warrant that you possess the full legal authority to bind that entity to these Terms.
          </div>
        </div>
      ),
    },
    {
      id: "services-scope",
      number: "02",
      title: "Scope of Technology Services",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>NexoraLab Technologies provides full-lifecycle software consulting, development, and AI services, including but not limited to:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="rounded-xl border border-white/5 bg-[#0b1426]/60 p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ Custom Software & Web Engineering</span>
              React 19, Next.js, Node.js, FastAPI, Flutter, enterprise portals, PWAs, and custom CRM/ERP solutions.
            </div>
            <div className="rounded-xl border border-white/5 bg-[#0b1426]/60 p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ AI Talent Intelligence Suite</span>
              ATS resume parser, match score checker, AI resume builder, skill gap benchmarker, and AI mock interviewer.
            </div>
            <div className="rounded-xl border border-white/5 bg-[#0b1426]/60 p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ Cloud Architecture & DevOps</span>
              AWS, GCP, Terraform IaC, Docker, Kubernetes orchestration, CI/CD pipelines, and 24/7 SLA monitoring.
            </div>
            <div className="rounded-xl border border-white/5 bg-[#0b1426]/60 p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ Turnkey Products & Source Code</span>
              On-demand delivery apps, multi-vendor marketplace platforms, telehealth solutions, and booking portals.
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Specific deliverables, timelines, sprint milestones, and pricing for custom engineering are governed by mutually executed Statements of Work (SOWs), which incorporate these Terms by reference.
          </p>
        </div>
      ),
    },
    {
      id: "ip-ownership",
      number: "03",
      title: "Intellectual Property & Code Ownership",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-2">
              <HiCodeBracket className="text-lg text-[#00D2FF]" />
              <span>100% Client Code Ownership Guarantee</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Upon full and final payment of all agreed invoice milestones specified in the relevant Statement of Work (SOW), <strong className="text-white">NexoraLab assigns 100% of all worldwide right, title, and intellectual property in custom code, UI designs, and database schemas developed specifically for the Client.</strong>
            </p>
          </div>

          <ul className="list-disc pl-6 space-y-2 text-xs">
            <li>
              <strong className="text-white">Client Proprietary Assets:</strong> All logos, trademarks, database records, and trade secrets provided by the Client remain the exclusive property of the Client.
            </li>
            <li>
              <strong className="text-white">Pre-Existing Frameworks & Boilerplates:</strong> NexoraLab retains ownership of generic underlying tools, foundational boilerplates, utility libraries, and reusable algorithms developed prior to or independently of the engagement. NexoraLab grants the Client a perpetual, royalty-free, non-exclusive license to use and modify such libraries as integrated into their final product.
            </li>
            <li>
              <strong className="text-white">Proprietary AI Suite & SaaS:</strong> All rights, patents, trademarks, and source code of the NexoraLab platform itself (e.g., ATS Engine, Resume Analyzer algorithm) remain the sole intellectual property of NexoraLab Technologies.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "client-engagements",
      number: "04",
      title: "Project Milestones, SOWs & Change Requests",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>For custom engineering engagements, delivery follows structured Agile sprints:</p>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <strong className="text-white">1. Statement of Work (SOW):</strong> Each project begins with a documented SOW outlining technical specifications, UI wireframes, milestones, sprint cadences, and acceptance criteria.
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <strong className="text-white">2. Sprint Review & Acceptance:</strong> The Client has seven (7) business days following a milestone delivery/staging demo to review deliverables. If no written objections or bug reports are submitted within this period, the milestone is deemed formally accepted.
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <strong className="text-white">3. Scope Modifications (Change Requests):</strong> Requests for features outside the approved SOW will be scoped under a Change Order with associated cost adjustments and timeline revisions before implementation begins.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ai-terms",
      number: "05",
      title: "AI Talent Suite & Fair Use Policy",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            Users of our AI Talent Intelligence Suite (Resume Analyzer, ATS Score Checker, AI Resume Builder, Skill Gap Analyzer, and Mock Interview) agree to abide by our Fair Use Policy:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs">
            <li>You agree not to upload fraudulent, fabricated, malicious, or defamatory resumes and job postings.</li>
            <li>You shall not use automated scripts, bots, spiders, or scrapers to extract AI scoring models, rubrics, or candidate metrics.</li>
            <li>You agree not to reverse engineer, decompile, or attempt to derive the underlying algorithmic source code of our ATS parser.</li>
            <li>Excessive, automated, or abusive query volume exceeding designated rate limits may result in immediate rate-limiting or account suspension.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "payment-terms",
      number: "06",
      title: "Payment Terms, Invoicing & Taxes",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-[#070e1e] p-4">
              <HiCurrencyDollar className="text-2xl text-[#00D2FF] mx-auto mb-1" />
              <h5 className="text-xs font-bold text-white">Milestone Invoicing</h5>
              <p className="text-[11px] text-slate-400 mt-1">Staged payments tied to verifiable sprint releases.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e] p-4">
              <HiClock className="text-2xl text-purple-400 mx-auto mb-1" />
              <h5 className="text-xs font-bold text-white">Net-15 Due Date</h5>
              <p className="text-[11px] text-slate-400 mt-1">Invoices payable within 15 days of issuance.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e] p-4">
              <HiScale className="text-2xl text-emerald-400 mx-auto mb-1" />
              <h5 className="text-xs font-bold text-white">Statutory Taxes</h5>
              <p className="text-[11px] text-slate-400 mt-1">GST (18% for India) and applicable regional levies.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Payments may be executed via bank wire (NEFT/RTGS/IMPS/SWIFT), UPI, or authorized credit card processing through Stripe/Razorpay. Late payments past 30 days are subject to a late interest fee of 1.5% per month or the maximum rate permissible by law.
          </p>
        </div>
      ),
    },
    {
      id: "warranty-sla",
      number: "07",
      title: "Warranties, Bug-Fix SLA & Disclaimers",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-1">
              <HiWrenchScrewdriver className="text-base text-emerald-400" />
              <span>30-Day Post-Launch Bug-Free Warranty</span>
            </div>
            <p className="text-xs text-slate-200">
              NexoraLab provides a complimentary 30-day warranty following production deployment of custom software. We will remediate any reproducible defects, broken API endpoints, or deviation from the approved SOW at zero additional charge.
            </p>
          </div>
          <p className="text-xs text-slate-400">
            <strong className="text-white">Disclaimer:</strong> Except as expressly provided herein, all services and AI software are provided &quot;as is&quot; and &quot;as available&quot;. NexoraLab disclaims all other warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee that AI resume scoring guarantees employment or candidate hiring success.
          </p>
        </div>
      ),
    },
    {
      id: "liability",
      number: "08",
      title: "Limitation of Liability & Indemnification",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <HiExclamationTriangle className="text-base" />
              <span>Liability Cap & Exclusion of Consequential Damages</span>
            </div>
            <p>
              To the maximum extent permitted by applicable law, in no event shall NexoraLab Technologies, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, revenue, data, goodwill, or business interruption).
            </p>
            <p>
              NexoraLab&apos;s total aggregate liability arising out of or related to this Agreement shall be strictly capped at the total amount paid by the Client to NexoraLab under the specific SOW giving rise to the claim in the twelve (12) months preceding the incident.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "termination",
      number: "09",
      title: "Term, Suspension & Termination",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            Either party may terminate a project engagement or subscription under the following conditions:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs">
            <li><strong className="text-white">For Convenience:</strong> Upon thirty (30) days written notice to the other party, subject to settlement of all hours worked and milestones completed up to the termination date.</li>
            <li><strong className="text-white">For Material Breach:</strong> Immediately if the other party breaches any material term of this Agreement and fails to cure such breach within fourteen (14) days of written notice.</li>
            <li><strong className="text-white">For Non-Payment:</strong> NexoraLab reserves the right to immediately suspend access to development staging servers, code repositories, or SaaS tools if invoices remain unpaid past the due date.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "governing-law",
      number: "10",
      title: "Governing Law & Dispute Resolution",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            This Agreement shall be governed by, construed, and enforced in accordance with the substantive laws of the <strong className="text-white">Republic of India</strong>, without regard to its conflict of law principles.
          </p>
          <div className="rounded-xl border border-white/5 bg-[#070e1e] p-4 text-xs space-y-2">
            <p className="font-semibold text-white">Arbitration & Jurisdiction Clause:</p>
            <p className="text-slate-400">
              Any dispute, controversy, or claim arising out of or relating to these Terms or the breach thereof shall first be settled amicably via good-faith negotiation. If unresolved within 30 days, it shall be referred to and finally resolved by arbitration in accordance with the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be <strong className="text-cyan-300">Siwan / Patna, Bihar, India</strong>, and proceedings shall be conducted in the English language.
            </p>
            <p className="text-slate-400">
              Subject to arbitration, the courts having jurisdiction over <strong className="text-white">Siwan, Bihar, India</strong> shall have exclusive jurisdiction over any legal matters.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      number: "11",
      title: "Official Contact Channels & Inquiries",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            For legal notices, contract inquiries, or clarification regarding these Terms of Service, please contact our Legal Affairs Division:
          </p>
          <div className="rounded-2xl border border-white/10 bg-[#060b18]/90 p-5 space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-[#00D2FF]">
                <HiScale className="text-lg" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Legal & Contracts Department</h5>
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
        title="Terms of Service | NexoraLab Technologies - Client Master Services Agreement"
        description="Review the official Terms of Service and Master Services Agreement for NexoraLab Technologies. Details code ownership, project milestones, AI suite terms, SLAs, warranties, and jurisdiction."
        keywords={[
          "NexoraLab terms of service",
          "software engineering contract India",
          "client code ownership terms",
          "NexoraLab Master Services Agreement",
          "AI tool usage policy",
          "software agency terms Siwan Bihar",
        ]}
        canonical="https://nexoralabtechnologies.in/terms-of-service"
      />

      <div className="relative min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-24 text-slate-200">
        {/* Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
        <div className="absolute top-[700px] right-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED]/08 blur-[160px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-[#00D2FF]">Home</Link>
            <span>/</span>
            <span className="text-slate-500">Legal</span>
            <span>/</span>
            <span className="text-[#00D2FF]">Terms of Service</span>
          </div>

          {/* Header Hero */}
          <div className="relative rounded-3xl border border-white/10 bg-[#060b18]/85 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden mb-12">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#0066FF]/10 blur-[120px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                  <HiScale className="text-sm" />
                  <span>Master Services Agreement</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Terms of <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">Service</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Transparent, balanced, and industry-standard commercial terms. Read how NexoraLab delivers enterprise engineering sprints, transfers IP ownership, and ensures accountability.
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
                  <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-cyan-200">
                    <HiSparkles className="text-cyan-400" />
                    <span>100% Client Code Ownership on Completion</span>
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
                  <span>Print Terms</span>
                </button>
                <button
                  onClick={openQuoteModal}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00D2FF] to-[#0066FF] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <HiDocumentCheck className="text-base" />
                  <span>Request Custom MSA</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Highlights 4-Col Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-[#00D2FF] text-xl mb-3">
                <HiCodeBracket />
              </div>
              <h4 className="text-sm font-bold text-white">Full IP Ownership</h4>
              <p className="text-xs text-slate-400 mt-1">100% source code, repository, and database rights assigned upon project payment.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 text-xl mb-3">
                <HiShieldCheck />
              </div>
              <h4 className="text-sm font-bold text-white">30-Day Free Warranty</h4>
              <p className="text-xs text-slate-400 mt-1">Complimentary bug-fix and stabilization warranty following production launch.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 text-xl mb-3">
                <HiDocumentCheck />
              </div>
              <h4 className="text-sm font-bold text-white">Milestone SOWs</h4>
              <p className="text-xs text-slate-400 mt-1">Structured Agile sprints with transparent demos before invoice sign-off.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-xl mb-3">
                <HiScale />
              </div>
              <h4 className="text-sm font-bold text-white">Balanced Governance</h4>
              <p className="text-xs text-slate-400 mt-1">Indian jurisdiction (Siwan/Patna) with clear, fair dispute resolution processes.</p>
            </div>
          </div>

          {/* Main Layout (TOC + Content) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sticky Sidebar (TOC + Search) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              {/* Search Clause Box */}
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  type="text"
                  placeholder="Search contract terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#060b18]/90 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 backdrop-blur-xl focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF]"
                />
              </div>

              {/* TOC Card */}
              <div className="rounded-3xl border border-white/10 bg-[#060b18]/90 p-5 backdrop-blur-xl shadow-xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 flex items-center gap-1.5">
                  <HiDocumentCheck className="text-sm" />
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
                  <p className="font-semibold text-white">Need an Enterprise MSA?</p>
                  <p className="text-[11px] leading-relaxed">
                    We accommodate enterprise vendor onboardings, custom SLAs, and custom payment cadences.
                  </p>
                  <a
                    href="mailto:nexoralabtechnologies@gmail.com?subject=Enterprise%20MSA%20Inquiry"
                    className="inline-flex items-center gap-1 text-[#00D2FF] hover:underline font-bold text-xs"
                  >
                    <span>Request Custom Contract</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Content Sections */}
            <div className="lg:col-span-8 space-y-8">
              {filteredSections.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-[#060b18]/80 p-8 text-center text-slate-400">
                  <p className="text-sm">No contract terms matched &quot;{searchQuery}&quot;.</p>
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

              {/* Bottom Navigation Links */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#091630] via-[#060e20] to-[#040914] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Review our other policies</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Learn how we protect data and handle cancellations and refunds.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/privacy-policy"
                    className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-bold text-slate-200 transition"
                  >
                    Privacy Policy →
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

export default TermsOfService;
