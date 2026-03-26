import { cn } from "@shared/utils";

interface BadgeProps {
  variant: "success" | "draft" | "unread";
  children: React.ReactNode;
}

const variants = {
  success: "bg-green-900/30 text-green-400 border-green-800/50",
  draft: "bg-surface text-cream/50 border-white/10",
  unread: "bg-gold/10 text-gold border-gold/30",
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}
