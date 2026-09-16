import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";

const caseStudies = [
  {
    id: "01",
    tabTitle: "01 AI Talent Intelligence & ATS Scoring",
    tag: "AI Systems • Python & Vector DB",
    title: "Autonomous ATS resume screening & neural candidate ranking engine",
    challenge:
      "A global recruitment firm was overwhelmed by 40,000+ monthly resumes. Recruiters spent 8+ minutes manually evaluating each candidate, causing screening bottlenecks and candidate drop-offs.",
    solution:
      "NexoraLab engineered an autonomous ATS scoring pipeline using semantic OCR parsing, vector embeddings (Pinecone/pgvector), and fine-tuned LLMs to evaluate and score candidates in under 15 milliseconds.",
    result:
      "Turnaround time dropped by 85%, recruiter placement throughput rose 4.8x, and screening accuracy benchmarked at 99.4% against senior technical evaluators.",
    metrics: ["15ms Parse Latency", "+85% Faster Screening", "99.4% Accuracy SLA"],
  },
  {
    id: "02",
    tabTitle: "02 Synapse Cloud Microservices",
    tag: "Enterprise Cloud • AWS EKS & Kubernetes",
    title: "High-throughput cloud architecture with real-time microservices telemetry",
    challenge:
      "A legacy monolithic web application crashed during peak enterprise traffic surges, causing 504 gateway timeouts, high cloud hosting invoices, and unmonitored silent failures.",
    solution:
      "Decomposed the monolithic backend into 18 resilient, auto-scaling Kubernetes microservices on AWS EKS with Redis caching layers, Apache Kafka event streaming, and blue/green CI/CD pipelines.",
    result:
      "Achieved 99.99% continuous production uptime across 12 months, reduced monthly cloud infrastructure spend by 64%, and sustained sub-12ms median global API latency.",
    metrics: ["99.99% Uptime SLA", "-64% Cloud Spend", "Sub-12ms Latency"],
  },
  {
    id: "03",
    tabTitle: "03 Cross-Platform Telehealth Suite",
    tag: "Healthcare & Mobile • Flutter & Node.js",
    title: "Encrypted doctor consultations, EHR records & instant booking mobile app",
    challenge:
      "Hospital patients and doctors had to switch between disconnected systems for appointment scheduling, medical report access, prescription generation, and virtual follow-ups.",
    solution:
      "NexoraLab built a high-performance cross-platform Flutter application backed by Node.js, WebRTC, and HIPAA-compliant database encryption for video calls and instant doctor scheduling.",
    result:
      "Unified routine medical visits into a single mobile journey, facilitating over 150,000 verified telehealth consultations with a 4.9-star average app store rating.",
    metrics: ["150k+ Consultations", "4.9★ App Rating", "Zero-Wait Scheduling"],
  },
];

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="case-studies" className="relative overflow-hidden bg-[#030610] py-20 sm:py-28 border-y border-white/10">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00D2FF]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#7C3AED]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="max-w-4xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-2">
            Production Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-['Outfit']">
            Real projects.{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Measurable impact.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
            Discover how NexoraLab Technologies engineers scalable digital products and AI automation systems that solve complex business challenges.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-12 flex flex-wrap gap-2.5 border-b border-white/10 pb-4">
          {caseStudies.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === idx
                  ? "bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                  : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              <span>{cs.tabTitle}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Panel */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 rounded-3xl border border-white/10 bg-[#070e1e]/90 p-6 sm:p-10 backdrop-blur-xl"
            >
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 text-xs font-bold text-[#00D2FF] uppercase tracking-wider mb-4">
                    {caseStudies[activeTab].tag}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {caseStudies[activeTab].title}
                  </h3>

                  <div className="mt-6 space-y-4 text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-[#00D2FF] uppercase tracking-wider block mb-1">
                        Challenge
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {caseStudies[activeTab].challenge}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-[#00D2FF] uppercase tracking-wider block mb-1">
                        NexoraLab Engineering Solution
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {caseStudies[activeTab].solution}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                        Business Result & Measurable Impact
                      </span>
                      <p className="text-emerald-300/90 font-medium leading-relaxed">
                        {caseStudies[activeTab].result}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrics Badges & CTA */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {caseStudies[activeTab].metrics.map((m, i) => (
                      <span
                        key={i}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        ✦ {m}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#00D2FF] hover:text-white transition-colors"
                  >
                    <span>View Case Study</span>
                    <HiArrowRight />
                  </Link>
                </div>
              </div>

              {/* Right Graphical Visual Showcase */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full h-full min-h-[300px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1a38] via-[#081122] to-[#040814] p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-cyan-300">Verified NexoraLab Architecture</span>
                    <span>Production Live</span>
                  </div>

                  <div className="my-auto py-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00D2FF]/20 to-[#7C3AED]/20 border border-cyan-500/30 text-cyan-300 mb-4 shadow-[0_0_30px_rgba(0,210,255,0.3)]">
                      <HiSparkles className="text-3xl" />
                    </div>
                    <div className="text-xl font-black text-white">
                      {caseStudies[activeTab].tabTitle.substring(3)}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto">
                      Engineered with microservices, scalable databases, and automated CI/CD.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-white/5">
                    <span>⚡ Enterprise Grade</span>
                    <span>🔒 ISO Certified Quality</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#00D2FF]/50 hover:bg-white/10"
          >
            <span>Explore All Projects & Architecture</span>
            <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;