import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "LiBox",
        short_name: "LiBox",
        theme_color: "#111827",
        description: "Organize and Store your personal files easily",
        background_color: "#111827",
        icons: [
          {
            src: "pwa/maskable_icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "pwa/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa/android-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any",
          },
        ],
        shortcuts: [
          {
            name: "Profile",
            url: "/u/dashboard/profile",
            icons: [
              {
                src: "pwa/android-icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
              },
            ],
          },
          {
            name: "Drive",
            url: "/u/dashboard",
            icons: [
              {
                src: "pwa/android-icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
              },
            ],
          },
        ],
      }
    }),
  ],
  server: {
    port: 3000
  }
});
