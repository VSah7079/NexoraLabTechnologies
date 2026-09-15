import React from "react";

const partners = [
  { name: "Amazon Web Services", tag: "Cloud Infrastructure" },
  { name: "Microsoft Azure", tag: "Enterprise Cloud" },
  { name: "Google Cloud", tag: "AI & BigQuery" },
  { name: "Meta Tech Provider", tag: "Business APIs" },
  { name: "Razorpay", tag: "Payment Systems" },
  { name: "Stripe", tag: "Global Payments" },
  { name: "PhonePe", tag: "FinTech Platform" },
];

const TechnologyPartners: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#050a18]/60 py-12 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="lg:w-48 shrink-0">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400 leading-tight">
              Officially <br />
              <span className="text-white">Partnered With</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-1">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#070e1e]/90 px-4 py-2.5 transition hover:border-[#00D2FF]/40"
              >
                <span className="text-xs font-bold text-white">{p.name}</span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">• {p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyPartners;
