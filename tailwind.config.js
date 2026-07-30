/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1d5c2f',
        'primary-dark': '#143f21',
        accent: '#2e7d32',
        'founder-bg': '#0f1f12',
        'page-bg': '#f8faf7',
        ink: '#111111',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
