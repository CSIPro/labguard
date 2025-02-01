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
        colorArrowBack: '#6C3E1B',
        bordercolororange: '#F99C0A',
        colorButtonOrange: '#FCA61F',
        colorhoverButton: '#f98d0a',
        colorhoverBrown: '#2f1716',
        textoLabs: '#40201E',
        colorColumn1: '#FFEEC5',
        colorNameUser: '#1C140D',
        backgroundTable: '#FFEEC5',
        buttonPrueba: '#F9C68A',
        selectorButton: '#FFE0BD',
        generalBorder: '#FF927444',
        cardsbg: '#fff3e6',
        colorLine: '#ece1d5'
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'], // nuevo: Se agrega la tipografía Poppins
      },
    },
  },
  plugins: [],
}
