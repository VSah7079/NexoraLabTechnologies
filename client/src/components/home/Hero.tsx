import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles, HiRocketLaunch, HiShieldCheck, HiUsers } from "react-icons/hi2";

const Hero = () => {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        flex
        items-center
        pt-20
        md:pt-24
        lg:pt-28
        bg-transparent
      "
    >
      {/* Background Effects - Removed to show NetworkBackground */}

      {/* Container */}
      <div className="relative z-10 mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-8 xl:px-10 py-8 md:py-12">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-white/80 backdrop-blur-xl px-5 py-2.5 md:px-6 md:py-3 mb-6 md:mb-8 shadow-lg shadow-cyan-500/10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
            </span>
            <span className="text-xs md:text-sm font-semibold tracking-wide text-cyan-600">
              Transform Your Digital Presence
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] text-gray-900 max-w-5xl"
          >
            We Build
            <span className="block mt-2 md:mt-3 bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Exceptional Digital Experiences
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 md:mt-8 max-w-3xl text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed"
          >
            NexoraLab Technologies delivers cutting-edge web applications, mobile apps,
            AI solutions, and cloud infrastructure that drive business growth and
            deliver measurable results for startups and enterprises worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105"
            >
              Start Your Project
              <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-200/80 bg-white/80 backdrop-blur-xl px-8 py-4 text-base font-semibold text-gray-900 shadow-lg shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-xl hover:shadow-cyan-500/20 hover:scale-105"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full"
          >
            {[
              { value: "250+", label: "Projects Delivered", icon: HiRocketLaunch },
              { value: "120+", label: "Happy Clients", icon: HiUsers },
              { value: "99%", label: "Client Satisfaction", icon: HiSparkles },
              { value: "24/7", label: "Support Available", icon: HiShieldCheck },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-xl p-6 md:p-8 text-center shadow-lg shadow-gray-200/30 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_25px_60px_rgba(34,211,238,.2)]"
              >
                <item.icon className="mx-auto mb-3 text-3xl text-cyan-500" />
                <h3 className="text-3xl md:text-4xl font-black bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Web Development",
              desc: "Modern, responsive websites and web applications",
              icon: "💻",
            },
            {
              title: "Mobile Apps",
              desc: "iOS and Android applications with native performance",
              icon: "📱",
            },
            {
              title: "AI Solutions",
              desc: "Machine learning and automation for business growth",
              icon: "🤖",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-xl p-6 shadow-lg shadow-gray-200/30 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_25px_60px_rgba(34,211,238,.2)]"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500">
            Scroll to explore
          </span>
          <div className="flex h-12 w-6 justify-center rounded-full border-2 border-gray-300">
            <motion.div
              animate={{ y: [3, 20, 3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;