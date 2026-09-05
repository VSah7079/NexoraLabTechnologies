import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiXMark,
  HiCheckCircle,
  HiSparkles,
  HiCpuChip,
  HiShieldCheck,
  HiClock,
} from "react-icons/hi2";

export interface IndustryItem {
  id: number;
  title: string;
  icon: string;
  subtitle: string;
  description: string;
  tags: string[];
  features: string[];
  techStack: string[];
  deliveryTime: string;
  sla: string;
}

const industries: IndustryItem[] = [
  {
    id: 1,
    title: "Healthcare",
    icon: "🏥",
    subtitle: "HIPAA-Compliant Digital Health, HMS & Telemedicine",
    description:
      "Digital healthcare platforms, HMS, EMR, patient management and telemedicine solutions.",
    tags: ["HIPAA Compliant", "AI Diagnostics", "Telemedicine"],
    features: [
      "AI-Assisted Patient Triage & Diagnostics",
      "Electronic Medical Records (EMR/EHR Sync)",
      "End-to-End Encrypted Telemedicine Video & Chat",
      "IoT Medical Device Telemetry Integration",
      "Automated Appointment Scheduling & Billing",
    ],
    techStack: ["React / Next.js", "WebRTC", "Python / FastAPI", "PostgreSQL", "AWS HealthLake"],
    deliveryTime: "4 - 8 Weeks",
    sla: "99.99% HIPAA Ready",
  },
  {
    id: 2,
    title: "Education",
    icon: "🎓",
    subtitle: "Next-Gen LMS, School ERP & Online Learning Suites",
    description:
      "School ERP, College Management, LMS and online learning platforms.",
    tags: ["LMS", "ERP", "Online Learning"],
    features: [
      "Interactive Live Virtual Classrooms & Whiteboards",
      "AI-Driven Student Performance & Skill Gap Analytics",
      "Automated Fee Management & Invoicing Gateway",
      "Faculty Management & Exam Grading Engine",
      "Parent-Teacher Dedicated Mobile Experience",
    ],
    techStack: ["Next.js", "Node.js", "Socket.io", "MongoDB", "AWS S3 / CloudFront"],
    deliveryTime: "3 - 6 Weeks",
    sla: "24/7 Academic Uptime",
  },
  {
    id: 3,
    title: "Finance & Fintech",
    icon: "🏦",
    subtitle: "High-Security Banking, Fintech & Financial Automation",
    description:
      "Secure fintech applications, banking software and financial automation.",
    tags: ["Fintech", "Secure", "Automation"],
    features: [
      "Real-Time AI Fraud Detection & Risk Scoring",
      "Multi-Currency Payment Gateway Integration",
      "Automated Double-Entry Accounting & Ledger",
      "Micro-Lending, Credit Scoring & KYC Verification",
      "PCI-DSS Level 1 & Bank-Grade Security Standards",
    ],
    techStack: ["TypeScript", "Golang", "Kafka", "PostgreSQL", "Redis Enterprise"],
    deliveryTime: "6 - 10 Weeks",
    sla: "SOC2 & PCI-DSS Ready",
  },
  {
    id: 4,
    title: "Manufacturing",
    icon: "🏭",
    subtitle: "Smart Factory ERP, Supply Chain & Inventory Automation",
    description:
      "Production management, inventory, ERP and factory automation solutions.",
    tags: ["ERP", "Inventory", "Automation"],
    features: [
      "Real-Time Shopfloor Machine Telemetry & IoT",
      "Predictive Maintenance & Machine Health AI",
      "Automated Raw Material & Finished Goods Inventory",
      "Supply Chain Route & Vendor Optimization",
      "Worker Safety Monitoring & Shift Management",
    ],
    techStack: ["IoT Gateways", "Python AI", "React", "TimescaleDB", "Docker"],
    deliveryTime: "5 - 9 Weeks",
    sla: "99.9% Factory Continuity",
  },
  {
    id: 5,
    title: "E-Commerce",
    icon: "🛒",
    subtitle: "Omnichannel Headless Commerce, Checkout & Logistics",
    description:
      "Modern ecommerce platforms with payments, logistics and analytics.",
    tags: ["Payments", "Logistics", "Analytics"],
    features: [
      "Sub-Second Headless Storefront & Checkout",
      "AI-Powered Personalized Product Recommendations",
      "Real-Time Multi-Warehouse Inventory Sync",
      "Multi-Vendor Marketplace Infrastructure",
      "Automated Shipping, Courier & Tracking Webhooks",
    ],
    techStack: ["Next.js 15", "GraphQL", "Node.js", "Stripe API", "Elasticsearch"],
    deliveryTime: "3 - 7 Weeks",
    sla: "High-Volume Black Friday Ready",
  },
  {
    id: 6,
    title: "Hotels & Hospitality",
    icon: "🏨",
    subtitle: "Smart Booking Engine, Guest Management & PMS",
    description:
      "Hotel booking, property management and hospitality software solutions.",
    tags: ["Booking", "Property Management", "Hospitality"],
    features: [
      "Direct Commission-Free Reservation Engine",
      "Contactless Mobile QR Check-In & Room Key",
      "Housekeeping, Maintenance & Room Service Dispatch",
      "Dynamic AI Room Pricing & Yield Management",
      "Two-Way OTA Channel Synchronization (Airbnb, Booking.com)",
    ],
    techStack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Stripe"],
    deliveryTime: "4 - 6 Weeks",
    sla: "99.95% Booking Reliability",
  },
  {
    id: 7,
    title: "Real Estate",
    icon: "🏠",
    subtitle: "Property CRM, Virtual Tours & Smart Asset Management",
    description:
      "Property management, CRM and real estate business automation.",
    tags: ["CRM", "Property", "Automation"],
    features: [
      "Interactive 3D Virtual Tour & Floorplan Viewer",
      "Lead Capture CRM with Automated WhatsApp/Email Bots",
      "Tenant Lease Automation & Digital Rent Escrow",
      "Legal Document Signing & Verification Hub",
      "Neighborhood ROI & Property Valuation AI",
    ],
    techStack: ["Three.js", "React", "Python", "Supabase", "AWS S3"],
    deliveryTime: "3 - 6 Weeks",
    sla: "Zero Lead Leakage",
  },
  {
    id: 8,
    title: "Startups & SaaS",
    icon: "🚀",
    subtitle: "High-Velocity MVP Engineering & SaaS Acceleration",
    description:
      "Scalable SaaS products, MVP development and startup acceleration.",
    tags: ["SaaS", "MVP", "Scalable"],
    features: [
      "Rapid 4-6 Week Prototype-to-Production MVP",
      "Multi-Tenant SaaS Architecture with RBAC",
      "Subscription Billing, Invoicing & Usage Tiers",
      "Comprehensive Funnel & Product Analytics",
      "Clean Investor-Grade Codebase & API Documentation",
    ],
    techStack: ["Next.js", "TailwindCSS", "Node.js", "PostgreSQL", "Docker"],
    deliveryTime: "4 - 6 Weeks",
    sla: "Instant Time-to-Market",
  },
  {
    id: 9,
    title: "Government",
    icon: "🏛",
    subtitle: "Citizen Service Portals & High-Security GovTech",
    description:
      "Citizen service portals and secure government digital solutions.",
    tags: ["Secure", "Portal", "Government"],
    features: [
      "Ultra-Scalable High-Concurrency Citizen Portals",
      "Multi-Factor Biometric & National ID Auth",
      "Secure Digital Certificate & Document Issuance",
      "Automated Public Grievance Redressal & Tracking",
      "Military-Grade Encryption & Air-Gapped Cloud Support",
    ],
    techStack: ["React", "Java / Spring Boot", "PostgreSQL", "Kubernetes", "GovCloud"],
    deliveryTime: "8 - 14 Weeks",
    sla: "Strict ISO / Gov Compliance",
  },
  {
    id: 10,
    title: "Logistics",
    icon: "🚚",
    subtitle: "Fleet Tracking, Warehouse Automation & Route Optimization",
    description:
      "Fleet management, shipment tracking and logistics automation.",
    tags: ["Fleet", "Tracking", "Automation"],
    features: [
      "Real-Time GPS Fleet Telemetry & Geo-Fencing Alerts",
      "AI Dynamic Route Optimization & Fuel Economy",
      "Automated Dispatch & Dedicated Driver Mobile App",
      "Warehouse RFID/Barcode Scanning Automation",
      "Instant Proof-of-Delivery with Digital Signature",
    ],
    techStack: ["React Native", "Golang", "WebSockets", "Mapbox API", "Redis"],
    deliveryTime: "4 - 8 Weeks",
    sla: "Real-Time 50ms Tracking",
  },
  {
    id: 11,
    title: "Restaurant & Food Tech",
    icon: "🍽",
    subtitle: "Smart Cloud POS, Kitchen Display & Online Ordering",
    description:
      "Restaurant POS, online ordering and kitchen management systems.",
    tags: ["POS", "Online Ordering", "Management"],
    features: [
      "Multi-Terminal Cloud Point-of-Sale (POS)",
      "Real-Time Kitchen Display System (KDS) Sync",
      "Contactless QR Code Dine-In & Takeaway Ordering",
      "Dynamic Menu Pricing & Real-Time Recipe Costing",
      "Automated Customer Loyalty & Promo Messaging",
    ],
    techStack: ["React", "Electron", "Node.js", "WebSockets", "MongoDB"],
    deliveryTime: "3 - 5 Weeks",
    sla: "Zero Downtime During Peak Hours",
  },
  {
    id: 12,
    title: "Enterprise",
    icon: "🏢",
    subtitle: "Custom Enterprise ERP, CRM & AI Workflow Automation",
    description:
      "Enterprise software, ERP, CRM and AI-powered business platforms.",
    tags: ["ERP", "CRM", "AI Powered"],
    features: [
      "Unified Enterprise ERP & Cross-Department CRM",
      "AI-Powered Autonomous Document Extraction & OCR",
      "Enterprise Single Sign-On (SSO / SAML / OAuth)",
      "Legacy Database & Cloud Migration Roadmaps",
      "Dedicated 24/7 DevOps, SLA & SRE Infrastructure",
    ],
    techStack: ["Next.js", "Python AI", "Microservices", "Kubernetes", "Apache Kafka"],
    deliveryTime: "8 - 12 Weeks",
    sla: "99.99% Enterprise Uptime SLA",
  },
];

