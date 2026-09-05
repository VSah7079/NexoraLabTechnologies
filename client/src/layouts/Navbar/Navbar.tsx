import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Logo from "./Logo";
import NavbarLinks from "./NavbarLinks";
import MobileDrawer from "./MobileDrawer";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, getDashboardRoute } = useAuth();

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="
          fixed
          top-3.5
          sm:top-5
          left-1/2
          -translate-x-1/2
          z-[999]
          w-[94%]
          max-w-[1280px]
        "
      >
        {/* Main Floating Glass Capsule */}
        <div
          className="
            relative
            flex
            h-[60px]
            sm:h-[64px]
            items-center
            justify-between
            rounded-full
            border
            border-white/[0.1]
            bg-[#060b18]/80
            px-4
            sm:px-6
            shadow-[0_20px_50px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.1)_inset]
            backdrop-blur-2xl
            transition-all
            duration-300
          "
        >
          {/* Subtle Top Glowing Light Beam */}
          <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF]/60 to-transparent pointer-events-none" />

          {/* 1. Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* 2. Center: Inner Pill Capsule for Navigation Links */}
          <nav
            className="
              hidden
              lg:flex
              items-center
              rounded-full
              border
              border-white/[0.06]
              bg-[#0a1226]/80
              p-1
              shadow-inner
              gap-0.5
            "
          >
            <NavbarLinks />
          </nav>

          {/* 3. Right: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {isAuthenticated && user ? (
              <>
                {/* Dashboard Quick Pill */}
                <Link
                  to={getDashboardRoute()}
                  className="
                    hidden
                    md:inline-flex
                    items-center
                    justify-center
                    px-3.5
                    py-1.5
                    rounded-full
                    text-xs
                    font-bold
                    text-cyan-300
                    border
                    border-cyan-500/30
                    bg-cyan-500/10
                    backdrop-blur-md
                    transition-all
                    duration-200
                    hover:border-cyan-400
                    hover:bg-cyan-500/20
                    hover:shadow-[0_0_15px_rgba(0,210,255,0.3)]
                  "
                >
                  Dashboard
                </Link>

                {/* Profile Avatar & Interactive Dropdown */}
                <ProfileDropdown />
              </>
            ) : (
              <>
                {/* Login Link */}
                <Link
                  to="/login"
                  className="
                    hidden
                    md:inline-flex
                    items-center
                    justify-center
                    px-4
                    py-1.5
                    rounded-full
                    text-xs
                    font-semibold
                    text-slate-300
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                    backdrop-blur-md
                    transition-all
                    duration-200
                    hover:border-[#00D2FF]/50
                    hover:text-white
                    hover:bg-white/[0.08]
                  "
                >
                  Login
                </Link>

                {/* CTA Get Started Button */}
                <Link
                  to="/contact"
                  className="
                    hidden
                    sm:inline-flex
                    items-center
                    justify-center
                    px-5
                    py-2
                    rounded-full
                    text-xs
                    font-bold
                    text-white
                    bg-gradient-to-r
                    from-[#00D2FF]
                    via-[#0066FF]
                    to-[#7C3AED]
                    shadow-[0_0_20px_rgba(0,210,255,0.35)]
                    transition-all
                    duration-200
                    hover:shadow-[0_0_30px_rgba(0,102,255,0.6)]
                    hover:scale-105
                    active:scale-95
                  "
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Trigger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="
                flex
                lg:hidden
                h-8.5
                w-8.5
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.03]
                text-slate-300
                transition-all
                duration-300
                hover:border-[#00D2FF]/50
                hover:text-white
              "
              aria-label="Toggle Mobile Menu"
            >
              {mobileOpen ? <HiXMark size={19} /> : <HiBars3 size={19} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Responsive Mobile Drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;