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
        colorLabsHeader: 'rgba(250, 234, 193, 0.74)', //Color header labs,
        backgroundColor: '#FFF9F2', //Color fondo
        colorArrowBack: '#6C3E1B',
        bordercolororange: '#F99C0A',
        colorButtonOrange: '#FCA61F',
        colorhoverButton: '#f98d0a',
        colorhoverBrown: '#43280a',
        textoLabs: '#40201E',
        headerTable: '#f7da96',
        colorNameUser: '#1C140D',
        backgroundTableBar: '#ffdf8f',
        backgroundTableHov: '#FFEEC5',
        buttonPrueba: '#F9C68A',
        selectorButton: '#FFE0BD',
        generalBorder: '#FF927444',
        hoverArrow: 'rgba(69, 43, 3, 0.68)',
        cardsbg: '#fff3e6',
        colorLine: '#ece1d5',
        linedividers: '#FF654321',
        buttonBrown:'#643b0e',
        colorOutline: '#f9c285',
        focusInputColor: '#feab478',
        confirmTextGreen: '#f2faf3',
        backgroundTable: '#fef8ea',
        tableLines: '#c68744',
        'brown': {
              50: '#efebe9',
              100: '#d7ccc8',
              200: '#bcaaa4',
              300: '#a1887f',
              400: '#8d6e63',
              500: '#795548',
              600: '#6d4c41',
              700: '#5d4037',
              800: '#4e342e',
              900: '#3e2723',
            },
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'], // nuevo: Se agrega la tipografía Poppins
      },
    },
  },
  plugins: [],
}
