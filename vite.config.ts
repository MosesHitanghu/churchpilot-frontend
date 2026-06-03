import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 9000,
    rolldownOptions: {
      output: {
        codeSplitting: {
          maxSize: 450 * 1024,
          groups: [
            {
              name: "geo-data",
              test: /node_modules[\\/]country-state-city[\\/]/,
              priority: 40,
            },
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
              priority: 30,
            },
            {
              name: "mui-vendor",
              test: /node_modules[\\/]@mui[\\/]/,
              priority: 20,
            },
            {
              name: "pdf-vendor",
              test: /node_modules[\\/]@react-pdf[\\/]/,
              priority: 20,
            },
            {
              name: "vendor",
              test: /node_modules[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});
