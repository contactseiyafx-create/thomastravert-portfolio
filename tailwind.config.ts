import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        ink: {
          DEFAULT: "#050505",
          900: "#050505",
          800: "#0a0a0a",
          700: "#111111",
          600: "#151515",
          500: "#1a1a1a",
        },
        // Foreground
        bone: {
          DEFAULT: "#FFFFFF",
          dim: "#BEBEBE",
          muted: "#7A7A7A",
          line: "#222222",
        },
        // Single accent — electric pink
        signal: {
          DEFAULT: "#FF2E88",
          soft: "#FF6BAB",
          deep: "#B81F61",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        jp: ["var(--font-jp)", "var(--font-sans)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      fontSize: {
        // Display scale for the massive condensed titles
        "display-sm": ["clamp(3.5rem, 8vw, 6rem)", { lineHeight: "0.86", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(5rem, 12vw, 10rem)", { lineHeight: "0.84", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(7rem, 16vw, 15rem)", { lineHeight: "0.82", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(9rem, 20vw, 19rem)", { lineHeight: "0.8", letterSpacing: "-0.035em" }],
      },
      letterSpacing: {
        tighter2: "-0.04em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        cinema: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "shimmer": "shimmer 2.4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
