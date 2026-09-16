const ContentItem = require('../models/ContentItem');
const Setting = require('../models/Setting');
const AdminUser = require('../models/AdminUser');
const { isMongoConnected, readDiskData, writeDiskData, defaultSettings } = require('./storage');

const initialServices = [
  {
    type: 'services',
    title: 'Custom Software & Web Engineering',
    category: 'Custom Software Development',
    subtitle: 'High-performance React 19, Next.js 15, Node.js & Go web ecosystems',
    description: 'We build battle-tested, high-throughput web applications with sub-second page loads, micro-frontend architecture, and enterprise security standards.',
    features: ['Next.js 15 & React 19 SSR/SSG', 'Scalable REST & GraphQL APIs', 'Role-Based Access Control (RBAC)', 'Real-time WebSocket Data Sync'],
    badge: 'Core Division',
    order: 1,
    isActive: true,
  },
  {
    type: 'services',
    title: 'Enterprise SaaS Multi-Tenant Platforms',
    category: 'Enterprise SaaS Platforms',
    subtitle: 'Scalable subscription software with automated tenant isolation',
    description: 'Architecting multi-tenant SaaS platforms featuring automated tenant provisioning, Stripe/Razorpay billing, usage metering, and high-availability databases.',
    features: ['Database Multi-Tenancy (Isolated/Shared)', 'Automated Recurring Invoicing', 'Role & Permission Granularity', 'SOC-2 Compliance Ready'],
    badge: 'Enterprise',
    order: 2,
    isActive: true,
  },
  {
    type: 'services',
    title: 'Mobile App Engineering (iOS & Android)',
    category: 'Mobile App Engineering',
    subtitle: 'Cross-platform Flutter & React Native native mobile apps',
    description: 'Fluid, 60fps native mobile experiences with offline caching, biometric security, push notifications, and seamless device sensor integration.',
    features: ['Flutter & React Native cross-platform', 'Biometric FaceID / Fingerprint Auth', 'Offline SQLite & Supabase Sync', 'App Store & Play Store CI/CD Deployment'],
    badge: 'High Demand',
    order: 3,
    isActive: true,
  },
  {
    type: 'services',
    title: 'Generative AI & Autonomous Agent Systems',
    category: 'AI & Autonomous Agent Systems',
    subtitle: 'Custom LLM fine-tuning, RAG neural pipelines, and AI copilot agents',
    description: 'Empower your enterprise with private LLM deployment, multi-vector RAG search on proprietary documents, and autonomous task execution agents.',
    features: ['LangChain, LlamaIndex & DeepSeek/OpenAI/Gemini', 'Vector Embeddings & Semantic Search', 'Automated Customer Agent Workflows', 'Strict Zero-Data-Leakage Isolation'],
    badge: 'Flagship AI',
    order: 4,
    isActive: true,
  },
  {
    type: 'services',
    title: 'Cloud Architecture, AWS & DevOps CI/CD',
    category: 'Cloud DevOps & Architecture',
    subtitle: 'Zero-downtime Kubernetes, Terraform, and automated deployment pipelines',
    description: 'Infrastructure as Code (IaC) architectures on AWS, GCP, and Azure designed for 99.99% uptime, auto-scaling traffic spikes, and minimal cloud bills.',
    features: ['AWS / GCP Cloud Native Architecture', 'Kubernetes & Docker Microservices', 'GitHub Actions Automated CI/CD Pipelines', 'Cloud Cost Optimization & FinOps'],
    badge: 'CloudOps',
    order: 5,
    isActive: true,
  },
  {
    type: 'services',
    title: 'Salesforce Consulting & Enterprise CRM',
    category: 'Salesforce & Enterprise CRM',
    subtitle: 'LWC, Apex development, and automated workflow orchestrations',
    description: 'End-to-end Salesforce customization, Sales Cloud, Service Cloud, Experience Cloud, and third-party ERP integrations.',
    features: ['Lightning Web Components (LWC)', 'Custom Apex Triggers & REST Integrations', 'Automated Flow Orchestration', 'Data Migration & Legacy CRM Transition'],
    badge: 'CRM Enterprise',
    order: 6,
    isActive: true,
  },
];

