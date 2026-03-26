"use client";

import { useCallback, useRef } from "react";

export function useTripleClick(callback: () => void) {
  const clickTimestamps = useRef<number[]>([]);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    clickTimestamps.current = clickTimestamps.current.filter(
      (t) => now - t < 600
    );

    if (clickTimestamps.current.length >= 3) {
      clickTimestamps.current = [];
      callback();
    }
  }, [callback]);

  const handleTouchStart = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      callback();
    }, 3000);
  }, [callback]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  return {
    onClick: handleClick,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
  };
}
