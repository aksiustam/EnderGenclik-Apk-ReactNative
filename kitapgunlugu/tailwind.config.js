/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },

      fontFamily: {
        gbold: ["Giorgio-Bold", "sans-serif"],
        gbolditalic: ["Giorgio-Bold-Italic", "sans-serif"],
        gextralight: ["Giorgio-ExtraLight", "sans-serif"],
        gextralightitalic: ["Giorgio-ExtraLight-Italic", "sans-serif"],
        glight: ["Giorgio-Light", "sans-serif"],
        glightitalic: ["Giorgio-Light-Italic", "sans-serif"],
        gmedium: ["Giorgio-Medium", "sans-serif"],
        gmediumitalic: ["Giorgio-Medium-Italic", "sans-serif"],
        gregular: ["Giorgio-Regular", "sans-serif"],
        gregularitalic: ["Giorgio-Regular-Italic", "sans-serif"],
        gthin: ["Giorgio-Thin", "sans-serif"],
        gthinitalic: ["Giorgio-Thin-Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
