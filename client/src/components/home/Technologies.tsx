import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const technologies = [
  {
    id: 1,
    title: "React.js",
    icon: "⚛️",
    category: "Frontend",
    description:
      "Modern interactive user interfaces with React ecosystem.",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 2,
    title: "Next.js",
    icon: "▲",
    category: "Framework",
    description:
      "High-performance SSR and SEO optimized web applications.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 3,
    title: "TypeScript",
    icon: "📘",
    category: "Language",
    description:
      "Scalable and type-safe enterprise application development.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 4,
    title: "Node.js",
    icon: "🟢",
    category: "Backend",
    description:
      "Fast and scalable backend services with JavaScript runtime.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "Express.js",
    icon: "🚀",
    category: "API",
    description:
      "RESTful APIs and enterprise backend architecture.",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 6,
    title: "MongoDB",
    icon: "🍃",
    category: "Database",
    description:
      "Flexible NoSQL database for scalable applications.",
    color: "from-rose-500 to-orange-500",
  },
  {
    id: 7,
    title: "PostgreSQL",
    icon: "🐘",
    category: "Database",
    description:
      "Reliable relational database with enterprise performance.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: 8,
    title: "Docker",
    icon: "🐳",
    category: "DevOps",
    description:
      "Containerized deployment for consistent environments.",
    color: "from-yellow-500 to-cyan-400",
  },
  {
    id: 9,
    title: "AWS",
    icon: "☁️",
    category: "Cloud",
    description:
      "Scalable cloud infrastructure and hosting solutions.",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 10,
    title: "Azure",
    icon: "🌐",
    category: "Cloud",
    description:
      "Enterprise cloud services and infrastructure management.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 11,
    title: "Firebase",
    icon: "🔥",
    category: "Backend",
    description:
      "Authentication, storage and realtime database solutions.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 12,
    title: "Tailwind CSS",
    icon: "🎨",
    category: "UI",
    description:
      "Utility-first responsive interface development.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 13,
    title: "Framer Motion",
    icon: "✨",
    category: "Animation",
    description:
      "Smooth UI animations and interactive experiences.",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 14,
    title: "GSAP",
    icon: "🎬",
    category: "Animation",
    description:
      "Professional timeline based animations and effects.",
    color: "from-rose-500 to-orange-500",
  },
  {
    id: 15,
    title: "Python",
    icon: "🐍",
    category: "Programming",
    description:
      "AI, automation and backend development solutions.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: 16,
    title: "OpenAI API",
    icon: "🤖",
    category: "Artificial Intelligence",
    description:
      "Generative AI, automation and intelligent business solutions.",
    color: "from-yellow-500 to-cyan-400",
  },
];

