"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@frontend/components/ui/Button";

export default function HeroSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for preloader to finish before animating hero
    const check = () => {
      if (sessionStorage.getItem("iluzart-visited")) {
        setReady(true);
      } else {
        // Preloader still running — poll
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
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image — zoom-in reveal */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={ready ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full h-[65vh] md:h-[80vh] flex-shrink-0"
      >
        <Image
          src="/images/hero_elo.jpeg"
          alt="IluzArt - Profesjonalna iluzja"
          fill
          className="object-cover object-[center_20%]"
          priority
          quality={90}
        />
        {/* Overlays on image */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(26,26,94,0.12)_0%,_transparent_70%)]" />
      </motion.div>

      {/* Content — staggered cascade */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center -mt-24 md:-mt-32 flex-grow flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl md:text-5xl lg:text-7xl font-serif text-cream leading-tight mb-6"
        >
          Profesjonalna Iluzja Która Zachwyci Twoich Gości
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-cream/70 font-sans text-lg md:text-xl mb-6"
        >
          Grzegorz Pawleta • 9 lat doświadczenia • Indywidualne
          podejście do każdego wydarzenia
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-cream/60 font-sans text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Od blisko dekady zgłębiam sztukę iluzji, tworząc
          niezapomniane doświadczenia dla moich klientów. Od 2016 roku
          profesjonalnie występuję na weselach, eventach firmowych i
          uroczystościach prywatnych, zawsze dostosowując pokaz do
          charakteru wydarzenia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" href="https://wa.me/48882011161">
            Sprawdź dostępność terminu
          </Button>
          <Button variant="secondary" size="lg" href="/oferta">
            Zobacz ofertę
          </Button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
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
