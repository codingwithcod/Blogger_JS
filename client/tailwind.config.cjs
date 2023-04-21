/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'half-transparent': 'rgba(0,0,0,0.4)',
        primary: '#F1F1F2',
      }
    },
  },
  plugins: [],
}
