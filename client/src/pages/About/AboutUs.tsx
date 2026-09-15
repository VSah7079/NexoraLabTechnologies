import React from "react";
import { Link } from "react-router-dom";
import {
  HiSparkles,
  HiCheckCircle,
  HiArrowRight,
  HiCpuChip,
  HiShieldCheck,
  HiRocketLaunch,
  HiUsers,
  HiBuildingOffice2,
  HiMapPin,
  HiGlobeAlt,
} from "react-icons/hi2";
import SEO from "@/components/common/SEO";
import { useModal } from "@/context/ModalContext";
import aboutTechImg from "@/assets/images/about_tech_showcase_1788590253278.jpg";

const stats = [
  { value: "99.9%", label: "Platform Uptime SLA", sub: "Enterprise standard availability" },
  { value: "40+", label: "Scalable Production Systems", sub: "Web, mobile & cloud products" },
  { value: "50K+", label: "AI Resumes & Tests Processed", sub: "Proprietary AI Talent Suite" },
  { value: "24/7", label: "Client Support & Monitoring", sub: "Real-time incident response" },
];

const corePillars = [
  {
    icon: HiCpuChip,
    title: "Modern Full-Stack Engineering",
    desc: "We build on clean, typed codebases using React 19, Next.js, Node.js, FastAPI, Flutter, and PostgreSQL designed for sub-100ms response times.",
  },
  {
    icon: HiRocketLaunch,
    title: "Proprietary AI & Talent Intelligence",
    desc: "From sub-15ms ATS resume parsers to conversational mock interviewers, we harness cutting-edge LLMs and vector search for breakthrough efficiency.",
  },
  {
    icon: HiShieldCheck,
    title: "Security-First Architecture",
    desc: "Zero-Trust RBAC, AES-256 data encryption at rest, automated vulnerability scanning (VAPT), and strict SOC2/HIPAA compliance standards.",
  },
  {
    icon: HiUsers,
    title: "Dedicated Agile Engineering Pods",
    desc: "Our agile pods function as an extension of your in-house team with daily standups, Jira/Linear task transparency, and bi-weekly sprint demos.",
  },
];

const leadershipValues = [
  {
    num: "01",
    title: "Innovate Without Limits",
    desc: "We stay ahead of modern technology curves—adopting modern frameworks, generative AI agents, and serverless architectures before they become legacy.",
  },
  {
    num: "02",
    title: "Build with Precision",
    desc: "Every pixel, API endpoint, and database query is optimized for speed, fault tolerance, and effortless horizontal scalability under peak concurrency.",
  },
  {
    num: "03",
    title: "Elevate Global Brands",
    desc: "Our software doesn't just run; it accelerates business growth, reduces operational overhead by up to 60%, and turns visitors into loyal customers.",
  },
];

const operationsHighlights = [
  {
    title: "Corporate Headquarters",
    city: "Siwan, Bihar, India",
    address: "Siwan, Bihar 841226, India",
    desc: "Central engineering hub, product development, and software architecture operations.",
    badge: "Main HQ",
  },
  {
    title: "Direct Client Support",
    city: "Dedicated Communication",
    address: "Email: nexoralabtechnologies@gmail.com | Phone: +91 70798 84369",
    desc: "Direct communication with our engineering team for sprint updates, scoping, and support.",
    badge: "Active Support",
  },
  {
    title: "Agile Pod Cadence",
    city: "Sprint Engineering",
    address: "Bi-weekly sprint releases & live staging demos",
    desc: "Rigorous code review, automated testing, and transparent delivery pipelines.",
    badge: "Agile 2.0",
  },
];

