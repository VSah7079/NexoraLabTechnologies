import { motion } from "framer-motion";
import {
  HiEnvelope,
  HiMapPin,
  HiPhone,
  HiArrowRight,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import SEO from "@/components/common/SEO";

const contactCards = [
  {
    id: 1,
    title: "Call Us",
    value: "+91 9023971338",
    description: "Talk directly with our experts.",
    icon: <HiPhone />,
    href: "tel:+919023971338",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Email Us",
    value: "info@nexoralabtech.in",
    description: "Send us your project details.",
    icon: <HiEnvelope />,
    href: "mailto:info@nexoralabtechnologies.in",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "WhatsApp",
    value: "Chat Now",
    description: "Instant business support.",
    icon: <FaWhatsapp />,
    href: "https://wa.me/919023971338?text=Hi%20NexoraLab%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.",
    color: "from-green-500 to-emerald-400",
  },
  {
    id: 4,
    title: "Visit Us",
    value: "Siwan, Bihar",
    description: "India",
    icon: <HiMapPin />,
    href: "/contact",
    color: "from-orange-500 to-red-400",
  },
];

const ContactCTA = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/contact";
  // Default WhatsApp message
  const whatsappMessage = "Hi NexoraLab Technologies, I would like to discuss a project with you.";
  const whatsappUrl = `https://wa.me/919023971338?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden bg-transparent py-24 md:py-32 transition-colors duration-300"
    >
      {isStandalone && (
        <SEO
          title="Contact NexoraLab Technologies | Start Your Software Project"
          description="Ready to turn your idea into reality? Contact NexoraLab Technologies for a free technical consultation on your custom software, app, or AI project."
        />
      )}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-2.5 text-sm font-medium text-cyan-600"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
            </span>
            Let's Work Together
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight"
          >
            Ready To Build
            <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Something Amazing?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-700 leading-relaxed"
          >
            Whether you're launching a startup, scaling an enterprise, or building
            an AI-powered platform — our experts are ready to turn your vision into reality.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
          >
            Start Your Project
            <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-8 py-4 text-base font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-600"
          >
            View Our Portfolio
            <span className="text-cyan-600 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card, index) => (
            <motion.a
              key={card.id}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-300 p-6 transition-all duration-300 hover:border-cyan-400"
            >
              {/* Icon */}
              <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-r ${card.color} text-2xl text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {card.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 mt-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600">
                  {card.title}
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-cyan-600">
                  {card.value}
                </h3>
                <p className="mt-1.5 text-sm text-gray-600">
                  {card.description}
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-xs font-medium text-gray-400">Contact</span>
                <span className="text-cyan-600 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { value: "250+", label: "Projects Completed", icon: "🚀" },
            { value: "120+", label: "Happy Clients", icon: "⭐" },
            { value: "99%", label: "Client Satisfaction", icon: "💯" },
            { value: "24/7", label: "Support Available", icon: "🛡️" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-gray-300 p-6 text-center transition-all duration-300 hover:border-cyan-400"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-3xl font-black text-cyan-600">{item.value}</h3>
              <p className="mt-1.5 text-sm text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Why NexoraLab
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Your Trusted
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Technology Partner
              </span>
            </h2>
            <p className="mt-4 text-base text-gray-700 leading-relaxed max-w-lg">
              From startup MVPs to enterprise digital transformation, we deliver
              secure, scalable, and high-performance software that drives growth.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Free Consultation",
                "Dedicated Project Manager",
                "Enterprise Architecture",
                "Modern Tech Stack",
                "Agile Development",
                "Lifetime Support",
              ].map((feature, index) => (
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
                  <span className="text-sm text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🚀", label: "Fast Delivery" },
              { icon: "🔒", label: "Secure Solutions" },
              { icon: "🤖", label: "AI Powered" },
              { icon: "☁️", label: "Cloud Ready" },
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
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-3 text-base font-bold text-gray-900">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-gray-300 p-8 md:p-12 transition-all duration-300 hover:border-cyan-400"
        >
          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Free Consultation
            </span>

            <h2 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Let's Build Your
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Next Digital Success
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              From websites to enterprise software, ERP, CRM, mobile apps, and AI platforms —
              we're ready to turn your ideas into reality.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/meeting"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
              >
                Book Free Meeting
                <HiChatBubbleLeftRight className="text-lg" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-600"
              >
                <FaWhatsapp className="text-green-500 text-lg" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="rounded-3xl border border-gray-300 p-8 md:p-12 text-center transition-all duration-300 hover:border-cyan-400">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">
              Let's Create Something
              <span className="block md:inline md:ml-3 bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Extraordinary Together
              </span>
            </h3>

            <p className="mt-4 max-w-3xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              NexoraLab Technologies helps startups, SMEs, and enterprises build scalable,
              secure, and future-ready digital products — from ideation to deployment and beyond.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {[
                "Web Development",
                "Mobile Apps",
                "ERP Solutions",
                "CRM Platforms",
                "AI Integration",
                "Cloud Solutions",
                "UI/UX Design",
                "Enterprise Software",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-gray-300 p-6 transition-all duration-300 hover:border-cyan-400">
              <h4 className="text-lg font-bold text-gray-900">Innovation • Quality • Trust</h4>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                Every project is built with modern architecture, scalable infrastructure,
                and industry best practices to ensure exceptional performance and long-term success.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;