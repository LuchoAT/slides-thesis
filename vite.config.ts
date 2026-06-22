import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8080
  },
  // Without this, Vite's dependency scanner crawls every *.html file in the
  // project root (test/, examples/, demo.html, etc.), which are leftover
  // reveal.js library test pages that import "reveal.js"/"reveal.css" as bare
  // package specifiers. Those don't resolve here (the library is consumed via
  // the prebuilt dist/ files instead), so the scan fails. Scoping the scan and
  // the build to index.html avoids touching those files entirely.
  optimizeDeps: {
    entries: ['index.html']
  },
  build: {
    rollupOptions: {
      input: 'index.html'
    },
    // dist/ also holds the prebuilt reveal.js library files (dist/reveal.js,
    // dist/reveal.css, dist/theme/white.css, dist/plugin/*.js) that index.html
    // loads directly. Vite's default emptyOutDir:true would delete them.
    emptyOutDir: false
  }
});