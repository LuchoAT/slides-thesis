import { defineConfig } from 'vite';
import { cpSync } from 'fs';
import { resolve } from 'path';

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
    // Output goes to site/, not dist/. dist/ is the prebuilt reveal.js
    // library source (dist/reveal.js, dist/reveal.css, dist/theme/white.css,
    // dist/plugin/*.js) that index.html loads via relative "dist/..." paths.
    // If the build output were dist/ itself, index.html would end up
    // sitting inside the same folder it expects a "dist" subfolder under,
    // and those relative paths would 404 once deployed (e.g. on Vercel).
    outDir: 'site',
    rollupOptions: {
      input: 'index.html'
    }
  },
  plugins: [
    {
      name: 'copy-reveal-library-into-build-output',
      closeBundle() {
        // Mirror the prebuilt reveal.js library into site/dist/ so the
        // existing relative "dist/..." references in index.html keep
        // resolving correctly in the built output, without rewriting them.
        cpSync(resolve(__dirname, 'dist'), resolve(__dirname, 'site/dist'), {
          recursive: true
        });
      }
    }
  ]
});