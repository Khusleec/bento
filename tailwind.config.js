/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jura', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        accent: '#00f5d0',
      },
    },
  },
  plugins: [],
}
