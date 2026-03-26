"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

// ─── Curtain Panel (RED) ──────────────────────────────────────
function CurtainPanel({ side }: { side: "left" | "right" }) {
  const edgePath =
    side === "left"
      ? "M100,0 Q85,80 100,160 Q115,240 100,320 Q85,400 100,480 Q115,560 100,640 Q85,720 100,800 L100,800 L100,0 Z"
      : "M0,0 Q15,80 0,160 Q-15,240 0,320 Q15,400 0,480 Q-15,560 0,640 Q15,720 0,800 L0,800 L0,0 Z";

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Base deep red */}
      <div className="absolute inset-0" style={{ background: "#2a0606" }} />

      {/* Velvet folds — multiple layered gradients for 3D depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              rgba(120,20,20,0.4) 8px,
              rgba(80,10,10,0.7) 18px,
              rgba(140,30,30,0.3) 24px,
              rgba(60,8,8,0.8) 34px,
              rgba(100,18,18,0.5) 40px,
              transparent 50px
            )
          `,
        }}
      />

      {/* Radial highlights on each fold — simulates light hitting convex surfaces */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 10px,
              rgba(180,50,50,0.12) 16px,
              rgba(200,70,70,0.08) 20px,
              transparent 26px,
              transparent 50px
            )
          `,
        }}
      />

      {/* Vertical shading — darker at bottom, warm highlight at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(200,150,100,0.07) 0%,
            rgba(160,40,40,0.05) 15%,
            transparent 35%,
            rgba(0,0,0,0.15) 70%,
            rgba(0,0,0,0.4) 100%
          )`,
        }}
      />

      {/* Gold trim at top — theatrical curtain rod highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-3 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.05) 60%, transparent 100%)",
        }}
      />

      {/* Deep shadow at the inner edge */}
      <div
        className={`absolute top-0 bottom-0 w-24 pointer-events-none ${
          side === "left" ? "right-0" : "left-0"
        }`}
        style={{
          background:
            side === "left"
              ? "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.85) 100%)"
              : "linear-gradient(-90deg, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Outer edge shadow — fold gathers at the side */}
      <div
        className={`absolute top-0 bottom-0 w-12 pointer-events-none ${
          side === "left" ? "left-0" : "right-0"
        }`}
        style={{
          background:
            side === "left"
              ? "linear-gradient(-90deg, transparent, rgba(0,0,0,0.3))"
              : "linear-gradient(90deg, transparent, rgba(0,0,0,0.3))",
        }}
      />

      {/* SVG wavy edge — breathing folds */}
      <svg
        className={`absolute top-0 h-full w-[20px] ${
          side === "left" ? "-right-[10px]" : "-left-[10px]"
        }`}
        viewBox={side === "left" ? "80 0 40 800" : "-20 0 40 800"}
        preserveAspectRatio="none"
        fill="#0a0a0a"
      >
        <motion.path
          d={edgePath}
          animate={{
            d:
              side === "left"
                ? [
                    "M100,0 Q85,80 100,160 Q115,240 100,320 Q85,400 100,480 Q115,560 100,640 Q85,720 100,800 L100,800 L100,0 Z",
                    "M100,0 Q90,80 100,160 Q110,240 100,320 Q90,400 100,480 Q110,560 100,640 Q90,720 100,800 L100,800 L100,0 Z",
                    "M100,0 Q85,80 100,160 Q115,240 100,320 Q85,400 100,480 Q115,560 100,640 Q85,720 100,800 L100,800 L100,0 Z",
                  ]
                : [
                    "M0,0 Q15,80 0,160 Q-15,240 0,320 Q15,400 0,480 Q-15,560 0,640 Q15,720 0,800 L0,800 L0,0 Z",
                    "M0,0 Q10,80 0,160 Q-10,240 0,320 Q10,400 0,480 Q-10,560 0,640 Q10,720 0,800 L0,800 L0,0 Z",
                    "M0,0 Q15,80 0,160 Q-15,240 0,320 Q15,400 0,480 Q-15,560 0,640 Q15,720 0,800 L0,800 L0,0 Z",
                  ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

// ─── Rope Element ─────────────────────────────────────────────
function RopeElement() {
  return (
    <div className="flex flex-col items-center select-none">
      <div className="w-[2px] h-24 bg-gradient-to-b from-gold/60 via-gold to-gold/60 rounded-full" />
      <div className="relative">
        <div className="w-6 h-6 rounded-full bg-gold-gradient shadow-[0_0_20px_rgba(201,168,76,0.5)]" />
        <div className="w-3 h-10 bg-gradient-to-b from-gold to-gold-dark mx-auto rounded-b-full -mt-1" />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.5, 1] }}
        transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
        className="mt-5 text-xs text-cream/40 tracking-[0.25em] uppercase font-sans"
      >
        Pociągnij w dół
      </motion.p>
    </div>
  );
}

// ─── Logo Animation ───────────────────────────────────────────
function LogoAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Trigger exit after animations finish
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 120, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-[1px] bg-gold-gradient mb-8"
      />
      <div className="flex items-center overflow-hidden">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif text-cream tracking-wider"
        >
          Iluz
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif text-gold tracking-wider"
        >
          Art
        </motion.span>
      </div>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeInOut" }}
        className="absolute top-8 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
          width: "50%",
        }}
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
        className="mt-4 text-sm md:text-base font-sans text-cream/30 tracking-[0.3em] uppercase"
      >
        Profesjonalna Iluzja
      </motion.p>
    </div>
  );
}

