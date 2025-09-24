import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8000', // Adjust to your backend server URL
        changeOrigin: true,
        secure: false, // If your backend uses self-signed certificates
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 Add this
    },
  },
    theme: {
    extend: {
      fontSize: {
        sm: '0.875rem',   // 14px
        base: '0.95rem',  // ~15px (default 16px se chhota)
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
})
