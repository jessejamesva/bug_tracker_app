/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgb(255,255,255,0.18)",
        "light-peach": "rgb(235,182,158,0.5 )"
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    [require("tw-elements/dist/plugin.cjs")],
  ],
  // darkMode: "class"
}

