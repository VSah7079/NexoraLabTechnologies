import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiChevronDown,
  HiMagnifyingGlass,
  HiSparkles,
  HiChatBubbleLeftRight,
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { useModal } from "@/context/ModalContext";

interface FAQItem {
  q: string;
  a: string;
  category: "all" | "software" | "ai" | "teams" | "security";
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    category: "software",
    tags: ["Full-Stack", "Web Development", "Mobile Apps"],
    q: "What core custom software engineering services does NexoraLab provide?",
    a: "NexoraLab Technologies delivers full-lifecycle custom web and SaaS platforms (React 19, Next.js, Node.js, Python), high-performance mobile apps (Flutter, React Native, iOS, Android), enterprise ERP/CRM portals, scalable microservices architectures, and 24/7 cloud infrastructure management on AWS and Azure.",
  },
  {
    category: "ai",
    tags: ["AI Intelligence", "ATS Scoring", "Resume Parser"],
    q: "How does NexoraLab's proprietary AI Talent Intelligence & ATS suite work?",
    a: "Our AI suite utilizes advanced optical character recognition (OCR), semantic vector embeddings (Pinecone/pgvector), and Google Gemini LLMs to parse unstructured resumes, benchmark candidate skill gaps, predict market-accurate salaries, conduct automated mock interviews, and score candidates in under 15 milliseconds with 99.4% accuracy.",
  },
  {
    category: "security",
    tags: ["IP Rights", "NDA", "Source Code"],
    q: "Who retains intellectual property (IP) rights and source code ownership?",
    a: "You retain 100% full intellectual property ownership, Git repository access, architecture documentation, and deployment configurations upon milestone completion. We execute bilateral non-disclosure agreements (NDA) and strict confidentiality terms before starting any project.",
  },
  {
    category: "teams",
    tags: ["Dedicated Developers", "Staff Augmentation", "Agile Pods"],
    q: "Can NexoraLab augment our existing internal software engineering team?",
    a: "Yes. We provide pre-vetted senior full-stack, AI/ML, mobile, and DevOps engineering pods that integrate directly into your sprint cycles, daily standups, and communication channels (Slack, Jira, GitHub) within 48 to 72 hours.",
  },
  {
    category: "software",
    tags: ["Timeline", "Cost Estimate", "Fixed Scope"],
    q: "How do you estimate project timelines, budgets, and milestones?",
    a: "We evaluate your functional specifications, target user load, UI/UX complexity, and third-party API dependencies. Within 24 hours of your initial discovery call, our solutions architects deliver a detailed, fixed-scope milestone roadmap and transparent budget breakdown.",
  },
  {
    category: "teams",
    tags: ["Communication", "Project Updates", "Agile Pods"],
    q: "How does your engineering team collaborate and keep clients updated?",
    a: "We provide regular sprint updates, dedicated communication channels (Email: nexoralabtechnologies@gmail.com, WhatsApp, Slack), and live staging demonstrations directly from our engineering center in Siwan, Bihar, India.",
  },
  {
    category: "security",
    tags: ["SLA", "Maintenance", "Cloud Monitoring"],
    q: "What post-launch SLA, maintenance, and cloud monitoring support do you offer?",
    a: "We provide comprehensive 24/7 cloud telemetry, automated database query optimization, security vulnerability patching, critical bug fixes, and continuous feature evolution backed by a 99.99% uptime guarantee and under-15-minute emergency response SLA.",
  },
  {
    category: "ai",
    tags: ["Custom AI", "Fine-Tuning", "Vector DB"],
    q: "Can you train or integrate custom AI models for our proprietary business data?",
    a: "Yes. We build end-to-end Retrieval-Augmented Generation (RAG) pipelines, fine-tuned domain LLMs, semantic vector search engines, and multi-modal computer vision models that securely operate on your private enterprise data with strict zero-retention data policies.",
  },
];

const categories = [
  { id: "all", label: "All Questions" },
  { id: "software", label: "Custom Software & Web" },
  { id: "ai", label: "AI Suite & ATS Engine" },
  { id: "teams", label: "Dedicated Developer Pods" },
  { id: "security", label: "Security, IP & SLA" },
];

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);
  const { openQuoteModal } = useModal();

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAll = () => {
    setOpenIndexes(filteredFaqs.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenIndexes([]);
  };

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="relative overflow-hidden bg-transparent py-20 sm:py-28 border-t border-white/10">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#00D2FF]/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF]" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-['Outfit']">
              Answers to common <em className="not-italic bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">technical questions</em>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Find answers regarding custom software engineering, proprietary AI integration, pricing timelines, IP ownership, and dedicated developer pods.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="relative">
              <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or keywords..."
                className="w-full rounded-2xl border border-white/15 bg-[#070e1e]/90 pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] backdrop-blur-xl"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs & Expand/Collapse All */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white shadow-[0_0_18px_rgba(0,210,255,0.35)]"
                    : "border border-white/10 bg-[#070e1e]/80 text-slate-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
            <button
              onClick={expandAll}
              className="hover:text-[#00D2FF] transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              className="hover:text-[#00D2FF] transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-8 grid grid-cols-1 gap-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 rounded-3xl border border-white/10 bg-[#070e1e]/70">
              <p className="text-base text-slate-300 font-semibold">No questions matched your search.</p>
              <p className="text-xs text-slate-500 mt-1">Try another keyword or reach out directly to our engineering team.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndexes.includes(idx);
              return (
                <div
                  key={idx}
                  className={`group rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#00D2FF]/60 bg-gradient-to-br from-[#0a1b38] to-[#070e1e] shadow-[0_0_25px_rgba(0,210,255,0.15)]"
                      : "border-white/10 bg-[#070e1e]/80 hover:border-white/20 hover:bg-[#09152b]"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
                  >
                    <div className="flex items-start gap-4 pr-4">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black font-mono transition-colors ${
                          isOpen
                            ? "bg-[#00D2FF] text-black"
                            : "bg-white/5 text-slate-400 group-hover:text-white"
                        }`}
                      >
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <div>
                        <h3
                          className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                            isOpen ? "text-white" : "text-slate-200 group-hover:text-white"
                          }`}
                        >
                          {faq.q}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {faq.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                        isOpen
                          ? "border-[#00D2FF] bg-[#00D2FF]/20 text-[#00D2FF] rotate-180"
                          : "border-white/10 bg-white/5 text-slate-400 group-hover:text-white"
                      }`}
                    >
                      <HiChevronDown className="text-base" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-r from-[#081734] via-[#070e1e] to-[#0d162e] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00D2FF]/20 to-[#0066FF]/20 text-[#00D2FF] border border-cyan-500/30">
              <HiChatBubbleLeftRight className="text-3xl" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Have a unique architecture or scaling question?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
                Our solutions architects are available for direct 1-on-1 consultations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917079884369?text=Hi%20NexoraLab%20Technologies%2C%20I%20have%20a%20technical%20question%20regarding%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/30 px-5 py-3 text-xs font-bold text-emerald-400 transition hover:bg-emerald-900/40"
            >
              <FaWhatsapp className="text-base" />
              <span>Ask on WhatsApp</span>
            </a>

            <button
              onClick={openQuoteModal}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-105 active:scale-95"
            >
              <span>Request Consultation</span>
              <HiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;