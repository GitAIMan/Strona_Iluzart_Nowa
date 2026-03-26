"use client";

import { useRef, useEffect, useCallback, RefObject } from "react";

export function useDragScroll(): {
  ref: RefObject<HTMLDivElement>;
} {
  const ref = useRef<HTMLDivElement>(null!);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    isDown.current = true;
    ref.current.style.cursor = "grabbing";
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDown.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    ref.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.cursor = "grab";
    el.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseUp);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove]);

  return { ref };
}
