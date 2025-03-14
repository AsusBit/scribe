/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "scribe-yellow": "#F5F1E9",
      "scribe-brown": "#D4B675",
      "scribe-green": "#2D4B36",
      "scribe-gray": "#333333",
      "scribe-ivory": "#F9F5EC",

    },
    fontFamily: {
      "finlandica": "Finlandica",
      "book": "Gentium Book Plus"
    }
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} 