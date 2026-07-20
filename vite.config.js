import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icons/*.png"],
      manifest: {
        name: "Selah",
        short_name: "Selah",
        description:
          "A Catholic faith companion — Scripture and Saint quotes for every mood",
        theme_color: "#F0FDFA",
        background_color: "#F0FDFA",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        screenshots: [
          {
            src: "icons/screenshot-mobile.png",
            sizes: "1170x2532",
            type: "image/png",
            form_factor: "narrow",
            label: "Selah — Faith Companion",
          },
          {
            src: "icons/screenshot-desktop.png",
            sizes: "3024x1715",
            type: "image/png",
            form_factor: "wide",
            label: "Selah — Faith Companion",
          },
        ],
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
});
