/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customCream: '#FFF1CE', // Color header inicio
        colorNavHeaderPag: 'rgba(249, 156, 10, 0.57)',
        backgroundColor: '#FFF9F2', //Color fondo
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
