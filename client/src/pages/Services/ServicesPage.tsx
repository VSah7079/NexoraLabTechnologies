import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSparkles,
  HiCheckCircle,
  HiArrowRight,
  HiDevicePhoneMobile,
  HiCpuChip,
  HiBuildingOffice2,
  HiCloudArrowUp,
  HiPaintBrush,
  HiShieldCheck,
  HiComputerDesktop,
  HiChartBar,
  HiCommandLine,
  HiCircleStack,
  HiBolt,
  HiGlobeAlt,
  HiAcademicCap,
  HiHeart,
  HiShoppingBag,
  HiTruck,
  HiBuildingStorefront,
  HiHomeModern,
  HiRocketLaunch,
  HiPaperAirplane,
  HiChevronDown,
  HiMagnifyingGlass,
  HiArrowTrendingUp,
  HiCheckBadge,
  HiArrowPath,
  HiXMark,
  HiCloud,
  HiCurrencyDollar,
  HiEnvelope,
  HiDocumentText,
} from "react-icons/hi2";
import { FaAws, FaSalesforce, FaReact, FaNodeJs, FaPython, FaDocker, FaBrain } from "react-icons/fa6";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";

// ============================================
// 1. ALL 50 COMPLETE SERVICES DATA (Matching Navbar Dropdown 1:1)
// ============================================
export interface ServiceItem {
  id: string;
  title: string;
  category: "software" | "cloud" | "ai" | "salesforce" | "design" | "marketing";
  categoryLabel: string;
  icon: React.ElementType;
  accentColor: string;
  bgGradient: string;
  borderHover: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  techStack: string[];
}

