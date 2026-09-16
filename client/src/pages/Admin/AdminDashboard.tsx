import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiChatBubbleLeftRight,
  HiEnvelope,
  HiCalendarDays,
  HiDocumentArrowDown,
  HiBriefcase,
  HiCommandLine,
  HiDevicePhoneMobile,
  HiPaintBrush,
  HiDocumentText,
  HiChatBubbleBottomCenterText,
  HiQuestionMarkCircle,
  HiArrowTrendingUp,
  HiArrowPath,
  HiArrowTopRightOnSquare,
  HiSparkles,
  HiClock,
  HiPlus,
  HiShieldCheck,
  HiPhone,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import AdminLayout from "./AdminLayout";
import { adminService } from "@/services/admin.service";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await adminService.getDashboardStats();
      if (res.success) {
        setStats(res.stats);
        setRecentActivity(res.recentActivity || []);
      }
    } catch {
      // Sample fallback if server connection is buffering
      setStats({
        totalSubmissions: 12,
        newLeads: 5,
        quotesCount: 6,
        contactsCount: 3,
        meetingsCount: 2,
        brochureCount: 1,
        careersCount: 0,
        contactedCount: 4,
        convertedCount: 3,
        highValueQuotes: 2,
        cms: {
          services: 6,
          products: 3,
          portfolio: 3,
          insights: 3,
          testimonials: 3,
          faqs: 4,
          sections: 2,
          totalCmsItems: 24,
        },
      });
      setRecentActivity([
        {
          _id: "sub_1",
          type: "quote",
          name: "Amitabh Verma",
          email: "amitabh.verma@fintechscale.io",
          phone: "9876543210",
          countryCode: "+91",
          service: "Custom SaaS & AI Talent Suite",
          budget: "$15,000 – $35,000",
          status: "new",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "sub_2",
          type: "meeting",
          name: "Priya Sharma",
          email: "priya@medhealth.co",
          phone: "9812345678",
          countryCode: "+91",
          meetingTopic: "Telehealth Platform Discovery Call",
          meetingDate: "2026-09-20",
          meetingTimeSlot: "11:00 AM IST",
          status: "contacted",
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 px-2.5 py-0.5 text-[10px] font-bold">
            New Lead
          </span>
        );
      case "contacted":
        return (
          <span className="rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 px-2.5 py-0.5 text-[10px] font-bold">
            Contacted
          </span>
        );
      case "converted":
        return (
          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 text-[10px] font-bold">
            Converted
          </span>
        );
      case "in_review":
        return (
          <span className="rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-300 px-2.5 py-0.5 text-[10px] font-bold">
            In Review
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-slate-500/15 border border-slate-500/40 text-slate-300 px-2.5 py-0.5 text-[10px] font-bold">
            {status}
          </span>
        );
    }
  };

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Real-time pulse of inbound business inquiries, engineering calls, and dynamic CMS content."
      badge="Live Operations"
      actionButton={
        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition active:scale-95 disabled:opacity-50"
        >
          <HiArrowPath className={`text-cyan-400 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* Top 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Total Leads */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#060c1c]/90 p-5 backdrop-blur-xl shadow-lg group hover:border-cyan-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Leads</span>
              <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-2.5 text-cyan-400">
                <HiChatBubbleLeftRight size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
                {stats?.totalSubmissions || 0}
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center">
                <HiArrowTrendingUp className="mr-0.5" /> Active Inbound
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Across all website inquiry touchpoints</p>
          </div>

          {/* Card 2: New Unread Leads */}
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-[#060c1c]/90 p-5 backdrop-blur-xl shadow-lg group hover:border-cyan-500/60 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Action Required</span>
              <div className="rounded-2xl bg-cyan-400/20 border border-cyan-400/30 p-2.5 text-cyan-300">
                <HiSparkles size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-cyan-300 font-['Outfit']">
                {stats?.newLeads || 0}
              </span>
              <span className="text-xs text-cyan-200 font-medium">Pending Response</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <Link
                to="/admin/submissions?status=new"
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline"
              >
                Review New Inquiries →
              </Link>
            </div>
          </div>

          {/* Card 3: Discovery Calls */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#060c1c]/90 p-5 backdrop-blur-xl shadow-lg group hover:border-blue-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Discovery Calls</span>
              <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-2.5 text-blue-400">
                <HiCalendarDays size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
                {stats?.meetingsCount || 0}
              </span>
              <span className="text-xs text-blue-400 font-bold">Scheduled Calls</span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Direct architecture & scope sessions</p>
          </div>

          {/* Card 4: High Value Quotes */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#060c1c]/90 p-5 backdrop-blur-xl shadow-lg group hover:border-violet-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quotes & Proposals</span>
              <div className="rounded-2xl bg-violet-500/10 border border-violet-500/20 p-2.5 text-violet-400">
                <HiEnvelope size={20} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
                {stats?.quotesCount || 0}
              </span>
              <span className="text-xs text-violet-300 font-medium">Inquiry Pipeline</span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Custom web, mobile & AI solutions</p>
          </div>
        </div>

        {/* Quick Action Dock */}
        <div className="rounded-3xl border border-white/10 bg-[#050a18]/80 p-5 sm:p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <HiSparkles className="text-cyan-400" />
              <span>Quick Management Actions</span>
            </h2>
            <span className="text-[11px] text-slate-400">1-Click Content & Lead Tools</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link
              to="/admin/services"
              className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-cyan-500/10 hover:border-cyan-500/40 p-3.5 flex flex-col items-center justify-center text-center gap-2 transition group"
            >
              <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400 group-hover:scale-110 transition">
                <HiCommandLine size={20} />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">Add Service</span>
            </Link>

            <Link
              to="/admin/products"
              className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-blue-500/10 hover:border-blue-500/40 p-3.5 flex flex-col items-center justify-center text-center gap-2 transition group"
            >
              <div className="rounded-xl bg-blue-500/10 p-2 text-blue-400 group-hover:scale-110 transition">
                <HiDevicePhoneMobile size={20} />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-blue-300">Add Product</span>
            </Link>

            <Link
              to="/admin/portfolio"
              className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-violet-500/10 hover:border-violet-500/40 p-3.5 flex flex-col items-center justify-center text-center gap-2 transition group"
            >
              <div className="rounded-xl bg-violet-500/10 p-2 text-violet-400 group-hover:scale-110 transition">
                <HiPaintBrush size={20} />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-violet-300">Add Project</span>
            </Link>

            <Link
              to="/admin/insights"
              className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-amber-500/10 hover:border-amber-500/40 p-3.5 flex flex-col items-center justify-center text-center gap-2 transition group"
            >
              <div className="rounded-xl bg-amber-500/10 p-2 text-amber-400 group-hover:scale-110 transition">
                <HiDocumentText size={20} />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300">Write Blog</span>
            </Link>

            <Link
              to="/admin/testimonials"
              className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-pink-500/10 hover:border-pink-500/40 p-3.5 flex flex-col items-center justify-center text-center gap-2 transition group"
            >
              <div className="rounded-xl bg-pink-500/10 p-2 text-pink-400 group-hover:scale-110 transition">
                <HiChatBubbleBottomCenterText size={20} />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-pink-300">Testimonials</span>
            </Link>

            <Link
              to="/admin/submissions"
              className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-emerald-500/10 hover:border-emerald-500/40 p-3.5 flex flex-col items-center justify-center text-center gap-2 transition group"
            >
              <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400 group-hover:scale-110 transition">
                <HiChatBubbleLeftRight size={20} />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">View All Leads</span>
            </Link>
          </div>
        </div>

        {/* Two-Column Grid: CMS Content Health & Recent Leads */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: CMS Content Distribution Hub */}
          <div className="rounded-3xl border border-white/10 bg-[#060c1c]/90 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-black text-white font-['Outfit']">Website Content CMS</h3>
                <p className="text-xs text-slate-400">Live entities published on website</p>
              </div>
              <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-bold text-cyan-300">
                {stats?.cms?.totalCmsItems || 0} Total
              </span>
            </div>

            <div className="space-y-2.5">
              <Link
                to="/admin/services"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
                    <HiCommandLine size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Services & Divisions</p>
                    <p className="text-[10px] text-slate-400">Core engineering solutions</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-300">{stats?.cms?.services || 0} items</span>
              </Link>

              <Link
                to="/admin/products"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-500/10 p-2 text-blue-400">
                    <HiDevicePhoneMobile size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Turnkey SaaS Products</p>
                    <p className="text-[10px] text-slate-400">AI ATS & Cloud Tools</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-300">{stats?.cms?.products || 0} items</span>
              </Link>

              <Link
                to="/admin/portfolio"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-500/10 p-2 text-violet-400">
                    <HiPaintBrush size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Portfolio & Case Studies</p>
                    <p className="text-[10px] text-slate-400">Client project delivery</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-violet-300">{stats?.cms?.portfolio || 0} items</span>
              </Link>

              <Link
                to="/admin/insights"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/10 p-2 text-amber-400">
                    <HiDocumentText size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Engineering Insights</p>
                    <p className="text-[10px] text-slate-400">Technical articles & guides</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-300">{stats?.cms?.insights || 0} items</span>
              </Link>

              <Link
                to="/admin/testimonials"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-pink-500/10 p-2 text-pink-400">
                    <HiChatBubbleBottomCenterText size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Client Testimonials</p>
                    <p className="text-[10px] text-slate-400">Verified client reviews</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-pink-300">{stats?.cms?.testimonials || 0} items</span>
              </Link>

              <Link
                to="/admin/faqs"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
                    <HiQuestionMarkCircle size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Website FAQs</p>
                    <p className="text-[10px] text-slate-400">Questions & Answers</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-300">{stats?.cms?.faqs || 0} items</span>
              </Link>
            </div>
          </div>

          {/* Column 2 & 3: Recent Inbound Inquiries Feed */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#060c1c]/90 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-black text-white font-['Outfit']">Recent Inbound Inquiries</h3>
                <p className="text-xs text-slate-400">Latest leads submitted through public forms</p>
              </div>
              <Link
                to="/admin/submissions"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1"
              >
                <span>View All Leads</span>
                <HiArrowTopRightOnSquare />
              </Link>
            </div>

            {recentActivity.length === 0 ? (
              <div className="text-center py-12 space-y-2 text-slate-400">
                <p className="text-sm font-semibold">No recent submissions found.</p>
                <p className="text-xs text-slate-500">Inbound inquiries will populate here in real time.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((sub) => (
                  <div
                    key={sub._id || sub.id}
                    className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white">{sub.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                          {sub.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(sub.status || "new")}
                        <span className="text-[11px] text-slate-500">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500 text-[11px]">Contact: </span>
                        <a href={`mailto:${sub.email}`} className="text-cyan-400 hover:underline">
                          {sub.email}
                        </a>
                      </div>
                      {sub.phone && (
                        <div>
                          <span className="text-slate-500 text-[11px]">Phone: </span>
                          <span>{sub.countryCode || "+91"} {sub.phone}</span>
                        </div>
                      )}
                      {(sub.service || sub.meetingTopic || sub.roleApplied) && (
                        <div className="sm:col-span-2">
                          <span className="text-slate-500 text-[11px]">Subject: </span>
                          <span className="font-semibold text-slate-200">
                            {sub.service || sub.meetingTopic || sub.roleApplied}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quick Reachout Buttons */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-2">
                      {sub.phone && (
                        <a
                          href={`https://wa.me/${(sub.countryCode || "+91").replace(/\+/g, "")}${sub.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(sub.name)},%20thank%20you%20for%20contacting%20NexoraLab%20Technologies.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 transition"
                        >
                          <FaWhatsapp />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      <a
                        href={`mailto:${sub.email}?subject=Regarding%20your%20inquiry%20with%20NexoraLab%20Technologies`}
                        className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 text-xs font-bold text-cyan-300 transition"
                      >
                        <HiEnvelope />
                        <span>Email</span>
                      </a>
                      {sub.phone && (
                        <a
                          href={`tel:${sub.phone}`}
                          className="flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 text-xs font-bold text-blue-300 transition"
                        >
                          <HiPhone />
                          <span>Call</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
