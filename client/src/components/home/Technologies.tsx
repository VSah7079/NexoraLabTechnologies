import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiOutlineSparkles } from "react-icons/hi2";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";

type CategoryType = "all" | "frontend" | "backend" | "database" | "cloud_ai";

interface TechItem {
  name: string;
  category: CategoryType;
  categoryLabel: string;
  icon: React.ReactNode;
  tagline: string;
  glowColor: string;
  accentBg: string;
}

const techStack: TechItem[] = [
  // Frontend
  {
    name: "React.js",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <SiReact className="text-[#61DAFB]" />,
    tagline: "Component UI & State Architecture",
    glowColor: "rgba(97, 218, 251, 0.3)",
    accentBg: "from-cyan-500/10 to-blue-500/10",
  },
  {
    name: "Next.js 15",
    category: "frontend",
    categoryLabel: "Framework",
    icon: <SiNextdotjs className="text-white" />,
    tagline: "SSR, Micro-Frontends & SEO",
    glowColor: "rgba(255, 255, 255, 0.25)",
    accentBg: "from-slate-700/20 to-slate-900/20",
  },
  {
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Language",
    icon: <SiTypescript className="text-[#3178C6]" />,
    tagline: "Type-Safe Enterprise Reliability",
    glowColor: "rgba(49, 120, 198, 0.3)",
    accentBg: "from-blue-600/10 to-indigo-600/10",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Styling",
    icon: <SiTailwindcss className="text-[#38BDF8]" />,
    tagline: "Modern Dynamic Design Systems",
    glowColor: "rgba(56, 189, 248, 0.3)",
    accentBg: "from-cyan-500/10 to-teal-500/10",
  },
  {
    name: "Framer Motion",
    category: "frontend",
    categoryLabel: "Animation",
    icon: <SiFramer className="text-[#EA4C89]" />,
    tagline: "60FPS Fluid Micro-Interactions",
    glowColor: "rgba(234, 76, 137, 0.3)",
    accentBg: "from-pink-500/10 to-purple-500/10",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    categoryLabel: "Runtime",
    icon: <SiNodedotjs className="text-[#68A063]" />,
    tagline: "High-Throughput Distributed I/O",
    glowColor: "rgba(104, 160, 99, 0.3)",
    accentBg: "from-emerald-500/10 to-green-500/10",
  },
  {
    name: "Express.js",
    category: "backend",
    categoryLabel: "API Framework",
    icon: <SiExpress className="text-slate-200" />,
    tagline: "Resilient RESTful Microservices",
    glowColor: "rgba(255, 255, 255, 0.2)",
    accentBg: "from-slate-800/20 to-slate-900/20",
  },
  {
    name: "Python",
    category: "backend",
    categoryLabel: "AI & Scripting",
    icon: <SiPython className="text-[#3776AB]" />,
    tagline: "Data Pipelines & Automation",
    glowColor: "rgba(55, 118, 171, 0.3)",
    accentBg: "from-blue-500/10 to-yellow-500/10",
  },
  {
    name: "FastAPI",
    category: "backend",
    categoryLabel: "High Speed API",
    icon: <SiFastapi className="text-[#059669]" />,
    tagline: "Async AI Microservices",
    glowColor: "rgba(5, 150, 105, 0.3)",
    accentBg: "from-teal-500/10 to-emerald-500/10",
  },

  // Database
  {
    name: "PostgreSQL",
    category: "database",
    categoryLabel: "Relational DB",
    icon: <SiPostgresql className="text-[#336791]" />,
    tagline: "ACID-Compliant Complex Queries",
    glowColor: "rgba(51, 103, 145, 0.3)",
    accentBg: "from-blue-600/10 to-cyan-600/10",
  },
  {
    name: "MongoDB",
    category: "database",
    categoryLabel: "NoSQL DB",
    icon: <SiMongodb className="text-[#47A248]" />,
    tagline: "Flexible Document Sharding",
    glowColor: "rgba(71, 162, 72, 0.3)",
    accentBg: "from-green-600/10 to-emerald-600/10",
  },
  {
    name: "Redis",
    category: "database",
    categoryLabel: "In-Memory Cache",
    icon: <SiRedis className="text-[#DC382D]" />,
    tagline: "Sub-Millisecond Data Caching",
    glowColor: "rgba(220, 56, 45, 0.3)",
    accentBg: "from-rose-600/10 to-red-600/10",
  },
  {
    name: "Firebase",
    category: "database",
    categoryLabel: "BaaS & Auth",
    icon: <SiFirebase className="text-[#FFCA28]" />,
    tagline: "Real-Time Cloud Synchronization",
    glowColor: "rgba(255, 202, 40, 0.3)",
    accentBg: "from-amber-500/10 to-orange-500/10",
  },

  // Cloud & AI
  {
    name: "OpenAI GPT-4",
    category: "cloud_ai",
    categoryLabel: "Generative AI",
    icon: <RiOpenaiFill className="text-[#10A37F]" />,
    tagline: "LLM Agents & Resume NLP Pipelines",
    glowColor: "rgba(16, 163, 127, 0.35)",
    accentBg: "from-emerald-500/10 to-teal-500/10",
  },
  {
    name: "AWS Cloud",
    category: "cloud_ai",
    categoryLabel: "Cloud Platform",
    icon: <FaAws className="text-[#FF9900]" />,
    tagline: "EC2, S3, Lambda & High-Uptime Infra",
    glowColor: "rgba(255, 153, 0, 0.3)",
    accentBg: "from-orange-500/10 to-amber-500/10",
  },
  {
    name: "Docker & K8s",
    category: "cloud_ai",
    categoryLabel: "DevOps & Containers",
    icon: <SiDocker className="text-[#2496ED]" />,
    tagline: "CI/CD & Scalable Orchestration",
    glowColor: "rgba(36, 150, 237, 0.3)",
    accentBg: "from-cyan-500/10 to-blue-500/10",
  },
];

