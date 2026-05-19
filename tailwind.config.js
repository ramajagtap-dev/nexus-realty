/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premiumNavy: '#1A2B49',
        premiumGold: '#C5A880',
        cardBg: '#243B62'
      }
    },
  },
  plugins: [],
}