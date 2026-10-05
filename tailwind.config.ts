import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── FONTS ── */
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body:    ["Epilogue", "system-ui", "sans-serif"],
      },

      /* ── COLORS ── */
      colors: {
        bg: {
          base:     "#0A0A0F",
          elevated: "#12121A",
          glass:    "rgba(255, 255, 255, 0.04)",
        },
        pulse: {
          red:    "#FF2D55",
          purple: "#7C3AED",
          green:  "#10F5A0",
          blue:   "#3B82F6",
          amber:  "#F59E0B",
        },
        story: {
          breaking:   "#FF2D55",
          developing: "#F59E0B",
          context:    "#3B82F6",
          impact:     "#7C3AED",
          resolved:   "#10F5A0",
        },
        text: {
          primary:   "#F8F8FF",
          secondary: "#94A3B8",
          muted:     "#475569",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          accent:  "rgba(255, 45, 85, 0.35)",
          purple:  "rgba(124, 58, 237, 0.35)",
        },
      },

      /* ── SPACING ── */
      spacing: {
        "4.5": "18px",
        "18":  "72px",
        "22":  "88px",
      },

      /* ── BORDER RADIUS ── */
      borderRadius: {
        sm:   "4px",
        md:   "8px",
        lg:   "16px",
        xl:   "24px",
        "2xl":"32px",
      },

      /* ── BACKDROP BLUR ── */
      backdropBlur: {
        xs: "4px",
        sm: "8px",
        md: "20px",
        lg: "40px",
      },

      /* ── ANIMATIONS ── */
      keyframes: {
        pulse_glow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.3", transform: "scale(1.8)" },
        },
        slide_up: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fade_in: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        pulse_glow: "pulse_glow 1.5s ease-in-out infinite",
        slide_up:   "slide_up 0.35s ease-out forwards",
        fade_in:    "fade_in 0.25s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
