import React from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
  FaGithub,
} from "react-icons/fa6";
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiArrowUp,
  HiDocumentArrowDown,
} from "react-icons/hi2";
import Logo from "../Navbar/Logo";
import { useModal } from "@/context/ModalContext";

const companyLinks = [
  { name: "About NexoraLab", path: "/about" },
  { name: "Products Catalog", path: "/products" },
  { name: "Technical Resources", path: "/resources" },
  { name: "Client Portfolio", path: "/portfolio" },
  { name: "Engineering Insights", path: "/insights" },
  { name: "Careers (We're Hiring)", path: "/careers" },
  { name: "Contact Headquarters", path: "/contact" },
  { name: "Book Engineering Call", path: "/meeting" },
  { name: "Request Project Quote", path: "/quote" },
];

const solutionsLinks = [
  { name: "AI Smart Hiring & ATS Suite", path: "/solutions" },
  { name: "On-Demand Delivery & Logistics", path: "/solutions" },
  { name: "Telehealth & EHR Medical Platform", path: "/solutions" },
  { name: "Multi-Vendor E-Commerce Platform", path: "/solutions" },
  { name: "FinTech Neo-Banking & Wallet", path: "/solutions" },
  { name: "Enterprise Custom CRM & ERP", path: "/solutions" },
];

const serviceLinks = [
  { name: "Custom Software Engineering", path: "/services#software" },
  { name: "Web & Enterprise Portals", path: "/services#software" },
  { name: "Mobile Apps (iOS & Android)", path: "/services#software" },
  { name: "AWS Cloud & DevOps Automation", path: "/services#cloud" },
  { name: "Generative AI & Data Intelligence", path: "/services#ai" },
  { name: "Salesforce Consulting & LWC", path: "/services#salesforce" },
  { name: "UI/UX & Product Design Studio", path: "/services#design" },
  { name: "Digital Marketing, SEO & PPC", path: "/services#marketing" },
];

const aiSuiteLinks = [
  { name: "AI Resume Analyzer & Auditor", path: "/resume-analyzer" },
  { name: "ATS Score Checker & Matcher", path: "/ats-score" },
  { name: "AI Resume Builder (Gemini)", path: "/resume-builder" },
  { name: "AI Portfolio Builder for Devs", path: "/portfolio-builder" },
  { name: "Skill Gap Benchmarker", path: "/skill-gap" },
  { name: "AI Executive Career Coach", path: "/career-coach" },
  { name: "AI Voice & Text Mock Interview", path: "/interview" },
];

const socialLinks = [
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/135297535/", label: "LinkedIn" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/nexoralabtechnology/", label: "Instagram" },
  { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61592465423073", label: "Facebook" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@NexoraLabTechnologies", label: "YouTube" },
  { icon: <FaXTwitter />, href: "https://x.com/nexoralab", label: "Twitter" },
  { icon: <FaGithub />, href: "https://github.com/NexoraLab", label: "GitHub" },
];

const Footer: React.FC = () => {
  const { openBrochureModal } = useModal();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#02050e] pt-20 pb-10 border-t border-white/10 text-slate-300">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Top Grid (Brand, Links, Map/Brochure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-16 border-b border-white/10">
          {/* 1. Brand Col (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Logo />
            <p className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
              INNOVATE • BUILD • ELEVATE
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              A software engineering & technology company based in Siwan, Bihar, India. We design and build modern web applications, mobile apps, cloud infrastructure, and proprietary AI utilities.
            </p>

            {/* Direct Contacts */}
            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-start gap-2 text-slate-300">
                <HiMapPin className="text-[#00D2FF] text-sm shrink-0 mt-0.5" />
                <span>Siwan, Bihar 841226, India</span>
              </div>
              <a
                href="mailto:nexoralabtechnologies@gmail.com"
                className="flex items-center gap-2 text-slate-300 hover:text-[#00D2FF] transition"
              >
                <HiEnvelope className="text-[#00D2FF] text-sm shrink-0" />
                <span>nexoralabtechnologies@gmail.com</span>
              </a>
              <a
                href="tel:+917079884369"
                className="flex items-center gap-2 text-slate-300 hover:text-[#00D2FF] transition"
              >
                <HiPhone className="text-[#00D2FF] text-sm shrink-0" />
                <span>+91 70798 84369</span>
              </a>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-[#00D2FF] hover:text-[#00D2FF] hover:scale-110 text-xs"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Solutions Links (2.5 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <span className="text-[#00D2FF]">✦</span>
              <span>SOLUTIONS</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {solutionsLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-[#00D2FF] transition-colors leading-snug block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Services Links (2.5 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <span className="text-cyan-400">✦</span>
              <span>SERVICES</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-[#00D2FF] transition-colors leading-snug block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. AI Talent Suite (2.5 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <span className="text-purple-400">✦</span>
              <span>AI TALENT SUITE</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 mb-4">
              {aiSuiteLinks.map((tool, idx) => (
                <li key={idx}>
                  <Link to={tool.path} className="hover:text-[#00D2FF] transition flex items-center gap-1.5">
                    <span className="text-[#00D2FF] text-[10px]">›</span>
                    <span>{tool.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Company & Insights (2 cols) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                <span className="text-emerald-400">✦</span>
                <span>COMPANY</span>
              </h4>
              <ul className="space-y-2 text-xs">
                {companyLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="text-slate-400 hover:text-[#00D2FF] transition-colors leading-snug block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download Brochure Button */}
            <button
              onClick={openBrochureModal}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] border border-white/10 py-2.5 text-xs font-bold text-white transition hover:bg-[#00D2FF] hover:text-black hover:border-transparent cursor-pointer"
            >
              <HiDocumentArrowDown className="text-sm" />
              <span>Brochure →</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">NexoraLab Technologies</span> • Siwan, Bihar 841226, India • Innovate. Build. Elevate.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#00D2FF] transition">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-[#00D2FF] transition">Terms of Service</Link>
            <Link to="/refund-policy" className="hover:text-[#00D2FF] transition">Refund Policy</Link>
            <Link to="/admin" className="hover:text-cyan-400 text-slate-500 font-semibold transition flex items-center gap-1">
              <span>Admin</span>
            </Link>


            <button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-[#00D2FF] hover:text-[#00D2FF] hover:scale-110 cursor-pointer"
              aria-label="Scroll to top"
            >
              <HiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;