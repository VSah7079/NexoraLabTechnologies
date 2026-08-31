import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

const solutions = [
  {
    id: 1,
    title: "ERP Solution",
    icon: "🏢",
    description:
      "Complete Enterprise Resource Planning software for business management.",
    color: "from-cyan-400 to-blue-500",
    tags: ["ERP", "Automation", "Analytics"],
  },
  {
    id: 2,
    title: "CRM Solution",
    icon: "🤝",
    description:
      "Customer relationship management platform with automation.",
    color: "from-blue-500 to-indigo-500",
    tags: ["CRM", "Sales", "Automation"],
  },
  {
    id: 3,
    title: "AI Solution",
    icon: "🤖",
    description:
      "Artificial Intelligence powered business automation and analytics.",
    color: "from-indigo-500 to-purple-500",
    tags: ["AI", "Analytics", "Automation"],
  },
  {
    id: 4,
    title: "Cloud Infrastructure",
    icon: "☁️",
    description:
      "Secure cloud deployment, DevOps and scalable hosting solutions.",
    color: "from-purple-500 to-pink-500",
    tags: ["Cloud", "DevOps", "Scalable"],
  },
  {
    id: 5,
    title: "E-Commerce",
    icon: "🛒",
    description:
      "Modern online shopping platforms with payment integration.",
    color: "from-pink-500 to-rose-500",
    tags: ["E-Commerce", "Payments", "Analytics"],
  },
  {
    id: 6,
    title: "School ERP",
    icon: "🎓",
    description:
      "Complete education management system for schools and colleges.",
    color: "from-rose-500 to-orange-500",
    tags: ["Education", "ERP", "Management"],
  },
  {
    id: 7,
    title: "Hospital Management",
    icon: "🏥",
    description:
      "Healthcare management software with appointment and billing.",
    color: "from-orange-500 to-yellow-500",
    tags: ["Healthcare", "EMR", "Billing"],
  },
  {
    id: 8,
    title: "Inventory System",
    icon: "📦",
    description:
      "Inventory, warehouse and stock management platform.",
    color: "from-yellow-500 to-cyan-400",
    tags: ["Inventory", "Warehouse", "Management"],
  },
  {
    id: 9,
    title: "Billing & POS",
    icon: "💳",
    description:
      "Retail billing software with POS and GST support.",
    color: "from-cyan-400 to-blue-500",
    tags: ["POS", "Billing", "GST"],
  },
  {
    id: 10,
    title: "HRMS",
    icon: "👨‍💼",
    description:
      "Human Resource Management System with payroll.",
    color: "from-blue-500 to-indigo-500",
    tags: ["HRMS", "Payroll", "Management"],
  },
  {
    id: 11,
    title: "Custom SaaS",
    icon: "🚀",
    description:
      "Scalable SaaS applications with subscription management.",
    color: "from-indigo-500 to-purple-500",
    tags: ["SaaS", "Subscription", "Scalable"],
  },
  {
    id: 12,
    title: "API Automation",
    icon: "⚡",
    description:
      "Business workflow automation using secure APIs.",
    color: "from-purple-500 to-pink-500",
    tags: ["API", "Automation", "Integration"],
  },
];

