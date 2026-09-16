import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiStar,
  HiShieldCheck,
  HiBuildingOffice2,
  HiMagnifyingGlass,
  HiSparkles,
  HiArrowRight,
  HiChatBubbleBottomCenterText,
  HiCheckBadge,
  HiRocketLaunch,
  HiGlobeAlt,
  HiClock,
} from "react-icons/hi2";
import SEO from "@/components/common/SEO";
import { contentService } from "@/services/content.service";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  category?: string;
  rating: number;
  review: string;
  avatarUrl?: string;
  order?: number;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "t1",
    name: "Rahul Sharma",
    company: "TechNova Pvt. Ltd.",
    role: "Chief Executive Officer & Founder",
    category: "Enterprise SaaS",
    rating: 5,
    avatarUrl: "/testimonials/client-1.webp",
    review:
      "NexoraLab Technologies delivered an outstanding enterprise ERP and analytics suite that completely transformed our multi-branch operations, accelerating processing speed by 400% with zero downtime.",
  },
  {
    id: "t2",
    name: "Priya Verma",
    company: "EduSmart Platforms",
    role: "Product Director",
    category: "EdTech & Mobile",
    rating: 5,
    avatarUrl: "/testimonials/client-2.webp",
    review:
      "World-class engineering craftsmanship! The React 19 UI/UX redesign and microservices revamp gave our learning platform an ultra-premium feel with flawless sub-50ms page transitions.",
  },
  {
    id: "t3",
    name: "Amit Singh",
    company: "HealthCare Plus",
    role: "Managing Director",
    category: "HealthTech & Telemedicine",
    rating: 5,
    avatarUrl: "/testimonials/client-3.webp",
    review:
      "The HIPAA-compliant hospital management & telemetry analytics suite engineered by NexoraLab exceeded every expectation. Their attention to data privacy, audit trails, and speed is unmatched.",
  },
  {
    id: "t4",
    name: "Sneha Patel",
    company: "Retail Hub Global",
    role: "Chief Technology Officer",
    category: "FinTech & E-Commerce",
    rating: 5,
    avatarUrl: "/testimonials/client-4.webp",
    review:
      "Remarkable 24/7 support, scalable Kubernetes microservices architecture, and zero-compromise engineering standards. NexoraLab became our dedicated long-term technology backbone.",
  },
  {
    id: "t5",
    name: "Sarah Jenkins",
    company: "Apex Recruiters USA",
    role: "Head of Global Talent Acquisition",
    category: "AI & Talent Intelligence",
    rating: 5,
    avatarUrl: "",
    review:
      "The AI resume parser and smart matching suite built by NexoraLab reduced our applicant screening cycle from 4 days to less than 15 minutes. Pure engineering genius!",
  },
  {
    id: "t6",
    name: "Carlos Mendez",
    company: "FinVantage Global",
    role: "VP of Engineering",
    category: "FinTech & Payments",
    rating: 5,
    avatarUrl: "",
    review:
      "Our multi-currency settlement gateway processed over $40M in transaction volume without a single glitch during peak holiday traffic. Extremely grateful to the NexoraLab team.",
  },
];

const categoryFilters = [
  "All Reviews",
  "Enterprise SaaS",
  "AI & Talent Intelligence",
  "FinTech & Payments",
  "HealthTech & Telemedicine",
  "EdTech & Mobile",
];

