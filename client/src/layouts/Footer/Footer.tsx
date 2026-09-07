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

import { navLinks } from "@/config/navigation";
import Logo from "../Navbar/Logo";

const services = [
  "Full-Stack Web & SaaS",
  "AI & Machine Learning",
  "Mobile App Development",
  "Enterprise ERP & CRM",
  "Cloud Architecture & DevOps",
  "Dedicated Engineering Staff",
];

const companyLinks = navLinks.map((item) => ({
  name: item.title,
  link: item.path,
}));

const aiTools = [
  { name: "Resume Analyzer", path: "/resume-analyzer" },
  { name: "ATS Score Checker", path: "/ats-score" },
  { name: "AI Resume Builder", path: "/resume-builder" },
  { name: "Portfolio Builder", path: "/portfolio-builder" },
  { name: "Skill Gap Benchmark", path: "/skill-gap" },
  { name: "AI Career Coach", path: "/career-coach" },
  { name: "AI Mock Interview", path: "/interview" },
];

const socialLinks = [
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/135297535/admin/dashboard/" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/nexoralabtechnology/" },
  { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61592465423073" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@NexoraLabTechnologies" },
  { icon: <FaXTwitter />, href: "https://x.com/nexoralab" },
  { icon: <FaGithub />, href: "https://github.com/NexoraLab" },
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
        border-t
        border-white/[0.08]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1480px]
          px-4
          sm:px-6
          lg:px-8
          xl:px-10
        "
      >
        {/* Top Section */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Logo className="mb-4" />

            <p className="text-xs font-bold tracking-wider text-[#00D2FF] mb-2 uppercase">
              Innovate • Build • Elevate
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">
              Premier software engineering and AI solutions agency building high-performance, secure, and scalable digital products.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.1]
                    bg-white/[0.03]
                    text-slate-300
                    transition-all
                    duration-200
                    hover:border-[#00D2FF]/60
                    hover:text-[#00D2FF]
                    hover:shadow-[0_0_15px_rgba(0,210,255,0.3)]
                  "
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className="text-slate-400 transition-colors hover:text-[#00D2FF]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Core Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-slate-400 transition-colors hover:text-[#00D2FF]"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AI Intelligence Suite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              AI Tools & Suite
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {aiTools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    to={tool.path}
                    className="text-slate-400 transition-colors hover:text-[#00D2FF]"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <HiMapPin className="text-[#00D2FF] text-base shrink-0 mt-0.5" />
                <span>Siwan, Bihar, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiPhone className="text-[#00D2FF] text-base shrink-0" />
                <a
                  href="tel:+917079884369"
                  className="hover:text-[#00D2FF] transition-colors"
                >
                  +91 70798 84369
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <HiEnvelope className="text-[#00D2FF] text-base shrink-0" />
                <a
                  href="mailto:info@nexoralabtechnologies.in"
                  className="hover:text-[#00D2FF] transition-colors"
                >
                  info@nexoralabtechnologies.in
                </a>
              </li>
            </ul>

            {/* Newsletter form */}
            <div className="mt-5">
              <div className="text-xs font-semibold text-white mb-2">Subscribe to Tech Insights</div>
              <div className="flex rounded-full border border-white/[0.1] bg-white/[0.03] p-1">
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0066FF] px-3.5 py-1 text-xs font-semibold text-white hover:brightness-110"
                >
                  Join
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} NexoraLab Technologies. All rights reserved. • Innovate. Build. Elevate.
          </p>

          <button
            onClick={scrollToTop}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.1]
              bg-white/[0.03]
              text-slate-300
              transition-all
              hover:border-[#00D2FF]
              hover:text-[#00D2FF]
              hover:scale-110
            "
            aria-label="Back to top"
          >
            <HiArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;