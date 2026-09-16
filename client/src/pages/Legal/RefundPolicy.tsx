import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiCreditCard,
  HiClock,
  HiPrinter,
  HiMagnifyingGlass,
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiSparkles,
  HiCheckCircle,
  HiXCircle,
  HiArrowPath,
  HiShieldCheck,
  HiCodeBracket,
  HiCpuChip,
  HiCalendarDays,
} from "react-icons/hi2";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";

interface Section {
  id: string;
  title: string;
  number: string;
  content: React.ReactNode;
}

const RefundPolicy: React.FC = () => {
  const { openQuoteModal } = useModal();
  const [activeSection, setActiveSection] = useState<string>("overview");
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
      id: "overview",
      number: "01",
      title: "Overview & Commitment to Fair Practice",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            At <strong className="text-white">NexoraLab Technologies</strong> (&quot;NexoraLab&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), headquartered in <strong className="text-white">Siwan, Bihar 841226, India</strong>, we are committed to building long-term, trust-based relationships with our clients and platform users.
          </p>
          <p>
            We recognize that technology engagements, digital product purchases, and subscription services require clarity and mutual confidence. This Refund & Cancellation Policy outlines the exact terms and operational timelines governing refunds for our custom software engineering services, AI Talent Intelligence Suite subscriptions, and turnkey digital products.
          </p>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-xs text-cyan-200">
            <p className="font-semibold text-[#00D2FF] mb-1">Guiding Principle:</p>
            We strive to resolve any dissatisfaction collaboratively. Before requesting a refund, we encourage clients to discuss project challenges with their dedicated Engineering Pod Lead so we can implement corrective sprints.
          </div>
        </div>
      ),
    },
    {
      id: "custom-software",
      number: "02",
      title: "Custom Software & Agile Sprint Projects",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            Custom software engineering projects (web applications, mobile apps, enterprise cloud systems, and AI models) are structured into milestone-based sprints under an executed Statement of Work (SOW):
          </p>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/5 bg-[#0b1426]/60 p-4">
              <h5 className="font-bold text-white text-xs flex items-center gap-2">
                <HiCheckCircle className="text-emerald-400 text-base shrink-0" />
                Pre-Kickoff Cancellation (100% Refundable)
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                If the Client terminates a signed SOW prior to sprint kickoff and before any design, architectural, or coding work has commenced, <strong className="text-white">100% of the advance deposit will be refunded</strong> (less third-party payment gateway transaction processing fees).
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0b1426]/60 p-4">
              <h5 className="font-bold text-white text-xs flex items-center gap-2">
                <HiCheckCircle className="text-cyan-400 text-base shrink-0" />
                In-Flight Sprint Milestones (Pro-Rata Settlement)
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                If a project is cancelled during an active sprint, billing is calculated on a pro-rata basis for engineering hours logged and completed deliverables. Any unused milestone funds held in advance will be refunded within 7 business days.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0b1426]/60 p-4">
              <h5 className="font-bold text-white text-xs flex items-center gap-2">
                <HiXCircle className="text-amber-400 text-base shrink-0" />
                Approved & Signed-Off Milestones (Non-Refundable)
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                Once a sprint milestone has been demonstrated, verified on staging, and formally accepted by the Client (or the 7-day review window has elapsed without dispute), fees paid for that completed milestone are non-refundable. Completed milestones are backed by our <strong className="text-white">30-Day Bug-Free Warranty</strong>.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ai-subscriptions",
      number: "03",
      title: "AI Talent Suite Subscriptions & Credits",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-xs mb-1">
              <HiSparkles className="text-base text-purple-400" />
              <span>7-Day Money-Back Guarantee for New Subscriptions</span>
            </div>
            <p className="text-xs text-slate-200">
              New monthly or annual subscribers to our AI Talent Intelligence Suite (Candidates, Recruiters, or Enterprise HR) are eligible for a <strong className="text-white">full 100% refund within 7 calendar days</strong> of their initial billing date, provided less than 20% of their monthly AI resume parse or mock interview quota has been utilized.
            </p>
          </div>

          <ul className="list-disc pl-6 space-y-2 text-xs">
            <li>
              <strong className="text-white">Subscription Cancellations:</strong> You may cancel your subscription at any time directly through your account dashboard. Cancellation stops future auto-renewals; your premium features will remain active until the end of the current paid billing cycle.
            </li>
            <li>
              <strong className="text-white">Unused Recurring Credits:</strong> Recurring monthly plan quotas expire at the end of each billing cycle and are non-refundable.
            </li>
            <li>
              <strong className="text-white">Annual Plans:</strong> Annual subscriptions cancelled after the 7-day initial window may be refunded on a pro-rata basis for unused remaining months, recalculated at standard non-discounted monthly rates.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "turnkey-products",
      number: "04",
      title: "Turnkey Products & Source Code Packages",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            For pre-built turnkey software products, mobile app source code packages (e.g., On-Demand Delivery Apps, Marketplace Systems, Telehealth Platforms):
          </p>
          <div className="p-4 rounded-2xl border border-white/10 bg-[#081224] text-xs space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <HiCodeBracket className="text-base" />
              <span>Digital Asset Download Policy</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Due to the irrevocable nature of downloadable source code and digital intellectual property, once full source code repositories or Git access tokens have been delivered, purchases are generally <strong className="text-white">non-refundable</strong>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              <strong className="text-white">Defect Remediation Guarantee:</strong> If a turnkey product contains a critical reproducible defect that prevents core functionality as documented, NexoraLab will fix the issue within fourteen (14) business days. If our engineering team is unable to rectify the defect, a full refund will be issued.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "non-refundable",
      number: "05",
      title: "Non-Refundable Third-Party Expenses",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            The following third-party infrastructure and service fees procured on behalf of the client are strictly non-refundable under all circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs">
            <li>Domain name registration, SSL certificates, and DNS registrar fees.</li>
            <li>Direct cloud infrastructure consumption costs (AWS, GCP, DigitalOcean server hours).</li>
            <li>Third-party API consumption charges (SMS gateways, WhatsApp Business API tokens, paid map credits).</li>
            <li>Third-party plugin licenses or commercial software licenses purchased per client specification.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "request-process",
      number: "06",
      title: "Step-by-Step Refund Request Process",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>To ensure rapid processing of your refund or cancellation request, please follow these simple steps:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-2xl border border-white/10 bg-[#070e1e] p-4 space-y-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300 font-bold font-mono text-xs">1</span>
              <h5 className="font-bold text-white text-xs">Submit Written Request</h5>
              <p className="text-slate-400 text-[11px]">
                Email <strong className="text-white">nexoralabtechnologies@gmail.com</strong> with subject <em className="text-cyan-300">&quot;Refund Request - [Invoice No.]&quot;</em>.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e] p-4 space-y-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300 font-bold font-mono text-xs">2</span>
              <h5 className="font-bold text-white text-xs">Review & Verification</h5>
              <p className="text-slate-400 text-[11px]">
                Our Accounts & Engineering team assesses the milestone logs within <strong className="text-white">3-5 business days</strong>.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e] p-4 space-y-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300 font-bold font-mono text-xs">3</span>
              <h5 className="font-bold text-white text-xs">Disbursement</h5>
              <p className="text-slate-400 text-[11px]">
                Approved funds are credited via the original payment route within <strong className="text-white">5-7 business days</strong>.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "processing-timeline",
      number: "07",
      title: "Refund Disbursement & Payment Methods",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            Once a refund has been approved in writing:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-white/5 bg-[#0b1426]/60 p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ Original Payment Method</span>
              Refunds will be credited directly to the originating bank account, credit card, or UPI VPA used during checkout.
            </div>
            <div className="rounded-xl border border-white/5 bg-[#0b1426]/60 p-3.5">
              <span className="font-bold text-cyan-300 block mb-1">✦ Bank Transfers (NEFT/RTGS/IMPS)</span>
              For bank wire payments, client must provide verified bank account details with matching corporate/individual name.
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Please allow 5-7 business days for the credit to reflect in your banking statement depending on your financial institution&apos;s settlement cycles.
          </p>
        </div>
      ),
    },
    {
      id: "chargebacks",
      number: "08",
      title: "Friendly Resolution & Chargeback Policy",
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            We take customer satisfaction seriously. If you encounter any billing discrepancy or issue with our services, we kindly ask that you contact our billing desk directly before initiating a bank chargeback or dispute.
          </p>
          <p className="text-xs text-slate-400">
            Filing unverified chargebacks without prior communication may result in temporary suspension of project repositories, staging environments, and AI talent accounts while the inquiry is under review.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      number: "09",
      title: "Billing Support & Refund Desk",
      content: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            If you have questions regarding an invoice, subscription renewal, or refund status, our billing specialists are available to assist:
          </p>
          <div className="rounded-2xl border border-white/10 bg-[#060b18]/90 p-5 space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-[#00D2FF]">
                <HiCreditCard className="text-lg" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Billing & Accounts Department</h5>
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
        title="Refund & Cancellation Policy | NexoraLab Technologies - Transparent Terms"
        description="Learn about the refund and cancellation policies of NexoraLab Technologies. Transparent terms for custom software sprints, 7-day money-back guarantee for AI suite subscriptions, and turnkey source code."
        keywords={[
          "NexoraLab refund policy",
          "cancellation policy software agency",
          "AI subscription refund guarantee",
          "milestone refund terms India",
          "NexoraLab Technologies billing",
          "software engineering refunds Siwan",
        ]}
        canonical="https://nexoralabtechnologies.in/refund-policy"
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
            <span className="text-[#00D2FF]">Refund Policy</span>
          </div>

          {/* Header Hero */}
          <div className="relative rounded-3xl border border-white/10 bg-[#060b18]/85 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden mb-12">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#00D2FF]/10 blur-[120px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                  <HiCreditCard className="text-sm" />
                  <span>Fair & Transparent Commerce</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Refund & <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">Cancellation Policy</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Clear, honest, and straightforward refund terms. Understand our milestone settlement rules, 7-day AI subscription money-back guarantee, and disbursement timelines.
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
                    <span>7-Day AI Subscription Guarantee</span>
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
                  <HiShieldCheck className="text-base" />
                  <span>Talk to Billing Desk</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Highlights 4-Col Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-[#00D2FF] text-xl mb-3">
                <HiSparkles />
              </div>
              <h4 className="text-sm font-bold text-white">7-Day Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1">100% refund for new AI Talent Suite subscribers within 7 days of initial signup.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 text-xl mb-3">
                <HiCheckCircle />
              </div>
              <h4 className="text-sm font-bold text-white">100% Pre-Kickoff Refund</h4>
              <p className="text-xs text-slate-400 mt-1">Full deposit refund for custom software cancelled before sprint development begins.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 text-xl mb-3">
                <HiArrowPath />
              </div>
              <h4 className="text-sm font-bold text-white">5-7 Day Disbursement</h4>
              <p className="text-xs text-slate-400 mt-1">Approved refunds disbursed via original payment route, bank wire, or UPI.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-xl mb-3">
                <HiShieldCheck />
              </div>
              <h4 className="text-sm font-bold text-white">30-Day Bug Warranty</h4>
              <p className="text-xs text-slate-400 mt-1">Free defect remediation post-launch for all custom software deliverables.</p>
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
                  placeholder="Search refund terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#060b18]/90 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 backdrop-blur-xl focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF]"
                />
              </div>

              {/* TOC Card */}
              <div className="rounded-3xl border border-white/10 bg-[#060b18]/90 p-5 backdrop-blur-xl shadow-xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3 flex items-center gap-1.5">
                  <HiCreditCard className="text-sm" />
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
                  <p className="font-semibold text-white">Have a billing inquiry?</p>
                  <p className="text-[11px] leading-relaxed">
                    Our accounts desk responds to all refund and billing inquiries within 24 business hours.
                  </p>
                  <a
                    href="mailto:nexoralabtechnologies@gmail.com?subject=Billing%20Support%20Inquiry"
                    className="inline-flex items-center gap-1 text-[#00D2FF] hover:underline font-bold text-xs"
                  >
                    <span>Contact Billing Desk</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Content Sections */}
            <div className="lg:col-span-8 space-y-8">
              {filteredSections.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-[#060b18]/80 p-8 text-center text-slate-400">
                  <p className="text-sm">No refund terms matched &quot;{searchQuery}&quot;.</p>
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
                  <p className="text-xs text-slate-400 mt-0.5">Learn how we protect your data and structure engineering agreements.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/privacy-policy"
                    className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-bold text-slate-200 transition"
                  >
                    Privacy Policy →
                  </Link>
                  <Link
                    to="/terms-of-service"
                    className="rounded-full border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 text-xs font-bold text-[#00D2FF] transition"
                  >
                    Terms of Service →
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

export default RefundPolicy;
