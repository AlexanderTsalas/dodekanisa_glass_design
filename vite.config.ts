import path from "path"
import fs from "fs"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import type { Plugin } from 'vite'

// Post-build plugin: inline critical CSS using critters
function criticalCssPlugin(): Plugin {
  return {
    name: 'critical-css',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const Critters = (await import('critters')).default;
      const distPath = path.resolve(__dirname, 'dist');
      const htmlPath = path.join(distPath, 'index.html');

      if (!fs.existsSync(htmlPath)) return;

      const critters = new Critters({
        path: distPath,
        preload: 'swap',
        pruneSource: false,
      });

      const html = fs.readFileSync(htmlPath, 'utf-8');
      const inlined = await critters.process(html);
      fs.writeFileSync(htmlPath, inlined);
      console.log('\n✓ Critical CSS inlined successfully');
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react(), criticalCssPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-lenis': ['lenis', 'lenis/react'],
        },
      },
    },
  },
});
