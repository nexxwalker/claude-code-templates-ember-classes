import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://emberspack-inc.vercel.app',
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'cloudflare-react-dom-server',
        config(_config, { command }) {
          if (command === 'build') {
            return {
              resolve: {
                alias: [
                  { find: /^react-dom\/server$/, replacement: 'react-dom/server.node' },
                ],
              },
              ssr: { noExternal: ['react-dom'] },
            };
          }
        },
      },
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    ssr: {
      external: ['node:fs', 'node:path', 'node:url', 'node:stream'],
    },
  },
});
