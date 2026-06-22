import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8080
  },
  build: {
    // dist/ also holds the prebuilt reveal.js library files (dist/reveal.js,
    // dist/reveal.css, dist/theme/white.css, dist/plugin/*.js) that index.html
    // loads directly. Vite's default emptyOutDir:true would delete them.
    emptyOutDir: false
  }
});