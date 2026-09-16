import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSparkles,
  HiCheckCircle,
  HiArrowRight,
  HiArrowUpRight,
  HiDocumentText,
  HiCommandLine,
  HiCpuChip,
  HiBookOpen,
  HiShieldCheck,
  HiCalendar,
  HiPaperAirplane,
  HiDocumentArrowDown,
  HiChartBar,
  HiMagnifyingGlass,
  HiXMark,
  HiBolt,
  HiCodeBracketSquare,
  HiServerStack,
  HiLockClosed,
  HiCircleStack,
  HiSquare3Stack3D,
} from "react-icons/hi2";
import { FaBrain, FaReact, FaAws, FaDocker, FaPython } from "react-icons/fa6";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";

export interface ResourceItem {
  id: string;
  category: "guides-whitepapers" | "interactive-ai-tools" | "budget-calculators" | "cloud-iac-blueprints" | "security-compliance" | "downloads-deck";
  categoryLabel: string;
  emoji: string;
  badge: string;
  badgeColor: string;
  title: string;
  tagline: string;
  desc: string;
  highlights: string[];
  techTags: string[];
  link: string;
  linkLabel: string;
  isModalTrigger?: boolean;
}

export const allResources: ResourceItem[] = [
  // 1. Guides & Engineering Blogs
  {
    id: "engineering-blogs",
    category: "guides-whitepapers",
    categoryLabel: "Guides & Engineering Blogs",
    emoji: "💡",
    badge: "Engineering Hub",
    badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    title: "Engineering Insights & Modern Tech Blogs",
    tagline: "Deep-dive technical architectures, GenAI engineering, and modern microservices.",
    desc: "In-depth technical whitepapers, architectural case studies, and performance optimization guides written by senior architects on Next.js 16, AI agent swarms & cloud microservices.",
    highlights: [
      "Next.js 16 & React Server Components Deep-Dive",
      "Event-driven Microservices with Kafka & Redis",
      "Sub-50ms API Latency Tuning Playbook",
      "Multi-tenant Database Partitioning Strategies",
    ],
    techTags: ["Next.js", "Microservices", "Kafka", "PostgreSQL"],
    link: "/insights",
    linkLabel: "Explore Engineering Insights",
  },
  {
    id: "mvp-startup-guide",
    category: "guides-whitepapers",
    categoryLabel: "Guides & Engineering Blogs",
    emoji: "💡",
    badge: "Startup Guide",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    title: "Startup MVP Launchpad Guide (30-Day Blueprint)",
    tagline: "Step-by-step roadmap to build, test, and ship scalable digital products in 30 days.",
    desc: "A proven startup execution framework covering product scoping, technical stack selection, agile sprint cadence, and cost-effective cloud setup for early-stage founders.",
    highlights: [
      "30-Day Sprint Calendar & Feature Prioritization Matrix",
      "Tech Stack Decision Tree: Flutter vs React Native vs Web",
      "CI/CD and Cloud Infrastructure on $50/month Budget",
      "Early User Feedback Loops & Analytics Instrumentation",
    ],
    techTags: ["MVP Strategy", "Agile", "Flutter", "Supabase"],
    link: "/quote",
    linkLabel: "Plan Your Startup MVP",
  },
  {
    id: "microservices-scaling",
    category: "guides-whitepapers",
    categoryLabel: "Guides & Engineering Blogs",
    emoji: "💡",
    badge: "Architecture IaC",
    badgeColor: "text-purple-300 bg-purple-500/10 border-purple-500/30",
    title: "Monolith to Microservices Scaling Architecture",
    tagline: "Monolith-to-microservices migration patterns, Kubernetes Helm, and API gateways.",
    desc: "Comprehensive migration patterns to break monolithic legacy backends into domain-driven microservices with zero downtime, distributed tracing, and resilient failovers.",
    highlights: [
      "Strangler Fig Migration Pattern Implementation",
      "Distributed Tracing with OpenTelemetry & Jaeger",
      "Kong & Envoy API Gateway Configuration Patterns",
      "Saga Pattern for Distributed Transaction Handling",
    ],
    techTags: ["Docker", "Kubernetes", "gRPC", "Go"],
    link: "/services#software",
    linkLabel: "View Microservices Architecture",
  },
  {
    id: "database-caching",
    category: "guides-whitepapers",
    categoryLabel: "Guides & Engineering Blogs",
    emoji: "💡",
    badge: "High Performance",
    badgeColor: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    title: "Database Caching & Sharding Guide (1M+ QPS)",
    tagline: "Redis multi-layer caching, PostgreSQL partition strategies, and zero downtime.",
    desc: "Architectural blueprint detailing how to scale relational databases from 10k to 1M+ queries per second with multi-tier Redis caching, connection pooling, and read replicas.",
    highlights: [
      "Cache-Aside & Write-Through Invalidation Blueprints",
      "PostgreSQL Declarative Partitioning & Index Tuning",
      "PgBouncer Connection Pooling Optimization",
      "Redis Cluster Sharding & Failover Runbooks",
    ],
    techTags: ["Redis", "PostgreSQL", "PgBouncer", "SQL Tuning"],
    link: "/services#software",
    linkLabel: "Read Database Scaling Guide",
  },
  {
    id: "rag-whitepaper",
    category: "guides-whitepapers",
    categoryLabel: "Guides & Engineering Blogs",
    emoji: "💡",
    badge: "AI Engineering",
    badgeColor: "text-rose-300 bg-rose-500/10 border-rose-500/30",
    title: "Enterprise LLM Fine-Tuning & RAG Whitepaper",
    tagline: "Enterprise retrieval augmented generation with pgvector, Milvus, and prompt caching.",
    desc: "Production engineering guide for deploying Retrieval-Augmented Generation (RAG) pipelines, semantic vector search, chunking optimization, and hallucination guardrails.",
    highlights: [
      "Hybrid Search: BM25 + Dense Vector Embeddings",
      "pgvector vs Pinecone vs Milvus Benchmark Analysis",
      "Context Window Packing & Dynamic Re-ranking",
      "Guardrails AI Implementation for Hallucination Prevention",
    ],
    techTags: ["pgvector", "LangChain", "Gemini 1.5", "Python"],
    link: "/services#ai",
    linkLabel: "Read GenAI Whitepaper",
  },
  {
    id: "tech-benchmarks",
    category: "guides-whitepapers",
    categoryLabel: "Guides & Engineering Blogs",
    emoji: "💡",
    badge: "Benchmark 2026",
    badgeColor: "text-blue-300 bg-blue-500/10 border-blue-500/30",
    title: "Modern Tech Stack Benchmarks (2026 Edition)",
    tagline: "React 19 vs Next.js vs Flutter performance, latency, and operational cost breakdown.",
    desc: "Direct performance comparison of frontend, mobile, and backend runtimes based on cold start, CPU utilization, TTFB, bundle size, and infrastructure operational cost.",
    highlights: [
      "Node.js vs Bun vs Go: API Throughput & Concurrency",
      "Flutter 3.x vs React Native TurboModules FPS Benchmarks",
      "Serverless Cold Start vs Containerized ECS Cost Comparison",
      "Real-World P99 Latency Metrics across Global Regions",
    ],
    techTags: ["Benchmarks", "Node.js", "Bun", "Flutter"],
    link: "/insights",
    linkLabel: "View 2026 Benchmarks",
  },

  // 2. Interactive AI Talent Tools
  {
    id: "resume-analyzer",
    category: "interactive-ai-tools",
    categoryLabel: "Interactive AI Talent Tools",
    emoji: "🧮",
    badge: "Sub-15ms AI Parser",
    badgeColor: "text-purple-300 bg-purple-500/10 border-purple-500/30",
    title: "AI Resume Analyzer & ATS Auditor",
    tagline: "Sub-15ms parsing, keyword density audit, action verb scoring, and bullet rewrites.",
    desc: "Upload your technical resume to receive an instantaneous ATS compliance audit, keyword gap analysis, executive bullet rewrites, and senior recruiter rubric ratings.",
    highlights: [
      "Instant PDF & DOCX text extraction with zero data loss",
      "Overused buzzword detection and impact verb suggestions",
      "Role-specific tech competency heatmaps",
      "1-Click Gemini AI bullet enhancer for maximum impact",
    ],
    techTags: ["AI Parsing", "NLP", "Gemini AI", "ATS Radar"],
    link: "/resume-analyzer",
    linkLabel: "Launch Resume Analyzer",
  },
  {
    id: "ats-score",
    category: "interactive-ai-tools",
    categoryLabel: "Interactive AI Talent Tools",
    emoji: "🧮",
    badge: "Job Match Engine",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    title: "ATS Match Score Checker & Skill Aligner",
    tagline: "Instant job description vs resume keyword matching with missing skill alerts.",
    desc: "Compare your resume against any live job description to view exact percentage match, missing hard skills, critical keywords, and custom phrasing suggestions.",
    highlights: [
      "Side-by-side keyword matching against JD requirements",
      "Missing critical technical certifications & framework alerts",
      "Weighted scoring for experience level and tech depth",
      "Actionable optimization checklist before applying",
    ],
    techTags: ["ATS Scoring", "Keyword Matcher", "Cosine Similarity"],
    link: "/ats-score",
    linkLabel: "Check ATS Match Score",
  },
  {
    id: "resume-builder",
    category: "interactive-ai-tools",
    categoryLabel: "Interactive AI Talent Tools",
    emoji: "🧮",
    badge: "AI Generator",
    badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    title: "AI Resume Builder (Gemini AI Powered)",
    tagline: "Interactive resume generator with Gemini AI-powered executive phrasing.",
    desc: "Build modern, recruiter-approved, single-column ATS-friendly resumes in minutes with auto-suggested achievements and executive phrasing.",
    highlights: [
      "8+ Modern FAANG-grade ATS-friendly templates",
      "Gemini AI auto-generation of quantified accomplishment bullets",
      "Instant live preview with export to PDF / JSON Resume",
      "Integrated spell, grammar, and active voice verifier",
    ],
    techTags: ["Resume Builder", "PDF Generator", "AI Copywriting"],
    link: "/resume-builder",
    linkLabel: "Build Resume with AI",
  },
  {
    id: "portfolio-builder",
    category: "interactive-ai-tools",
    categoryLabel: "Interactive AI Talent Tools",
    emoji: "🧮",
    badge: "Live Preview",
    badgeColor: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    title: "AI Developer Portfolio Builder",
    tagline: "Instant portfolio builder with live project preview and responsive templates.",
    desc: "Showcase your GitHub projects, system architectures, and engineering achievements with a stunning developer portfolio site generated in under 3 minutes.",
    highlights: [
      "GitHub repo sync for automated project showcase cards",
      "Dark mode glassmorphism UI themes with sleek animations",
      "Integrated contact form and Calendly meeting embed",
      "1-Click deployment link ready for your custom domain",
    ],
    techTags: ["Portfolio Generator", "GitHub API", "TailwindCSS"],
    link: "/portfolio-builder",
    linkLabel: "Create Developer Portfolio",
  },
  {
    id: "skill-gap",
    category: "interactive-ai-tools",
    categoryLabel: "Interactive AI Talent Tools",
    emoji: "🧮",
    badge: "Career Radar",
    badgeColor: "text-rose-300 bg-rose-500/10 border-rose-500/30",
    title: "Skill Gap Benchmarker & Career Roadmap",
    tagline: "Dynamic radar skill gap audit with quarterly tech upgrade learning milestones.",
    desc: "Benchmark your current engineering skills against senior and staff developer market salaries, with tailored learning paths to fast-track promotions.",
    highlights: [
      "Interactive 8-axis Radar chart of technical competencies",
      "Market salary benchmarks across India, US, and EU markets",
      "Curated learning resource links and milestone project suggestions",
      "Quarterly career progression tracker and target alerts",
    ],
    techTags: ["Career Radar", "Data Analytics", "Salary Benchmark"],
    link: "/skill-gap",
    linkLabel: "Benchmark Your Skills",
  },
  {
    id: "interview",
    category: "interactive-ai-tools",
    categoryLabel: "Interactive AI Talent Tools",
    emoji: "🧮",
    badge: "Voice & Text AI",
    badgeColor: "text-blue-300 bg-blue-500/10 border-blue-500/30",
    title: "AI Voice & Text Mock Interviewer",
    tagline: "Simulated technical voice & coding interviews with rubric scoring and feedback.",
    desc: "Practice real-time technical, system design, and behavioral interviews with our conversational AI voice agent with immediate post-session feedback.",
    highlights: [
      "Simulated FAANG behavioral and system design interview rounds",
      "Real-time voice speech recognition and audio response",
      "Rubric evaluation on clarity, technical accuracy, and STAR format",
      "Detailed session transcript with model answer suggestions",
    ],
    techTags: ["Voice AI", "WebRTC", "Speech-to-Text", "STAR Rubric"],
    link: "/interview",
    linkLabel: "Start AI Mock Interview",
  },

  // 3. Budget & Scope Calculators
  {
    id: "cost-estimator",
    category: "budget-calculators",
    categoryLabel: "Budget & Scope Calculators",
    emoji: "💰",
    badge: "Instant Estimate",
    badgeColor: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    title: "Project Scope & Development Cost Estimator",
    tagline: "Calculate engineering timelines, sprint allocations, and turnkey cost estimates.",
    desc: "Select platforms, target features, backend architecture, and third-party integrations to receive a transparent cost breakdown and sprint roadmap in 2 minutes.",
    highlights: [
      "Granular platform selection: Web, iOS, Android, Desktop",
      "Real-time cost updates based on complexity and integrations",
      "Downloadable formal PDF quotation ready for board approval",
      "Direct milestone schedule and sprint deliverable outline",
    ],
    techTags: ["Scoping Tool", "Budget Calculator", "Cost Analysis"],
    link: "/quote",
    linkLabel: "Calculate Project Scope",
  },
  {
    id: "team-calculator",
    category: "budget-calculators",
    categoryLabel: "Budget & Scope Calculators",
    emoji: "💰",
    badge: "Team Pod Sizing",
    badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    title: "Dedicated Agile Engineering Pod Calculator",
    tagline: "Estimate monthly budget for full-stack squads (Frontend, Backend, QA & PM).",
    desc: "Configure custom dedicated engineering pods with vetted frontend, backend, mobile, DevOps engineers, and QA leads tailored to your technology roadmap.",
    highlights: [
      "Flexible sizing: Solo dedicated dev to full 10-person squads",
      "Transparent monthly retainers with zero hidden payroll overhead",
      "Includes dedicated Agile Scrum Master and QA verification",
      "Scale up or ramp down capacity with 14-day notice",
    ],
    techTags: ["Staff Augmentation", "Agile Pods", "Monthly Retainer"],
    link: "/meeting",
    linkLabel: "Configure Engineering Pod",
  },
  {
    id: "cloud-spend",
    category: "budget-calculators",
    categoryLabel: "Budget & Scope Calculators",
    emoji: "💰",
    badge: "Cloud FinOps",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    title: "AWS & Cloud Infrastructure Spend Optimizer",
    tagline: "Compute savings on AWS/GCP serverless vs containerized Kubernetes clusters.",
    desc: "Evaluate your expected monthly active users, database read/write throughput, and media storage to estimate AWS, GCP, or DigitalOcean hosting bills.",
    highlights: [
      "Serverless (Lambda/Vercel) vs Container (EKS/ECS) cost matrix",
      "Bandwidth & CDN egress cost optimization formulas",
      "Reserved Instance (RI) and Savings Plans recommendation",
      "Database tiering calculator for PostgreSQL / Redis",
    ],
    techTags: ["AWS FinOps", "Cloud Pricing", "Kubernetes vs Lambda"],
    link: "/services#cloud",
    linkLabel: "Optimize Cloud Spend",
  },
  {
    id: "timeline-predictor",
    category: "budget-calculators",
    categoryLabel: "Budget & Scope Calculators",
    emoji: "💰",
    badge: "Sprint Gantt",
    badgeColor: "text-purple-300 bg-purple-500/10 border-purple-500/30",
    title: "MVP Sprint Timeline & Milestone Predictor",
    tagline: "Feature complexity calculator providing exact delivery Gantt milestones.",
    desc: "Determine exact sprint timelines for discovery, Figma design, sprint development, QA testing, staging signoff, and production deployment.",
    highlights: [
      "Phase-by-phase timeline breakdown from Week 1 to Launch",
      "Critical path dependency identification for third-party APIs",
      "Automated buffer recommendations for App Store / Play Store reviews",
      "Interactive milestone Gantt chart export",
    ],
    techTags: ["Agile Gantt", "Sprint Planning", "Milestone Tracking"],
    link: "/quote",
    linkLabel: "Predict Sprint Timeline",
  },
  {
    id: "roi-audit",
    category: "budget-calculators",
    categoryLabel: "Budget & Scope Calculators",
    emoji: "💰",
    badge: "ROI Analysis",
    badgeColor: "text-rose-300 bg-rose-500/10 border-rose-500/30",
    title: "In-House Hiring vs NexoraLab ROI Audit",
    tagline: "Compare recruitment overhead, tool licensing, and agile pod cost efficiency.",
    desc: "Comprehensive financial comparison evaluating recruiter commissions, onboarding lead times, healthcare benefits, and hardware costs vs partnering with NexoraLab.",
    highlights: [
      "Up to 58% savings compared to direct in-house recruitment",
      "Zero recruitment agency fees and zero benefits overhead",
      "Immediate day-1 productivity with pre-vetted senior engineers",
      "Full IP ownership and seamless code handoff",
    ],
    techTags: ["ROI Model", "Cost Comparison", "Outsourcing Audit"],
    link: "/about",
    linkLabel: "View ROI Breakdown",
  },
  {
    id: "engagement-models",
    category: "budget-calculators",
    categoryLabel: "Budget & Scope Calculators",
    emoji: "💰",
    badge: "Contract Models",
    badgeColor: "text-blue-300 bg-blue-500/10 border-blue-500/30",
    title: "Engagement Model Comparison (Fixed vs Retainer)",
    tagline: "Fixed price vs Time & Material vs Dedicated Monthly Retainer comparison guide.",
    desc: "Understand which contracting model fits your project stage: Fixed-Price Turnkey, Dedicated Monthly Pods, or Hourly Time & Materials.",
    highlights: [
      "Fixed Price: Ideal for defined scopes and MVP launches",
      "Dedicated Pods: Best for scaling SaaS products and fast pivots",
      "Time & Materials: Suited for legacy maintenance and ad-hoc audits",
      "Clear SLA, payment terms, and IP assignment clauses",
    ],
    techTags: ["Fixed Price", "T&M", "Dedicated Pods", "SLAs"],
    link: "/contact",
    linkLabel: "Compare Engagement Models",
  },

  // 4. Cloud & IaC Blueprints
  {
    id: "cloud-blueprints",
    category: "cloud-iac-blueprints",
    categoryLabel: "Cloud & IaC Blueprints",
    emoji: "☁️",
    badge: "Terraform IaC",
    badgeColor: "text-sky-300 bg-sky-500/10 border-sky-500/30",
    title: "AWS Production Terraform IaC Blueprint",
    tagline: "Modular VPC, EKS, RDS Multi-AZ, and CloudFront infrastructure as code scripts.",
    desc: "Battle-tested, modular Terraform code to provision secure AWS environments with isolated subnets, encrypted databases, and auto-scaling container clusters.",
    highlights: [
      "Multi-AZ VPC with Public, Private, and Database Subnets",
      "Amazon EKS cluster with Karpenter autoscaling nodes",
      "Amazon Aurora PostgreSQL Multi-AZ with automated snapshots",
      "CloudFront CDN distribution with SSL and AWS WAF rules",
    ],
    techTags: ["Terraform", "AWS EKS", "Aurora RDS", "WAF"],
    link: "/services#cloud",
    linkLabel: "Explore AWS Blueprints",
  },
  {
    id: "kubernetes-helm",
    category: "cloud-iac-blueprints",
    categoryLabel: "Cloud & IaC Blueprints",
    emoji: "☁️",
    badge: "Helm Charts",
    badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    title: "Kubernetes Production Helm Charts & Manifests",
    tagline: "Auto-scaling HPA, Ingress Nginx, cert-manager, and Prometheus monitoring charts.",
    desc: "Enterprise Helm chart templates with built-in Horizontal Pod Autoscaling (HPA), resource limits, liveness probes, and zero-downtime rolling deploys.",
    highlights: [
      "Ingress-Nginx with automated Let's Encrypt SSL renewal",
      "Prometheus & Grafana dashboard manifests for APM metrics",
      "HPA configurations driven by CPU, memory, and custom metrics",
      "SealedSecrets integration for encrypted GitOps workflows",
    ],
    techTags: ["Kubernetes", "Helm", "Prometheus", "GitOps"],
    link: "/services#cloud",
    linkLabel: "View Helm Templates",
  },
  {
    id: "cicd-pipeline",
    category: "cloud-iac-blueprints",
    categoryLabel: "Cloud & IaC Blueprints",
    emoji: "☁️",
    badge: "CI/CD Actions",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    title: "Zero-Downtime GitHub Actions CI/CD Pipeline",
    tagline: "GitHub Actions workflow for automated test suites, Docker build, and blue/green deploys.",
    desc: "End-to-end automated deployment pipeline including linting, unit tests, Docker multi-stage caching, vulnerability scanning with Trivy, and Blue/Green deploys.",
    highlights: [
      "Parallelized test runner with matrix build strategy",
      "Docker Buildx layer caching via GitHub Actions cache",
      "Automated semantic versioning & GitHub release notes",
      "Slack / Discord build failure notification webhooks",
    ],
    techTags: ["GitHub Actions", "Docker", "Trivy", "Blue-Green"],
    link: "/services#cloud",
    linkLabel: "View CI/CD Workflows",
  },
  {
    id: "docker-library",
    category: "cloud-iac-blueprints",
    categoryLabel: "Cloud & IaC Blueprints",
    emoji: "☁️",
    badge: "Docker Library",
    badgeColor: "text-blue-300 bg-blue-500/10 border-blue-500/30",
    title: "Multi-Stage Production Dockerfile Library",
    tagline: "Ultra-lean production Dockerfiles for Node.js, FastAPI, Go, and Flutter web.",
    desc: "Production-hardened, non-root user Docker container recipes optimizing image size down to <50MB with minimal attack surface and fast startup times.",
    highlights: [
      "Node.js 22 Alpine multi-stage builder with standalone output",
      "FastAPI Python 3.12 with uv and minimal wheels",
      "Golang scratch build container (<15MB image size)",
      "Non-root security policies and dumb-init signal handlers",
    ],
    techTags: ["Docker", "Alpine", "FastAPI", "Node.js"],
    link: "/services#software",
    linkLabel: "Browse Docker Library",
  },
  {
    id: "serverless-architecture",
    category: "cloud-iac-blueprints",
    categoryLabel: "Cloud & IaC Blueprints",
    emoji: "☁️",
    badge: "Serverless",
    badgeColor: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    title: "Serverless Event-Driven Architecture (AWS SQS/Lambda)",
    tagline: "AWS Lambda, SQS, EventBridge, and DynamoDB event-driven blueprints.",
    desc: "Asynchronous background worker architecture with dead-letter queue (DLQ) retry mechanisms, idempotency keys, and sub-second execution times.",
    highlights: [
      "SQS FIFO Queues with automated dead-letter retries",
      "EventBridge rules for decoupled microservice events",
      "DynamoDB single-table design with TTL cleanup",
      "API Gateway WebSocket handlers for real-time push",
    ],
    techTags: ["AWS Lambda", "SQS", "DynamoDB", "EventBridge"],
    link: "/services#cloud",
    linkLabel: "View Serverless Blueprints",
  },
  {
    id: "pgvector-pipeline",
    category: "cloud-iac-blueprints",
    categoryLabel: "Cloud & IaC Blueprints",
    emoji: "☁️",
    badge: "Vector DB",
    badgeColor: "text-purple-300 bg-purple-500/10 border-purple-500/30",
    title: "PostgreSQL pgvector AI Retrieval Pipeline",
    tagline: "Database schema, embedding generation, and hybrid BM25 + vector search queries.",
    desc: "Database migration scripts, HNSW vector indexing configurations, and SQL stored procedures for lightning-fast hybrid semantic search across millions of documents.",
    highlights: [
      "HNSW vs IVFFLAT indexing benchmark parameters",
      "Custom SQL function for Cosine and L2 similarity ranking",
      "Automated text chunking and embedding generation scripts",
      "Metadata filtering with composite B-Tree indexes",
    ],
    techTags: ["PostgreSQL", "pgvector", "HNSW Index", "Embeddings"],
    link: "/services#ai",
    linkLabel: "View pgvector Stack",
  },

  // 5. Security & Compliance
  {
    id: "security-compliance",
    category: "security-compliance",
    categoryLabel: "Security & Compliance",
    emoji: "🛡️",
    badge: "HIPAA Compliant",
    badgeColor: "text-rose-300 bg-rose-500/10 border-rose-500/30",
    title: "HIPAA HealthTech Architecture & Security Matrix",
    tagline: "End-to-end data encryption at rest and in transit, BAA agreements, and audit logging.",
    desc: "Security protocols and system design patterns required for healthcare platforms handling Protected Health Information (PHI) under strict HIPAA regulations.",
    highlights: [
      "AES-256 encryption at rest and TLS 1.3 in transit",
      "Immutable audit logs with AWS CloudTrail & KMS keys",
      "Role-based emergency access controls & timeout policies",
      "Business Associate Agreement (BAA) infrastructure readiness",
    ],
    techTags: ["HIPAA", "PHI Security", "AES-256", "Audit Trail"],
    link: "/services#software",
    linkLabel: "View HIPAA Guidelines",
  },
  {
    id: "soc2-checklist",
    category: "security-compliance",
    categoryLabel: "Security & Compliance",
    emoji: "🛡️",
    badge: "SOC2 Type II",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    title: "SOC2 Type II Audit Readiness Checklist",
    tagline: "Access control RBAC, vulnerability scanning, and incident response runbooks.",
    desc: "A comprehensive operational and engineering checklist covering Trust Services Criteria: Security, Availability, Processing Integrity, and Confidentiality.",
    highlights: [
      "Continuous compliance monitoring with automated scans",
      "Employee access governance & SSO with Okta/Google Workspace",
      "Disaster recovery (DR) runbooks and RTO/RPO SLA definitions",
      "Third-party vendor risk assessment procedures",
    ],
    techTags: ["SOC2", "Compliance", "Security Audit", "DR Plan"],
    link: "/services#software",
    linkLabel: "Read SOC2 Checklist",
  },
  {
    id: "pci-dss",
    category: "security-compliance",
    categoryLabel: "Security & Compliance",
    emoji: "🛡️",
    badge: "FinTech Security",
    badgeColor: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    title: "PCI-DSS FinTech Payment Security Matrix",
    tagline: "Tokenization, payment gateway isolation, and secure ledger compliance rules.",
    desc: "Architectural blueprint for processing card payments, digital wallets, and payout ledgers without storing raw cardholder data on application servers.",
    highlights: [
      "Stripe & Razorpay client-side tokenization flows",
      "Network segmentation and dedicated payment microservices",
      "Double-entry bookkeeping ledger integrity schemas",
      "Quarterly vulnerability penetration testing protocols",
    ],
    techTags: ["PCI-DSS", "FinTech", "Tokenization", "Stripe API"],
    link: "/services#software",
    linkLabel: "View PCI-DSS Matrix",
  },
  {
    id: "owasp-security",
    category: "security-compliance",
    categoryLabel: "Security & Compliance",
    emoji: "🛡️",
    badge: "API Hardening",
    badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    title: "OWASP API Security Top 10 Audit & Hardening",
    tagline: "Rate limiting, JWT authentication, SQL injection, and CORS hardening guide.",
    desc: "Practical code recipes and nginx/gateway configurations to mitigate Broken Object Level Authorization (BOLA), mass assignment, and SSRF attacks.",
    highlights: [
      "Redis sliding-window rate limiting middleware",
      "JWT asymmetric signing (RS256) with short expiration",
      "Strict Content-Security-Policy (CSP) & CORS headers",
      "Automated dynamic application security testing (DAST)",
    ],
    techTags: ["OWASP", "API Hardening", "JWT RS256", "Rate Limiting"],
    link: "/services#software",
    linkLabel: "Read OWASP Hardening Guide",
  },
  {
    id: "zero-trust",
    category: "security-compliance",
    categoryLabel: "Security & Compliance",
    emoji: "🛡️",
    badge: "Zero-Trust RBAC",
    badgeColor: "text-purple-300 bg-purple-500/10 border-purple-500/30",
    title: "Zero-Trust RBAC Security Matrix",
    tagline: "Granular role-based permissions, OAuth2.0 / OIDC, and multi-factor auth.",
    desc: "Policy-based access control (PBAC/RBAC) architecture using OAuth 2.0, OpenID Connect, and fine-grained claims for enterprise SaaS applications.",
    highlights: [
      "Granular role, permission, and organization tenancy models",
      "WebAuthn / FIDO2 hardware key and TOTP MFA integration",
      "Session revocation and anomaly detection middleware",
      "Zero-Trust network access with Cloudflare Tunnels",
    ],
    techTags: ["Zero-Trust", "RBAC", "OAuth 2.0", "WebAuthn"],
    link: "/services#software",
    linkLabel: "View Zero-Trust Matrix",
  },
  {
    id: "gdpr-guide",
    category: "security-compliance",
    categoryLabel: "Security & Compliance",
    emoji: "🛡️",
    badge: "Data Privacy",
    badgeColor: "text-blue-300 bg-blue-500/10 border-blue-500/30",
    title: "GDPR Data Privacy & Erasure Guide",
    tagline: "User consent managers, right to be forgotten APIs, and cookie policy compliance.",
    desc: "Technical implementation guide for GDPR and CCPA compliance, including automated data export endpoints, anonymization workers, and consent tracking.",
    highlights: [
      "Automated Right-to-be-Forgotten data purge pipelines",
      "PII encryption and field-level database masking",
      "Consent management tracking with audit logs",
      "EU data residency cloud infrastructure setups",
    ],
    techTags: ["GDPR", "CCPA", "Data Privacy", "PII Masking"],
    link: "/services#software",
    linkLabel: "Read GDPR Guide",
  },

  // 6. Capabilities & Whitepapers
  {
    id: "downloads",
    category: "downloads-deck",
    categoryLabel: "Capabilities & Whitepapers",
    emoji: "📚",
    badge: "Official Brochure",
    badgeColor: "text-pink-300 bg-pink-500/10 border-pink-500/30",
    title: "NexoraLab Corporate Deck & Capabilities Brochure (2026)",
    tagline: "Official corporate capabilities brochure, service matrices, and delivery methodology.",
    desc: "Download our complete official corporate brochure detailing our full-stack engineering divisions, AI talent tools, global delivery models, and SLA benchmarks.",
    highlights: [
      "Executive overview of service offerings & division capabilities",
      "Technology matrix covering web, mobile, cloud, and AI stacks",
      "Agile development lifecycle, sprint cadences, and QA standards",
      "Pricing frameworks, engagement models, and contract terms",
    ],
    techTags: ["Capabilities Deck", "Brochure PDF", "Corporate Overview"],
    link: "#brochure",
    linkLabel: "Download Corporate Brochure",
    isModalTrigger: true,
  },
  {
    id: "engineering-matrix",
    category: "downloads-deck",
    categoryLabel: "Capabilities & Whitepapers",
    emoji: "📚",
    badge: "SLA Matrix",
    badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    title: "NexoraLab Full-Stack Engineering SLA & Delivery Matrix",
    tagline: "Sprint delivery cadence, code review benchmarks, QA coverage, and security policies.",
    desc: "Transparent specification of our code quality standards: mandatory 85%+ test coverage, peer code reviews, CI/CD automated gates, and production uptime commitments.",
    highlights: [
      "99.9% production availability SLA benchmarks",
      "Guaranteed 24-hour critical bug resolution guarantee",
      "Weekly sprint demo schedule and bi-weekly release cycles",
      "Comprehensive IP handover and NDA protection policies",
    ],
    techTags: ["Engineering SLA", "QA Benchmarks", "Delivery Cadence"],
    link: "/about",
    linkLabel: "View Engineering SLAs",
  },
  {
    id: "brochure",
    category: "downloads-deck",
    categoryLabel: "Capabilities & Whitepapers",
    emoji: "📚",
    badge: "PDF Whitepaper",
    badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    title: "Complete Technology Services & Solution Catalog (PDF)",
    tagline: "Comprehensive 42-page technical catalog of enterprise software solutions.",
    desc: "Get immediate access to our complete enterprise catalog detailing on-demand platforms, healthcare EHR solutions, multi-vendor e-commerce engines, and AI utilities.",
    highlights: [
      "Detailed architectural schematics for 12+ industry solutions",
      "Turnkey vs custom development scope and timeline comparisons",
      "Security compliance protocols (HIPAA, SOC2, PCI-DSS)",
      "Dedicated pod sizing guides and pricing models",
    ],
    techTags: ["Service Catalog", "Architecture PDF", "Enterprise Whitepaper"],
    link: "#brochure",
    linkLabel: "Instant Catalog Download",
    isModalTrigger: true,
  },
];

