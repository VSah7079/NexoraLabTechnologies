import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const processSteps = [
  {
    id: 1,
    step: "01",
    title: "Discovery",
    subtitle: "Requirement Analysis",
    description:
      "We understand your business goals, users, competitors and technical requirements before starting development.",
    icon: "🔍",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 2,
    step: "02",
    title: "Planning",
    subtitle: "Strategy & Architecture",
    description:
      "Our experts design the application architecture, database structure and implementation roadmap.",
    icon: "📋",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 3,
    step: "03",
    title: "UI / UX",
    subtitle: "Design Experience",
    description:
      "Premium UI/UX designs focused on usability, branding and customer engagement.",
    icon: "🎨",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 4,
    step: "04",
    title: "Development",
    subtitle: "Coding & Integration",
    description:
      "Frontend, backend, APIs and cloud services are developed using modern technologies.",
    icon: "💻",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    step: "05",
    title: "Testing",
    subtitle: "Quality Assurance",
    description:
      "Every feature is tested for performance, security and reliability before deployment.",
    icon: "🧪",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 6,
    step: "06",
    title: "Deployment",
    subtitle: "Launch & Support",
    description:
      "Deployment, monitoring, optimization and long-term maintenance for your business.",
    icon: "🚀",
    color: "from-rose-500 to-orange-500",
  },
];

const Process = () => {
  return (
    <section
      id="process"
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
            How We Work
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-['Outfit']"
          >
            Our Proven{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Development Process
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed font-normal"
          >
            From idea to deployment, we follow a structured, transparent and agile
            workflow that ensures quality, performance and successful project delivery.
          </motion.p>
        </div>

        {/* Process Grid */}
        <div className="mt-10 md:mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {processSteps.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 md:p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/60 hover:shadow-[0_15px_40px_rgba(0,210,255,0.15)]"
            >
              {/* Step Number */}
              <span className="absolute right-4 top-4 md:right-6 md:top-6 text-4xl md:text-5xl lg:text-6xl font-black text-cyan-400/15 font-['Outfit']">
                {item.step}
              </span>

              {/* Icon */}
              <div className={`relative z-10 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-r ${item.color} text-3xl md:text-4xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-cyan-500/20`}>
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 mt-5 md:mt-6 text-xl md:text-2xl font-bold text-white group-hover:text-[#00D2FF] transition-colors font-['Outfit']">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="mt-1.5 text-sm md:text-base font-semibold text-[#00D2FF]">
                {item.subtitle}
              </p>

              {/* Description */}
              <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Divider */}
              <div className="mt-5 md:mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

              {/* Footer */}
              <div className="mt-4 md:mt-5 flex items-center justify-between">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#00D2FF]">
                  Step {item.step}
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
            { value: "6", label: "Development Stages", icon: "📋" },
            { value: "250+", label: "Projects Delivered", icon: "🚀" },
            { value: "99%", label: "Success Rate", icon: "📈" },
            { value: "24/7", label: "Support", icon: "🛡️" },
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

        {/* Why Our Process Works */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20 grid gap-10 md:gap-14 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF]">
              Why Our Process Works
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight font-['Outfit']">
              Smart Planning{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Better Results
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              Every project follows a structured, transparent and agile development
              workflow that minimizes risk, improves quality and ensures on-time
              delivery for every client.
            </p>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Requirement Gathering",
                "Agile Sprint Planning",
                "UI/UX First Approach",
                "Secure Development",
                "Quality Assurance",
                "Continuous Support",
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
              { icon: "📋", label: "Planning" },
              { icon: "🎨", label: "Design" },
              { icon: "💻", label: "Development" },
              { icon: "🚀", label: "Launch" },
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

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 md:mt-16 lg:mt-20 overflow-hidden rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-8 md:p-12 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50"
        >
          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF]">
              Ready To Start?
            </span>

            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight font-['Outfit']">
              From Idea To{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Successful Product
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed font-normal">
              Every successful product starts with a structured development process.
              We combine business strategy, premium design and modern engineering to
              deliver world-class software.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
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

export default Process;