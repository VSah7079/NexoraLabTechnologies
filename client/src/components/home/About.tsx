import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import SEO from "@/components/common/SEO";
import {
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaCode,
  FaCloud,
  FaBrain,
  FaArrowRight,
  FaChartLine,
  FaAward,
  FaClock,
  FaGlobe,
  FaLightbulb,
  FaHandshake,
  FaCrown,
  FaGem
} from "react-icons/fa";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn
} from "@/animations/variants";

const About = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/about";

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-transparent py-20 md:py-28 transition-colors duration-300"
    >
      {isStandalone && (
        <SEO
          title="About NexoraLab Technologies | Our Vision & Expert Engineering Team"
          description="Learn about NexoraLab Technologies, a modern software development agency building secure, scalable, and high-performance digital products for global businesses."
        />
      )}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md px-6 py-2 text-sm font-medium text-cyan-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            About NexoraLab Technologies
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight">
            Engineering{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Future Ready
            </span>
            <br />
            Digital Solutions
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-gray-700 leading-relaxed">
            NexoraLab Technologies is a modern software development company
            focused on building scalable digital products for startups,
            enterprises, and organizations worldwide.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Features & CTA */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Features Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
            >
              {[
                {
                  title: "Innovation First",
                  description: "We build modern AI-powered software solutions that help businesses stay ahead of the competition.",
                  icon: <FaRocket />,
                  color: "from-cyan-400 to-blue-500"
                },
                {
                  title: "Enterprise Security",
                  description: "Secure architecture with scalable cloud infrastructure and industry best practices.",
                  icon: <FaShieldAlt />,
                  color: "from-violet-500 to-purple-500"
                },
                {
                  title: "Expert Team",
                  description: "Experienced developers, designers and consultants delivering premium digital products.",
                  icon: <FaUsers />,
                  color: "from-blue-500 to-cyan-400"
                },
                {
                  title: "Quality First",
                  description: "We follow industry best practices, clean code principles and rigorous testing.",
                  icon: <FaCrown />,
                  color: "from-purple-500 to-pink-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-5 p-5 rounded-2xl border border-gray-300 transition-all duration-300 hover:border-cyan-400"
                >
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r ${item.color} text-2xl text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(34,211,238,.35)] active:scale-95"
              >
                Learn More <FaArrowRight className="text-sm" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-sm px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-600 hover:-translate-y-1"
              >
                Talk To Experts
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Info */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Company Overview */}
            <div className="p-6 rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-lg shadow-gray-200/30 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_25px_60px_rgba(34,211,238,.2)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Company Overview</h3>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-emerald-600 shadow-lg shadow-emerald-500/10">
                  Since 2026
                </span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-6">
                {[
                  { title: "Project Success Rate", value: "98%", width: "98%", color: "from-cyan-400 to-blue-500" },
                  { title: "Client Satisfaction", value: "99%", width: "99%", color: "from-violet-500 to-cyan-400" },
                  { title: "On-Time Delivery", value: "97%", width: "97%", color: "from-blue-500 to-cyan-400" },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-800 font-medium">{item.title}</span>
                      <span className="text-sm font-semibold text-cyan-600">{item.value}</span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-200/60 backdrop-blur-sm overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${item.color} shadow-lg shadow-cyan-500/20 relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { title: "Projects Delivered", value: "250+", icon: <FaCode /> },
                { title: "Happy Clients", value: "120+", icon: <FaUsers /> },
                { title: "Expert Team", value: "20+", icon: <FaCrown /> },
                { title: "24/7 Support", value: "Always", icon: <FaClock /> },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  whileHover={{ y: -4 }}
                  className="p-5 text-center rounded-2xl border border-gray-300 transition-all duration-300 hover:border-cyan-400"
                >
                  <div className="text-3xl text-cyan-500 mb-2">{item.icon}</div>
                  <h4 className="text-3xl md:text-4xl font-black bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    {item.value}
                  </h4>
                  <p className="mt-1 text-sm text-gray-700 font-medium">{item.title}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Vision & Mission */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-4"
            >
              <motion.div
                variants={fadeInUp}
                className="p-5 rounded-2xl border border-gray-300 transition-all duration-300 hover:border-cyan-400"
              >
                <div className="flex items-center gap-3">
                  <FaGlobe className="text-cyan-500 text-2xl" />
                  <h4 className="text-lg font-bold text-gray-900">Our Vision</h4>
                </div>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  To become one of India's leading AI-driven software development companies by creating innovative, scalable and future-ready digital solutions.
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="p-5 rounded-2xl border border-gray-300 transition-all duration-300 hover:border-cyan-400"
              >
                <div className="flex items-center gap-3">
                  <FaLightbulb className="text-violet-500 text-2xl" />
                  <h4 className="text-lg font-bold text-gray-900">Our Mission</h4>
                </div>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  Deliver secure, scalable and innovative digital products using modern technologies while maintaining exceptional quality and transparency.
                </p>
              </motion.div>
            </motion.div>

            {/* Core Values */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-5 rounded-2xl border border-gray-300 transition-all duration-300 hover:border-cyan-400"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaGem className="text-cyan-500" />
                Core Values
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Innovation", icon: <FaRocket />, color: "from-cyan-400 to-blue-500" },
                  { label: "Quality", icon: <FaCrown />, color: "from-blue-500 to-indigo-500" },
                  { label: "Integrity", icon: <FaHandshake />, color: "from-indigo-500 to-purple-500" },
                  { label: "Excellence", icon: <FaAward />, color: "from-purple-500 to-pink-500" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 transition-all duration-300 hover:border-cyan-400"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-r ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;