const Technologies = () => {
  return (
    <section
      id="technologies"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-28 transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-[#00D2FF]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Technologies We Use
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-['Outfit']"
          >
            Modern Technology{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Powerful Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed font-normal"
          >
            We leverage cutting-edge technologies to build secure, scalable and
            future-ready software solutions for startups, enterprises and
            organizations worldwide.
          </motion.p>
        </div>

        {/* Technologies Grid */}
        <div className="mt-10 md:mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 md:p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/60 hover:shadow-[0_15px_40px_rgba(0,210,255,0.15)]"
            >
              {/* Category Badge */}
              <span className="absolute right-4 top-4 md:right-6 md:top-6 rounded-full border border-slate-700/80 bg-[#070e1b] px-2.5 py-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-wider text-[#00D2FF] transition-all duration-300 group-hover:border-cyan-400">
                {tech.category}
              </span>

              {/* Icon */}
              <div className={`relative z-10 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-r ${tech.color} text-3xl md:text-4xl shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                {tech.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 mt-5 md:mt-6 text-xl md:text-2xl font-bold text-white group-hover:text-[#00D2FF] transition-colors font-['Outfit']">
                {tech.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-3 md:mt-4 text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                {tech.description}
              </p>

              {/* Footer */}
              <div className="relative z-10 mt-5 md:mt-6 flex items-center justify-between border-t border-slate-800 pt-4 md:pt-5">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#00D2FF]">
                  Technology
                </span>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-slate-700 bg-[#060b18] text-slate-300 transition-all duration-300 group-hover:border-cyan-400 group-hover:text-white group-hover:bg-cyan-500/20"
                >
                  <HiArrowRight className="text-sm md:text-base" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {[
            { value: "16+", label: "Core Technologies", icon: "💻" },
            { value: "250+", label: "Projects Delivered", icon: "🚀" },
            { value: "99%", label: "Deployment Success", icon: "📈" },
            { value: "24/7", label: "Technical Support", icon: "🛡️" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 md:p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(0,210,255,0.15)]"
            >
              <div className="text-2xl md:text-3xl mb-1">{item.icon}</div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] bg-clip-text text-transparent font-['Outfit']">
                {item.value}
              </h3>
              <p className="mt-1 text-sm text-slate-300 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Our Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20 grid gap-10 md:gap-14 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF]">
              Why Our Technology Stack
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight font-['Outfit']">
              Built With{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Industry Leading Tools
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              Every technology we use is selected for performance, scalability,
              security and long-term maintainability. This allows us to build
              enterprise applications that remain reliable as businesses grow.
            </p>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Scalable Architecture",
                "Enterprise Security",
                "Cloud Native Infrastructure",
                "AI Ready Development",
                "Modern DevOps Workflow",
                "Future Proof Technology",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#060b18]/80 p-3 transition-all duration-300 hover:border-cyan-400/50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white text-sm font-bold">
                    ✓
                  </div>
                  <span className="text-sm text-slate-200 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "⚛️", label: "Frontend" },
              { icon: "🟢", label: "Backend" },
              { icon: "☁️", label: "Cloud" },
              { icon: "🤖", label: "AI" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50"
              >
                <div className="text-4xl md:text-5xl">{item.icon}</div>
                <h3 className="mt-3 text-base font-bold text-white">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20"
        >
          <div className="text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF]">
              Our Expertise
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-white font-['Outfit']">
              Complete Technology{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Ecosystem
              </span>
            </h2>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              {
                title: "Frontend",
                icon: "⚛️",
                desc: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion",
              },
              {
                title: "Backend",
                icon: "🟢",
                desc: "Node.js, Express.js, REST APIs, Authentication, Microservices",
              },
              {
                title: "Cloud",
                icon: "☁️",
                desc: "AWS, Azure, Docker, CI/CD, DevOps Infrastructure",
              },
              {
                title: "AI & ML",
                icon: "🤖",
                desc: "OpenAI, Python, AI Automation, LLM Integration",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50"
              >
                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-3xl md:text-4xl shadow-lg shadow-cyan-500/20">
                  {item.icon}
                </div>
                <h3 className="mt-5 md:mt-6 text-xl md:text-2xl font-bold text-white font-['Outfit']">{item.title}</h3>
                <p className="mt-2 md:mt-3 text-sm text-slate-300 leading-relaxed font-normal">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Development Workflow */}
        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {[
            { step: "01", title: "Planning", icon: "📋" },
            { step: "02", title: "Design", icon: "🎨" },
            { step: "03", title: "Development", icon: "💻" },
            { step: "04", title: "Deployment", icon: "🚀" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 md:p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50"
            >
              <div className="text-2xl md:text-3xl mb-1">{item.icon}</div>
              <span className="text-3xl md:text-4xl font-black text-cyan-400/30 font-['Outfit']">
                {item.step}
              </span>
              <h3 className="mt-2 text-sm md:text-base font-bold text-white">{item.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 md:mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-8 md:p-12 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50"
        >
          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF]">
              Future Ready Technology
            </span>

            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight font-['Outfit']">
              Technology That Powers{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Business Growth
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed font-normal">
              We continuously adopt modern frameworks, cloud platforms, AI
              technologies and enterprise tools to deliver scalable, secure and
              high-performance digital products that grow with your business.
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "MongoDB",
                "PostgreSQL",
                "AWS",
                "Docker",
                "OpenAI",
                "Tailwind CSS",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700 bg-[#060b18]/80 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                Start Your Project
                <HiArrowRight className="text-lg" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#060b18]/80 px-8 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-400 hover:text-white"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;