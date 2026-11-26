"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CONTACT } from "@shared/constants";

const HERO_TITLE = "Magia i humor, które zachwycą Twoich gości";
const CHAR_DELAY = 0.04;
const TYPING_START = 0.6;
const TYPING_DURATION = HERO_TITLE.length * CHAR_DELAY;
const CASCADE_START = TYPING_START + TYPING_DURATION + 0.2;
const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("iluzart-visited")) {
      setReady(true);
      return;
    }
    const interval = setInterval(() => {
      if (sessionStorage.getItem("iluzart-visited")) {
        setReady(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[82svh] md:min-h-[92vh] flex flex-col overflow-hidden">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={ready ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero_elo.jpeg"
          alt="Iluzjonista Katowice Grzegorz Pawleta z kartami na tle Katowic"
          fill
          sizes="100vw"
          priority
          quality={90}
          className="object-cover object-[78%_25%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,8,8,0.97)_0%,rgba(12,8,8,0.85)_40%,rgba(12,8,8,0.2)_75%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#0c0808_0%,transparent_45%)]" />
      </motion.div>

      <div
        className={`relative z-10 mt-auto w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-14 md:pb-20 pt-32 ${
          ready ? "hero-typing-ready" : ""
        }`}
      >
        <div className="max-w-2xl">
          <h1 className="font-serif text-cream">
            <motion.span
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="block font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-gold mb-4"
            >
              Iluzjonista Katowice
            </motion.span>
            <span className="block text-4xl sm:text-5xl lg:text-7xl leading-[1.05]">
              {HERO_TITLE.split(" ").map((word, wi, words) => {
                const offset = words
                  .slice(0, wi)
                  .reduce((a, w) => a + w.length + 1, 0);
                return (
                  <span key={wi}>
                    <span className="inline-block whitespace-nowrap">
                      {word.split("").map((char, ci) => (
                        <span
                          key={ci}
                          className="hero-char"
                          style={{
                            animationDelay: `${TYPING_START + (offset + ci) * CHAR_DELAY}s`,
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                    {wi < words.length - 1 ? " " : null}
                  </span>
                );
              })}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: CASCADE_START, duration: 0.7, ease: EASE }}
            className="mt-6 text-cream/80 font-sans text-base md:text-lg leading-relaxed max-w-xl"
          >
            Od ponad dziesięciu lat występuję na weselach, eventach i festynach
            na Śląsku. Łączę iluzję ze standup comedy, więc goście najpierw się
            śmieją, a chwilę później nie wierzą własnym oczom.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: CASCADE_START + 0.25, duration: 0.7, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <a
              href="#termin"
              className="inline-flex items-center justify-center rounded-md bg-gold px-7 py-4 font-sans font-semibold text-background transition-colors hover:bg-gold-light"
            >
              Sprawdź wolny termin
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="font-sans text-cream border-b border-cream/40 pb-0.5 hover:border-gold transition-colors"
            >
              Zadzwoń: 882 011 161
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
