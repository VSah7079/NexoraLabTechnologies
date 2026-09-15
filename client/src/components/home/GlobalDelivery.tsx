import React from "react";
import { HiMapPin, HiPhone, HiEnvelope, HiArrowTopRightOnSquare, HiArrowRight, HiClock, HiGlobeAlt } from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";

const offices = [
  {
    city: "NexoraLab Headquarters",
    badge: "Central HQ",
    address: "Siwan, Bihar 841226, India",
    phone: "+91 70798 84369",
    phoneHref: "tel:+917079884369",
    email: "info@nexoralabtechnologies.in",
    mapUrl: "https://maps.google.com/?q=Siwan,Bihar,India",
    timing: "Mon – Sat: 9:00 AM – 7:00 PM IST",
  },
  {
    city: "Global Client Engagements",
    badge: "Time-Zone Overlap",
    address: "Serving US, UK, EU, UAE & APAC Clients",
    phone: "+91 70798 84369",
    phoneHref: "tel:+917079884369",
    email: "info@nexoralabtechnologies.in",
    mapUrl: "https://maps.google.com/?q=Siwan,Bihar,India",
    timing: "4–6 Hours Daily Overlap (EST/GMT/GST)",
  },
  {
    city: "Rapid Engineering Pods",
    badge: "Agile Sprints",
    address: "Full-Stack Web, Mobile, Cloud & AI Squads",
    phone: "+91 70798 84369",
    phoneHref: "tel:+917079884369",
    email: "info@nexoralabtechnologies.in",
    mapUrl: "https://maps.google.com/?q=Siwan,Bihar,India",
    timing: "24/7 Dedicated Uptime & Monitoring",
  },
];

const GlobalDelivery: React.FC = () => {
  const { openQuoteModal } = useModal();

  return (
    <section id="global-delivery" className="relative overflow-hidden bg-transparent py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-2">
            Headquarters & Client Reach
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Engineering excellence from <em className="not-italic text-[#00D2FF]">Siwan, Bihar, India</em>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            From our headquarters in Siwan, Bihar, India, we partner with businesses and startups across multiple continents to design, build, and scale mission-critical web applications, mobile platforms, and AI intelligence systems.
          </p>
        </div>

        {/* Worldwide Statement Badge */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#070e1e]/80 p-5 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm font-bold text-white">
            Wherever you are located, our engineering pods work in your preferred business hours.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1">🇮🇳 Siwan, Bihar HQ</span>
            <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-purple-300">🌍 Worldwide Delivery</span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-emerald-300">⚡ 24-Hr Response</span>
          </div>
        </div>

        {/* 3 Office & Delivery Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {offices.map((office, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#070e1e]/90 p-7 backdrop-blur-xl transition hover:border-[#00D2FF]/40 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{office.city}</h3>
                  <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300">
                    {office.badge}
                  </span>
                </div>

                <address className="not-italic text-xs sm:text-sm text-slate-400 mb-4 flex items-start gap-2">
                  <HiMapPin className="text-[#00D2FF] text-base shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </address>

                <div className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <HiPhone className="text-[#00D2FF] shrink-0" />
                    <a href={office.phoneHref} className="hover:text-cyan-300 transition">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiEnvelope className="text-[#00D2FF] shrink-0" />
                    <a href={`mailto:${office.email}`} className="hover:text-cyan-300 transition">
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <HiClock className="text-[#00D2FF] shrink-0" />
                    <span>{office.timing}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D2FF] hover:text-white transition"
                >
                  <span>View Location Details</span>
                  <HiArrowTopRightOnSquare />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={openQuoteModal}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(0,210,255,0.35)] transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Start a Project With Us</span>
            <HiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GlobalDelivery;
