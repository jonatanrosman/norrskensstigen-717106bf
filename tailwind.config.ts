import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6F1024",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "night-sky": "#0a0e27",
        "aurora-green": "#4ade80",
        "aurora-blue": "#60a5fa",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        elevated: "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)",
      },
      backgroundImage: {
        "gradient-winter": "linear-gradient(135deg, #0a0e27 0%, #1e3a5f 100%)",
        "gradient-frost": "linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        aurora: {
          "0%, 100%": {
            transform: "translateY(0) translateX(0) rotate(0deg)",
          },
          "33%": {
            transform: "translateY(-20px) translateX(10px) rotate(2deg)",
          },
          "66%": {
            transform: "translateY(10px) translateX(-10px) rotate(-2deg)",
          },
        },
        snowfall: {
          "0%": {
            transform: "translateY(-20px) translateX(0)",
          },
          "100%": {
            transform: "translateY(100vh) translateX(var(--drift))",
          },
        },
        "snowfall-slow": {
          "0%": {
            transform: "translateY(-20px) translateX(0) rotate(0deg)",
          },
          "100%": {
            transform: "translateY(100vh) translateX(var(--drift)) rotate(360deg)",
          },
        },
        "snowfall-fast": {
          "0%": {
            transform: "translateY(-20px) translateX(0)",
          },
          "100%": {
            transform: "translateY(100vh) translateX(var(--drift))",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        aurora: "aurora 8s ease-in-out infinite",
        snowfall: "snowfall var(--duration, 10s) linear infinite",
        "snowfall-slow": "snowfall-slow var(--duration, 15s) linear infinite",
        "snowfall-fast": "snowfall-fast var(--duration, 6s) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;