import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineSquares2X2,
  HiOutlineArrowRightOnRectangle,
  HiOutlineSparkles,
  HiOutlineCheckBadge,
  HiChevronDown,
} from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const ProfileDropdown = () => {
  const { user, logout, getDashboardRoute, getProfileRoute } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!user) return null;

  // Extract initials (e.g., "Aman Raj" -> "AR")
  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getFirstName = (name?: string) => {
    if (!name) return "Profile";
    return name.trim().split(" ")[0];
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    toast.success("Signed out successfully", {
      theme: "dark",
      autoClose: 2000,
    });
    navigate("/");
  };

  // Role display label & color scheme
  const roleDisplay = (role?: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
      case "super-admin":
        return {
          label: "Administrator",
          icon: "👑",
          badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
          ringColor: "ring-amber-400/50",
          gradient: "from-amber-500 to-orange-600",
        };
      case "recruiter":
        return {
          label: "Recruiter Pro",
          icon: "🎯",
          badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
          ringColor: "ring-purple-400/50",
          gradient: "from-purple-500 to-indigo-600",
        };
      case "company":
        return {
          label: "Enterprise",
          icon: "🏢",
          badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/30",
          ringColor: "ring-blue-400/50",
          gradient: "from-blue-500 to-cyan-600",
        };
      case "candidate":
      case "user":
      default:
        return {
          label: "Candidate",
          icon: "🚀",
          badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
          ringColor: "ring-cyan-400/50",
          gradient: "from-[#00D2FF] to-[#0066FF]",
        };
    }
  };

  const roleInfo = roleDisplay(user.role);
  const initials = getInitials(user.name);
  const firstName = getFirstName(user.name);
  const dashboardPath = getDashboardRoute();
  const profilePath = getProfileRoute();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2
          rounded-full
          border
          ${isOpen ? "border-[#00D2FF]/80 bg-[#0c1938] shadow-[0_0_20px_rgba(0,210,255,0.35)]" : "border-white/[0.12] bg-white/[0.04] hover:border-[#00D2FF]/50 hover:bg-white/[0.08]"}
          py-1
          pl-1.5
          pr-2.5
          backdrop-blur-md
          transition-all
          duration-200
          group
        `}
        aria-label="User profile menu"
        aria-expanded={isOpen}
      >
        {/* Avatar Ring */}
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover ring-2 ${roleInfo.ringColor}`}
            />
          ) : (
            <div
              className={`
                h-7 w-7 sm:h-8 sm:w-8
                rounded-full
                bg-gradient-to-tr ${roleInfo.gradient}
                flex items-center justify-center
                text-[11px] sm:text-xs font-black text-white
                shadow-inner
                ring-2 ${roleInfo.ringColor}
              `}
            >
              {initials}
            </div>
          )}

          {/* Active online indicator */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#060b18] shadow-[0_0_6px_#10b981]" />
        </div>

        {/* User name & chevron */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-white group-hover:text-[#00D2FF] transition-colors leading-tight max-w-[100px] truncate">
            {firstName}
          </span>
          <span className="text-[10px] text-slate-400 leading-tight">
            {roleInfo.label}
          </span>
        </div>

        <HiChevronDown
          className={`text-slate-400 text-xs transition-transform duration-200 ${isOpen ? "rotate-180 text-[#00D2FF]" : "group-hover:text-slate-200"}`}
        />
      </motion.button>

      {/* Floating Obsidian Glass Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute
              right-0
              mt-3
              w-[280px]
              sm:w-[310px]
              rounded-3xl
              border
              border-white/[0.12]
              bg-[#060d1f]/95
              p-2.5
              shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(0,210,255,0.15)]
              backdrop-blur-2xl
              z-[1000]
              overflow-hidden
            "
          >
            {/* Top Laser Accent */}
            <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent" />

            {/* User Profile Card Header */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 mb-2">
              <div className="flex items-center gap-3">
                {/* Large Avatar */}
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[#00D2FF]/60 shadow-lg"
                  />
                ) : (
                  <div
                    className={`
                      h-11 w-11
                      rounded-full
                      bg-gradient-to-tr ${roleInfo.gradient}
                      flex items-center justify-center
                      text-sm font-black text-white
                      shadow-[0_0_15px_rgba(0,210,255,0.3)]
                      ring-2 ${roleInfo.ringColor}
                    `}
                  >
                    {initials}
                  </div>
                )}

                {/* Name & Email */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-bold text-white truncate font-['Outfit']">
                      {user.name}
                    </h4>
                    <HiOutlineCheckBadge className="text-[#00D2FF] text-sm shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Role badge pill */}
              <div className="mt-2.5 flex items-center justify-between">
                <span
                  className={`
                    inline-flex items-center gap-1.5
                    rounded-full border px-2.5 py-0.5
                    text-[10px] font-bold tracking-wide uppercase
                    ${roleInfo.badgeBg}
                  `}
                >
                  <span>{roleInfo.icon}</span>
                  <span>{roleInfo.label}</span>
                </span>

                <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active
                </span>
              </div>
            </div>

            {/* Navigation Options List */}
            <div className="space-y-1">
              {/* 1. Go to Dashboard */}
              <Link
                to={dashboardPath}
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center justify-between
                  rounded-xl
                  px-3
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-200
                  transition-all
                  duration-150
                  hover:bg-gradient-to-r
                  hover:from-[#00D2FF]/15
                  hover:to-[#0066FF]/15
                  hover:text-white
                  hover:border
                  hover:border-[#00D2FF]/30
                  group
                "
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                    <HiOutlineSquares2X2 className="text-base" />
                  </div>
                  <span>Dashboard Console</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 group-hover:bg-cyan-500/30">
                  Open
                </span>
              </Link>

              {/* 2. My Profile */}
              <Link
                to={profilePath}
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center justify-between
                  rounded-xl
                  px-3
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-200
                  transition-all
                  duration-150
                  hover:bg-white/[0.06]
                  hover:text-white
                  group
                "
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
                    <HiOutlineUser className="text-base" />
                  </div>
                  <span>My Profile</span>
                </div>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300">
                  View
                </span>
              </Link>

              {/* 3. AI Hiring & Tools Hub */}
              <Link
                to="/resume-analyzer"
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center justify-between
                  rounded-xl
                  px-3
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-200
                  transition-all
                  duration-150
                  hover:bg-white/[0.06]
                  hover:text-white
                  group
                "
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                    <HiOutlineSparkles className="text-base" />
                  </div>
                  <span>AI Resume & Tools</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  AI
                </span>
              </Link>
            </div>

            {/* Divider */}
            <div className="my-1.5 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            {/* Sign Out Action */}
            <button
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-2.5
                rounded-xl
                px-3
                py-2.5
                text-xs
                font-semibold
                text-rose-400
                transition-all
                duration-150
                hover:bg-rose-500/10
                hover:text-rose-300
                group
              "
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 group-hover:text-rose-300 transition-colors">
                <HiOutlineArrowRightOnRectangle className="text-base" />
              </div>
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
