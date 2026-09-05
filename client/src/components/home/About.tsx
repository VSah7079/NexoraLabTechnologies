import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import SEO from "@/components/common/SEO";
import {
  FaRocket,
  FaShieldAlt,
  FaCode,
  FaArrowRight,
  FaGlobe,
  FaLightbulb,
  FaCrown,
  FaBrain
} from "react-icons/fa";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer
} from "@/animations/variants";
import { aboutTechImg } from "@/assets/images";

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
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b]/90 backdrop-blur-md px-5 py-2 text-xs sm:text-sm font-bold tracking-wide bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent shadow-[0_0_20px_rgba(0,210,255,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D2FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D2FF]" />
            </span>
            INNOVATE • BUILD • ELEVATE
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Architecting{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Future-Ready
            </span>{" "}
            Digital Systems
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            NexoraLab Technologies is a premier engineering hub delivering custom enterprise software, AI-powered recruitment tools, and resilient multi-platform web & mobile systems for fast-scaling global organizations.
          </p>
        </motion.div>

        {/* 2-Column Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Image Showcase + Floating Badge */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            {/* Background Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#00D2FF]/20 via-[#0066FF]/15 to-[#7C3AED]/20 blur-3xl opacity-75 pointer-events-none" />

            {/* High-Tech Image Card Frame */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-2.5 sm:p-3 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:shadow-[0_20px_50px_rgba(0,102,255,0.25)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-950">
                <img
                  src={aboutTechImg}
                  alt="NexoraLab Tech Lab and AI Engineering Team"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* Floating Glass Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-slate-700/80 bg-[#070e1b]/95 px-4 py-2.5 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00D2FF] animate-ping" />
                    <span className="text-xs font-semibold text-white">Innovation Lab Active</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#00D2FF]">ISO 9001:2026 Certified</span>
                </div>
              </div>
            </div>

            {/* Floating Metric Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -right-2 sm:-right-4 hidden sm:flex items-center gap-3.5 rounded-2xl border border-cyan-400/40 bg-[#070e1b]/95 p-4 shadow-xl backdrop-blur-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white text-xl shadow-lg shadow-cyan-500/30">
                <FaBrain />
              </div>
              <div>
                <div className="text-xl font-black text-white">100% Custom</div>
                <div className="text-xs text-slate-300 font-medium">AI & Full-Stack Solutions</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Pillars & Capabilities */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            {/* 4 Core Pillars Bento Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                {
                  title: "AI & Automation",
                  description: "Automate complex pipelines with deep learning and real-time intelligent agents.",
                  icon: <FaRocket />,
                  color: "from-[#00D2FF] to-[#0066FF]",
                },
                {
                  title: "Cloud & Microservices",
                  description: "Resilient, zero-downtime cloud systems built on AWS, Azure, and Kubernetes.",
                  icon: <FaShieldAlt />,
                  color: "from-[#0066FF] to-[#7C3AED]",
                },
                {
                  title: "Agile Engineering",
                  description: "High-velocity 2-week sprint iterations with continuous CI/CD delivery.",
                  icon: <FaCode />,
                  color: "from-[#7C3AED] to-[#9333EA]",
                },
                {
                  title: "Enterprise Grade",
                  description: "SOC2 ready, bank-grade encryption, clean architecture, and strict NDA compliance.",
                  icon: <FaCrown />,
                  color: "from-[#9333EA] to-[#00D2FF]",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-4.5 transition-all duration-300 hover:border-[#00D2FF]/50 hover:bg-[#0f1b3d] hover:shadow-[0_8px_25px_rgba(0,102,255,0.18)] backdrop-blur-xl"
                >
                  <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} text-lg text-white shadow-md shadow-cyan-500/20`}>
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mission & Vision Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 backdrop-blur-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <FaGlobe className="text-[#00D2FF] text-xl shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Our Global Vision</h4>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      Empowering startups and enterprises with intelligent digital products that scale seamlessly worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaLightbulb className="text-amber-400 text-xl shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Our Commitment</h4>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      Unmatched software quality, agile velocity, transparent pricing, and 24/7 dedicated engineering support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Read Full Company Story</span>
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#0b132b]/90 px-7 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-[#00D2FF]/60 hover:text-white hover:bg-[#0f1b3d]"
              >
                Schedule Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;