const initialProducts = [
  {
    type: 'products',
    title: 'Nexora AI Talent Intelligence & ATS Engine',
    category: 'Talent AI & ATS',
    subtitle: 'Autonomous resume parsing, semantic score matching, and candidate evaluation',
    description: 'AI-powered recruitment suite that parses resumes in seconds, calculates deep semantic match scores against job descriptions, and predicts candidate skill fit.',
    features: ['Instant Multi-Format Resume Parser (PDF/DOCX)', 'Semantic Skill Matching & Keyword Gap Engine', 'Bias-Free Automated Screening', 'Custom Interview Question Generator'],
    badge: 'Turnkey SaaS',
    liveUrl: '/resume-analyzer',
    order: 1,
    isActive: true,
  },
  {
    type: 'products',
    title: 'Food Delivery & Multi-Restaurant Ordering Platform',
    category: 'On-Demand & Delivery',
    subtitle: 'Multi-restaurant catalog, real-time driver tracking & split merchant payouts',
    description: 'A production-tested food delivery ecosystem with customer ordering apps (iOS/Android), restaurant partner POS consoles, driver navigation apps, and super-admin dispatch heatmaps.',
    features: ['Real-time Geofenced Driver Tracking', 'Dynamic Surge Pricing & Automated Split Payouts', 'Live Order Statuses with Push Webhooks', 'Kitchen Display System (KDS) & Modifier Manager'],
    badge: 'Turnkey Stack',
    liveUrl: '/quote',
    order: 2,
    isActive: true,
  },
  {
    type: 'products',
    title: 'Grocery & 10-Minute Dark Store Delivery Suite',
    category: 'On-Demand & Delivery',
    subtitle: 'High-speed SKU catalog, barcode scanning & sub-15min micro-fulfillment routes',
    description: 'Built for instant hyperlocal grocery delivery with integrated dark store inventory sync, smart shelf picker companion apps, and batch delivery routing algorithms.',
    features: ['50,000+ SKU Catalog with Variant Sync', 'Dark Store Picker Companion App with Barcode Scanner', 'Dynamic Batch Order Dispatching Algorithm', 'In-App Live Chat & Contactless Proof of Delivery'],
    badge: 'Quick Commerce',
    liveUrl: '/quote',
    order: 3,
    isActive: true,
  },
  {
    type: 'products',
    title: 'Telehealth & Online Clinic Consultation Suite',
    category: 'HealthTech HIPAA Suite',
    subtitle: 'HIPAA-compliant HD video calls, EHR medical records & e-prescriptions',
    description: 'Comprehensive telemedicine platform connecting patients with specialized clinicians featuring HD WebRTC consultations, digital prescription dispatch, and lab diagnostic integrations.',
    features: ['Sub-100ms Low-Latency WebRTC Encrypted Video Calling', 'EMR/EHR Digital Patient Charting & History Timeline', 'Automated Medical Diagnostic & Prescription PDF Generator', 'Integrated Razorpay & Stripe Multi-Currency Tele-Consult Payouts'],
    badge: 'HIPAA Compliant',
    liveUrl: '/portfolio',
    order: 4,
    isActive: true,
  },
  {
    type: 'products',
    title: 'Nexora CloudOps Auto-Scaler',
    category: 'DevOps & Cloud Auto-Scaler',
    subtitle: 'Autonomous Kubernetes cloud cost optimizer and self-healing cluster manager',
    description: 'Intelligent monitoring agent that dynamically sizes cloud nodes based on predicted traffic, reducing AWS/GCP bills by up to 40%.',
    features: ['Real-time Node Predictive Scaling', 'Automated Health Recovery', 'Slack/Discord Alert Integrations', 'Multi-Cloud Dashboard'],
    badge: 'DevOps Tool',
    liveUrl: '/services',
    order: 5,
    isActive: true,
  },
  {
    type: 'products',
    title: 'Nexora Enterprise Copilot',
    category: 'Enterprise AI Copilot',
    subtitle: 'Private RAG knowledge retrieval and document intelligence agent',
    description: 'Secure, on-premise or private cloud AI assistant that ingests your company policies, technical docs, and CRM to answer employee inquiries instantly.',
    features: ['Private On-Premise / VPC Deployment', 'Source Citation with Direct Page Previews', 'Role-Based Access Control', 'Multi-Language Support'],
    badge: 'AI Solution',
    liveUrl: '/solutions',
    order: 6,
    isActive: true,
  },
];

