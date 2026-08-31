import { cn } from "../../lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 lg:py-28",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;