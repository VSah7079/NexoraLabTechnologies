import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

const companies = [
  "Microsoft",
  "Google",
  "Amazon",
  "Meta",
  "Oracle",
  "IBM",
  "Infosys",
  "TCS",
  "Accenture",
  "Adobe",
  "Salesforce",
  "SAP",
];

const TrustedCompanies = () => {
  return (
    <section className="relative overflow-hidden border-y border-gray-300 bg-transparent py-16 md:py-20 lg:py-24 transition-colors duration-300">
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
            Trusted By Businesses Worldwide
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Empowering
            <span className="ml-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Modern Companies
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed"
          >
            Startups, Enterprises and Organizations trust NexoraLab Technologies
            to build scalable software, AI powered platforms and enterprise
            digital products.
          </motion.p>
        </div>

        {/* Marquee Row 1 - Right to Left */}
        <div className="relative mt-10 md:mt-14 lg:mt-20 w-full overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-4 md:gap-6 lg:gap-8"
          >
            {[...companies, ...companies].map((company, index) => (
              <motion.div
                key={`${company}-${index}`}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
                className="flex min-w-[160px] md:min-w-[200px] lg:min-w-[220px] items-center justify-center rounded-2xl border border-gray-300 px-6 md:px-8 lg:px-10 py-5 md:py-6 lg:py-7 transition-all duration-300 hover:border-cyan-400"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-base md:text-lg lg:text-xl font-bold tracking-wide text-transparent">
                  {company}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Marquee Row 2 - Left to Right */}
        <div className="relative mt-4 md:mt-6 w-full overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-4 md:gap-6 lg:gap-8"
          >
            {[...companies, ...companies].map((company, index) => (
              <motion.div
                key={`bottom-${company}-${index}`}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
                className="flex min-w-[140px] md:min-w-[180px] lg:min-w-[200px] items-center justify-center rounded-xl border border-gray-300 px-5 md:px-7 lg:px-8 py-4 md:py-5 transition-all duration-300 hover:border-violet-500"
              >
                <span className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                  {company}
                </span>
              </motion.div>
            ))}
          </motion.div>
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
            { value: "15+", label: "Industries Served", icon: "🏢" },
            { value: "99%", label: "Client Satisfaction", icon: "💯" },
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

        {/* Bottom Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 md:mt-12"
        >
          <div className="rounded-2xl md:rounded-3xl border border-gray-300 p-6 md:p-8 lg:p-10 text-center transition-all duration-300 hover:border-cyan-400">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900">
              Join <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">250+</span> Companies
              <span className="block md:inline md:ml-3 text-gray-900">
                Building Their Digital Future
              </span>
            </h3>

            <p className="mt-3 md:mt-4 max-w-3xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              From startups to global enterprises, organizations trust us to
              deliver secure, scalable and innovative digital solutions that
              drive business growth and operational excellence.
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                "Enterprise Grade",
                "Scalable Solutions",
                "AI Powered",
                "Cloud Native",
                "Secure Architecture",
                "24/7 Support",
                "Innovation First",
                "Global Delivery",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA Link */}
            <div className="mt-6 md:mt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-6 md:px-8 py-3 md:py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
              >
                Become Our Next Success Story
                <HiArrowRight className="text-lg" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedCompanies;