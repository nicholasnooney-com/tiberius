const themeDir = __dirname;

module.exports = {
  plugins: {
    'postcss-import': {
      path: themeDir,
    },
    tailwindcss: {
      config: themeDir + '/tailwind.config.js',
    },
    autoprefixer: {},
  },
}
