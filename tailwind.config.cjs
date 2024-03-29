/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        brand: "2px 2px black",
        "2-hard": "0px 2px black",
        "2-hard-slate": "0px 2px #D9D9D9",
        "4-hard": "0px 4px black",
        "2-left": "-2px 2px",
        "2-right": "2px 2px",
        "4-left": "-4px 4px",
        "4-right": "4px 4px",

        "toast-green": "0px 4px #22CA94, 0px 6px black",
        "toast-red": "0px 4px #FE5150, 0px 6px black",
        "4-right-border-green": "4px 4px #22CA94, 5px 5px black",
        "4-right-border-purple": "4px 4px #C8BEFD, 5px 5zpx black",
        "4-right-border-pink": "4px 4px #F8BED4, 5px 5px black",
        "4-right-border-blue": "4px 4px #4B83F9, 5px 5px black",
        achievment: "inset 0px -4px",
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
          lightGray: "#E5E5E5",
          orange: "#FDA16E",
          babyBlue: "#D0E6FA",
        },
        // background: "#F3F3F3",
        background: "#FDF5E5",
      },
      fontFamily: {
        "space-grotesk": "var(--space-grotesk)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        "collapsible-down": {
          from: { height: 0, opacity: 0 },
          to: { height: "var(--radix-collapsible-content-height)", opacity: 1 },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
            opacity: 1,
          },
          to: { height: 0, opacity: 0 },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.6s ease-out",
        "collapsible-up": "collapsible-up 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
