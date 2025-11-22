const { theme } = require("@sanity/demo/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    ...theme,
    fontFamily: {
      sans: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      serif: "var(--font-serif)",
      mono: "var(--font-mono)",
      inter: "var(--font-inter)",
      "inria-serif": "var(--font-inria-serif)",
    },
    extend: {
      colors: {
        navy: "#0E1C62",
        deepnavy: "#0C1D77",
      },
      maxWidth: {
        "screen-max": "1920px",
      },
      animation: {
        "shimmer-text-horizontal":
          "shimmer-text-horizontal 5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      keyframes: {
        "shimmer-text-horizontal": {
          "0%": {
            backgroundPosition: "-100% 0%",
          },
          "20%": {
            backgroundPosition: "100% 0%",
          },
          "100%": {
            backgroundPosition: "100% 0%",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
