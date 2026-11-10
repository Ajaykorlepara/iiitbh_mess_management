/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iiit: {
          blue: '#0d2b45',
          navy: '#13293d',
          accent: '#204060',
          gold: '#e09f3e',
          amber: '#f48c06',
          light: '#f7fafc',
          card: '#ffffff'
        }
      }
    },
  },
  plugins: [],
}
