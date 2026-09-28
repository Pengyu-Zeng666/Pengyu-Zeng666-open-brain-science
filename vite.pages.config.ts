import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Static build for GitHub Pages. PAGES_BASE is the repository path, e.g. "/my-repo/".
export default defineConfig({
  root: path.resolve(__dirname, "pages"),
  base: process.env.PAGES_BASE ?? "./",
  publicDir: path.resolve(__dirname, "public"),
  resolve: { alias: { "@": path.resolve(__dirname) } },
  plugins: [react()],
  build: { outDir: path.resolve(__dirname, "dist-pages"), emptyOutDir: true },
});
