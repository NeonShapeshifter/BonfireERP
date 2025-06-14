/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#FF4F00',
        light: '#F7F7F7',
        dark: '#333333',
      },
    },
  },
  plugins: [],
};