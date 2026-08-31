import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const industries = [
  {
    id: 1,
    title: "Healthcare",
    icon: "🏥",
    description:
      "Digital healthcare platforms, HMS, EMR, patient management and telemedicine solutions.",
    tags: ["HIPAA Compliant", "AI Diagnostics", "Telemedicine"],
  },
  {
    id: 2,
    title: "Education",
    icon: "🎓",
    description:
      "School ERP, College Management, LMS and online learning platforms.",
    tags: ["LMS", "ERP", "Online Learning"],
  },
  {
    id: 3,
    title: "Finance",
    icon: "🏦",
    description:
      "Secure fintech applications, banking software and financial automation.",
    tags: ["Fintech", "Secure", "Automation"],
  },
  {
    id: 4,
    title: "Manufacturing",
    icon: "🏭",
    description:
      "Production management, inventory, ERP and factory automation solutions.",
    tags: ["ERP", "Inventory", "Automation"],
  },
  {
    id: 5,
    title: "E-Commerce",
    icon: "🛒",
    description:
      "Modern ecommerce platforms with payments, logistics and analytics.",
    tags: ["Payments", "Logistics", "Analytics"],
  },
  {
    id: 6,
    title: "Hotels",
    icon: "🏨",
    description:
      "Hotel booking, property management and hospitality software solutions.",
    tags: ["Booking", "Property Management", "Hospitality"],
  },
  {
    id: 7,
    title: "Real Estate",
    icon: "🏠",
    description:
      "Property management, CRM and real estate business automation.",
    tags: ["CRM", "Property", "Automation"],
  },
  {
    id: 8,
    title: "Startups",
    icon: "🚀",
    description:
      "Scalable SaaS products, MVP development and startup acceleration.",
    tags: ["SaaS", "MVP", "Scalable"],
  },
  {
    id: 9,
    title: "Government",
    icon: "🏛",
    description:
      "Citizen service portals and secure government digital solutions.",
    tags: ["Secure", "Portal", "Government"],
  },
  {
    id: 10,
    title: "Logistics",
    icon: "🚚",
    description:
      "Fleet management, shipment tracking and logistics automation.",
    tags: ["Fleet", "Tracking", "Automation"],
  },
  {
    id: 11,
    title: "Restaurant",
    icon: "🍽",
    description:
      "Restaurant POS, online ordering and kitchen management systems.",
    tags: ["POS", "Online Ordering", "Management"],
  },
  {
    id: 12,
    title: "Enterprise",
    icon: "🏢",
    description:
      "Enterprise software, ERP, CRM and AI-powered business platforms.",
    tags: ["ERP", "CRM", "AI Powered"],
  },
];

