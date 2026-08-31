import { cn } from "../../lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText = ({
  children,
  className,
}: GradientTextProps) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
};

export default GradientText;