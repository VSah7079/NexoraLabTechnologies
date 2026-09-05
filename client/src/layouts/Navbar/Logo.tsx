import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/NexoraLabTechnologies.png";

interface LogoProps {
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo = ({ className = "", onClick, size = "md" }: LogoProps) => {
  const heightClass =
    size === "sm"
      ? "h-9 sm:h-10"
      : size === "lg"
      ? "h-13 sm:h-15"
      : size === "xl"
      ? "h-16 sm:h-20"
      : "h-11 sm:h-12 md:h-13";

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`
        flex
        items-center
        group
        shrink-0
        ${className}
      `}
      aria-label="Nexora Lab Technologies Home"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        className="flex items-center"
      >
        <img
          src={logo}
          alt="Nexora Lab Technologies"
          className={`
            ${heightClass}
            w-auto
            max-w-[280px]
            object-contain
            drop-shadow-[0_0_16px_rgba(0,210,255,0.35)]
            transition-all
            duration-300
            group-hover:drop-shadow-[0_0_24px_rgba(0,210,255,0.6)]
          `}
        />
      </motion.div>
    </Link>
  );
};

export default Logo;