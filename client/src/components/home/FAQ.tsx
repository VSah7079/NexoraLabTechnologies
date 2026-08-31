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
    question: "What services does NexoraLab Technologies provide?",
    answer:
      "We provide Website Development, Custom Software Development, ERP, CRM, Mobile App Development, UI/UX Design, Cloud Solutions, AI Integration, API Development and Digital Transformation services.",
  },
  {
    id: 2,
    category: "Development",
    question: "Which technologies do you use?",
    answer:
      "We work with React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Docker, AWS, Azure, Python, OpenAI APIs and many enterprise technologies.",
  },
  {
    id: 3,
    category: "Pricing",
    question: "Do you provide custom pricing?",
    answer:
      "Yes. Every business has different requirements. We prepare a customized proposal after understanding your project scope and business goals.",
  },
  {
    id: 4,
    category: "Support",
    question: "Do you provide maintenance after project delivery?",
    answer:
      "Absolutely. We offer maintenance, security updates, feature enhancements and long-term technical support.",
  },
  {
    id: 5,
    category: "General",
    question: "How long does a project usually take?",
    answer:
      "Small projects generally take 2–4 weeks, while enterprise software may require several months depending on complexity.",
  },
  {
    id: 6,
    category: "Development",
    question: "Can you modernize our existing software?",
    answer:
      "Yes. We can redesign, rebuild and migrate legacy applications using modern technologies while preserving your business data.",
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
      className="relative min-h-screen overflow-hidden bg-transparent py-20 md:py-28 transition-colors duration-300"
    >
      <div className="relative z-10 mx-auto max-w-350 px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ============================================ */}
        {/* HEADER SECTION */}
        {/* ============================================ */}
        
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-2.5 text-sm font-medium text-cyan-600"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
            </span>
            Frequently Asked Questions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight"
          >
            Got Questions?
            <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-700 leading-relaxed"
          >
            Find answers to the most common questions about our services,
            pricing, development process, and long-term support.
          </motion.p>
        </div>

        {/* ============================================ */}
        {/* SEARCH & FILTER SECTION */}
        {/* ============================================ */}
        
        <div className="mt-12 max-w-3xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-300 transition-all duration-300 focus-within:border-cyan-400"
          >
            <HiMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-cyan-600 transition-colors group-focus-within:text-cyan-600" />
            <input
              type="text"
              placeholder="Search your question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-16 w-full bg-transparent pl-14 pr-6 text-gray-900 placeholder:text-gray-400 outline-none text-base"
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
                  group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300
                  ${
                    category === item.id
                      ? "bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25"
                      : "border border-gray-300 text-gray-600 hover:border-cyan-400 hover:text-cyan-600"
                  }
                `}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ============================================ */}
        {/* FAQ ACCORDION */}
        {/* ============================================ */}
        
        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-700 text-lg">No questions found. Try a different search.</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="mt-4 text-cyan-600 hover:text-cyan-700 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            filteredFaqs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`
                  overflow-hidden rounded-2xl border transition-all duration-300
                  ${
                    active === item.id
                      ? "border-cyan-400"
                      : "border-gray-300 hover:border-cyan-400"
                  }
                `}
              >
                <button
                  onClick={() => setActive(active === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 md:p-6 text-left group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
                        {item.category}
                      </span>
                      {active === item.id && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 px-2 py-0.5 text-[10px] font-medium text-cyan-600">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          </span>
                          Open
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 text-base md:text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                      {item.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: active === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                      transition-all duration-300
                      ${
                        active === item.id
                          ? "bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25"
                          : "border border-gray-300 text-gray-900 group-hover:border-cyan-400 group-hover:text-cyan-600"
                      }
                    `}
                  >
                    {active === item.id ? <HiMinus size={20} /> : <HiPlus size={20} />}
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
                      <div className="border-t border-gray-200 px-5 md:px-6 py-5 md:py-6">
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
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

        {/* ============================================ */}
        {/* STATISTICS SECTION */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { value: "24/7", label: "Technical Support", icon: "🛡️", color: "from-cyan-400 to-blue-500" },
            { value: "<1 Hr", label: "Average Response", icon: "⚡", color: "from-blue-500 to-violet-500" },
            { value: "99%", label: "Issue Resolution", icon: "✅", color: "from-violet-500 to-purple-500" },
            { value: "250+", label: "Projects Supported", icon: "🚀", color: "from-purple-500 to-cyan-400" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-2xl border border-gray-300 p-6 text-center transition-all duration-300 hover:border-cyan-400"
            >
              <div className="relative z-10">
                <div className="text-3xl mb-1">{item.icon}</div>
                <h3 className={`text-3xl font-black bg-linear-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.value}
                </h3>
                <p className="mt-1.5 text-sm text-gray-600">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ============================================ */}
        {/* WHY CHOOSE US SECTION */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              <span className="text-base">💎</span>
              Why NexoraLab
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              More Than A
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Technology Partner
              </span>
            </h2>
            <p className="mt-4 text-base text-gray-700 leading-relaxed max-w-lg">
              We don't simply build software — we become a long-term technology partner.
              Our experts help businesses plan, design, develop, deploy, and continuously improve.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Free Consultation",
                "Transparent Communication",
                "Dedicated Project Manager",
                "Scalable Architecture",
                "Enterprise Security",
                "Post Launch Support",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-gray-300 p-3 transition-all duration-300 hover:border-cyan-400"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 text-white text-sm font-bold">
                    ✓
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "💬", label: "Expert Advice", color: "from-cyan-400 to-blue-500" },
              { icon: "⚡", label: "Quick Delivery", color: "from-blue-500 to-violet-500" },
              { icon: "🔒", label: "Secure Solutions", color: "from-violet-500 to-purple-500" },
              { icon: "🤝", label: "Lifetime Support", color: "from-purple-500 to-cyan-400" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-gray-300 p-6 text-center transition-all duration-300 hover:border-cyan-400"
              >
                <div className="text-5xl">{item.icon}</div>
                <h3 className="mt-3 text-base font-bold text-gray-900">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* FINAL CTA BANNER */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-gray-300 p-8 md:p-12 transition-all duration-300 hover:border-cyan-400"
        >
          <div className="relative z-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              Still Have Questions?
            </span>

            <h2 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Let's Discuss Your
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Business Requirements
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              Can't find the answer you're looking for? Our experts are ready to
              help you choose the right technology and solution for your business.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
              >
                Contact Our Experts
                <HiChatBubbleLeftRight className="text-lg" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-600"
              >
                Explore Services
                <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* SUPPORT FEATURES */}
        {/* ============================================ */}
        
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "📞", title: "Free Consultation", desc: "Discuss your project with experienced consultants." },
            { icon: "⚡", title: "Fast Response", desc: "Quick replies to all technical and business queries." },
            { icon: "🛠️", title: "Technical Support", desc: "Continuous support throughout your project lifecycle." },
            { icon: "🚀", title: "Project Planning", desc: "Get the right roadmap before development starts." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-gray-300 p-6 text-center transition-all duration-300 hover:border-cyan-400"
            >
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 text-3xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                {item.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ============================================ */}
        {/* BOTTOM TRUST SECTION */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="rounded-3xl border border-gray-300 p-8 md:p-12 text-center transition-all duration-300 hover:border-cyan-400">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">
              Your Questions,
              <span className="block md:inline md:ml-3 bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Our Commitment
              </span>
            </h3>

            <p className="mt-4 max-w-3xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              We believe every successful project starts with clear communication.
              Whether you're planning a startup MVP, enterprise software, ERP, CRM,
              mobile app, or AI-powered platform — our experts are ready to guide you.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {[
                "Free Consultation",
                "Transparent Communication",
                "Business Analysis",
                "Modern Technology",
                "Enterprise Security",
                "Dedicated Team",
                "24/7 Support",
                "Long-Term Partnership",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-gray-300 p-6 transition-all duration-300 hover:border-cyan-400">
              <h4 className="text-lg font-bold text-gray-900">Let's Build Something Amazing Together</h4>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                Have a unique requirement? Our team can design, develop, and deploy
                a custom software solution tailored specifically to your business needs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* FOOTER NOTE */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600">
            Can't find what you're looking for?{" "}
            <Link to="/contact" className="text-cyan-600 hover:text-cyan-700 transition-colors font-medium">
              Contact us directly
            </Link>
            {" "}and we'll get back to you within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;