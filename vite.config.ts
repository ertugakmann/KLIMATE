import path from "path-browserify"; // path-browserify'yi doğru şekilde import edin
import "url-polyfill"; // URL modülü için polyfill
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// __filename ve __dirname'yi tarayıcı ortamında kullanmak için alternatif yöntem
const __filename = new URL(import.meta.url).pathname; // __filename gibi işlevsellik
const __dirname = path.dirname(__filename); // __dirname için path.dirname kullanımı

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // src dizinine alias tanımlaması
      path: "path-browserify", // Node.js path için polyfill
      url: "url-polyfill", // URL modülü için polyfill
    },
  },
  build: {
    outDir: "dist", // Build çıktısı için outDir
  },
});
