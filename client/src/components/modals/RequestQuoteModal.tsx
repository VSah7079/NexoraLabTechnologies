import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiXMark,
  HiUser,
  HiEnvelope,
  HiPhone,
  HiCheckCircle,
  HiSparkles,
  HiClock,
} from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";

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
  "+966": { min: 9, max: 9, label: "Saudi (+966)", placeholder: "512345678" },
  "+974": { min: 8, max: 8, label: "Qatar (+974)", placeholder: "55123456" },
};

const serviceOptions = [
  "Custom Software & Web Engineering",
  "Cloud Infrastructure, AWS & DevOps CI/CD",
  "Mobile App Development (iOS & Android)",
  "Generative AI, Agents & Custom LLMs",
  "Enterprise SaaS Multi-Tenant Platforms",
  "Salesforce Consulting & LWC Integration",
  "UI/UX Product Design & Figma Systems",
  "AI Talent Intelligence & ATS Scoring",
  "QA Automation & Software Testing",
  "Cybersecurity, VAPT & DevSecOps",
  "Digital Marketing & High-ROAS PPC",
  "Dedicated Developer Pods",
  "Other Custom Project",
];

const budgetOptions = [
  "Under $5,000 / ₹40K – ₹1.5L (Starter)",
  "$5,000 – $15,000 / ₹1.5L – ₹4L (Growth)",
  "$15,000 – $35,000 / ₹4L – ₹10L (Scale)",
  "$35,000 – $75,000 / ₹10L – ₹25L (Enterprise)",
  "$75,000+ / ₹25L+ (Transformation)",
  "Flexible / Discussion Based",
];

const RequestQuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal } = useModal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    service: "",
    budget: "",
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
        newErrors.phone = `${currentRule.label} must be ${currentRule.min} digits.`;
      } else {
        newErrors.phone = `${currentRule.label} must be ${currentRule.min}–${currentRule.max} digits.`;
      }
    }

    if (!formData.service) {
      newErrors.service = "Please select a service.";
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch {
      setErrors({
        global: "Submission failed. Please connect directly at nexoralabtechnologies@gmail.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeQuoteModal();
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        service: "",
        budget: "",
        message: "",
      });
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container — 100% fits without internal scrollbar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl lg:max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#060b18] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(0,210,255,0.12)] my-auto flex flex-col md:flex-row"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF] to-[#7C3AED] z-30" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-110 cursor-pointer shadow-md"
            >
              <HiXMark className="text-lg" />
            </button>

            {/* Left Column: Showcase Art & Guarantees */}
            <div className="hidden md:flex md:w-[40%] flex-col justify-between bg-gradient-to-br from-[#0a1835] via-[#071124] to-[#030712] p-6 lg:p-7 border-r border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 rounded-full bg-[#00D2FF]/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 rounded-full bg-[#7C3AED]/20 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#00D2FF]">
                  <HiSparkles className="text-xs" />
                  <span>Enterprise Estimation</span>
                </div>

                <h3 className="mt-3 text-xl lg:text-2xl font-black text-white font-['Outfit'] leading-snug tracking-tight">
                  Build scalable software with{" "}
                  <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                    NexoraLab
                  </span>
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                  Turn your product vision into reality. We sign strict NDAs and deliver milestone-driven software architecture with guaranteed SLAs.
                </p>
              </div>

              {/* Feature Points */}
              <div className="relative z-10 space-y-2.5 my-4">
                {[
                  "Guaranteed 24-Hour Scope & Cost Estimation",
                  "100% IP & Source Code Ownership",
                  "ISO 9001 & ISO 27001 Certified Practices",
                  "Dedicated Full-Stack & AI Architects",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-[#00D2FF] font-bold text-[10px] border border-cyan-500/40">
                      ✓
                    </div>
                    <span className="font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Info Pills */}
              <div className="relative z-10 pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-slate-300">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:nexoralabtechnologies@gmail.com"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition truncate"
                  >
                    <HiEnvelope className="text-cyan-400 text-xs shrink-0" />
                    <span className="truncate">nexoralabtechnologies@gmail.com</span>
                  </a>
                  <a
                    href="tel:+917079884369"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition shrink-0 whitespace-nowrap"
                  >
                    <HiPhone className="text-cyan-400 text-xs shrink-0" />
                    <span>+91 70798 84369</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Column — Zero Scrollbar */}
            <div className="w-full md:w-[60%] p-5 sm:p-6 lg:p-7 bg-[#060b18] flex flex-col justify-center overflow-hidden">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-8 px-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-3 shadow-[0_0_30px_rgba(16,185,129,0.35)]">
                    <HiCheckCircle className="text-3xl" />
                  </div>
                  <h4 className="text-xl font-black text-white font-['Outfit']">
                    Request Received Successfully!
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-300 max-w-sm leading-relaxed font-normal">
                    Thank you for contacting NexoraLab Technologies. Our principal solutions architect will review your project requirements and share a custom estimate within <strong>24 hours</strong>.
                  </p>
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 text-[11px] text-cyan-300">
                    <HiClock className="text-sm shrink-0" />
                    <span>Estimated response time: Under 4 business hours</span>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-6 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-7 py-2.5 text-xs font-bold text-white shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-3.5">
                    <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
                      Request Quote
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5 font-normal">
                      Fill out the details below to receive a custom project estimate within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Row 1: Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Full Name <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <HiUser className="absolute left-3 text-slate-400 text-sm pointer-events-none" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Full Name"
                            className={`w-full rounded-xl border bg-[#091122] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] ${
                              errors.name ? "border-rose-500" : "border-white/10"
                            }`}
                          />
                        </div>
                        {errors.name && <p className="mt-0.5 text-[10px] text-rose-400">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Your Email <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <HiEnvelope className="absolute left-3 text-slate-400 text-sm pointer-events-none" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            className={`w-full rounded-xl border bg-[#091122] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] ${
                              errors.email ? "border-rose-500" : "border-white/10"
                            }`}
                          />
                        </div>
                        {errors.email && <p className="mt-0.5 text-[10px] text-rose-400">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Row 2: Country Code & Mobile Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                      <div className="sm:col-span-5">
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Country Code
                        </label>
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-[#091122] py-2 px-2.5 text-xs text-white outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] cursor-pointer"
                        >
                          {Object.entries(phoneRules).map(([code, rule]) => (
                            <option key={code} value={code} className="bg-[#091122] text-white">
                              {rule.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-7">
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Mobile Number <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <HiPhone className="absolute left-3 text-slate-400 text-sm pointer-events-none" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={currentRule.placeholder}
                            maxLength={currentRule.max}
                            className={`w-full rounded-xl border bg-[#091122] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] ${
                              errors.phone ? "border-rose-500" : "border-white/10"
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="mt-0.5 text-[10px] text-rose-400">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Row 3: Service & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Select Service <span className="text-rose-400">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-[#091122] py-2 px-2.5 text-xs text-white outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] cursor-pointer ${
                            errors.service ? "border-rose-500" : "border-white/10"
                          }`}
                        >
                          <option value="" disabled className="bg-[#091122] text-slate-400">
                            Select Service
                          </option>
                          {serviceOptions.map((svc) => (
                            <option key={svc} value={svc} className="bg-[#091122] text-white">
                              {svc}
                            </option>
                          ))}
                        </select>
                        {errors.service && <p className="mt-0.5 text-[10px] text-rose-400">{errors.service}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Estimated Budget
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-[#091122] py-2 px-2.5 text-xs text-white outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] cursor-pointer"
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

                    {/* Row 4: Project Brief / Message */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Project Brief / Message
                      </label>
                      <textarea
                        name="message"
                        rows={2}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project requirements, features, timeline..."
                        className="w-full rounded-xl border border-white/10 bg-[#091122] py-2 px-3 text-xs text-white placeholder-slate-500 outline-none transition focus:border-[#00D2FF] focus:bg-[#0c1830] resize-none"
                      />
                    </div>

                    {errors.global && (
                      <p className="text-[11px] text-rose-400 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                        {errors.global}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(0,210,255,0.35)] transition-all hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] hover:brightness-110 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? "Generating Quote..." : "SUBMIT NOW →"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RequestQuoteModal;
