// src/layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiDocumentText,
  HiCog,
  HiBars3,
  HiXMark,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import Logo from "./Navbar/Logo";

// ✅ Correct icons from react-icons/hi
import { HiChat, HiLogout } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface DashboardLayoutProps {
  role?: "candidate" | "recruiter" | "company_admin" | "admin" | "super-admin";
}

const DashboardLayout = ({ role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, getProfileRoute } = useAuth();

  const activeRole = role || (user?.role as any) || "candidate";

  const handleLogout = () => {
    logout();
    toast.success("Logged out from workspace console", {
      theme: "dark",
      autoClose: 2000,
    });
    navigate("/");
  };

  const navItems = {
    candidate: [
      { title: "Dashboard", path: "/candidate/dashboard", icon: <HiHome /> },
      { title: "Profile", path: "/candidate/profile", icon: <HiUser /> },
      { title: "Jobs", path: "/candidate/jobs", icon: <HiBriefcase /> },
      { title: "Applications", path: "/candidate/applications", icon: <HiDocumentText /> },
      { title: "Messages", path: "/candidate/messages", icon: <HiChat /> },
      { title: "Settings", path: "/candidate/settings", icon: <HiCog /> },
    ],
    recruiter: [
      { title: "Dashboard", path: "/recruiter/dashboard", icon: <HiHome /> },
      { title: "Jobs", path: "/recruiter/jobs", icon: <HiBriefcase /> },
      { title: "Candidates", path: "/recruiter/candidates", icon: <HiUser /> },
      { title: "Messages", path: "/recruiter/messages", icon: <HiChat /> },
      { title: "Settings", path: "/recruiter/settings", icon: <HiCog /> },
    ],
    company: [
      { title: "Dashboard", path: "/company/dashboard", icon: <HiHome /> },
      { title: "Profile", path: "/company/profile", icon: <HiUser /> },
      { title: "Settings", path: "/company/settings", icon: <HiCog /> },
    ],
    company_admin: [
      { title: "Dashboard", path: "/company/dashboard", icon: <HiHome /> },
      { title: "Profile", path: "/company/profile", icon: <HiUser /> },
      { title: "Settings", path: "/company/settings", icon: <HiCog /> },
    ],
    admin: [
      { title: "Dashboard", path: "/admin/dashboard", icon: <HiHome /> },
      { title: "Users", path: "/admin/users", icon: <HiUser /> },
      { title: "Jobs", path: "/admin/jobs", icon: <HiBriefcase /> },
      { title: "Companies", path: "/admin/companies", icon: <HiBriefcase /> },
      { title: "Settings", path: "/admin/settings", icon: <HiCog /> },
    ],
    "super-admin": [
      { title: "Dashboard", path: "/super-admin/dashboard", icon: <HiHome /> },
      { title: "Users", path: "/super-admin/users", icon: <HiUser /> },
      { title: "Jobs", path: "/super-admin/jobs", icon: <HiBriefcase /> },
      { title: "Companies", path: "/super-admin/companies", icon: <HiBriefcase /> },
      { title: "Settings", path: "/super-admin/settings", icon: <HiCog /> },
    ],
  };

  const items = navItems[activeRole as keyof typeof navItems] || navItems.candidate;

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(user?.name);
  const profileLink = getProfileRoute();

  return (
    <div className="flex min-h-screen bg-transparent text-slate-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 z-50 
          w-72 h-screen 
          bg-[#070e1b]/95 backdrop-blur-2xl border-r border-slate-800/80
          transition-all duration-300 flex flex-col justify-between
          ${sidebarOpen ? "left-0" : "-left-72 lg:left-0"}
        `}
      >
        <div>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-[#0b1426]/70">
            <Logo size="sm" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
            >
              <HiXMark size={24} />
            </button>
          </div>

          {/* User Profile Mini Badge in Sidebar */}
          {user && (
            <div className="mx-4 my-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-md ring-2 ring-cyan-400/40 shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-white truncate font-['Outfit']">{user.name}</p>
                  <HiOutlineCheckBadge className="text-cyan-400 text-xs shrink-0" />
                </div>
                <p className="text-[10px] text-slate-400 capitalize truncate">{user.role || activeRole}</p>
              </div>
            </div>
          )}

          {/* Sidebar Nav */}
          <nav className="p-4 space-y-1.5">
            {items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-[#00D2FF] border border-cyan-500/30 shadow-[0_0_15px_rgba(0,210,255,0.15)]"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button in Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all w-full border border-white/[0.08]"
          >
            Back to Website
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-200 w-full text-xs font-bold border border-rose-500/20 cursor-pointer"
          >
            <HiLogout size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80 bg-[#060b18]/80 backdrop-blur-2xl sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-slate-300 hover:text-white transition-colors"
          >
            <HiBars3 size={24} />
          </button>
          
          <div className="flex items-center gap-3.5 ml-auto">
            <Link
              to={profileLink}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#7C3AED] flex items-center justify-center text-white font-bold text-xs shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                  {user?.name || "Workspace User"}
                </p>
                <p className="text-[10px] text-slate-400 capitalize leading-tight">
                  {user?.role || activeRole}
                </p>
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;