const TestimonialsPage: React.FC = () => {
  const [items, setItems] = useState<TestimonialItem[]>(defaultTestimonials);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Reviews");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const cmsData = await contentService.getContent("testimonials");
        if (cmsData && cmsData.length > 0) {
          const mapped: TestimonialItem[] = cmsData.map((item: any, idx: number) => ({
            id: item._id || item.id || `cms_${idx}`,
            name: item.clientName || item.name || "Verified Client",
            role: item.role || "Executive Leader",
            company: item.company || "Enterprise Client",
            category: item.category || "Enterprise SaaS",
            rating: item.rating || 5,
            review: item.description || item.content || item.review || "",
            avatarUrl: item.avatarUrl || item.image || "",
            order: item.order || idx + 1,
          }));
          setItems(mapped);
        }
      } catch {
        // Fallback to default
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCat =
        selectedCategory === "All Reviews" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.review.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <>
      <SEO
        title="Client Testimonials & Verified Reviews | NexoraLab Technologies"
        description="Discover how NexoraLab Technologies delivers high-performance custom web, mobile, SaaS, and AI solutions with 99.4% client satisfaction worldwide."
        keywords={[
          "NexoraLab client reviews",
          "NexoraLab Technologies testimonials",
          "software engineering reviews",
          "client feedback",
          "software development ratings",
          "SaaS case studies",
        ]}
      />

      <div className="relative min-h-screen bg-[#02050e] text-slate-100 overflow-hidden pt-36 sm:pt-40 md:pt-44 pb-24 selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Glow Spheres */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[450px] rounded-full bg-[#00D2FF]/12 blur-[140px] pointer-events-none" />
        <div className="absolute top-[45%] right-5 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-[#7C3AED]/12 blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 sm:space-y-20">
          {/* Header Section */}
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-bold text-pink-300 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.2)]"
            >
              <HiSparkles className="text-pink-400" />
              <span>VERIFIED REPUTATION & CLIENT SUCCESS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-['Outfit'] tracking-tight leading-tight"
            >
              Trusted by Visionary Leaders{" "}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                Worldwide
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal"
            >
              Read genuine reviews and operational impact reports from founders, CTOs, and engineering leaders who scaled their digital infrastructure with NexoraLab Technologies.
            </motion.p>

            {/* Overall Rating Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#060c1c]/90 px-5 py-3 backdrop-blur-xl shadow-xl"
            >
              <div className="flex items-center gap-1 text-amber-400 text-lg">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-black text-white">4.9 / 5.0</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-300">Over 120+ Verified Client Reviews</span>
            </motion.div>
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Projects Delivered", value: "250+", icon: HiRocketLaunch, color: "text-cyan-400" },
              { label: "Client Satisfaction", value: "99.4%", icon: HiCheckBadge, color: "text-emerald-400" },
              { label: "Global Reach", value: "18+ Countries", icon: HiGlobeAlt, color: "text-violet-400" },
              { label: "Uptime & SLA Guarantee", value: "99.99%", icon: HiClock, color: "text-amber-400" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-[#060c1c]/80 p-5 sm:p-6 backdrop-blur-xl space-y-2 text-center transition hover:border-white/20 hover:scale-[1.02]"
                >
                  <div className={`mx-auto h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">{stat.value}</h3>
                  <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Search & Category Filter Controls */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                        : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <HiMagnifyingGlass size={16} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reviews or clients..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-pink-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 rounded-full border-2 border-pink-400 border-t-transparent animate-spin" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-16 text-center rounded-3xl border border-white/10 bg-[#060c1c]/90 space-y-2">
              <HiChatBubbleBottomCenterText className="mx-auto text-4xl text-slate-500" />
              <p className="text-base font-bold text-white">No reviews found matching your filter.</p>
              <p className="text-xs text-slate-400">Try selecting a different category or clearing your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-3xl border border-white/10 bg-[#060c1c]/90 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:border-pink-500/40 hover:shadow-[0_10px_35px_rgba(236,72,153,0.15)] group relative overflow-hidden"
                  >
                    {/* Glowing highlight */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition pointer-events-none" />

                    <div className="space-y-4">
                      {/* Rating & Verified Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-amber-400 text-sm">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <HiStar key={i} fill="currentColor" />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-pink-300 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                          <HiShieldCheck size={12} className="text-pink-400" />
                          <span>Verified Client</span>
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-normal">
                        "{item.review}"
                      </p>
                    </div>

                    {/* Client Identity Info */}
                    <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.name}
                          className="h-11 w-11 rounded-full object-cover border-2 border-pink-500/30 group-hover:border-pink-400 transition shrink-0"
                        />
                      ) : (
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md">
                          {item.name ? item.name.charAt(0) : "C"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white font-['Outfit'] truncate group-hover:text-pink-300 transition">
                          {item.name}
                        </h4>
                        <p className="text-[11px] font-semibold text-pink-400 truncate">
                          {item.role}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                          <HiBuildingOffice2 className="shrink-0" />
                          <span>{item.company}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Bottom Discovery CTA Banner */}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#060c1c] via-[#0d1633] to-[#060c1c] p-8 sm:p-12 backdrop-blur-2xl text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-pink-500/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                Start Your Digital Evolution
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
                Ready to Experience World-Class Software Craftsmanship?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect with our principal architects to scope your architecture, review technical specifications, and receive a fixed-budget roadmap within 24 hours.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  to="/meeting"
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 px-6 py-3.5 text-xs font-bold text-white shadow-[0_0_25px_rgba(236,72,153,0.35)] transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Schedule Engineering Discovery</span>
                  <HiArrowRight size={15} />
                </Link>
                <Link
                  to="/quote"
                  className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-xs font-bold text-white transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Request Instant Project Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsPage;
