import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/backend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        "surface": "#111111",
        "surface-light": "#1a1a1a",
        foreground: "#f5f0e8",
        navy: {
          DEFAULT: "#1a1a5e",
          light: "#2a2a7e",
          dark: "#12123e",
          glow: "rgba(26, 26, 94, 0.4)",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#d4b96a",
          dark: "#a88a3a",
        },
        cream: "#f5f0e8",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "marquee": "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "loading-bar": "loadingBar 1.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(26, 26, 94, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(26, 26, 94, 0.4)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        loadingBar: {
          "0%": { width: "0%", opacity: "1" },
          "80%": { width: "90%", opacity: "1" },
          "100%": { width: "100%", opacity: "0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "navy-gradient": "linear-gradient(135deg, #12123e 0%, #1a1a5e 50%, #12123e 100%)",
        "gold-gradient": "linear-gradient(135deg, #a88a3a 0%, #c9a84c 50%, #d4b96a 100%)",
        "navy-radial": "radial-gradient(ellipse at center, rgba(26,26,94,0.15) 0%, transparent 70%)",
        "navy-spotlight": "radial-gradient(ellipse at top, rgba(26,26,94,0.2) 0%, transparent 60%)",
        "navy-to-dark": "linear-gradient(180deg, #12123e 0%, #0a0a0a 100%)",
        "navy-diagonal": "linear-gradient(135deg, rgba(18,18,62,0.4) 0%, rgba(26,26,94,0.15) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
