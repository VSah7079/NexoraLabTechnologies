import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ Import from config instead of hardcoding
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
          initial={mobile ? { opacity: 0, x: 30 } : false}
          animate={mobile ? { opacity: 1, x: 0 } : false}
          transition={mobile ? { delay: index * 0.07 } : undefined}
        >
          <NavLink
            to={item.path}
            onClick={() => {
              if (onClick) onClick();
            }}
            className={({ isActive }) => {
              if (mobile) {
                return `
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  px-5
                  py-4
                  text-base
                  font-medium
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "border-cyan-400/40 bg-cyan-50 text-cyan-600"
                      : "border-gray-200 bg-white text-gray-600 hover:border-cyan-400/30 hover:text-cyan-600 hover:bg-gray-50"
                  }
                `;
              }
              return `
                relative
                px-3
                py-2
                text-sm
                font-medium
                transition-all
                duration-300
                rounded-lg
                cursor-pointer
                ${
                  isActive
                    ? "text-cyan-600"
                    : "text-gray-600 hover:text-cyan-600 hover:bg-gray-50"
                }
              `;
            }}
          >
            {({ isActive }) => (
              <>
                <span>
                  {item.title}
                </span>
                {mobile && <span className="text-cyan-600 ml-2">→</span>}
                {!mobile && isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="
                      absolute
                      -bottom-0.5
                      left-0
                      h-[2.5px]
                      w-full
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      via-blue-500
                      to-violet-600
                    "
                  />
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