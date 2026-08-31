import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiArrowUp,
} from "react-icons/hi2";

// ✅ Import from config
import { navLinks } from "@/config/navigation";
import { APP_NAME } from "@/config/constants";
import Logo from "../Navbar/Logo";

// ✅ Services
const services = [
  "Website Development",
  "Mobile App Development",
  "Custom Software",
  "ERP Solutions",
  "CRM Development",
  "Cloud Solutions",
];

// ✅ Company links from config
const companyLinks = navLinks.map((item) => ({
  name: item.title,
  link: item.path,
}));

// ✅ AI Tools
const aiTools = [
  { name: "Resume Analyzer", path: "/resume-analyzer" },
  { name: "ATS Score Checker", path: "/ats-score" },
  { name: "AI Resume Builder", path: "/resume-builder" },
  { name: "Portfolio Builder", path: "/portfolio-builder" },
  { name: "Skill Gap Analyzer", path: "/skill-gap" },
  { name: "AI Career Coach", path: "/career-coach" },
  { name: "Mock Interview", path: "/interview" },
];

const socialLinks = [
  { icon: <FaLinkedinIn />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaGithub />, href: "#" },
  { icon: <FaYoutube />, href: "#" },
  { icon: <FaXTwitter />, href: "#" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-transparent
        pt-20
        pb-10
      "
    >
      {/* Background Effects - Removed to show NetworkBackground */}

      <div
        className="
          mx-auto
          max-w-[1400px]
          px-4
          sm:px-6
          lg:px-8
          xl:px-10
        "
      >
        {/* Top Section */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Logo showText={true} className="mb-6" />

            <p className="mt-6 text-gray-600 leading-relaxed">
              Building innovative digital solutions for startups and enterprises worldwide.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    text-gray-600
                    transition-all
                    duration-300
                    hover:border-cyan-400
                    hover:text-cyan-600
                    hover:bg-cyan-50
                  "
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-gray-900">
              Quick Links
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {companyLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={item.link}
                    className="
                      text-gray-600
                      transition-all
                      duration-300
                      hover:text-cyan-600
                    "
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-gray-900">
              Services
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {services.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to="/services"
                    className="
                      text-gray-600
                      transition-all
                      duration-300
                      hover:text-cyan-600
                    "
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-gray-900">
              AI Tools
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {aiTools.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    className="
                      text-gray-600
                      transition-all
                      duration-300
                      hover:text-cyan-600
                    "
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-gray-900">
              Contact
            </h3>

            <div className="mt-6 space-y-4">
              <a
                href="tel:+917079884369"
                className="
                  flex
                  items-center
                  gap-3
                    text-gray-600
                    transition-all
                    duration-300
                    hover:text-cyan-600
                  "
              >
                <HiPhone className="text-cyan-600" size={18} />
                <span>+91 7079884369</span>
              </a>

              <a
                href="mailto:info@nexoralabtechnologies.in"
                className="
                  flex
                  items-center
                  gap-3
                  text-gray-600
                  transition-all
                  duration-300
                  hover:text-cyan-600
                "
              >
                <HiEnvelope className="text-cyan-600" size={18} />
                <span>info@nexoralabtechnologies.in</span>
              </a>

              <div className="flex items-center gap-3 text-gray-600">
                <HiMapPin className="text-cyan-600" size={18} />
                <span>Siwan, Bihar, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {" "}
              <span className="font-semibold text-gray-900">
                {APP_NAME}
              </span>
              . All Rights Reserved.
            </p>

            {/* Scroll To Top */}
            <motion.button
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                text-gray-700
                transition-all
                duration-300
                hover:border-cyan-400
                hover:text-cyan-600
                hover:bg-cyan-50
              "
            >
              <HiArrowUp size={18} />
              Back to Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;