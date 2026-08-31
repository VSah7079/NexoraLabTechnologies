import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import SEO from "@/components/common/SEO";

const categories = ["All", "Web", "Mobile", "ERP", "CRM", "AI"];

// ✅ Images with fallback - agar image nahi hai toh placeholder use karein
const portfolio = [
  {
    id: 1,
    title: "Hospital Management",
    category: "ERP",
    image: "/portfolio/hospital.webp",
    fallbackImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
    description: "Complete hospital ERP with appointment, billing and EMR.",
    tags: ["React", "Node.js", "MongoDB"],
    features: ["Appointment", "Billing", "EMR", "Reports"],
  },
  {
    id: 2,
    title: "School ERP",
    category: "ERP",
    image: "/portfolio/school.webp",
    fallbackImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
    description: "Student management, attendance and examination portal.",
    tags: ["Next.js", "PostgreSQL", "Docker"],
    features: ["Student Management", "Attendance", "Exams", "Reports"],
  },
  {
    id: 3,
    title: "E-Commerce",
    category: "Web",
    image: "/portfolio/ecommerce.webp",
    fallbackImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    description: "Modern ecommerce platform with payment gateway.",
    tags: ["React", "Stripe", "Redis"],
    features: ["Payments", "Products", "Cart", "Orders"],
  },
  {
    id: 4,
    title: "CRM Dashboard",
    category: "CRM",
    image: "/portfolio/crm.webp",
    fallbackImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "Customer relationship management dashboard.",
    tags: ["Vue.js", "Express", "MySQL"],
    features: ["Customers", "Deals", "Tasks", "Analytics"],
  },
  {
    id: 5,
    title: "AI Chat Platform",
    category: "AI",
    image: "/portfolio/ai.webp",
    fallbackImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    description: "OpenAI powered business assistant platform.",
    tags: ["Python", "FastAPI", "OpenAI"],
    features: ["Chat", "AI", "Templates", "Analytics"],
  },
  {
    id: 6,
    title: "Food Delivery",
    category: "Mobile",
    image: "/portfolio/food.webp",
    fallbackImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    description: "Cross platform mobile application.",
    tags: ["React Native", "Firebase"],
    features: ["Order", "Tracking", "Payments", "Reviews"],
  },
];

const Portfolio = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/portfolio";
  const [activeCategory, setActiveCategory] = useState("All");
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const filteredProjects =
    activeCategory === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === activeCategory);

  const handleImageError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-28"
    >
      {isStandalone && (
        <SEO
          title="Case Studies & Delivered Digital Products | NexoraLab Technologies"
          description="Discover our portfolio of successfully delivered software solutions, including Hospital ERPs, School Management systems, E-Commerce platforms, and AI tools."
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
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-medium text-cyan-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Our Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Projects That
            <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Drive Business Growth
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed"
          >
            Explore our successful software products, enterprise platforms,
            SaaS applications, AI solutions and digital transformation projects.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 md:mt-14 flex flex-wrap justify-center gap-2 md:gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25"
                    : "border border-gray-300 text-gray-600 hover:border-cyan-400 hover:text-cyan-600"
                }
              `}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="mt-10 md:mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-gray-300 transition-all duration-500 hover:border-cyan-400"
            >
              {/* Image Section */}
              <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden bg-gray-100">
                <img
                  src={imgErrors[project.id] ? project.fallbackImage : project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={() => handleImageError(project.id)}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90" />

                {/* Category Badge */}
                <span className="absolute left-4 top-4 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-cyan-600 backdrop-blur-sm">
                  {project.category}
                </span>

                {/* Hover Overlay Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-gray-900/40">
                  <Link
                    to="#"
                    className="rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                  >
                    Live Demo
                  </Link>
                  <Link
                    to="#"
                    className="rounded-xl border border-white/30 bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-105"
                  >
                    GitHub
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 lg:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-cyan-600">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-300 px-2.5 py-1 text-[10px] text-gray-600 transition-all duration-300 group-hover:border-cyan-400 group-hover:text-cyan-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mt-4 md:mt-5 flex flex-wrap gap-2">
                  {project.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1.5 text-xs text-gray-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      {feature}
                    </span>
                  ))}
                  {project.features.length > 3 && (
                    <span className="text-xs text-cyan-600">
                      +{project.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-5 md:mt-6 flex items-center justify-between border-t border-gray-200 pt-4 md:pt-5">
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-cyan-600">
                    Case Study
                  </span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition-all duration-300 group-hover:border-cyan-400 group-hover:text-cyan-600"
                  >
                    →
                  </motion.div>
                </div>
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
            { value: "250+", label: "Projects Delivered", icon: "🚀" },
            { value: "120+", label: "Happy Clients", icon: "⭐" },
            { value: "99%", label: "Client Satisfaction", icon: "💯" },
            { value: "18+", label: "Industries Served", icon: "🏢" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-gray-300 p-5 md:p-6 text-center transition-all duration-300 hover:border-cyan-400"
            >
              <div className="text-2xl md:text-3xl mb-1">{item.icon}</div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-cyan-600">
                {item.value}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20 grid gap-10 md:gap-14 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Featured Case Study
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Enterprise ERP
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Digital Transformation
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
              A complete ERP ecosystem developed for a multi-location enterprise
              with inventory, HRMS, CRM, finance, analytics and AI-powered
              reporting dashboards.
            </p>

            <div className="mt-6 md:mt-8 space-y-5">
              {[
                { title: "Performance", value: "98%" },
                { title: "Security", value: "100%" },
                { title: "Scalability", value: "97%" },
              ].map((item) => (
                <div key={item.title}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-600">{item.title}</span>
                    <span className="font-semibold text-cyan-600">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.value }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                      className="h-full rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            whileHover={{ y: -6 }}
            className="relative rounded-2xl md:rounded-3xl border border-gray-300 p-6 md:p-8 transition-all duration-300 hover:border-cyan-400"
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900">Project Results</h3>
              <div className="mt-6 md:mt-8 grid grid-cols-2 gap-4 md:gap-5">
                {[
                  { value: "60%", label: "Faster Workflow" },
                  { value: "45%", label: "Cost Reduction" },
                  { value: "99%", label: "System Uptime" },
                  { value: "24/7", label: "Monitoring" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-gray-300 p-4 md:p-5 text-center transition-all duration-300 hover:border-cyan-400"
                  >
                    <h4 className="text-2xl md:text-3xl font-black text-cyan-600">
                      {item.value}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 md:mt-16 lg:mt-20 overflow-hidden rounded-3xl border border-gray-300 p-8 md:p-12 transition-all duration-300 hover:border-cyan-400"
        >
          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Ready To Build?
            </span>

            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
              Let's Create Your Next
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Success Story
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              We transform innovative ideas into scalable digital products with
              modern technologies, enterprise architecture and exceptional user experiences.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
              >
                Start Project
                <span>→</span>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-600"
              >
                View Services
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 md:mt-12"
        >
          <div className="rounded-2xl md:rounded-3xl border border-gray-300 p-6 md:p-8 lg:p-10 text-center transition-all duration-300 hover:border-cyan-400">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900">
              Every Project Is{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Built To Scale
              </span>
            </h3>

            <p className="mt-3 md:mt-4 max-w-3xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              At NexoraLab Technologies, we don't just develop applications—we engineer
              scalable digital products that help businesses automate operations, improve
              customer experience and achieve sustainable growth.
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                "Web Applications",
                "Mobile Apps",
                "ERP Solutions",
                "CRM Systems",
                "AI Automation",
                "Cloud Solutions",
                "UI/UX Design",
                "Enterprise Software",
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

export default Portfolio;