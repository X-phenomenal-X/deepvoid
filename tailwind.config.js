/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05070D",        // page background — deep blue-black, not pure black
        panel: "#0D1424",       // card surfaces — lifted so panels read against the void
        hairline: "#283452",    // borders — visible, defines the cards
        starlight: "#EDF2FA",   // primary text
        dim: "#9AA8C4",         // secondary text — higher contrast
        telemetry: "#FFB35C",   // amber accent — mission-control console amber
        signal: "#5CC8FF"       // cool blue for links/data highlights
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        hero: ["var(--font-hero)", "var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      }
    }
  },
  plugins: []
};
