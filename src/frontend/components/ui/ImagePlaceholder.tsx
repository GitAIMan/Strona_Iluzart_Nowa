import { cn } from "@shared/utils";

interface ImagePlaceholderProps {
  aspectRatio?: string;
  className?: string;
}

export default function ImagePlaceholder({
  aspectRatio = "16/9",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-gradient-to-br from-surface to-surface-light",
        className
      )}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-white/10"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
    </div>
  );
}
