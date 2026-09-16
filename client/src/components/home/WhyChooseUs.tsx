import React from "react";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiCpuChip,
  HiRocketLaunch,
  HiShieldCheck,
  HiCloudArrowUp,
  HiUserGroup,
  HiClock,
  HiSparkles,
} from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";

const reasons = [
  {
    icon: HiCpuChip,
    number: "01",
    title: "Proprietary AI Intelligence",
    desc: "In-house expertise in sub-15ms semantic OCR resume parsing, automated ATS scoring, dynamic skill gap radars, and LLM automation fine-tuned for enterprise production.",
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: HiRocketLaunch,
    number: "02",
    title: "High-Velocity Sprint Delivery",
    desc: "Agile 2-week sprint cycles with continuous integration, automated unit and regression testing, and guaranteed on-time milestone delivery with zero scope drift.",
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: HiShieldCheck,
    number: "03",
    title: "100% IP & Source Code Transfer",
    desc: "You retain full intellectual property rights, repository ownership, custom licenses, and strict non-disclosure agreement (NDA) legal protection upon project handover.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: HiCloudArrowUp,
    number: "04",
    title: "Scalable Cloud Architecture",
    desc: "Distributed microservices engineered with AWS EKS, Docker, Kubernetes, and Redis caching for sub-20ms response latencies and a strict 99.99% uptime guarantee.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: HiUserGroup,
    number: "05",
    title: "Flexible Engagement Frameworks",
    desc: "Choose between fixed-scope milestone delivery, dedicated senior full-stack developer pods, or on-demand hourly engineering support with zero overhead friction.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: HiClock,
    number: "06",
    title: "Global 24/7 SLA & SRE Support",
    desc: "Round-the-clock infrastructure telemetry monitoring with Prometheus, proactive security patches, automated backups, and guaranteed emergency response under 15 minutes.",
    color: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
  },
];

const WhyChooseUs: React.FC = () => {
  const { openQuoteModal } = useModal();

  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-transparent py-20 sm:py-28 border-t border-white/10">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#0066FF]/06 blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-3">
            <HiSparkles />
            <span>Why Partner With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-['Outfit']">
            Why High-Growth Companies{" "}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Choose NexoraLab
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-3xl">
            We combine high-end product design, scalable full-stack engineering, and AI automation to deliver robust software systems that drive real enterprise revenue.
          </p>
        </div>

        {/* 6-Grid Feature Matrix */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="group relative rounded-3xl border border-white/10 bg-[#070e1e]/90 p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#00D2FF]/50 hover:bg-[#0c1835] hover:shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(0,210,255,0.15)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} border border-white/10`}>
                      <Icon className={`text-2xl ${item.iconColor}`} />
                    </div>
                    <span className="font-mono text-2xl font-black text-white/20 group-hover:text-cyan-400/40 transition">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={openQuoteModal}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.4)] transition hover:scale-105 active:scale-95"
          >
            <span>Consult Our Solutions Architects</span>
            <HiArrowRight className="text-base" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

