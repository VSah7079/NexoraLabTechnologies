import React from "react";
import { Link } from "react-router-dom";
import {
  HiSparkles,
  HiCheckCircle,
  HiArrowUpRight,
  HiCpuChip,
  HiDevicePhoneMobile,
  HiComputerDesktop,
  HiBuildingOffice,
  HiTruck,
  HiShoppingBag,
  HiHeart,
  HiCurrencyDollar,
} from "react-icons/hi2";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";
import {
  aiSolutionsImg,
  logisticsDeliveryImg,
  telehealthImg,
  ecommerceMarketplaceImg,
  mobileFintechImg,
  enterpriseErpImg,
} from "@/assets/images";

const turnkeySolutions = [
  {
    id: "ai-hiring",
    icon: HiCpuChip,
    image: aiSolutionsImg,
    badge: "NexoraLab Flagship Suite",
    title: "AI Talent Intelligence & Smart Hiring Suite",
    desc: "Complete end-to-end recruitment infrastructure with sub-15ms resume parsing, neural ATS scoring, automated candidate ranking, and AI voice mock interviews.",
    features: [
      "Real-Time ATS Parsing & Semantic Keyword Extraction",
      "Dynamic Radar Skill Gap Benchmark",
      "Automated Candidate Shortlisting & Recruiter Dashboard",
      "Voice & Coding AI Mock Interview Simulator",
    ],
    timeline: "Ready to Deploy / Custom API in 1 Week",
    link: "/resume-analyzer",
  },
  {
    id: "ondemand-delivery",
    icon: HiTruck,
    image: logisticsDeliveryImg,
    badge: "Hyperlocal & Logistics",
    title: "On-Demand Delivery & Fleet Dispatch Stacks",
    desc: "Scalable turnkey platform for food delivery, grocery, courier, and freight logistics with real-time GPS tracking, automated driver dispatching, and dynamic route optimization.",
    features: [
      "Customer App (iOS / Android / Web)",
      "Driver / Courier Companion App with Route Guidance",
      "Merchant / Restaurant Storefront Console",
      "Super-Admin Operations & Real-Time Heatmap Dispatch",
    ],
    timeline: "Full Launch in 4–6 Weeks",
  },
  {
    id: "telehealth",
    icon: HiHeart,
    image: telehealthImg,
    badge: "HIPAA Compliant",
    title: "Telehealth & Remote Patient Monitoring Platform",
    desc: "Secure medical consultation platform featuring WebRTC HD video appointments, electronic health record (EHR) sync, e-prescriptions, and biometric wearable integration.",
    features: [
      "Sub-100ms HD Video & Audio Medical Rooms",
      "Digital Prescription Generator with Pharmacy Dispatch",
      "Patient Medical Records & Vitals Telemetry Sync",
      "Doctor Scheduling & Automated Reminder Sequences",
    ],
    timeline: "Full Launch in 6–8 Weeks",
  },
  {
    id: "ecommerce-marketplace",
    icon: HiShoppingBag,
    image: ecommerceMarketplaceImg,
    badge: "Multi-Vendor Scale",
    title: "Multi-Vendor Marketplace & Operations ERP",
    desc: "Next.js 16 high-speed marketplace powering thousands of vendor storefronts, automated multi-currency checkout, dynamic commissions, and automated inventory sync.",
    features: [
      "Vendor Self-Serve Dashboard & Product Manager",
      "Automated Stripe / Razorpay Split Payments",
      "Elasticsearch Sub-20ms Catalog Filtering",
      "Integrated Warehouse & Courier Tracking APIs",
    ],
    timeline: "Full Launch in 4–6 Weeks",
  },
  {
    id: "fintech-wallet",
    icon: HiCurrencyDollar,
    image: mobileFintechImg,
    badge: "PCI-DSS Level 1 Ready",
    title: "FinTech Digital Wallet & Micro-Lending Suite",
    desc: "Resilient digital banking framework featuring double-entry ledger architecture, peer-to-peer transfers, virtual debit cards, and automated credit risk scoring.",
    features: [
      "Zero-Discrepancy Double-Entry Transaction Ledger",
      "KYC / AML Biometric Identity Verification",
      "Instant P2P Transfers & QR Code Merchant Pay",
      "Automated Loan Origination & Repayment Schedules",
    ],
    timeline: "Full Launch in 8–10 Weeks",
  },
  {
    id: "enterprise-crm",
    icon: HiBuildingOffice,
    image: enterpriseErpImg,
    badge: "Salesforce & Custom ERP",
    title: "Enterprise CRM & Custom Workflow Automation",
    desc: "Tailored operational engines connecting CRM leads, ERP inventory, finance approvals, and employee HR workflows into a unified executive glass pane.",
    features: [
      "Bi-Directional API Sync with Salesforce, SAP & HubSpot",
      "Role-Based Access Control (RBAC) & Single Sign-On (SSO)",
      "Automated CPQ Quotation & Invoice Generators",
      "Real-Time Executive Revenue Forecasts",
    ],
    timeline: "Full Launch in 4–6 Weeks",
  },
];

