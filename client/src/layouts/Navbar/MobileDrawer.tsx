import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "./Logo";
import NavbarLinks from "./NavbarLinks";

const socialLinks = [
  { icon: <FaLinkedinIn size={18} />, href: "#" },
  { icon: <FaInstagram size={18} />, href: "#" },
  { icon: <FaFacebookF size={18} />, href: "#" },
  { icon: <FaGithub size={18} />, href: "#" },
  { icon: <FaYoutube size={18} />, href: "#" },
  { icon: <FaXTwitter size={18} />, href: "#" },
];

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[998]
              bg-gray-900/60
              backdrop-blur-sm
              lg:hidden
            "
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="
              fixed
              right-0
              top-0
              z-[999]
              flex
              h-screen
              w-[320px]
              flex-col
              border-l
              border-gray-200
              bg-white/98
              backdrop-blur-3xl
              shadow-2xl
              shadow-gray-200/50
              lg:hidden
            "
          >
            {/* Drawer Header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-gray-200
                px-5
                py-4
                bg-gray-50
              "
            >
              <Logo onClick={onClose} showText={true} />

              <button
                onClick={onClose}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-gray-100
                  text-gray-800
                  transition-colors
                  hover:bg-gray-200
                  hover:text-cyan-600
                "
              >
                <HiXMark size={22} />
              </button>
            </div>

            {/* Drawer Navigation */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div className="flex flex-col gap-2">
                <NavbarLinks onClick={onClose} mobile={true} />
              </div>

              {/* Login Link */}
              <Link
                to="/login"
                onClick={onClose}
                className="mt-6 flex w-full items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600 hover:bg-gray-50"
              >
                Login
              </Link>

              {/* Drawer CTA */}
              <Link
                to="/contact"
                onClick={onClose}
                className="
                  mt-6
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  via-blue-500
                  to-violet-600
                  px-6
                  py-3.5
                  text-base
                  font-semibold
                  text-white
                  shadow-[0_8px_30px_rgba(34,211,238,0.25)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_40px_rgba(34,211,238,0.35)]
                  active:scale-95
                "
              >
                Start Your Project
              </Link>

              {/* Contact Info */}
              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-5
                  backdrop-blur-2xl
                "
              >
                <h4 className="text-base font-bold text-gray-900 mb-4">
                  Contact Us
                </h4>

                <div className="space-y-3.5">
                  <a
                    href="tel:+919876543210"
                    className="
                      flex
                      items-center
                      gap-3.5
                      text-sm
                      text-gray-600
                      transition-all
                      duration-300
                      hover:text-cyan-600
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-cyan-50
                        text-cyan-600
                        text-lg
                      "
                    >
                      📞
                    </div>
                    <span className="font-medium">+91 98765 43210</span>
                  </a>

                  <a
                    href="mailto:info@nexoralabtechnologies.in"
                    className="
                      flex
                      items-center
                      gap-3.5
                      text-sm
                      text-gray-600
                      transition-all
                      duration-300
                      hover:text-cyan-600
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-cyan-50
                        text-cyan-600
                        text-lg
                      "
                    >
                      ✉️
                    </div>
                    <span className="break-all font-medium">
                      info@nexoralabtech.in
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-gray-200 px-5 py-5 bg-gray-50">
              {/* Social Icons */}
              <div className="flex items-center justify-center gap-3.5">
                {socialLinks.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      text-gray-600
                      transition-all
                      duration-300
                      hover:border-cyan-400/50
                      hover:text-cyan-600
                      hover:bg-cyan-50
                    "
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>

              <p
                className="
                  mt-4
                  text-center
                  text-[11px]
                  leading-5
                  text-gray-500
                  font-medium
                "
              >
                Building innovative digital experiences
                <br />
                for startups and enterprises.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;