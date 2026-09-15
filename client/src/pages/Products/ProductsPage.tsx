import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSparkles,
  HiCheckCircle,
  HiArrowRight,
  HiArrowUpRight,
  HiCpuChip,
  HiDevicePhoneMobile,
  HiComputerDesktop,
  HiBuildingOffice2,
  HiTruck,
  HiShoppingBag,
  HiHeart,
  HiCurrencyDollar,
  HiCommandLine,
  HiShieldCheck,
  HiPaperAirplane,
  HiDocumentText,
  HiMagnifyingGlass,
  HiXMark,
  HiCalendarDays,
  HiAcademicCap,
  HiMegaphone,
  HiRocketLaunch,
} from "react-icons/hi2";
import { FaBrain, FaReact, FaAws, FaDocker, FaPython, FaSalesforce } from "react-icons/fa6";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";
import {
  ecommerceMarketplaceImg,
  telehealthImg,
  logisticsDeliveryImg,
  edtechLmsImg,
  cloudSaasImg,
  aiSolutionsImg,
} from "@/assets/images";

const categoryImageMap: Record<string, string> = {
  "on-demand": logisticsDeliveryImg,
  "booking-services": cloudSaasImg,
  "ecommerce": ecommerceMarketplaceImg,
  "education": edtechLmsImg,
  "healthcare": telehealthImg,
  "social": aiSolutionsImg,
};

export interface ProductItem {
  id: string;
  category: "on-demand" | "booking-services" | "ecommerce" | "education" | "healthcare" | "social";
  categoryLabel: string;
  emoji: string;
  badge: string;
  badgeColor: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  techStack: string[];
  timeline: string;
  demoPath?: string;
}

