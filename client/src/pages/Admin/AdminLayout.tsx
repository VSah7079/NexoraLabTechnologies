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
  HiChatBubbleBottomCenterText,
  HiQuestionMarkCircle,
  HiRectangleGroup,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
  HiBars3,
  HiXMark,
  HiShieldCheck,
  HiGlobeAlt,
  HiArrowTopRightOnSquare,
  HiSparkles,
  HiBookOpen,
} from "react-icons/hi2";
import { adminService, isAdminAuthenticated } from "@/services/admin.service";
import SEO from "@/components/common/SEO";
import logoImg from "@/assets/logo/NexoraLabTechnologies.png";
import iconImg from "@/assets/logo/NexoraIcon.png";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  actionButton?: React.ReactNode;
}

interface NavItem {
  label?: string;
  path?: string;
  icon?: React.ElementType;
  badge?: string;
  header?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard Overview", path: "/admin", icon: HiSquares2X2 },
  
  { header: "INBOUND LEADS & INQUIRIES" },
  { label: "All Submissions Hub", path: "/admin/submissions", icon: HiChatBubbleLeftRight, badge: "Hub" },
  { label: "Quote Requests", path: "/admin/submissions?type=quote", icon: HiSparkles },
  { label: "Contact Inquiries", path: "/admin/submissions?type=contact", icon: HiEnvelope },
  { label: "Meeting Bookings", path: "/admin/submissions?type=meeting", icon: HiCalendarDays },
  { label: "Brochure Leads", path: "/admin/submissions?type=brochure", icon: HiDocumentArrowDown },
  { label: "Career Applications", path: "/admin/submissions?type=career", icon: HiBriefcase },

  { header: "DYNAMIC WEBSITE CMS" },
  { label: "Hero & Banners (Home)", path: "/admin/sections", icon: HiRectangleGroup },
  { label: "Services & Divisions", path: "/admin/services", icon: HiCommandLine },
  { label: "Turnkey Products", path: "/admin/products", icon: HiDevicePhoneMobile },
  { label: "Resources & Guides", path: "/admin/resources", icon: HiBookOpen },
  { label: "Portfolio & Case Studies", path: "/admin/portfolio", icon: HiPaintBrush },
  { label: "Careers & Open Roles", path: "/admin/careers", icon: HiBriefcase },
  { label: "Engineering Insights", path: "/admin/insights", icon: HiDocumentText },
  { label: "Testimonials & Reviews", path: "/admin/testimonials", icon: HiChatBubbleBottomCenterText },
  { label: "Website FAQs", path: "/admin/faqs", icon: HiQuestionMarkCircle },

