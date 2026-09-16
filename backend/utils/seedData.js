const ContentItem = require('../models/ContentItem');
const Setting = require('../models/Setting');
const AdminUser = require('../models/AdminUser');
const { isMongoConnected, readDiskData, writeDiskData, defaultSettings } = require('./storage');

const initialServices = [
  {
    type: 'services',
    title: 'Custom Software & Web Engineering',
    category: 'Engineering',
    subtitle: 'High-performance React, Next.js 15, Node.js & Go web ecosystems',
    description: 'We build battle-tested, high-throughput web applications with sub-second page loads, micro-frontend architecture, and enterprise security standards.',
    features: ['Next.js 15 & React 19 SSR/SSG', 'Scalable REST & GraphQL APIs', 'Role-Based Access Control (RBAC)', 'Real-time WebSocket Data Sync'],
    badge: 'Core Division',
    order: 1,
    isActive: true,
  },
  {
    type: 'services',
    title: 'Enterprise SaaS Multi-Tenant Platforms',
    category: 'Cloud SaaS',
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
    category: 'Mobile',
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
    category: 'AI & Machine Learning',
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
    category: 'Cloud Infrastructure',
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
    category: 'Enterprise CRM',
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
    category: 'Talent AI',
    subtitle: 'Autonomous resume parsing, semantic score matching, and candidate evaluation',
    description: 'AI-powered recruitment suite that parses resumes in seconds, calculates deep semantic match scores against job descriptions, and predicts candidate skill fit.',
    features: ['Instant Multi-Format Resume Parser (PDF/DOCX)', 'Semantic Skill Matching & Keyword Gap Engine', 'Bias-Free Automated Screening', 'Custom Interview Question Generator'],
    badge: 'Turnkey SaaS',
    order: 1,
    isActive: true,
  },
  {
    type: 'products',
    title: 'Nexora CloudOps Auto-Scaler',
    category: 'DevOps',
    subtitle: 'Autonomous Kubernetes cloud cost optimizer and self-healing cluster manager',
    description: 'Intelligent monitoring agent that dynamically sizes cloud nodes based on predicted traffic, reducing AWS/GCP bills by up to 40%.',
    features: ['Real-time Node Predictive Scaling', 'Automated Health Recovery', 'Slack/Discord Alert Integrations', 'Multi-Cloud Dashboard'],
    badge: 'DevOps Tool',
    order: 2,
    isActive: true,
  },
  {
    type: 'products',
    title: 'Nexora Enterprise Copilot',
    category: 'Enterprise AI',
    subtitle: 'Private RAG knowledge retrieval and document intelligence agent',
    description: 'Secure, on-premise or private cloud AI assistant that ingests your company policies, technical docs, and CRM to answer employee inquiries instantly.',
    features: ['Private On-Premise / VPC Deployment', 'Source Citation with Direct Page Previews', 'Role-Based Access Control', 'Multi-Language Support'],
    badge: 'AI Solution',
    order: 3,
    isActive: true,
  },
];

const initialPortfolio = [
  {
    type: 'portfolio',
    title: 'FinTech Multi-Currency Remittance Platform',
    category: 'FinTech',
    subtitle: 'Processing $40M+ in international peer-to-peer transfers with sub-second settlement',
    description: 'Built a PCI-DSS compliant fintech mobile & web ecosystem with biometric authentication, automated FX conversion, and fraud detection.',
    client: 'Global Pay Inc.',
    tags: ['React Native', 'Node.js Microservices', 'PostgreSQL', 'AWS KMS', 'Stripe'],
    order: 1,
    isActive: true,
  },
  {
    type: 'portfolio',
    title: 'Telehealth AI Consultation & EHR Suite',
    category: 'HealthTech',
    subtitle: 'HIPAA-compliant telemedicine platform serving 250,000+ patients annually',
    description: 'Architected an end-to-end encrypted video consultation platform with automated medical record transcription and prescription dispatch.',
    client: 'MediPulse Health',
    tags: ['Next.js 15', 'WebRTC', 'Python FastAPI', 'AWS HIPAA VPC', 'TailwindCSS'],
    order: 2,
    isActive: true,
  },
  {
    type: 'portfolio',
    title: 'Smart Logistics & Route Optimization Hub',
    category: 'Logistics',
    subtitle: 'Real-time GPS fleet tracking reducing fuel costs by 24%',
    description: 'Developed an automated dispatch platform calculating optimal multi-stop routes using genetic routing algorithms for 1,200 active trucks.',
    client: 'FleetTrack Logistics',
    tags: ['React', 'Go Golang', 'MongoDB', 'Mapbox GL', 'WebSockets'],
    order: 3,
    isActive: true,
  },
];

const initialInsights = [
  {
    type: 'insights',
    title: 'Building High-Performance Next.js 15 Web Applications in 2026',
    category: 'Web Engineering',
    subtitle: 'Server Components, Turbopack, and partial prerendering strategies for modern engineering teams',
    description: 'A deep architectural dive into maximizing Core Web Vitals, structuring micro-frontends, and deploying globally distributed Next.js 15 systems.',
    author: 'Principal Architect, NexoraLab',
    readTime: '6 min read',
    order: 1,
    isActive: true,
  },
  {
    type: 'insights',
    title: 'Architecting Private RAG & Multi-Agent Workflows for Enterprise',
    category: 'Artificial Intelligence',
    subtitle: 'How to deploy autonomous AI agents without leaking proprietary intellectual property',
    description: 'Examining vector embeddings, hybrid semantic retrieval, guardrails, and deterministic routing for enterprise LLM applications.',
    author: 'AI Research Lead, NexoraLab',
    readTime: '8 min read',
    order: 2,
    isActive: true,
  },
  {
    type: 'insights',
    title: 'Zero-Downtime Cloud Migration: From Monolith to Kubernetes',
    category: 'Cloud & DevOps',
    subtitle: 'A step-by-step case study on migrating legacy enterprise databases to AWS EKS',
    description: 'Strategies for zero-downtime database replication, blue-green deployments, canary testing, and automated rollbacks.',
    author: 'DevOps Lead, NexoraLab',
    readTime: '5 min read',
    order: 3,
    isActive: true,
  },
];

const seedInitialData = async () => {
  try {
    const allSeeds = [...initialServices, ...initialProducts, ...initialPortfolio, ...initialInsights];

    if (isMongoConnected()) {
      const count = await ContentItem.countDocuments();
      if (count === 0) {
        console.log('Seeding initial CMS ContentItems in MongoDB...');
        await ContentItem.insertMany(allSeeds);
        console.log('CMS ContentItems seeded successfully.');
      }

      const settingCount = await Setting.countDocuments();
      if (settingCount === 0) {
        console.log('Seeding default Site Settings in MongoDB...');
        await Setting.create(defaultSettings);
        console.log('Site Settings seeded successfully.');
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
        console.log('Default AdminUser created (ID: admin / admin@nexoralab.in, Pass: Admin@Nexora2026)');
      }
    } else {
      const diskContent = readDiskData('content');
      if (!diskContent || diskContent.length === 0) {
        const withIds = allSeeds.map((item, idx) => ({
          _id: 'seed_' + item.type + '_' + idx,
          id: 'seed_' + item.type + '_' + idx,
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
        writeDiskData('content', withIds);
      }

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