export const allServices: ServiceItem[] = [
  // ----------------------------------------------------
  // 1. SOFTWARE DEVELOPMENT (10 Items)
  // ----------------------------------------------------
  {
    id: "software-development",
    title: "Software Development",
    category: "software",
    categoryLabel: "Software Development",
    icon: HiComputerDesktop,
    accentColor: "text-blue-400",
    bgGradient: "from-blue-500/15 via-cyan-500/05 to-transparent",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    tagline: "Delivering Seamless Digital Experiences with Expert Software",
    description: "End-to-end software development built around clean architecture, scalable backends, and intuitive customer interfaces.",
    capabilities: ["Full-Stack Engineering", "Modular Microservices", "Process Automation", "High-Throughput APIs", "100% IP Ownership"],
    deliverables: ["Clean modular code repository", "Comprehensive API documentation", "Automated unit & integration tests", "Deployment playbooks"],
    techStack: ["Node.js", "Go", "Python", "PostgreSQL", "Docker", "TypeScript"],
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    category: "software",
    categoryLabel: "Software Development",
    icon: HiCommandLine,
    accentColor: "text-cyan-400",
    bgGradient: "from-cyan-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.25)]",
    tagline: "Tailored Solutions Built Around Your Business Workflows",
    description: "Software tailored precisely around your unique business operations, workflow automation, and scalable requirements.",
    capabilities: ["Custom Business Apps", "Workflow Automation Engines", "Legacy Modernization", "Third-Party Integrations", "Database Architecture"],
    deliverables: ["Custom business workflow engines", "Microservice architecture blueprints", "Relational & cache database schemas", "Full source code transfer"],
    techStack: ["Node.js", "Python", "PostgreSQL", "Redis", "Docker", "FastAPI"],
  },
  {
    id: "web-development",
    title: "Web Application Development",
    category: "software",
    categoryLabel: "Software Development",
    icon: HiComputerDesktop,
    accentColor: "text-sky-400",
    bgGradient: "from-sky-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]",
    tagline: "High-Performance Modern Web Platforms & Client Portals",
    description: "Secure, high-performance web applications, customer portals, and Progressive Web Apps built with Next.js and React.",
    capabilities: ["React 19 & Next.js 16 SSR", "Progressive Web Apps (PWA)", "Role-Based Access Control", "WebSockets Real-Time Sync", "Edge Caching"],
    deliverables: ["Sub-second initial page load speed", "Type-safe TypeScript frontend code", "Granular role-based permissions", "Integrated SEO architecture"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    category: "software",
    categoryLabel: "Software Development",
    icon: HiDevicePhoneMobile,
    accentColor: "text-emerald-400",
    bgGradient: "from-emerald-500/15 via-teal-500/05 to-transparent",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    tagline: "Custom iOS, Android & Cross-Platform Mobile Apps",
    description: "Native and cross-platform mobile apps with 60fps UX, offline-first sync, and biometric security.",
    capabilities: ["iOS & Android Native Apps", "Cross-Platform Flutter & React Native", "Biometric Authentication", "Push Notifications", "Store Publishing"],
    deliverables: ["Smooth 60fps mobile interfaces", "Offline SQLite synchronization", "FaceID / Keychain security", "App Store & Play Store approval"],
    techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    id: "ios-app-development",
    title: "iOS App Development",
    category: "software",
    categoryLabel: "Software Development",
    icon: HiDevicePhoneMobile,
    accentColor: "text-blue-400",
    bgGradient: "from-blue-500/15 via-indigo-500/05 to-transparent",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    tagline: "Native iPhone & iPad Apps with Seamless UX",
    description: "Native Swift and SwiftUI iOS applications optimized for iPhone and iPad with strict Apple HIG compliance.",
    capabilities: ["Swift & SwiftUI Architecture", "Apple HIG Compliance", "CoreData / SQLite Storage", "Apple Pay & Subscriptions", "TestFlight Beta Pipelines"],
    deliverables: ["Native iOS application bundle", "Store metadata & screenshots", "APNs push notification integration", "Complete Xcode project repo"],
    techStack: ["Swift", "SwiftUI", "Xcode", "CoreData", "APNs"],
  },
  {
    id: "android-app-development",
    title: "Android App Development",
    category: "software",
    categoryLabel: "Software Development",
    icon: HiDevicePhoneMobile,
    accentColor: "text-green-400",
    bgGradient: "from-green-500/15 via-emerald-500/05 to-transparent",
    borderHover: "hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]",
    tagline: "Robust Apps Tailored for the Global Android Ecosystem",
    description: "Scalable Kotlin and Jetpack Compose applications built for high performance across diverse Android devices.",
    capabilities: ["Kotlin & Jetpack Compose", "Material Design 3 Guidelines", "Google Play In-App Billing", "WorkManager Background Sync", "Multi-Screen Adaptation"],
    deliverables: ["Signed Android AAB release bundles", "Room database architecture", "Firebase Cloud Messaging setup", "Google Play Console release"],
    techStack: ["Kotlin", "Jetpack Compose", "Android Studio", "Room DB", "Firebase"],
  },
  {
    id: "flutter-app-development",
    title: "Flutter App Development",
    category: "software",
    categoryLabel: "Software Development",
    icon: HiDevicePhoneMobile,
    accentColor: "text-cyan-400",
    bgGradient: "from-cyan-500/15 via-sky-500/05 to-transparent",
    borderHover: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.25)]",
    tagline: "High-Velocity Cross-Platform Apps from a Single Codebase",
    description: "Cost-effective, rapid multi-platform app development delivering native performance on both iOS and Android.",
    capabilities: ["Single Codebase Deployment", "Custom Render Widgets", "Riverpod & BLoC State", "Native Device Plugins", "Rapid MVP Velocity"],
    deliverables: ["Unified iOS & Android codebase", "Custom UI widget library", "Automated CI/CD build scripts", "Full API client layer"],
    techStack: ["Flutter", "Dart", "Riverpod", "Firebase", "REST APIs"],
  },
  {
    id: "react-native-development",
    title: "React Native Development",
    category: "software",
    categoryLabel: "Software Development",
    icon: FaReact,
    accentColor: "text-sky-400",
    bgGradient: "from-sky-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]",
    tagline: "Native-Grade Hybrid Mobile Apps with Modular Code",
    description: "High-performance React Native mobile apps leveraging native device bridges and shared TypeScript logic.",
    capabilities: ["React Native Architecture", "Redux Toolkit State", "Native Module Bridges", "OTA CodePush Updates", "Hermes Engine Tuning"],
    deliverables: ["Modular React Native codebase", "Fast OTA update configurations", "Integrated analytics & bug tracking", "Cross-platform app builds"],
    techStack: ["React Native", "TypeScript", "Expo", "Redux", "Node.js"],
  },
  {
    id: "enterprise-apps",
    title: "Enterprise App Development",
    category: "software",
    categoryLabel: "Software Development",
    icon: HiBuildingOffice2,
    accentColor: "text-indigo-400",
    bgGradient: "from-indigo-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
    tagline: "Scalable, Secure & Cloud-Native Enterprise Software",
    description: "Mission-critical enterprise software engineered for complex workflows, high concurrency, and regulatory compliance.",
    capabilities: ["Custom ERP & Portals", "Enterprise SSO (SAML/Okta)", "Audit Logging & Security", "Zero-Downtime Migration", "Legacy System Bridges"],
    deliverables: ["Custom enterprise ERP architecture", "Role-based access control matrix", "Audit logs & compliance compliance", "Zero-downtime deployment pipeline"],
    techStack: ["React", "FastAPI", "Go", "PostgreSQL", "Kafka", "AWS EKS"],
  },
  {
    id: "app-maintenance-support",
    title: "App Maintenance & Support",
    category: "software",
    categoryLabel: "Software Development",
    icon: HiArrowPath,
    accentColor: "text-teal-400",
    bgGradient: "from-teal-500/15 via-emerald-500/05 to-transparent",
    borderHover: "hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]",
    tagline: "Ongoing SLA Monitoring, Security Updates & Performance",
    description: "Continuous application monitoring, security patching, performance optimization, and iterative feature rollouts.",
    capabilities: ["24/7 SLA Monitoring", "OS Upgrade Compatibility", "Security Patches & Vulnerability Fixes", "Database Index Tuning", "Sprint-Based Feature Iterations"],
    deliverables: ["Monthly SLA & uptime reports", "Proactive error telemetry logs", "Continuous security patch updates", "Automated database backups"],
    techStack: ["Sentry", "Grafana", "AWS CloudWatch", "GitHub Actions", "Docker"],
  },

  // ----------------------------------------------------
  // 2. CLOUD & DEVOPS (10 Items)
  // ----------------------------------------------------
  {
    id: "cloud-services",
    title: "Cloud Services",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: HiCloud,
    accentColor: "text-cyan-400",
    bgGradient: "from-cyan-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.25)]",
    tagline: "Secure, Scalable Cloud Infrastructure & Deployment",
    description: "Modern cloud infrastructure design, multi-region architecture, and serverless deployments with 99.99% uptime SLAs.",
    capabilities: ["Cloud Infrastructure Design", "Multi-Region Deployments", "Elastic Auto-Scaling", "Serverless Lambda Functions", "IAM Security Policies"],
    deliverables: ["Cloud architecture blueprints", "Infrastructure as Code configs", "High-availability multi-region setup", "Cost & performance benchmark report"],
    techStack: ["AWS", "Azure", "GCP", "Terraform", "Docker"],
  },
  {
    id: "devops-services",
    title: "DevOps Services",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: HiCommandLine,
    accentColor: "text-blue-400",
    bgGradient: "from-blue-500/15 via-indigo-500/05 to-transparent",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    tagline: "CI/CD Automation, Infrastructure as Code & Fast Releases",
    description: "Automate build, test, and release pipelines to ship production features with maximum velocity and zero downtime.",
    capabilities: ["Automated CI/CD Pipelines", "Infrastructure as Code (Terraform)", "GitOps Workflows", "Docker Containerization", "Automated QA Gateways"],
    deliverables: ["Automated deployment workflows", "Terraform environment templates", "Automated test integration gates", "Disaster recovery playbooks"],
    techStack: ["GitHub Actions", "Terraform", "Docker", "Ansible", "Kubernetes"],
  },
  {
    id: "cloud-migration-services",
    title: "Cloud Migration Services",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: HiCloudArrowUp,
    accentColor: "text-indigo-400",
    bgGradient: "from-indigo-500/15 via-purple-500/05 to-transparent",
    borderHover: "hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
    tagline: "Seamless Zero-Downtime Migration to Modern Cloud",
    description: "Migrate legacy databases and on-premise monolithic applications to modern AWS and cloud infrastructure with zero data loss.",
    capabilities: ["Migration Readiness Audit", "Database Migration (DMS)", "Legacy Refactoring", "Zero-Downtime Cutover", "Post-Migration Testing"],
    deliverables: ["Cloud migration roadmap", "Data migration scripts & validation", "Cutover rollback strategy", "Architecture optimization report"],
    techStack: ["AWS DMS", "Terraform", "PostgreSQL", "Docker", "Kubernetes"],
  },
  {
    id: "devops-consulting",
    title: "DevOps Consulting Services",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: HiShieldCheck,
    accentColor: "text-sky-400",
    bgGradient: "from-sky-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]",
    tagline: "Strategic DevOps Advisory to Improve Performance & Scale",
    description: "Expert advisory on cloud architecture, FinOps cloud cost optimization, containerization, and release security.",
    capabilities: ["DevOps Maturity Assessment", "Pipeline Bottleneck Removal", "FinOps Cloud Cost Optimization", "Security Guardrails", "Team Best Practices"],
    deliverables: ["DevOps audit report", "Cloud cost reduction plan (30-60%)", "Security compliance checklist", "CI/CD acceleration blueprint"],
    techStack: ["DevOps Strategy", "FinOps", "Architecture Review", "GitLab", "AWS"],
  },
  {
    id: "cloud-security-services",
    title: "Cloud Security Services",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: HiShieldCheck,
    accentColor: "text-rose-400",
    bgGradient: "from-rose-500/15 via-red-500/05 to-transparent",
    borderHover: "hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]",
    tagline: "Advanced Cloud Security, Compliance & Threat Protection",
    description: "Enterprise cloud defense, zero-trust network access, secrets management, and automated vulnerability scanning.",
    capabilities: ["Zero-Trust Network Access", "Cloud WAF & DDoS Shield", "SOC2 / HIPAA Compliance", "Secrets Management (Vault)", "Automated Security Scans"],
    deliverables: ["Cloud security assessment report", "WAF & firewall rule configurations", "Encrypted data transit protocols", "Compliance remediation audit"],
    techStack: ["AWS WAF", "HashiCorp Vault", "Snyk", "SonarQube", "GuardDuty"],
  },
  {
    id: "cloud-managed-services",
    title: "Cloud Managed Services",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: HiBolt,
    accentColor: "text-amber-400",
    bgGradient: "from-amber-500/15 via-yellow-500/05 to-transparent",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    tagline: "24/7 Monitoring, Optimization & Ongoing SRE Management",
    description: "Continuous infrastructure health monitoring, incident mitigation, auto-scaling tuning, and regular cost optimization.",
    capabilities: ["24/7 SRE Monitoring", "Guaranteed Incident Response", "Telemetry & Dashboards", "Backup & Disaster Recovery", "Continuous FinOps Audits"],
    deliverables: ["Live Prometheus / Grafana dashboards", "Monthly infrastructure telemetry", "Automated failover configurations", "Regular cost review audits"],
    techStack: ["Prometheus", "Grafana", "AWS CloudWatch", "PagerDuty", "Terraform"],
  },
  {
    id: "iot-development",
    title: "IoT Development",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: HiCpuChip,
    accentColor: "text-purple-400",
    bgGradient: "from-purple-500/15 via-indigo-500/05 to-transparent",
    borderHover: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    tagline: "Custom IoT Solutions with Cloud Connectivity & Analytics",
    description: "Connect hardware devices with high-throughput MQTT brokers, cloud telemetry pipelines, and real-time dashboards.",
    capabilities: ["MQTT Message Brokers", "Edge Firmware Connectivity", "Real-Time Telemetry Streaming", "IoT Fleet Management", "Time-Series Data Storage"],
    deliverables: ["AWS IoT Core backend infrastructure", "Device authentication layer", "Real-time streaming dashboard", "Firmware over-the-air update configs"],
    techStack: ["AWS IoT Core", "MQTT", "Python", "TimeScaleDB", "WebSockets"],
  },
  {
    id: "aws-cloud-services",
    title: "AWS Cloud Services",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: FaAws,
    accentColor: "text-amber-300",
    bgGradient: "from-amber-500/15 via-orange-500/05 to-transparent",
    borderHover: "hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.25)]",
    tagline: "Scalable Cloud Architecture, EKS, Terraform & Serverless",
    description: "Comprehensive AWS cloud deployments, multi-region Kubernetes clusters, serverless Lambda backends, and RDS instances.",
    capabilities: ["AWS EKS Kubernetes Clusters", "Serverless Lambda Backends", "Aurora / RDS Databases", "CloudFront CDN Caching", "VPC Network Peering"],
    deliverables: ["Terraform reproducible environments", "Multi-AZ high availability setup", "Auto-scaling cluster configurations", "IAM security permission matrix"],
    techStack: ["AWS", "EKS", "Lambda", "RDS", "Terraform", "CloudFront"],
  },
  {
    id: "amazon-web-services-company",
    title: "Amazon Web Services Company",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: FaAws,
    accentColor: "text-amber-400",
    bgGradient: "from-amber-500/15 via-yellow-500/05 to-transparent",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    tagline: "AWS Cloud Architecture, Migration & FinOps Cost Reduction",
    description: "Certified AWS architecture consulting delivering resilient cloud systems and 30%-60% hosting cost reduction.",
    capabilities: ["AWS Architecture Consulting", "FinOps Cost Optimization", "Well-Architected Framework", "Disaster Recovery Planning", "24/7 AWS Support"],
    deliverables: ["AWS Well-Architected review report", "FinOps cloud budget optimization", "Automated snapshot backup policy", "Dedicated AWS engineering pod"],
    techStack: ["AWS", "Terraform", "CloudFormation", "Cost Explorer", "IAM"],
  },
  {
    id: "kubernetes-containers",
    title: "Kubernetes & Containers",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    icon: FaDocker,
    accentColor: "text-blue-400",
    bgGradient: "from-blue-500/15 via-cyan-500/05 to-transparent",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    tagline: "Docker Containerization, Helm & Zero-Downtime Deployments",
    description: "Orchestrate microservices with auto-scaling Kubernetes clusters, Helm charts, and automated blue/green canary deployments.",
    capabilities: ["Docker Microservices", "Kubernetes (EKS/GKE)", "Helm Chart Packaging", "Blue/Green Canary Rollouts", "Service Mesh & Ingress"],
    deliverables: ["Docker containerization templates", "Production Kubernetes manifests", "Blue/Green deployment pipelines", "Cluster auto-scaler setup"],
    techStack: ["Kubernetes", "Docker", "Helm", "ArgoCD", "Istio"],
  },

  // ----------------------------------------------------
  // 3. AI & DATA INTELLIGENCE (8 Items)
  // ----------------------------------------------------
  {
    id: "generative-ai",
    title: "Generative AI Solutions",
    category: "ai",
    categoryLabel: "AI & Data Intelligence",
    icon: HiCpuChip,
    accentColor: "text-purple-400",
    bgGradient: "from-purple-500/15 via-indigo-500/05 to-transparent",
    borderHover: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    tagline: "Enterprise LLM Workflows, Chatbots & Automation",
    description: "Practical Generative AI solutions integrated into your apps, products, workflows, and customer service channels.",
    capabilities: ["Custom LLM Fine-Tuning", "Multimodal AI (Vision/Audio)", "Enterprise Chatbots", "Prompt Engineering Workflows", "Privacy Guardrails"],
    deliverables: ["Custom LLM prompt pipelines", "Fine-tuned model weights", "Zero-data-retention security layer", "Streaming API integration"],
    techStack: ["OpenAI GPT-4", "Claude 3.5", "Gemini 1.5", "Python", "LangChain"],
  },
  {
    id: "machine-learning",
    title: "Machine Learning Engineering",
    category: "ai",
    categoryLabel: "AI & Data Intelligence",
    icon: FaBrain,
    accentColor: "text-pink-400",
    bgGradient: "from-pink-500/15 via-purple-500/05 to-transparent",
    borderHover: "hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]",
    tagline: "Predictive Models, Classifiers & Intelligent Engines",
    description: "Train, evaluate, and deploy scalable machine learning models that generate predictive insights and automated classifications.",
    capabilities: ["Supervised & Unsupervised ML", "Predictive Analytics Models", "Recommendation Engines", "Anomaly Detection", "MLOps Model Serving"],
    deliverables: ["Trained ML model weights & metrics", "High-throughput inference APIs", "Automated model retraining pipelines", "Data preprocessing scripts"],
    techStack: ["PyTorch", "TensorFlow", "Scikit-Learn", "FastAPI", "MLflow"],
  },
  {
    id: "data-science",
    title: "Data Science & Analytics",
    category: "ai",
    categoryLabel: "AI & Data Intelligence",
    icon: HiChartBar,
    accentColor: "text-emerald-400",
    bgGradient: "from-emerald-500/15 via-teal-500/05 to-transparent",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    tagline: "Turn Raw Complex Data into Actionable Executive Insights",
    description: "ETL pipelines, data warehousing, executive BI dashboards, and statistical models that drive revenue decisions.",
    capabilities: ["ETL / ELT Data Pipelines", "Data Warehouse Modeling", "Executive BI Dashboards", "Cohort & Funnel Analytics", "Statistical Analysis"],
    deliverables: ["Automated data ingestion pipelines", "Interactive Metabase / Tableau boards", "Clean relational data warehouse", "Statistical insight reports"],
    techStack: ["Python", "Pandas", "PostgreSQL", "Apache Spark", "Metabase"],
  },
  {
    id: "cyber-security",
    title: "Cyber Security Services",
    category: "ai",
    categoryLabel: "AI & Data Intelligence",
    icon: HiShieldCheck,
    accentColor: "text-rose-400",
    bgGradient: "from-rose-500/15 via-red-500/05 to-transparent",
    borderHover: "hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]",
    tagline: "Proactive AI Threat Defense, VAPT Audits & DevSecOps",
    description: "Vulnerability assessments, penetration testing (VAPT), and automated DevSecOps code scanning for compliance.",
    capabilities: ["Vulnerability Assessment (VAPT)", "OWASP Security Audits", "DevSecOps Pipeline Scans", "Zero-Trust Architecture", "SOC2 / HIPAA / GDPR"],
    deliverables: ["Comprehensive VAPT audit report", "Code patch remediation recommendations", "Automated static code scan hooks", "Security certification roadmap"],
    techStack: ["OWASP ZAP", "Burp Suite", "SonarQube", "AWS WAF", "Snyk"],
  },
  {
    id: "saas-development",
    title: "SaaS Development Services",
    category: "ai",
    categoryLabel: "AI & Data Intelligence",
    icon: HiRocketLaunch,
    accentColor: "text-sky-400",
    bgGradient: "from-sky-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]",
    tagline: "End-to-End Multi-Tenant Cloud SaaS Product Platforms",
    description: "Architect, develop, and scale multi-tenant SaaS products with automated Stripe subscriptions and usage metering.",
    capabilities: ["Multi-Tenant Schema Isolation", "Stripe & Razorpay Billing", "Self-Service User Onboarding", "Usage-Based Metering", "Executive Admin Dashboards"],
    deliverables: ["Full SaaS platform architecture", "Automated subscription webhooks", "Team workspace management", "Admin billing & telemetry dashboard"],
    techStack: ["Next.js 16", "Node.js", "Stripe", "PostgreSQL", "Redis"],
  },
  {
    id: "ai-agents-automation",
    title: "AI Agents & Autonomous Workflows",
    category: "ai",
    categoryLabel: "AI & Data Intelligence",
    icon: HiSparkles,
    accentColor: "text-purple-400",
    bgGradient: "from-purple-500/15 via-indigo-500/05 to-transparent",
    borderHover: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    tagline: "Autonomous Multi-Agent Orchestration & Decision Engines",
    description: "Autonomous AI agents executing multi-step business workflows with tool execution and real-time reasoning.",
    capabilities: ["Multi-Agent Orchestration", "Tool Calling & Web Browsing", "Autonomous Task Execution", "Human-in-the-Loop Approval", "Persistent State Graphs"],
    deliverables: ["LangGraph agent workflow graph", "Tool execution sandbox", "Human feedback approval interface", "Complete agent API endpoints"],
    techStack: ["LangGraph", "CrewAI", "FastAPI", "Python", "pgvector"],
  },
  {
    id: "rag-vector-search",
    title: "RAG & Vector Search Systems",
    category: "ai",
    categoryLabel: "AI & Data Intelligence",
    icon: HiMagnifyingGlass,
    accentColor: "text-cyan-400",
    bgGradient: "from-cyan-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.25)]",
    tagline: "Enterprise Knowledge Retrieval & Semantic Search with pgvector",
    description: "Index corporate documentation and unstructured data for sub-second semantic retrieval with zero hallucination.",
    capabilities: ["Vector Database Embeddings", "Hybrid Semantic Search", "Context Chunking & Ranking", "Hallucination Guardrails", "Enterprise Document Indexing"],
    deliverables: ["Vector embedding database setup", "Semantic search query API", "Document indexing pipeline", "Accuracy benchmarking report"],
    techStack: ["pgvector", "Pinecone", "OpenAI Embeddings", "LangChain", "FastAPI"],
  },
  {
    id: "document-ai-ocr",
    title: "Document AI & Neural OCR",
    category: "ai",
    categoryLabel: "AI & Data Intelligence",
    icon: HiCommandLine,
    accentColor: "text-teal-400",
    bgGradient: "from-teal-500/15 via-emerald-500/05 to-transparent",
    borderHover: "hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]",
    tagline: "Sub-15ms AI Document Parsing & Automated Extraction",
    description: "Automated parsing and structured extraction of resumes, invoices, contracts, and medical records in under 15ms.",
    capabilities: ["Sub-15ms Resume & Invoice Parsing", "Table & Key-Value Extraction", "Multilingual Neural OCR", "Automated Validation Rules", "JSON Data Output"],
    deliverables: ["Neural document parsing API", "Validated JSON extraction schemas", "Accuracy verification suite", "High-throughput ingestion queues"],
    techStack: ["Tesseract", "OpenAI Vision", "FastAPI", "Python", "Redis"],
  },

  // ----------------------------------------------------
  // 4. SALESFORCE SOLUTIONS (8 Items)
  // ----------------------------------------------------
  {
    id: "salesforce-consulting",
    title: "Salesforce Consulting",
    category: "salesforce",
    categoryLabel: "Salesforce Solutions",
    icon: FaSalesforce,
    accentColor: "text-sky-400",
    bgGradient: "from-sky-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]",
    tagline: "Strategic CRM Roadmap, Process Audit & Architecture",
    description: "Salesforce consulting, business process optimization, licensing advisory, and comprehensive architecture alignment.",
    capabilities: ["CRM Maturity Audit", "Business Process Mapping", "Architecture Roadmap", "Licensing Optimization", "Change Management"],
    deliverables: ["Salesforce audit & gap report", "CRM implementation roadmap", "Licensing cost recommendations", "Stakeholder alignment deck"],
    techStack: ["Salesforce", "Sales Cloud", "Service Cloud", "Roadmap Strategy"],
  },
  {
    id: "salesforce-implementation",
    title: "Salesforce Implementation",
    category: "salesforce",
    categoryLabel: "Salesforce Solutions",
    icon: FaSalesforce,
    accentColor: "text-blue-400",
    bgGradient: "from-blue-500/15 via-indigo-500/05 to-transparent",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    tagline: "End-to-End CRM Setup, Migration, Roles & Onboarding",
    description: "Full-cycle Salesforce implementation customized around your sales, service, and marketing operational requirements.",
    capabilities: ["Custom Schema & Object Modeling", "User Roles & Permissions", "Data Import & Cleansing", "Automated Workflows", "Team Onboarding"],
    deliverables: ["Configured Salesforce production org", "Custom object data models", "Data migration verification report", "User training & SOP manuals"],
    techStack: ["Salesforce", "Apex", "Flow Builder", "Data Loader"],
  },
  {
    id: "lightning-migration-dev",
    title: "Lightning Migration & Dev",
    category: "salesforce",
    categoryLabel: "Salesforce Solutions",
    icon: FaSalesforce,
    accentColor: "text-amber-400",
    bgGradient: "from-amber-500/15 via-orange-500/05 to-transparent",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    tagline: "Classic to Lightning Upgrade & Custom LWC Development",
    description: "Upgrade from Salesforce Classic to Lightning Experience with custom Lightning Web Components (LWC).",
    capabilities: ["Classic to Lightning Migration", "Custom Lightning Web Components", "Lightning App Builder", "Performance Optimization", "UI/UX Modernization"],
    deliverables: ["Migrated Lightning Experience org", "Custom reusable LWC modules", "Lightning page layouts", "Performance benchmark audit"],
    techStack: ["LWC", "JavaScript", "Apex", "SLDS Design System"],
  },
  {
    id: "salesforce-integration",
    title: "Salesforce Integration",
    category: "salesforce",
    categoryLabel: "Salesforce Solutions",
    icon: FaSalesforce,
    accentColor: "text-cyan-400",
    bgGradient: "from-cyan-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.25)]",
    tagline: "Connect Salesforce with ERP, Marketing & Custom APIs",
    description: "Seamless bi-directional integration connecting Salesforce CRM with external databases, payment gateways, and ERPs.",
    capabilities: ["REST & SOAP Web Services", "ERP Bi-Directional Sync", "Payment Gateway Webhooks", "Marketing Automation Sync", "OAuth 2.0 Security"],
    deliverables: ["Real-time API connector layer", "Bi-directional data sync engine", "Error logging & retry queues", "Integration security documentation"],
    techStack: ["REST APIs", "MuleSoft", "Apex Callouts", "Webhooks", "OAuth 2.0"],
  },
  {
    id: "sales-cloud-solutions",
    title: "Sales Cloud Solutions",
    category: "salesforce",
    categoryLabel: "Salesforce Solutions",
    icon: FaSalesforce,
    accentColor: "text-emerald-400",
    bgGradient: "from-emerald-500/15 via-teal-500/05 to-transparent",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    tagline: "Pipeline Tracking, Deal Velocity & Revenue Forecasting",
    description: "Optimize sales team productivity, automate lead distribution, and gain real-time deal revenue forecasting.",
    capabilities: ["Lead & Opportunity Pipelines", "Automated Quoting (CPQ)", "Revenue Forecasting", "Territory Management", "Executive Sales Dashboards"],
    deliverables: ["Custom sales pipeline stages", "Automated lead assignment rules", "Forecasting reports & dashboards", "CPQ product bundle setup"],
    techStack: ["Sales Cloud", "CPQ", "Flow Builder", "Salesforce Reports"],
  },
  {
    id: "service-cloud-solutions",
    title: "Service Cloud Solutions",
    category: "salesforce",
    categoryLabel: "Salesforce Solutions",
    icon: FaSalesforce,
    accentColor: "text-indigo-400",
    bgGradient: "from-indigo-500/15 via-purple-500/05 to-transparent",
    borderHover: "hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
    tagline: "Omnichannel Support, Automated Case Routing & Chatbots",
    description: "Empower support teams with automated case queues, knowledge bases, and AI-powered service chatbots.",
    capabilities: ["Omnichannel Case Routing", "Knowledge Base Management", "Live Agent Chatbots", "SLA & Escalation Rules", "Customer 360 View"],
    deliverables: ["Omnichannel support routing", "Knowledge article database", "Einstein chatbot workflows", "Customer satisfaction (CSAT) boards"],
    techStack: ["Service Cloud", "Omni-Channel", "Einstein Bots", "Knowledge"],
  },
  {
    id: "salesforce-health-audit",
    title: "Salesforce Health & Audit",
    category: "salesforce",
    categoryLabel: "Salesforce Solutions",
    icon: FaSalesforce,
    accentColor: "text-rose-400",
    bgGradient: "from-rose-500/15 via-red-500/05 to-transparent",
    borderHover: "hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]",
    tagline: "Code Quality Review, Governor Limit & Security Audits",
    description: "Audit existing Salesforce instances to resolve governor limits, remove technical debt, and tighten data security.",
    capabilities: ["Governor Limit Optimization", "Apex PMD Static Code Scan", "Data Storage Audit", "Sharing Rules & Security", "Technical Debt Cleanup"],
    deliverables: ["Comprehensive org health report", "Apex refactoring recommendations", "Storage optimization strategies", "Security compliance report"],
    techStack: ["Salesforce Health Check", "Apex PMD", "Event Monitoring"],
  },
  {
    id: "custom-apex-flow",
    title: "Custom Apex & Flow Automation",
    category: "salesforce",
    categoryLabel: "Salesforce Solutions",
    icon: FaSalesforce,
    accentColor: "text-amber-400",
    bgGradient: "from-amber-500/15 via-yellow-500/05 to-transparent",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    tagline: "Automated Workflows, Batch Triggers & Headless Integrations",
    description: "Write high-performance batch Apex classes, asynchronous triggers, and complex flows with 90%+ test coverage.",
    capabilities: ["Batch & Scheduled Apex", "Trigger Handler Frameworks", "Complex Flow Automations", "Asynchronous Queueable Jobs", "90%+ Unit Test Coverage"],
    deliverables: ["Documented Apex trigger architecture", "Optimized Flow automation suite", "Comprehensive test classes (90%+)", "Deployment changelog"],
    techStack: ["Apex", "SOQL / SOSL", "Flows", "Trigger Handlers"],
  },

  // ----------------------------------------------------
  // 5. DESIGN & EXPERIENCE (6 Items)
  // ----------------------------------------------------
  {
    id: "ui-ux-design-studio",
    title: "UI/UX Design Studio",
    category: "design",
    categoryLabel: "Design & Experience",
    icon: HiPaintBrush,
    accentColor: "text-pink-400",
    bgGradient: "from-pink-500/15 via-rose-500/05 to-transparent",
    borderHover: "hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]",
    tagline: "User-Centered Interfaces That Enhance Usability & Conversions",
    description: "Create intuitive, accessible, and conversion-focused digital designs for web, mobile, SaaS, and enterprise applications.",
    capabilities: ["UI/UX Wireframing & Design", "User Journey Mapping", "Conversion Rate Optimization", "Figma Component Libraries", "Interactive Micro-Animations"],
    deliverables: ["Complete Figma design files", "Tested user journey maps", "WCAG 2.1 AA accessibility specs", "Interactive developer handoff"],
    techStack: ["Figma", "FigJam", "Prototyping", "Design Tokens", "WCAG AA"],
  },
  {
    id: "mobile-app-design",
    title: "Mobile App Design",
    category: "design",
    categoryLabel: "Design & Experience",
    icon: HiDevicePhoneMobile,
    accentColor: "text-purple-400",
    bgGradient: "from-purple-500/15 via-indigo-500/05 to-transparent",
    borderHover: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    tagline: "Engaging Mobile App UX Built for Performance & Clarity",
    description: "Pixel-perfect mobile UI design aligned with iOS Human Interface Guidelines and Android Material Design 3.",
    capabilities: ["iOS HIG Design Guidelines", "Material Design 3 Components", "Touch Gesture UX", "Dark & Light Theme Palettes", "Lottie Motion Specs"],
    deliverables: ["Figma mobile screen designs", "Component design variants", "Interactive click-through prototype", "Asset export kits for devs"],
    techStack: ["Figma", "iOS HIG", "Material 3", "Lottie Animations"],
  },
  {
    id: "product-design-services",
    title: "Product Design Services",
    category: "design",
    categoryLabel: "Design & Experience",
    icon: HiRocketLaunch,
    accentColor: "text-cyan-400",
    bgGradient: "from-cyan-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.25)]",
    tagline: "End-to-End Product Design from Concept to Scalable Solutions",
    description: "Transform complex ideas into structured, intuitive SaaS products and enterprise platforms with design sprints.",
    capabilities: ["Product Discovery Workshops", "MVP Feature Prioritization", "Information Architecture", "High-Fidelity Mockups", "Rapid Design Sprints"],
    deliverables: ["Product wireframe blueprints", "Information architecture maps", "High-fidelity interactive prototypes", "User story documentation"],
    techStack: ["Figma", "Miro", "Design Sprints", "User Flows"],
  },
  {
    id: "ux-research-services",
    title: "UX Research Services",
    category: "design",
    categoryLabel: "Design & Experience",
    icon: HiMagnifyingGlass,
    accentColor: "text-emerald-400",
    bgGradient: "from-emerald-500/15 via-teal-500/05 to-transparent",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    tagline: "Responsive, Conversion-Focused Designs Tailored to Your Brand",
    description: "Qualitative and quantitative UX research, user interviews, usability audits, and conversion funnel optimizations.",
    capabilities: ["User Interviews & Surveys", "Usability Heatmap Testing", "Competitor UX Benchmarking", "Accessibility (WCAG) Audits", "A/B Testing Variants"],
    deliverables: ["UX research findings report", "Usability friction heatmap analysis", "WCAG compliance scorecard", "Actionable UX redesign priorities"],
    techStack: ["Hotjar", "UsabilityHub", "Google Analytics", "Figma"],
  },
  {
    id: "design-system-development",
    title: "Design System Architecture",
    category: "design",
    categoryLabel: "Design & Experience",
    icon: HiPaintBrush,
    accentColor: "text-amber-400",
    bgGradient: "from-amber-500/15 via-orange-500/05 to-transparent",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    tagline: "Consistent, Scalable UI Design Tokens & Component Libraries",
    description: "Build scalable Figma design token systems and Storybook component libraries for unified engineering handoff.",
    capabilities: ["Design Token Architecture", "Reusable Component Variants", "Typography & Color Tokens", "Developer Handoff Specs", "Versioned UI Libraries"],
    deliverables: ["Published Figma design system", "Token mapping for Tailwind CSS", "Component documentation guide", "Storybook integration assets"],
    techStack: ["Figma Tokens", "Storybook", "Tailwind CSS", "Design Tokens"],
  },
  {
    id: "web-brand-identity",
    title: "Web & Brand Identity",
    category: "design",
    categoryLabel: "Design & Experience",
    icon: HiSparkles,
    accentColor: "text-indigo-400",
    bgGradient: "from-indigo-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
    tagline: "Modern Aesthetic Identity with Interactive Micro-Animations",
    description: "Elevate your digital presence with high-impact branding, custom icon sets, typography systems, and web animations.",
    capabilities: ["Brand Identity Guidelines", "Vector Logo & Icon Suites", "Interactive Web Layouts", "SVG / CSS Micro-Animations", "Marketing Visual Assets"],
    deliverables: ["Brand style guide manual", "Vector SVG logo & icon kits", "Interactive hero animation specs", "Digital marketing asset pack"],
    techStack: ["Illustrator", "Figma", "SVG Animations", "Brand Guidelines"],
  },

  // ----------------------------------------------------
  // 6. DIGITAL MARKETING SOLUTIONS (8 Items)
  // ----------------------------------------------------
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    icon: HiChartBar,
    accentColor: "text-amber-400",
    bgGradient: "from-amber-500/15 via-orange-500/05 to-transparent",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    tagline: "Full-Funnel Digital Strategies to Grow Your Brand & Revenue",
    description: "Data-driven marketing campaigns, CAC reduction, organic reach, and multi-channel performance attribution.",
    capabilities: ["Multi-Channel Growth Strategy", "Customer Acquisition Funnels", "Attribution Modeling", "Campaign ROI Tracking", "Brand Market Positioning"],
    deliverables: ["Digital growth roadmap", "Multi-channel funnel architecture", "Attribution dashboard setup", "Monthly ROI performance reports"],
    techStack: ["GA4", "Google Tag Manager", "HubSpot", "Looker Studio"],
  },
  {
    id: "seo-services",
    title: "Search Engine Optimization (SEO)",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    icon: HiMagnifyingGlass,
    accentColor: "text-emerald-400",
    bgGradient: "from-emerald-500/15 via-teal-500/05 to-transparent",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    tagline: "Rank Higher on Google & Drive Qualified Organic Search Traffic",
    description: "Technical SEO audits, topical keyword clusters, Schema markup, and high-authority link acquisition for top rankings.",
    capabilities: ["Technical SEO Audits", "On-Page Schema Markup", "Topical Keyword Clustering", "High-Authority Link Strategy", "Core Web Vitals Speed"],
    deliverables: ["Technical SEO audit report", "Keyword ranking target roadmap", "Schema markup implementation", "Monthly organic traffic reports"],
    techStack: ["Ahrefs", "Semrush", "Google Search Console", "Screaming Frog"],
  },
  {
    id: "ppc-advertising",
    title: "PPC & Paid Search Advertising",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    icon: HiCurrencyDollar,
    accentColor: "text-blue-400",
    bgGradient: "from-blue-500/15 via-indigo-500/05 to-transparent",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    tagline: "Targeted Paid Campaigns with Measurable High ROAS",
    description: "High-ROI Google Ads, LinkedIn B2B lead generation, and Meta retargeting campaigns optimized for lowest CAC.",
    capabilities: ["Google Search & PMax Ads", "LinkedIn B2B Lead Gen Ads", "Meta Paid Retargeting", "Negative Keyword Pruning", "Landing Page AB Testing"],
    deliverables: ["Configured ad campaign accounts", "High-converting ad copy & creatives", "Conversion tracking pixel setup", "Weekly ROAS & CAC reports"],
    techStack: ["Google Ads", "Meta Ads Manager", "LinkedIn Ads", "Google Tag Manager"],
  },
  {
    id: "aso-services",
    title: "App Store Optimization (ASO)",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    icon: HiDevicePhoneMobile,
    accentColor: "text-purple-400",
    bgGradient: "from-purple-500/15 via-pink-500/05 to-transparent",
    borderHover: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    tagline: "Boost App Visibility, Keyword Ranking & Organic Installs",
    description: "Optimize App Store and Google Play listings to rank for high-intent keywords and maximize download conversion rates.",
    capabilities: ["App Title & Keyword Tuning", "Screenshot & Icon AB Testing", "Keyword Search Velocity", "Review & Rating Optimization", "Storefront Localization"],
    deliverables: ["ASO keyword research roadmap", "Optimized screenshot & icon assets", "Competitor store benchmark report", "Bi-weekly install growth reports"],
    techStack: ["AppTweak", "Sensor Tower", "App Store Connect", "Play Console"],
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    icon: HiGlobeAlt,
    accentColor: "text-sky-400",
    bgGradient: "from-sky-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]",
    tagline: "Grow Brand Reach & Audience Engagement Across Platforms",
    description: "Strategic B2B thought leadership, viral short-form content, and community engagement on LinkedIn, X, and Meta.",
    capabilities: ["Content Calendar Strategy", "LinkedIn B2B Thought Leadership", "Community Management", "Short-Form Video Production", "Influencer Partnerships"],
    deliverables: ["Monthly social content calendar", "Custom branded visual graphics", "Community engagement monitoring", "Monthly engagement analytics"],
    techStack: ["LinkedIn", "Twitter / X", "Meta Business Suite", "Buffer"],
  },
  {
    id: "conversion-rate-optimization",
    title: "Conversion Rate Optimization (CRO)",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    icon: HiArrowTrendingUp,
    accentColor: "text-emerald-400",
    bgGradient: "from-emerald-500/15 via-teal-500/05 to-transparent",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    tagline: "Turn More Visitors into Customers with Data-Driven CRO",
    description: "Eliminate checkout friction, test landing page variations, and double conversion rates with empirical A/B testing.",
    capabilities: ["A/B & Multivariate Testing", "Checkout Friction Removal", "Form Completion Rate Audits", "Heatmap & Session Replay", "Micro-Copy Optimization"],
    deliverables: ["CRO audit & friction report", "A/B test experiment designs", "High-converting landing page layouts", "Conversion lift benchmark metrics"],
    techStack: ["Hotjar", "VWO", "Google Analytics", "GA4 Funnels"],
  },
  {
    id: "content-marketing-services",
    title: "Content Marketing Strategy",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    icon: HiDocumentText,
    accentColor: "text-indigo-400",
    bgGradient: "from-indigo-500/15 via-blue-500/05 to-transparent",
    borderHover: "hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
    tagline: "SEO-Driven Content Architecture Driving Inbound Inquiries",
    description: "Publish technical whitepapers, pillar articles, case studies, and lead magnets that establish industry authority.",
    capabilities: ["Technical Whitepapers & Ebooks", "SEO Pillar & Cluster Articles", "Case Study Production", "Lead Magnet Funnels", "Editorial Content Calendars"],
    deliverables: ["SEO topical content roadmap", "Published long-form pillar articles", "Lead capture ebook assets", "Editorial performance dashboard"],
    techStack: ["WordPress", "Ghost", "Surfer SEO", "Grammarly"],
  },
  {
    id: "email-marketing-services",
    title: "Email Marketing & Automation",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    icon: HiEnvelope,
    accentColor: "text-pink-400",
    bgGradient: "from-pink-500/15 via-rose-500/05 to-transparent",
    borderHover: "hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]",
    tagline: "Targeted Lifecycle Campaigns That Nurture Leads & Boost Retention",
    description: "Automated onboarding sequences, lead nurturing drip funnels, and re-engagement workflows that maximize customer LTV.",
    capabilities: ["Automated Drip Sequences", "Lead Nurturing Workflows", "Behavioral Segmentation", "Deliverability & DKIM Setup", "Re-Engagement Campaigns"],
    deliverables: ["Custom email drip sequences", "Branded HTML email templates", "Audience segmentation rules", "Open & click-through analytics"],
    techStack: ["HubSpot", "Klaviyo", "Mailchimp", "SendGrid"],
  },
];

