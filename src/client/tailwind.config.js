/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkolivegreen: '#556B2F', // Add your specific color here
      },
      extend: {
        transitionProperty: {
          'bg': 'background-color',
        },
        fontSize: {
          '5xl-custom': '5rem', // Define a custom font size class
        },
      },
    },
  },
  plugins: [],
}

