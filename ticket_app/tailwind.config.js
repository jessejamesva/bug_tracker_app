/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgb(255,255,255,0.18)"
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