// Category metadata
const categoriesData = [
  { id: "all", label: "All 50 Solutions", count: 50 },
  { id: "software", label: "Software Development", count: 10 },
  { id: "cloud", label: "Cloud & DevOps", count: 10 },
  { id: "ai", label: "AI & Data Intelligence", count: 8 },
  { id: "salesforce", label: "Salesforce Solutions", count: 8 },
  { id: "design", label: "Design & Experience", count: 6 },
  { id: "marketing", label: "Digital Marketing", count: 8 },
];

// 8-Step Lifecycle Process
const processSteps = [
  {
    num: "01",
    title: "Discovery & Requirements",
    desc: "We start by understanding your objectives, users, challenges, integrations, and the outcomes you expect.",
    keys: ["Requirements analysis", "Business discovery", "Technical assessment"],
  },
  {
    num: "02",
    title: "Strategy & Planning",
    desc: "Requirements become a practical product roadmap and a technical plan your team can act on.",
    keys: ["Product strategy", "Technology selection", "Architecture", "Roadmap"],
  },
  {
    num: "03",
    title: "UI/UX Design",
    desc: "User journeys and interfaces that are intuitive, accessible, and aligned with your product goals.",
    keys: ["UX research", "User flows", "Wireframes", "Prototypes", "Design systems"],
  },
  {
    num: "04",
    title: "Development",
    desc: "Engineering with scalable architecture, secure coding practices, modern technologies, and agile delivery.",
    keys: ["Frontend", "Backend", "Mobile", "APIs", "Databases", "AI integration"],
  },
  {
    num: "05",
    title: "Quality Assurance",
    desc: "Validation across functionality, usability, performance, security, integrations, and compatibility.",
    keys: ["Functional", "API", "Integration", "Performance", "Security", "UAT"],
  },
  {
    num: "06",
    title: "Deployment & Launch",
    desc: "Production readiness, infrastructure configuration, deployment, monitoring, and hands-on launch support.",
    keys: ["Cloud deployment", "CI/CD", "Monitoring", "Launch support"],
  },
  {
    num: "07",
    title: "Support, Maintenance & Scale",
    desc: "Our engagement continues after launch with support, optimization, enhancements, and scalability work.",
    keys: ["Maintenance", "Optimization", "Security updates", "Enhancements", "Scaling"],
  },
  {
    num: "08",
    title: "Measure & Iterate",
    desc: "Analytics, user feedback, and performance data turn into the next prioritized release.",
    keys: ["Analytics", "User feedback", "A/B testing", "Roadmap review", "Continuous delivery"],
  },
];

