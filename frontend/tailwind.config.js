/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B3D2E",
        secondary: "#146C43",
        gold: "#D4AF37",
      },
    },
  },
  plugins: [],
};
