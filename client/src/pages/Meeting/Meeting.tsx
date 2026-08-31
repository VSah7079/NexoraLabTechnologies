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
    { id: "video", label: "Video Call", icon: "📹", description: "Google Meet / Zoom" },
    { id: "phone", label: "Phone Call", icon: "📞", description: "Direct call" },
    { id: "whatsapp", label: "WhatsApp", icon: "💬", description: "Chat or call" },
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
      
      // Create WhatsApp message with meeting details
      const whatsappMessage = `Hi NexoraLab Technologies,%0A%0AI would like to book a meeting:%0A%0A👤 Name: ${formData.name}%0A📧 Email: ${formData.email}%0A📱 Phone: ${formData.phone}%0A📅 Date: ${formData.date}%0A⏰ Time: ${formData.time}%0A📹 Meeting Type: ${formData.meetingType}%0A💬 Message: ${formData.message}%0A%0APlease confirm the meeting.`;
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/919023971338?text=${whatsappMessage}`, "_blank");
    }, 1500);
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
            className="text-center p-8 rounded-3xl border border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-lg shadow-gray-200/30"
          >
            <div className="flex justify-center mb-6">
              <HiCheckCircle className="text-6xl text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meeting Request Sent!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest. We've received your meeting request and will contact you shortly to confirm the details.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(34,211,238,.35)]"
            >
              Book Another Meeting
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <SEO
        title="Schedule a Technical Consultation | Book an Online Meeting"
        description="Select a date and time to meet with our senior engineers and discuss your business goals, custom software requirements, and project scope."
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md px-6 py-2 text-sm font-medium text-cyan-600">
            <HiCalendar className="text-lg" />
            Book a Meeting
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Let's Connect &{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Discuss Your Project
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Schedule a free consultation with our experts to discuss your requirements
          </p>
        </motion.div>

        {/* Meeting Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-lg shadow-gray-200/30 p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HiUser className="text-cyan-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-gray-900 transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-gray-900 transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-gray-900 transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="+91 9023971338"
                  />
                </div>
              </div>
            </div>

            {/* Meeting Type Selection */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HiChatBubbleLeftRight className="text-cyan-600" />
                Meeting Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {meetingTypes.map((type) => (
                  <label
                    key={type.id}
                    className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
                      formData.meetingType === type.id
                        ? "border-cyan-400 bg-cyan-50/50"
                        : "border-gray-200 bg-white/50 hover:border-cyan-300"
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
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <h4 className="font-semibold text-gray-900">{type.label}</h4>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                    </div>
                    {formData.meetingType === type.id && (
                      <div className="absolute top-2 right-2">
                        <HiCheckCircle className="text-cyan-500 text-xl" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Date & Time Selection */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HiClock className="text-cyan-600" />
                Select Date & Time
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-gray-900 transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-gray-900 transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us about your project (optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-gray-900 transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                placeholder="Briefly describe your project requirements..."
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-4">
                <HiXCircle className="text-xl" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(34,211,238,.35)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <HiCalendar className="text-lg" />
                  Book Free Meeting
                </>
              )}
            </button>

            {/* Alternative Contact */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                Or connect with us directly
              </p>
              <a
                href="https://wa.me/919023971338?text=Hi%20NexoraLab%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-50 px-6 py-3 text-sm font-semibold text-green-600 transition-all duration-300 hover:bg-green-100"
              >
                <FaWhatsapp className="text-lg" />
                Chat on WhatsApp
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Meeting;
