interface SectionDividerProps {
  variant?: "glow" | "line";
}

export default function SectionDivider({ variant = "glow" }: SectionDividerProps) {
  if (variant === "line") {
    return (
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    );
  }

  return (
    <div className="relative h-px">
      <div className="absolute inset-x-0 -top-12 -bottom-12 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.15)_0%,_transparent_70%)]" />
      <div className="absolute inset-x-[20%] top-0 h-px bg-gradient-to-r from-transparent via-navy/30 to-transparent" />
    </div>
  );
}
