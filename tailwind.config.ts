import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* === Visual Identity Tokens — "حلول بصير" === */
        /* Primary: Deep Ink — luxury, trust, depth */
        ink: "#0B1426",
        /* Secondary: Warm Stone — calm, eye-friendly backgrounds */
        stone: "#F4F1EA",
        /* Accent: Burnished Gold — bold highlight, CTAs */
        gold: "#C59D5F",
        "gold-hover": "#B88A4B",
        /* Surfaces */
        surface: "#FFFFFF",
        "surface-alt": "#FAF9F6",
        /* Borders */
        border: "#E7E9EE",
        "border-hover": "#D8DBE1",
        /* Text */
        text: "#121B2A",
        "text-light": "#2A3442",
        muted: "#6E7A8A",
        "muted-light": "#9AA5B1",
        /* Semantic */
        success: "#0E7C6B",
        error: "#B3404A",
        /* Legacy aliases for gradual migration */
        navy: "#0B1426",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "24px",
        xl: "40px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(11, 20, 38, 0.04), 0 1px 2px rgba(11, 20, 38, 0.02)",
        md: "0 4px 12px rgba(11, 20, 38, 0.06), 0 2px 4px rgba(11, 20, 38, 0.03)",
        lg: "0 12px 32px rgba(11, 20, 38, 0.08), 0 4px 8px rgba(11, 20, 38, 0.03)",
        xl: "0 20px 48px rgba(11, 20, 38, 0.10)",
      },
      spacing: {
        "3xs": "4px",
        "2xs": "8px",
        xs: "12px",
        sm: "16px",
        md: "24px",
        lg: "32px",
        xl: "48px",
        "2xl": "64px",
        "3xl": "80px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
      },
    },
    plugins: [],
  },
};

export default config;