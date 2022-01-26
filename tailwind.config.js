const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');

const themeDir = __dirname;


module.exports = {
  content: [themeDir + '/layouts/**/*.html', themeDir + '/assets/js/**/*.ts'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        noonblue: { DEFAULT: '#0080D8', },
      },
      fontFamily: {
        sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Noto Serif', ...defaultTheme.fontFamily.serif],
        mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
      },
      transitionProperty: {
        'width': 'width',
      }
    },
  },
  plugins: [
    forms,
    typography,
  ],
}
