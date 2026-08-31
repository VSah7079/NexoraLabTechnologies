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
      className="relative overflow-hidden bg-transparent py-16 md:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-medium text-cyan-600"
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
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Choose The Right
            <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Plan For Your Business
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed"
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
          <span className={`text-sm md:text-base font-medium transition-colors duration-300 ${
            !yearly ? "text-gray-900" : "text-gray-500"
          }`}>
            Monthly
          </span>

          <button
            onClick={() => setYearly(!yearly)}
            className="relative h-9 w-16 md:h-10 md:w-20 rounded-full border border-gray-300 transition-all duration-300 hover:border-cyan-400"
          >
            <motion.div
              animate={{ x: yearly ? "calc(100% - 4px)" : "4px" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-1 h-7 w-7 md:h-8 md:w-8 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/25"
            />
          </button>

          <span className={`text-sm md:text-base font-medium transition-colors duration-300 ${
            yearly ? "text-gray-900" : "text-gray-500"
          }`}>
            Yearly
            <span className="ml-1.5 text-xs text-emerald-600 font-semibold">Save 20%</span>
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
                group relative overflow-hidden rounded-2xl md:rounded-3xl border p-6 md:p-8 transition-all duration-500
                ${
                  plan.popular
                    ? "border-cyan-400"
                    : "border-gray-300 hover:border-cyan-400"
                }
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute right-4 top-4 md:right-6 md:top-6 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-cyan-500/25">
                  Most Popular
                </div>
              )}

              <div className="relative z-10">
                {/* Plan Title */}
                <h3 className="text-2xl md:text-3xl font-black text-gray-900">
                  {plan.title}
                </h3>

                <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-700 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6 md:mt-8">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
                    ₹{yearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="ml-2 text-sm md:text-base text-gray-600">
                    /{yearly ? "year" : "month"}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-6 md:my-8 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

                {/* Features */}
                <div className="space-y-3 md:space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 md:gap-4">
                      <div className="flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 text-white text-xs md:text-sm font-bold shadow-lg shadow-cyan-500/20">
                        ✓
                      </div>
                      <span className="text-sm md:text-base text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to="/contact"
                  className={`
                    mt-6 md:mt-8 flex w-full items-center justify-center rounded-xl md:rounded-2xl px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold transition-all duration-300
                    ${
                      plan.popular
                        ? "bg-linear-to-r from-cyan-500 via-blue-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
                        : "border border-gray-300 text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:-translate-y-1"
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
              className="rounded-2xl border border-gray-300 p-5 md:p-6 text-center transition-all duration-300 hover:border-cyan-400"
            >
              <div className="text-2xl md:text-3xl mb-1">{item.icon}</div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-cyan-600">
                {item.value}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{item.label}</p>
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
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Why Choose Us
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Transparent Pricing
              <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Maximum Business Value
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
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
                  className="flex items-center gap-3 rounded-xl border border-gray-300 p-3 transition-all duration-300 hover:border-cyan-400"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white text-sm font-bold">
                    ✓
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
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
                className="rounded-2xl border border-gray-300 p-6 text-center transition-all duration-300 hover:border-cyan-400"
              >
                <div className="text-4xl md:text-5xl">{item.icon}</div>
                <h3 className="mt-3 text-base font-bold text-gray-900">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 md:mt-12"
        >
          <div className="rounded-3xl border border-gray-300 p-6 md:p-8 lg:p-10 text-center transition-all duration-300 hover:border-cyan-400">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900">
              Invest In Technology
              <span className="block md:inline md:ml-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                That Grows Your Business
              </span>
            </h3>

            <p className="mt-4 max-w-3xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              Every solution we build is designed for performance, security and scalability.
              Whether you're a startup, SME or enterprise, our pricing is transparent and
              focused on delivering long-term business value.
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                "No Hidden Charges",
                "100% Transparent",
                "Enterprise Ready",
                "Secure Development",
                "Cloud Native",
                "Dedicated Team",
                "24/7 Support",
                "Future Proof",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Commitment Box */}
            <div className="mt-6 md:mt-8 rounded-2xl border border-gray-300 p-6 md:p-8 transition-all duration-300 hover:border-cyan-400">
              <h4 className="text-lg md:text-xl font-bold text-gray-900">Our Commitment</h4>
              <p className="mt-2 text-sm md:text-base text-gray-700 leading-relaxed">
                We don't just deliver software—we build reliable digital products backed by
                modern architecture, continuous support and a long-term technology partnership.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;