const Industries = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndustry(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-28 transition-colors duration-300"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-[#00D2FF]/05 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#7C3AED]/06 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-[#00D2FF]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Industries We Empower
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-['Outfit']"
          >
            Digital Transformation{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Across Every Industry
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed font-normal"
          >
            We build secure, scalable and AI-powered software solutions for
            businesses across multiple industries, helping them innovate,
            automate and grow faster.
          </motion.p>
        </div>

        {/* Industries Grid */}
        <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.5 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedIndustry(industry)}
              className="
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-2xl
                md:rounded-3xl
                border
                border-slate-800
                bg-[#0b132b]/85
                p-6
                md:p-8
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-[#00D2FF]/60
                hover:shadow-[0_15px_40px_rgba(0,210,255,0.18)]
                hover:bg-[#0f1b3b]/90
              "
            >
              {/* Top ambient hover glow */}
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-bl from-[#00D2FF]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div
                className="
                  relative
                  z-10
                  flex
                  h-16
                  w-16
                  md:h-20
                  md:w-20
                  items-center
                  justify-center
                  rounded-2xl
                  md:rounded-3xl
                  bg-gradient-to-r
                  from-cyan-400
                  via-blue-500
                  to-violet-600
                  text-3xl
                  md:text-4xl
                  transition-all
                  duration-500
                  group-hover:rotate-6
                  group-hover:scale-110
                  shadow-lg
                  shadow-cyan-500/20
                "
              >
                {industry.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 mt-5 md:mt-6 text-xl md:text-2xl font-bold text-white transition-all duration-300 group-hover:text-[#00D2FF] font-['Outfit']">
                {industry.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-3 md:mt-4 text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                {industry.description}
              </p>

              {/* Tags */}
              <div className="relative z-10 mt-4 md:mt-5 flex flex-wrap gap-1.5 md:gap-2">
                {industry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700/80 bg-[#070e1b] px-2.5 py-1 text-[11px] md:text-xs text-slate-300 font-medium transition-all duration-300 group-hover:border-cyan-400 group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Clickable CTA */}
              <div className="relative z-10 mt-5 md:mt-6 flex items-center justify-between border-t border-slate-800 pt-4 md:pt-5">
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-[#00D2FF] group-hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                  <span>Explore Solution</span>
                  <HiSparkles className="text-sm text-[#00D2FF]" />
                </span>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-slate-700 bg-[#060b18] text-slate-300 transition-all duration-300 group-hover:border-cyan-400 group-hover:text-white group-hover:bg-[#00D2FF]/20 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                >
                  <HiArrowRight className="text-sm md:text-base group-hover:translate-x-0.5 transition-transform" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {[
            { value: "12+", label: "Industries Empowered", icon: "🏢" },
            { value: "250+", label: "Systems Deployed", icon: "🚀" },
            { value: "120+", label: "Global Enterprise Clients", icon: "🤝" },
            { value: "99.4%", label: "Client Success Rate", icon: "📈" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 md:p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(0,210,255,0.15)]"
            >
              <div className="text-2xl md:text-3xl mb-1">{item.icon}</div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] bg-clip-text text-transparent font-['Outfit']">
                {item.value}
              </h3>
              <p className="mt-1 text-sm text-slate-300 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20 grid gap-10 md:gap-14 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF]">
              Why Businesses Trust Us
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight font-['Outfit']">
              Technology That{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Delivers Results
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              Every solution is designed with scalability, security and business growth in mind.
              We combine modern technologies with industry expertise to create software that
              delivers measurable value.
            </p>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Enterprise Architecture",
                "AI Powered Automation",
                "Cloud Native Deployment",
                "High Performance Apps",
                "Dedicated Support Team",
                "Future Ready Solutions",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#060b18]/80 p-3 transition-all duration-300 hover:border-cyan-400/50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white text-sm font-bold">
                    ✓
                  </div>
                  <span className="text-sm text-slate-200 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "⚡", label: "Fast Delivery", desc: "4-8 Week Launch" },
              { icon: "☁️", label: "Cloud Native", desc: "AWS / GCP / K8s" },
              { icon: "🤖", label: "AI Powered", desc: "Predictive & Smart" },
              { icon: "💬", label: "24/7 SLA", desc: "Dedicated SRE" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50"
              >
                <div className="text-4xl md:text-5xl">{item.icon}</div>
                <h3 className="mt-3 text-base font-bold text-white">{item.label}</h3>
                <p className="mt-1 text-xs text-slate-400 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 md:mt-16 lg:mt-20 overflow-hidden rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-8 md:p-12 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50"
        >
          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF]">
              Ready To Transform?
            </span>

            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight font-['Outfit']">
              Let&apos;s Build A Digital{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Solution For Your Industry
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed font-normal">
              Our experts are ready to understand your business challenges and build secure,
              scalable and AI-powered software solutions tailored for your industry.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Start Your Project
                <HiArrowRight className="text-lg" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#060b18]/80 px-8 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-400 hover:text-white"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* RICH INTERACTIVE INDUSTRY SOLUTION MODAL                */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedIndustry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndustry(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="
                relative
                z-10
                w-full
                max-w-3xl
                max-h-[90vh]
                overflow-y-auto
                rounded-3xl
                border
                border-white/[0.15]
                bg-[#070e1e]/98
                p-6
                sm:p-8
                md:p-10
                shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_60px_rgba(0,210,255,0.25)]
                backdrop-blur-3xl
                text-left
              "
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndustry(null)}
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

              {/* Header Info */}
              <div className="flex items-start gap-4 sm:gap-5 pr-12">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-violet-600 text-3xl sm:text-4xl shadow-lg shadow-cyan-500/30">
                  {selectedIndustry.icon}
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-bold text-[#00D2FF] mb-2">
                    <HiSparkles className="text-xs" />
                    Specialized Industry Architecture
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                    {selectedIndustry.title} Solutions
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-slate-300 font-medium">
                    {selectedIndustry.subtitle}
                  </p>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                    <HiClock className="text-[#00D2FF]" />
                    Delivery Timeline
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {selectedIndustry.deliveryTime}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                    <HiShieldCheck className="text-emerald-400" />
                    Compliance & SLA
                  </div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400">
                    {selectedIndustry.sla}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                    <HiCpuChip className="text-[#7C3AED]" />
                    AI Integration
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#A78BFA]">
                    Autonomous Core
                  </div>
                </div>
              </div>

              {/* Core Deliverables / Features List */}
              <div className="mt-6">
                <h4 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00D2FF]" />
                  What We Build For {selectedIndustry.title}:
                </h4>
                <div className="space-y-2.5">
                  {selectedIndustry.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] transition-colors hover:border-[#00D2FF]/40"
                    >
                      <HiCheckCircle className="text-[#00D2FF] text-lg shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Recommended Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustry.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-white font-mono shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-8 pt-6 border-t border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400 font-medium text-center sm:text-left">
                  Need a tailored architectural blueprint for {selectedIndustry.title}?
                </p>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedIndustry(null)}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-full border border-white/[0.12] bg-white/[0.04] text-xs sm:text-sm font-semibold text-slate-300 hover:bg-white/[0.08] hover:text-white transition-all"
                  >
                    Close
                  </button>

                  <Link
                    to={`/contact?industry=${encodeURIComponent(selectedIndustry.title)}`}
                    onClick={() => setSelectedIndustry(null)}
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
                    <span>Get {selectedIndustry.title} Proposal</span>
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

export default Industries;