const continuousCycle = [
  { label: "Discover", icon: HiMagnifyingGlass },
  { label: "Plan", icon: HiCheckCircle },
  { label: "Design", icon: HiPaintBrush },
  { label: "Develop", icon: HiCommandLine },
  { label: "Test", icon: HiCheckBadge },
  { label: "Launch", icon: HiRocketLaunch },
  { label: "Support", icon: HiShieldCheck },
  { label: "Improve", icon: HiArrowTrendingUp },
  { label: "Repeat", icon: HiArrowPath },
];

// Technology Expertise Matrix
const techMatrix = [
  {
    category: "Web & Application",
    icon: HiComputerDesktop,
    skills: ["React 19", "Next.js 16", "Node.js", "TypeScript", "Tailwind CSS", "GraphQL"],
  },
  {
    category: "Mobile",
    icon: HiDevicePhoneMobile,
    skills: ["iOS (Swift)", "Android (Kotlin)", "Flutter", "React Native", "PWA", "SQLite"],
  },
  {
    category: "AI & Data",
    icon: HiCpuChip,
    skills: ["Generative AI", "Machine Learning", "Data Science", "RAG", "AI Agents", "Python"],
  },
  {
    category: "Cloud & DevOps",
    icon: HiCloudArrowUp,
    skills: ["AWS", "Azure", "Docker", "Kubernetes (EKS)", "Terraform", "CI/CD Automation"],
  },
  {
    category: "Enterprise",
    icon: HiBuildingOffice2,
    skills: ["Salesforce", "Custom ERP", "REST / gRPC APIs", "Enterprise SSO", "Kafka"],
  },
  {
    category: "Data & Storage",
    icon: HiCircleStack,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "pgvector"],
  },
];

