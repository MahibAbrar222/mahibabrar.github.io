import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerender({
    routes: ['/', '/blog'],
    renderer: '@prerenderer/renderer-puppeteer',
    rendererOptions: {
      renderAfterElementExists: '#root'
    },
  })],
  base: '/'
})
