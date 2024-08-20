// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [
    react(),
    inject({
      util: 'util',
      process: 'process',
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      stream: 'stream-browserify',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer',
      crypto: 'rollup-plugin-node-polyfills/polyfills/crypto',
      process: 'process/browser',
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Remove nodePolyfills since we are using specific packages for polyfills
      ],
    },
  },
});


