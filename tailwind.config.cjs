/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "2-hard": "0px 2px",
        "4-hard": "0px 4px",
        "2-skew": "2px 2px",
        "4-skew": "4px 4px",
      },
      colors: {
        brand: {
          green: "#22CA94",
          blue: "#4B83F9",
          red: "#FE5150",
          pink: "#F8BED4",
          yellow: "#FDDD6D",
          purple: "#C8BEFD",
          white: "#FFFFFF",
          black: "#000000",
          gray: "#87898C",
        },
        // background: "#F3F3F3",
        background: "#FDF5E5",
      },
      fontFamily: {
        "space-grotesk": "var(--space-grotesk)",
      },
    },
  },
  plugins: [],
};
