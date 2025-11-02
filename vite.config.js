import { defineConfig } from 'vite'

// Use BASE_URL env variable if provided, otherwise use tinypine-docs for production
const base = process.env.BASE_URL || (process.env.NODE_ENV === 'production' ? '/tinypine-docs/' : '/')

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
