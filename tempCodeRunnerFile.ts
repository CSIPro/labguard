import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Cambia esto por la URL de tu servidor backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
