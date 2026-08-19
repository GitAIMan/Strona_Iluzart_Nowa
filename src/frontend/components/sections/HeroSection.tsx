"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@frontend/components/ui/Button";

const HERO_TITLE = "Magia i Humor Które Zachwycą Twoich Gości";
const CHAR_DELAY = 0.04;
const TYPING_START = 0.6;
const TYPING_DURATION = HERO_TITLE.length * CHAR_DELAY;
const CASCADE_START = TYPING_START + TYPING_DURATION + 0.3;

export default function HeroSection() {
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const check = () => {
      if (sessionStorage.getItem("iluzart-visited")) {
        setReady(true);
      } else {
        const interval = setInterval(() => {
          if (sessionStorage.getItem("iluzart-visited")) {
            setReady(true);
            clearInterval(interval);
          }
        }, 200);
        return () => clearInterval(interval);
      }
    };
    check();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image — zoom-in reveal */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={ready ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ y: parallaxY, willChange: "transform" }}
        className="relative w-full h-[65vh] md:h-[80vh] flex-shrink-0"
      >
        <Image
          src="/images/hero_elo.jpeg"
          alt="Iluzjonista Katowice - Grzegorz Pawleta IluzArt"
          fill
          sizes="100vw"
          className="object-cover object-[center_20%]"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.12)_0%,_transparent_70%)]" />
      </motion.div>

      {/* Content — staggered cascade */}
      <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center -mt-24 md:-mt-32 flex-grow flex flex-col justify-center ${ready ? "hero-typing-ready" : ""}`}>
        {/* Typing effect h1 — CSS-driven, word-wrapped for line breaks */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-cream leading-tight mb-6">
          {HERO_TITLE.split(" ").map((word, wi, words) => {
            const offset = words.slice(0, wi).reduce((a, w) => a + w.length + 1, 0);
            return (
              <span key={wi}>
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="hero-char"
                      style={{ animationDelay: `${TYPING_START + (offset + ci) * CHAR_DELAY}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 ? " " : null}
              </span>
            );
          })}
          <span
            className="hero-caret text-gold"
            style={{ animationDelay: `${TYPING_START + TYPING_DURATION}s` }}
          >
            |
          </span>
        </h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: CASCADE_START, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-cream/70 font-sans text-lg md:text-xl mb-6"
        >
          Grzegorz Pawleta • Ponad dekada na scenie • Iluzjonista Katowice i Śląsk
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: CASCADE_START + 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-cream/60 font-sans text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Od Bajki Pana Kleksa po kameralne wesela na Śląsku — łączę
          iluzję ze standup comedy, tworząc pokazy, o których Twoi goście
          będą opowiadać jeszcze długo po wydarzeniu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: CASCADE_START + 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center"
        >
          <Button variant="primary" size="lg" href="https://wa.me/48882011161">
            Sprawdź dostępność terminu
          </Button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: CASCADE_START + 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-cream/40 text-xs font-sans uppercase tracking-widest">
          Przewiń w dół
        </span>
        <motion.svg
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold/60"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
