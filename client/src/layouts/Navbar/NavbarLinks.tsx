import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks } from "@/config/navigation";

interface NavbarLinksProps {
  onClick?: () => void;
  mobile?: boolean;
}

const NavbarLinks = ({ onClick, mobile = false }: NavbarLinksProps) => {
  return (
    <>
      {navLinks.map((item, index) => (
        <motion.div
          key={item.title}
          initial={mobile ? { opacity: 0, x: 20 } : false}
          animate={mobile ? { opacity: 1, x: 0 } : false}
          transition={mobile ? { delay: index * 0.05, duration: 0.3 } : undefined}
          className={mobile ? "w-full" : "relative shrink-0"}
        >
          <NavLink
            to={item.path}
            end={item.path === "/"}
            onClick={() => {
              if (onClick) onClick();
            }}
            className={({ isActive }) => {
              if (mobile) {
                return `
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#7C3AED] text-white font-semibold shadow-md shadow-cyan-500/25"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }
                `;
              }
              return `
                relative
                inline-flex
                items-center
                justify-center
                px-3.5
                xl:px-4
                py-1.5
                text-xs
                xl:text-[13px]
                font-medium
                rounded-full
                transition-colors
                duration-200
                cursor-pointer
                select-none
                ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }
              `;
            }}
          >
            {({ isActive }) => (
              <>
                {/* Active Sliding Capsule for Desktop */}
                {!mobile && isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-gradient-to-r
                      from-[#00D2FF]
                      via-[#0066FF]
                      to-[#7C3AED]
                      shadow-[0_2px_14px_rgba(0,210,255,0.45)]
                    "
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}

                <span className="relative z-10">{item.title}</span>

                {mobile && (
                  <span className={`text-xs ${isActive ? "text-white" : "text-slate-500"}`}>
                    →
                  </span>
                )}
              </>
            )}
          </NavLink>
        </motion.div>
      ))}
    </>
  );
};

export default NavbarLinks;