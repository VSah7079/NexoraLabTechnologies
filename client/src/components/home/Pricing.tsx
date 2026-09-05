import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const plans = [
  {
    id: 1,
    title: "Starter",
    monthly: 499,
    yearly: 4999,
    popular: false,
    description:
      "Perfect for startups and small businesses beginning their digital journey.",
    features: [
      "Business Website",
      "Responsive Design",
      "Basic SEO",
      "Contact Form",
      "Free SSL",
      "1 Month Support",
    ],
  },
  {
    id: 2,
    title: "Professional",
    monthly: 1499,
    yearly: 14999,
    popular: true,
    description:
      "Ideal for growing businesses needing advanced features and scalability.",
    features: [
      "Custom Web Application",
      "Admin Dashboard",
      "Authentication",
      "API Integration",
      "Cloud Deployment",
      "6 Months Support",
    ],
  },
  {
    id: 3,
    title: "Enterprise",
    monthly: 4999,
    yearly: 49999,
    popular: false,
    description:
      "Enterprise-grade digital solutions built for large organizations.",
    features: [
      "ERP / CRM Development",
      "AI Integration",
      "Dedicated Team",
      "High Security",
      "DevOps Setup",
      "Lifetime Consultation",
    ],
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-28 transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-[#00D2FF]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Flexible Pricing
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-['Outfit']"
          >
            Choose The Right{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Plan For Your Business
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Transparent pricing with no hidden charges. Scale your business
            confidently with solutions tailored to your needs.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 md:mt-14 flex items-center justify-center gap-4 md:gap-5"
        >
          <span className={`text-sm md:text-base font-semibold transition-colors duration-300 ${!yearly ? "text-white" : "text-slate-400"
            }`}>
            Monthly
          </span>

          <button
            onClick={() => setYearly(!yearly)}
            className="relative h-9 w-16 md:h-10 md:w-20 rounded-full border border-slate-700 bg-[#060b18] transition-all duration-300 hover:border-cyan-400"
          >
            <motion.div
              animate={{ x: yearly ? "calc(100% - 32px)" : "4px" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-1 h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/25"
            />
          </button>

          <span className={`text-sm md:text-base font-semibold transition-colors duration-300 ${yearly ? "text-white" : "text-slate-400"
            }`}>
            Yearly
            <span className="ml-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">Save 20%</span>
          </span>
        </motion.div>

        {/* Pricing Grid */}
        <div className="mt-10 md:mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`
                group relative overflow-hidden rounded-2xl md:rounded-3xl border p-6 md:p-8 backdrop-blur-xl transition-all duration-500
                ${plan.popular
                  ? "border-cyan-400/80 bg-[#0b132b]/95 shadow-[0_0_40px_rgba(0,210,255,0.2)]"
                  : "border-slate-800 bg-[#0b132b]/85 hover:border-cyan-400/60"
                }
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute right-4 top-4 md:right-6 md:top-6 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-cyan-500/25">
                  Most Popular
                </div>
              )}

              <div className="relative z-10">
                {/* Plan Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white font-['Outfit']">
                  {plan.title}
                </h3>

                <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6 md:mt-8">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-['Outfit']">
                    ₹{yearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="ml-2 text-sm md:text-base text-slate-400 font-medium">
                    /{yearly ? "year" : "month"}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-6 md:my-8 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

                {/* Features */}
                <div className="space-y-3 md:space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 md:gap-4">
                      <div className="flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white text-xs md:text-sm font-bold shadow-lg shadow-cyan-500/20">
                        ✓
                      </div>
                      <span className="text-sm md:text-base text-slate-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to="/contact"
                  className={`
                    mt-6 md:mt-8 flex w-full items-center justify-center rounded-xl md:rounded-2xl px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-bold transition-all duration-300
                    ${plan.popular
                      ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95"
                      : "border border-slate-700 bg-[#060b18]/80 text-slate-200 hover:border-cyan-400 hover:text-white hover:scale-105"
                    }
                  `}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {[
            { value: "250+", label: "Projects Delivered", icon: "🚀" },
            { value: "120+", label: "Happy Clients", icon: "⭐" },
            { value: "99%", label: "Client Satisfaction", icon: "💯" },
            { value: "24/7", label: "Technical Support", icon: "🛡️" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-5 md:p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(0,210,255,0.15)]"
            >
              <div className="text-2xl md:text-3xl mb-1">{item.icon}</div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] bg-clip-text text-transparent font-['Outfit']">
                {item.value}
              </h3>
              <p className="mt-1 text-sm text-slate-300 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20 grid gap-10 md:gap-14 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-[#00D2FF]">
              Why Choose Us
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight font-['Outfit']">
              Transparent Pricing{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Maximum Business Value
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              We focus on long-term business growth rather than one-time delivery.
              Every package includes modern architecture, scalable infrastructure
              and premium development standards.
            </p>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "No Hidden Charges",
                "Free Consultation",
                "Premium UI/UX",
                "SEO Friendly",
                "Secure Architecture",
                "Dedicated Support",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#060b18]/80 p-3 transition-all duration-300 hover:border-cyan-400/50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white text-sm font-bold">
                    ✓
                  </div>
                  <span className="text-sm text-slate-200 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "💼", label: "Business Focused" },
              { icon: "⚡", label: "Fast Delivery" },
              { icon: "🔒", label: "Secure Platform" },
              { icon: "📈", label: "Future Ready" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50"
              >
                <div className="text-4xl md:text-5xl">{item.icon}</div>
                <h3 className="mt-3 text-base font-bold text-white">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;