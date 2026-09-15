import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiXMark,
  HiChevronDown,
  HiEnvelope,
  HiPhone,
  HiCalendar,
  HiSparkles,
  HiCommandLine,
  HiDevicePhoneMobile,
  HiCloud,
  HiCpuChip,
  HiBuildingOffice2,
  HiPaintBrush,
  HiCurrencyDollar,
  HiShieldCheck,
  HiUserGroup,
  HiDocumentText,
  HiBriefcase,
  HiArrowRight,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import Logo from "./Logo";
import { useModal } from "@/context/ModalContext";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceCategoriesList = [
  {
    id: "software",
    title: "Software Development (10 Services)",
    path: "/services#software",
    items: [
      { label: "Software Development", path: "/services#software-development" },
      { label: "Custom Software Development", path: "/services#custom-software" },
      { label: "Web Application Development", path: "/services#web-development" },
      { label: "Mobile App Development", path: "/services#mobile-apps" },
      { label: "iOS App Development", path: "/services#ios-app-development" },
      { label: "Android App Development", path: "/services#android-app-development" },
      { label: "Flutter App Development", path: "/services#flutter-app-development" },
      { label: "React Native Development", path: "/services#react-native-development" },
      { label: "Enterprise App Development", path: "/services#enterprise-apps" },
      { label: "App Maintenance & Support", path: "/services#app-maintenance-support" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps (10 Services)",
    path: "/services#cloud",
    items: [
      { label: "Cloud Services", path: "/services#cloud-services" },
      { label: "DevOps Services", path: "/services#devops-services" },
      { label: "Cloud Migration Services", path: "/services#cloud-migration-services" },
      { label: "DevOps Consulting Services", path: "/services#devops-consulting" },
      { label: "Cloud Security Services", path: "/services#cloud-security-services" },
      { label: "Cloud Managed Services", path: "/services#cloud-managed-services" },
      { label: "IoT Development", path: "/services#iot-development" },
      { label: "AWS Cloud Services", path: "/services#aws-cloud-services" },
      { label: "Amazon Web Services Company", path: "/services#amazon-web-services-company" },
      { label: "Kubernetes & Containers", path: "/services#kubernetes-containers" },
    ],
  },
  {
    id: "ai",
    title: "AI & Data Intelligence (8 Services)",
    path: "/services#ai",
    items: [
      { label: "Generative AI Solutions", path: "/services#generative-ai" },
      { label: "Machine Learning Engineering", path: "/services#machine-learning" },
      { label: "Data Science & Analytics", path: "/services#data-science" },
      { label: "Cyber Security Services", path: "/services#cyber-security" },
      { label: "SaaS Development Services", path: "/services#saas-development" },
      { label: "AI Agents & Autonomous Workflows", path: "/services#ai-agents-automation" },
      { label: "RAG & Vector Search Systems", path: "/services#rag-vector-search" },
      { label: "Document AI & Neural OCR", path: "/services#document-ai-ocr" },
    ],
  },
  {
    id: "salesforce",
    title: "Salesforce Solutions (8 Services)",
    path: "/services#salesforce",
    items: [
      { label: "Salesforce Consulting", path: "/services#salesforce-consulting" },
      { label: "Salesforce Implementation", path: "/services#salesforce-implementation" },
      { label: "Lightning Migration & Dev", path: "/services#lightning-migration-dev" },
      { label: "Salesforce Integration", path: "/services#salesforce-integration" },
      { label: "Sales Cloud Solutions", path: "/services#sales-cloud-solutions" },
      { label: "Service Cloud Solutions", path: "/services#service-cloud-solutions" },
      { label: "Salesforce Health & Audit", path: "/services#salesforce-health-audit" },
      { label: "Custom Apex & Flow Automation", path: "/services#custom-apex-flow" },
    ],
  },
  {
    id: "design",
    title: "Design & Experience (6 Services)",
    path: "/services#design",
    items: [
      { label: "UI/UX Design Studio", path: "/services#ui-ux-design-studio" },
      { label: "Mobile App Design", path: "/services#mobile-app-design" },
      { label: "Product Design Services", path: "/services#product-design-services" },
      { label: "UX Research Services", path: "/services#ux-research-services" },
      { label: "Design System Architecture", path: "/services#design-system-development" },
      { label: "Web & Brand Identity", path: "/services#web-brand-identity" },
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing (8 Services)",
    path: "/services#marketing",
    items: [
      { label: "Digital Marketing", path: "/services#digital-marketing" },
      { label: "Search Engine Optimization (SEO)", path: "/services#seo-services" },
      { label: "PPC & Paid Search Advertising", path: "/services#ppc-advertising" },
      { label: "App Store Optimization (ASO)", path: "/services#aso-services" },
      { label: "Social Media Marketing", path: "/services#social-media-marketing" },
      { label: "Conversion Rate Optimization (CRO)", path: "/services#conversion-rate-optimization" },
      { label: "Content Marketing Strategy", path: "/services#content-marketing-services" },
      { label: "Email Marketing & Automation", path: "/services#email-marketing-services" },
    ],
  },
];

const productCategoriesList = [
  {
    id: "on-demand",
    title: "On-Demand & Delivery Apps (8 Apps)",
    emoji: "🍔",
    path: "/products#on-demand",
    items: [
      { label: "Food Delivery App", path: "/products#food-delivery-app" },
      { label: "Grocery Delivery App", path: "/products#grocery-delivery-app" },
      { label: "Milk Delivery App", path: "/products#milk-delivery-app" },
      { label: "Car Wash App", path: "/products#car-wash-app" },
      { label: "Chef Management App", path: "/products#chef-management-app" },
      { label: "Meat & Fish Delivery App", path: "/products#meat-fish-delivery-app" },
      { label: "Courier & Parcel App", path: "/products#courier-parcel-app" },
      { label: "Fuel Delivery App", path: "/products#fuel-delivery-app" },
    ],
  },
  {
    id: "booking-services",
    title: "Booking & Service Platforms (6 Apps)",
    emoji: "📅",
    path: "/products#booking-services",
    items: [
      { label: "Hostel & PG Management App", path: "/products#hostel-pg-management-app" },
      { label: "Doctor Appointment & Clinic App", path: "/products#doctor-appointment-app" },
      { label: "Salon & Spa Booking App", path: "/products#salon-spa-booking-app" },
      { label: "Handyman & Home Services App", path: "/products#handyman-home-services-app" },
      { label: "Car Rental & Taxi Booking App", path: "/products#car-rental-taxi-app" },
      { label: "Tutor & Coaching Booking App", path: "/products#tutor-coaching-booking-app" },
    ],
  },
  {
    id: "ecommerce-marketplace",
    title: "E-Commerce & Marketplace (6 Apps)",
    emoji: "🛒",
    path: "/products#ecommerce-marketplace",
    items: [
      { label: "Multi-Vendor Marketplace Platform", path: "/products#multivendor-marketplace-app" },
      { label: "B2B Wholesale Portal", path: "/products#b2b-wholesale-portal" },
      { label: "B2C Retail Shopping App", path: "/products#b2c-retail-shopping-app" },
      { label: "Hyperlocal Quick Marketplace", path: "/products#hyperlocal-marketplace" },
      { label: "Auction & Bidding Platform", path: "/products#auction-bidding-platform" },
      { label: "Fashion & Apparel Store", path: "/products#fashion-apparel-store" },
    ],
  },
  {
    id: "education-entertainment",
    title: "Education & Entertainment (6 Apps)",
    emoji: "🎬",
    path: "/products#education-entertainment",
    items: [
      { label: "eLearning & LMS Platform", path: "/products#elearning-lms-platform" },
      { label: "OTT Video Streaming Platform", path: "/products#ott-video-streaming-app" },
      { label: "Music & Audio Streaming App", path: "/products#music-audio-streaming-app" },
      { label: "Live Event & Ticket Booking App", path: "/products#event-ticket-booking-app" },
      { label: "Short Video & Reels Platform", path: "/products#short-video-reels-app" },
      { label: "Gaming Community & Esports Hub", path: "/products#gaming-community-portal" },
    ],
  },
  {
    id: "healthcare-wellness",
    title: "Healthcare & Wellness (6 Apps)",
    emoji: "🩺",
    path: "/products#healthcare-wellness",
    items: [
      { label: "Telemedicine & EHR Platform", path: "/products#telemedicine-ehr-app" },
      { label: "Online Pharmacy & Medicine Delivery", path: "/products#online-pharmacy-app" },
      { label: "Fitness & AI Workout Tracker", path: "/products#fitness-workout-tracker-app" },
      { label: "Diagnostic & Lab Test Booking", path: "/products#diagnostic-lab-booking-app" },
      { label: "Mental Health & Therapy App", path: "/products#mental-health-therapy-app" },
      { label: "Elderly Care & Home Nurse Booking", path: "/products#elderly-care-nurse-app" },
    ],
  },
  {
    id: "social-media",
    title: "Social & Media Apps (6 Apps)",
    emoji: "📢",
    path: "/products#social-media",
    items: [
      { label: "Community & Niche Social Network", path: "/products#community-social-network" },
      { label: "Dating & Matchmaking App", path: "/products#dating-matchmaking-app" },
      { label: "Professional Networking Platform", path: "/products#professional-network-app" },
      { label: "Hyperlocal Neighborhood Network", path: "/products#neighborhood-community-app" },
      { label: "Creator Economy & Membership App", path: "/products#creator-economy-app" },
      { label: "Live Audio Drop-In Chatrooms", path: "/products#audio-chatroom-app" },
    ],
  },
];

const resourceCategoriesList = [
  {
    id: "guides-whitepapers",
    title: "Guides & Engineering Blogs (6 Items)",
    emoji: "💡",
    path: "/resources#guides-whitepapers",
    items: [
      { label: "Engineering Insights & Blogs", path: "/insights" },
      { label: "Startup MVP Launchpad Guide", path: "/resources#mvp-startup-guide" },
      { label: "Microservices Scaling Architecture", path: "/resources#microservices-scaling" },
      { label: "Database Caching & Sharding Guide", path: "/resources#database-caching" },
      { label: "LLM Fine-Tuning & RAG Whitepaper", path: "/resources#rag-whitepaper" },
      { label: "Modern Tech Stack Benchmarks", path: "/resources#tech-benchmarks" },
    ],
  },
  {
    id: "interactive-ai-tools",
    title: "Interactive AI Talent Tools (6 Tools)",
    emoji: "🧮",
    path: "/resources#interactive-ai-tools",
    items: [
      { label: "AI Resume Analyzer & Auditor", path: "/resume-analyzer" },
      { label: "ATS Match Score Checker", path: "/ats-score" },
      { label: "AI Resume Builder (Gemini AI)", path: "/resume-builder" },
      { label: "AI Developer Portfolio Builder", path: "/portfolio-builder" },
      { label: "Skill Gap Benchmarker & Roadmap", path: "/skill-gap" },
      { label: "AI Voice & Text Mock Interview", path: "/interview" },
    ],
  },
  {
    id: "budget-calculators",
    title: "Budget & Scope Calculators (6 Tools)",
    emoji: "💰",
    path: "/resources#budget-calculators",
    items: [
      { label: "Project Scope & Cost Estimator", path: "/resources#cost-estimator" },
      { label: "Dedicated Agile Pod Calculator", path: "/resources#team-calculator" },
      { label: "AWS & Cloud Spend Optimizer", path: "/resources#cloud-spend" },
      { label: "MVP Sprint Timeline Predictor", path: "/resources#timeline-predictor" },
      { label: "In-House vs NexoraLab ROI Audit", path: "/resources#roi-audit" },
      { label: "Engagement Model Comparison", path: "/resources#engagement-models" },
    ],
  },
  {
    id: "cloud-iac-blueprints",
    title: "Cloud & IaC Blueprints (6 Blueprints)",
    emoji: "☁️",
    path: "/resources#cloud-iac-blueprints",
    items: [
      { label: "AWS Production Terraform IaC", path: "/resources#cloud-blueprints" },
      { label: "Kubernetes Production Helm Charts", path: "/resources#kubernetes-helm" },
      { label: "Zero-Downtime CI/CD Actions", path: "/resources#cicd-pipeline" },
      { label: "Multi-Stage Dockerfile Library", path: "/resources#docker-library" },
      { label: "Serverless Event Architecture", path: "/resources#serverless-architecture" },
      { label: "PostgreSQL pgvector AI Pipeline", path: "/resources#pgvector-pipeline" },
    ],
  },
  {
    id: "security-compliance",
    title: "Security & Compliance (6 Guides)",
    emoji: "🛡️",
    path: "/resources#security-compliance",
    items: [
      { label: "HIPAA HealthTech Architecture", path: "/resources#security-compliance" },
      { label: "SOC2 Type II Audit Preparation", path: "/resources#soc2-checklist" },
      { label: "PCI-DSS FinTech Payment Matrix", path: "/resources#pci-dss" },
      { label: "OWASP API Security Top 10 Audit", path: "/resources#owasp-security" },
      { label: "Zero-Trust RBAC Security Matrix", path: "/resources#zero-trust" },
      { label: "GDPR Data Privacy & Erasure Guide", path: "/resources#gdpr-guide" },
    ],
  },
  {
    id: "downloads-deck",
    title: "Capabilities & Whitepapers (6 Docs)",
    emoji: "📚",
    path: "/resources#downloads-deck",
    items: [
      { label: "NexoraLab Corporate Deck 2026", path: "/resources#downloads" },
      { label: "Engineering SLA & Delivery Matrix", path: "/resources#engineering-matrix" },
      { label: "Enterprise Cloud Migration Plan", path: "/resources#cloud-migration-doc" },
      { label: "AI Enterprise Adoption Blueprint", path: "/resources#ai-blueprint-doc" },
      { label: "Service Rate Card & Pod Pricing", path: "/resources#rate-card-doc" },
      { label: "Full Case Studies Compendium", path: "/portfolio" },
    ],
  },
];

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { openQuoteModal } = useModal();
  const [openSection, setOpenSection] = useState<string | null>("services");
  const [openSubCat, setOpenSubCat] = useState<string | null>(null);
  const [openProductCat, setOpenProductCat] = useState<string | null>(null);
  const [openResourceCat, setOpenResourceCat] = useState<string | null>(null);

  const toggleSection = (sec: string) => {
    setOpenSection(openSection === sec ? null : sec);
  };

  const toggleSubCat = (catId: string) => {
    setOpenSubCat(openSubCat === catId ? null : catId);
  };

  const toggleProductCat = (catId: string) => {
    setOpenProductCat(openProductCat === catId ? null : catId);
  };

  const toggleResourceCat = (catId: string) => {
    setOpenResourceCat(openResourceCat === catId ? null : catId);
  };

  const handleQuoteClick = () => {
    onClose();
    openQuoteModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#060b18] border-l border-white/10 shadow-2xl p-5 sm:p-6 overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <Logo size="sm" onClick={onClose} />
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
                aria-label="Close menu"
              >
                <HiXMark className="text-xl" />
              </button>
            </div>

            {/* Quick CTAs */}
            <div className="my-4 space-y-2.5">
              <button
                onClick={handleQuoteClick}
                className="w-full rounded-2xl bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-3 text-center text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(0,210,255,0.35)] cursor-pointer"
              >
                Request Project Quote →
              </button>

              <Link
                to="/meeting"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] py-2.5 text-center text-xs font-bold text-slate-200 hover:border-cyan-400 hover:text-white"
              >
                <HiCalendar className="text-cyan-400 text-sm" />
                <span>Book 30-Min Engineering Call</span>
              </Link>
            </div>

            {/* Navigation Links & Accordions */}
            <div className="space-y-2 flex-1">
              {/* 1. Home */}
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] text-xs sm:text-sm font-bold text-white hover:text-[#00D2FF] hover:bg-white/[0.05] transition"
              >
                <span>Home</span>
                <span className="text-[#00D2FF]">→</span>
              </Link>

              {/* 2. Services Accordion */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02]">
                <button
                  onClick={() => toggleSection("services")}
                  className="flex w-full items-center justify-between p-3.5 text-xs sm:text-sm font-bold text-white cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <HiCommandLine className="text-[#00D2FF]" />
                    <span>Services</span>
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                      50 Services
                    </span>
                  </div>
                  <HiChevronDown
                    className={`text-sm transition-transform duration-200 ${
                      openSection === "services" ? "rotate-180 text-[#00D2FF]" : "text-slate-400"
                    }`}
                  />
                </button>
                {openSection === "services" && (
                  <div className="space-y-2 px-3 pb-3 text-xs text-slate-300 border-t border-white/5 pt-2">
                    {serviceCategoriesList.map((cat) => (
                      <div key={cat.id} className="rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden">
                        <div className="flex items-center justify-between p-2.5">
                          <Link
                            to={cat.path}
                            onClick={onClose}
                            className="font-bold text-slate-200 hover:text-[#00D2FF] text-xs transition"
                          >
                            {cat.title}
                          </Link>
                          <button
                            onClick={() => toggleSubCat(cat.id)}
                            className="text-slate-400 hover:text-[#00D2FF] px-2 py-1 cursor-pointer"
                          >
                            <HiChevronDown
                              className={`text-xs transition-transform ${
                                openSubCat === cat.id ? "rotate-180 text-[#00D2FF]" : ""
                              }`}
                            />
                          </button>
                        </div>
                        {openSubCat === cat.id && (
                          <div className="px-3 pb-2.5 pt-1 space-y-1.5 border-t border-white/5 bg-black/20 text-[11px]">
                            {cat.items.map((subItem, sIdx) => (
                              <Link
                                key={sIdx}
                                to={subItem.path}
                                onClick={onClose}
                                className="block py-1 text-slate-400 hover:text-[#00D2FF] transition"
                              >
                                • {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="pt-2">
                      <Link
                        to="/services"
                        onClick={onClose}
                        className="text-[11px] font-bold text-[#00D2FF] block text-center py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
                      >
                        Explore All 50 Services Catalog →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Products Accordion */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02]">
                <button
                  onClick={() => toggleSection("products")}
                  className="flex w-full items-center justify-between p-3.5 text-xs sm:text-sm font-bold text-white cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <HiSparkles className="text-[#00D2FF]" />
                    <span>Products</span>
                    <span className="text-[10px] bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">
                      Turnkey
                    </span>
                  </div>
                  <HiChevronDown
                    className={`text-sm transition-transform duration-200 ${
                      openSection === "products" ? "rotate-180 text-[#00D2FF]" : "text-slate-400"
                    }`}
                  />
                </button>
                {openSection === "products" && (
                  <div className="space-y-2 px-3 pb-3 text-xs text-slate-300 border-t border-white/5 pt-2">
                    {productCategoriesList.map((cat) => (
                      <div key={cat.id} className="rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden">
                        <div className="flex items-center justify-between p-2.5">
                          <Link
                            to={cat.path}
                            onClick={onClose}
                            className="font-bold text-slate-200 hover:text-[#00D2FF] text-xs transition flex items-center gap-1.5"
                          >
                            <span>{cat.emoji}</span>
                            <span>{cat.title}</span>
                          </Link>
                          <button
                            onClick={() => toggleProductCat(cat.id)}
                            className="text-slate-400 hover:text-[#00D2FF] px-2 py-1 cursor-pointer"
                          >
                            <HiChevronDown
                              className={`text-xs transition-transform ${
                                openProductCat === cat.id ? "rotate-180 text-[#00D2FF]" : ""
                              }`}
                            />
                          </button>
                        </div>
                        {openProductCat === cat.id && (
                          <div className="px-3 pb-2.5 pt-1 space-y-1.5 border-t border-white/5 bg-black/20 text-[11px]">
                            {cat.items.map((subItem, sIdx) => (
                              <Link
                                key={sIdx}
                                to={subItem.path}
                                onClick={onClose}
                                className="block py-1 text-slate-400 hover:text-[#00D2FF] transition"
                              >
                                • {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="pt-2">
                      <Link
                        to="/products"
                        onClick={onClose}
                        className="text-[11px] font-bold text-[#00D2FF] block text-center py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
                      >
                        Explore All Turnkey Products Catalog →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Resources Accordion */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02]">
                <button
                  onClick={() => toggleSection("resources")}
                  className="flex w-full items-center justify-between p-3.5 text-xs sm:text-sm font-bold text-white cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <HiDocumentText className="text-[#00D2FF]" />
                    <span>Resources</span>
                  </div>
                  <HiChevronDown
                    className={`text-sm transition-transform duration-200 ${
                      openSection === "resources" ? "rotate-180 text-[#00D2FF]" : "text-slate-400"
                    }`}
                  />
                </button>
                {openSection === "resources" && (
                  <div className="space-y-2 px-3 pb-3 text-xs text-slate-300 border-t border-white/5 pt-2">
                    {resourceCategoriesList.map((cat) => (
                      <div key={cat.id} className="rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden">
                        <div className="flex items-center justify-between p-2.5">
                          <Link
                            to={cat.path}
                            onClick={onClose}
                            className="font-bold text-slate-200 hover:text-[#00D2FF] text-xs transition flex items-center gap-1.5"
                          >
                            <span>{cat.emoji}</span>
                            <span>{cat.title}</span>
                          </Link>
                          <button
                            onClick={() => toggleResourceCat(cat.id)}
                            className="text-slate-400 hover:text-[#00D2FF] px-2 py-1 cursor-pointer"
                          >
                            <HiChevronDown
                              className={`text-xs transition-transform ${
                                openResourceCat === cat.id ? "rotate-180 text-[#00D2FF]" : ""
                              }`}
                            />
                          </button>
                        </div>
                        {openResourceCat === cat.id && (
                          <div className="px-3 pb-2.5 pt-1 space-y-1.5 border-t border-white/5 bg-black/20 text-[11px]">
                            {cat.items.map((subItem, sIdx) => (
                              <Link
                                key={sIdx}
                                to={subItem.path}
                                onClick={onClose}
                                className="block py-1 text-slate-400 hover:text-[#00D2FF] transition"
                              >
                                • {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="pt-2">
                      <Link
                        to="/resources"
                        onClick={onClose}
                        className="text-[11px] font-bold text-[#00D2FF] block text-center py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
                      >
                        Explore All Developer Resources Hub →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Portfolio */}
              <Link
                to="/portfolio"
                onClick={onClose}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] text-xs sm:text-sm font-bold text-white hover:text-[#00D2FF] hover:bg-white/[0.05] transition"
              >
                <span>Portfolio & Case Studies</span>
                <span className="text-[#00D2FF]">→</span>
              </Link>

              {/* 6. Careers */}
              <Link
                to="/careers"
                onClick={onClose}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 text-xs sm:text-sm font-bold text-cyan-300 hover:text-white transition"
              >
                <div className="flex items-center gap-2">
                  <HiBriefcase />
                  <span>Careers & Active Openings</span>
                </div>
                <span className="text-[10px] bg-cyan-400 text-black px-2 py-0.5 rounded-full font-bold">
                  Hiring
                </span>
              </Link>

              {/* 7. Contact */}
              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] text-xs sm:text-sm font-bold text-white hover:text-[#00D2FF] hover:bg-white/[0.05] transition"
              >
                <span>Contact & Global Offices</span>
                <span className="text-[#00D2FF]">→</span>
              </Link>
            </div>

            {/* Bottom Contact Info */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <a
                href="https://wa.me/917079884369?text=Hi%20NexoraLab%20Technologies%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-2.5 text-emerald-400 font-bold"
              >
                <FaWhatsapp className="text-base" />
                <span>Instant WhatsApp Discussion</span>
              </a>

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                <a href="tel:+917079884369" className="hover:text-white">
                  📞 +91 70798 84369
                </a>
                <a href="mailto:nexoralabtechnologies@gmail.com" className="hover:text-white">
                  ✉️ nexoralabtechnologies@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;