const ourResourceEdgePoints = [
  "Comprehensive Architecture Blueprints & IaC Templates",
  "Free Proprietary AI Talent Intelligence & Resume Tools",
  "Transparent Project Scope & Budget Calculators",
  "Enterprise SOC2, HIPAA & PCI-DSS Compliance Runbooks",
  "Production-Tested Codebases & High-Speed Delivery",
];

const categoryTabs = [
  { id: "all", label: "All Resources", emoji: "⚡" },
  { id: "guides-whitepapers", label: "Guides & Insights", emoji: "💡" },
  { id: "interactive-ai-tools", label: "Interactive AI Tools", emoji: "🧮" },
  { id: "budget-calculators", label: "Budget & Scope Calculators", emoji: "💰" },
  { id: "cloud-iac-blueprints", label: "Cloud & IaC Blueprints", emoji: "☁️" },
  { id: "security-compliance", label: "Security & Compliance", emoji: "🛡️" },
  { id: "downloads-deck", label: "Capabilities & Downloads", emoji: "📚" },
];

const faqsList = [
  {
    q: "How can I access technical documentation or blueprints for our build?",
    a: "Every project kicked off with NexoraLab Technologies includes complete architectural documentation, entity relationship diagrams (ERDs), API contract Swagger/Postman collections, and Terraform infrastructure scripts transferred directly to your private repository.",
  },
  {
    q: "Can I try out the AI tools before partnering on an enterprise contract?",
    a: "Yes! Our entire AI Talent Intelligence Suite (AI Resume Analyzer, ATS Score Benchmark, AI Resume Builder, and Voice Mock Interviewer) is live and freely testable directly on our platform.",
  },
  {
    q: "How do we download your corporate capabilities brochure?",
    a: "Click on any 'Download Brochure' button across the site to open our instant brochure delivery modal. You can also view our full services catalog on the /services page.",
  },
  {
    q: "Do you provide source code and infrastructure ownership?",
    a: "Yes, absolutely. 100% of the source code, database schemas, Docker containers, and cloud IaC configurations belong exclusively to your organization from Day 1.",
  },
];

