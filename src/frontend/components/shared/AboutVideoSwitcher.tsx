"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const VIDEOS = [
  "https://pub-461768aab8564907a3f677968018aa28.r2.dev/about-video-2.mp4",
  "https://pub-461768aab8564907a3f677968018aa28.r2.dev/about-video.mp4",
];

export default function AboutVideoSwitcher() {
  const [activeA, setActiveA] = useState(true);
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(1);
  const refA = useRef<HTMLVideoElement | null>(null);
  const refB = useRef<HTMLVideoElement | null>(null);

  const handleEnded = useCallback(
    (who: "A" | "B") => {
      if (who === "A" && activeA) {
        // A skończyło — przełącz na B, A dostaje kolejny src
        setActiveA(false);
        setIndexA((i) => (i + 2) % VIDEOS.length);
        refB.current?.play().catch(() => {});
      } else if (who === "B" && !activeA) {
        setActiveA(true);
        setIndexB((i) => (i + 2) % VIDEOS.length);
        refA.current?.play().catch(() => {});
      }
    },
    [activeA]
  );

  useEffect(() => {
    refA.current?.play().catch(() => {});
    const warmupTimer = setTimeout(() => {
      if (refB.current) {
        refB.current.preload = "auto";
        refB.current.load();
      }
    }, 3000);
    return () => clearTimeout(warmupTimer);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-surface"
      style={{ aspectRatio: "4/5" }}
    >
      <video
        ref={refA}
        src={VIDEOS[indexA]}
        muted
        playsInline
        preload="auto"
        onEnded={() => handleEnded("A")}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out ${
          activeA ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />
      <video
        ref={refB}
        src={VIDEOS[indexB]}
        muted
        playsInline
        preload="metadata"
        onEnded={() => handleEnded("B")}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out ${
          !activeA ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />
    </div>
  );
}
