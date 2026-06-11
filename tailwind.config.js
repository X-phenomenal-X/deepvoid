/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05070D",
        panel: "#0B0F1A",
        hairline: "#1C2436",
        starlight: "#E8EDF5",
        dim: "#8B96AB",
        telemetry: "#FFB35C",
        signal: "#5CC8FF"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      }
    }
  },
  plugins: []
};