const initialPortfolio = [
  {
    type: 'portfolio',
    title: 'AI Talent Intelligence & Neural ATS Scoring Engine',
    category: 'FinTech & Payments',
    subtitle: 'Sub-15ms Resume Parsing Latency with Semantic Vector Embeddings',
    clientName: 'Global HRTech Scaleup',
    metrics: '15ms Latency • 99.4% Accuracy',
    liveUrl: '/portfolio',
    description: 'Engineered an automated ATS parsing and skill-matching engine processing 10,000+ candidate profiles daily with high semantic accuracy.',
    tags: ['Next.js 16', 'FastAPI', 'Python', 'OpenAI GPT-4', 'pgvector', 'Redis'],
    order: 1,
    isActive: true,
  },
  {
    type: 'portfolio',
    title: 'Synapse Multi-Region Cloud Microservices Architecture',
    category: 'Cloud DevOps & Architecture',
    subtitle: 'Cloud Spend Reduction with 99.99% SLA across multi-region Kubernetes',
    clientName: 'Enterprise Logistics Provider',
    metrics: '-64% Cloud Spend • 25K RPS Traffic',
    liveUrl: '/portfolio',
    description: 'Refactored a monolithic backend into high-throughput containerized microservices spanning multi-region AWS Kubernetes clusters.',
    tags: ['AWS EKS', 'Docker', 'Kubernetes', 'Kafka', 'Node.js', 'Terraform'],
    order: 2,
    isActive: true,
  },
  {
    type: 'portfolio',
    title: 'PulseCare Telehealth & Remote Patient Monitoring App',
    category: 'HealthTech & Telemedicine',
    subtitle: 'HIPAA-compliant cross-platform mobile app for real-time video consultations',
    clientName: 'Digital Health Provider',
    metrics: '120K+ Active Patients • 4.9 App Rating',
    liveUrl: '/portfolio',
    description: 'Built a HIPAA-compliant cross-platform mobile application for real-time HD video consultations, vitals telemetry, and e-prescriptions.',
    tags: ['Flutter', 'Dart', 'WebRTC', 'Node.js', 'PostgreSQL', 'HIPAA Vault'],
    order: 3,
    isActive: true,
  },
  {
    type: 'portfolio',
    title: 'FinFlow Multi-Currency Payment & Reconciliation Gateway',
    category: 'FinTech & Payments',
    subtitle: 'Ultra-low latency payment gateway with automated double-entry ledger settlement',
    clientName: 'FinTech Neo-Bank',
    metrics: '45K TPS • 12M+ Zero Discrepancy',
    liveUrl: '/portfolio',
    description: 'Developed an ultra-low latency payment gateway with automated double-entry ledger settlement, fraud detection, and instant multi-currency conversion.',
    tags: ['Go (Golang)', 'React 19', 'PostgreSQL', 'Redis', 'Docker', 'PCI-DSS'],
    order: 4,
    isActive: true,
  },
  {
    type: 'portfolio',
    title: 'OmniCart Multi-Vendor Marketplace & Operations ERP',
    category: 'Enterprise ERP & SaaS',
    subtitle: 'Multi-vendor marketplace featuring real-time inventory sync & commission splitting',
    clientName: 'E-Commerce Enterprise',
    metrics: '$2.4M Monthly GMV • 3.8x Speedup',
    liveUrl: '/portfolio',
    description: 'Custom multi-vendor marketplace platform featuring vendor self-onboarding, real-time inventory synchronization, and dynamic commission splitting.',
    tags: ['Next.js 16', 'React 19', 'Node.js', 'Elasticsearch', 'PostgreSQL', 'Tailwind'],
    order: 5,
    isActive: true,
  },
];

