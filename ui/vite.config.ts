import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@helpers': path.resolve(__dirname, '../src/_helpers'),
      '@types': path.resolve(__dirname, '../src/_types.ts'),
    },
  },
})