const AboutUs: React.FC = () => {
  const { openQuoteModal, openBrochureModal } = useModal();

  return (
    <>
      <SEO
        title="About Us | NexoraLab Technologies - Innovate • Build • Elevate"
        description="Learn about NexoraLab Technologies, a premier software engineering agency headquartered in Siwan, Bihar, India building custom web apps, mobile solutions, cloud infrastructure, and proprietary AI talent intelligence tools."
        keywords={[
          "about NexoraLab Technologies",
          "software company in Siwan Bihar",
          "IT company in Bihar",
          "software founders Bihar Vikram Sah",
          "AI engineering agency India",
          "custom software consulting Siwan",
          "NexoraLab story and mission",
        ]}
        canonical="https://nexoralabtechnologies.in/about"
      />

      <div className="relative min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-44 pb-20">
        {/* Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-[#0066FF]/08 blur-[180px] pointer-events-none" />
        <div className="absolute top-[600px] right-10 w-[450px] h-[450px] rounded-full bg-[#7C3AED]/08 blur-[160px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-[#00D2FF]">Home</Link>
            <span>/</span>
            <span className="text-[#00D2FF]">About Us</span>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                <HiSparkles />
                <span>About NexoraLab Technologies</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15]">
                Engineering the Future of <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">Enterprise Software & AI</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                NexoraLab Technologies is a full-cycle technology consulting and engineering agency based in Siwan, Bihar, India. We partner with ambitious startups, fast-scaling enterprises, and industry leaders to design, build, and scale resilient software systems and intelligent AI solutions.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={openQuoteModal}
                  className="rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Start Your Project With Us →
                </button>
                <button
                  onClick={openBrochureModal}
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  Download Corporate Deck
                </button>
              </div>
            </div>

            {/* Showcase Image with Glass Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl border border-white/10 bg-[#070e1e]/80 p-3 backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <img
                  src={aboutTechImg}
                  alt="NexoraLab Engineering Hub"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#060b18]/90 border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-black text-base shadow-md">
                      ✦
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">NexoraLab Engineering Hub</h4>
                      <p className="text-[11px] text-slate-400">Siwan, Bihar 841226, India • Engineering Hub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Stat Proof Metrics */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-[#070e1e]/80 p-6 backdrop-blur-xl transition hover:border-[#00D2FF]/40 hover:-translate-y-1"
              >
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#00D2FF] to-[#0066FF] bg-clip-text text-transparent">
                  {s.value}
                </div>
                <h3 className="text-sm font-bold text-white mt-1">{s.label}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Our Core Pillars */}
          <div className="mt-24">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                ✦ How We Create Value
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1">
                The 4 Pillars of NexoraLab Engineering
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                We combine architectural precision with domain expertise to ensure every solution is secure, scalable, and built to last.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {corePillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="group rounded-3xl border border-white/10 bg-[#070e1e]/90 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:bg-[#0c1835] hover:-translate-y-1.5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-[#00D2FF] text-2xl group-hover:bg-[#00D2FF] group-hover:text-black transition-all">
                      <Icon />
                    </div>
                    <h3 className="text-base font-bold text-white mt-5 group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Philosophy / Values Section */}
          <div className="mt-24 rounded-3xl border border-white/10 bg-[#060b18]/90 p-8 sm:p-12 backdrop-blur-xl">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                ✦ Our Mission & Vision
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1">
                Innovate. Build. Elevate.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Our vision is to bridge the gap between complex engineering and measurable business outcomes, turning technological bottlenecks into growth accelerators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipValues.map((v, i) => (
                <div key={i} className="space-y-3">
                  <span className="font-mono text-3xl font-black text-[#00D2FF]/40">
                    {v.num}
                  </span>
                  <h3 className="text-lg font-bold text-white">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Operations & Headquarters Section */}
          <div className="mt-24">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                ✦ Operations & Delivery
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1">
                Headquarters & Engineering Hub
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Headquartered in Siwan, Bihar, India, we architect and deliver high-velocity digital solutions for modern businesses and ambitious startups.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {operationsHighlights.map((hub, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-[#070e1e]/80 p-6 backdrop-blur-xl hover:border-cyan-500/40 transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-white">{hub.city}</span>
                    <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
                      {hub.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#00D2FF]">{hub.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 font-medium">{hub.address}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{hub.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Pre-Footer CTA */}
          <div className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-r from-[#091630] via-[#060e20] to-[#040914] p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
              ✦ Start Your Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white max-w-2xl leading-tight">
              Ready to build your next breakthrough with NexoraLab?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect with our principal technology architects for a free 30-minute scope & architecture assessment.
            </p>
            <button
              onClick={openQuoteModal}
              className="rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-10 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              Request a Project Quote →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
