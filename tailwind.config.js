/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customCream: '#FFF1CE', // Color personalizado
        backgroundColor: '#FFF9F2',
        bordercolororange: '#F99C0A',
        colorButtonOrange: '#FCA61F',
      },
    },
  },
  plugins: [],
}
