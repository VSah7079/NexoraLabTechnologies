// src/layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiDocumentText,
  HiCog,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";

// ✅ Correct icons from react-icons/hi
import { HiChat, HiLogout } from "react-icons/hi";

interface DashboardLayoutProps {
  role?: "candidate" | "recruiter" | "company_admin" | "admin" | "super-admin";
}

const DashboardLayout = ({ role = "candidate" }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const items = navItems[role as keyof typeof navItems] || navItems.candidate;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-40 
          w-72 h-screen 
          bg-white/90 backdrop-blur-sm border-r border-gray-200
          transition-all duration-300
          ${sidebarOpen ? "left-0" : "-left-72 lg:left-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
          >
            <HiXMark size={24} />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="p-4 space-y-2">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 w-full mt-4"
          >
            <HiLogout size={24} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white/90 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
          >
            <HiBars3 size={24} />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-gray-500">Welcome back!</span>
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-cyan-400 to-violet-600 flex items-center justify-center text-white font-bold">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;