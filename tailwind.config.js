const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f4e9e1'
      },
      fontFamily: {
        sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
        serif: ['"DM Serif Display"', ...defaultTheme.fontFamily.serif]
      }
    }
  },
  plugins: []
}
