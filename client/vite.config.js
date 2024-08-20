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
import nodePolyfills from 'rollup-plugin-node-polyfills';  // Updated plugin

export default defineConfig({
  plugins: [
    react(),
    inject({
      util: 'util',
      process: 'process',
    }),
    nodePolyfills(),  // Updated to a more reliable plugin
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer',
      crypto: 'rollup-plugin-node-polyfills/polyfills/crypto',
      process: 'rollup-plugin-node-polyfills/polyfills/process',
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        nodePolyfills(),  // Ensures polyfills during the build
      ],
    },
  },
});

