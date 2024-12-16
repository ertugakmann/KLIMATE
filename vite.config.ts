import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/KLIMATE/", // 'repository-name' kısmını kendi repo isminizle değiştirin
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      path: "path-browserify",
      url: "url-polyfill",
    },
  },
});