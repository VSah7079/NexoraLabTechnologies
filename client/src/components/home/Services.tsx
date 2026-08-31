import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import SEO from "@/components/common/SEO";

const services = [
  {
    id: 1,
    title: "Website Development",
    description:
      "Modern, responsive and high-performance business websites with premium UI/UX.",
    icon: "🌐",
    color: "from-cyan-400 to-blue-500",
    tags: ["Responsive", "Fast", "SEO"],
  },
  {
    id: 2,
    title: "Custom Software",
    description:
      "Scalable business software tailored for startups and enterprises.",
    icon: "💻",
    color: "from-blue-500 to-indigo-500",
    tags: ["Scalable", "Secure", "Enterprise"],
  },
  {
    id: 3,
    title: "ERP Development",
    description:
      "Enterprise Resource Planning systems for complete business management.",
    icon: "📊",
    color: "from-indigo-500 to-purple-500",
    tags: ["ERP", "Automation", "Analytics"],
  },
  {
    id: 4,
    title: "CRM Solutions",
    description:
      "Customer relationship management systems with automation.",
    icon: "👥",
    color: "from-purple-500 to-pink-500",
    tags: ["CRM", "Sales", "Automation"],
  },
  {
    id: 5,
    title: "SaaS Development",
    description:
      "Cloud based SaaS platforms with subscription and secure architecture.",
    icon: "☁️",
    color: "from-pink-500 to-rose-500",
    tags: ["SaaS", "Cloud", "Subscription"],
  },
  {
    id: 6,
    title: "Mobile App",
    description:
      "Android & iOS mobile applications with premium experience.",
    icon: "📱",
    color: "from-rose-500 to-orange-500",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    id: 7,
    title: "UI / UX Design",
    description:
      "Modern user interface and user experience for digital products.",
    icon: "🎨",
    color: "from-orange-500 to-yellow-500",
    tags: ["UI/UX", "Prototyping", "Design"],
  },
  {
    id: 8,
    title: "Cloud Solutions",
    description:
      "AWS, Azure and cloud infrastructure deployment.",
    icon: "🚀",
    color: "from-yellow-500 to-cyan-400",
    tags: ["AWS", "Azure", "DevOps"],
  },
  {
    id: 9,
    title: "AI Integration",
    description:
      "Artificial Intelligence powered business automation.",
    icon: "🤖",
    color: "from-cyan-400 to-blue-500",
    tags: ["AI", "Automation", "ML"],
  },
  {
    id: 10,
    title: "API Integration",
    description:
      "Secure third-party API integration and automation.",
    icon: "🔗",
    color: "from-blue-500 to-indigo-500",
    tags: ["API", "Integration", "Security"],
  },
  {
    id: 11,
    title: "SEO Optimization",
    description:
      "Technical SEO with high-performance optimization.",
    icon: "📈",
    color: "from-indigo-500 to-purple-500",
    tags: ["SEO", "Performance", "Analytics"],
  },
  {
    id: 12,
    title: "Maintenance",
    description:
      "24×7 monitoring, maintenance and technical support.",
    icon: "🛠️",
    color: "from-purple-500 to-pink-500",
    tags: ["Support", "Monitoring", "Maintenance"],
  },
];