const initialInsights = [
  {
    type: 'insights',
    title: 'Next.js 16 & React 19: Why Modern Full-Stack Dominates Enterprise SaaS in 2026',
    category: 'Web Engineering',
    subtitle: 'Server Actions, Partial Prerendering (PPR), and React Compiler optimizations',
    description: 'A technical deep-dive into Server Actions, Partial Prerendering (PPR), React Compiler optimizations, and how they reduce TTFB by 45% in high-load enterprise dashboards.',
    author: { name: 'Vivek Kumar', role: 'Principal Solutions Architect' },
    readTime: '6 min read',
    tags: ['Next.js 16', 'React 19', 'Performance', 'SaaS Architecture'],
    order: 1,
    isActive: true,
  },
  {
    type: 'insights',
    title: 'Sub-15ms Neural ATS Parsing: Harnessing Vector Embeddings and OCR for Smart Hiring',
    category: 'Artificial Intelligence',
    subtitle: 'Proprietary OCR tokenizers and vector similarity pipelines in PostgreSQL',
    description: 'How NexoraLab engineered proprietary OCR tokenizers and vector similarity pipelines in PostgreSQL to benchmark candidates against complex job descriptions in milliseconds.',
    author: { name: 'AI Research Pod', role: 'NexoraLab AI Labs' },
    readTime: '8 min read',
    tags: ['AI ATS', 'FastAPI', 'Vector Embeddings', 'pgvector'],
    order: 2,
    isActive: true,
  },
  {
    type: 'insights',
    title: 'Kubernetes FinOps: Cutting AWS Multi-Region Cluster Spend by 64% without Sacrificing Uptime',
    category: 'Cloud & DevOps',
    subtitle: 'Spot instance orchestration, Karpenter horizontal auto-scaling, and Helm governance',
    description: 'A practical blueprint on spot instance orchestration, Karpenter horizontal auto-scaling, Helm chart governance, and Prometheus telemetry alerting.',
    author: { name: 'DevOps Infrastructure Team', role: 'Site Reliability Engineers' },
    readTime: '7 min read',
    tags: ['AWS EKS', 'Kubernetes', 'FinOps', 'DevOps CI/CD'],
    order: 3,
    isActive: true,
  },
  {
    type: 'insights',
    title: 'Flutter vs. React Native in 2026: Architectural Benchmarks for Enterprise Mobile Apps',
    category: 'Mobile Architecture',
    subtitle: 'Comparing Impeller rendering engine performance with React Native Fabric',
    description: 'Comparing Impeller rendering engine performance with React Native Fabric architecture across battery drain, startup cold boot times, and cross-platform native bridging.',
    author: { name: 'Mobile Engineering Pod', role: 'Senior Mobile Architects' },
    readTime: '5 min read',
    tags: ['Flutter', 'React Native', 'iOS', 'Android'],
    order: 4,
    isActive: true,
  },
  {
    type: 'insights',
    title: 'Zero Trust DevSecOps: Automated SAST/DAST and Secret Hardening in GitHub Actions',
    category: 'Cybersecurity & RBAC',
    subtitle: 'Integrating automated vulnerability scanning into continuous release pipelines',
    description: 'Integrating automated vulnerability scanning (Snyk, SonarQube, GitGuardian) into continuous release pipelines to achieve ISO 27001 and SOC 2 readiness seamlessly.',
    author: { name: 'Security & Compliance Lead', role: 'ISO 27001 Auditor' },
    readTime: '9 min read',
    tags: ['DevSecOps', 'ISO 27001', 'OWASP Top 10', 'GitHub Actions'],
    order: 5,
    isActive: true,
  },
];

