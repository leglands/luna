import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: {
      '$sdk': path.resolve(__dirname, '../../life-sdk/web'),
    },
    dedupe: ['lucide-svelte']
  }
});
