/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/images/cosmo.jpg')",
      },
      colors: {
        'custom-color': '#223030',
      },
      gridTemplateRows: {
        'articles': 'repeat(3, minmax(max-content, 1fr))',
      }
  },
  },
  plugins: [],
}