// ─── Main Preloader ───────────────────────────────────────────
// Sequence: curtain-closed → rope → (user pulls) → opening → logo → done
type Phase = "show" | "curtain-closed" | "rope" | "opening" | "logo" | "fadeout" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("show");
  const autoOpenTimer = useRef<NodeJS.Timeout | null>(null);
  const ropeY = useMotionValue(0);
  const pulled = useRef(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("iluzart-visited");
    if (hasVisited) {
      setPhase("done" as Phase);
      return;
    }

    document.body.style.overflow = "hidden";

    // Curtain starts closed, show rope quickly
    setPhase("curtain-closed");
    const t1 = setTimeout(() => setPhase("rope"), 500);

    return () => clearTimeout(t1);
  }, []);

  // Auto-open fallback after 6s of rope visible
  useEffect(() => {
    if (phase === "rope") {
      autoOpenTimer.current = setTimeout(() => triggerOpen(), 4000);
    }
    return () => {
      if (autoOpenTimer.current) clearTimeout(autoOpenTimer.current);
    };
  }, [phase]);

  const triggerOpen = useCallback(() => {
    if (pulled.current) return;
    pulled.current = true;
    if (autoOpenTimer.current) clearTimeout(autoOpenTimer.current);
    setPhase("opening");
  }, []);

  const handleDrag = useCallback(
    (_: unknown, info: { offset: { y: number } }) => {
      if (info.offset.y > 80 && !pulled.current) {
        triggerOpen();
      }
    },
    [triggerOpen]
  );

  const handleTap = useCallback(() => {
    triggerOpen();
  }, [triggerOpen]);

  const handleLogoComplete = useCallback(() => {
    setPhase("fadeout" as Phase);
  }, []);

  const handleFadeoutComplete = useCallback(() => {
    setPhase("done" as Phase);
    document.body.style.overflow = "";
    sessionStorage.setItem("iluzart-visited", "true");
  }, []);

  if ((phase as string) === "done") return null;

  const showCurtains =
    phase === "curtain-closed" || phase === "rope" || phase === "opening";

  return (
    <AnimatePresence>
      {(phase as string) !== "done" && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[200]"
        >
          {/* Background — always dark */}
          <div className="absolute inset-0 bg-background" />

          {/* Magic portal loading — centered */}
          {(phase === "show" || phase === "curtain-closed") && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <motion.circle
                    cx="60" cy="60" r="50"
                    stroke="url(#goldGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="314"
                    initial={{ strokeDashoffset: 314 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c9a84c" />
                      <stop offset="50%" stopColor="#d4b96a" />
                      <stop offset="100%" stopColor="#a88a3a" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Inner pulsing ring */}
              <motion.div
                className="absolute"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <motion.circle
                    cx="40" cy="40" r="30"
                    stroke="rgba(26,26,94,0.5)"
                    strokeWidth="1"
                    strokeDasharray="188"
                    initial={{ strokeDashoffset: 188 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>

              {/* Center glow pulse */}
              <motion.div
                className="absolute w-16 h-16 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.4, 0.2, 0.4], scale: [0.5, 1, 0.9, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)",
                }}
              />

              {/* Sparkle dots orbiting */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-gold/60"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, Math.cos((i * Math.PI) / 2) * 55, Math.cos((i * Math.PI) / 2 + 1) * 45],
                    y: [0, Math.sin((i * Math.PI) / 2) * 55, Math.sin((i * Math.PI) / 2 + 1) * 45],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ filter: "blur(1px)" }}
                />
              ))}

              {/* Small text */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute mt-36 text-[10px] text-cream/30 uppercase tracking-[0.4em] font-sans"
              >
                IluzArt
              </motion.span>
            </div>
          )}

          {/* ── Curtains ── */}
          {showCurtains && (
            <>
              {/* Left curtain */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[52%] z-20"
                initial={{ x: "0%" }}
                animate={
                  phase === "opening" ? { x: "-110%" } : { x: "0%" }
                }
                transition={
                  phase === "opening"
                    ? { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }
                    : { duration: 1.0, ease: [0.4, 0, 0.2, 1] }
                }
              >
                <CurtainPanel side="left" />
              </motion.div>

              {/* Right curtain */}
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-[52%] z-20"
                initial={{ x: "0%" }}
                animate={
                  phase === "opening" ? { x: "110%" } : { x: "0%" }
                }
                transition={
                  phase === "opening"
                    ? { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }
                    : { duration: 1.0, ease: [0.4, 0, 0.2, 1] }
                }
                onAnimationComplete={() => {
                  if (phase === "opening") {
                    setPhase("logo");
                  }
                }}
              >
                <CurtainPanel side="right" />
              </motion.div>

              {/* Rope — visible when waiting for pull */}
              {phase === "rope" && (
                <motion.div
                  className="absolute left-1/2 top-[12%] -translate-x-1/2 z-30 cursor-grab active:cursor-grabbing touch-none"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 200 }}
                  dragElastic={0.15}
                  style={{ y: ropeY }}
                  onDrag={handleDrag}
                  onTap={handleTap}
                >
                  <motion.div
                    animate={{ rotate: [0, 1.5, -1.5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <RopeElement />
                  </motion.div>
                </motion.div>
              )}
            </>
          )}

          {/* ── Logo (after curtain opens) ── */}
          {phase === "logo" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <LogoAnimation onComplete={handleLogoComplete} />
            </motion.div>
          )}

          {/* ── Fadeout — logo blurs away, page emerges ── */}
          {phase === "fadeout" && (
            <motion.div
              initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              animate={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onAnimationComplete={handleFadeoutComplete}
              className="absolute inset-0 bg-background flex items-center justify-center z-10"
            >
              <div className="relative flex flex-col items-center">
                <div className="h-[1px] w-[120px] bg-gold-gradient mb-8" />
                <div className="flex items-center">
                  <span className="text-5xl md:text-7xl font-serif text-cream tracking-wider">
                    Iluz
                  </span>
                  <span className="text-5xl md:text-7xl font-serif text-gold tracking-wider">
                    Art
                  </span>
                </div>
                <p className="mt-4 text-sm md:text-base font-sans text-cream/30 tracking-[0.3em] uppercase">
                  Profesjonalna Iluzja
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
