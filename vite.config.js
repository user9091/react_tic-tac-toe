import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ✅ For correct asset paths on Vercel
  base: './',

  build: {
    outDir: 'dist',         // default, but explicit for clarity
    sourcemap: false,       // disable sourcemaps for smaller bundle
    chunkSizeWarningLimit: 1000 // silence warnings for larger bundles
  },

  server: {
    host: '127.0.0.1',
    port: 3000
  }
})