import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";

const ContactCTA: React.FC = () => {
  const { openQuoteModal } = useModal();

  return (
    <section id="start-your-project" className="relative overflow-hidden bg-transparent py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c1e40] via-[#09152b] to-[#040914] p-8 sm:p-14 lg:p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#00D2FF]/15 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-[400px] h-[300px] rounded-full bg-[#7C3AED]/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D2FF] mb-4">
              <span className="flex h-2 w-2 rounded-full bg-[#00D2FF] animate-ping" />
              <span>Innovate • Build • Elevate</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-['Outfit']">
              Ready to architect your next{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                digital system?
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
              Tell us about your product roadmap, custom software requirements, or AI automation goals. Our solutions architects will evaluate your project and deliver an actionable technical roadmap.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={openQuoteModal}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,102,255,0.6)] hover:scale-105 active:scale-95"
              >
                <span>Request Project Estimate</span>
                <HiArrowRight className="text-lg" />
              </button>

              <Link
                to="/resume-analyzer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-8 py-4 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#00D2FF]/50 hover:bg-white/10"
              >
                <HiSparkles className="text-cyan-400" />
                <span>Try AI Tools</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;