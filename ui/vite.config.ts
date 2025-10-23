import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/cavali-migrate/',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@helpers': path.resolve(__dirname, '../src/_helpers'),
      '@types': path.resolve(__dirname, '../src/_types.ts'),
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /src\/_helpers/],
    },
  },
})

