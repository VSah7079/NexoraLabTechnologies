import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Try different paths - one of these will work

// Path 1: From src folder (if image is in src/assets/logo/)
import logo from "../../assets/logo/NexoraLabTechnologies.png";

// OR Path 2: From public folder (if image is in public/assets/logo/)
// import logo from "/assets/logo/NexoraLabTechnologies.png";

// OR Path 3: Direct from public folder
// const logo = "/NexoraLabTechnologies.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
  onClick?: () => void;
}

const Logo = ({ className = "", showText = true, onClick }: LogoProps) => {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`
        flex
        items-center
        gap-2.5
        group
        ${className}
      `}
      aria-label="Nexora Lab Technologies Home"
    >
      {/* Logo Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        className="flex items-center justify-center shrink-0"
      >
        <img
          src={logo}
          alt="Nexora Lab Technologies"
          className="
            h-10
            w-auto
            object-contain
            transition-all
            duration-300
            xs:h-11
            sm:h-10
            md:h-12
            lg:h-14
            xl:h-16
          "
        />
      </motion.div>

      {/* Company Name */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="
            hidden
            xs:flex
            flex-col
            leading-tight
          "
        >
          <span
            className="
              text-base
              font-extrabold
              text-gray-900
              tracking-tight
              sm:text-base
              md:text-lg
              lg:text-xl
            "
          >
            NexoraLab
          </span>
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-cyan-600
              font-semibold
              sm:text-[8px]
              md:text-[9px]
              lg:text-[10px]
            "
          >
            Technologies
          </span>
        </motion.div>
      )}
    </Link>
  );
};

export default Logo;