const initialTestimonials = [
  {
    type: 'testimonials',
    title: 'Outstanding Enterprise ERP Transformation',
    clientName: 'Rahul Sharma',
    role: 'CEO & Founder',
    company: 'TechNova Pvt. Ltd.',
    description: 'NexoraLab Technologies delivered an outstanding enterprise ERP solution that completely transformed our operations and accelerated workflow by 400%.',
    rating: 5,
    order: 1,
    isActive: true,
  },
  {
    type: 'testimonials',
    title: 'World-Class UI/UX & Sub-Second Speed',
    clientName: 'Priya Verma',
    role: 'Product Director',
    company: 'EduSmart Platforms',
    description: 'World-class engineering team! The UI/UX redesign gave our EdTech app a ultra-premium feel with flawless sub-second loading performance.',
    rating: 5,
    order: 2,
    isActive: true,
  },
  {
    type: 'testimonials',
    title: 'HIPAA-Compliant Hospital Platform Excellence',
    clientName: 'Amit Singh',
    role: 'Managing Director',
    company: 'HealthCare Plus',
    description: 'The HIPAA-compliant hospital management & analytics suite exceeded all our expectations. Highly recommended for critical enterprise software.',
    rating: 5,
    order: 3,
    isActive: true,
  },
  {
    type: 'testimonials',
    title: 'Scalable Microservices Backbone',
    clientName: 'Sneha Patel',
    role: 'CTO',
    company: 'Retail Hub Global',
    description: 'Remarkable support, scalable microservice architecture, and unmatched software craft. They became our dedicated long-term technology backbone.',
    rating: 5,
    order: 4,
    isActive: true,
  },
];

const initialFaqs = [
  {
    type: 'faqs',
    title: 'What core custom software engineering services does NexoraLab provide?',
    question: 'What core custom software engineering services does NexoraLab provide?',
    answer: 'NexoraLab Technologies delivers full-lifecycle custom web and SaaS platforms (React 19, Next.js, Node.js, Python), high-performance mobile apps (Flutter, React Native, iOS, Android), enterprise ERP/CRM portals, scalable microservices architectures, and 24/7 cloud infrastructure management on AWS and Azure.',
    category: 'Engineering & Tech',
    order: 1,
    isActive: true,
  },
  {
    type: 'faqs',
    title: 'How does NexoraLab\'s proprietary AI Talent Intelligence & ATS suite work?',
    question: 'How does NexoraLab\'s proprietary AI Talent Intelligence & ATS suite work?',
    answer: 'Our AI suite utilizes advanced optical character recognition (OCR), semantic vector embeddings (Pinecone/pgvector), and Google Gemini LLMs to parse unstructured resumes, benchmark candidate skill gaps, predict market-accurate salaries, conduct automated mock interviews, and score candidates in under 15 milliseconds with 99.4% accuracy.',
    category: 'AI & Data Intelligence',
    order: 2,
    isActive: true,
  },
  {
    type: 'faqs',
    title: 'Who retains intellectual property (IP) rights and source code ownership?',
    question: 'Who retains intellectual property (IP) rights and source code ownership?',
    answer: 'You retain 100% full intellectual property ownership, Git repository access, architecture documentation, and deployment configurations upon milestone completion. We execute bilateral non-disclosure agreements (NDA) and strict confidentiality terms before starting any project.',
    category: 'Support & SLAs',
    order: 3,
    isActive: true,
  },
  {
    type: 'faqs',
    title: 'Can NexoraLab augment our existing internal software engineering team?',
    question: 'Can NexoraLab augment our existing internal software engineering team?',
    answer: 'Yes. We provide pre-vetted senior full-stack, AI/ML, mobile, and DevOps engineering pods that integrate directly into your sprint cycles, daily standups, and communication channels (Slack, Jira, GitHub) within 48 to 72 hours.',
    category: 'Project Management',
    order: 4,
    isActive: true,
  },
  {
    type: 'faqs',
    title: 'How do you estimate project timelines, budgets, and milestones?',
    question: 'How do you estimate project timelines, budgets, and milestones?',
    answer: 'We evaluate your functional specifications, target user load, UI/UX complexity, and third-party API dependencies. Within 24 hours of your initial discovery call, our solutions architects deliver a detailed, fixed-scope milestone roadmap and transparent budget breakdown.',
    category: 'Pricing & Engagement Models',
    order: 5,
    isActive: true,
  },
  {
    type: 'faqs',
    title: 'How does your engineering team collaborate and keep clients updated?',
    question: 'How does your engineering team collaborate and keep clients updated?',
    answer: 'We provide regular sprint updates, dedicated communication channels (Email: nexoralabtechnologies@gmail.com, WhatsApp, Slack), and live staging demonstrations directly from our engineering center in Siwan, Bihar, India.',
    category: 'Project Management',
    order: 6,
    isActive: true,
  },
  {
    type: 'faqs',
    title: 'What post-launch SLA, maintenance, and cloud monitoring support do you offer?',
    question: 'What post-launch SLA, maintenance, and cloud monitoring support do you offer?',
    answer: 'We provide comprehensive 24/7 cloud telemetry, automated database query optimization, security vulnerability patching, critical bug fixes, and continuous feature evolution backed by a 99.99% uptime guarantee and under-15-minute emergency response SLA.',
    category: 'Support & SLAs',
    order: 7,
    isActive: true,
  },
  {
    type: 'faqs',
    title: 'Can you train or integrate custom AI models for our proprietary business data?',
    question: 'Can you train or integrate custom AI models for our proprietary business data?',
    answer: 'Yes. We build end-to-end Retrieval-Augmented Generation (RAG) pipelines, fine-tuned domain LLMs, semantic vector search engines, and multi-modal computer vision models that securely operate on your private enterprise data with strict zero-retention data policies.',
    category: 'AI & Data Intelligence',
    order: 8,
    isActive: true,
  },
];

