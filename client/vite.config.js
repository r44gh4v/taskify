import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/auth': { target: 'http://localhost:5000', changeOrigin: true },
      '/tasks': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
});