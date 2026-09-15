import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiChevronDown,
  HiChevronRight,
  HiCheckCircle,
  HiEnvelope,
  HiPhone,
  HiSparkles,
  HiArrowRight,
  HiCommandLine,
  HiComputerDesktop,
  HiDevicePhoneMobile,
  HiCloud,
  HiCpuChip,
  HiBuildingOffice2,
  HiPaintBrush,
  HiCurrencyDollar,
  HiShieldCheck,
  HiCheckBadge,
  HiRocketLaunch,
  HiUserGroup,
  HiDocumentText,
  HiChartBar,
  HiAcademicCap,
  HiChatBubbleLeftRight,
  HiMapPin,
  HiCalendar,
  HiCalendarDays,
  HiShoppingBag,
  HiHeart,
  HiMegaphone,
} from "react-icons/hi2";
import { FaWhatsapp, FaBrain, FaReact, FaAws, FaDocker, FaPython, FaSalesforce } from "react-icons/fa6";
import { useModal } from "@/context/ModalContext";

export interface NavMenuType {
  title: string;
  hasMega: boolean;
  megaType?: "services" | "products" | "resources" | "portfolio";
  path?: string;
  badge?: string;
}

export const navItems: NavMenuType[] = [
  { title: "Home", hasMega: false, path: "/" },
  { title: "Services", hasMega: true, megaType: "services", path: "/services" },
  { title: "Products", hasMega: true, megaType: "products", path: "/products", badge: "Turnkey" },
  { title: "Resources", hasMega: true, megaType: "resources", path: "/resources" },
  { title: "Portfolio", hasMega: false, path: "/portfolio" },
  { title: "Careers", hasMega: false, path: "/careers", badge: "Hiring" },
  { title: "Contact", hasMega: false, path: "/contact" },
];