  { header: "CONFIGURATION" },
  { label: "Site & Security Settings", path: "/admin/settings", icon: HiCog6Tooth },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  badge,
  actionButton,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Auto-close mobile drawer on location change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, location.search]);

  const handleLogout = () => {
    adminService.logout();
    setSidebarOpen(false);
    navigate("/admin/login", { replace: true });
  };

  const isNavActive = (itemPath?: string) => {
    if (!itemPath) return false;
    if (itemPath === "/admin") {
      return location.pathname === "/admin";
    }
    if (itemPath.includes("?")) {
      const [base, query] = itemPath.split("?");
      return location.pathname === base && location.search === `?${query}`;
    }
    return location.pathname === itemPath && location.search === "";
  };

  return (
    <div className="min-h-screen bg-[#02050e] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <SEO
        title={`${title} | NexoraLab Admin Command Center`}
        description="Administrative control console for NexoraLab Technologies."
        robots="noindex, nofollow"
      />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-[#040814]/95 backdrop-blur-2xl px-4 sm:px-6 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
        {/* Left: Mobile Toggle & Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition active:scale-95"
            aria-label="Toggle Navigation Sidebar"
          >
            {sidebarOpen ? <HiXMark size={20} /> : <HiBars3 size={20} />}
          </button>

          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={iconImg}
                alt="NexoraLab"
                className="h-8 w-8 sm:h-9 sm:w-9 object-contain drop-shadow-[0_0_12px_rgba(0,210,255,0.5)] transition duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#040814]" />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-wider text-white font-['Outfit']">
                  NEXORA<span className="text-cyan-400">LAB</span>
                </span>
                <span className="rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-cyan-300">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Command Center & CMS Hub</p>
            </div>
          </Link>
        </div>

        {/* Right: Actions, Live Link & Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-300 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl transition shadow-sm"
            title="Open Live Public Website in New Tab"
          >
            <HiGlobeAlt className="text-cyan-400 text-sm" />
            <span className="hidden md:inline">Live Website</span>
            <HiArrowTopRightOnSquare className="text-[11px] opacity-70" />
          </Link>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block mx-1" />

          {/* Online Heartbeat Badge */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>API Online</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-300 transition cursor-pointer active:scale-95 shadow-sm"
            title="Sign out of Admin Console"
          >
            <HiArrowRightOnRectangle size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main App Container */}
      <div className="flex-1 flex relative">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden transition-opacity"
            aria-hidden="true"
          />
        )}

        {/* Sidebar Drawer */}
        <aside
          className={`fixed lg:sticky top-16 z-40 h-[calc(100vh-64px)] w-72 shrink-0 border-r border-white/10 bg-[#040814]/98 backdrop-blur-2xl p-4 flex flex-col justify-between overflow-y-auto transition-transform duration-300 shadow-2xl lg:shadow-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="space-y-6">
            {/* Branding Mini Banner on Mobile */}
            <div className="lg:hidden flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="NexoraLab Technologies" className="h-7 w-auto object-contain" />
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <HiXMark size={20} />
              </button>
            </div>

            {/* Navigation List */}
            <div className="space-y-1">
              {navItems.map((item, idx) => {
                if (item.header) {
                  return (
                    <div
                      key={idx}
                      className="pt-4 pb-1.5 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400/80"
                    >
                      {item.header}
                    </div>
                  );
                }

                const Icon = item.icon!;
                const active = isNavActive(item.path);

                return (
                  <Link
                    key={idx}
                    to={item.path!}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-transparent border border-cyan-500/40 text-cyan-200 font-bold shadow-[0_0_15px_rgba(0,210,255,0.15)]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`text-base shrink-0 ${active ? "text-cyan-400" : "text-slate-400"}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded-full bg-cyan-400 text-black px-2 py-0.5 text-[9px] font-black tracking-wide shrink-0 shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Sidebar Info Card & Logout */}
          <div className="pt-4 mt-6 border-t border-white/10 text-[11px] text-slate-400 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 space-y-1.5 shadow-inner">
              <div className="flex items-center gap-2">
                <HiShieldCheck className="text-cyan-400 text-base" />
                <span className="font-bold text-white text-xs">NexoraLab Core 2.0</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Full-stack CMS & Lead Engine with resilient multi-tier persistence.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 py-2.5 px-3 text-xs font-bold text-red-300 transition cursor-pointer active:scale-95 shadow-sm"
            >
              <HiArrowRightOnRectangle size={16} />
              <span>Log Out of Admin</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 lg:pb-12">
          {/* Header Banner */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
                  {title}
                </h1>
                {badge && (
                  <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-0.5 text-xs font-bold text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.2)]">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{subtitle}</p>}
            </div>

            {actionButton && <div className="shrink-0">{actionButton}</div>}
          </div>

          {/* Body Content */}
          <div className="space-y-6">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Dock */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#040814]/95 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <Link
          to="/admin"
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition ${
            location.pathname === "/admin" ? "text-cyan-400" : "text-slate-400 hover:text-white"
          }`}
        >
          <HiSquares2X2 size={20} />
          <span>Overview</span>
        </Link>

        <Link
          to="/admin/submissions"
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition ${
            location.pathname.startsWith("/admin/submissions")
              ? "text-cyan-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <HiChatBubbleLeftRight size={20} />
          <span>Leads</span>
        </Link>

        <Link
          to="/admin/services"
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition ${
            location.pathname.startsWith("/admin/services") ||
            location.pathname.startsWith("/admin/products") ||
            location.pathname.startsWith("/admin/portfolio") ||
            location.pathname.startsWith("/admin/insights")
              ? "text-cyan-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <HiCommandLine size={20} />
          <span>CMS</span>
        </Link>

        <Link
          to="/admin/settings"
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition ${
            location.pathname === "/admin/settings" ? "text-cyan-400" : "text-slate-400 hover:text-white"
          }`}
        >
          <HiCog6Tooth size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminLayout;