// Industries We Serve
const industriesData = [
  {
    name: "Financial Services & FinTech",
    desc: "Secure financial applications, payment gateway integrations, digital KYC, and ledgers.",
    icon: HiBuildingOffice2,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "Healthcare & Digital Health",
    desc: "HIPAA-compliant patient portals, EHR health records, and telehealth consultations.",
    icon: HiHeart,
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    name: "Retail & E-Commerce",
    desc: "Multi-vendor marketplaces, real-time inventory synchronization, and custom checkouts.",
    icon: HiShoppingBag,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    name: "Logistics & Transportation",
    desc: "Real-time fleet tracking, automated route dispatching, and delivery partner dashboards.",
    icon: HiTruck,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    name: "Manufacturing & Supply Chain",
    desc: "Enterprise resource planning, factory workflow automation, and telemetry tracking.",
    icon: HiBuildingStorefront,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    name: "Education & EdTech",
    desc: "Interactive learning platforms, automated quiz grading, and student management systems.",
    icon: HiAcademicCap,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    name: "Real Estate & PropTech",
    desc: "Property listing platforms, 360° virtual tours, agent CRM portals, and lead routing.",
    icon: HiHomeModern,
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    name: "SaaS & Technology",
    desc: "Multi-tenant cloud platforms, developer APIs, subscription engines, and AI microservices.",
    icon: HiRocketLaunch,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    name: "Travel & Hospitality",
    desc: "Custom booking engines, flight/hotel aggregation APIs, and guest loyalty platforms.",
    icon: HiGlobeAlt,
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    name: "Government & Enterprise",
    desc: "Secure public-sector portals, digital transformation pipelines, and high-concurrency apps.",
    icon: HiShieldCheck,
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
  },
];

