import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiHeart,
  HiCurrencyDollar,
  HiShoppingBag,
  HiAcademicCap,
  HiUserGroup,
  HiTruck,
  HiBuildingOffice2,
  HiFilm,
  HiRocketLaunch,
  HiBuildingStorefront,
  HiSquare3Stack3D,
  HiArrowRight,
  HiCpuChip,
} from "react-icons/hi2";

const industries = [
  { name: "FinTech & Banking", icon: HiCurrencyDollar },
  { name: "HRTech & Talent Intelligence", icon: HiUserGroup },
  { name: "Healthcare & MedTech", icon: HiHeart },
  { name: "E-Commerce & Marketplaces", icon: HiShoppingBag },
  { name: "EdTech & Learning Platforms", icon: HiAcademicCap },
  { name: "Logistics & Supply Chain", icon: HiTruck },
  { name: "Real Estate & PropTech", icon: HiBuildingOffice2 },
  { name: "Media & OTT Streaming", icon: HiFilm },
];

const audiences = [
  {
    icon: HiRocketLaunch,
    title: "Startups & Founders",
    desc: "Turn product ideas into production-ready MVPs with rapid 4-week sprint execution.",
  },
  {
    icon: HiBuildingStorefront,
    title: "Mid-Market Scaleups",
    desc: "Automate complex workflows, modernize architectures, and eliminate technical debt.",
  },
  {
    icon: HiBuildingOffice2,
    title: "Global Enterprises",
    desc: "Scale distributed microservices, integrate secure APIs, and protect corporate data.",
  },
  {
    icon: HiUserGroup,
    title: "Recruitment & HR Agencies",
    desc: "Deploy neural ATS screening, resume parsing, and automated candidate evaluations.",
  },
  {
    icon: HiSquare3Stack3D,
    title: "Product Companies",
    desc: "Augment engineering capacity with dedicated full-stack and AI developer pods.",
  },
];

const techStack = [
  {
    category: "Web & SaaS",
    items: ["React 19", "Next.js 16", "Node.js", "TypeScript", "Go", "PostgreSQL"],
  },
  {
    category: "Mobile",
    items: ["Flutter", "React Native", "iOS (Swift)", "Android (Kotlin)", "Firebase"],
  },
  {
    category: "AI & Data",
    items: ["Python", "FastAPI", "OpenAI / Claude API", "PyTorch", "Pinecone", "pgvector"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS EKS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
  },
];

const Industries: React.FC = () => {
  return (
    <section id="industries" className="relative overflow-hidden bg-transparent py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-2">
            Industry Domains
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Tailored digital solutions <em className="not-italic text-[#00D2FF]">across industries</em>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            We engineer software products and proprietary AI pipelines tailored around the specific compliance, security, and scalability needs of each industry.
          </p>
        </div>

        {/* Industry Pill Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#070e1e]/80 p-4 backdrop-blur-md transition hover:border-[#00D2FF]/50 hover:bg-[#0c1835]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-[#00D2FF] border border-cyan-500/20">
                  <Icon className="text-xl" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {ind.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Who We Work With */}
        <div className="mt-20">
          <h3 className="text-2xl font-black text-white mb-8">Who We Work With</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {audiences.map((aud, idx) => {
              const Icon = aud.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="rounded-3xl border border-white/10 bg-[#070e1e]/90 p-6 backdrop-blur-xl transition hover:border-[#00D2FF]/40 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00D2FF]/20 to-[#0066FF]/20 text-[#00D2FF] border border-cyan-500/30 mb-5">
                    <Icon className="text-2xl" />
                  </div>
                  <h4 className="text-base font-bold text-white">{aud.title}</h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {aud.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Built With Proven Technologies Card */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-[#09152e] via-[#060d1d] to-[#030610] p-8 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Built with <span className="bg-gradient-to-r from-[#00D2FF] to-[#0066FF] bg-clip-text text-transparent">proven technologies</span>
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                We use modern frameworks, high-throughput cloud architectures, and battle-tested databases to build scalable digital products.
              </p>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#00D2FF] hover:text-white transition"
              >
                <span>View Full Technology Stack</span>
                <HiArrowRight />
              </Link>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {techStack.map((stack, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 w-32 shrink-0">
                    {stack.category}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    {stack.items.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;