import { contentService } from "@/services/content.service";

const ResourcesPage: React.FC = () => {
  const { openQuoteModal, openBrochureModal } = useModal();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [resourceItems, setResourceItems] = useState<ResourceItem[]>(allResources);

  // Auto-scroll to hash anchor if present
  React.useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [location.hash]);

  // Fetch dynamic CMS resources
  React.useEffect(() => {
    const fetchCmsResources = async () => {
      try {
        const items = await contentService.getContent("resources");
        if (items && items.length > 0) {
          const mapped: ResourceItem[] = items.map((item: any, idx: number) => ({
            id: item._id || item.id || `cms_res_${idx}`,
            category: (item.category?.includes("Guides") ? "guides-whitepapers" : item.category?.includes("Cloud") ? "cloud-iac-blueprints" : item.category?.includes("Security") ? "security-compliance" : item.category?.includes("Deck") ? "downloads-deck" : "guides-whitepapers") as any,
            categoryLabel: item.category || "Guides & Engineering Blogs",
            emoji: "💡",
            badge: item.badge || "Engineering Hub",
            badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
            title: item.title,
            tagline: item.subtitle || item.tagline || "",
            desc: item.description || "",
            highlights: Array.isArray(item.highlights) ? item.highlights : [],
            techTags: Array.isArray(item.techTags) ? item.techTags : ["Engineering"],
            link: item.link || "/insights",
            linkLabel: item.linkLabel || "Explore Resource",
          }));
          // Merge: dynamic items first, then static defaults that aren't duplicates
          const nonDupes = allResources.filter(
            (def) => !mapped.some((m) => m.title.toLowerCase() === def.title.toLowerCase())
          );
          setResourceItems([...mapped, ...nonDupes]);
        }
      } catch {
        // Keep default allResources
      }
    };
    fetchCmsResources();
  }, []);

  const filteredResources = useMemo(() => {
    return resourceItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        query === "" ||
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query) ||
        item.techTags.some((t) => t.toLowerCase().includes(query)) ||
        item.highlights.some((h) => h.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery, resourceItems]);

  return (
    <>
      <SEO
        title="Technical Resources, Blueprints & AI Tools | NexoraLab Technologies"
        description="Access enterprise engineering insights, system design blueprints, AI developer tools, case studies, project calculators, and corporate brochures from NexoraLab Technologies."
        keywords={[
          "software engineering resources",
          "system design blueprints",
          "software architecture whitepapers",
          "AI developer tools",
          "ATS score checker guide",
          "cloud cost optimization calculator",
          "software estimation guides",
          "NexoraLab technical resources",
        ]}
        canonical="https://nexoralabtechnologies.in/resources"
      />

      <div className="relative min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-20">
        {/* Background Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
        <div className="absolute top-[800px] left-10 w-[500px] h-[450px] rounded-full bg-[#7C3AED]/08 blur-[170px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-[#00D2FF] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#00D2FF]">Technical Resources</span>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.15)]">
                <HiSparkles />
                <span>Developer Knowledge Hub & Architecture Suite</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12]">
                Engineering Resources,{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                  Tools & Architecture Blueprints
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Everything you need to evaluate, design, architect, and scale next-generation digital products — from live AI tools and system design whitepapers to cloud Terraform scripts and corporate capability brochures.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={openBrochureModal}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <HiDocumentArrowDown className="text-base" />
                  <span>Download Corporate Brochure</span>
                </button>

                <Link
                  to="/meeting"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  <HiCalendar className="text-cyan-400 text-sm" />
                  <span>Book Architecture Call</span>
                </Link>
              </div>
            </div>

            {/* Right Hero: Our Resource Edge Box */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#07132b]/95 via-[#060b18]/90 to-[#040814]/95 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden">
                <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold tracking-wider text-cyan-300 uppercase font-['Outfit'] flex items-center gap-2">
                    <HiCheckCircle className="text-[#00D2FF] text-base" />
                    <span>OUR RESOURCE EDGE</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    Enterprise Grade
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Accelerate your software engineering lifecycle with battle-tested whitepapers, open-access AI talent suites, and automated budget estimators.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {ourResourceEdgePoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#00D2FF] text-sm shrink-0 mt-0.5">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={openQuoteModal}
                    className="flex-1 rounded-xl bg-[#00D2FF] py-2 text-center text-xs font-bold text-black transition hover:bg-cyan-300 cursor-pointer"
                  >
                    Request Estimation →
                  </button>
                  <Link
                    to="/resume-analyzer"
                    className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2 text-center text-xs font-bold text-white transition hover:bg-white/10"
                  >
                    Launch AI Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Category Filter Bar */}
          <div className="mt-16 space-y-4 border-b border-white/10 pb-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources, AI tools, Terraform scripts, HIPAA..."
                  className="w-full rounded-full border border-white/15 bg-[#091124] pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-400 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <HiXMark className="text-sm" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 scrollbar-none">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      activeCategory === tab.id
                        ? "bg-cyan-500/20 text-[#00D2FF] border border-cyan-400/50 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                        : "bg-white/[0.03] text-slate-400 hover:text-white border border-transparent hover:border-white/10"
                    }`}
                  >
                    <span>{tab.emoji}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Catalog Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((res) => {
                return (
                  <motion.div
                    key={res.id}
                    id={res.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl border border-white/10 bg-[#080f22] p-6 sm:p-7 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] group relative overflow-hidden scroll-mt-36"
                  >
                    <div>
                      {/* Top Bar: Emoji & Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                          <span>{res.emoji}</span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${res.badgeColor}`}>
                          {res.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-['Outfit'] leading-snug">
                        {res.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs font-semibold text-cyan-400/90 mt-1 font-mono">
                        {res.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-normal">
                        {res.desc}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                        {res.highlights.slice(0, 3).map((hl, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                            <span className="text-[#00D2FF] shrink-0">✦</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {res.techTags.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-[10px] font-medium text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Link */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      {res.isModalTrigger ? (
                        <button
                          onClick={openBrochureModal}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#00D2FF] hover:text-white transition group-hover:translate-x-1 cursor-pointer"
                        >
                          <span>{res.linkLabel}</span>
                          <HiArrowRight className="text-xs" />
                        </button>
                      ) : (
                        <Link
                          to={res.link}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#00D2FF] hover:text-white transition group-hover:translate-x-1"
                        >
                          <span>{res.linkLabel}</span>
                          <HiArrowRight className="text-xs" />
                        </Link>
                      )}

                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        {res.categoryLabel.split(" ")[0]}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* If No Search Results */}
          {filteredResources.length === 0 && (
            <div className="py-20 text-center space-y-3">
              <p className="text-base text-slate-400">No resources found matching "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-5 py-2 text-xs font-bold text-[#00D2FF] hover:bg-cyan-500/20 transition cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Engineering Knowledge Base & FAQs Section */}
          <div className="mt-28 max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Technical Knowledge Base & FAQs
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Common questions regarding source code access, AI testing, and architectural delivery models.
              </p>
            </div>

            <div className="space-y-3">
              {faqsList.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#080f22] p-4 sm:p-5 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between text-left text-xs sm:text-sm font-bold text-white cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-cyan-400 text-base">{openFaq === idx ? "−" : "+"}</span>
                  </button>
                  {openFaq === idx && (
                    <p className="mt-3 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 font-normal">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcesPage;