const initialSections = [
  {
    type: 'sections',
    title: 'Hero Section Banner',
    subtitle: 'Innovate • Build • Elevate',
    badge: 'Enterprise Software & AI Agency',
    description: 'We engineer mission-critical web applications, enterprise SaaS platforms, native mobile experiences, and proprietary AI talent intelligence engines for visionary companies globally.',
    ctaText: 'Schedule Engineering Discovery',
    ctaLink: '/meeting',
    secondaryCtaText: 'Explore Turnkey Products',
    secondaryCtaLink: '/products',
    category: 'Home Hero Banner',
    order: 1,
    isActive: true,
  },
  {
    type: 'sections',
    title: 'About Company Narrative',
    subtitle: 'Headquartered in Siwan, Bihar • Serving Clients Worldwide',
    badge: 'Our Mission & Vision',
    description: 'NexoraLab Technologies was founded with a singular conviction: to deliver Tier-1 software engineering, resilient cloud infrastructure, and state-of-the-art AI solutions with world-class craftsmanship and transparent execution.',
    ctaText: 'Get in Touch',
    ctaLink: '/contact',
    secondaryCtaText: 'Download Corporate Deck',
    secondaryCtaLink: '/brochure',
    category: 'About Us Overview',
    order: 2,
    isActive: true,
  },
];

