import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dnd Battle Viewer',
        short_name: 'Dnd Viewer',
        description: 'Viewer for battles in DnD',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/page_logo_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/page_logo_512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
