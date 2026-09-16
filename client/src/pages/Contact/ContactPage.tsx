import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiSparkles,
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiCheckCircle,
  HiUser,
  HiClock,
  HiShieldCheck,
  HiGlobeAlt,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import { useModal } from "@/context/ModalContext";
import { formsService } from "@/services/forms.service";
import { contactHubImg } from "@/assets/images";
import SEO from "@/components/common/SEO";

const serviceOptions = [
  "Custom Software & Web Engineering (React/Next.js)",
  "Enterprise SaaS Multi-Tenant Product Development",
  "Mobile App Development (iOS, Android, Flutter, React Native)",
  "Cloud Infrastructure Architecture, AWS & DevOps CI/CD",
  "Generative AI, Custom LLMs & AI Autonomous Agents",
  "AI Talent Intelligence & Neural ATS Scoring Engine",
  "Salesforce Consulting, LWC & Enterprise CRM Integration",
  "QA Automation & Software Testing (Playwright/Cypress)",
  "Cybersecurity, Penetration Testing (VAPT) & DevSecOps",
  "UI/UX Product Design, Figma Systems & Prototypes",
  "Digital Marketing, Enterprise SEO & High-ROAS PPC",
  "Hire Dedicated Developers & Dedicated Pods",
];

const budgetOptions = [
  "Under $5K / ₹40K – ₹1.5L",
  "$5K – $15K / ₹1.5L – ₹4L",
  "$15K – $35K / ₹4L – ₹10L",
  "$35K – $75K / ₹10L – ₹25L",
  "$75K+ / ₹25L+",
  "Flexible / Discussion based",
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    service: "",
    budget: "",
    message: "",
    _hp: "", // Anti-spam bot honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errs.name = "Please enter your full name (minimum 2 characters).";
    } else if (trimmedName.length > 100) {
      errs.name = "Name must not exceed 100 characters.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errs.email = "Please enter a valid business email address.";
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 7 || phoneDigits.length > 15) {
      errs.phone = "Please enter a valid phone number (7-15 digits).";
    }

    if (!formData.service) {
      errs.service = "Please select a primary service.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await formsService.submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        countryCode: formData.countryCode,
        company: "",
        service: formData.service,
        budget: formData.budget || "Discussion based",
        message: formData.message.trim() || "No message provided",
        _hp: formData._hp,
      });
      setIsSubmitted(true);
    } catch {
      // Fallback optimistic success
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <SEO
        title="Contact Us | NexoraLab Technologies - Siwan, Bihar, India"
        description="Connect with NexoraLab Technologies headquarters in Siwan, Bihar, India. Book an architectural discovery call or request a guaranteed 24-hour project estimation."
        keywords={[
          "contact NexoraLab Technologies",
          "hire software engineers Siwan Bihar",
          "software agency contact number",
          "NexoraLab email nexoralabtechnologies@gmail.com",
          "software development company contact Siwan",
          "request software estimate",
          "book architecture discovery call",
        ]}
        canonical="https://nexoralabtechnologies.in/contact"
      />

      <div className="relative min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-20">
        {/* Background Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
        <div className="absolute top-[600px] left-10 w-[500px] h-[450px] rounded-full bg-[#7C3AED]/08 blur-[160px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-[#00D2FF]">Home</Link>
            <span>/</span>
            <span className="text-[#00D2FF]">Contact Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Direct Contacts & Value Props */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-4">
                  <HiSparkles />
                  <span>Direct Engineering Access</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-['Outfit']">
                  Let’s engineer something{" "}
                  <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                    extraordinary together
                  </span>
                </h1>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Have an MVP idea, cloud infrastructure scaling challenge, or AI tool requirement? Talk directly to our engineering architects based at our Siwan, Bihar headquarters.
                </p>
              </div>

              {/* Direct Info Card */}
              <div className="rounded-3xl border border-white/10 bg-[#070e1e]/90 p-6 sm:p-8 backdrop-blur-xl space-y-5 shadow-2xl">
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-['Outfit'] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00D2FF] animate-pulse" />
                  <span>Headquarters & Direct Inquiries</span>
                </h3>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <HiMapPin className="text-[#00D2FF] text-xl shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block">Corporate Headquarters</span>
                      <span className="font-bold text-white">Siwan, Bihar 841226, India</span>
                    </div>
                  </div>

                  <a
                    href="mailto:nexoralabtechnologies@gmail.com"
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#00D2FF]/40 transition group"
                  >
                    <HiEnvelope className="text-[#00D2FF] text-xl shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block">General & Enterprise Inquiries</span>
                      <span className="font-bold text-white group-hover:text-[#00D2FF] transition">nexoralabtechnologies@gmail.com</span>
                    </div>
                  </a>

                  <a
                    href="tel:+917079884369"
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#00D2FF]/40 transition group"
                  >
                    <HiPhone className="text-[#00D2FF] text-xl shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block">Direct Line (Call / SMS)</span>
                      <span className="font-bold text-white group-hover:text-[#00D2FF] transition">+91 70798 84369</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/917079884369"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition group"
                  >
                    <FaWhatsapp className="text-emerald-400 text-xl shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-emerald-300 block">WhatsApp Instant Tech Consultation</span>
                      <span className="font-bold text-emerald-400 group-hover:text-emerald-300 transition">+91 70798 84369</span>
                    </div>
                  </a>
                </div>

                {/* Guarantees */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <HiCheckCircle className="text-[#00D2FF] text-sm shrink-0" />
                    <span>Guaranteed 24-Hour Scope Estimation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiCheckCircle className="text-[#00D2FF] text-sm shrink-0" />
                    <span>Non-Disclosure Agreement (NDA) Protected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiCheckCircle className="text-[#00D2FF] text-sm shrink-0" />
                    <span>100% Source Code & Intellectual Property Ownership</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Project Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-[#070e1e]/90 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
                {isSubmitted ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-5 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <HiCheckCircle className="text-4xl" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Inquiry Received!</h3>
                    <p className="mt-2 text-sm text-slate-300 max-w-md">
                      Thank you for reaching out to NexoraLab Technologies. Our lead architect will review your project brief and respond with a technical estimate within 24 hours.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            countryCode: "+91",
                            service: "",
                            budget: "",
                            message: "",
                            _hp: "",
                          });
                        }}
                        className="rounded-full bg-white/10 px-6 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
                      >
                        Submit Another Inquiry
                      </button>
                      <Link
                        to="/"
                        className="rounded-full bg-cyan-500/20 text-[#00D2FF] border border-cyan-400/40 px-6 py-2.5 text-xs font-bold hover:bg-cyan-500/30 transition"
                      >
                        Return Home
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                        Request a Fast Project Quote
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Fill in your project details below to receive architectural advice and quotation.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Anti-Spam Bot Honeypot Field */}
                      <input
                        type="text"
                        name="_hp"
                        value={formData._hp}
                        onChange={handleChange}
                        style={{ display: "none", position: "absolute", left: "-9999px" }}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      {/* Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">
                            Full Name <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Rahul Sharma / Alex Chen"
                            className={`w-full rounded-2xl border bg-slate-900/80 py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition ${
                              errors.name ? "border-rose-500/80" : "border-white/10 focus:border-[#00D2FF]"
                            }`}
                          />
                          {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">
                            Work Email <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. name@company.com"
                            className={`w-full rounded-2xl border bg-slate-900/80 py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition ${
                              errors.email ? "border-rose-500/80" : "border-white/10 focus:border-[#00D2FF]"
                            }`}
                          />
                          {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      {/* Phone with Country Code */}
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Phone / WhatsApp Number <span className="text-rose-400">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="w-28 rounded-2xl border border-white/10 bg-slate-900/80 py-3 px-3 text-sm text-white outline-none focus:border-[#00D2FF]"
                          >
                            <option value="+91">🇮🇳 +91 (IN)</option>
                            <option value="+1">🇺🇸 +1 (US)</option>
                            <option value="+44">🇬🇧 +44 (UK)</option>
                            <option value="+971">🇦🇪 +971 (AE)</option>
                            <option value="+65">🇸🇬 +65 (SG)</option>
                            <option value="+61">🇦🇺 +61 (AU)</option>
                            <option value="+49">🇩🇪 +49 (DE)</option>
                            <option value="+966">🇸🇦 +966 (SA)</option>
                          </select>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="70798 84369"
                            className={`flex-1 rounded-2xl border bg-slate-900/80 py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition ${
                              errors.phone ? "border-rose-500/80" : "border-white/10 focus:border-[#00D2FF]"
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                      </div>

                      {/* Service & Budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">
                            Primary Service Interest <span className="text-rose-400">*</span>
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={`w-full rounded-2xl border bg-slate-900/80 py-3 px-4 text-sm text-white outline-none transition ${
                              errors.service ? "border-rose-500/80" : "border-white/10 focus:border-[#00D2FF]"
                            }`}
                          >
                            <option value="">Select a service...</option>
                            {serviceOptions.map((opt, i) => (
                              <option key={i} value={opt} className="bg-slate-900 text-white">
                                {opt}
                              </option>
                            ))}
                          </select>
                          {errors.service && <p className="text-[11px] text-rose-400 mt-1">{errors.service}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1.5">
                            Estimated Budget Tier
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 py-3 px-4 text-sm text-white outline-none focus:border-[#00D2FF]"
                          >
                            <option value="">Select budget range...</option>
                            {budgetOptions.map((b, i) => (
                              <option key={i} value={b} className="bg-slate-900 text-white">
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Project Brief */}
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Project Brief / Requirements
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project requirements, target platform, integrations, or launch timeline..."
                          className="w-full rounded-2xl border border-white/10 bg-slate-900/80 py-3 px-4 text-sm text-white placeholder-slate-500 outline-none focus:border-[#00D2FF]"
                        />
                      </div>

                      {errors.global && (
                        <p className="text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                          {errors.global}
                        </p>
                      )}

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 rounded-2xl bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-sm font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.35)] transition hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] hover:brightness-110 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? "Submitting Inquiry..." : "Submit Project Inquiry & Get Estimate →"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Headquarters Location Card */}
          <div className="mt-24">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                ✦ Official Headquarters
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1">
                Our Office Location
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Photo Showcase */}
              <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-white/10 bg-[#070e1e]/90 shadow-2xl relative min-h-[280px]">
                <img
                  src={contactHubImg}
                  alt="NexoraLab Engineering Consultation Hub"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-[#070e1e]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#070e1e]/85 border border-white/10 backdrop-blur-md">
                  <span className="text-[11px] font-bold text-cyan-300 block">✦ Central Engineering Center</span>
                  <span className="text-[10px] text-slate-300">Siwan, Bihar 841226, India</span>
                </div>
              </div>

              {/* Office Details */}
              <div className="lg:col-span-7">
                <div className="h-full rounded-3xl border border-cyan-500/30 bg-[#070e1e]/90 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 h-28 w-28 bg-[#00D2FF]/10 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xs uppercase font-bold text-cyan-400">Headquarters</span>
                        <h3 className="text-xl font-black text-white font-['Outfit']">Siwan, Bihar, India</h3>
                      </div>
                      <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-[#00D2FF]">
                        Main Center
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      NexoraLab Technologies operates from our central engineering center in Siwan, Bihar, delivering high-performance web applications, mobile platforms, and AI systems.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2.5">
                      <HiMapPin className="text-[#00D2FF] text-base shrink-0" />
                      <span>Siwan, Bihar 841226, India</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <HiPhone className="text-[#00D2FF] text-base shrink-0" />
                      <a href="tel:+917079884369" className="hover:underline text-cyan-300">+91 70798 84369</a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <HiEnvelope className="text-[#00D2FF] text-base shrink-0" />
                      <a href="mailto:nexoralabtechnologies@gmail.com" className="hover:underline text-cyan-300">nexoralabtechnologies@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <HiClock className="text-[#00D2FF] text-base shrink-0" />
                      <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
