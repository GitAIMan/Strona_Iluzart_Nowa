import { cn } from "@shared/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <p className="text-gold text-sm uppercase tracking-[0.2em] font-sans font-medium mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cream leading-tight">
        {title}
      </h2>
      <div
        className={cn(
          "w-12 h-0.5 bg-gold-gradient mt-6",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
