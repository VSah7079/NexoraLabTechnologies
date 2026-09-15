import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const articles = [
  {
    id: "nextjs-enterprise-architecture",
    category: "Full-Stack Architecture",
    title: "Next.js 16 & React 19: Best Practices for High-Throughput Enterprise SaaS",
    excerpt:
      "Explore server-side rendering optimizations, edge caching strategies, and modular micro-frontend design for mission-critical web applications.",
    link: "/insights",
  },
  {
    id: "ai-resume-ats-engine",
    category: "Artificial Intelligence",
    title: "Building Scalable ATS Resume Analyzers with Vector Embeddings & OCR",
    excerpt:
      "A deep dive into semantic NLP parsing, skill extraction, vector indexing with pgvector, and automated candidate match scoring.",
    link: "/insights",
  },
  {
    id: "cloud-microservices-resilience",
    category: "Cloud & DevOps",
    title: "Microservices Resilience: Managing Kubernetes & Redis Under Peak Concurrency",
    excerpt:
      "Architectural patterns for zero-downtime blue/green deployments, circuit breakers, and distributed rate limiting on AWS EKS.",
    link: "/insights",
  },
];

const Insights: React.FC = () => {
  return (
    <section id="insights" className="relative overflow-hidden bg-transparent py-20 sm:py-28 border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-2">
            Engineering Insights
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Insights on software, <em className="not-italic text-[#00D2FF]">AI, and cloud architecture</em>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Practical insights, engineering blueprints, and architectural perspectives from the NexoraLab technical team on building high-performance digital systems.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#070e1e]/90 p-7 backdrop-blur-xl transition hover:border-[#00D2FF]/40 hover:-translate-y-1 shadow-lg"
            >
              <div>
                <span className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-[11px] font-bold text-[#00D2FF] uppercase tracking-wider mb-4">
                  {art.category}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                  {art.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <Link
                  to={art.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D2FF] hover:text-white transition"
                >
                  <span>Read Article</span>
                  <HiArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#00D2FF]/50 hover:bg-white/10"
          >
            <span>View All Engineering Blogs</span>
            <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Insights;
