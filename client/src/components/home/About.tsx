import React from "react";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiShieldCheck,
  HiSparkles,
  HiCheckBadge,
  HiCpuChip,
  HiCloudArrowUp,
  HiRocketLaunch,
} from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";

const reasonCards = [
  {
    icon: HiCpuChip,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    badge: "01",
    title: "AI-First Engineering",
    desc: "Proprietary AI pipelines, neural resume parsing, semantic vector embeddings, and LLM automation engineered for production workloads.",
  },
  {
    icon: HiCloudArrowUp,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    badge: "02",
    title: "Enterprise Cloud & Microservices",
    desc: "Battle-tested cloud architectures on AWS, Azure, and Kubernetes engineered to sustain high concurrency with sub-15ms response latency.",
  },
  {
    icon: HiRocketLaunch,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    badge: "03",
    title: "Full Product Lifecycle",
    desc: "From initial discovery and interactive Figma prototypes to full-stack code delivery, continuous testing, and 24/7 SLA maintenance.",
  },
  {
    icon: HiShieldCheck,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    badge: "04",
    title: "100% IP & Code Ownership",
    desc: "Strict non-disclosure agreements (NDA), transparent milestone deliverables, and complete intellectual property ownership transferred to you.",
  },
];

const About: React.FC = () => {
  const { openQuoteModal } = useModal();

  return (
    <section id="partner" className="relative overflow-hidden bg-transparent py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Side */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#00D2FF] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D2FF]" />
              ABOUT NEXORALAB TECHNOLOGIES
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Engineering scalable digital products and <em className="not-italic text-[#00D2FF]">AI intelligence</em> built for enterprise impact
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
              NexoraLab Technologies is a premier software engineering and artificial intelligence agency dedicated to building high-velocity web platforms, mobile applications, distributed enterprise backends, and smart automation tools.
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Under our core philosophy — <strong>Innovate • Build • Elevate</strong> — we partner closely with engineering teams and business leaders to turn complex requirements into elegant, high-impact digital systems.
            </p>

            <div className="mt-8">
              <button
                onClick={openQuoteModal}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.35)] transition hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] hover:scale-105 active:scale-95"
              >
                <span>Talk to Our Solutions Architect</span>
                <HiArrowRight className="text-base" />
              </button>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1c38] via-[#091326] to-[#040814] p-8 shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-[#00D2FF]/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                    Core Engineering Standard
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">
                    NexoraLab Technologies
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <HiSparkles className="text-2xl" />
                </div>
              </div>

              <div className="relative z-10 my-6 space-y-4">
                <div className="flex items-start gap-3">
                  <HiShieldCheck className="text-cyan-400 text-xl shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">ISO Quality & Data Security</div>
                    <div className="text-xs text-slate-400">Strict code reviews, automated CI/CD security audits & GDPR-ready systems</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiCpuChip className="text-cyan-400 text-xl shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Proprietary AI Suite</div>
                    <div className="text-xs text-slate-400">State-of-the-art neural ATS analyzers, mock interview bots & talent intelligence</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiCheckBadge className="text-cyan-400 text-xl shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Dedicated Engineering Pods</div>
                    <div className="text-xs text-slate-400">Pre-vetted senior full-stack, cloud & AI developers dedicated to your roadmap</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-medium">
                <span>📍 Global Engineering Hub</span>
                <span className="text-cyan-300">24/7 SLA Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Reason Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {reasonCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative flex flex-col justify-between h-full rounded-3xl border border-white/10 bg-[#070e1e]/80 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.18)] hover:-translate-y-1.5"
              >
                {/* Ambient Top Glow on Hover */}
                <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF]/0 to-transparent group-hover:via-[#00D2FF]/80 transition-all duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${item.iconBg} ${item.iconColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="text-xl" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-['Outfit']">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;