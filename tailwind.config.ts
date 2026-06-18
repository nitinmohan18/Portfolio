import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/three/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
          50: "#f0efff",
          100: "#dddcff",
          200: "#c2bfff",
          300: "#9d98ff",
          400: "#7b71ff",
          500: "#6C63FF",
          600: "#5549f5",
          700: "#4638de",
          800: "#3b2fb4",
          900: "#342b90",
        },
        accent: {
          DEFAULT: "#38BDF8",
          purple: "#A78BFA",
          violet: "#7C3AED",
          teal: "#2DD4BF",
        },
        dark: {
          950: "#020409",
          900: "#030712",
          800: "#0a0f1e",
          700: "#0d1424",
          600: "#111827",
          500: "#1f2937",
          400: "#374151",
        },
        glass: "rgba(255,255,255,0.04)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        "hero-gradient":
          "linear-gradient(180deg, rgba(3,7,18,0) 0%, rgba(3,7,18,0.8) 60%, rgba(3,7,18,1) 100%)",
      },
      boxShadow: {
        glass: "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        glow: "0 0 20px rgba(108,99,255,0.4), 0 0 60px rgba(108,99,255,0.15)",
        "glow-sm": "0 0 10px rgba(108,99,255,0.3)",
        "glow-accent": "0 0 20px rgba(56,189,248,0.4)",
        card: "0 8px 32px rgba(0,0,0,0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "aurora": "aurora 8s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "typing-cursor": "blink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(108,99,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(108,99,255,0.7), 0 0 80px rgba(108,99,255,0.3)" },
        },
        aurora: {
          "0%, 100%": { opacity: "0.4", transform: "translateX(-5%) scaleY(1)" },
          "50%": { opacity: "0.8", transform: "translateX(5%) scaleY(1.1)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