const categories = [
  { key: "all", label: "All Technologies", count: "16+" },
  { key: "frontend", label: "Frontend & UI", count: "5" },
  { key: "backend", label: "Backend & APIs", count: "4" },
  { key: "database", label: "Database & Cache", count: "4" },
  { key: "cloud_ai", label: "Cloud & AI Pipelines", count: "3" },
];

const Technologies = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");

  const filteredTech =
    activeCategory === "all"
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  return (
    <section
      id="technologies"
      className="relative overflow-hidden bg-transparent py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Enterprise Tech Matrix
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-['Outfit']"
          >
            Modern Technology Stack,{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Engineered to Scale
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-3 text-sm md:text-base text-slate-300 leading-relaxed font-normal"
          >
            From custom SaaS and mobile architectures to high-concurrency cloud infrastructure and proprietary generative AI pipelines.
          </motion.p>
        </div>

        {/* Interactive Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as CategoryType)}
                className={`
                  flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white shadow-[0_0_20px_rgba(0,210,255,0.35)] scale-105"
                      : "border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-cyan-400/50 hover:bg-white/[0.06] hover:text-white"
                  }
                `}
              >
                <span>{cat.label}</span>
                <span
                  className={`
                    rounded-full px-2 py-0.5 text-[10px] font-bold
                    ${
                      isActive
                        ? "bg-black/30 text-white"
                        : "bg-white/[0.06] text-cyan-400"
                    }
                  `}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Compact, High-End Tech Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => (
              <motion.div
                layout
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4 }}
                className="
                  group relative overflow-hidden
                  rounded-2xl
                  border border-white/[0.08]
                  bg-[#060c1d]/85
                  p-5
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-cyan-400/50
                  hover:shadow-[0_10px_30px_rgba(0,210,255,0.12)]
                "
              >
                {/* Subtle Hover Gradient Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${tech.glowColor}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex items-start justify-between">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-2xl group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>

                  {/* Category Pill */}
                  <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {tech.categoryLabel}
                  </span>
                </div>

                <div className="relative z-10 mt-4">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-['Outfit']">
                    {tech.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 font-normal leading-relaxed">
                    {tech.tagline}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Compact Tech Architecture Highlights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-3xl border border-white/[0.08] bg-[#070e22]/90 p-6 sm:p-8 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400">
              <HiOutlineSparkles />
              <span>Modern Microservice Architecture</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
              Need custom tech architecture consultation for your startup?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Our engineering team builds custom technical roadmaps tailored for 99.9% uptime, micro-frontend modularity, and AI integration.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Consult an Architect</span>
              <HiArrowRight className="text-sm" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;