const Industries = () => {
  return (
    <section
      id="industries"
      className="
        relative
        overflow-hidden
        bg-transparent
        py-16
        md:py-20
        lg:py-28
        transition-colors duration-300
      "
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-cyan-400/30
              bg-cyan-500/10
              px-5
              py-2
              md:px-6
              md:py-2.5
              text-xs
              md:text-sm
              font-medium
              text-cyan-600
            "
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Industries We Empower
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="
              mt-4
              md:mt-6
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              text-gray-900
              leading-tight
            "
          >
            Digital Transformation
            <span
              className="
                block
                bg-linear-to-r
                from-cyan-400
                via-blue-500
                to-violet-600
                bg-clip-text
                text-transparent
              "
            >
              Across Every Industry
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="
              mt-3
              md:mt-4
              max-w-2xl
              mx-auto
              text-sm
              md:text-base
              lg:text-lg
              text-gray-700
              leading-relaxed
            "
          >
            We build secure, scalable and AI-powered software solutions for
            businesses across multiple industries, helping them innovate,
            automate and grow faster.
          </motion.p>
        </div>

        {/* ============================================ */}
        {/* INDUSTRIES GRID */}
        {/* ============================================ */}
        
        <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                md:rounded-3xl
                border
                border-gray-300
                p-5
                md:p-6
                lg:p-8
                transition-all
                duration-500
                hover:border-cyan-400
              "
            >
              {/* Icon */}
              <div
                className="
                  relative
                  z-10
                  flex
                  h-16
                  w-16
                  md:h-20
                  md:w-20
                  items-center
                  justify-center
                  rounded-2xl
                  md:rounded-3xl
                  bg-linear-to-r
                  from-cyan-400
                  via-blue-500
                  to-violet-600
                  text-3xl
                  md:text-4xl
                  transition-all
                  duration-500
                  group-hover:rotate-6
                  group-hover:scale-110
                  shadow-lg
                  shadow-cyan-500/20
                "
              >
                {industry.icon}
              </div>

              {/* Title */}
              <h3
                className="
                  relative
                  z-10
                  mt-5
                  md:mt-6
                  text-xl
                  md:text-2xl
                  font-bold
                  text-gray-900
                  transition-all
                  duration-300
                  group-hover:text-cyan-600
                "
              >
                {industry.title}
              </h3>

              {/* Description */}
              <p
                className="
                  relative
                  z-10
                  mt-3
                  md:mt-4
                  text-sm
                  md:text-base
                  text-gray-700
                  leading-relaxed
                "
              >
                {industry.description}
              </p>

              {/* Tags */}
              <div
                className="
                  relative
                  z-10
                  mt-4
                  md:mt-5
                  flex
                  flex-wrap
                  gap-1.5
                  md:gap-2
                "
              >
                {industry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      rounded-full
                      border
                      border-gray-300
                      px-2.5
                      py-1
                      text-[10px]
                      md:text-xs
                      text-gray-600
                      transition-all
                      duration-300
                      group-hover:border-cyan-400
                      group-hover:text-cyan-600
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                className="
                  relative
                  z-10
                  mt-5
                  md:mt-6
                  flex
                  items-center
                  justify-between
                  border-t
                  border-gray-200
                  pt-4
                  md:pt-5
                "
              >
                <span
                  className="
                    text-[10px]
                    md:text-xs
                    font-semibold
                    uppercase
                    tracking-widest
                    text-cyan-600
                  "
                >
                  Explore
                </span>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="
                    flex
                    h-9
                    w-9
                    md:h-10
                    md:w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-300
                    text-gray-900
                    transition-all
                    duration-300
                    group-hover:border-cyan-400
                    group-hover:text-cyan-600
                  "
                >
                  <HiArrowRight className="text-sm md:text-base" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================ */}
        {/* STATISTICS */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {[
            { value: "12+", label: "Industries", icon: "🏢" },
            { value: "250+", label: "Projects", icon: "🚀" },
            { value: "120+", label: "Clients", icon: "🤝" },
            { value: "99%", label: "Success Rate", icon: "📈" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="
                rounded-2xl
                border
                border-gray-300
                p-5
                md:p-6
                text-center
                transition-all
                duration-300
                hover:border-cyan-400
              "
            >
              <div className="text-2xl md:text-3xl mb-1">{item.icon}</div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-cyan-600">
                {item.value}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ============================================ */}
        {/* WHY CHOOSE US */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20 grid gap-10 md:gap-14 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Why Businesses Trust Us
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Technology That
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Delivers Results
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
              Every solution is designed with scalability, security and business growth in mind.
              We combine modern technologies with industry expertise to create software that
              delivers measurable value.
            </p>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Enterprise Architecture",
                "AI Powered Automation",
                "Cloud Native Deployment",
                "High Performance Apps",
                "Dedicated Support Team",
                "Future Ready Solutions",
              ].map((item, index) => (
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
                  <span className="text-sm text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "⚡", label: "Fast Delivery" },
              { icon: "☁️", label: "Cloud Ready" },
              { icon: "🤖", label: "AI Powered" },
              { icon: "💬", label: "24/7 Support" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-gray-300 p-6 text-center transition-all duration-300 hover:border-cyan-400"
              >
                <div className="text-4xl md:text-5xl">{item.icon}</div>
                <h3 className="mt-3 text-base font-bold text-gray-900">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* PROCESS */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 lg:mt-20"
        >
          <div className="text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Our Process
            </span>
            <h2 className="mt-3 md:mt-4 text-2xl md:text-3xl lg:text-4xl font-black text-gray-900">
              From Idea to{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Successful Launch
              </span>
            </h2>
          </div>

          <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              { step: "01", title: "Requirement Analysis", icon: "📋" },
              { step: "02", title: "UI / UX Design", icon: "🎨" },
              { step: "03", title: "Development", icon: "💻" },
              { step: "04", title: "Launch & Support", icon: "🚀" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl border border-gray-300 p-5 md:p-6 text-center transition-all duration-300 hover:border-cyan-400"
              >
                <div className="text-3xl md:text-4xl mb-2">{item.icon}</div>
                <span className="text-4xl md:text-5xl font-black text-cyan-400/20">
                  {item.step}
                </span>
                <h3 className="mt-2 text-base md:text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-xs md:text-sm text-gray-600 leading-relaxed">
                  Structured workflow ensuring quality delivery.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* FINAL CTA */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 md:mt-16 lg:mt-20 overflow-hidden rounded-3xl border border-gray-300 p-8 md:p-12 transition-all duration-300 hover:border-cyan-400"
        >
          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Ready To Transform?
            </span>

            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
              Let's Build A Digital
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Solution For Your Industry
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              Our experts are ready to understand your business challenges and build secure,
              scalable and AI-powered software solutions tailored for your industry.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
              >
                Start Your Project
                <HiArrowRight className="text-lg" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-600"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* BOTTOM NOTE */}
        {/* ============================================ */}
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 md:mt-12"
        >
          <div className="rounded-2xl md:rounded-3xl border border-gray-300 p-6 md:p-8 lg:p-10 text-center transition-all duration-300 hover:border-cyan-400">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900">
              Your Industry.{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Our Technology.
              </span>
            </h3>

            <p className="mt-3 md:mt-4 max-w-3xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              NexoraLab Technologies develops modern, secure and scalable software tailored for
              every industry. From startups to enterprises, our goal is to deliver technology that
              creates measurable business growth.
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                "AI Powered",
                "Cloud Native",
                "Enterprise Ready",
                "Secure Architecture",
                "Scalable Systems",
                "24/7 Support",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;