export const allProducts: ProductItem[] = [
  // 1. On-Demand & Delivery Apps
  {
    id: "food-delivery-app",
    category: "on-demand",
    categoryLabel: "On-Demand & Delivery",
    emoji: "🍔",
    badge: "Turnkey Stack",
    badgeColor: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    title: "Food Delivery & Multi-Restaurant Ordering Platform",
    tagline: "Multi-restaurant catalog, real-time driver tracking & split merchant payouts.",
    desc: "A production-tested food delivery ecosystem with customer ordering apps (iOS/Android), restaurant partner POS consoles, driver navigation apps, and super-admin dispatch heatmaps.",
    features: [
      "Real-time Geofenced Driver Tracking with Sub-Second WebSockets",
      "Dynamic Surge Pricing & Automated Split Merchant Commission",
      "Live Order Statuses with Push & SMS Notification Webhooks",
      "Restaurant Kitchen Display System (KDS) & Menu Modifier Manager",
      "Custom Tip Options, Loyalty Cashback & Multi-Payment Gateways",
    ],
    techStack: ["Flutter", "Node.js", "Redis PubSub", "PostgreSQL", "Google Maps API", "Docker"],
    timeline: "Launch in 3–4 Weeks",
    demoPath: "/quote",
  },
  {
    id: "grocery-delivery-app",
    category: "on-demand",
    categoryLabel: "On-Demand & Delivery",
    emoji: "🥦",
    badge: "Quick Commerce",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    title: "Grocery & 10-Minute Dark Store Delivery Suite",
    tagline: "High-speed SKU catalog, barcode scanning & sub-15min micro-fulfillment routes.",
    desc: "Built for instant hyperlocal grocery delivery with integrated dark store inventory sync, smart shelf picker companion apps, and batch delivery routing algorithms.",
    features: [
      "Multi-Category 50,000+ SKU Catalog with Variant & Fresh Weight Sync",
      "Dark Store Picker Assistant with Barcode Batch Verification",
      "Intelligent Multi-Order Rider Batching & Route Optimization",
      "Scheduled Recurring Slot Delivery & Instant Express Modes",
      "Automated Out-of-Stock Item Replacements & Wallet Refunds",
    ],
    techStack: ["React Native", "FastAPI", "PostgreSQL", "Redis", "AWS S3", "Mapbox"],
    timeline: "Launch in 4 Weeks",
    demoPath: "/quote",
  },
  {
    id: "milk-delivery-app",
    category: "on-demand",
    categoryLabel: "On-Demand & Delivery",
    emoji: "🥛",
    badge: "Subscription Model",
    badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    title: "Daily Milk & Breakfast Subscription Platform",
    tagline: "Recurring morning schedule, wallet auto-recharge & bottle deposit tracking.",
    desc: "Automated subscription engine tailored for daily morning dairy, organic farms, and essentials delivery with pause/resume calendar toggles and route manifest exports.",
    features: [
      "Interactive Subscription Calendar (Daily, Alternate, Custom Days)",
      "Automated Night Cut-Off Order Generation for Morning 6 AM Dispatches",
      "Digital Wallet Auto-Debit with Low Balance SMS & WhatsApp Reminders",
      "Driver Manifest Sheet Generation & Crate/Bottle Deposit Ledger",
      "Single-Click Holiday Pause & Instant Quantity Modification",
    ],
    techStack: ["Flutter", "Golang", "PostgreSQL", "Stripe / Razorpay", "Docker"],
    timeline: "Launch in 3 Weeks",
    demoPath: "/quote",
  },
  {
    id: "car-wash-app",
    category: "on-demand",
    categoryLabel: "On-Demand & Delivery",
    emoji: "🚗",
    badge: "Doorstep Services",
    badgeColor: "text-blue-300 bg-blue-500/10 border-blue-500/30",
    title: "On-Demand Doorstep Car Wash & Detailing App",
    tagline: "Slot booking, vehicle geotagging, package subscriptions & before/after photos.",
    desc: "Connects vehicle owners with mobile detailers. Includes vehicle profile manager, waterless wash scheduling, technician geolocation tracking, and quality inspection checklists.",
    features: [
      "Vehicle Garage Profiles (Make, Model, License Plate & Geotag Slot)",
      "Subscription Wash Packages (Weekly, Bi-Weekly, Monthly Detailing)",
      "Detailer Job Queue with Before & After Proof Photo Uploads",
      "Automated Cleaner Route Assignment Based on Parking Location",
      "Customer In-App Chat, Star Reviews & Digital Invoicing",
    ],
    techStack: ["React Native", "Node.js", "MongoDB", "AWS S3", "Google Maps"],
    timeline: "Launch in 3 Weeks",
    demoPath: "/quote",
  },
  {
    id: "chef-management-app",
    category: "on-demand",
    categoryLabel: "On-Demand & Delivery",
    emoji: "👨‍🍳",
    badge: "Specialty Service",
    badgeColor: "text-orange-300 bg-orange-500/10 border-orange-500/30",
    title: "Personal Chef & Meal Prep Booking Platform",
    tagline: "On-demand verified culinary chef booking, dietary preferences & kitchen prep.",
    desc: "Marketplace connecting gourmet home chefs and event caterers with customers for in-home meal preparations, dinner parties, dietary meal plans, and custom menu planning.",
    features: [
      "Chef Portfolio Showcase with Cuisines, Certifications & Video Samples",
      "Dietary Filtering (Vegan, Keto, Halal, Gluten-Free, Diabetic Care)",
      "Integrated Grocery Checklist & Auto-Cart Dispatch to Delivery APIs",
      "Hourly or Per-Person Event Booking with Calendar Slot Confirmation",
      "Chef Kitchen Hygiene Vetting & Customer Rubric Rating Engine",
    ],
    techStack: ["Flutter", "Next.js", "FastAPI", "PostgreSQL", "Redis"],
    timeline: "Launch in 4 Weeks",
    demoPath: "/quote",
  },

  // 2. Booking & Service Platforms
  {
    id: "hostel-pg-management-app",
    category: "booking-services",
    categoryLabel: "Booking & Services",
    emoji: "🏢",
    badge: "PropTech ERP",
    badgeColor: "text-purple-300 bg-purple-500/10 border-purple-500/30",
    title: "Hostel & Co-Living PG Management ERP",
    tagline: "Room bed allocation, automated monthly rent collections & student biometric gate logs.",
    desc: "Complete property management system for student hostels, PG accommodations, and co-living spaces with digital tenancy agreements, auto-invoicing, and digital complaint ticketing.",
    features: [
      "Visual 3D Floor & Bed Matrix Allocation with Occupancy Analytics",
      "Automated WhatsApp Rent Payment Reminders & UPI Auto-Debit",
      "Student Digital KYC Verification & Document Vault with Aadhaar/ID",
      "Biometric Gate Pass / Digital Outpass Workflow with Parent SMS Alerts",
      "Maintenance Complaint Ticketing with SLA Escalation Tracking",
    ],
    techStack: ["Next.js 16", "Node.js", "PostgreSQL", "Twilio API", "Razorpay / Stripe"],
    timeline: "Launch in 3 Weeks",
    demoPath: "/quote",
  },
  {
    id: "doctor-appointment-app",
    category: "booking-services",
    categoryLabel: "Booking & Services",
    emoji: "🩺",
    badge: "HealthTech Stack",
    badgeColor: "text-rose-300 bg-rose-500/10 border-rose-500/30",
    title: "Doctor Appointment Booking & Clinic Management Suite",
    tagline: "Live OPD token queue, specialist doctor discovery & digital e-prescriptions.",
    desc: "Eliminates clinic waiting room crowds with real-time OPD live token queues, multi-branch doctor schedules, digital consultation notes, and patient history records.",
    features: [
      "Real-Time OPD Live Token Tracking with Estimated Wait Time Alerts",
      "Specialist Search by Symptom, Experience, Fee & Location Radius",
      "Doctor Clinic Console for Instant Digital Prescription Generation",
      "Integrated Diagnostic Lab Report Uploads & Historic Vitals Charts",
      "WhatsApp Appointment Confirmation & Rescheduling Engine",
    ],
    techStack: ["Flutter", "FastAPI", "PostgreSQL", "Redis", "AWS HIPAA Cloud"],
    timeline: "Launch in 4 Weeks",
    demoPath: "/quote",
  },
  {
    id: "salon-spa-booking-app",
    category: "booking-services",
    categoryLabel: "Booking & Services",
    emoji: "💇‍♀️",
    badge: "Beauty & Wellness",
    badgeColor: "text-pink-300 bg-pink-500/10 border-pink-500/30",
    title: "Salon, Spa & Beauty Appointment Booking Platform",
    tagline: "Stylist calendar scheduling, custom service bundles & advance deposits.",
    desc: "Complete salon software offering customers seamless stylist selection and slot booking while providing salon managers with chair allocation and inventory tracking.",
    features: [
      "Individual Stylist Calendar Availability with Service Durations",
      "Visual Service Menu with Add-On Combos and Package Bundles",
      "Advance Deposit Checkout to Eliminate Costly No-Shows",
      "Automated Customer Re-Booking Triggers (e.g. 4-Week Haircut Alert)",
      "Inventory Consumption Tracking per Beauty Service Rendered",
    ],
    techStack: ["React Native", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    timeline: "Launch in 3 Weeks",
    demoPath: "/quote",
  },
  {
    id: "handyman-home-services-app",
    category: "booking-services",
    categoryLabel: "Booking & Services",
    emoji: "🛠️",
    badge: "Home Services",
    badgeColor: "text-yellow-300 bg-yellow-500/10 border-yellow-500/30",
    title: "On-Demand Handyman & Urban Home Services Platform",
    tagline: "Plumbing, electrical, appliance repair & cleaning with background-checked pros.",
    desc: "Urban company style on-demand home maintenance marketplace with dynamic rate cards, job estimation, technician dispatch, and escrow warranty security.",
    features: [
      "Multi-Category Service Catalog (AC Repair, Electrician, Pest Control)",
      "Technician Skill Vetting, ID Background Check & Job Verification",
      "Transparent Fixed & Rate-Card Pricing with Custom Scope Invoicing",
      "In-App Chat, OTP Start/End Verification & 30-Day Service Warranty",
      "Commission Split with Automated Weekly Technician Payouts",
    ],
    techStack: ["Flutter", "Node.js", "MongoDB", "AWS S3", "Google Maps API"],
    timeline: "Launch in 4 Weeks",
    demoPath: "/quote",
  },

  // 3. E-Commerce & Marketplace Solutions
  {
    id: "multivendor-marketplace-app",
    category: "ecommerce",
    categoryLabel: "E-Commerce & Marketplaces",
    emoji: "🛒",
    badge: "Enterprise E-Commerce",
    badgeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/30",
    title: "Multi-Vendor E-Commerce Marketplace ERP Engine",
    tagline: "Independent vendor storefronts, automated split payouts & multi-warehouse inventory.",
    desc: "Scalable marketplace architecture capable of handling millions of SKUs, thousands of concurrent merchant stores, global shipping carrier integration, and tax compliance.",
    features: [
      "Individual Merchant Portals for SKU Ingestion, Pricing & Promotions",
      "Automated Split Payments with Escrow & Vendor Commission Deductions",
      "Global Multi-Carrier Logistics Integration (FedEx, DHL, Shiprocket)",
      "Algorithmic Product Recommendations & Flash Sale Countdown Engine",
      "Multi-Currency, Multi-Language & Regional Tax Calculation (GST/VAT)",
    ],
    techStack: ["Next.js 16", "Golang / Node.js", "PostgreSQL", "Elasticsearch", "Redis", "Kafka"],
    timeline: "Launch in 6 Weeks",
    demoPath: "/quote",
  },
  {
    id: "b2b-wholesale-portal",
    category: "ecommerce",
    categoryLabel: "E-Commerce & Marketplaces",
    emoji: "📦",
    badge: "B2B Wholesale",
    badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    title: "B2B Wholesale & Supplier Commerce Portal",
    tagline: "Tiered bulk pricing, RFQ quote negotiation, trade credit & PO invoicing.",
    desc: "Tailored for manufacturers, distributors, and bulk buyers. Features customer tier pricing, credit limit approvals, digital purchase orders, and MOQ enforcement.",
    features: [
      "Tiered Volume-Based Pricing Matrices & Customer Group Discounts",
      "Digital Request-for-Quote (RFQ) Workflow with Counter-Offer Tools",
      "Trade Credit Accounts with Net-30 / Net-60 Invoicing & Ledger Sync",
      "Minimum Order Quantity (MOQ) Rules & Master Carton Calculations",
      "Direct ERP Integration (SAP, Salesforce, Oracle NetSuite)",
    ],
    techStack: ["React", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS"],
    timeline: "Launch in 5 Weeks",
    demoPath: "/quote",
  },

  // 4. Education & Entertainment
  {
    id: "elearning-lms-platform",
    category: "education",
    categoryLabel: "Education & Entertainment",
    emoji: "🎓",
    badge: "EdTech Suite",
    badgeColor: "text-purple-300 bg-purple-500/10 border-purple-500/30",
    title: "eLearning & Interactive LMS Platform",
    tagline: "DRM-protected video courses, interactive quizzes, live classrooms & certificates.",
    desc: "Complete EdTech platform for universities, coaching institutes, and creators. Includes video player with watermarking, real-time quizzes, grading rubrics, and automated verifiable certificates.",
    features: [
      "Dynamic DRM Video Watermarking to Prevent Screen Recording Leakage",
      "Interactive Chapter Quizzes, Assignments & Auto-Scoring Rubrics",
      "Live Classrooms with WebRTC Screen Sharing & Real-Time Whiteboard",
      "Cryptographically Verifiable PDF Course Completion Certificates",
      "Student Performance Heatmaps & Drop-off Learning Analytics",
    ],
    techStack: ["Next.js 16", "Node.js", "PostgreSQL", "AWS Elemental MediaConvert", "WebRTC"],
    timeline: "Launch in 4–5 Weeks",
    demoPath: "/quote",
  },
  {
    id: "ott-video-streaming-app",
    category: "education",
    categoryLabel: "Education & Entertainment",
    emoji: "🎬",
    badge: "OTT Media Platform",
    badgeColor: "text-red-300 bg-red-500/10 border-red-500/30",
    title: "OTT Video Streaming & Subscription Media Platform",
    tagline: "Adaptive 4K bitrate streaming, Widevine DRM & multi-screen sync.",
    desc: "Production-grade Netflix/Hotstar style streaming platform with HLS multi-bitrate transcoding, Widevine/FairPlay DRM encryption, multi-profile user management, and TV apps.",
    features: [
      "HLS / DASH Adaptive Bitrate Transcoding from 4K down to 360p",
      "Hardware-Level DRM Protection (Google Widevine & Apple FairPlay)",
      "Multi-Profile Family Accounts with Kids Safe Mode & PIN Controls",
      "Continue Watching Resume Timestamp Sync Across Mobile, Web & TV",
      "Tiered Subscription Paywalls (Monthly, Annual, Pay-Per-View)",
    ],
    techStack: ["Flutter (Mobile & Android TV)", "Next.js", "FastAPI", "AWS CloudFront", "PostgreSQL"],
    timeline: "Launch in 6–8 Weeks",
    demoPath: "/quote",
  },

  // 5. Healthcare & Wellness
  {
    id: "telemedicine-ehr-app",
    category: "healthcare",
    categoryLabel: "Healthcare & Wellness",
    emoji: "🩺",
    badge: "HIPAA Compliant",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    title: "Telemedicine & Remote Patient EHR Platform",
    tagline: "Sub-100ms encrypted HD video consultations, digital EHR & automated e-prescriptions.",
    desc: "Secure medical consultation platform compliant with HIPAA regulations. Supports virtual waiting rooms, biometric device data ingestion, and integrated pharmacy order dispatch.",
    features: [
      "Encrypted WebRTC HD Video Appointments with Screen Sharing",
      "HL7 / FHIR Compliant Electronic Health Record (EHR) Data Storage",
      "Digital Prescription Builder with Drug Interaction Warning Check",
      "Remote Patient Monitoring (RPM) Telemetry Ingestion (Apple Health, Fitbit)",
      "Instant Medical Insurance Validation & Co-Pay Payment Flow",
    ],
    techStack: ["React", "WebRTC", "FastAPI", "PostgreSQL", "AWS HIPAA S3", "Redis"],
    timeline: "Launch in 5–6 Weeks",
    demoPath: "/quote",
  },
  {
    id: "online-pharmacy-app",
    category: "healthcare",
    categoryLabel: "Healthcare & Wellness",
    emoji: "💊",
    badge: "Pharma Delivery",
    badgeColor: "text-teal-300 bg-teal-500/10 border-teal-500/30",
    title: "Online Pharmacy & Prescription Medicine Delivery",
    tagline: "AI prescription OCR scanner, licensed pharmacist validation & doorstep dispatch.",
    desc: "Full pharmacy operations platform with smart prescription upload, automated optical character recognition, pharmacist order verification queue, and scheduled monthly medication refills.",
    features: [
      "Neural OCR Prescription Scanner for Instant Drug Name Identification",
      "Licensed Pharmacist Verification Portal with Digital Approval Stamp",
      "Salt / Generic Substitute Recommender with Price Comparison",
      "Chronic Disease Monthly Automatic Medicine Refill Subscriptions",
      "Temperature-Controlled Cold-Chain Delivery Tracking for Insulins",
    ],
    techStack: ["Flutter", "Python FastAPI", "Tesseract OCR", "PostgreSQL", "Docker"],
    timeline: "Launch in 4 Weeks",
    demoPath: "/quote",
  },

  // 6. Social & Media Apps
  {
    id: "community-social-network",
    category: "social",
    categoryLabel: "Social & Media Apps",
    emoji: "📢",
    badge: "Community Engine",
    badgeColor: "text-sky-300 bg-sky-500/10 border-sky-500/30",
    title: "Community & Niche Social Network Platform",
    tagline: "Interest-based groups, threaded discussions, member directories & direct chats.",
    desc: "Customizable social network engine built for brands, creator communities, and professional associations. Features rich media feeds, moderation tools, audio rooms, and monetization.",
    features: [
      "Algorithmic & Chronological Activity Feeds with Polls & Media",
      "Private & Public Sub-Communities with Custom Join Permissions",
      "Real-Time 1-on-1 and Group Direct Messaging with Typing Indicators",
      "AI Automated Toxic Content Moderation & Profanity Filtering",
      "Member Paid Subscriptions, Digital Badges & Creator Tip Jars",
    ],
    techStack: ["React Native", "Node.js", "PostgreSQL", "Socket.io", "AWS S3", "Redis"],
    timeline: "Launch in 4–5 Weeks",
    demoPath: "/quote",
  },
  {
    id: "dating-matchmaking-app",
    category: "social",
    categoryLabel: "Social & Media Apps",
    emoji: "❤️",
    badge: "Matchmaking AI",
    badgeColor: "text-pink-300 bg-pink-500/10 border-pink-500/30",
    title: "Modern Dating & Verified Matchmaking App",
    tagline: "Geolocation match algorithms, verified selfie checks & video icebreakers.",
    desc: "High-engagement dating app featuring swipe mechanics, AI personality compatibility scores, selfie liveness verification to eliminate catfishing, and encrypted in-app audio/video calls.",
    features: [
      "Card Swipe Discovery Stack with Geolocation Distance Filters",
      "AI Facial Liveness Selfie Verification to Prevent Bot Accounts",
      "In-App Audio & Video Calling Without Revealing Phone Numbers",
      "Icebreaker Prompts, Voice Intro Clips & Spotify Music Sync",
      "Premium Tinder-Gold Style Features (Who Liked Me, Boosts, Rewind)",
    ],
    techStack: ["Flutter", "FastAPI", "PostgreSQL", "Redis", "AWS Rekognition", "WebRTC"],
    timeline: "Launch in 4–6 Weeks",
    demoPath: "/quote",
  },
];

const categoryTabs = [
  { id: "all", label: "All Products", emoji: "⚡" },
  { id: "on-demand", label: "On-Demand & Delivery", emoji: "🍔" },
  { id: "booking-services", label: "Booking & Service Platforms", emoji: "📅" },
  { id: "ecommerce", label: "E-Commerce & Marketplaces", emoji: "🛒" },
  { id: "education", label: "Education & Entertainment", emoji: "🎬" },
  { id: "healthcare", label: "Healthcare & Wellness", emoji: "🩺" },
  { id: "social", label: "Social & Media Apps", emoji: "📢" },
];

const ourProductEdgePoints = [
  {
    title: "Scalable & Future-Ready Architecture",
    desc: "Cloud-native microservices engineered to handle millions of transactions with 99.99% uptime SLA.",
  },
  {
    title: "AI-Enabled & Data-Driven Solutions",
    desc: "Integrated machine learning, smart recommendations, predictive demand, and intelligent automation.",
  },
  {
    title: "User-Centric UI/UX Design Excellence",
    desc: "Smooth 60fps micro-animations, conversion-optimized checkout flows, and accessibility compliance.",
  },
  {
    title: "High-Performance & Secure Platforms",
    desc: "End-to-end encryption, SOC2 and HIPAA compliance, PCI-DSS payment gateways, and zero-trust security.",
  },
  {
    title: "Continuous Innovation & Rapid Deployment",
    desc: "Turnkey frameworks ready for customized branding and production deployment in 2 to 4 weeks.",
  },
];

const ProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { openQuoteModal } = useModal();
  const location = useLocation();

  // Scroll to hash on load or hash change
  React.useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location.hash]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesTab = activeTab === "all" || product.category === activeTab;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.desc.toLowerCase().includes(query) ||
        product.features.some((f) => f.toLowerCase().includes(query)) ||
        product.techStack.some((t) => t.toLowerCase().includes(query));

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <>
      <SEO
        title="Turnkey Enterprise Software & Mobile Apps | NexoraLab Technologies"
        description="Explore NexoraLab's ready-to-deploy turnkey software products: On-Demand Delivery Apps, Booking Platforms, Multi-Vendor Marketplaces, Telehealth Suites, eLearning & Social Networks."
        keywords={[
          "turnkey software solutions",
          "ready made mobile app source code",
          "on demand delivery app development",
          "multi vendor ecommerce marketplace script",
          "telemedicine app development",
          "edtech learning management system software",
          "dating app development React Native",
          "taxi booking ride hailing app script",
          "hotel booking management system",
          "enterprise SaaS software products",
          "NexoraLab software products",
        ]}
        canonical="https://nexoralabtechnologies.in/products"
      />

      <div className="relative min-h-screen bg-[#040814] text-white pt-28 sm:pt-36 pb-24 overflow-hidden">
        {/* Glow ambient background circles */}
        <div className="absolute top-20 left-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-20 left-1/3 -z-10 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300 mb-4 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
              <HiSparkles className="text-sm" />
              <span>PRODUCTION-READY TURNKEY PRODUCT ARCHITECTURES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white leading-tight">
              Enterprise Software & AI Platforms{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED]">
                Built For Rapid Scale
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Accelerate your time-to-market with production-hardened full-stack frameworks. Every product includes 100% full IP ownership, source code transfer, dedicated cloud deployment pods, and custom feature engineering.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-10 sm:mt-12 space-y-5">
            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <HiMagnifyingGlass className="text-lg text-[#00D2FF]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by keyword (e.g. food delivery, telemedicine, ERP, Flutter)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#080f22] border border-white/15 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
                >
                  <HiXMark className="text-lg" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categoryTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white shadow-[0_0_20px_rgba(0,210,255,0.4)] scale-105"
                        : "bg-[#080f22] border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40"
                    }`}
                  >
                    <span>{tab.emoji}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-b border-white/10 pb-3 font-mono">
              <span>
                Showing <strong className="text-[#00D2FF] font-bold">{filteredProducts.length}</strong> Turnkey Stacks
              </span>
              <span>100% Full IP Transfer & Source Code</span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredProducts.map((prod) => (
                <motion.div
                  key={prod.id}
                  id={prod.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-white/10 bg-[#080f22] overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,210,255,0.22)] group relative scroll-mt-36"
                >
                  <div>
                    {/* Visual Mockup Banner */}
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900 border-b border-white/10">
                      <img
                        src={categoryImageMap[prod.category] || cloudSaasImg}
                        alt={prod.title}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080f22] via-[#080f22]/40 to-transparent" />
                      <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md ${prod.badgeColor}`}>
                        {prod.badge}
                      </span>
                      <span className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-bold text-white bg-[#080f22]/80 border border-white/10 px-2.5 py-1 rounded-xl backdrop-blur-md">
                        <span className="text-base">{prod.emoji}</span>
                        <span className="text-[11px] text-cyan-300">{prod.categoryLabel}</span>
                      </span>
                    </div>

                    <div className="p-6 sm:p-7 pb-0">
                      <span className="text-[11px] font-bold text-cyan-400 font-mono block mb-1">
                        ID: #{prod.id}
                      </span>

                    <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-['Outfit'] leading-snug">
                      {prod.title}
                    </h2>

                    <p className="text-xs font-semibold text-[#00D2FF] mt-1 font-mono">
                      {prod.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-normal">
                      {prod.desc}
                    </p>

                    {/* Core Features */}
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                        Production Architecture Inclusions:
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {prod.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <HiCheckCircle className="text-[#00D2FF] text-sm shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="mt-5 pt-3 border-t border-white/10">
                      <div className="flex flex-wrap gap-1.5">
                        {prod.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-[10.5px] font-mono text-slate-300 group-hover:border-cyan-500/30 transition"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  </div>

                  {/* Actions & Timeline */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-slate-400">
                      ⏱ <strong>Deployment Timeline:</strong> {prod.timeline}
                    </span>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={openQuoteModal}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-4 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:scale-105 transition cursor-pointer"
                      >
                        <span>Request Demo & Quote</span>
                        <HiArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* OUR PRODUCT EDGE Showcase Section */}
          <div className="mt-20 rounded-3xl border border-white/15 bg-gradient-to-br from-[#093583]/90 via-[#0B3B95]/90 to-[#072464]/90 p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-300">
                WHY GLOBAL ENTERPRISES CHOOSE NEXORALAB
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] mt-1.5">
                Our Product Engineering Edge
              </h3>
              <p className="text-xs sm:text-sm text-cyan-100/90 mt-2 leading-relaxed">
                We don't build throwaway prototypes. Every turnkey application is built on modern modular microservices, CI/CD pipelines, automated testing suites, and dedicated infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ourProductEdgePoints.map((edge, eIdx) => (
                <div
                  key={eIdx}
                  className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300 mb-3.5 border border-cyan-400/30">
                      <HiCheckCircle className="text-xl" />
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {edge.title}
                    </h4>
                    <p className="text-xs text-cyan-100/80 mt-2 leading-relaxed font-normal">
                      {edge.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Final CTA Card */}
              <div className="rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/20 to-blue-600/30 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Need a Custom Product Built From Scratch?</h4>
                  <p className="text-xs text-cyan-100/90 mt-2 leading-relaxed">
                    Have unique enterprise specifications? Our senior architects will design a tailored solution with custom SLAs.
                  </p>
                </div>
                <div className="mt-5 space-y-2">
                  <Link
                    to="/meeting"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#093583] py-2 text-xs font-black hover:bg-cyan-50 transition shadow"
                  >
                    <span>Schedule Tech Discovery Call</span>
                    <HiArrowRight className="text-xs" />
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

export default ProductsPage;
