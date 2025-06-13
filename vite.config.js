import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Content-Security-Policy": "default-src * 'self' blob: data: 'unsafe-inline' 'unsafe-eval'"
    },
    allowedHosts: ['.ngrok-free.app'],
    port: 5173,
    host: true
  }
})
