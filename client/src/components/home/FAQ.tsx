import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiMinus,
  HiPlus,
  HiChatBubbleLeftRight,
  HiArrowRight,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const categories = [
  { id: "All", label: "All Questions", icon: "📚" },
  { id: "General", label: "General", icon: "💡" },
  { id: "Development", label: "Development", icon: "💻" },
  { id: "Pricing", label: "Pricing", icon: "💰" },
  { id: "Support", label: "Support", icon: "🛡️" },
];

const faqs = [
  {
    id: 1,
    category: "General",
    question: "What core services does NexoraLab Technologies specialize in?",
    answer:
      "We engineer Enterprise Web Applications, AI & ATS Resume Scoring Systems, Custom CRM/ERP Platforms, Cross-Platform Mobile Apps (React Native/Flutter), Cloud DevOps, and Scalable REST/GraphQL APIs.",
  },
  {
    id: 2,
    category: "Development",
    question: "Which modern tech stacks and AI frameworks do you utilize?",
    answer:
      "Our core stack includes React 19, TypeScript, Node.js, Express, Next.js, MongoDB, PostgreSQL, Docker, AWS Cloud, OpenAI GPT-4o APIs, Tailwind CSS, and Python FastAPI for AI/ML pipelines.",
  },
  {
    id: 3,
    category: "Pricing",
    question: "How does your project pricing and contract model work?",
    answer:
      "We offer transparent, milestone-based Fixed-Price contracts for scoped deliverables, as well as Dedicated Engineering Team retainers on a monthly sprint basis. Every proposal includes detailed architecture and timeline breakdowns.",
  },
  {
    id: 4,
    category: "Support",
    question: "Do you offer post-deployment maintenance and SLA warranties?",
    answer:
      "Yes. All delivered platforms include a 30-day post-launch warranty with zero-cost bug fixes, followed by optional managed DevOps, security patch management, and 24/7 uptime monitoring SLAs.",
  },
  {
    id: 5,
    category: "General",
    question: "What is your typical project timeline from kickoff to MVP?",
    answer:
      "A focused MVP or production SaaS generally takes 3 to 6 weeks. Enterprise systems with complex integrations take 8 to 14 weeks, delivered iteratively through bi-weekly sprint demos.",
  },
  {
    id: 6,
    category: "Development",
    question: "Can you modernize our legacy application without data loss?",
    answer:
      "Yes. We specialize in zero-downtime legacy migrations, refactoring monolithic codebases into scalable microservices and modernizing UI/UX while guaranteeing 100% database integrity.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState<number | null>(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchCategory = category === "All" || item.category === category;
      const matchSearch =
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  return (
    <section
      id="faq"
      className="relative min-h-screen overflow-hidden bg-transparent py-20 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* HEADER SECTION */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-[#070e1b]/90 px-6 py-2.5 text-xs md:text-sm font-bold tracking-wide bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent shadow-[0_0_25px_rgba(0,210,255,0.15)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D2FF] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00D2FF]" />
            </span>
            FREQUENTLY ASKED QUESTIONS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight font-['Outfit']"
          >
            Got Questions?{" "}
            <span className="block bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Explore essential answers regarding our development workflow, engineering standards, custom pricing, and SLA guarantees.
          </motion.p>
        </div>

        {/* SEARCH & FILTER SECTION */}
        <div className="mt-12 max-w-3xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-[#070e1e]/95 backdrop-blur-xl shadow-xl transition-all duration-300 focus-within:border-[#00D2FF] focus-within:shadow-[0_0_25px_rgba(0,210,255,0.2)]"
          >
            <HiMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-cyan-400" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. tech stack, timeline, pricing, support)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-16 w-full bg-transparent pl-14 pr-6 text-white placeholder:text-slate-500 outline-none text-sm md:text-base font-normal"
            />
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => setCategory(item.id)}
                className={`
                  group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300
                  ${
                    category === item.id
                      ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] text-white shadow-lg shadow-cyan-500/25 scale-105"
                      : "border border-slate-800 bg-[#070e1e]/80 text-slate-300 hover:border-[#00D2FF]/40 hover:text-white"
                  }
                `}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 rounded-3xl border border-slate-800 bg-[#070e1e]/80 p-8"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-slate-300 text-base font-semibold">No questions matched your search criteria.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-bold transition-colors"
              >
                Clear filter and view all FAQs →
              </button>
            </motion.div>
          ) : (
            filteredFaqs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`
                  overflow-hidden rounded-2xl border transition-all duration-300
                  ${
                    active === item.id
                      ? "border-[#00D2FF]/70 bg-[#0b132b]/95 shadow-[0_8px_30px_rgba(0,210,255,0.12)]"
                      : "border-slate-800 bg-[#070e1e]/85 hover:border-slate-700"
                  }
                `}
              >
                <button
                  onClick={() => setActive(active === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 md:p-6 text-left group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: active === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300
                      ${
                        active === item.id
                          ? "bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white shadow-md shadow-cyan-500/30"
                          : "border border-slate-700 bg-[#0a1128] text-slate-300 group-hover:border-[#00D2FF]/50 group-hover:text-white"
                      }
                    `}
                  >
                    {active === item.id ? <HiMinus size={18} /> : <HiPlus size={18} />}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {active === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-800 px-5 md:px-6 py-5 bg-[#060c1c]/50">
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* STATS HIGHLIGHTS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { value: "24/7", label: "Dedicated Tech Support", icon: "🛡️", color: "from-[#00D2FF] to-[#0066FF]" },
            { value: "<15 Min", label: "Average Response Time", icon: "⚡", color: "from-[#0066FF] to-[#7C3AED]" },
            { value: "99.9%", label: "Uptime SLA Guarantee", icon: "✅", color: "from-[#10B981] to-[#00D2FF]" },
            { value: "250+", label: "Platforms Supported", icon: "🚀", color: "from-[#7C3AED] to-[#EC4899]" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b132b]/85 backdrop-blur-xl p-6 text-center transition-all duration-300 hover:border-[#00D2FF]/40 hover:shadow-lg shadow-black/40"
            >
              <div className="text-3xl mb-1">{item.icon}</div>
              <h3 className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                {item.value}
              </h3>
              <p className="mt-1 text-xs md:text-sm text-slate-400 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* FINAL CTA BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 md:mt-20 overflow-hidden rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-8 md:p-12 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-[#00D2FF]/40 text-center"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D2FF] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D2FF]" />
              </span>
              STILL HAVE QUESTIONS?
            </span>

            <h2 className="mt-5 text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight font-['Outfit']">
              Let's Discuss Your Unique{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Architecture & Vision
              </span>
            </h2>

            <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed font-normal">
              Have specific compliance, scale, or custom API requirements? Schedule a direct engineering consultation with our lead software architects.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Consult Our Architects</span>
                <HiChatBubbleLeftRight className="text-lg" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#0a1128] px-8 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-[#00D2FF] hover:text-white"
              >
                <span>Explore All Services</span>
                <HiArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;