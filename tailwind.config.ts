import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F1117",
          surface: "#171A24",
          raised: "#1D2130",
          border: "#2A2F42",
        },
        paper: {
          DEFAULT: "#EDEFF7",
          muted: "#9096B0",
          faint: "#5B6178",
        },
        indigo: {
          DEFAULT: "#6C8CFF",
          dim: "#4C63C9",
        },
        teal: {
          DEFAULT: "#43D9B8",
          dim: "#2FA98D",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