// 6 Core Service Categories matching reference design
const serviceCategories = [
  {
    id: "software",
    label: "Software Development",
    icon: HiComputerDesktop,
    iconColor: "text-[#00D2FF]",
    description: "Delivering seamless digital experiences with expert software development.",
    header: "SOFTWARE DEVELOPMENT",
    items: [
      {
        id: "software-development",
        title: "Software Development",
        desc: "Delivering seamless digital experiences with expert software development.",
      },
      {
        id: "custom-software",
        title: "Custom Software Development",
        desc: "Tailored solutions built around your business workflows and operations.",
      },
      {
        id: "web-development",
        title: "Web Application Development",
        desc: "High-performance enterprise portals, PWAs and customer dashboards.",
      },
      {
        id: "mobile-apps",
        title: "Mobile App Development",
        desc: "Custom iOS, Android and cross-platform mobile apps with 60fps UX.",
      },
      {
        id: "ios-app-development",
        title: "iOS App Development",
        desc: "Native iPhone & iPad apps with seamless UX and App Store compliance.",
      },
      {
        id: "android-app-development",
        title: "Android App Development",
        desc: "Robust, scalable applications tailored for the Android ecosystem.",
      },
      {
        id: "flutter-app-development",
        title: "Flutter App Development",
        desc: "High-velocity cross-platform apps built from a single codebase.",
      },
      {
        id: "react-native-development",
        title: "React Native Development",
        desc: "Native-grade hybrid mobile apps with rapid release cycles.",
      },
      {
        id: "enterprise-apps",
        title: "Enterprise App Development",
        desc: "Scalable, secure and cloud-native software for complex workflows.",
      },
      {
        id: "app-maintenance-support",
        title: "App Maintenance & Support",
        desc: "Ongoing SLA monitoring, security patching and feature updates.",
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: HiCloud,
    iconColor: "text-cyan-400",
    description: "Scalable cloud infrastructure and CI/CD automation",
    header: "CLOUD SERVICES",
    items: [
      {
        id: "cloud-services",
        title: "Cloud Services",
        desc: "Secure, scalable cloud infrastructure and deployment solutions.",
      },
      {
        id: "devops-services",
        title: "DevOps Services",
        desc: "CI/CD automation, infrastructure as code, and faster release cycles.",
      },
      {
        id: "cloud-migration-services",
        title: "Cloud Migration Services",
        desc: "Seamless migration of applications and data to modern cloud platforms.",
      },
      {
        id: "devops-consulting",
        title: "DevOps Consulting Services",
        desc: "Strategic DevOps advisory to improve performance and scalability.",
      },
      {
        id: "cloud-security-services",
        title: "Cloud Security Services",
        desc: "Advanced cloud security, compliance, and threat protection for your infrastructure.",
      },
      {
        id: "cloud-managed-services",
        title: "Cloud Managed Services",
        desc: "24/7 monitoring, optimization, and ongoing cloud management support.",
      },
      {
        id: "iot-development",
        title: "IoT Development",
        desc: "Custom IoT solutions with device integration, cloud connectivity, and real-time analytics.",
      },
      {
        id: "aws-cloud-services",
        title: "AWS Cloud Services",
        desc: "Scalable cloud solutions on AWS including deployment, migration, DevOps, and secure infrastructure management.",
      },
      {
        id: "amazon-web-services-company",
        title: "Amazon Web Services Company",
        desc: "Trusted AWS consulting and cloud engineering partner delivering cost-optimized, secure AWS architectures.",
      },
      {
        id: "kubernetes-containers",
        title: "Kubernetes & Containers",
        desc: "Production-grade microservices containerization, Helm orchestration, and autoscaling.",
      },
    ],
  },
  {
    id: "ai",
    label: "AI & Data Intelligence",
    icon: FaBrain,
    iconColor: "text-purple-400",
    description: "Enterprise machine learning, GenAI and big data analytics",
    header: "AI & DATA INTELLIGENCE",
    items: [
      {
        id: "generative-ai",
        title: "Generative AI Solutions",
        desc: "Custom LLMs, prompt engineering, fine-tuning, and enterprise AI copilots.",
      },
      {
        id: "machine-learning",
        title: "Machine Learning Engineering",
        desc: "Predictive modeling, computer vision, and NLP pipelines deployed at scale.",
      },
      {
        id: "data-science",
        title: "Data Science & Analytics",
        desc: "Data warehousing, ETL pipelines, Power BI dashboards, and actionable BI insights.",
      },
      {
        id: "cyber-security",
        title: "Cyber Security Services",
        desc: "Threat intelligence, penetration testing, SOC2 compliance, and zero-trust security.",
      },
      {
        id: "saas-development",
        title: "SaaS Development Services",
        desc: "Multi-tenant cloud SaaS platforms with subscription billing and RBAC security.",
      },
      {
        id: "ai-agents-automation",
        title: "AI Agents & Autonomous Workflows",
        desc: "Multi-agent systems, task automation, and intelligent RPA for enterprise processes.",
      },
      {
        id: "rag-vector-search",
        title: "RAG & Vector Search Systems",
        desc: "Production retrieval augmented generation with Milvus, Pinecone, and pgvector.",
      },
      {
        id: "document-ai-ocr",
        title: "Document AI & Neural OCR",
        desc: "Automated invoice, contract, and identity document parsing with 99.4% accuracy.",
      },
    ],
  },
  {
    id: "salesforce",
    label: "Salesforce Solutions",
    icon: FaSalesforce,
    iconColor: "text-sky-400",
    description: "Salesforce CRM implementation, custom Apex and AppExchange apps",
    header: "SALESFORCE SERVICES",
    items: [
      {
        id: "salesforce-consulting",
        title: "Salesforce Consulting",
        desc: "Strategic advisory to align Salesforce capabilities with your business goals.",
      },
      {
        id: "salesforce-implementation",
        title: "Salesforce Implementation",
        desc: "End-to-end setup, custom configuration, data migration, and user onboarding.",
      },
      {
        id: "lightning-migration-dev",
        title: "Lightning Migration & Dev",
        desc: "Upgrade legacy Classic orgs to Lightning Experience with custom LWC components.",
      },
      {
        id: "salesforce-integration",
        title: "Salesforce Integration",
        desc: "Seamlessly connect Salesforce with ERP, payment gateways, and custom backend APIs.",
      },
      {
        id: "sales-cloud-solutions",
        title: "Sales Cloud Solutions",
        desc: "Automate lead management, opportunity pipelines, forecasting, and quote-to-cash.",
      },
      {
        id: "service-cloud-solutions",
        title: "Service Cloud Solutions",
        desc: "Omnichannel customer support, AI-powered chatbots, SLA tracking, and self-service portals.",
      },
      {
        id: "salesforce-health-audit",
        title: "Salesforce Health & Audit",
        desc: "Security reviews, code optimization, storage cleanup, and technical debt elimination.",
      },
      {
        id: "custom-apex-flow",
        title: "Custom Apex & Flow Automation",
        desc: "Complex trigger logic, batch jobs, and visual workflows for tailored operations.",
      },
    ],
  },
  {
    id: "design",
    label: "Design & Experience",
    icon: HiPaintBrush,
    iconColor: "text-pink-400",
    description: "UI/UX design studio crafting conversion-focused experiences",
    header: "DESIGN & EXPERIENCE",
    items: [
      {
        id: "ui-ux-design-studio",
        title: "UI/UX Design Studio",
        desc: "User-centered interfaces that enhance usability and drive high conversions.",
      },
      {
        id: "mobile-app-design",
        title: "Mobile App Design",
        desc: "Engaging mobile app experiences built for performance and visual clarity.",
      },
      {
        id: "product-design-services",
        title: "Product Design Services",
        desc: "End-to-end digital product design from concept to scalable solutions.",
      },
      {
        id: "ux-research-services",
        title: "UX Research Services",
        desc: "Responsive, conversion-focused digital designs tailored to your brand.",
      },
      {
        id: "design-system-development",
        title: "Design System Architecture",
        desc: "Consistent, scalable UI design tokens and component libraries for rapid dev.",
      },
      {
        id: "web-brand-identity",
        title: "Web & Brand Identity",
        desc: "Modern digital branding with interactive micro-animations and styleguides.",
      },
    ],
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    icon: HiChartBar,
    iconColor: "text-emerald-400",
    description: "SEO, PPC and social media strategies that grow revenue",
    header: "DIGITAL MARKETING SOLUTIONS",
    items: [
      {
        id: "digital-marketing",
        title: "Digital Marketing",
        desc: "Full-funnel digital marketing strategies to grow your brand and revenue.",
      },
      {
        id: "seo-services",
        title: "Search Engine Optimization (SEO)",
        desc: "Rank higher on Google and drive qualified organic search traffic.",
      },
      {
        id: "ppc-advertising",
        title: "PPC & Paid Search Advertising",
        desc: "Targeted paid campaigns on Google and LinkedIn with measurable high ROAS.",
      },
      {
        id: "aso-services",
        title: "App Store Optimization (ASO)",
        desc: "Boost app store visibility, keyword ranking, and organic install downloads.",
      },
      {
        id: "social-media-marketing",
        title: "Social Media Marketing",
        desc: "Grow your brand reach and audience engagement across major social platforms.",
      },
      {
        id: "conversion-rate-optimization",
        title: "Conversion Rate Optimization (CRO)",
        desc: "Turn more visitors into paying customers with data-driven CRO testing.",
      },
      {
        id: "content-marketing-services",
        title: "Content Marketing Strategy",
        desc: "SEO-driven content architecture that drives continuous organic inbound leads.",
      },
      {
        id: "email-marketing-services",
        title: "Email Marketing & Automation",
        desc: "Targeted lifecycle email campaigns that nurture leads and boost retention.",
      },
    ],
  },
];

const whyNexoraLabPoints = [
  "Client-Centric, Result-Driven Approach",
  "End-to-End IT & Digital Transformation Solutions",
  "Efficient Development with Speed & Quality",
  "Dedicated In-House Expert Team",
  "Proven Track Record Across 20+ Industries",
];

// 6 Core Product Categories matching reference image
export const productCategories = [
  {
    id: "on-demand",
    label: "On-Demand & Delivery Apps",
    emoji: "🍔",
    description: "Transforming everyday services into on-demand success stories.",
    header: "ON-DEMAND & DELIVERY APPS",
    items: [
      {
        id: "food-delivery-app",
        title: "Food Delivery App",
        desc: "Multi-restaurant ordering with real-time tracking, live driver GPS, and split payouts.",
      },
      {
        id: "grocery-delivery-app",
        title: "Grocery Delivery App",
        desc: "Quick commerce for daily essentials with barcode catalog and sub-15min delivery routing.",
      },
      {
        id: "milk-delivery-app",
        title: "Milk Delivery App",
        desc: "Subscription-based daily recurring deliveries, bottle deposit, and automated calendar billing.",
      },
      {
        id: "car-wash-app",
        title: "Car Wash App",
        desc: "On-demand doorstep vehicle care, slot booking, package subscriptions, and geotag tracking.",
      },
      {
        id: "chef-management-app",
        title: "Chef Management App",
        desc: "On-demand personal chef booking, kitchen meal prep scheduling, and recipe inventory platform.",
      },
      {
        id: "meat-fish-delivery-app",
        title: "Meat & Fish Delivery App",
        desc: "Fresh cold-chain meat, farm seafood, customized cuts, and temperature-controlled logistics.",
      },
      {
        id: "courier-parcel-app",
        title: "Courier & Parcel Delivery App",
        desc: "Intra-city hyper-local dispatch, multi-drop package tracking, and instant digital proof of delivery.",
      },
      {
        id: "fuel-delivery-app",
        title: "Fuel Delivery App",
        desc: "On-demand doorstep fuel refilling logistics, corporate fleet accounts, and certified IoT flow meters.",
      },
    ],
  },
  {
    id: "booking-services",
    label: "Booking and Service Platforms",
    emoji: "📅",
    description: "Seamless scheduling and appointment management apps",
    header: "BOOKING AND SERVICE PLATFORMS",
    items: [
      {
        id: "hostel-pg-management-app",
        title: "Hostel & PG Management App",
        desc: "Room allocation, monthly rent collection, biometric gate pass, and student KYC management.",
      },
      {
        id: "doctor-appointment-app",
        title: "Doctor Appointment & Clinic App",
        desc: "Instant specialist doctor booking, real-time token queue, and digital e-prescriptions.",
      },
      {
        id: "salon-spa-booking-app",
        title: "Salon & Spa Booking App",
        desc: "Stylist calendar scheduling, custom service packages, and digital advance payments.",
      },
      {
        id: "handyman-home-services-app",
        title: "Handyman & Home Services App",
        desc: "Plumbing, electrical, cleaning, and appliance repair booking with certified technician vetting.",
      },
      {
        id: "car-rental-taxi-app",
        title: "Car Rental & Taxi Booking App",
        desc: "GPS-enabled fleet booking, driver surge routing, digital taximeter, and airport rentals.",
      },
      {
        id: "tutor-coaching-booking-app",
        title: "Tutor & Coaching Booking App",
        desc: "1-on-1 verified tutor discovery, subject scheduling, whiteboard sessions, and student progress.",
      },
    ],
  },
  {
    id: "ecommerce-marketplace",
    label: "E-Commerce & Marketplace Solutions",
    emoji: "🛒",
    description: "Multi-vendor stores and online shopping platforms",
    header: "E-COMMERCE & MARKETPLACE SOLUTIONS",
    items: [
      {
        id: "multivendor-marketplace-app",
        title: "Multi-Vendor Marketplace Platform",
        desc: "Independent merchant storefronts, automated split payouts, inventory sync, and global shipping.",
      },
      {
        id: "b2b-wholesale-portal",
        title: "B2B Wholesale Portal",
        desc: "Tiered bulk order pricing, credit terms, quote RFQ negotiation, and GST/VAT tax compliance.",
      },
      {
        id: "b2c-retail-shopping-app",
        title: "B2C Retail Shopping App",
        desc: "Personalized AI product recommendations, 1-click checkout, AR product preview, and push alerts.",
      },
      {
        id: "hyperlocal-marketplace",
        title: "Hyperlocal Quick Marketplace",
        desc: "Neighborhood seller aggregation, local inventory routing, and sub-30min delivery fulfillment.",
      },
      {
        id: "auction-bidding-platform",
        title: "Auction & Bidding Platform",
        desc: "Real-time websocket bidding, countdown timers, escrow payment security, and lot tracking.",
      },
      {
        id: "fashion-apparel-store",
        title: "Fashion & Apparel Store",
        desc: "AI size fit recommenders, lookbooks, seasonal collections, and streamlined return management.",
      },
    ],
  },
  {
    id: "education-entertainment",
    label: "Education & Entertainment",
    emoji: "🎬",
    description: "eLearning platforms and interactive media solutions",
    header: "EDUCATION & ENTERTAINMENT",
    items: [
      {
        id: "elearning-lms-platform",
        title: "eLearning & LMS Platform",
        desc: "Structured video courses, interactive quizzes, live streaming classes, and verifiable certificates.",
      },
      {
        id: "ott-video-streaming-app",
        title: "OTT Video Streaming Platform",
        desc: "Adaptive 4K bitrate streaming, DRM protection, subscription paywalls, and offline downloads.",
      },
      {
        id: "music-audio-streaming-app",
        title: "Music & Audio Streaming App",
        desc: "Lossless audio streaming, collaborative playlists, lyrics sync, and artist monetization.",
      },
      {
        id: "event-ticket-booking-app",
        title: "Live Event & Ticket Booking App",
        desc: "Interactive 3D seat selection, dynamic QR entry validation, and event organizer analytics.",
      },
      {
        id: "short-video-reels-app",
        title: "Short Video & Reels Platform",
        desc: "AI video feed algorithm, camera filters, audio remixing, and creator tip monetization.",
      },
      {
        id: "gaming-community-portal",
        title: "Gaming Community & Esports Hub",
        desc: "Automated tournament brackets, live Twitch/YouTube embeds, squad matchmaking, and leaderboards.",
      },
    ],
  },
  {
    id: "healthcare-wellness",
    label: "Healthcare & Wellness",
    emoji: "🩺",
    description: "Patient management and telemedicine applications",
    header: "HEALTHCARE & WELLNESS",
    items: [
      {
        id: "telemedicine-ehr-app",
        title: "Telemedicine & EHR Platform",
        desc: "HIPAA-compliant HD video consultations, digital health records, and automated e-prescriptions.",
      },
      {
        id: "online-pharmacy-app",
        title: "Online Pharmacy & Medicine Delivery",
        desc: "AI prescription OCR scanner, licensed pharmacist validation, and scheduled refill orders.",
      },
      {
        id: "fitness-workout-tracker-app",
        title: "Fitness & AI Workout Tracker",
        desc: "Personalized AI training routines, calorie & macronutrient tracker, and smartwatch IoT sync.",
      },
      {
        id: "diagnostic-lab-booking-app",
        title: "Diagnostic & Lab Test Booking",
        desc: "Home phlebotomist sample collection dispatch, digital PDF report delivery, and doctor sync.",
      },
      {
        id: "mental-health-therapy-app",
        title: "Mental Health & Therapy App",
        desc: "End-to-end encrypted therapist chat, mood trackers, guided CBT journaling, and SOS lines.",
      },
      {
        id: "elderly-care-nurse-app",
        title: "Elderly Care & Home Nurse Booking",
        desc: "Verified caregiver shifts, medication reminders, emergency SOS alerts, and family dashboards.",
      },
    ],
  },
  {
    id: "social-media",
    label: "Social & Media Apps",
    emoji: "📢",
    description: "Community building and content sharing platforms",
    header: "SOCIAL & MEDIA APPS",
    items: [
      {
        id: "community-social-network",
        title: "Community & Niche Social Network",
        desc: "Special interest forums, threaded discussions, member directories, and direct messaging.",
      },
      {
        id: "dating-matchmaking-app",
        title: "Dating & Matchmaking App",
        desc: "Geolocation-based matching algorithms, verified profile checks, and in-app video icebreakers.",
      },
      {
        id: "professional-network-app",
        title: "Professional Networking Platform",
        desc: "Industry portfolios, verified career credentials, peer endorsement, and recruiter messaging.",
      },
      {
        id: "neighborhood-community-app",
        title: "Hyperlocal Neighborhood Network",
        desc: "Local noticeboards, verified resident checks, buy-sell classifieds, and incident alerts.",
      },
      {
        id: "creator-economy-app",
        title: "Creator Economy & Membership App",
        desc: "Tiered subscription feeds, exclusive member live streams, direct tips, and digital merch.",
      },
      {
        id: "audio-chatroom-app",
        title: "Live Audio Drop-In Chatrooms",
        desc: "Low-latency voice rooms, moderator stage management, audience hand-raise, and live chat.",
      },
    ],
  },
];

const ourProductEdgePoints = [
  "Scalable & Future-Ready Architecture",
  "AI-Enabled & Data-Driven Solutions",
  "User-Centric UI/UX Design Excellence",
  "High-Performance & Secure Platforms",
  "Continuous Innovation & Product Optimization",
];

// 6 Core Resource Categories matching reference 3-column design
export const resourceCategories = [
  {
    id: "guides-whitepapers",
    label: "Guides & Engineering Blogs",
    emoji: "💡",
    description: "Deep-dives into scalable cloud systems, AI fine-tuning & architecture",
    header: "GUIDES & ENGINEERING WHITE PAPERS",
    items: [
      {
        id: "engineering-blogs",
        title: "Engineering Insights & Blogs",
        desc: "Deep-dive technical architectures, GenAI engineering, and modern microservices.",
        path: "/insights",
      },
      {
        id: "mvp-startup-guide",
        title: "Startup MVP Launchpad Guide",
        desc: "Step-by-step roadmap to build, test, and ship scalable digital products in 30 days.",
        path: "/resources#mvp-startup-guide",
      },
      {
        id: "microservices-scaling-checklist",
        title: "Microservices Scaling Architecture",
        desc: "Monolith-to-microservices migration patterns, Kubernetes Helm, and API gateways.",
        path: "/resources#microservices-scaling",
      },
      {
        id: "database-sharding-caching",
        title: "Database Caching & Sharding Guide",
        desc: "Redis multi-layer caching, PostgreSQL partition strategies, and zero downtime.",
        path: "/resources#database-caching",
      },
      {
        id: "ai-fine-tuning-guide",
        title: "LLM Fine-Tuning & RAG Whitepaper",
        desc: "Enterprise retrieval augmented generation with pgvector, Milvus, and prompt caching.",
        path: "/resources#rag-whitepaper",
      },
      {
        id: "fullstack-benchmarks-2026",
        title: "Modern Tech Stack Benchmarks",
        desc: "React 19 vs Next.js vs Flutter performance, latency, and operational cost breakdown.",
        path: "/resources#tech-benchmarks",
      },
    ],
  },
  {
    id: "interactive-ai-tools",
    label: "Interactive AI Talent Tools",
    emoji: "🧮",
    description: "Proprietary ATS resume parsing, career roadmap & score checkers",
    header: "INTERACTIVE AI TALENT & TECH UTILITIES",
    items: [
      {
        id: "resume-analyzer",
        title: "AI Resume Analyzer & Auditor",
        desc: "Sub-15ms parsing, keyword density audit, action verb scoring, and bullet rewrites.",
        path: "/resume-analyzer",
      },
      {
        id: "ats-score",
        title: "ATS Match Score Checker",
        desc: "Instant job description vs resume keyword matching with missing skill alerts.",
        path: "/ats-score",
      },
      {
        id: "resume-builder",
        title: "AI Resume Builder (Gemini AI)",
        desc: "Interactive resume generator with Gemini AI-powered executive phrasing.",
        path: "/resume-builder",
      },
      {
        id: "portfolio-builder",
        title: "AI Developer Portfolio Builder",
        desc: "Instant portfolio builder with live project preview and responsive templates.",
        path: "/portfolio-builder",
      },
      {
        id: "skill-gap",
        title: "Skill Gap Benchmarker & Roadmap",
        desc: "Dynamic radar skill gap audit with quarterly tech upgrade learning milestones.",
        path: "/skill-gap",
      },
      {
        id: "interview",
        title: "AI Voice & Text Mock Interview",
        desc: "Simulated technical voice & coding interviews with rubric scoring and feedback.",
        path: "/interview",
      },
    ],
  },
  {
    id: "budget-calculators",
    label: "Budget & Scope Calculators",
    emoji: "💰",
    description: "Calculate development budgets, sprint timelines & team allocations",
    header: "PROJECT SCOPE & COST ESTIMATORS",
    items: [
      {
        id: "cost-estimator",
        title: "Project Scope & Cost Estimator",
        desc: "Calculate engineering timelines, sprint allocations, and turnkey cost estimates.",
        path: "/resources#cost-estimator",
      },
      {
        id: "dedicated-team-calculator",
        title: "Dedicated Agile Pod Calculator",
        desc: "Estimate monthly budget for full-stack squads (Frontend, Backend, QA & PM).",
        path: "/resources#team-calculator",
      },
      {
        id: "cloud-spend-estimator",
        title: "AWS & Cloud Spend Optimizer",
        desc: "Compute savings on AWS/GCP serverless vs containerized Kubernetes clusters.",
        path: "/resources#cloud-spend",
      },
      {
        id: "mvp-timeline-predictor",
        title: "MVP Sprint Timeline Predictor",
        desc: "Feature complexity calculator providing exact delivery Gantt milestones.",
        path: "/resources#timeline-predictor",
      },
      {
        id: "hiring-vs-agency-roi",
        title: "In-House vs NexoraLab ROI Audit",
        desc: "Compare recruitment overhead, tool licensing, and agile pod cost efficiency.",
        path: "/resources#roi-audit",
      },
      {
        id: "hourly-vs-fixed-guide",
        title: "Engagement Model Comparison",
        desc: "Fixed price vs Time & Material vs Dedicated Monthly Retainer comparison guide.",
        path: "/resources#engagement-models",
      },
    ],
  },
  {
    id: "cloud-iac-blueprints",
    label: "Cloud & IaC Blueprints",
    emoji: "☁️",
    description: "Production Terraform scripts, Kubernetes Helm & CI/CD templates",
    header: "CLOUD ARCHITECTURE & IAC BLUEPRINTS",
    items: [
      {
        id: "aws-terraform-blueprint",
        title: "AWS Production Terraform IaC",
        desc: "Modular VPC, EKS, RDS Multi-AZ, and CloudFront infrastructure as code scripts.",
        path: "/resources#cloud-blueprints",
      },
      {
        id: "kubernetes-helm-charts",
        title: "Kubernetes Production Helm Charts",
        desc: "Auto-scaling HPA, Ingress Nginx, cert-manager, and Prometheus monitoring charts.",
        path: "/resources#kubernetes-helm",
      },
      {
        id: "cicd-github-actions",
        title: "Zero-Downtime CI/CD Actions",
        desc: "GitHub Actions workflow for automated test suites, Docker build, and blue/green deploys.",
        path: "/resources#cicd-pipeline",
      },
      {
        id: "docker-microservices-template",
        title: "Multi-Stage Dockerfile Library",
        desc: "Ultra-lean production Dockerfiles for Node.js, FastAPI, Go, and Flutter web.",
        path: "/resources#docker-library",
      },
      {
        id: "serverless-lambda-template",
        title: "Serverless Event Architecture",
        desc: "AWS Lambda, SQS, EventBridge, and DynamoDB event-driven blueprints.",
        path: "/resources#serverless-architecture",
      },
      {
        id: "pgvector-rag-stack",
        title: "PostgreSQL pgvector AI Pipeline",
        desc: "Database schema, embedding generation, and hybrid BM25 + vector search queries.",
        path: "/resources#pgvector-pipeline",
      },
    ],
  },
  {
    id: "security-compliance",
    label: "Security & Compliance",
    emoji: "🛡️",
    description: "SOC2, HIPAA, GDPR & ISO27001 readiness checklists",
    header: "ENTERPRISE SECURITY & COMPLIANCE",
    items: [
      {
        id: "hipaa-compliance-guide",
        title: "HIPAA HealthTech Architecture",
        desc: "End-to-end data encryption at rest and in transit, BAA agreements, and audit logging.",
        path: "/resources#security-compliance",
      },
      {
        id: "soc2-readiness-checklist",
        title: "SOC2 Type II Audit Preparation",
        desc: "Access control RBAC, vulnerability scanning, and incident response runbooks.",
        path: "/resources#soc2-checklist",
      },
      {
        id: "pci-dss-fintech-matrix",
        title: "PCI-DSS FinTech Payment Matrix",
        desc: "Tokenization, payment gateway isolation, and secure ledger compliance rules.",
        path: "/resources#pci-dss",
      },
      {
        id: "owasp-top10-audit",
        title: "OWASP API Security Top 10 Audit",
        desc: "Rate limiting, JWT authentication, SQL injection, and CORS hardening guide.",
        path: "/resources#owasp-security",
      },
      {
        id: "zero-trust-rbac-matrix",
        title: "Zero-Trust RBAC Security Matrix",
        desc: "Granular role-based permissions, OAuth2.0 / OIDC, and multi-factor auth.",
        path: "/resources#zero-trust",
      },
      {
        id: "gdpr-data-privacy-guide",
        title: "GDPR Data Privacy & Erasure Guide",
        desc: "User consent managers, right to be forgotten APIs, and cookie policy compliance.",
        path: "/resources#gdpr-guide",
      },
    ],
  },
  {
    id: "downloads-deck",
    label: "Capabilities & Whitepapers",
    emoji: "📚",
    description: "Official corporate capabilities, tech stack matrices & PDF brochures",
    header: "CAPABILITIES & OFFICIAL WHITEPAPERS",
    items: [
      {
        id: "corporate-deck-download",
        title: "NexoraLab Corporate Deck 2026",
        desc: "Official corporate capabilities brochure, service matrices, and delivery methodology.",
        path: "/resources#downloads",
      },
      {
        id: "fullstack-engineering-matrix",
        title: "Engineering SLA & Delivery Matrix",
        desc: "Sprint delivery cadence, code review benchmarks, QA coverage, and security policies.",
        path: "/resources#engineering-matrix",
      },
      {
        id: "cloud-migration-whitepaper",
        title: "Enterprise Cloud Migration Plan",
        desc: "6-step zero-downtime database and server migration framework with rollback plans.",
        path: "/resources#cloud-migration-doc",
      },
      {
        id: "ai-enterprise-transformation",
        title: "AI Enterprise Adoption Blueprint",
        desc: "Strategic framework to integrate GenAI copilots into internal legacy software workflows.",
        path: "/resources#ai-blueprint-doc",
      },
      {
        id: "rate-card-service-guide",
        title: "Service Rate Card & Pod Pricing",
        desc: "Detailed hourly, sprint, and monthly dedicated engineer cost breakdowns.",
        path: "/resources#rate-card-doc",
      },
      {
        id: "case-studies-compendium",
        title: "Full Case Studies Compendium",
        desc: "Comprehensive architecture diagrams, metrics, and business outcomes across 20+ clients.",
        path: "/portfolio",
      },
    ],
  },
];

const ourResourceEdgePoints = [
  "Production-Grade Reference Architectures",
  "Real-Time AI Intelligence & Free Tooling",
  "Open Source Engineering Boilerplates",
  "Strict Security & Compliance Checklists",
  "Direct Principal Architect Advisory",
];

const MegaMenu: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState<string>("cloud");
  const [activeProductTab, setActiveProductTab] = useState<string>("on-demand");
  const [activeResourceTab, setActiveResourceTab] = useState<string>("guides-whitepapers");
  const { openQuoteModal } = useModal();

  const handleMouseEnter = (menuTitle: string) => {
    setActiveDropdown(menuTitle);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const currentCategory =
    serviceCategories.find((s) => s.id === activeServiceTab) || serviceCategories[0];

  const currentProductCategory =
    productCategories.find((p) => p.id === activeProductTab) || productCategories[0];

  const currentResourceCategory =
    resourceCategories.find((r) => r.id === activeResourceTab) || resourceCategories[0];

  return (
    <div className="relative flex items-center gap-0.5 2xl:gap-1" onMouseLeave={handleMouseLeave}>
      {navItems.map((item) => (
        <div
          key={item.title}
          className="relative py-2 shrink-0"
          onMouseEnter={() => {
            if (item.hasMega) {
              handleMouseEnter(item.title);
            } else {
              setActiveDropdown(null);
            }
          }}
        >
          <Link
            to={item.path || "/"}
            className={`inline-flex items-center gap-1.5 px-2.5 2xl:px-3 py-1.5 text-[12px] 2xl:text-[13px] font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
              activeDropdown === item.title
                ? "bg-white/10 text-[#00D2FF] shadow-sm"
                : "text-slate-200 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="whitespace-nowrap">{item.title}</span>

            {item.badge && (
              <span className="rounded-full bg-gradient-to-r from-[#00D2FF]/20 to-[#7C3AED]/20 border border-cyan-500/30 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300 leading-none whitespace-nowrap shrink-0">
                {item.badge}
              </span>
            )}

            {item.hasMega && (
              <HiChevronDown
                className={`text-xs shrink-0 transition-transform duration-200 ${
                  activeDropdown === item.title ? "rotate-180 text-[#00D2FF]" : "text-slate-400"
                }`}
              />
            )}
          </Link>
        </div>
      ))}

      {/* Global Mega Dropdown Container */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[52px] left-1/2 -translate-x-1/2 w-[98vw] max-w-[1320px] z-[9999] rounded-3xl border border-white/20 bg-[#060c1c] shadow-[0_35px_90px_rgba(0,0,0,0.99),0_0_40px_rgba(0,210,255,0.15)] overflow-hidden"
          >
            {/* Top Light Accent */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent" />

            {/* ==================== 1. SERVICES MEGA MENU ==================== */}
            {activeDropdown === "Services" && (
              <div className="p-0">
                <div className="flex flex-col lg:flex-row min-h-[460px]">
                  {/* Left Column: 6 Category Items */}
                  <div className="w-full lg:w-[320px] 2xl:w-[340px] shrink-0 border-r border-white/10 p-5 sm:p-6 bg-[#040814]">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-xs font-black uppercase tracking-wider text-[#00D2FF]">
                        SERVICES
                      </span>
                      <Link
                        to="/services"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[11px] font-bold text-slate-400 hover:text-[#00D2FF] transition"
                      >
                        View All →
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {serviceCategories.map((cat) => {
                        const CatIcon = cat.icon;
                        const isSelected = activeServiceTab === cat.id;
                        return (
                          <Link
                            key={cat.id}
                            to={`/services#${cat.id}`}
                            onMouseEnter={() => setActiveServiceTab(cat.id)}
                            onClick={() => setActiveDropdown(null)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2.5 cursor-pointer border ${
                              isSelected
                                ? "bg-[#0c1a36] border-cyan-400/60 text-white shadow-[0_0_20px_rgba(0,210,255,0.2)]"
                                : "border-transparent bg-white/[0.02] text-slate-300 hover:bg-[#0a152c] hover:text-white"
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-base mt-0.5 ${
                                  isSelected
                                    ? "bg-[#00D2FF]/20 border-cyan-400 text-[#00D2FF]"
                                    : "bg-white/5 border-white/10 text-slate-400"
                                }`}
                              >
                                <CatIcon />
                              </div>
                              <div className="min-w-0">
                                <div
                                  className={`font-bold leading-tight truncate ${
                                    isSelected ? "text-white" : "text-slate-200"
                                  }`}
                                >
                                  {cat.label}
                                </div>
                                <div className="text-[10.5px] text-slate-400 leading-snug line-clamp-2 mt-0.5 font-normal">
                                  {cat.description}
                                </div>
                              </div>
                            </div>

                            <HiChevronRight
                              className={`text-sm shrink-0 transition-transform ${
                                isSelected ? "text-[#00D2FF] translate-x-0.5" : "text-slate-600 opacity-50"
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Middle Column: Active Category Sub-Services 2-Col Grid */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between bg-[#060c1c]">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                        <span className="text-xs font-black uppercase tracking-wider text-[#00D2FF]">
                          {currentCategory.header}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {currentCategory.items.length} Solutions Available
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                        {currentCategory.items.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/services#${sub.id}`}
                            onClick={() => setActiveDropdown(null)}
                            className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#0a152d] border border-transparent hover:border-cyan-500/30"
                          >
                            <div className="text-xs font-bold text-white group-hover:text-[#00D2FF] transition flex items-center justify-between">
                              <span>{sub.title}</span>
                              <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-[#00D2FF] transition group-hover:translate-x-0.5">
                                →
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed group-hover:text-slate-200 font-normal">
                              {sub.desc}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 font-normal">
                        Enterprise architectures engineered with production-grade SLAs.
                      </span>
                      <Link
                        to="/services"
                        onClick={() => setActiveDropdown(null)}
                        className="font-bold text-[#00D2FF] hover:underline"
                      >
                        Explore All 50 Services →
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: WHY NEXORALAB? Dedicated Blue Sidebar */}
                  <div className="w-full lg:w-[280px] 2xl:w-[310px] shrink-0 bg-gradient-to-b from-[#093583] via-[#0B3B95] to-[#072464] p-5 sm:p-6 flex flex-col justify-between text-white border-l border-white/10 shadow-inner">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white/95 mb-5">
                        WHY NEXORALAB?
                      </h3>

                      <div className="space-y-4">
                        {whyNexoraLabPoints.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-cyan-300 mt-0.5">
                              <HiCheckCircle className="text-sm text-cyan-300" />
                            </div>
                            <span className="text-xs font-semibold leading-snug text-white/95">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/15 space-y-2">
                      <Link
                        to="/services"
                        onClick={() => setActiveDropdown(null)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#0B3B95] py-2.5 text-xs font-black hover:bg-cyan-50 shadow-md transition hover:scale-[1.02] cursor-pointer"
                      >
                        <span>Explore All Services</span>
                        <HiArrowRight className="text-sm" />
                      </Link>

                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          openQuoteModal();
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400/20 border border-cyan-300/40 text-cyan-200 py-2 text-[11px] font-bold hover:bg-cyan-400/30 transition cursor-pointer"
                      >
                        <span>Request Project Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== 2. PRODUCTS MEGA MENU (3-COLUMN LAYOUT) ==================== */}
            {activeDropdown === "Products" && (
              <div className="p-0">
                <div className="flex flex-col lg:flex-row min-h-[460px]">
                  {/* Left Column: 6 Product Categories */}
                  <div className="w-full lg:w-[320px] 2xl:w-[340px] shrink-0 border-r border-white/10 p-5 sm:p-6 bg-[#040814]">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-xs font-black uppercase tracking-wider text-[#00D2FF]">
                        PRODUCTS
                      </span>
                      <Link
                        to="/products"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[11px] font-bold text-slate-400 hover:text-[#00D2FF] transition"
                      >
                        View All →
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {productCategories.map((pCat) => {
                        const isSelected = activeProductTab === pCat.id;
                        return (
                          <Link
                            key={pCat.id}
                            to={`/products#${pCat.id}`}
                            onMouseEnter={() => setActiveProductTab(pCat.id)}
                            onClick={() => setActiveDropdown(null)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2.5 cursor-pointer border ${
                              isSelected
                                ? "bg-[#0c1a36] border-cyan-400/60 text-white shadow-[0_0_20px_rgba(0,210,255,0.2)]"
                                : "border-transparent bg-white/[0.02] text-slate-300 hover:bg-[#0a152c] hover:text-white"
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-base mt-0.5 ${
                                  isSelected
                                    ? "bg-[#00D2FF]/20 border-cyan-400 text-white"
                                    : "bg-white/5 border-white/10 text-slate-300"
                                }`}
                              >
                                <span>{pCat.emoji}</span>
                              </div>
                              <div className="min-w-0">
                                <div
                                  className={`font-bold leading-tight truncate ${
                                    isSelected ? "text-white" : "text-slate-200"
                                  }`}
                                >
                                  {pCat.label}
                                </div>
                                <div className="text-[10.5px] text-slate-400 leading-snug line-clamp-2 mt-0.5 font-normal">
                                  {pCat.description}
                                </div>
                              </div>
                            </div>

                            <HiChevronRight
                              className={`text-sm shrink-0 transition-transform ${
                                isSelected ? "text-[#00D2FF] translate-x-0.5" : "text-slate-600 opacity-50"
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Middle Column: Active Product Category Sub-Products 2-Col Grid */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between bg-[#060c1c]">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                        <span className="text-xs font-black uppercase tracking-wider text-[#00D2FF]">
                          {currentProductCategory.header}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {currentProductCategory.items.length} Ready Turnkey Stacks
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                        {currentProductCategory.items.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/products#${sub.id}`}
                            onClick={() => setActiveDropdown(null)}
                            className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#0a152d] border border-transparent hover:border-cyan-500/30"
                          >
                            <div className="text-xs font-bold text-white group-hover:text-[#00D2FF] transition flex items-center justify-between">
                              <span>{sub.title}</span>
                              <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-[#00D2FF] transition group-hover:translate-x-0.5">
                                →
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed group-hover:text-slate-200 font-normal">
                              {sub.desc}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 font-normal">
                        Ready-to-deploy enterprise turnkey products with full source code & IP transfer.
                      </span>
                      <Link
                        to="/products"
                        onClick={() => setActiveDropdown(null)}
                        className="font-bold text-[#00D2FF] hover:underline"
                      >
                        Explore All Products Catalog →
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: OUR PRODUCT EDGE Dedicated Blue Sidebar */}
                  <div className="w-full lg:w-[280px] 2xl:w-[310px] shrink-0 bg-gradient-to-b from-[#093583] via-[#0B3B95] to-[#072464] p-5 sm:p-6 flex flex-col justify-between text-white border-l border-white/10 shadow-inner">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white/95 mb-5">
                        OUR PRODUCT EDGE
                      </h3>

                      <div className="space-y-4">
                        {ourProductEdgePoints.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-cyan-300 mt-0.5">
                              <HiCheckCircle className="text-sm text-cyan-300" />
                            </div>
                            <span className="text-xs font-semibold leading-snug text-white/95">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/15 space-y-2">
                      <Link
                        to="/products"
                        onClick={() => setActiveDropdown(null)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#0B3B95] py-2.5 text-xs font-black hover:bg-cyan-50 shadow-md transition hover:scale-[1.02] cursor-pointer"
                      >
                        <span>Explore All Products</span>
                        <HiArrowRight className="text-sm" />
                      </Link>

                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          openQuoteModal();
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400/20 border border-cyan-300/40 text-cyan-200 py-2 text-[11px] font-bold hover:bg-cyan-400/30 transition cursor-pointer"
                      >
                        <span>Request Project Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== 3. RESOURCES MEGA MENU (3-COLUMN LAYOUT) ==================== */}
            {activeDropdown === "Resources" && (
              <div className="p-0">
                <div className="flex flex-col lg:flex-row min-h-[460px]">
                  {/* Left Column: 6 Resource Categories */}
                  <div className="w-full lg:w-[320px] 2xl:w-[340px] shrink-0 border-r border-white/10 p-5 sm:p-6 bg-[#040814]">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="text-xs font-black uppercase tracking-wider text-[#00D2FF]">
                        RESOURCES
                      </span>
                      <Link
                        to="/resources"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[11px] font-bold text-slate-400 hover:text-[#00D2FF] transition"
                      >
                        View All →
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {resourceCategories.map((rCat) => {
                        const isSelected = activeResourceTab === rCat.id;
                        return (
                          <Link
                            key={rCat.id}
                            to={`/resources#${rCat.id}`}
                            onMouseEnter={() => setActiveResourceTab(rCat.id)}
                            onClick={() => setActiveDropdown(null)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2.5 cursor-pointer border ${
                              isSelected
                                ? "bg-[#0c1a36] border-cyan-400/60 text-white shadow-[0_0_20px_rgba(0,210,255,0.2)]"
                                : "border-transparent bg-white/[0.02] text-slate-300 hover:bg-[#0a152c] hover:text-white"
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-base mt-0.5 ${
                                  isSelected
                                    ? "bg-[#00D2FF]/20 border-cyan-400 text-white"
                                    : "bg-white/5 border-white/10 text-slate-300"
                                }`}
                              >
                                <span>{rCat.emoji}</span>
                              </div>
                              <div className="min-w-0">
                                <div
                                  className={`font-bold leading-tight truncate ${
                                    isSelected ? "text-white" : "text-slate-200"
                                  }`}
                                >
                                  {rCat.label}
                                </div>
                                <div className="text-[10.5px] text-slate-400 leading-snug line-clamp-2 mt-0.5 font-normal">
                                  {rCat.description}
                                </div>
                              </div>
                            </div>

                            <HiChevronRight
                              className={`text-sm shrink-0 transition-transform ${
                                isSelected ? "text-[#00D2FF] translate-x-0.5" : "text-slate-600 opacity-50"
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Middle Column: Active Resource Category Sub-Items 2-Col Grid */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between bg-[#060c1c]">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                        <span className="text-xs font-black uppercase tracking-wider text-[#00D2FF]">
                          {currentResourceCategory.header}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {currentResourceCategory.items.length} Developer Resources
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                        {currentResourceCategory.items.map((sub) => (
                          <Link
                            key={sub.id}
                            to={sub.path}
                            onClick={() => setActiveDropdown(null)}
                            className="group block p-2.5 rounded-xl transition-all duration-200 hover:bg-[#0a152d] border border-transparent hover:border-cyan-500/30"
                          >
                            <div className="text-xs font-bold text-white group-hover:text-[#00D2FF] transition flex items-center justify-between">
                              <span>{sub.title}</span>
                              <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-[#00D2FF] transition group-hover:translate-x-0.5">
                                →
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed group-hover:text-slate-200 font-normal">
                              {sub.desc}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 font-normal">
                        Engineering playbooks, IaC Terraform templates & AI talent intelligence.
                      </span>
                      <Link
                        to="/resources"
                        onClick={() => setActiveDropdown(null)}
                        className="font-bold text-[#00D2FF] hover:underline"
                      >
                        Explore All Resources Hub →
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: OUR RESOURCE EDGE Dedicated Blue Sidebar */}
                  <div className="w-full lg:w-[280px] 2xl:w-[310px] shrink-0 bg-gradient-to-b from-[#093583] via-[#0B3B95] to-[#072464] p-5 sm:p-6 flex flex-col justify-between text-white border-l border-white/10 shadow-inner">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white/95 mb-5">
                        OUR RESOURCE EDGE
                      </h3>

                      <div className="space-y-4">
                        {ourResourceEdgePoints.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-cyan-300 mt-0.5">
                              <HiCheckCircle className="text-sm text-cyan-300" />
                            </div>
                            <span className="text-xs font-semibold leading-snug text-white/95">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/15 space-y-2">
                      <Link
                        to="/resources"
                        onClick={() => setActiveDropdown(null)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#0B3B95] py-2.5 text-xs font-black hover:bg-cyan-50 shadow-md transition hover:scale-[1.02] cursor-pointer"
                      >
                        <span>Explore All Resources</span>
                        <HiArrowRight className="text-sm" />
                      </Link>

                      <Link
                        to="/meeting"
                        onClick={() => setActiveDropdown(null)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400/20 border border-cyan-300/40 text-cyan-200 py-2 text-[11px] font-bold hover:bg-cyan-400/30 transition cursor-pointer"
                      >
                        <span>Book 30-Min Tech Call</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenu;