// Why NexoraLab Pillars
const whyPillars = [
  {
    title: "End-to-End Technology Expertise",
    desc: "Strategy, UI/UX, development, AI, cloud, testing, deployment, marketing, and support — across the full product lifecycle.",
    icon: HiBolt,
  },
  {
    title: "Business-Focused Engineering",
    desc: "We build around business objectives, user requirements, operational challenges, and measurable outcomes.",
    icon: HiChartBar,
  },
  {
    title: "AI-Ready Development",
    desc: "Generative AI, AI agents, RAG, automation, intelligent search, and machine learning inside modern applications.",
    icon: HiCpuChip,
  },
  {
    title: "Scalable Architecture",
    desc: "Designed for scalability, performance, security, integrations, and long-term maintainability.",
    icon: HiArrowTrendingUp,
  },
  {
    title: "Enterprise-Grade Solutions",
    desc: "An approach suited to complex systems, security requirements, integrations, and evolving business needs.",
    icon: HiShieldCheck,
  },
  {
    title: "Agile & Collaborative Delivery",
    desc: "We work with your stakeholders through discovery, design, development, testing, and continuous improvement.",
    icon: HiCheckBadge,
  },
  {
    title: "Global Technology Partner",
    desc: "Partnering with ambitious startups, scaling scaleups, and enterprises across international markets.",
    icon: HiGlobeAlt,
  },
  {
    title: "Proven Development Experience",
    desc: "Mobile apps, websites, custom software, SaaS platforms, enterprise applications, and AI solutions.",
    icon: HiSparkles,
  },
];

