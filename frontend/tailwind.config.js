const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'pastel-green': '#C5E8B7',
      'indigo': '#5c6ac4',
      'indigo-dark': '#202e78',
      'white': colors.white,
      'gray': colors.gray,
      'green': '#83D475',
      'dark-green': '#2EB62C',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
