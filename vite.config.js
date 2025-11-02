import { defineConfig } from 'vite'

// Use BASE_URL env variable if provided, otherwise use root path for production
const base = process.env.BASE_URL || '/'

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
})