const initialCareers = [
  {
    type: 'careers',
    title: 'Lead Full-Stack Architect (React 19 & Node.js)',
    department: 'Engineering',
    location: 'Siwan, Bihar / Remote (India)',
    jobType: 'Full-Time',
    experience: '5+ Years',
    salary: '₹18 - ₹32 LPA',
    description: 'Direct technical architecture, code standards, and microservices design across high-concurrency client web applications.',
    responsibilities: [
      'Architect and scale modular full-stack web applications sustaining high concurrent throughput.',
      'Lead technical design reviews, database indexing strategies, and API contracts.',
      'Mentor developers and ensure strict type-safe TypeScript standards.',
    ],
    requirements: [
      '5+ years building high-scale React, Next.js, and Node.js systems.',
      'Deep mastery of PostgreSQL, Redis caching, Docker containerization, and AWS.',
    ],
    perks: ['Top-tier compensation + Annual Bonus', '100% Remote flexibility', 'Full Health Insurance'],
    tags: ['React 19', 'Next.js 16', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    order: 1,
    isActive: true,
  },
  {
    type: 'careers',
    title: 'Senior AI & LLM Systems Engineer',
    department: 'AI & Data',
    location: 'Siwan, Bihar / Remote',
    jobType: 'Full-Time',
    experience: '3+ Years',
    salary: '₹16 - ₹28 LPA',
    description: 'Engineer state-of-the-art semantic parsers, autonomous ATS scoring engines, and enterprise RAG pipelines.',
    responsibilities: [
      'Develop low-latency Python/FastAPI microservices for document OCR and semantic parsing.',
      'Engineer vector search pipelines with hybrid BM25 + cosine similarity indexing.',
    ],
    requirements: [
      '3+ years experience with Python, FastAPI, and generative AI architectures.',
      'Hands-on expertise with vector databases (Pinecone, pgvector, Milvus).',
    ],
    perks: ['High-performance GPU cloud clusters', 'Proprietary AI research publishing'],
    tags: ['Python', 'FastAPI', 'OpenAI / Claude API', 'pgvector', 'Pinecone'],
    order: 2,
    isActive: true,
  },
  {
    type: 'careers',
    title: 'Lead Mobile Engineer (Flutter & React Native)',
    department: 'Engineering',
    location: 'Siwan, Bihar / Remote',
    jobType: 'Full-Time',
    experience: '4+ Years',
    salary: '₹14 - ₹25 LPA',
    description: 'Lead end-to-end development of high-performance, 60fps iOS and Android applications for fintech, telehealth, and logistics clients.',
    responsibilities: [
      'Architect cross-platform mobile apps with offline SQLite/WatermelonDB synchronizations.',
      'Implement biometric authentication, WebRTC video calling, and automated CI/CD releases to Apple App Store & Google Play.',
    ],
    requirements: [
      '4+ years building Flutter or React Native mobile applications in production.',
      'Mastery of state management (Bloc, Riverpod, Zustand, Redux Toolkit).',
    ],
    perks: ['Flexible hours', 'Device upgrade allowance'],
    tags: ['Flutter', 'React Native', 'iOS', 'Android', 'Dart', 'TypeScript'],
    order: 3,
    isActive: true,
  },
  {
    type: 'careers',
    title: 'Senior Cloud & DevOps Engineer (AWS & Kubernetes)',
    department: 'Cloud & DevOps',
    location: 'Siwan, Bihar / Remote',
    jobType: 'Full-Time',
    experience: '4+ Years',
    salary: '₹16 - ₹30 LPA',
    description: 'Design, provision, and maintain auto-scaling cloud infrastructure, Kubernetes clusters, and zero-downtime deployment pipelines.',
    responsibilities: [
      'Author Terraform modules for AWS/GCP multi-region architectures.',
      'Manage production Kubernetes clusters (EKS/GKE), Helm charts, and Prometheus/Grafana monitoring.',
    ],
    requirements: [
      '4+ years managing production cloud systems on AWS or GCP.',
      'Expertise in Terraform, Kubernetes, Docker, GitHub Actions, and SOC-2 security standards.',
    ],
    perks: ['AWS certification sponsorship', 'Home office equipment budget'],
    tags: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'FinOps'],
    order: 4,
    isActive: true,
  },
];

