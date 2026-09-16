import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { HiArrowRight, HiStar } from "react-icons/hi2";
import { contentService } from "@/services/content.service";

import "swiper/css";
import "swiper/css/pagination";

const defaultTestimonials = [
  {
    id: "t1",
    name: "Rahul Sharma",
    company: "TechNova Pvt. Ltd.",
    role: "CEO & Founder",
    image: "/testimonials/client-1.webp",
    rating: 5,
    review:
      "NexoraLab Technologies delivered an outstanding enterprise ERP solution that completely transformed our operations and accelerated workflow by 400%.",
  },
  {
    id: "t2",
    name: "Priya Verma",
    company: "EduSmart Platforms",
    role: "Product Director",
    image: "/testimonials/client-2.webp",
    rating: 5,
    review:
      "World-class engineering team! The UI/UX redesign gave our EdTech app a ultra-premium feel with flawless sub-second loading performance.",
  },
  {
    id: "t3",
    name: "Amit Singh",
    company: "HealthCare Plus",
    role: "Managing Director",
    image: "/testimonials/client-3.webp",
    rating: 5,
    review:
      "The HIPAA-compliant hospital management & analytics suite exceeded all our expectations. Highly recommended for critical enterprise software.",
  },
  {
    id: "t4",
    name: "Sneha Patel",
    company: "Retail Hub Global",
    role: "CTO",
    image: "/testimonials/client-4.webp",
    rating: 5,
    review:
      "Remarkable support, scalable microservice architecture, and unmatched software craft. They became our dedicated long-term technology backbone.",
  },
];

const Testimonials = () => {
  const [items, setItems] = useState(defaultTestimonials);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const cmsItems = await contentService.getContent("testimonials");
        if (cmsItems && cmsItems.length > 0) {
          const mapped = cmsItems.map((item: any, idx: number) => ({
            id: item._id || item.id || `cms_t_${idx}`,
            name: item.clientName || item.name || "Verified Client",
            company: item.company || "Enterprise Client",
            role: item.role || "Executive",
            image: item.avatarUrl || item.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.clientName || "Client")}&background=00D2FF&color=fff&size=64&bold=true`,
            rating: item.rating || 5,
            review: item.description || item.content || item.review || "",
          }));
          setItems(mapped);
        }
      } catch {
        // Fallback to defaultTestimonials
      }
    };
    fetchReviews();
  }, []);
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-transparent py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-[#070e1b]/90 px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-bold tracking-wide bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent shadow-[0_0_25px_rgba(0,210,255,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D2FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D2FF]" />
            </span>
            CLIENT TESTIMONIALS & REPUTATION
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-['Outfit']"
          >
            Trusted By High-Growth{" "}
            <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
              Global Brands
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Discover why industry leaders, tech scaleups, and visionary enterprises partner with NexoraLab Technologies for their mission-critical platforms.
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
              delay: 4500,
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
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-slate-800 bg-[#0b132b]/85 p-6 md:p-8 backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-[#00D2FF]/50 hover:shadow-[0_10px_35px_rgba(0,210,255,0.15)] flex flex-col justify-between"
                >
                  {/* Background Glow */}
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                  {/* Quote Mark */}
                  <div className="absolute right-6 top-4 text-6xl md:text-7xl font-black text-cyan-400/10 select-none">
                    “
                  </div>

                  <div>
                    {/* Rating Stars */}
                    <div className="relative z-10 flex gap-1 mb-4">
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <HiStar
                          key={index}
                          className="text-amber-400 text-lg md:text-xl drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                          fill="currentColor"
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="relative z-10 text-sm md:text-base text-slate-200 leading-relaxed font-normal min-h-[90px] md:min-h-[110px]">
                      "{item.review}"
                    </p>
                  </div>

                  <div>
                    {/* Divider */}
                    <div className="relative z-10 my-5 md:my-6 h-px bg-gradient-to-r from-transparent via-slate-700/80 to-transparent" />

                    {/* Client Info */}
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-full border-2 border-cyan-400/40 object-cover shadow-md shadow-cyan-500/20 transition-all duration-300 group-hover:border-[#00D2FF]"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${item.name.replace(
                              " ",
                              "+"
                            )}&background=00D2FF&color=fff&size=64&bold=true`;
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center">
                          <span className="text-[10px] text-emerald-400 font-black">✓</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs md:text-sm text-cyan-400 font-semibold">
                          {item.role}
                        </p>
                        <p className="text-xs text-slate-400">{item.company}</p>
                      </div>
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
              className="rounded-2xl border border-slate-800 bg-[#0b132b]/85 backdrop-blur-xl p-5 md:p-6 text-center transition-all duration-300 hover:border-[#00D2FF]/40 hover:shadow-[0_8px_25px_rgba(0,210,255,0.12)]"
            >
              <div className="text-2xl md:text-3xl mb-1">{item.icon}</div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#00D2FF] to-[#0066FF] bg-clip-text text-transparent">
                {item.value}
              </h3>
              <p className="mt-1 text-xs md:text-sm text-slate-400 font-medium">{item.label}</p>
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
            <span className="inline-block rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400 tracking-wide">
              WHY CLIENTS CHOOSE US
            </span>
            <h2 className="mt-4 md:mt-5 text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight font-['Outfit']">
              Building Long-Term{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Trusted Partnerships
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              Our engineering philosophy centers on rock-solid security, sub-second latency, and scalable architectures that scale effortlessly as your business accelerates.
            </p>

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Transparent Communication",
                "On-Time Milestone Delivery",
                "Enterprise Security & HIPAA",
                "Modern Cloud Tech Stack",
                "24/7 Dedicated Support",
                "Direct Architect Access",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#070e1e]/90 p-3 transition-all duration-300 hover:border-[#00D2FF]/40"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] text-white text-xs font-bold shadow-sm shadow-cyan-500/30">
                    ✓
                  </div>
                  <span className="text-xs md:text-sm text-slate-200 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "⭐", label: "5.0 Rating Across 120+ Reviews" },
              { icon: "🤝", label: "Dedicated Agile Scrum Teams" },
              { icon: "🚀", label: "Rapid 2-4 Week MVP Delivery" },
              { icon: "🛡️", label: "Post-Launch Warranty & Support" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-800 bg-[#0b132b]/90 backdrop-blur-xl p-6 text-center transition-all duration-300 hover:border-[#00D2FF]/50 shadow-lg"
              >
                <div className="text-4xl md:text-5xl">{item.icon}</div>
                <h3 className="mt-3 text-sm md:text-base font-bold text-white leading-snug">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 md:mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-[#070e1e]/95 p-8 md:p-12 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-[#00D2FF]/40 text-center"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block rounded-full border border-cyan-500/30 bg-[#070e1b] px-4 py-1.5 text-xs font-bold text-cyan-400">
              CLIENT SUCCESS STORIES
            </span>

            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight font-['Outfit']">
              Your Vision,{" "}
              <span className="bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] bg-clip-text text-transparent">
                Engineered to Scale
              </span>
            </h2>

            <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed font-normal">
              Join dozens of forward-thinking enterprises that chose NexoraLab Technologies to build game-changing digital software.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Start Your Project</span>
                <HiArrowRight className="text-lg" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#0a1128] px-8 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-[#00D2FF] hover:text-white"
              >
                <span>Explore Portfolio</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;