const SolutionsPage: React.FC = () => {
  const { openQuoteModal } = useModal();

  return (
    <>
      <SEO
        title="Enterprise Solutions & Accelerator Kits | NexoraLab Technologies"
        description="Explore turnkey enterprise technology stacks: AI talent intelligence, on-demand logistics, telemedicine, multi-vendor marketplaces, fintech wallets, and enterprise ERP from NexoraLab Technologies."
        keywords={[
          "enterprise software solutions",
          "industry technology accelerators",
          "fintech wallet app architecture",
          "telehealth HIPAA compliant software",
          "supply chain logistics management system",
          "edtech LMS platform solution",
          "AI talent suite solutions",
          "NexoraLab enterprise accelerators",
        ]}
        canonical="https://nexoralabtechnologies.in/solutions"
      />

      <div className="relative min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-20">
        {/* Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
        <div className="absolute top-[800px] left-10 w-[500px] h-[450px] rounded-full bg-[#7C3AED]/08 blur-[170px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-[#00D2FF]">Home</Link>
            <span>/</span>
            <span className="text-[#00D2FF]">Enterprise Solutions</span>
          </div>

          {/* Hero Header */}
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
              <HiSparkles />
              <span>Turnkey Industry Accelerators</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15]">
              Pre-Engineered <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">Enterprise Software & Industry Stacks</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
              Accelerate your time-to-market by up to 60% with our proven, battle-tested architectural frameworks — customized to your exact business rules and branded for your enterprise.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {turnkeySolutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <div
                  key={sol.id}
                  className="rounded-3xl border border-white/10 bg-[#070e1e]/90 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(0,210,255,0.15)] hover:-translate-y-1.5 flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual Mockup Banner */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900 border-b border-white/10">
                      <img
                        src={sol.image}
                        alt={sol.title}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-[#070e1e]/30 to-transparent" />
                      <span className="absolute top-3 right-3 rounded-full bg-[#070e1e]/80 border border-cyan-500/40 px-3 py-1 text-[10px] font-bold text-cyan-300 backdrop-blur-md">
                        {sol.badge}
                      </span>
                      <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#070e1e]/90 border border-cyan-500/30 text-[#00D2FF] text-xl backdrop-blur-md">
                        <Icon />
                      </div>
                    </div>

                    <div className="p-6 pb-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {sol.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-normal">
                        {sol.desc}
                      </p>
                    </div>

                    <div className="p-6 pt-5">
                      <div className="pt-4 border-t border-white/5 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block mb-2">
                        Core Architecture Features:
                      </span>
                      {sol.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <HiCheckCircle className="text-[#00D2FF] text-sm shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-400 font-semibold">⚡ {sol.timeline}</span>
                    <button
                      onClick={openQuoteModal}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0066FF] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110"
                    >
                      <span>Request Solution Demo</span>
                      <HiArrowUpRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pre-Footer CTA */}
          <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-[#091630] via-[#060e20] to-[#040914] p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-6 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white max-w-2xl">
              Need a Custom Stacking Architecture?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We customize any solution to your exact database requirements, branding, and local market payment integrations.
            </p>
            <button
              onClick={openQuoteModal}
              className="rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-10 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] transition hover:scale-105 active:scale-95"
            >
              Consult Solutions Team →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolutionsPage;
