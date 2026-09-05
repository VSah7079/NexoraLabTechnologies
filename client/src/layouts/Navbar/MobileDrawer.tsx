import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import {
  HiOutlineUser,
  HiOutlineSquares2X2,
  HiOutlineArrowRightOnRectangle,
  HiOutlineSparkles,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import Logo from "./Logo";
import NavbarLinks from "./NavbarLinks";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const { user, isAuthenticated, logout, getDashboardRoute, getProfileRoute } =
    useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    logout();
    toast.success("Signed out successfully", {
      theme: "dark",
      autoClose: 2000,
    });
    navigate("/");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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

  const roleInfo = roleDisplay(user?.role);
  const initials = getInitials(user?.name);
  const dashboardPath = getDashboardRoute();
  const profilePath = getProfileRoute();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[998]
              bg-black/75
              backdrop-blur-md
              lg:hidden
            "
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 220,
            }}
            className="
              fixed
              right-0
              top-0
              z-[999]
              flex
              h-screen
              w-[300px]
              sm:w-[340px]
              flex-col
              border-l
              border-white/[0.1]
              bg-[#060d1f]/98
              backdrop-blur-3xl
              shadow-2xl
              shadow-black/90
              text-white
              lg:hidden
            "
          >
            {/* Drawer Header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.08]
                px-5
                py-4
                bg-[#091228]/80
              "
            >
              <Logo onClick={onClose} />

              <div className="flex items-center gap-2">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.1]
                    bg-white/[0.04]
                    text-slate-300
                    transition-colors
                    hover:bg-white/[0.1]
                    hover:text-white
                  "
                  aria-label="Close Navigation"
                >
                  <HiXMark size={20} />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {/* Authenticated User Profile Summary Card */}
              {isAuthenticated && user && (
                <div className="rounded-2xl border border-white/[0.1] bg-[#0c1836]/90 p-3.5 shadow-lg relative overflow-hidden">
                  <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent" />
                  
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={`h-11 w-11 rounded-full object-cover ring-2 ${roleInfo.ringColor}`}
                      />
                    ) : (
                      <div
                        className={`
                          h-11 w-11
                          rounded-full
                          bg-gradient-to-tr ${roleInfo.gradient}
                          flex items-center justify-center
                          text-sm font-black text-white
                          ring-2 ${roleInfo.ringColor}
                        `}
                      >
                        {initials}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-bold text-white truncate font-['Outfit']">
                          {user.name}
                        </p>
                        <HiOutlineCheckBadge className="text-[#00D2FF] text-sm shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/[0.06]">
                    <span
                      className={`
                        inline-flex items-center gap-1
                        rounded-full border px-2 py-0.5
                        text-[10px] font-bold tracking-wide uppercase
                        ${roleInfo.badgeBg}
                      `}
                    >
                      <span>{roleInfo.icon}</span>
                      <span>{roleInfo.label}</span>
                    </span>

                    <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="flex flex-col gap-1.5">
                <NavbarLinks onClick={onClose} mobile={true} />
              </div>

              {/* Action Buttons Section */}
              <div className="pt-3 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    {/* Direct Dashboard Link */}
                    <Link
                      to={dashboardPath}
                      onClick={onClose}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-[#00D2FF]
                        via-[#0066FF]
                        to-[#7C3AED]
                        px-5
                        py-2.5
                        text-sm
                        font-bold
                        text-white
                        shadow-[0_0_20px_rgba(0,210,255,0.35)]
                        transition-all
                        hover:scale-[1.02]
                        active:scale-[0.98]
                      "
                    >
                      <HiOutlineSquares2X2 className="text-lg" />
                      <span>Open Dashboard Console</span>
                    </Link>

                    {/* View Profile */}
                    <Link
                      to={profilePath}
                      onClick={onClose}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.1]
                        bg-white/[0.04]
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-slate-200
                        transition-all
                        hover:bg-white/[0.08]
                        hover:text-white
                      "
                    >
                      <HiOutlineUser className="text-base text-cyan-400" />
                      <span>My Profile Details</span>
                    </Link>

                    {/* AI Feature Suite */}
                    <Link
                      to="/resume-analyzer"
                      onClick={onClose}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-purple-500/30
                        bg-purple-500/10
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-purple-300
                        transition-all
                        hover:bg-purple-500/20
                      "
                    >
                      <HiOutlineSparkles className="text-base" />
                      <span>AI Resume & ATS Checker</span>
                    </Link>

                    {/* Sign Out */}
                    <button
                      onClick={handleLogout}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-rose-500/30
                        bg-rose-500/10
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-rose-300
                        transition-all
                        hover:bg-rose-500/20
                        hover:text-rose-200
                      "
                    >
                      <HiOutlineArrowRightOnRectangle className="text-base" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={onClose}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.1]
                        bg-white/[0.04]
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-slate-200
                        transition-all
                        duration-200
                        hover:text-white
                        hover:border-cyan-400/50
                      "
                    >
                      Login
                    </Link>

                    <Link
                      to="/contact"
                      onClick={onClose}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-r
                        from-[#00D2FF]
                        via-[#0066FF]
                        to-[#7C3AED]
                        px-5
                        py-2.5
                        text-sm
                        font-bold
                        text-white
                        shadow-[0_0_20px_rgba(0,210,255,0.35)]
                        transition-all
                        duration-200
                        hover:scale-[1.02]
                        active:scale-[0.98]
                      "
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-white/[0.08] px-5 py-3.5 bg-[#091228]/80 text-center">
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                NexoraLab Technologies • Siwan, Bihar
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;