const Solutions = () => {
  return (
    <section
      id="solutions"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-medium text-cyan-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Enterprise Business Solutions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Complete Digital
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Business Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed"
          >
            We deliver intelligent enterprise solutions that streamline
            operations, automate workflows and help businesses scale faster
            using modern technologies.
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <div className="mt-10 md:mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-gray-300 p-6 md:p-8 transition-all duration-500 hover:border-cyan-400"
            >
              {/* Icon */}
              <div className={`relative z-10 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-r ${solution.color} text-3xl md:text-4xl shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                {solution.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 mt-5 md:mt-6 text-xl md:text-2xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                {solution.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-3 md:mt-4 text-sm md:text-base text-gray-700 leading-relaxed">
                {solution.description}
              </p>

              {/* Tags */}
              <div className="relative z-10 mt-4 md:mt-5 flex flex-wrap gap-1.5">
                {solution.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-300 px-2.5 py-1 text-[10px] text-gray-600 transition-all duration-300 group-hover:border-cyan-400 group-hover:text-cyan-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="relative z-10 mt-5 md:mt-6 flex items-center justify-between border-t border-gray-200 pt-4 md:pt-5">
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600">
                  Explore Solution
                </span>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition-all duration-300 group-hover:border-cyan-400 group-hover:text-cyan-600"
                >
                  <HiArrowRight className="text-sm md:text-base" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20 grid gap-10 md:gap-14 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Enterprise Benefits
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Smart Solutions
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                That Drive Growth
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
              Our enterprise solutions simplify business operations, automate
              repetitive workflows, improve productivity and help organizations
              scale with confidence using secure, cloud-ready architecture.
            </p>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Enterprise Grade Security",
                "Cloud Native Architecture",
                "AI Powered Automation",
                "Fast Deployment",
                "24/7 Technical Support",
                "Future Ready Technology",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-gray-300 p-3 transition-all duration-300 hover:border-cyan-400"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white text-sm font-bold">
                    ✓
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "250+", label: "Projects", icon: "🚀" },
              { value: "120+", label: "Clients", icon: "⭐" },
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
                className="rounded-2xl border border-gray-300 p-6 text-center transition-all duration-300 hover:border-cyan-400"
              >
                <div className="text-2xl md:text-3xl mb-1">{item.icon}</div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-cyan-600">
                  {item.value}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20"
        >
          <div className="text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Industries We Serve
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
              Solutions Built For
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Every Industry
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              We design intelligent software solutions tailored to industry-specific
              challenges, helping businesses increase productivity and accelerate
              digital transformation.
            </p>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              { icon: "🏥", title: "Healthcare" },
              { icon: "🎓", title: "Education" },
              { icon: "🏢", title: "Enterprise" },
              { icon: "🛒", title: "E-Commerce" },
              { icon: "🏦", title: "Finance" },
              { icon: "🏨", title: "Hotels" },
              { icon: "🏭", title: "Manufacturing" },
              { icon: "🚀", title: "Startups" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-gray-300 p-6 text-center transition-all duration-300 hover:border-cyan-400"
              >
                <div className="text-3xl md:text-4xl">{item.icon}</div>
                <h3 className="mt-3 text-sm md:text-base font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-600">Solutions</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Overview */}
        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {[
            { number: "01", title: "Discovery", icon: "🔍" },
            { number: "02", title: "Planning", icon: "📋" },
            { number: "03", title: "Development", icon: "💻" },
            { number: "04", title: "Deployment", icon: "🚀" },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-gray-300 p-5 md:p-6 text-center transition-all duration-300 hover:border-cyan-400"
            >
              <div className="text-2xl md:text-3xl mb-1">{step.icon}</div>
              <span className="text-3xl md:text-4xl font-black text-cyan-400/30">
                {step.number}
              </span>
              <h3 className="mt-2 text-sm md:text-base font-bold text-gray-900">{step.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-10 md:mt-12 overflow-hidden rounded-3xl border border-gray-300 p-8 md:p-12 transition-all duration-300 hover:border-cyan-400"
        >
          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Let's Work Together
            </span>

            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
              Ready To Transform
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Your Business Digitally?
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              Whether you need an ERP, CRM, SaaS platform, AI solution, Hospital
              Management System, School ERP or a custom enterprise application —
              we're ready to deliver scalable and future-ready software.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
              >
                Schedule Free Consultation
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

        {/* Custom Solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 md:mt-12"
        >
          <div className="rounded-2xl md:rounded-3xl border border-gray-300 p-6 md:p-8 lg:p-10 text-center transition-all duration-300 hover:border-cyan-400">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900">
              Need a{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Custom Solution
              </span>
              ?
            </h3>

            <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              We build custom enterprise software tailored specifically for your
              business workflow, operations and long-term growth.
            </p>

            <Link
              to="/contact"
              className="mt-6 md:mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
            >
              Let's Discuss
              <HiArrowRight className="text-lg" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;