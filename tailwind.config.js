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
        colorhoverButton: '#f98d0a',
        textoLabs: '#40201E',
        colorNameUser: '#1C140D',
      },
    },
  },
  plugins: [],
}