const Services = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/services";

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-28 transition-colors duration-300"
    >
      {isStandalone && (
        <SEO
          title="Software Development Services | NexoraLab Technologies"
          description="Explore our end-to-end services: Web Development, Mobile Apps, custom ERP & CRM solutions, AI business tools, and scalable cloud engineering."
        />
      )}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-medium text-cyan-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Our Professional Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            End-to-End
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Digital Services
            </span>
            For Modern Businesses
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed"
          >
            We design, develop and deliver enterprise-grade digital products that
            help businesses automate, grow and scale faster using modern technologies.
          </motion.p>
        </div>

        {/* Services Grid - Enhanced Glass Effect */}
        <div className="mt-10 md:mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/20 bg-white/10 p-6 md:p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/50 hover:bg-white/20 hover:shadow-[0_20px_60px_rgba(34,211,238,.15)]"
            >
              {/* Glass Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Glow Effect */}
              <div className="absolute -right-10 -top-10 h-32 w-32 md:h-40 md:w-40 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20 group-hover:scale-150" />

              {/* Border Gradient Effect */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl p-[1px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon */}
              <div className={`relative z-10 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-r ${service.color} text-3xl md:text-4xl shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:shadow-2xl`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 mt-5 md:mt-6 text-xl md:text-2xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-3 md:mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Tags */}
              <div className="relative z-10 mt-4 md:mt-5 flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-cyan-700 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/20 group-hover:text-cyan-600 group-hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="relative z-10 mt-5 md:mt-6 flex items-center justify-between border-t border-white/20 pt-4 md:pt-5">
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400 group-hover:text-cyan-500 transition-colors">
                  Learn More
                </span>
                <motion.div
                  whileHover={{ x: 8, rotate: 0 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-gray-700 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400 group-hover:text-cyan-600 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_30px_rgba(34,211,238,.2)]"
                >
                  <HiArrowRight className="text-sm md:text-base" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Our Services - Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20"
        >
          <div className="text-center">
            <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Why NexoraLab
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
              Everything You Need
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Under One Roof
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
              From strategy to deployment, we provide complete digital transformation
              services designed for startups, SMEs and enterprise businesses.
            </p>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                title: "Modern Technology",
                desc: "Built using React, Node.js, AI, Cloud and enterprise architecture.",
                icon: "⚡",
                color: "from-cyan-400 to-blue-500",
              },
              {
                title: "Fast Delivery",
                desc: "Agile development process with quick delivery and continuous improvements.",
                icon: "🚀",
                color: "from-blue-500 to-indigo-500",
              },
              {
                title: "Enterprise Security",
                desc: "Secure coding practices with authentication, encryption and monitoring.",
                icon: "🔒",
                color: "from-indigo-500 to-purple-500",
              },
              {
                title: "Scalable Architecture",
                desc: "Applications designed to grow with your business without performance loss.",
                icon: "📈",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "24×7 Support",
                desc: "Dedicated support team for maintenance, updates and issue resolution.",
                icon: "💬",
                color: "from-pink-500 to-rose-500",
              },
              {
                title: "Long-Term Partnership",
                desc: "We focus on building lasting business relationships, not just projects.",
                icon: "🤝",
                color: "from-rose-500 to-orange-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/20 hover:shadow-[0_15px_40px_rgba(34,211,238,.12)]"
              >
                {/* Glass Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                
                <div className={`relative z-10 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-2xl md:text-3xl shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  {item.icon}
                </div>
                <h3 className="relative z-10 mt-4 md:mt-5 text-lg md:text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="relative z-10 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA - Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 md:mt-16 lg:mt-20 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-8 md:p-12 backdrop-blur-xl"
        >
          {/* Glass Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-[150px]" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet-500/20 blur-[150px]" />

          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600 backdrop-blur-sm">
              Ready To Start?
            </span>

            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
              Let's Build Your Next
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Digital Success Story
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
              Whether you need a website, ERP, CRM, SaaS platform, AI solution or
              complete digital transformation, NexoraLab Technologies is ready to
              help you achieve your business goals.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
              >
                Get Free Consultation
                <HiArrowRight className="text-lg" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/20 hover:text-cyan-600"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note - Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 md:mt-12"
        >
          <div className="rounded-2xl md:rounded-3xl border border-white/20 bg-white/10 p-6 md:p-8 lg:p-10 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/15">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900">
              Trusted By Businesses
              <span className="block md:inline md:ml-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Across Every Industry
              </span>
            </h3>

            <p className="mt-3 md:mt-4 max-w-3xl mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
              From startups to enterprises, we deliver secure, scalable and
              AI-powered digital solutions that drive measurable business growth.
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                "Web Development",
                "Mobile Apps",
                "ERP Solutions",
                "CRM Systems",
                "AI Integration",
                "Cloud Solutions",
                "UI/UX Design",
                "Enterprise Software",
                "Digital Transformation",
                "SaaS Development",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-cyan-700 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:text-cyan-600 hover:scale-105"
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

export default Services;