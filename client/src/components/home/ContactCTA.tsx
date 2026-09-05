import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiEnvelope,
  HiMapPin,
  HiPhone,
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import SEO from "@/components/common/SEO";

const contactCards = [
  {
    id: 1,
    title: "Direct Phone Call",
    value: "+91 70798 84369",
    description: "Connect with our principal solutions architect.",
    icon: HiPhone,
    href: "tel:+917079884369",
    color: "from-[#00D2FF] to-[#0066FF]",
  },
  {
    id: 2,
    title: "Official Email",
    value: "info@nexoralabtechnologies.in",
    description: "Send project briefs and RFP documents.",
    icon: HiEnvelope,
    href: "mailto:info@nexoralabtechnologies.in",
    color: "from-[#0066FF] to-[#7C3AED]",
  },
  {
    id: 3,
    title: "Instant WhatsApp",
    value: "+91 70798 84369",
    description: "Quick chat & instant estimation support.",
    icon: FaWhatsapp,
    href: "https://wa.me/917079884369?text=Hi%20NexoraLab%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20project.",
    color: "from-[#10B981] to-[#00D2FF]",
  },
  {
    id: 4,
    title: "Global Headquarters",
    value: "Siwan, Bihar, India",
    description: "Serving clients across USA, Europe, & India.",
    icon: HiMapPin,
    href: "#",
    color: "from-[#7C3AED] to-[#9333EA]",
  },
];

const ContactCTA = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/contact";
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "AI Solution",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden bg-transparent py-20 md:py-28"
    >
      {isStandalone && (
        <SEO
          title="Contact NexoraLab Technologies | Start Your Software Project"
          description="Ready to turn your idea into reality? Contact NexoraLab Technologies for a free technical consultation on your custom software, app, or AI project."
        />
      )}
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-[#070e1b]/90 px-5 py-2 text-xs sm:text-sm font-bold tracking-wide bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent shadow-[0_0_25px_rgba(0,210,255,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D2FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D2FF]" />
            </span>
            INNOVATE • BUILD • ELEVATE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
          >
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Extraordinary
            </span>{" "}
            Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Tell us about your product goals. Receive a comprehensive architecture plan and timeline estimate within 24 hours.
          </motion.p>
        </div>

        {/* 2-Column Split: Info Cards + Proposal Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Channels & Confidence */}
          <div className="lg:col-span-5 space-y-4">
            {contactCards.map((card) => (
              <a
                key={card.id}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#00D2FF]/40 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r ${card.color} text-xl text-white shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform`}>
                  <card.icon />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    {card.title}
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                    {card.value}
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal">
                    {card.description}
                  </div>
                </div>
              </a>
            ))}

            {/* SLA Box */}
            <div className="rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 backdrop-blur-xl">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HiCheckCircle className="text-[#00D2FF] text-lg" />
                <span>Our Guaranteed Engagement Model</span>
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF]" />
                  <span>Strict NDA Signed before project discussion</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0066FF]" />
                  <span>Fixed-Price milestones or flexible dedicated team model</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                  <span>24/7 direct communication via Slack, Teams, or WhatsApp</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400 text-3xl text-emerald-400">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">
                  Proposal Request Received!
                </h3>
                <p className="max-w-md mx-auto text-sm text-slate-300">
                  Thank you for contacting NexoraLab Technologies. Our principal architect will analyze your requirements and reach out within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full bg-slate-800 px-6 py-2.5 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  Request Technical Proposal & Estimation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number (with country code)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Primary Service Requirement
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-2xl border border-slate-700 bg-[#070e1e] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-all"
                    >
                      <option value="AI Solution">Generative AI & ATS Resume Engine</option>
                      <option value="Enterprise SaaS">Full-Stack SaaS & Web App</option>
                      <option value="Mobile App">React Native Mobile App</option>
                      <option value="ERP System">Custom Enterprise ERP & CRM</option>
                      <option value="Cloud DevOps">Cloud Architecture & DevOps</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Overview & Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your project goals, scope, desired timeline, or tech stack requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Submit Project Inquiry</span>
                  <HiArrowRight />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;