// 15 FAQs
const servicesFaqs = [
  {
    q: "What software development services does NexoraLab Technologies provide?",
    a: "NexoraLab Technologies provides end-to-end software development services across 6 core divisions: Software Development (custom web, iOS, Android, Flutter), Cloud & DevOps (AWS, migration, CI/CD, Kubernetes), AI & Data Intelligence (GenAI, ML, RAG, AI agents), Salesforce Solutions, UI/UX Product Design, and Digital Marketing.",
  },
  {
    q: "Does NexoraLab Technologies provide end-to-end software development?",
    a: "Yes. Our capabilities cover the complete product lifecycle, including discovery, strategy, UI/UX design, development, quality assurance, deployment, support, maintenance, and continuous improvement.",
  },
  {
    q: "Does NexoraLab Technologies develop custom software?",
    a: "Yes. We develop customized software around specific business processes, workflows, integrations, users, and scalability requirements.",
  },
  {
    q: "Does NexoraLab Technologies provide AI development services?",
    a: "Yes. Our AI capabilities include Generative AI applications, AI agents, RAG-based solutions, AI chatbots, intelligent automation, machine learning, predictive analytics, and AI integration.",
  },
  {
    q: "Can you develop a SaaS product from scratch?",
    a: "Yes. We support SaaS development from product discovery and architecture through UI/UX, development, cloud deployment, integrations, subscription management, billing, and ongoing optimization.",
  },
  {
    q: "Does NexoraLab Technologies provide AWS cloud services?",
    a: "Yes. Our AWS and cloud services include cloud architecture, AWS migration, application modernization, infrastructure management, cloud-native development, security, DevOps, CI/CD, and managed cloud services.",
  },
  {
    q: "Do you provide UI/UX design along with development?",
    a: "Yes. Our UI/UX and product design teams can work alongside engineering teams to design complete digital experiences for web, mobile, SaaS, and enterprise applications.",
  },
  {
    q: "Do you provide Salesforce consulting?",
    a: "Yes. We provide Salesforce consulting, implementation, customization, integrations, Sales Cloud, Service Cloud, Lightning migration, workflow automation, and CRM modernization services.",
  },
  {
    q: "Can you modernize a legacy application?",
    a: "Yes. We assess existing applications and help modernize architecture, interfaces, infrastructure, integrations, and functionality while considering business continuity and migration requirements.",
  },
  {
    q: "Do you provide cybersecurity services?",
    a: "Yes. We provide cybersecurity capabilities including application security, cloud security, security assessments, vulnerability assessments, secure development practices, and infrastructure security.",
  },
  {
    q: "Do you provide digital marketing services?",
    a: "Yes. Our digital marketing services include SEO, PPC, SEM, ASO, social media marketing, content marketing, digital advertising, and performance marketing.",
  },
  {
    q: "What is your software development process?",
    a: "Our process follows a continuous lifecycle: Discovery, Strategy and Planning, UI/UX Design, Development, Quality Assurance, Deployment, Support and Scale, and Continuous Improvement.",
  },
  {
    q: "Do you work with startups and enterprises?",
    a: "Yes. We work with startups, growing businesses, and enterprises that need custom digital products, SaaS platforms, AI solutions, enterprise applications, cloud modernization, and technology transformation.",
  },
  {
    q: "How much does software development cost?",
    a: "The cost depends on project scope, features, integrations, technology requirements, design complexity, team composition, security requirements, and timeline. A project assessment is required to provide an accurate estimate.",
  },
  {
    q: "Do you provide software maintenance and support?",
    a: "Yes. We provide ongoing application maintenance, technical support, performance optimization, security updates, feature enhancements, bug fixes, and scaling support.",
  },
];

