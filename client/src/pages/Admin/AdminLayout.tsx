import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiSquares2X2,
  HiChatBubbleLeftRight,
  HiEnvelope,
  HiCalendarDays,
  HiDocumentArrowDown,
  HiBriefcase,
  HiCommandLine,
  HiDevicePhoneMobile,
  HiPaintBrush,
  HiDocumentText,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
  HiBars3,
  HiXMark,
  HiShieldCheck,
  HiSparkles,
  HiGlobeAlt,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";
import { adminService, isAdminAuthenticated } from "@/services/admin.service";
import SEO from "@/components/common/SEO";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
}

const navItems = [
  { label: "Dashboard Overview", path: "/admin", icon: HiSquares2X2 },
  { label: "Quote Inquiries", path: "/admin/submissions?type=quote", icon: HiChatBubbleLeftRight, badge: "Leads" },
  { label: "Contact Messages", path: "/admin/submissions?type=contact", icon: HiEnvelope },
  { label: "Meeting Bookings", path: "/admin/submissions?type=meeting", icon: HiCalendarDays },
  { label: "Brochure Leads", path: "/admin/submissions?type=brochure", icon: HiDocumentArrowDown },
  { label: "Career Applications", path: "/admin/submissions?type=career", icon: HiBriefcase },
  { header: "DYNAMIC CMS CONTENT" },
  { label: "Services & Divisions", path: "/admin/services", icon: HiCommandLine },
  { label: "Turnkey Products", path: "/admin/products", icon: HiDevicePhoneMobile },
  { label: "Portfolio & Case Studies", path: "/admin/portfolio", icon: HiPaintBrush },
  { label: "Engineering Insights", path: "/admin/insights", icon: HiDocumentText },
  { header: "CONFIGURATION" },
  { label: "Site & Contact Settings", path: "/admin/settings", icon: HiCog6Tooth },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle, badge }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    adminService.logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#02050e] text-slate-100 flex flex-col pt-0">
      <SEO
        title={`${title} | NexoraLab Admin Command Center`}
        description="Administrative management workspace for NexoraLab Technologies."
        robots="noindex, nofollow"
      />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 h-16 border-b border-white/10 bg-[#060b18]/95 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <HiXMark size={20} /> : <HiBars3 size={20} />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-white text-base shadow-[0_0_15px_rgba(0,210,255,0.4)]">
              ✦
            </div>
            <div>
              <div className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                <span>NEXORALAB</span>
                <span className="rounded-md bg-cyan-500/20 border border-cyan-500/30 px-1.5 py-0.2 text-[9px] font-bold text-cyan-300">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5">Control Panel & Lead Hub</p>
            </div>
          </Link>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#00D2FF] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full transition"
          >
            <HiGlobeAlt className="text-cyan-400" />
            <span>Live Website</span>
            <HiArrowTopRightOnSquare className="text-[11px]" />
          </Link>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden md:inline font-mono text-[11px]">System Online</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-300 transition cursor-pointer"
            title="Log Out"
          >
            <HiArrowRightOnRectangle size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar */}
      <div className="flex-1 flex relative">
        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-64px)] w-64 shrink-0 border-r border-white/10 bg-[#050914] p-4 flex flex-col justify-between overflow-y-auto transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="space-y-6">
            <div className="space-y-1">
              {navItems.map((item, idx) => {
                if (item.header) {
                  return (
                    <div
                      key={idx}
                      className="pt-4 pb-1 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400"
                    >
                      {item.header}
                    </div>
                  );
                }

                const Icon = item.icon!;
                const isActive =
                  location.pathname === item.path ||
                  (item.path?.includes("submissions") &&
                    location.pathname.includes("submissions") &&
                    location.search.includes(item.path.split("?")[1]));

                return (
                  <Link
                    key={idx}
                    to={item.path!}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 text-cyan-200 font-bold"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`text-base ${isActive ? "text-[#00D2FF]" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded-full bg-cyan-400 text-black px-1.5 py-0.2 text-[9px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Sidebar Info */}
          <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 space-y-1">
              <p className="font-bold text-white flex items-center gap-1.5">
                <HiShieldCheck className="text-[#00D2FF]" />
                <span>Protected Console</span>
              </p>
              <p className="text-[10px] leading-relaxed">
                Full-Stack CMS & Inbound Lead Management.
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Header Bar */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{title}</h1>
                {badge && (
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-bold text-cyan-300">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
            </div>
          </div>

          {/* Children Content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
