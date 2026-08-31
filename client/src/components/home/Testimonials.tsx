import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { HiArrowRight, HiStar } from "react-icons/hi2";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    company: "TechNova Pvt. Ltd.",
    role: "CEO",
    image: "/testimonials/client-1.webp",
    rating: 5,
    review:
      "NexoraLab Technologies delivered an outstanding ERP solution that completely transformed our business operations.",
  },
  {
    id: 2,
    name: "Priya Verma",
    company: "EduSmart",
    role: "Director",
    image: "/testimonials/client-2.webp",
    rating: 5,
    review:
      "Professional team, premium UI design and excellent communication throughout the project lifecycle.",
  },
  {
    id: 3,
    name: "Amit Singh",
    company: "HealthCare Plus",
    role: "Founder",
    image: "/testimonials/client-3.webp",
    rating: 5,
    review:
      "The hospital management system exceeded our expectations. Highly recommended for enterprise software.",
  },
  {
    id: 4,
    name: "Sneha Patel",
    company: "Retail Hub",
    role: "Managing Director",
    image: "/testimonials/client-4.webp",
    rating: 5,
    review:
      "Amazing support, scalable architecture and world-class development quality from the entire team.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
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
            Client Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            Trusted By
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Businesses Worldwide
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed"
          >
            Our clients trust us for delivering secure, scalable and innovative
            software solutions that help their businesses grow faster.
          </motion.p>
        </div>

        {/* Testimonial Slider */}
        <div className="mt-10 md:mt-14 lg:mt-20">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={900}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-full overflow-hidden rounded-2xl md:rounded-3xl border border-gray-300 p-6 md:p-8 transition-all duration-500 hover:border-cyan-400"
                >
                  {/* Quote Icon */}
                  <div className="absolute right-4 top-4 md:right-6 md:top-6 text-5xl md:text-6xl lg:text-7xl font-black text-cyan-400/10">
                    "
                  </div>

                  {/* Rating Stars */}
                  <div className="relative z-10 flex gap-0.5 mb-4">
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <HiStar
                        key={index}
                        className="text-yellow-400 text-lg md:text-xl"
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="relative z-10 text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed min-h-[100px] md:min-h-[120px]">
                    "{item.review}"
                  </p>

                  {/* Divider */}
                  <div className="relative z-10 my-5 md:my-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  {/* Client Info */}
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 md:h-16 md:w-16 rounded-full border-2 border-cyan-400/30 object-cover transition-all duration-300 group-hover:border-cyan-400"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${item.name.replace(
                            " ",
                            "+"
                          )}&background=0ea5e9&color=fff&size=64`;
                        }}
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 md:h-5 md:w-5 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
                        <span className="text-[8px] md:text-[10px] text-emerald-400">✓</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-sm text-cyan-600 font-medium">
                        {item.role}
                      </p>
                      <p className="text-xs text-gray-600">{item.company}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
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
            { value: "18+", label: "Countries Served", icon: "🌍" },
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

        {/* Why Clients Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20 grid gap-10 md:gap-14 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Why Clients Choose Us
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Building Long-Term
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Trusted Partnerships
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
              Our focus is on delivering reliable, scalable and secure software
              solutions. We work closely with our clients from planning to
              post-launch support, ensuring measurable business outcomes.
            </p>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Transparent Communication",
                "On-Time Delivery",
                "Enterprise Security",
                "Modern Technology Stack",
                "Dedicated Support",
                "Long-Term Partnership",
              ].map((item, index) => (
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
                  <span className="text-sm text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "⭐", label: "5 Star Reviews" },
              { icon: "🤝", label: "Trusted Team" },
              { icon: "🚀", label: "Fast Delivery" },
              { icon: "💙", label: "Lifetime Support" },
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

        {/* Review Highlights */}
        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {[
            { icon: "⭐", label: "5.0 Average Rating", desc: "Consistently rated highly by our clients." },
            { icon: "🚀", label: "Fast Delivery", desc: "Projects completed on schedule with quality." },
            { icon: "🔒", label: "Secure Solutions", desc: "Enterprise-grade security standards followed." },
            { icon: "🤝", label: "Long-Term Support", desc: "Continuous maintenance and technical support." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-gray-300 p-5 md:p-6 text-center transition-all duration-300 hover:border-cyan-400"
            >
              <div className="text-3xl md:text-4xl mb-2">{item.icon}</div>
              <h3 className="text-sm md:text-base font-bold text-gray-900">{item.label}</h3>
              <p className="mt-1 text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-10 md:mt-12 overflow-hidden rounded-3xl border border-gray-300 p-8 md:p-12 transition-all duration-300 hover:border-cyan-400"
        >
          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-600">
              Client Success Stories
            </span>

            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
              Your Success
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Is Our Achievement
              </span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              Every successful partnership motivates us to deliver even better
              digital products, innovative solutions and exceptional customer experiences.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
              >
                Start Your Project
                <HiArrowRight className="text-lg" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-600"
              >
                View Portfolio
              </Link>
            </div>
          </div>
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
              Trusted By Businesses
              <span className="block md:inline md:ml-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                Around The World
              </span>
            </h3>

            <p className="mt-3 md:mt-4 max-w-3xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed">
              Every testimonial reflects our commitment to delivering premium
              digital experiences, enterprise-grade software and long-term
              business partnerships. Your success is the benchmark of our work.
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                "250+ Projects",
                "120+ Happy Clients",
                "99% Satisfaction",
                "Enterprise Ready",
                "AI Powered",
                "Cloud Native",
                "24/7 Support",
                "Future Ready",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-700 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;