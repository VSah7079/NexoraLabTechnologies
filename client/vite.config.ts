import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // ✅ Tailwind CSS v4
import path from 'path'

export default defineConfig({
  plugins: [
    react(),        // ✅ React support
    tailwindcss(),  // ✅ Tailwind CSS v4
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // ✅ Path alias for imports
    },
  },
  server: {
    host: true,     // ✅ Listen on all network interfaces
    port: 5173,     // ✅ Dev server port
    allowedHosts: [
      'b5b4-152-58-188-131.ngrok-free.app',
      '.ngrok-free.app',  // ✅ Allow all ngrok subdomains
      'localhost',
      '127.0.0.1'
    ],
    // Optional: Better HMR (Hot Module Replacement) for ngrok
    hmr: {
      host: 'b5b4-152-58-188-131.ngrok-free.app',
      protocol: 'wss',
      port: 5173
    },
    // Optional: CORS configuration if needed
    cors: {
      origin: 'https://b5b4-152-58-188-131.ngrok-free.app',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  },
  // Optional: Preview server config for production builds
  preview: {
    host: true,
    port: 4173,
    allowedHosts: [
      'b5b4-152-58-188-131.ngrok-free.app',
      '.ngrok-free.app',
      'localhost',
      '127.0.0.1'
    ]
  }
})