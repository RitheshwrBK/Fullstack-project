import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    proxy: {
      // 1. Catch any request starting with /api
      '/api': {
        // 2. Change this to match your EXACT backend server URL and port
        target: 'http://localhost:5500', 
        changeOrigin: true,
        secure: false,
      }
    }
  }
})


