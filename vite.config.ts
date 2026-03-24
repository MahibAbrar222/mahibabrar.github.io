import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
  //   prerender({
  //   routes: ['/', '/blog'],
  //   renderer: '@prerenderer/renderer-puppeteer',
  //   rendererOptions: {
  //     renderAfterDocumentEvent: 'render-event',
  //     renderAfterTime: 2000, // Wait for 2 seconds before capturing the page
  //   },
  // })
],
  base: '/',
  build: {
    outDir: 'build',
    target: 'es2019'
  }
})
