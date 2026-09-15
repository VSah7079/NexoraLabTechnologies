import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiArrowUpRight,
  HiDevicePhoneMobile,
  HiCpuChip,
  HiBuildingOffice,
  HiCloudArrowUp,
  HiPaintBrush,
  HiArrowTrendingUp,
  HiShieldCheck,
  HiComputerDesktop,
  HiCheckBadge,
  HiUserGroup,
  HiMagnifyingGlass,
  HiSparkles,
  HiCheckCircle,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";

export interface SubService {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  isPopular?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  subservices: SubService[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "software",
    name: "Custom Software Development",
    shortName: "Software",
    icon: HiComputerDesktop,
    tagline: "High-Performance Web, Enterprise SaaS & Backend Engineering",
    description:
      "Full-cycle custom software development, modern web applications, scalable multi-tenant SaaS platforms, and high-throughput microservices built for enterprise resilience.",
    subservices: [
      {
        title: "Custom Software Engineering",
        description:
          "Bespoke business applications, automated operational workflow engines, and distributed backend systems tailored to your unique specifications.",
        tags: ["Microservices", "REST & GraphQL", "Node.js & Go", "PostgreSQL"],
        isPopular: true,
      },
      {
        title: "Web Application Development",
        description:
          "High-performance client portals, dashboards, and enterprise web applications engineered on React 19, Next.js 16, and TypeScript.",
        tags: ["Next.js 16", "React 19", "TypeScript", "SSR / SSG"],
        isPopular: true,
      },
      {
        title: "Enterprise SaaS Product Dev",
        description:
          "End-to-end multi-tenant SaaS architecture with automated Stripe/Razorpay billing, tenant data isolation, and granular RBAC permissions.",
        tags: ["Multi-Tenant", "Stripe Billing", "RBAC", "Usage Metering"],
        isPopular: true,
      },
      {
        title: "CMS & Enterprise Portal Dev",
        description:
          "Scalable headless content management systems, internal knowledge bases, and role-based company intranets with granular permissions.",
        tags: ["Headless CMS", "Strapi", "Custom Admin", "Role Permissions"],
      },
      {
        title: "API & Microservices Architecture",
        description:
          "Low-latency, fault-tolerant RESTful and gRPC microservice backends with Kafka and Redis messaging queues for high concurrent loads.",
        tags: ["gRPC", "Kafka", "Redis Queues", "FastAPI"],
      },
      {
        title: "Application Modernization & Refactoring",
        description:
          "Seamlessly refactoring legacy monolithic architectures into modular, cloud-native microservices with zero downtime and clean code.",
        tags: ["Monolith to Cloud", "Code Refactor", "Zero Downtime", "Clean Code"],
      },
      {
        title: "App Maintenance & 24/7 SLA Support",
        description:
          "Round-the-clock proactive telemetry monitoring, regular security audits, database indexing, and continuous performance tuning.",
        tags: ["24/7 SLA", "Security Patches", "Database Tuning", "99.9% Uptime"],
      },
      {
        title: "ERP & Business Process Automation",
        description:
          "Custom enterprise resource planning systems integrating inventory management, accounting, automated approvals, and supply chain.",
        tags: ["Custom ERP", "Workflow Automation", "Inventory", "Accounting"],
      },
    ],
  },
  {
    id: "mobile",
    name: "Mobile App Development",
    shortName: "Mobile Apps",
    icon: HiDevicePhoneMobile,
    tagline: "Native iOS, Android & Cross-Platform Mobile Applications",
    description:
      "Full-cycle mobile app engineering across iOS (Swift), Android (Kotlin), Flutter, and React Native, delivering silky 60fps performance and intuitive interfaces.",
    subservices: [
      {
        title: "iOS Native App Development",
        description:
          "Native iPhone and iPad applications built in Swift and SwiftUI, seamlessly integrated with Apple Pay, FaceID, and Apple ecosystem APIs.",
        tags: ["Swift", "SwiftUI", "App Store", "CoreData / SwiftData"],
        isPopular: true,
      },
      {
        title: "Android Native App Development",
        description:
          "High-performance Android applications built in Kotlin with modern Jetpack Compose architecture and robust offline background sync.",
        tags: ["Kotlin", "Jetpack Compose", "Play Store", "Coroutines"],
        isPopular: true,
      },
      {
        title: "Flutter Cross-Platform Dev",
        description:
          "High-velocity cross-platform mobile apps engineered from a single codebase with Google's Flutter framework, reducing time-to-market by 50%.",
        tags: ["Flutter", "Dart", "Single Codebase", "60fps Render"],
        isPopular: true,
      },
      {
        title: "React Native App Development",
        description:
          "JavaScript and TypeScript-driven mobile applications delivering authentic native UI performance, shared logic, and rapid OTA updates.",
        tags: ["React Native", "Expo", "Native Modules", "Redux Toolkit"],
      },
      {
        title: "Progressive Web Apps (PWA)",
        description:
          "Lightweight, installable web applications with offline caching, push notifications, and fast loading across mobile and desktop browsers.",
        tags: ["PWA", "Service Workers", "Offline Sync", "Web Push"],
      },
      {
        title: "Hybrid Mobile App Development",
        description:
          "Cost-effective multi-platform hybrid applications built for rapid market validation, MVP testing, and cross-device consistency.",
        tags: ["Capacitor", "Ionic", "Hybrid UX", "Fast Launch"],
      },
      {
        title: "Wearable & IoT App Solutions",
        description:
          "Connected smartwatch companion apps (Apple Watch & Wear OS) and Bluetooth LE controller apps for smart hardware devices.",
        tags: ["WatchOS", "Wear OS", "Bluetooth LE", "IoT Telemetry"],
      },
      {
        title: "Mobile App Redesign & Modernization",
        description:
          "Upgrading legacy mobile apps to modern UI/UX design standards, faster boot times, reduced bundle size, and high store ratings.",
        tags: ["UI Overhaul", "Bundle Optimization", "Store Ratings", "Modernization"],
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps Solutions",
    shortName: "Cloud & DevOps",
    icon: HiCloudArrowUp,
    tagline: "Cloud-Native Infrastructure, CI/CD Automation & 24/7 Operations",
    description:
      "Enterprise cloud architecture, infrastructure as code (IaC), automated deployment pipelines, container orchestration, and zero-downtime cloud migration.",
    subservices: [
      {
        title: "Cloud Infrastructure & Architecture",
        description:
          "Multi-region, highly available cloud infrastructure design on AWS, Microsoft Azure, and Google Cloud Platform (GCP).",
        tags: ["AWS", "Azure", "GCP", "Multi-Region VPC"],
        isPopular: true,
      },
      {
        title: "DevOps & CI/CD Pipeline Automation",
        description:
          "Automated continuous integration and continuous deployment pipelines using GitHub Actions, GitLab CI, Docker, and ArgoCD.",
        tags: ["GitHub Actions", "Docker", "GitOps", "Automated Releases"],
        isPopular: true,
      },
      {
        title: "AWS Cloud Solutions & Migration",
        description:
          "Dedicated Amazon Web Services setups spanning EKS, Serverless Lambda, Aurora RDS, S3, CloudFront CDN, and IAM governance.",
        tags: ["AWS EKS", "Serverless Lambda", "Aurora RDS", "CloudFront"],
        isPopular: true,
      },
      {
        title: "Microsoft Azure Cloud Services",
        description:
          "Enterprise Azure VM deployment, Azure Kubernetes Service (AKS), Azure SQL, and Entra ID (Active Directory) hybrid integration.",
        tags: ["Azure AKS", "Azure DevOps", "Azure SQL", "Entra ID"],
      },
      {
        title: "Google Cloud Platform (GCP)",
        description:
          "Google Kubernetes Engine (GKE), BigQuery scalable data lakes, Cloud Run serverless microservices, and Firebase integration.",
        tags: ["GCP GKE", "BigQuery", "Cloud Run", "Firebase"],
      },
      {
        title: "Kubernetes & Container Orchestration",
        description:
          "Enterprise Kubernetes cluster deployment, Helm chart management, ingress routing, auto-scaling pods, and service meshes.",
        tags: ["Kubernetes", "Helm", "Istio", "Horizontal Pod Auto-Scale"],
      },
      {
        title: "24/7 Managed Cloud Operations",
        description:
          "Continuous telemetry monitoring with Prometheus, Grafana dashboards, automated alerts, and a strict 99.99% uptime guarantee.",
        tags: ["99.99% SLA", "Grafana", "Prometheus", "24/7 SRE"],
      },
      {
        title: "Cloud Cost Optimization (FinOps)",
        description:
          "Comprehensive cloud auditing, compute right-sizing, reserved capacity planning, and cutting cloud spend by up to 50%.",
        tags: ["FinOps", "Cost Reduction", "Rightsizing", "Reserved Instances"],
      },
    ],
  },
  {
    id: "ai",
    name: "AI & Data Intelligence",
    shortName: "AI & Data",
    icon: HiCpuChip,
    tagline: "Generative AI, Custom LLMs, Neural ATS & Predictive Analytics",
    description:
      "Enterprise artificial intelligence, custom retrieval-augmented generation (RAG) pipelines, proprietary ATS parsing algorithms, and predictive ML models.",
    subservices: [
      {
        title: "Generative AI & Custom LLMs",
        description:
          "Custom conversational AI assistants, automated document reasoning, enterprise Claude/GPT-4 integrations, and fine-tuned models.",
        tags: ["OpenAI GPT-4", "Claude 3.5", "RAG Pipelines", "Vector DB"],
        isPopular: true,
      },
      {
        title: "AI Talent Intelligence & ATS Engine",
        description:
          "NexoraLab's flagship ATS engine: sub-15ms resume parsing, neural skill extraction, automated score benchmarking, and voice mock interviews.",
        tags: ["15ms Latency", "ATS Scoring", "Skill Benchmarking", "Mock Voice AI"],
        link: "/resume-analyzer",
        isPopular: true,
      },
      {
        title: "Machine Learning & Predictive Models",
        description:
          "Predictive ML algorithms for customer churn forecasting, risk analysis, dynamic pricing, and intelligent recommendation systems.",
        tags: ["PyTorch", "Scikit-Learn", "FastAPI", "Predictive Analytics"],
        isPopular: true,
      },
      {
        title: "AI Autonomous Agents & Workflows",
        description:
          "Autonomous multi-agent pipelines (LangChain / AutoGen) that plan, execute tool actions, and automate complex human workflows.",
        tags: ["LangChain", "Autonomous Agents", "Tool Calling", "Automation"],
      },
      {
        title: "Computer Vision & OCR Intelligence",
        description:
          "High-accuracy document text extraction, invoice processing, identity card OCR, facial recognition, and automated verification.",
        tags: ["Computer Vision", "OCR Parsing", "OpenCV", "Document AI"],
      },
      {
        title: "Natural Language Processing (NLP)",
        description:
          "Sentiment analysis, multi-lingual translation, entity resolution, semantic search, and contextual document summarization.",
        tags: ["NLP Transformers", "HuggingFace", "Semantic Search", "Embeddings"],
      },
      {
        title: "Data Science & Executive BI",
        description:
          "Transforming raw enterprise databases into interactive PowerBI and Tableau dashboards with deep statistical business insights.",
        tags: ["PowerBI", "Tableau", "ETL Pipelines", "Data Analytics"],
      },
      {
        title: "Big Data Lakehouses & Streaming",
        description:
          "Distributed data lakehouse architectures with Apache Spark, real-time Kafka event streaming, and Snowflake data warehouses.",
        tags: ["Apache Spark", "Kafka Streams", "Snowflake", "Data Lakes"],
      },
    ],
  },
  {
    id: "salesforce",
    name: "Salesforce & Enterprise CRM",
    shortName: "Salesforce / CRM",
    icon: HiBuildingOffice,
    tagline: "Turnkey Salesforce Consulting, Lightning Migration & ERP Integrations",
    description:
      "Enterprise CRM architecture, custom Apex & Lightning Web Components (LWC), seamless ERP data synchronization, and automated sales funnels.",
    subservices: [
      {
        title: "Salesforce Consulting & Strategy",
        description:
          "Strategic CRM roadmap creation, operational process auditing, and tailored pipeline architecture planning for enterprise sales teams.",
        tags: ["CRM Roadmap", "Architecture Audit", "Advisory", "Best Practices"],
        isPopular: true,
      },
      {
        title: "Salesforce Implementation & Setup",
        description:
          "Turnkey Salesforce deployment, custom object configurations, role hierarchy mapping, data migration, and team onboarding.",
        tags: ["Turnkey Setup", "Data Migration", "Custom Objects", "Role Security"],
        isPopular: true,
      },
      {
        title: "Salesforce Customization & Apex",
        description:
          "Custom Apex classes, automated triggers, batch execution jobs, and Visualforce components tailored to complex business rules.",
        tags: ["Apex Triggers", "SOQL / SOSL", "Batch Jobs", "Custom Workflows"],
      },
      {
        title: "Lightning Migration & LWC Dev",
        description:
          "Upgrading legacy Salesforce Classic setups to modern Salesforce Lightning with high-performance Lightning Web Components (LWC).",
        tags: ["LWC", "Lightning Experience", "Modern UI", "Apex Controllers"],
        isPopular: true,
      },
      {
        title: "Salesforce & ERP API Integration",
        description:
          "Bi-directional real-time data sync connecting Salesforce with SAP, Oracle, HubSpot, QuickBooks, Stripe, and custom REST APIs.",
        tags: ["REST/SOAP APIs", "ERP Sync", "HubSpot", "Middleware"],
      },
      {
        title: "Sales Cloud & Revenue Operations",
        description:
          "Lead scoring automation, opportunity stage tracking, CPQ quote generation, and real-time executive revenue forecasting.",
        tags: ["Sales Cloud", "CPQ", "Lead Scoring", "Revenue Forecasts"],
      },
      {
        title: "Service Cloud & Customer Support",
        description:
          "Omnichannel customer support routing, AI self-service chatbots, knowledge base integration, and agent productivity consoles.",
        tags: ["Service Cloud", "Omnichannel", "Case Management", "Chatbots"],
      },
      {
        title: "Salesforce Managed Support & SLA",
        description:
          "Dedicated certified Salesforce administrators for ongoing user provisioning, sandbox deployments, reports, and security maintenance.",
        tags: ["Dedicated Admin", "24/7 Support", "Sandbox Deploy", "Security"],
      },
    ],
  },
  {
    id: "qa",
    name: "Quality Assurance & Testing",
    shortName: "QA & Testing",
    icon: HiCheckBadge,
    tagline: "Automated Testing, Manual QA, Load Testing & Security Audits",
    description:
      "Comprehensive end-to-end software testing, Playwright/Cypress test automation, cross-device mobile testing, and rigorous performance benchmarking.",
    subservices: [
      {
        title: "Automated QA & Test Engineering",
        description:
          "Robust automated regression and end-to-end test suites using Playwright, Cypress, and Selenium integrated directly into CI/CD.",
        tags: ["Playwright", "Cypress", "Selenium", "CI/CD Automation"],
        isPopular: true,
      },
      {
        title: "Manual & Exploratory QA Testing",
        description:
          "Thorough human functional testing, exploratory testing, edge case discovery, and user acceptance testing (UAT) before releases.",
        tags: ["Functional Testing", "UAT", "Edge Cases", "Bug Tracking"],
        isPopular: true,
      },
      {
        title: "Mobile App Testing & Device Lab",
        description:
          "Rigorous testing across 50+ real iOS and Android physical devices, diverse OS versions, screen resolutions, and network throttling.",
        tags: ["Device Matrix", "iOS & Android", "Network Throttling", "Battery"],
      },
      {
        title: "API & Microservices Testing",
        description:
          "Automated Postman and Newman test collections verifying JSON schemas, response codes, latency SLAs, and payload boundary cases.",
        tags: ["Postman", "Newman", "Schema Validation", "API Security"],
      },
      {
        title: "Performance, Load & Stress Testing",
        description:
          "Simulating up to 100,000+ concurrent virtual users with JMeter and k6 to identify server bottlenecks and database locks.",
        tags: ["k6", "JMeter", "100k Concurrency", "Stress Testing"],
        isPopular: true,
      },
      {
        title: "Shift-Left QA & Test Strategy",
        description:
          "Embedding automated test creation into early agile sprints to catch architectural bugs early and ensure zero-defect deployments.",
        tags: ["Shift-Left", "BDD / TDD", "Zero Defects", "Agile QA"],
      },
      {
        title: "Accessibility & WCAG Compliance",
        description:
          "Screen reader compatibility, keyboard navigation audits, color contrast verification, and WCAG 2.1 AA certification testing.",
        tags: ["WCAG 2.1", "Screen Readers", "Keyboard Nav", "Compliance"],
      },
      {
        title: "Cross-Browser & Responsive QA",
        description:
          "Pixel-perfect cross-browser verification across Chrome, Safari, Firefox, and Edge on all desktop and mobile viewport sizes.",
        tags: ["Cross-Browser", "Safari & Chrome", "Responsive Layouts", "Pixel Audit"],
      },
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Threat Defense",
    shortName: "Cybersecurity",
    icon: HiShieldCheck,
    tagline: "Penetration Testing, DevSecOps, Cloud Hardening & ISO Compliance",
    description:
      "Enterprise cybersecurity solutions, penetration testing, automated vulnerability assessments (VAPT), DevSecOps pipelines, and zero-trust security.",
    subservices: [
      {
        title: "Application Security & Code Audits",
        description:
          "Static and dynamic application security testing (SAST/DAST) and thorough source code reviews to eradicate OWASP vulnerabilities.",
        tags: ["SAST / DAST", "OWASP Top 10", "Code Audits", "Vulnerabilities"],
        isPopular: true,
      },
      {
        title: "Penetration Testing & Red Teaming",
        description:
          "Simulated real-world cyber attacks on web applications, mobile APIs, and cloud networks to discover and patch critical exploit vectors.",
        tags: ["Pen-Testing", "Ethical Hacking", "Red Teaming", "Exploit Defense"],
        isPopular: true,
      },
      {
        title: "Vulnerability Assessment (VAPT)",
        description:
          "Comprehensive automated and manual vulnerability scans with prioritized risk severity ratings and step-by-step remediation roadmaps.",
        tags: ["VAPT Scans", "CVE Tracking", "Remediation", "Executive Reports"],
      },
      {
        title: "DevSecOps Pipeline Hardening",
        description:
          "Injecting automated security scanners, container vulnerability scans, and secret leakage detection into CI/CD pipelines.",
        tags: ["DevSecOps", "Snyk", "GitGuardian", "Container Security"],
        isPopular: true,
      },
      {
        title: "Cloud Infrastructure Security",
        description:
          "Hardening AWS, Azure, and GCP environments with least-privilege IAM policies, KMS encryption at rest and in transit, and WAF rules.",
        tags: ["Cloud WAF", "KMS Encryption", "IAM Hardening", "VPC Security"],
      },
      {
        title: "Zero Trust Architecture & MFA",
        description:
          "Implementing zero-trust access policies, micro-segmentation, multi-factor authentication (MFA), and single sign-on (SSO).",
        tags: ["Zero Trust", "MFA / SSO", "Micro-Segmentation", "Identity"],
      },
      {
        title: "ISO 27001 & SOC2 Compliance",
        description:
          "Security gap analysis, audit documentation, and technical hardening to achieve ISO 27001, SOC 2, HIPAA, and GDPR compliance.",
        tags: ["ISO 27001", "SOC 2", "GDPR / HIPAA", "Compliance Audit"],
      },
      {
        title: "24/7 Threat Monitoring & WAF",
        description:
          "Continuous cloud security log telemetry, DDoS attack mitigation, Web Application Firewall (WAF) tuning, and incident triage.",
        tags: ["Cloudflare WAF", "DDoS Defense", "24/7 SIEM", "Incident Triage"],
      },
    ],
  },
  {
    id: "design",
    name: "UI/UX & Product Design",
    shortName: "UI/UX Design",
    icon: HiPaintBrush,
    tagline: "User-Centered Product Design, Design Systems & Clickable Figma Prototypes",
    description:
      "Modern UI/UX design, interactive Figma prototypes, scalable design token systems, user research, and conversion-optimized web and mobile experiences.",
    subservices: [
      {
        title: "UI/UX Product Design & Discovery",
        description:
          "In-depth user research, customer persona creation, user journey mapping, and high-conversion wireframes for web and mobile products.",
        tags: ["User Personas", "Journey Maps", "Wireframing", "Product Strategy"],
        isPopular: true,
      },
      {
        title: "Mobile App Interface Design",
        description:
          "Pixel-perfect iOS and Android mobile designs crafted according to Apple Human Interface Guidelines and Google Material Design 3.",
        tags: ["iOS HIG", "Material 3", "Micro-Animations", "Pixel Perfect"],
        isPopular: true,
      },
      {
        title: "Web Platform & Dashboard UX",
        description:
          "Clean, modern data visualization dashboards, analytics portals, and complex SaaS workflows engineered for effortless usability.",
        tags: ["Data Visualizations", "SaaS Dashboards", "Admin UI", "Clean UX"],
        isPopular: true,
      },
      {
        title: "Design Systems & Figma Libraries",
        description:
          "Standardized design token systems and modular Figma component libraries that maintain brand consistency and speed up engineering.",
        tags: ["Figma Tokens", "Component Library", "Storybook", "Scalable"],
      },
      {
        title: "Interactive Clickable Prototypes",
        description:
          "High-fidelity clickable Figma prototypes allowing stakeholders and investors to experience the full app before a single line of code.",
        tags: ["Clickable Demos", "Investor Prototypes", "Micro-Interactions"],
        isPopular: true,
      },
      {
        title: "UX Research & Usability Audits",
        description:
          "User testing sessions, session recordings, heatmap analysis, and heuristic evaluations to eliminate friction and maximize user retention.",
        tags: ["Usability Audits", "Heatmap Analysis", "Friction Removal", "Retention"],
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description:
          "Optimizing landing pages, signup funnels, and checkout flows through data-driven A/B testing and persuasive visual hierarchy.",
        tags: ["CRO UI", "Funnel Redesign", "A/B Testing", "Visual Hierarchy"],
      },
      {
        title: "Brand Identity & Digital Assets",
        description:
          "Comprehensive brand identity design including modern logos, vector iconography, typography palettes, and style guide documentation.",
        tags: ["Logo Design", "Style Guide", "Vector Assets", "Typography"],
      },
    ],
  },
  {
    id: "marketing",
    name: "Digital Marketing & Growth",
    shortName: "Digital Marketing",
    icon: HiArrowTrendingUp,
    tagline: "Organic SEO, Paid Media (PPC), App Store Optimization & B2B Funnels",
    description:
      "Data-driven digital marketing, technical search engine optimization (SEO), high-ROAS PPC advertising, App Store Optimization (ASO), and lead generation funnels.",
    subservices: [
      {
        title: "Full-Funnel Digital Marketing",
        description:
          "Integrated multi-channel digital acquisition strategies designed to generate qualified business leads, sales pipelines, and recurring revenue.",
        tags: ["Full-Funnel", "B2B Acquisition", "Pipeline Growth", "Multi-Channel"],
        isPopular: true,
      },
      {
        title: "Technical & Enterprise SEO",
        description:
          "On-page optimization, Core Web Vitals acceleration, schema markup, and authoritative backlink building for #1 Google rankings.",
        tags: ["Technical SEO", "Schema Markup", "Core Web Vitals", "Google Rank #1"],
        isPopular: true,
      },
      {
        title: "PPC & Paid Search Advertising",
        description:
          "High-ROI paid campaigns across Google Search, Display, YouTube, and LinkedIn Ads with continuous bid management and audience tuning.",
        tags: ["Google Ads", "LinkedIn Ads", "High ROAS", "Search Ads"],
        isPopular: true,
      },
      {
        title: "App Store Optimization (ASO)",
        description:
          "Boosting organic visibility, keyword rankings, visual asset conversion, and app download volumes on the iOS App Store and Google Play.",
        tags: ["App Store", "Google Play", "Keyword Optimization", "Installs Boost"],
        isPopular: true,
      },
      {
        title: "Social Media Marketing & Brand",
        description:
          "Targeted brand positioning, content calendar execution, and executive thought leadership across LinkedIn, Twitter/X, and Instagram.",
        tags: ["LinkedIn Growth", "B2B Brand", "Content Calendar", "Engagement"],
      },
      {
        title: "B2B Lead Generation & Outbound",
        description:
          "Targeted account-based marketing (ABM), verified prospect database curation, and high-converting cold email sequences.",
        tags: ["B2B Outbound", "ABM Marketing", "Cold Email", "Verified Leads"],
      },
      {
        title: "Content Marketing & Whitepapers",
        description:
          "High-authority technical articles, engineering whitepapers, client case studies, and automated email nurturing workflows.",
        tags: ["Thought Leadership", "Case Studies", "Whitepapers", "Email Funnels"],
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description:
          "Data-driven landing page copywriting, A/B testing, heatmap analysis, and checkout funnel optimization to convert more traffic into revenue.",
        tags: ["CRO", "A/B Testing", "Landing Pages", "Copywriting"],
      },
    ],
  },
  {
    id: "hire",
    name: "Hire Dedicated Developers",
    shortName: "Hire Developers",
    icon: HiUserGroup,
    tagline: "Top 3% Senior Engineers & Dedicated Technical Pods in 48 Hours",
    description:
      "Scale your engineering team rapidly with pre-vetted full-stack developers, mobile app experts, cloud architects, AI engineers, and QA specialists.",
    subservices: [
      {
        title: "Hire React & Next.js Developers",
        description:
          "Senior frontend engineers proficient in React 19, Next.js 16, TypeScript, TailwindCSS, and state management architectures.",
        tags: ["React 19", "Next.js 16", "TypeScript", "TailwindCSS"],
        isPopular: true,
      },
      {
        title: "Hire Node.js & Backend Engineers",
        description:
          "Experienced backend architects building low-latency microservices with Node.js, Express, NestJS, Go, Redis, and PostgreSQL.",
        tags: ["Node.js", "NestJS", "Go", "PostgreSQL & Redis"],
        isPopular: true,
      },
      {
        title: "Hire Python & AI/ML Specialists",
        description:
          "Specialized AI engineers skilled in Python, FastAPI, PyTorch, LangChain, OpenAI APIs, vector databases, and RAG pipelines.",
        tags: ["Python", "FastAPI", "LangChain", "Vector DB"],
        isPopular: true,
      },
      {
        title: "Hire Flutter & React Native Devs",
        description:
          "Cross-platform mobile developers delivering silky 60fps applications for iOS and Android from unified codebases.",
        tags: ["Flutter", "React Native", "Expo", "Single Codebase"],
        isPopular: true,
      },
      {
        title: "Hire Native iOS (Swift) & Android (Kotlin)",
        description:
          "Native mobile engineers skilled in Swift, SwiftUI, Kotlin, Jetpack Compose, CoreData, and Apple/Google store deployments.",
        tags: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose"],
      },
      {
        title: "Hire AWS Cloud & DevOps Engineers",
        description:
          "Certified cloud architects proficient in Terraform IaC, Docker, Kubernetes, CI/CD automation, and 24/7 SRE operations.",
        tags: ["AWS Certified", "Kubernetes", "Terraform", "CI/CD"],
      },
      {
        title: "Hire QA Automation Engineers",
        description:
          "Dedicated quality assurance engineers experienced in Playwright, Cypress, Selenium, Postman, and load testing.",
        tags: ["Playwright", "Cypress", "Selenium", "Postman QA"],
      },
      {
        title: "Hire Salesforce Certified Specialists",
        description:
          "Certified Salesforce developers and administrators skilled in Apex, Lightning Web Components (LWC), and ERP integrations.",
        tags: ["Salesforce Certified", "Apex", "LWC", "ERP Sync"],
      },
    ],
  },
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("software");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { openQuoteModal } = useModal();

  const currentCategory =
    serviceCategories.find((c) => c.id === activeTab) || serviceCategories[0];

  // Search filter across all services
  const filteredSubservices = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentCategory.subservices;
    }
    const q = searchQuery.toLowerCase();
    // When searching, find matches in current category first or search all
    return currentCategory.subservices.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery, currentCategory]);

  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative overflow-hidden bg-transparent py-20 sm:py-28">
      {/* Background Lighting Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[400px] h-[350px] rounded-full bg-[#7C3AED]/08 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
              <HiSparkles />
              <span>Full-Spectrum Enterprise Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.18] font-['Outfit'] tracking-tight">
              End-to-End Software,{" "}
              <span className="block sm:inline bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Cloud & AI Engineering
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              10 specialized engineering divisions and 70+ deliverables — engineered to scale startups, growth brands, and enterprise platforms worldwide.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full lg:w-80 shrink-0">
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${currentCategory.shortName}...`}
              className="w-full rounded-2xl border border-white/10 bg-[#070e1e]/90 py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-400 backdrop-blur-md outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1835]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 10 Category Divisions Matrix (All 10 Visible at Once - Zero Awkward Scroller) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {serviceCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setSearchQuery("");
                }}
                className={`group flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] border-cyan-400/40 scale-[1.02]"
                    : "bg-[#070e1e]/90 text-slate-300 hover:text-white hover:bg-white/[0.07] hover:border-cyan-500/40 border-white/10 backdrop-blur-md"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl shrink-0 transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-cyan-500/10 border border-cyan-500/20 text-[#00D2FF] group-hover:bg-[#00D2FF] group-hover:text-black"
                    }`}
                  >
                    <Icon className="text-sm" />
                  </div>
                  <div className="text-left truncate">
                    <span className="block truncate font-medium text-[10px] uppercase tracking-wider text-cyan-300/80">
                      0{idx + 1}. {cat.shortName}
                    </span>
                    <span className="block truncate font-bold text-xs text-white">
                      {cat.name}
                    </span>
                  </div>
                </div>

                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono shrink-0 ${
                    isActive ? "bg-white/25 text-white" : "bg-white/5 text-slate-400 border border-white/5"
                  }`}
                >
                  {cat.subservices.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Description Banner */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#070e1e]/85 p-6 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Division 0{serviceCategories.findIndex((c) => c.id === activeTab) + 1}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">{currentCategory.tagline}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {currentCategory.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl font-normal leading-relaxed">
              {currentCategory.description}
            </p>
          </div>

          <button
            onClick={openQuoteModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0066FF] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:brightness-110 active:scale-95 shrink-0 cursor-pointer"
          >
            <span>Request Estimate for {currentCategory.shortName}</span>
            <HiArrowUpRight className="text-base" />
          </button>
        </div>

        {/* Sub-Services Grid */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + searchQuery}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredSubservices.length === 0 ? (
                <div className="col-span-full py-12 text-center rounded-3xl border border-white/10 bg-white/[0.02]">
                  <p className="text-sm text-slate-400">No services matching "{searchQuery}" in this category.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-xs font-bold text-[#00D2FF] hover:underline"
                  >
                    View All {currentCategory.shortName} Services
                  </button>
                </div>
              ) : (
                filteredSubservices.map((svc, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#070e1e]/90 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:bg-[#0c1835] hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(0,210,255,0.15)] hover:-translate-y-1.5"
                  >
                    {/* Popular Pill Badge */}
                    {svc.isPopular && (
                      <div className="absolute top-4 right-14 inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
                        <HiSparkles className="text-[10px]" />
                        <span>Featured</span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                          0{idx + 1}
                        </span>
                        <button
                          onClick={openQuoteModal}
                          aria-label={`Get quote for ${svc.title}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 group-hover:bg-[#00D2FF] group-hover:text-black group-hover:border-transparent transition-all"
                        >
                          <HiArrowUpRight />
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {svc.title}
                      </h4>

                      <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                        {svc.description}
                      </p>
                    </div>

                    {/* Capability Tags */}
                    <div className="mt-5 pt-3.5 border-t border-white/5">
                      <div className="flex flex-wrap gap-1.5">
                        {svc.tags.map((t, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Comprehensive Engineering Guarantee Banner */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-[#091630] via-[#060e20] to-[#040914] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
              ✦ Turnkey Delivery SLA
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-white">
              Need a Custom Architecture or Cross-Division Pod?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We combine software engineers, cloud architects, AI researchers, and certified QA testers into custom dedicated pods configured for your project milestones.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <HiCheckCircle className="text-cyan-400 text-sm" /> 24-Hour Scope Estimation
              </span>
              <span className="flex items-center gap-1.5">
                <HiCheckCircle className="text-cyan-400 text-sm" /> 100% Source Code Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <HiCheckCircle className="text-cyan-400 text-sm" /> Non-Disclosure Agreement (NDA)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] transition hover:scale-105 active:scale-95"
            >
              Consult Our Solutions Architects →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;