/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors:{
      // 'silver':'#b3b0aa',
      "white": "#ffffff",
      "black": "#000000",
      "red": "#BA2D0B",
      "green":"#28a745",
      "gris": "#F1F1F1",
      "Azure": "#1e54dd"
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

