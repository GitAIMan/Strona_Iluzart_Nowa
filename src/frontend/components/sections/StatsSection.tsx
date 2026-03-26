"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { STATS } from "@shared/constants";

function AnimatedCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center py-8 px-6"
    >
      <div className="relative text-5xl md:text-6xl lg:text-7xl font-serif text-cream font-bold mb-2">
        <div className="absolute inset-0 blur-2xl bg-navy/20 rounded-full pointer-events-none" />
        <span className="relative">
          {count}
          <span className="text-gold">{suffix}</span>
        </span>
      </div>
      <p className="text-cream/60 font-sans text-sm md:text-base uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative bg-gradient-to-b from-navy-dark/20 via-surface to-surface py-16 md:py-20 overflow-hidden">
      {/* Navy Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.12)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center md:divide-x md:divide-gold/30">
          {STATS.map((stat, index) => (
            <div key={index} className="flex-1 w-full">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
