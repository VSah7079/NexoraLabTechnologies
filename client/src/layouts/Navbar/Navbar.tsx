import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "./Logo";
import NavbarLinks from "./NavbarLinks";
import MobileDrawer from "./MobileDrawer";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  const headerBg = isScrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl shadow-gray-200/30"
    : "bg-transparent";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          fixed
          left-0
          top-0
          z-[999]
          w-full
          transition-all
          duration-500
          ${headerBg}
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[72px]
            max-w-[1600px]
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
          "
        >
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            <NavbarLinks />
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Login Link */}
            <Link
              to="/login"
              className="
                hidden
                lg:inline-flex
                items-center
                justify-center
                px-5
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                text-gray-700
                border
                border-gray-300
                bg-white
                transition-all
                duration-300
                hover:border-cyan-400
                hover:text-cyan-600
                hover:bg-gray-50
              "
            >
              Login
            </Link>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="
                hidden
                lg:inline-flex
                items-center
                justify-center
                px-6
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                text-white
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-violet-600
                transition-all
                duration-300
                shadow-[0_4px_20px_rgba(34,211,238,0.3)]
                hover:-translate-y-0.5
                hover:shadow-[0_8px_30px_rgba(34,211,238,0.4)]
                active:scale-95
              "
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="
                flex
                lg:hidden
                items-center
                justify-center
                h-11
                w-11
                rounded-xl
                border
                border-gray-300/50
                bg-gray-100
                text-gray-800
                transition-all
                duration-300
                hover:border-cyan-400/50
                hover:text-cyan-600
              "
            >
              {mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;