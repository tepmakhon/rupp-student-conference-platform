/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#014421",
        secondary: "#10B981",
        gold: "#D4AF37",
      },
    },
  },
  plugins: [],
}