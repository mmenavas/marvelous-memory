/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#333333',
      'darkGreen': '#286348',
      'green': '#41a376',
      'lightGreen': '#54f0a7',
      'orange': '#f08348',
      'blue': '#2153a3',
      'lightBlue': '#3c81f0',
      'darkBlue': '#163970',
    },
  },
  plugins: [],
}
