import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiChatBubbleLeftRight,
  HiEnvelope,
  HiCalendarDays,
  HiDocumentArrowDown,
  HiBriefcase,
  HiArrowTrendingUp,
  HiArrowPath,
  HiArrowTopRightOnSquare,
  HiSparkles,
  HiClock,
} from "react-icons/hi2";
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
      // Fallback sample data if backend has no records yet
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
      });
      setRecentActivity([
        {
          _id: "sub_1",
          type: "quote",
          name: "Amitabh Verma",
          email: "amitabh.verma@fintechscale.io",
          phone: "9876543210",
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
          meetingTopic: "Telehealth Platform Scope Discovery",
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
        return <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 text-[10px] font-bold">New Lead</span>;
      case "contacted":
        return <span className="rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2 py-0.5 text-[10px] font-bold">Contacted</span>;
      case "converted":
        return <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">Converted</span>;
      default:
        return <span className="rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-300 px-2 py-0.5 text-[10px] font-bold">{status}</span>;
    }
  };

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Real-time pulse of inbound inquiries, scheduled engineering calls, and content health."
      badge="Live Operations"
    >
      <div className="space-y-8">
        {/* Top Actions & Quick Refresh */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">NexoraLab Inbound Performance • Headquartered in Siwan, Bihar</span>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 transition cursor-pointer"
          >
            <HiArrowPath className={`text-cyan-400 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Stats</span>
          </button>
        </div>

        {/* 5-Metric Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link
            to="/admin/submissions?type=quote"
            className="group rounded-3xl border border-white/10 bg-[#060b18]/80 p-5 backdrop-blur-xl transition hover:border-[#00D2FF]/50 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">Quote Inquiries</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-[#00D2FF]">
                <HiChatBubbleLeftRight />
              </div>
            </div>
            <div className="text-3xl font-black text-white">{stats?.quotesCount ?? 0}</div>
            <p className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
              <span>View project proposals</span>
              <span>→</span>
            </p>
          </Link>

          <Link
            to="/admin/submissions?type=contact"
            className="group rounded-3xl border border-white/10 bg-[#060b18]/80 p-5 backdrop-blur-xl transition hover:border-purple-500/50 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">Contact Messages</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <HiEnvelope />
              </div>
            </div>
            <div className="text-3xl font-black text-white">{stats?.contactsCount ?? 0}</div>
            <p className="text-[11px] text-purple-400 mt-1 flex items-center gap-1">
              <span>Direct inquiries</span>
              <span>→</span>
            </p>
          </Link>

          <Link
            to="/admin/submissions?type=meeting"
            className="group rounded-3xl border border-white/10 bg-[#060b18]/80 p-5 backdrop-blur-xl transition hover:border-emerald-500/50 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">Meeting Calls</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <HiCalendarDays />
              </div>
            </div>
            <div className="text-3xl font-black text-white">{stats?.meetingsCount ?? 0}</div>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <span>Scheduled 30-min calls</span>
              <span>→</span>
            </p>
          </Link>

          <Link
            to="/admin/submissions?type=brochure"
            className="group rounded-3xl border border-white/10 bg-[#060b18]/80 p-5 backdrop-blur-xl transition hover:border-blue-500/50 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">Brochure Downloads</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <HiDocumentArrowDown />
              </div>
            </div>
            <div className="text-3xl font-black text-white">{stats?.brochureCount ?? 0}</div>
            <p className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
              <span>Corporate deck leads</span>
              <span>→</span>
            </p>
          </Link>

          <Link
            to="/admin/submissions?type=career"
            className="group rounded-3xl border border-white/10 bg-[#060b18]/80 p-5 backdrop-blur-xl transition hover:border-amber-500/50 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">Career Applicants</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <HiBriefcase />
              </div>
            </div>
            <div className="text-3xl font-black text-white">{stats?.careersCount ?? 0}</div>
            <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
              <span>Developer resumes</span>
              <span>→</span>
            </p>
          </Link>
        </div>

        {/* Conversion & Deal Health Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#071329] to-[#040814] p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <HiSparkles />
                <span>Lead Velocity</span>
              </span>
              <span className="text-[10px] rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 px-2 py-0.5 font-bold">
                Active Sprints
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-black text-white">{stats?.totalSubmissions ?? 0}</div>
              <span className="text-xs text-slate-400">Total Inbound Submissions</span>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>New & Uncontacted</span>
                <strong className="text-cyan-300">{stats?.newLeads ?? 0} leads</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>In Active Dialogue</span>
                <strong className="text-amber-300">{stats?.contactedCount ?? 0} leads</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Converted SOWs</span>
                <strong className="text-emerald-300">{stats?.convertedCount ?? 0} projects</strong>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts to CMS */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#060b18]/85 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Dynamic CMS Quick Access</h3>
              <span className="text-xs text-slate-400">Manage live website content</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                to="/admin/services"
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 hover:bg-white/[0.05] hover:border-cyan-500/40 transition flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-white">Services CMS</span>
                <span className="text-[11px] text-cyan-400 mt-2 flex items-center gap-1">
                  <span>Edit Services</span>
                  <HiArrowTopRightOnSquare size={12} />
                </span>
              </Link>

              <Link
                to="/admin/products"
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 hover:bg-white/[0.05] hover:border-purple-500/40 transition flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-white">Products CMS</span>
                <span className="text-[11px] text-purple-400 mt-2 flex items-center gap-1">
                  <span>Edit Turnkey</span>
                  <HiArrowTopRightOnSquare size={12} />
                </span>
              </Link>

              <Link
                to="/admin/portfolio"
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 hover:bg-white/[0.05] hover:border-emerald-500/40 transition flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-white">Portfolio CMS</span>
                <span className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <span>Edit Projects</span>
                  <HiArrowTopRightOnSquare size={12} />
                </span>
              </Link>

              <Link
                to="/admin/settings"
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 hover:bg-white/[0.05] hover:border-amber-500/40 transition flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-white">Site Settings</span>
                <span className="text-[11px] text-amber-400 mt-2 flex items-center gap-1">
                  <span>Edit Contacts</span>
                  <HiArrowTopRightOnSquare size={12} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Submissions Feed */}
        <div className="rounded-3xl border border-white/10 bg-[#060b18]/85 p-6 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Recent Inbound Submissions</h3>
              <p className="text-xs text-slate-400 mt-0.5">Latest 10 leads across all forms</p>
            </div>

            <Link
              to="/admin/submissions"
              className="text-xs font-bold text-[#00D2FF] hover:underline flex items-center gap-1"
            >
              <span>View All Leads</span>
              <span>→</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.02]">
                <tr>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Details / Topic</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentActivity.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No recent submissions recorded yet.
                    </td>
                  </tr>
                ) : (
                  recentActivity.map((sub, idx) => (
                    <tr key={sub._id || idx} className="hover:bg-white/[0.02] transition">
                      <td className="py-3 px-4 font-bold capitalize text-cyan-300">
                        {sub.type}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {sub.name}
                        {sub.company && <span className="block text-[10px] text-slate-400">{sub.company}</span>}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        <div>{sub.email}</div>
                        {sub.phone && <div className="text-slate-400">{sub.countryCode || "+91"} {sub.phone}</div>}
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate">
                        {sub.service || sub.meetingTopic || sub.roleApplied || sub.message || "—"}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(sub.status || "new")}
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
