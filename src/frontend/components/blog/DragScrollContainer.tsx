"use client";

import { ReactNode } from "react";
import { useDragScroll } from "@frontend/hooks/useDragScroll";
import { cn } from "@shared/utils";

interface DragScrollContainerProps {
  children: ReactNode;
  className?: string;
}

export default function DragScrollContainer({
  children,
  className,
}: DragScrollContainerProps) {
  const { ref } = useDragScroll();

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-6 overflow-x-auto pb-4",
        className
      )}
      style={{
        scrollbarWidth: "none",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {children}
    </div>
  );
}
