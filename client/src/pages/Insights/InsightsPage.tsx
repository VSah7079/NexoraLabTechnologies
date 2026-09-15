import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiSparkles,
  HiClock,
  HiArrowUpRight,
  HiUser,
  HiTag,
  HiEnvelope,
  HiCheckCircle,
} from "react-icons/hi2";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";

import {
  insightsNextjsReactImg,
  insightsAiAgentsImg,
  insightsCloudDevopsImg,
  mobileFintechImg,
  enterpriseErpImg,
} from "@/assets/images";

interface Article {
  id: string;
  title: string;
  category: "ai" | "cloud" | "mobile" | "frontend" | "security";
  categoryLabel: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  summary: string;
  tags: string[];
}

const articlesData: Article[] = [
  {
    id: "nextjs16-react19-enterprise",
    title: "Next.js 16 & React 19: Why Modern Full-Stack Dominates Enterprise SaaS in 2026",
    category: "frontend",
    categoryLabel: "Full-Stack Architecture",
    image: insightsNextjsReactImg,
    readTime: "6 min read",
    date: "Sep 12, 2026",
    author: "Vivek Kumar",
    authorRole: "Principal Solutions Architect",
    summary:
      "A technical deep-dive into Server Actions, Partial Prerendering (PPR), React Compiler optimizations, and how they reduce TTFB by 45% in high-load enterprise dashboards.",
    tags: ["Next.js 16", "React 19", "Performance", "SaaS Architecture"],
  },
  {
    id: "sub-15ms-ats-parsing-nlp",
    title: "Sub-15ms Neural ATS Parsing: Harnessing Vector Embeddings and OCR for Smart Hiring",
    category: "ai",
    categoryLabel: "AI & Data Intelligence",
    image: insightsAiAgentsImg,
    readTime: "8 min read",
    date: "Sep 08, 2026",
    author: "AI Research Pod",
    authorRole: "NexoraLab AI Labs",
    summary:
      "How NexoraLab engineered proprietary OCR tokenizers and vector similarity pipelines in PostgreSQL to benchmark candidates against complex job descriptions in milliseconds.",
    tags: ["AI ATS", "FastAPI", "Vector Embeddings", "pgvector"],
  },
  {
    id: "kubernetes-cost-optimization-sre",
    title: "Kubernetes FinOps: Cutting AWS Multi-Region Cluster Spend by 64% without Sacrificing Uptime",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    image: insightsCloudDevopsImg,
    readTime: "7 min read",
    date: "Aug 29, 2026",
    author: "DevOps Infrastructure Team",
    authorRole: "Site Reliability Engineers",
    summary:
      "A practical blueprint on spot instance orchestration, Karpenter horizontal auto-scaling, Helm chart governance, and Prometheus telemetry alerting.",
    tags: ["AWS EKS", "Kubernetes", "FinOps", "DevOps CI/CD"],
  },
  {
    id: "flutter-vs-react-native-2026",
    title: "Flutter vs. React Native in 2026: Architectural Benchmarks for Enterprise Mobile Apps",
    category: "mobile",
    categoryLabel: "Mobile Engineering",
    image: mobileFintechImg,
    readTime: "5 min read",
    date: "Aug 15, 2026",
    author: "Mobile Engineering Pod",
    authorRole: "Senior Mobile Architects",
    summary:
      "Comparing Impeller rendering engine performance with React Native Fabric architecture across battery drain, startup cold boot times, and cross-platform native bridging.",
    tags: ["Flutter", "React Native", "iOS", "Android"],
  },
  {
    id: "zero-trust-devsecops-pipeline",
    title: "Zero Trust DevSecOps: Automated SAST/DAST and Secret Hardening in GitHub Actions",
    category: "security",
    categoryLabel: "Cybersecurity",
    image: enterpriseErpImg,
    readTime: "9 min read",
    date: "Aug 02, 2026",
    author: "Security & Compliance Lead",
    authorRole: "ISO 27001 Auditor",
    summary:
      "Integrating automated vulnerability scanning (Snyk, SonarQube, GitGuardian) into continuous release pipelines to achieve ISO 27001 and SOC 2 readiness seamlessly.",
    tags: ["DevSecOps", "ISO 27001", "OWASP Top 10", "GitHub Actions"],
  },
];

const InsightsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { openQuoteModal } = useModal();

  const filteredArticles =
    activeCategory === "all"
      ? articlesData
      : articlesData.filter((a) => a.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
  };

  return (
    <>
      <SEO
        title="Engineering Insights & Tech Blogs | NexoraLab Technologies"
        description="Read technical articles, architecture teardowns, and engineering insights on Next.js 16, React 19, Generative AI, Cloud DevOps, and Mobile Engineering from NexoraLab Technologies."
        keywords={[
          "software engineering blog",
          "React 19 architecture insights",
          "Next.js performance optimization",
          "AI engineering articles India",
          "cloud infrastructure best practices",
          "tech insights Siwan Bihar",
          "NexoraLab technology articles",
        ]}
        canonical="https://nexoralabtechnologies.in/insights"
      />

      <div className="relative min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-20">
        {/* Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
        <div className="absolute top-[700px] left-10 w-[500px] h-[450px] rounded-full bg-[#7C3AED]/08 blur-[170px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-[#00D2FF]">Home</Link>
            <span>/</span>
            <span className="text-[#00D2FF]">Engineering Insights</span>
          </div>

          {/* Header */}
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
              <HiSparkles />
              <span>Engineering Knowledge Base</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15]">
              Architectural Insights & <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">Tech Blueprints</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
              Deep-dives, production retrospectives, and practical guides written by our principal software engineers and solutions architects.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar border-b border-white/10">
            {[
              { id: "all", label: "All Insights" },
              { id: "frontend", label: "Full-Stack & Web" },
              { id: "ai", label: "AI & ATS Intelligence" },
              { id: "cloud", label: "Cloud & DevOps" },
              { id: "mobile", label: "Mobile Engineering" },
              { id: "security", label: "Cybersecurity" },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] scale-105"
                      : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="group rounded-3xl border border-white/10 bg-[#070e1e]/90 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(0,210,255,0.15)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Article Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-[#070e1e]/30 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-[#070e1e]/80 border border-cyan-500/40 px-3 py-1 text-[11px] font-bold text-cyan-300 backdrop-blur-md">
                      {art.categoryLabel}
                    </span>
                    <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-[#070e1e]/80 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                      <HiClock /> {art.readTime}
                    </span>
                  </div>

                  <div className="p-6 pb-0">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-5">
                  <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/20 text-[#00D2FF] font-bold text-[10px]">
                        {art.author.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-200 block text-[11px]">{art.author}</span>
                        <span className="text-[10px] text-slate-500">{art.date}</span>
                      </div>
                    </div>

                    <button
                      onClick={openQuoteModal}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 group-hover:bg-[#00D2FF] group-hover:text-black group-hover:border-transparent transition-all"
                    >
                      <HiArrowUpRight />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {art.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-slate-300 font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
            ))}
          </div>

          {/* Newsletter Lead Magnet */}
          <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-[#091630] via-[#060e20] to-[#040914] p-8 sm:p-12 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                ✦ Engineering Dispatch
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Get Bi-Weekly Architecture Blueprints in Your Inbox
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Join 12,000+ tech leaders receiving our deep-dives on Next.js, LLMs, microservices, and cloud optimization.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              {isSubscribed ? (
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 px-6 py-4 text-emerald-400 text-sm font-bold">
                  <HiCheckCircle className="text-xl" />
                  <span>You're subscribed! Check your inbox for the welcome pack.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex items-center">
                    <HiEnvelope className="absolute left-4 text-slate-400 text-base pointer-events-none" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your work email"
                      required
                      className="w-full sm:w-80 rounded-2xl border border-white/10 bg-slate-900/90 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-[#00D2FF]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-[#00D2FF] to-[#0066FF] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:scale-105 active:scale-95 shrink-0"
                  >
                    Subscribe Free →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsightsPage;
