import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiSparkles,
  HiUser,
  HiEnvelope,
  HiPhone,
  HiCheckCircle,
  HiShieldCheck,
  HiClock,
  HiArrowRight,
  HiDocumentText,
  HiRocketLaunch,
  HiChatBubbleLeftRight,
  HiMapPin,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import SEO from "@/components/common/SEO";

interface PhoneRule {
  min: number;
  max: number;
  label: string;
  placeholder: string;
}

const phoneRules: Record<string, PhoneRule> = {
  "+91": { min: 10, max: 10, label: "India (+91)", placeholder: "9876543210" },
  "+1": { min: 10, max: 10, label: "USA/Canada (+1)", placeholder: "2025551234" },
  "+44": { min: 10, max: 11, label: "UK (+44)", placeholder: "7911123456" },
  "+971": { min: 9, max: 9, label: "UAE (+971)", placeholder: "501234567" },
  "+65": { min: 8, max: 8, label: "Singapore (+65)", placeholder: "91234567" },
  "+61": { min: 9, max: 9, label: "Australia (+61)", placeholder: "412345678" },
  "+49": { min: 10, max: 11, label: "Germany (+49)", placeholder: "15112345678" },
  "+33": { min: 9, max: 9, label: "France (+33)", placeholder: "612345678" },
  "+81": { min: 10, max: 11, label: "Japan (+81)", placeholder: "9012345678" },
  "+86": { min: 11, max: 11, label: "China (+86)", placeholder: "13812345678" },
  "+966": { min: 9, max: 9, label: "Saudi Arabia (+966)", placeholder: "512345678" },
  "+974": { min: 8, max: 8, label: "Qatar (+974)", placeholder: "55123456" },
};

const serviceOptions = [
  "Custom Software & Web Engineering (React / Next.js / Node)",
  "Cloud Architecture, AWS Infrastructure & DevOps CI/CD",
  "Mobile App Development (iOS, Android, Flutter & React Native)",
  "Generative AI, Autonomous Agents & Custom LLMs",
  "Enterprise SaaS Multi-Tenant Product Development",
  "Salesforce Consulting, LWC & Enterprise CRM Integration",
  "UI/UX Product Design, Figma Systems & Prototypes",
  "AI Talent Intelligence & Neural ATS Scoring Engine",
  "QA Automation & Software Testing (Playwright / Cypress)",
  "Cybersecurity, Penetration Testing (VAPT) & DevSecOps",
  "Digital Marketing, Enterprise SEO & High-ROAS PPC",
  "Dedicated Developer Pods & Staff Augmentation",
  "Other Custom Enterprise Engineering Project",
];

const budgetOptions = [
  "Under $5,000 / ₹40K – ₹1.5L (Starter MVP)",
  "$5,000 – $15,000 / ₹1.5L – ₹4L (Growth Project)",
  "$15,000 – $35,000 / ₹4L – ₹10L (Scale Stack)",
  "$35,000 – $75,000 / ₹10L – ₹25L (Enterprise)",
  "$75,000+ / ₹25L+ (Custom Transformation)",
  "Flexible / Discussion Based",
];

const timelineOptions = [
  "Urgent (< 1 Month)",
  "1 – 3 Months",
  "3 – 6 Months",
  "Ongoing / Dedicated Pod",
  "Flexible",
];

const quoteFaqs = [
  {
    q: "How fast will I receive my project estimate?",
    a: "Within 24 hours of receiving your requirements, our lead solutions architect analyzes the scope and sends a detailed proposal including technical architecture, sprint milestones, and fixed budget options.",
  },
  {
    q: "Do you sign a Non-Disclosure Agreement (NDA)?",
    a: "Yes, 100%. We execute mutual NDAs prior to in-depth technical scoping to guarantee complete confidentiality and proprietary IP protection.",
  },
  {
    q: "Who owns the source code and intellectual property?",
    a: "You own 100% of all source code, repository commits, databases, architectural blueprints, and intellectual property upon project completion.",
  },
  {
    q: "Can we hire dedicated developers on a monthly retainer?",
    a: "Yes, we offer dedicated full-time engineering pods (Frontend, Backend, DevOps, AI, Mobile) dedicated exclusively to your sprint goals.",
  },
];

const QuotePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    service: "",
    budget: "",
    timeline: "1 – 3 Months",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentRule = phoneRules[formData.countryCode] || {
    min: 7,
    max: 15,
    label: "Selected Country",
    placeholder: "Phone number",
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Full name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid business email address.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      newErrors.phone = "Mobile number is required.";
    } else if (phoneDigits.length < currentRule.min || phoneDigits.length > currentRule.max) {
      if (currentRule.min === currentRule.max) {
        newErrors.phone = `${currentRule.label} number must be exactly ${currentRule.min} digits.`;
      } else {
        newErrors.phone = `${currentRule.label} number must be ${currentRule.min}–${currentRule.max} digits.`;
      }
    }

    if (!formData.service) {
      newErrors.service = "Please select an engineering service.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const sanitized = value.replace(/\D/g, "").slice(0, currentRule.max);
      setFormData((prev) => ({ ...prev, phone: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSuccess(true);
    } catch {
      setErrors({
        global: "Submission failed. Please connect with nexoralabtechnologies@gmail.com directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040813] text-slate-100 pt-36 sm:pt-40 md:pt-44 pb-24 overflow-hidden">
      <SEO
        title="Request Project Quote & Scoping | NexoraLab Technologies"
        description="Get a guaranteed 24-hour custom software, mobile app, or AI project estimate from NexoraLab Technologies in Siwan, Bihar, India. Milestone-driven pricing, strict NDAs, and 100% IP transfer."
        keywords={[
          "software project cost estimation",
          "web app development quote India",
          "mobile app development pricing",
          "hire dedicated developers price quote",
          "software development cost calculator",
          "custom software quotation Siwan Bihar",
        ]}
        canonical="https://nexoralabtechnologies.in/quote"
      />

      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#00D2FF]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[400px] rounded-full bg-[#7C3AED]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Breadcrumbs & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-4">
            <HiSparkles className="text-sm" />
            <span>ENTERPRISE ESTIMATION & SCOPING</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight leading-tight">
            Build Scalable Software with{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              NexoraLab
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Turn your product vision into production reality. Receive a comprehensive scope breakdown, milestone timeline, and fixed budget estimate within 24 hours.
          </p>
        </div>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Guarantees & Lifecycle */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c1835] via-[#081226] to-[#040813] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-52 h-52 rounded-full bg-[#00D2FF]/15 blur-3xl pointer-events-none" />

              <h2 className="text-xl font-black text-white font-['Outfit'] mb-4 flex items-center gap-2">
                <HiShieldCheck className="text-[#00D2FF] text-2xl" />
                <span>Enterprise Delivery Commitments</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-3.5">
                  <HiCheckCircle className="text-[#00D2FF] text-xl shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white">Guaranteed 24-Hour Scoping</h3>
                    <p className="text-slate-400 text-xs mt-0.5 font-normal">
                      Receive comprehensive architecture blueprints and milestone-based cost options.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-3.5">
                  <HiCheckCircle className="text-[#00D2FF] text-xl shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white">100% IP & Code Ownership</h3>
                    <p className="text-slate-400 text-xs mt-0.5 font-normal">
                      Full copyright transfer, repository access, and all documentation provided.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-3.5">
                  <HiCheckCircle className="text-[#00D2FF] text-xl shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white">ISO 9001 & ISO 27001 Security</h3>
                    <p className="text-slate-400 text-xs mt-0.5 font-normal">
                      Enterprise security guardrails, zero-trust architecture, and strict NDAs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-3.5">
                  <HiCheckCircle className="text-[#00D2FF] text-xl shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white">Dedicated In-House Pods</h3>
                    <p className="text-slate-400 text-xs mt-0.5 font-normal">
                      Senior architects, full-stack engineers, UI/UX designers, and QA specialists.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Support Contacts */}
              <div className="mt-6 pt-5 border-t border-white/10 space-y-3 text-xs">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                  Direct Engineering Inquiries
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300">
                  <a
                    href="mailto:nexoralabtechnologies@gmail.com"
                    className="inline-flex items-center gap-2 hover:text-[#00D2FF] transition"
                  >
                    <HiEnvelope className="text-cyan-400 text-sm" />
                    <span>nexoralabtechnologies@gmail.com</span>
                  </a>
                  <a
                    href="tel:+917079884369"
                    className="inline-flex items-center gap-2 hover:text-[#00D2FF] transition"
                  >
                    <HiPhone className="text-cyan-400 text-sm" />
                    <span>+91 70798 84369</span>
                  </a>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/917079884369?text=Hi%20NexoraLab%2C%20I%20would%20like%20to%20discuss%20a%20project%20quote."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/40 transition"
                  >
                    <FaWhatsapp className="text-base" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Book Engineering Call Card */}
            <div className="rounded-3xl border border-cyan-500/20 bg-[#07132a]/90 p-6 flex items-center justify-between shadow-lg">
              <div>
                <h4 className="text-sm font-bold text-white">Prefer a live architecture call?</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Schedule a 30-minute discovery consultation with our principal architect.
                </p>
              </div>
              <Link
                to="/meeting"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/25 transition ml-3"
              >
                <span>Book Call</span>
                <HiArrowRight />
              </Link>
            </div>
          </div>

          {/* Right Column: Full Page Quote Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-[#060b18]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
              {isSuccess ? (
                <div className="text-center py-16 px-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                    <HiCheckCircle className="text-5xl" />
                  </div>
                  <h3 className="text-3xl font-black text-white font-['Outfit']">
                    Request Received Successfully!
                  </h3>
                  <p className="mt-3 text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
                    Thank you for reaching out to NexoraLab Technologies. Our principal engineering architect is currently reviewing your project requirements and will respond within <strong>24 hours</strong> with a technical roadmap and estimate.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-5 py-2.5 text-xs font-bold text-cyan-300">
                    <HiClock className="text-base" />
                    <span>Average Enterprise Response Time: Under 4 Business Hours</span>
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      to="/services"
                      className="rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3 text-sm font-bold text-white shadow-lg hover:scale-105 transition"
                    >
                      Explore Our 12 Services →
                    </Link>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: "",
                          email: "",
                          countryCode: "+91",
                          phone: "",
                          service: "",
                          budget: "",
                          timeline: "1 – 3 Months",
                          message: "",
                        });
                      }}
                      className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-8 pb-4 border-b border-white/10">
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
                      Request a Project Quote
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Fill out the form below to receive a custom architecture blueprint and budget estimate.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <HiUser className="absolute left-3.5 text-slate-400 text-base pointer-events-none" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full rounded-xl border bg-[#091122] py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] focus:ring-2 focus:ring-cyan-500/20 ${
                              errors.name ? "border-rose-500" : "border-white/15"
                            }`}
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Work Email <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <HiEnvelope className="absolute left-3.5 text-slate-400 text-base pointer-events-none" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            className={`w-full rounded-xl border bg-[#091122] py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] focus:ring-2 focus:ring-cyan-500/20 ${
                              errors.email ? "border-rose-500" : "border-white/15"
                            }`}
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Country Code & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <div className="sm:col-span-5">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Country Code
                        </label>
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/15 bg-[#091122] py-3 px-3.5 text-sm text-white outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] cursor-pointer"
                        >
                          {Object.entries(phoneRules).map(([code, rule]) => (
                            <option key={code} value={code} className="bg-[#091122] text-white">
                              {rule.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-7">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Mobile / WhatsApp Number <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <HiPhone className="absolute left-3.5 text-slate-400 text-base pointer-events-none" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={currentRule.placeholder}
                            maxLength={currentRule.max}
                            className={`w-full rounded-xl border bg-[#091122] py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] focus:ring-2 focus:ring-cyan-500/20 ${
                              errors.phone ? "border-rose-500" : "border-white/15"
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Service & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Select Service <span className="text-rose-400">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-[#091122] py-3 px-3.5 text-sm text-white outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] cursor-pointer ${
                            errors.service ? "border-rose-500" : "border-white/15"
                          }`}
                        >
                          <option value="" disabled className="bg-[#091122] text-slate-400">
                            Select Engineering Service
                          </option>
                          {serviceOptions.map((svc) => (
                            <option key={svc} value={svc} className="bg-[#091122] text-white">
                              {svc}
                            </option>
                          ))}
                        </select>
                        {errors.service && <p className="mt-1 text-xs text-rose-400">{errors.service}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Estimated Budget
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/15 bg-[#091122] py-3 px-3.5 text-sm text-white outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] cursor-pointer"
                        >
                          <option value="" className="bg-[#091122] text-slate-400">
                            Select Budget Range
                          </option>
                          {budgetOptions.map((b) => (
                            <option key={b} value={b} className="bg-[#091122] text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Timeline Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Target Launch Timeline
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {timelineOptions.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, timeline: t }))}
                            className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                              formData.timeline === t
                                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm"
                                : "border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Project Message / Brief */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Project Brief & Technical Requirements
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your product vision, key features, target audience, preferred tech stack, or existing architecture..."
                        className="w-full rounded-xl border border-white/15 bg-[#091122] py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </div>

                    {errors.global && (
                      <p className="text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                        {errors.global}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-2xl bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-sm font-black tracking-wider uppercase text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-all hover:shadow-[0_0_50px_rgba(0,102,255,0.6)] hover:brightness-110 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? "Generating Custom Estimate..." : "SUBMIT PROJECT ESTIMATION REQUEST"}</span>
                      <HiArrowRight className="text-base" />
                    </button>

                    <p className="text-[11px] text-center text-slate-500 mt-2 font-normal">
                      🔒 Your data is protected by strict mutual NDAs and will never be shared.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-1">
              Project Estimation & Scoping FAQs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {quoteFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#060b18]/80 p-6 backdrop-blur-sm"
              >
                <h4 className="text-sm font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
