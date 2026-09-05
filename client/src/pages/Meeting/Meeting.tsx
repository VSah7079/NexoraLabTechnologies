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
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "@/components/common/SEO";

const Meeting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    meetingType: "video",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const meetingTypes = [
    { id: "video", label: "Google Meet / Zoom", icon: "📹", description: "Video Consultation" },
    { id: "phone", label: "Direct Phone Call", icon: "📞", description: "Audio Briefing" },
    { id: "whatsapp", label: "WhatsApp Chat / Call", icon: "💬", description: "Instant Chat Session" },
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      const whatsappMessage = `Hi NexoraLab Technologies,%0A%0AI would like to book a technical consultation:%0A%0A👤 Name: ${formData.name}%0A📧 Email: ${formData.email}%0A📱 Phone: ${formData.phone}%0A📅 Date: ${formData.date}%0A⏰ Time: ${formData.time}%0A📹 Meeting Type: ${formData.meetingType}%0A💬 Message: ${formData.message}%0A%0APlease confirm my booking.`;
      
      window.open(`https://wa.me/917079884369?text=${whatsappMessage}`, "_blank");
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <SEO
          title="Schedule a Technical Consultation | Book an Online Meeting"
          description="Select a date and time to meet with our senior engineers and discuss your business goals, custom software requirements, and project scope."
        />
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 sm:p-12 rounded-3xl border border-slate-800 bg-[#070e1e]/95 backdrop-blur-2xl shadow-2xl space-y-4"
          >
            <div className="flex justify-center mb-4">
              <HiCheckCircle className="text-6xl text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black text-white font-['Outfit']">
              Meeting Request Dispatched!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Thank you for choosing NexoraLab Technologies. We've routed your booking to our lead solutions architect and sent a calendar invite.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              Book Another Session
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <SEO
        title="Schedule a Technical Consultation | Book an Online Meeting"
        description="Select a date and time to meet with our senior engineers and discuss your business goals, custom software requirements, and project scope."
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#070e1b] px-5 py-2 text-xs font-bold text-cyan-400 mb-4">
            <HiCalendar className="text-sm" />
            <span>SCHEDULE TECHNICAL DISCOVERY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-['Outfit']">
            Book an Engineering{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Consultation
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
            Select your preferred time slot for an in-depth architecture, scoping, and feasibility review with our team.
          </p>
        </motion.div>

        {/* Meeting Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-slate-800 bg-[#070e1e]/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-10 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <HiUser className="text-[#00D2FF]" />
                <span>1. Contact Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                    placeholder="e.g. Rachel Adams"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                    placeholder="e.g. rachel@enterprise.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none"
                    placeholder="+91 70798 84369"
                  />
                </div>
              </div>
            </div>

            {/* Meeting Type Selection */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <HiChatBubbleLeftRight className="text-[#00D2FF]" />
                <span>2. Preferred Communication Channel</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {meetingTypes.map((type) => (
                  <label
                    key={type.id}
                    className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                      formData.meetingType === type.id
                        ? "border-[#00D2FF] bg-[#0b132b] shadow-lg shadow-cyan-500/20 scale-[1.02]"
                        : "border-slate-800 bg-[#0a1128]/70 hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="meetingType"
                      value={type.id}
                      checked={formData.meetingType === type.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <h4 className="font-bold text-sm text-white">{type.label}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date & Time Selection */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <HiClock className="text-[#00D2FF]" />
                <span>3. Date & Time Window</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Time Slot *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white focus:border-[#00D2FF] focus:outline-none"
                  >
                    <option value="">Select a preferred time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#070e1e] text-white">
                        {slot} (IST / UTC+5:30)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Project Overview & Core Requirements (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-2xl border border-slate-700 bg-[#0a1128] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#00D2FF] focus:outline-none resize-none font-normal"
                placeholder="Share any background details or specific architecture challenges you want to review..."
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-950/30 border border-red-800 rounded-2xl p-4 text-xs">
                <HiXCircle className="text-lg shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Reserving Consultation Slot...</span>
                </>
              ) : (
                <>
                  <HiCalendar className="text-lg" />
                  <span>Confirm Free Engineering Consultation</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Option */}
            <div className="text-center pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-3 font-normal">
                Prefer immediate technical chat without scheduling?
              </p>
              <a
                href="https://wa.me/917079884369?text=Hi%20NexoraLab%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/20 px-6 py-2.5 text-xs font-bold text-emerald-400 transition-all hover:border-emerald-400 hover:bg-emerald-900/30"
              >
                <FaWhatsapp className="text-base" />
                <span>Instant WhatsApp Direct Chat</span>
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Meeting;
