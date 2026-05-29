import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  safelist: [
    // Color swatch dots — built dynamically at runtime in ProductCard
    "bg-[#f5e9d4]", "bg-[#7d2b2b]", "bg-[#c0392b]", "bg-[#1a1410]",
    "bg-[#1e3a8a]", "bg-[#2563eb]", "bg-[#2dd4bf]", "bg-[#15803d]",
    "bg-[#eab308]", "bg-[#ea580c]", "bg-[#ec4899]", "bg-[#e8dab7]",
    "bg-[#92400e]", "bg-[#9ca3af]",
  ],
  theme: {
    container: { center: true, padding: "1.25rem" },
    extend: {
      colors: {
        // Cream / ivory neutrals
        cream: {
          50: "#fdfaf4",
          100: "#faf5ea",
          200: "#f3ead4",
          300: "#e8dab7",
          400: "#d4bf8a",
        },
        // Deep textile maroon — primary brand
        maroon: {
          50: "#fbf4f4",
          100: "#f5e3e3",
          200: "#ecc6c6",
          300: "#dd9999",
          400: "#c96868",
          500: "#b14545",
          600: "#993434",
          700: "#7d2b2b",
          800: "#682727",
          900: "#5a2424",
          950: "#321010",
        },
        // Antique gold accent
        gold: {
          DEFAULT: "#b8860b",
          light: "#d4a72c",
          dark: "#8a6508",
        },
        // Charcoal text
        ink: {
          DEFAULT: "#1a1410",
          soft: "#3d3530",
          muted: "#7a6f68",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(82, 33, 33, 0.12)",
        warm: "0 12px 40px -12px rgba(184, 134, 11, 0.25)",
        crisp: "0 1px 0 0 rgba(26, 20, 16, 0.08)",
      },
      backgroundImage: {
        "weave-light":
          "repeating-linear-gradient(45deg, rgba(184,134,11,0.04) 0px, rgba(184,134,11,0.04) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(-45deg, rgba(125,43,43,0.03) 0px, rgba(125,43,43,0.03) 1px, transparent 1px, transparent 8px)",
        "weave-dark":
          "repeating-linear-gradient(45deg, rgba(212,167,44,0.08) 0px, rgba(212,167,44,0.08) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(-45deg, rgba(212,167,44,0.06) 0px, rgba(212,167,44,0.06) 1px, transparent 1px, transparent 10px)",
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      letterSpacing: {
        "wider-x": "0.18em",
        "widest-x": "0.32em",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
