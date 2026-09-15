import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";

const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl =
    "https://wa.me/917079884369?text=Hi%20NexoraLab%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20software%20project%20with%20your%20team.";

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex items-center group">
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden sm:block mr-3 rounded-xl border border-white/10 bg-[#070e1e]/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
      >
        <span>Chat with our engineers! 💬</span>
      </motion.div>

      {/* Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(37,211,102,0.65)]"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <FaWhatsapp className="relative z-10 text-3xl" />
      </motion.a>
    </div>
  );
};

export default FloatingWhatsApp;
