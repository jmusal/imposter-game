import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Imposter Game',
        short_name: 'Imposter',
        description: 'A fun social deduction word game to play with friends',
        theme_color: '#7c3aed',
        background_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        scope: '/',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%237c3aed" width="192" height="192"/><text x="50%" y="50%" font-size="120" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-weight="bold">🕵️</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%237c3aed" width="512" height="512"/><text x="50%" y="50%" font-size="300" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-weight="bold">🕵️</text></svg>',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
        categories: ['games'],
        screenshots: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 720"><rect fill="%237c3aed" width="540" height="720"/><text x="50%" y="360" font-size="200" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-weight="bold">🕵️</text></svg>',
            sizes: '540x720',
            form_factor: 'narrow',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
