// Compilación de la app del teléfono (Android). Genera una web estática en ./www que
// Capacitor mete dentro del APK. La versión web publicada sigue usando vite.config.ts.
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: false,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.native.gen.ts",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: [
      // Las funciones de servidor (admin) no existen dentro del APK.
      { find: /^@\/components\/app\/admin-panel$/, replacement: path.resolve(__dirname, "src/native/admin-panel-stub.tsx") },
      { find: /^@\//, replacement: path.resolve(__dirname, "src") + "/" },
    ],
  },
  build: {
    outDir: "www",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: { input: path.resolve(__dirname, "native.html") },
  },
});
