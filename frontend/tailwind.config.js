/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './templates/**/*.html',
      './src/templates/**/*.html',
      './src/**/*.py',
      './src/static/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        base: '#DEE9EF',
      },
    },
  },
  plugins: [],
}