const initialResources = [
  {
    type: 'resources',
    title: 'Startup MVP Launchpad Guide (30-Day Blueprint)',
    category: 'Guides & Engineering Blogs',
    subtitle: 'Step-by-step roadmap to build, test, and ship scalable digital products in 30 days',
    description: 'A proven startup execution framework covering product scoping, technical stack selection, agile sprint cadence, and cost-effective cloud setup.',
    badge: 'Startup Guide',
    link: '/quote',
    linkLabel: 'Plan Your Startup MVP',
    highlights: ['30-Day Sprint Calendar', 'Tech Stack Decision Tree', 'CI/CD Setup on $50/mo', 'User Feedback Loops'],
    techTags: ['MVP Strategy', 'Agile', 'Flutter', 'Supabase'],
    order: 1,
    isActive: true,
  },
  {
    type: 'resources',
    title: 'Monolith to Microservices Scaling Architecture',
    category: 'Cloud & IaC Blueprints',
    subtitle: 'Monolith-to-microservices migration patterns, Kubernetes Helm, and API gateways',
    description: 'Comprehensive migration patterns to break monolithic legacy backends into domain-driven microservices with zero downtime and distributed tracing.',
    badge: 'Architecture IaC',
    link: '/services',
    linkLabel: 'View Cloud Blueprints',
    highlights: ['Database De-Coupling Playbook', 'Event-Driven Sagas with Kafka', 'Canary Deployment Templates'],
    techTags: ['Kubernetes', 'Microservices', 'Kafka', 'AWS EKS'],
    order: 2,
    isActive: true,
  },
  {
    type: 'resources',
    title: 'Enterprise AI Copilot & Private RAG Handbook',
    category: 'Guides & Engineering Blogs',
    subtitle: 'How to build secure Retrieval-Augmented Generation workflows without leaking corporate IP',
    description: 'An architectural reference for enterprise engineering teams implementing private LLMs, vector database indexing, semantic caching, and strict data boundary enforcement.',
    badge: 'Enterprise AI',
    link: '/insights',
    linkLabel: 'Read AI Whitepaper',
    highlights: ['Hybrid Search (BM25 + Dense Vectors)', 'Zero-Data Retention Policies', 'Latency Benchmarks'],
    techTags: ['Python', 'FastAPI', 'pgvector', 'LangChain'],
    order: 3,
    isActive: true,
  },
  {
    type: 'resources',
    title: 'NexoraLab Technologies Corporate Capability Deck',
    category: 'Corporate Decks & Downloads',
    subtitle: 'Comprehensive agency overview, case studies, technology stacks, and engagement models',
    description: 'Download our official corporate presentation detailing past client deliveries, engineering metrics, security certifications, and dedicated team pricing structures.',
    badge: 'Corporate PDF',
    link: '/contact',
    linkLabel: 'Request Executive Deck',
    highlights: ['Verified Client Testimonials', 'Tech Stack Breakdown', 'Security & SLA Commitments'],
    techTags: ['Executive Brief', 'Capabilities', 'Global Delivery'],
    order: 4,
    isActive: true,
  },
];

const seedInitialData = async () => {
  try {
    const allSeeds = [
      ...initialServices,
      ...initialProducts,
      ...initialPortfolio,
      ...initialInsights,
      ...initialCareers,
      ...initialResources,
      ...initialTestimonials,
      ...initialFaqs,
      ...initialSections,
    ];

    if (isMongoConnected()) {
      // Sync each category to ensure complete website parity
      for (const item of allSeeds) {
        const existing = await ContentItem.findOne({ title: item.title, type: item.type });
        if (!existing) {
          await ContentItem.create(item);
        }
      }
      console.log('MongoDB CMS ContentItems synchronized with 100% website parity.');

      const settingCount = await Setting.countDocuments();
      if (settingCount === 0) {
        console.log('Seeding default Site Settings in MongoDB...');
        await Setting.create(defaultSettings);
      }

      const adminCount = await AdminUser.countDocuments();
      if (adminCount === 0) {
        console.log('Seeding default AdminUser in MongoDB...');
        await AdminUser.create({
          username: 'admin',
          email: 'admin@nexoralab.in',
          password: 'Admin@Nexora2026',
          name: 'NexoraLab Principal Admin',
          role: 'superadmin',
        });
      }
    } else {
      const diskContent = readDiskData('content') || [];
      allSeeds.forEach((item, idx) => {
        const exists = diskContent.some((d) => d.title === item.title && d.type === item.type);
        if (!exists) {
          diskContent.push({
            _id: 'cms_seed_' + item.type + '_' + idx + '_' + Date.now(),
            id: 'cms_seed_' + item.type + '_' + idx + '_' + Date.now(),
            ...item,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      });
      writeDiskData('content', diskContent);

      const diskSettings = readDiskData('settings');
      if (!diskSettings || diskSettings.length === 0) {
        writeDiskData('settings', [defaultSettings]);
      }
    }
  } catch (err) {
    console.warn('Seed data initial check warning:', err.message);
  }
};

module.exports = { seedInitialData };