const ServicesPage: React.FC = () => {
  const { openQuoteModal, openBrochureModal } = useModal();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync with URL hash (e.g. #cloud, #software, #ai, #salesforce, #design, #marketing, or specific service id like #cloud-migration-services)
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    if (["software", "cloud", "ai", "salesforce", "design", "marketing"].includes(hash)) {
      setActiveFilter(hash);
      const elem = document.getElementById("services-catalog");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const target = allServices.find((s) => s.id === hash);
      if (target) {
        setActiveFilter(target.category);
        setTimeout(() => {
          const elem = document.getElementById(hash);
          if (elem) {
            elem.scrollIntoView({ behavior: "smooth", block: "center" });
            elem.classList.add("ring-2", "ring-[#00D2FF]", "ring-offset-2", "ring-offset-[#060c1c]");
            setTimeout(() => {
              elem.classList.remove("ring-2", "ring-[#00D2FF]", "ring-offset-2", "ring-offset-[#060c1c]");
            }, 3000);
          }
        }, 150);
      }
    }
  }, [location.hash]);

  const filteredServices = allServices.filter((s) => {
    const matchesCategory = activeFilter === "all" || s.category === activeFilter;
    const matchesQuery =
      searchQuery.trim() === "" ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.capabilities.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <>
      <SEO
        title="Software Development & AI Services Catalog | NexoraLab Technologies"
        description="Explore 50+ end-to-end software development, cloud infrastructure, AI, Salesforce, UI/UX design, and digital marketing services from NexoraLab Technologies in Siwan, Bihar, India."
        keywords={[
          "custom software development services",
          "web application development company",
          "React 19 development services",
          "Next.js full stack development",
          "mobile application development Flutter React Native",
          "AI and machine learning development services",
          "cloud infrastructure AWS Azure DevOps",
          "enterprise ERP CRM software development",
          "UI UX product design agency",
          "software testing and QA automation",
          "hire dedicated software developers",
          "IT consulting services Siwan Bihar",
          "digital marketing and SEO services",
          "Salesforce CRM integration",
          "microservices API development",
        ]}
        canonical="https://nexoralabtechnologies.in/services"
      />

      <div className="relative min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-20">
        {/* Background Animated Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
        <div className="absolute top-[800px] left-10 w-[500px] h-[450px] rounded-full bg-[#7C3AED]/08 blur-[170px] pointer-events-none" />
        <div className="absolute top-[1600px] right-10 w-[500px] h-[450px] rounded-full bg-[#00D2FF]/08 blur-[170px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-[#00D2FF] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#00D2FF]">Services Catalog</span>
          </div>

          {/* ============================================
              1. HERO SECTION (With Deliverables Panel)
             ============================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                <HiSparkles />
                <span>50+ Core Engineering & Digital Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12]">
                End-to-End Software Development,{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                  AI & Digital Solutions
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                NexoraLab Technologies helps startups, scaleups, and enterprises build, modernize, and scale digital products across 6 specialized divisions — from custom software and mobile applications to AWS cloud infrastructure, Salesforce CRM, Generative AI, and digital growth.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={openQuoteModal}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <HiPaperAirplane className="text-sm" />
                  <span>Get Project Quote</span>
                </button>

                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  <span>View Our Work</span>
                  <HiArrowRight className="text-sm" />
                </Link>

                <button
                  onClick={openBrochureModal}
                  className="rounded-full border border-cyan-500/20 bg-cyan-950/20 px-5 py-3.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/10 transition cursor-pointer"
                >
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Right Hero Deliverables Panel */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#07132b]/95 via-[#060b18]/90 to-[#040814]/95 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden">
                <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none" />

                <h2 className="text-lg sm:text-xl font-black text-white font-['Outfit'] mb-4 flex items-center gap-2">
                  <HiCheckCircle className="text-[#00D2FF]" />
                  <span>6 Specialized Service Divisions</span>
                </h2>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition">
                    <HiCommandLine className="text-[#00D2FF] text-lg shrink-0 mt-0.5" />
                    <span><strong>Software Development:</strong> 10 Web, Mobile & Custom Solutions</span>
                  </li>
                  <li className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition">
                    <HiCloud className="text-[#00D2FF] text-lg shrink-0 mt-0.5" />
                    <span><strong>Cloud & DevOps:</strong> 10 AWS, Migration & CI/CD Solutions</span>
                  </li>
                  <li className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition">
                    <HiCpuChip className="text-[#00D2FF] text-lg shrink-0 mt-0.5" />
                    <span><strong>AI & Data Intelligence:</strong> 8 GenAI, ML & RAG Solutions</span>
                  </li>
                  <li className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition">
                    <FaSalesforce className="text-[#00D2FF] text-lg shrink-0 mt-0.5" />
                    <span><strong>Salesforce Solutions:</strong> 8 LWC, CRM & Cloud Systems</span>
                  </li>
                  <li className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition">
                    <HiPaintBrush className="text-[#00D2FF] text-lg shrink-0 mt-0.5" />
                    <span><strong>Design & Experience:</strong> 6 UI/UX & Product Design Systems</span>
                  </li>
                  <li className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition">
                    <HiChartBar className="text-[#00D2FF] text-lg shrink-0 mt-0.5" />
                    <span><strong>Digital Marketing:</strong> 8 High-ROI SEO, PPC & Growth Services</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Dedicated Delivery Pods</span>
                  </span>
                  <Link to="/meeting" className="font-bold text-[#00D2FF] hover:underline">
                    Book Architecture Call →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================
              2. 50 COMPLETE SERVICES CATALOG (Grid Cards)
             ============================================ */}
          <div className="mt-28" id="services-catalog">
            <div className="text-center max-w-4xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                <span>Complete Services Catalog</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                Explore all{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                  50 specialized engineering capabilities
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                Every service listed in our navigation menu is backed by dedicated in-house senior architects, production-tested blueprints, and guaranteed milestone delivery.
              </p>
            </div>

            {/* Category Filter Tabs & Search Bar */}
            <div className="mt-10 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Search Box */}
                <div className="relative w-full sm:w-80">
                  <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 50+ services (e.g. AWS, React, AI, SEO)..."
                    className="w-full rounded-full border border-white/15 bg-[#091124] pl-10 pr-10 py-2 text-xs text-white placeholder-slate-400 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <HiXMark className="text-sm" />
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Showing <span className="text-[#00D2FF] font-bold">{filteredServices.length}</span> of 50 Services
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none no-scrollbar justify-start sm:justify-center border-b border-white/10">
                {categoriesData.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] scale-105"
                          : "bg-[#091124] text-slate-300 hover:text-white hover:bg-[#0e1d3e] border border-white/10"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          isActive ? "bg-white/20 text-white" : "bg-white/5 text-slate-400"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && (
              <div className="mt-16 text-center py-16 rounded-3xl border border-white/10 bg-[#070e1e]/80">
                <HiCommandLine className="mx-auto text-4xl text-slate-500 mb-3" />
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  No matching services found for "{searchQuery}"
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Try searching with different keywords like AWS, Flutter, AI, Salesforce, or reset filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* 50 Services Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredServices.map((svc) => {
                const SvcIcon = svc.icon;
                return (
                  <motion.article
                    key={svc.id}
                    id={svc.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-3xl border border-white/10 bg-[#080f22] p-6 sm:p-7 shadow-xl flex flex-col justify-between transition-all duration-300 ${svc.borderHover} group relative overflow-hidden scroll-mt-40`}
                  >
                    <div>
                      {/* Service Icon & Category */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 shadow-inner group-hover:scale-110 group-hover:bg-[#00D2FF] group-hover:text-black transition-all">
                          <SvcIcon className="text-2xl text-[#00D2FF] group-hover:text-black transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                          {svc.categoryLabel}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-['Outfit'] leading-snug">
                        {svc.title}
                      </h3>

                      <p className="text-xs font-semibold text-cyan-400/90 mt-1 font-mono">
                        {svc.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-normal">
                        {svc.description}
                      </p>

                      {/* Capabilities Pill List */}
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Key Capabilities:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {svc.capabilities.map((cap, idx) => (
                            <span
                              key={idx}
                              className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-[11px] text-slate-300 font-medium group-hover:border-cyan-500/30 transition"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedService(svc)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D2FF] hover:text-white transition-colors cursor-pointer group-hover:translate-x-1"
                      >
                        <span>View Scope</span>
                        <HiArrowRight className="text-xs" />
                      </button>

                      <button
                        onClick={openQuoteModal}
                        className="rounded-xl bg-white/5 border border-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-slate-300 hover:bg-gradient-to-r hover:from-[#00D2FF] hover:to-[#0066FF] hover:text-white hover:border-transparent transition-all cursor-pointer"
                      >
                        Request Quote
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* ============================================
              3. HOW WE WORK (8-Step Development Lifecycle)
             ============================================ */}
          <div className="mt-32" id="process">
            <div className="text-center max-w-4xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                <span>How We Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                From idea to launch —{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                  a complete development lifecycle
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                Business strategy, product design, engineering, quality assurance, deployment, and ongoing support in one continuous cycle.
              </p>
            </div>

            {/* 8 Process Cards Grid */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-[#070e1e]/85 p-6 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,210,255,0.1)] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-black text-[#00D2FF] font-mono">
                      {step.num}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 font-['Outfit']">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5">
                    {step.keys.map((k, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <HiCheckCircle className="text-cyan-400 text-xs shrink-0" />
                        <span>{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Continuous Improvement Loop Track */}
            <div className="mt-14 rounded-3xl border border-white/15 bg-gradient-to-r from-[#060b18] via-[#0a1836] to-[#060b18] p-8 shadow-2xl">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Continuous Improvement Cycle
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Software development does not end at launch. User feedback, analytics, performance data, and new business requirements feed straight back into the next iteration.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {continuousCycle.map((node, i) => {
                  const NodeIcon = node.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-xs font-bold text-slate-200 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
                        <NodeIcon className="text-cyan-400 text-sm" />
                        <span>{node.label}</span>
                      </div>
                      {i < continuousCycle.length - 1 && (
                        <span className="text-slate-600 text-xs font-bold">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ============================================
              4. TECHNOLOGY EXPERTISE MATRIX
             ============================================ */}
          <div className="mt-32" id="technology">
            <div className="text-center max-w-4xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                <span>Technology Expertise</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                The right stack for{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                  your requirements
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                We choose technology based on business requirements, product complexity, scalability goals, security needs, and the ecosystem you already run.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techMatrix.map((item, idx) => {
                const CategoryIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl border border-white/10 bg-[#070e1e]/85 p-7 backdrop-blur-xl hover:border-cyan-500/40 transition"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-[#00D2FF] text-xl">
                        <CategoryIcon />
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Outfit']">
                        {item.category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================
              5. INDUSTRIES WE SERVE (10 Sectors)
             ============================================ */}
          <div className="mt-32" id="industries">
            <div className="text-center max-w-4xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                <span>Industries We Serve</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                Digital solutions built for{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                  your sector
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                We deliver tailored digital platforms, mobile applications, healthcare systems, e-commerce, and SaaS solutions engineered for sector-specific regulatory standards.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {industriesData.map((ind, idx) => {
                const IndIcon = ind.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl border border-white/10 bg-[#070e1e]/85 p-5 backdrop-blur-xl hover:border-cyan-500/40 transition flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${ind.bg} ${ind.color} text-2xl mb-4`}
                      >
                        <IndIcon />
                      </div>
                      <h3 className="text-sm font-bold text-white font-['Outfit']">
                        {ind.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-normal">
                        {ind.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================
              6. WHY NEXORALAB (8 Pillars)
             ============================================ */}
          <div className="mt-32" id="why-nexoralab">
            <div className="text-center max-w-4xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                <span>Why NexoraLab Technologies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                Engineering that answers to{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                  business outcomes
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                Eight foundational reasons why industry leaders and high-growth startups choose us as their continuous engineering partner.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyPillars.map((pillar, idx) => {
                const PillarIcon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl border border-white/10 bg-[#070e1e]/85 p-6 backdrop-blur-xl hover:border-cyan-500/40 transition"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-[#00D2FF] text-2xl mb-4">
                      <PillarIcon />
                    </div>
                    <h3 className="text-base font-bold text-white font-['Outfit']">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================
              7. TRACK RECORD & PROVEN EXPERIENCE LEDGER
             ============================================ */}
          <div className="mt-28 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0a1e42] via-[#070e1e] to-[#040814] p-8 sm:p-12 shadow-2xl backdrop-blur-2xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                ✦ Proven Development Experience
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1 font-['Outfit']">
                Track Record Across Mobile, Web and Enterprise
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Our experience spans mobile applications, websites, custom software, SaaS platforms, enterprise applications, and AI solutions worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-cyan-500/10 text-[#00D2FF] text-2xl mb-3">
                  <HiDevicePhoneMobile />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white font-['Outfit']">
                  1,500+
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Mobile Apps Developed
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 text-2xl mb-3">
                  <HiComputerDesktop />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white font-['Outfit']">
                  820+
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Websites & SaaS Platforms
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 text-2xl mb-3">
                  <HiSparkles />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white font-['Outfit']">
                  700+
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Unique AI Features & Workflows
                </div>
              </div>
            </div>
          </div>

          {/* ============================================
              8. HIGH-CONVERTING CTA BANNER ("LET'S BUILD")
             ============================================ */}
          <div className="mt-28 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-[#00D2FF]/15 via-[#0066FF]/20 to-[#7C3AED]/20 p-8 sm:p-14 shadow-[0_0_40px_rgba(0,210,255,0.2)] text-center relative overflow-hidden backdrop-blur-2xl">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-block rounded-full bg-cyan-500/20 border border-cyan-500/40 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                Let's Build Together
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-['Outfit']">
                Build, modernize & scale your{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                  digital product
                </span>
              </h2>
              <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-normal">
                Launching a new software product, developing an enterprise application, modernizing legacy technology, migrating to AWS, building a SaaS platform, or integrating AI into an existing system — NexoraLab Technologies can help.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={openQuoteModal}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <HiPaperAirplane className="text-base" />
                  <span>Talk to Our Team</span>
                </button>

                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-xs sm:text-sm font-bold text-white transition hover:bg-white/20"
                >
                  <span>View Our Work</span>
                  <HiArrowRight className="text-base" />
                </Link>

                <Link
                  to="/meeting"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-6 py-4 text-xs sm:text-sm font-bold text-cyan-300 hover:bg-cyan-500/20 transition"
                >
                  <span>Book 30-Min Call</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ============================================
              9. FREQUENTLY ASKED QUESTIONS (15 Exact FAQs)
             ============================================ */}
          <div className="mt-32" id="faq">
            <div className="text-center max-w-4xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                Answers before you{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                  get in touch
                </span>
              </h2>
            </div>

            <div className="mt-12 max-w-4xl mx-auto space-y-4">
              {servicesFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#070e1e]/85 backdrop-blur-xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white hover:text-[#00D2FF] transition cursor-pointer"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <HiChevronDown
                        className={`text-lg text-cyan-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 font-normal">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          10. INTERACTIVE SERVICE DETAIL MODAL
         ============================================ */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-3xl rounded-3xl border border-cyan-500/30 bg-[#070e1e] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-[#00D2FF] text-2xl">
                    <selectedService.icon />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                      {selectedService.title}
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono">
                      {selectedService.tagline}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <HiXMark className="text-2xl" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Service Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Core Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-xs text-slate-200 font-medium"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Key Deliverables & Standards
                  </h4>
                  <div className="space-y-2">
                    {selectedService.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-200"
                      >
                        <HiCheckCircle className="text-[#00D2FF] text-base shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Technology & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to="/meeting"
                    onClick={() => setSelectedService(null)}
                    className="text-xs font-bold text-[#00D2FF] hover:underline"
                  >
                    Schedule Architecture Discovery Call →
                  </Link>

                  <button
                    onClick={() => {
                      setSelectedService(null);
                      openQuoteModal();
                    }}
                    className="rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:scale-105 transition cursor-pointer"
                  >
                    Request Project Estimate
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServicesPage;
