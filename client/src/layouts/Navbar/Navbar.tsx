import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  HiBars3,
  HiXMark,
  HiEnvelope,
  HiPhone,
  HiCalendar,
  HiSparkles,
  HiArrowRight,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import Logo from "./Logo";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import { useModal } from "@/context/ModalContext";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openQuoteModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#040814]/95 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_12px_36px_rgba(0,0,0,0.9),0_0_20px_rgba(0,210,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        {/* Top Utility Contact Strip */}
        <div
          className={`hidden md:flex items-center justify-between border-b border-white/[0.08] bg-[#040814]/95 px-6 lg:px-12 text-[11px] font-semibold text-slate-300 backdrop-blur-md transition-all duration-300 ${
            scrolled ? "h-0 py-0 opacity-0 overflow-hidden border-none" : "h-9 opacity-100"
          }`}
        >
          {/* Left: Email & Live Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <HiEnvelope className="text-[#00D2FF] text-sm" />
              <a
                href="mailto:nexoralabtechnologies@gmail.com"
                className="hover:text-[#00D2FF] transition-colors"
              >
                nexoralabtechnologies@gmail.com
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-cyan-300 font-mono text-[10px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>24/7 Global Agile Pods & AI Talent Suite Active</span>
            </div>
          </div>

          {/* Right: Phone Contacts & WhatsApp */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs">🇮🇳</span>
              <a
                href="tel:+917079884369"
                className="hover:text-[#00D2FF] transition-colors font-mono text-[11px]"
              >
                +91 70798 84369
              </a>
              <span className="text-slate-500 text-[10px]">• Siwan, Bihar, India</span>
            </div>

            <a
              href="https://wa.me/917079884369?text=Hi%20NexoraLab%20Technologies%2C%20I%20would%20like%20to%20inquire%20about%20your%20software%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full"
            >
              <FaWhatsapp className="text-xs" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`mx-auto w-full max-w-[1480px] transition-all duration-300 ${
            scrolled ? "px-4 sm:px-6 lg:px-8 pt-0 pb-0" : "px-3 sm:px-6 pt-2 sm:pt-2.5"
          }`}
        >
          <div
            className={`relative flex h-[62px] sm:h-[68px] items-center justify-between transition-all duration-300 ${
              scrolled
                ? "rounded-none border-0 bg-transparent shadow-none px-0"
                : "rounded-full border border-white/[0.12] bg-[#060b18]/85 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.1)_inset] backdrop-blur-2xl px-4 sm:px-6"
            }`}
          >
            {/* Top Glowing Ambient Light Line (Only in floating pill mode) */}
            {!scrolled && (
              <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF]/70 to-transparent pointer-events-none" />
            )}

            {/* 1. Left: Brand Logo */}
            <div className="flex items-center shrink-0">
              <Logo size="md" />
            </div>

            {/* 2. Center: Desktop Mega Menu Navigation */}
            <nav className="hidden xl:flex items-center">
              <MegaMenu />
            </nav>

            {/* 3. Right: Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Book Consultation Button */}
              <Link
                to="/meeting"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-200 border border-white/10 bg-white/[0.03] hover:border-[#00D2FF]/50 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <HiCalendar className="text-cyan-400 text-sm" />
                <span>Book 30-Min Call</span>
              </Link>

              {/* Request Project Quote Primary Button */}
              <button
                onClick={openQuoteModal}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] shadow-[0_0_20px_rgba(0,210,255,0.35)] transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Request Quote</span>
                <HiArrowRight className="text-xs sm:text-sm" />
              </button>

              {/* Mobile Hamburger Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex xl:hidden h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-slate-200 transition hover:border-[#00D2FF]/50 hover:text-white cursor-pointer"
                aria-label="Toggle Mobile Menu"
              >
                {mobileOpen ? <HiXMark size={22} /> : <HiBars3 size={22} />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;