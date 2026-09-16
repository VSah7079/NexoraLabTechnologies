import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiCalendar,
  HiClock,
  HiUser,
  HiEnvelope,
  HiPhone,
  HiChatBubbleLeftRight,
  HiCheckCircle,
  HiXCircle,
  HiSparkles,
  HiShieldCheck,
  HiVideoCamera,
  HiPhoneArrowUpRight,
  HiCpuChip,
  HiDevicePhoneMobile,
  HiCloud,
  HiUserGroup,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "@/components/common/SEO";
import { formsService } from "@/services/forms.service";


const Meeting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "",
    topic: "web-saas",
    meetingType: "video",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const consultationTopics = [
    { id: "web-saas", label: "Custom Web & Enterprise SaaS", icon: HiCpuChip },
    { id: "mobile", label: "Mobile App (Flutter / React Native)", icon: HiDevicePhoneMobile },
    { id: "ai-ats", label: "AI Suite & Smart ATS Integration", icon: HiSparkles },
    { id: "cloud-devops", label: "Cloud Microservices & AWS DevOps", icon: HiCloud },
    { id: "team-pods", label: "Dedicated Developer Pods", icon: HiUserGroup },
  ];

  const meetingTypes = [
    { id: "video", label: "Google Meet / Zoom", icon: HiVideoCamera, description: "Screen-share architecture diagram" },
    { id: "whatsapp", label: "WhatsApp Audio / Video", icon: FaWhatsapp, description: "Instant mobile session" },
    { id: "phone", label: "Direct Phone Call", icon: HiPhoneArrowUpRight, description: "High-level scoping briefing" },
  ];

  const timeSlots = [
    { slot: "10:00 AM", period: "Morning" },
    { slot: "11:30 AM", period: "Morning" },
    { slot: "02:00 PM", period: "Afternoon" },
    { slot: "03:30 PM", period: "Afternoon" },
    { slot: "05:00 PM", period: "Evening" },
    { slot: "06:30 PM", period: "Evening" },
    { slot: "08:00 PM", period: "Night / US Overlap" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setError("Please fill in all mandatory fields highlighted with an asterisk (*).");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await formsService.submitMeeting({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        countryCode: "+91",
        company: formData.company,
        meetingDate: formData.date,
        meetingTimeSlot: formData.time,
        meetingTopic: formData.topic,
        meetingAgenda: formData.message,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      const topicLabel = consultationTopics.find((t) => t.id === formData.topic)?.label || formData.topic;
      const typeLabel = meetingTypes.find((m) => m.id === formData.meetingType)?.label || formData.meetingType;

      const whatsappMessage = `Hi NexoraLab Technologies,%0A%0AI would like to schedule an Engineering Consultation:%0A%0A👤 *Name:* ${formData.name}%0A🏢 *Company:* ${formData.company || "N/A"}%0A📧 *Email:* ${formData.email}%0A📱 *Phone:* ${formData.phone}%0A🎯 *Topic:* ${topicLabel}%0A📹 *Channel:* ${typeLabel}%0A📅 *Preferred Date:* ${formData.date}%0A⏰ *Time Slot:* ${formData.time} (IST)%0A💬 *Scope Details:* ${formData.message || "None provided"}%0A%0APlease confirm my calendar invite.`;

      window.open(`https://wa.me/917079884369?text=${whatsappMessage}`, "_blank");
    } catch {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-36 sm:pt-40 md:pt-44 pb-20 px-4">
        <SEO
          title="Consultation Booked | NexoraLab Technologies"
          description="Your technical discovery consultation has been confirmed with NexoraLab Technologies."
        />
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 sm:p-14 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0a1e42] via-[#070e1e] to-[#040814] backdrop-blur-2xl shadow-2xl space-y-5"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <HiCheckCircle className="text-5xl" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
              Consultation Scheduled!
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Thank you, <strong className="text-white">{formData.name}</strong>. Your session for{" "}
              <span className="text-cyan-300 font-semibold">{formData.date}</span> at{" "}
              <span className="text-cyan-300 font-semibold">{formData.time} IST</span> has been received. Our lead solutions architect is preparing your tailored discovery agenda.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-300 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Consultation Channel:</span>
                <span className="font-bold text-white capitalize">{formData.meetingType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Direct Support Hotline:</span>
                <a href="tel:+917079884369" className="font-bold text-[#00D2FF] hover:underline">
                  +91 70798 84369
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Official Email:</span>
                <span className="font-bold text-white">nexoralabtechnologies@gmail.com</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Book Another Session</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 sm:pt-40 md:pt-44 pb-20 px-4">
      <SEO
        title="Book a Technical Consultation | NexoraLab Technologies"
        description="Schedule a free 30-minute technical architecture, scoping, and feasibility review with senior solutions architects at NexoraLab Technologies in Siwan, Bihar, India."
        keywords={[
          "schedule tech consultation",
          "book software discovery call",
          "NexoraLab meeting booking",
          "software architecture consulting Siwan",
          "hire developers consultation",
        ]}
        canonical="https://nexoralabtechnologies.in/meeting"
      />

      {/* Ambient Lighting */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[300px] rounded-full bg-[#00D2FF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[300px] rounded-full bg-[#7C3AED]/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-4">
            <HiCalendar className="text-sm" />
            <span>FREE 30-MINUTE DISCOVERY SESSION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-['Outfit']">
            Book an Engineering{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Consultation
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Select your preferred time slot for an in-depth architecture review, technical scoping, and milestone budget estimation with our senior engineering team.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1">
              <HiShieldCheck className="text-cyan-400" /> 100% Free & Under Strict NDA
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1">
              <HiClock className="text-cyan-400" /> 30-Minute Focused Agenda
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1">
              <HiSparkles className="text-cyan-400" /> Actionable Architecture Blueprint
            </span>
          </div>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 rounded-3xl border border-white/15 bg-[#070e1e]/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Project Topic */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00D2FF] text-black font-mono text-xs font-black">
                    1
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                    What is the primary focus of your project?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {consultationTopics.map((topic) => {
                    const TopicIcon = topic.icon;
                    const isSelected = formData.topic === topic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, topic: topic.id })}
                        className={`flex items-center gap-2.5 rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-[#00D2FF] bg-cyan-500/10 text-white shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                            : "border-white/10 bg-[#0a1128]/70 text-slate-300 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <TopicIcon
                          className={`text-lg shrink-0 ${
                            isSelected ? "text-[#00D2FF]" : "text-slate-400"
                          }`}
                        />
                        <span className="text-xs font-bold leading-tight">{topic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Contact Details */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00D2FF] text-black font-mono text-xs font-black">
                    2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                    Your Contact Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Rachel Adams"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex HealthTech Inc"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="rachel@domain.com"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 70798 84369"
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Preferred Channel */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00D2FF] text-black font-mono text-xs font-black">
                    3
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                    Preferred Communication Medium
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {meetingTypes.map((type) => {
                    const TypeIcon = type.icon;
                    const isSelected = formData.meetingType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, meetingType: type.id })}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-[#00D2FF] bg-gradient-to-b from-[#0b1b38] to-[#070e1e] shadow-[0_0_20px_rgba(0,210,255,0.2)]"
                            : "border-white/10 bg-[#0a1128]/70 hover:border-white/20"
                        }`}
                      >
                        <TypeIcon
                          className={`text-2xl mb-1.5 ${
                            isSelected ? "text-[#00D2FF]" : "text-slate-400"
                          }`}
                        />
                        <span className="text-xs font-bold text-white leading-tight">
                          {type.label}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1">
                          {type.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Date & Time */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00D2FF] text-black font-mono text-xs font-black">
                    4
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                    Select Date & Time Window (IST / UTC+5:30)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Select Slot *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none cursor-pointer"
                    >
                      <option value="">Choose a time slot</option>
                      {timeSlots.map((ts) => (
                        <option key={ts.slot} value={ts.slot} className="bg-[#070e1e] text-white">
                          {ts.slot} ({ts.period})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Slot Grid */}
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((ts) => (
                    <button
                      key={ts.slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, time: ts.slot })}
                      className={`rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                        formData.time === ts.slot
                          ? "bg-[#00D2FF] text-black font-bold"
                          : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20"
                      }`}
                    >
                      {ts.slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Project Scope */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Background or Specific Technical Questions (Optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a high-level summary of your requirements, current tech stack, or deadlines..."
                  className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-xs sm:text-sm text-white focus:border-[#00D2FF] focus:outline-none resize-none font-normal"
                />
              </div>

              {/* Error Box */}
              {error && (
                <div className="flex items-center gap-2 text-red-300 bg-red-950/40 border border-red-800 rounded-2xl p-4 text-xs">
                  <HiXCircle className="text-lg shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-xs sm:text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Confirming Session Slot...</span>
                  </>
                ) : (
                  <>
                    <HiCalendar className="text-lg" />
                    <span>Confirm Free 30-Min Engineering Consultation</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Host & Trust Sidebar (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Host Card */}
            <div className="rounded-3xl border border-white/10 bg-[#070e1e]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 pb-5 border-b border-white/10">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#00D2FF]/20 to-[#0066FF]/20 border border-cyan-500/30 text-[#00D2FF]">
                  <HiUser className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white font-['Outfit']">
                    Solutions Architecture Team
                  </h4>
                  <p className="text-xs text-cyan-400 font-semibold">
                    NexoraLab Technologies HQ
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3.5 text-xs text-slate-300 font-normal">
                <div className="flex items-start gap-2.5">
                  <HiCheckCircle className="text-cyan-400 text-base shrink-0 mt-0.5" />
                  <span>Discussion with senior architects, not junior sales reps</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <HiCheckCircle className="text-cyan-400 text-base shrink-0 mt-0.5" />
                  <span>Live feedback on tech stack selection & scalability</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <HiCheckCircle className="text-cyan-400 text-base shrink-0 mt-0.5" />
                  <span>Estimated timeline & transparent milestone budgets</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-[11px] text-slate-400">
                  Prefer instant messaging without scheduling?
                </p>
                <a
                  href="https://wa.me/917079884369?text=Hi%20NexoraLab%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20technical%20project%20immediately."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 py-3 text-xs font-bold text-emerald-400 hover:bg-emerald-900/30 transition"
                >
                  <FaWhatsapp className="text-base" />
                  <span>WhatsApp Direct Discussion</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-3xl border border-white/10 bg-[#070e1e]/80 p-6 backdrop-blur-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-3">
                Headquarters Details
              </h4>
              <div className="space-y-2.5 text-xs text-slate-300">
                <p>📍 Siwan, Bihar 841226, India</p>
                <p>
                  📞 Phone:{" "}
                  <a href="tel:+917079884369" className="text-white hover:text-cyan-300">
                    +91 70798 84369
                  </a>
                </p>
                <p>
                  ✉️ Email:{" "}
                  <a
                    href="mailto:nexoralabtechnologies@gmail.com"
                    className="text-white hover:text-cyan-300"
                  >
                    nexoralabtechnologies@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Meeting;
