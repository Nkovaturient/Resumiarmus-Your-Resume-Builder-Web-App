// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })






import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),  // This will handle Node.js built-ins like stream and crypto
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      // Polyfill buffer and process during development
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
      // Use polyfills provided by rollup-plugin-polyfill-node
      stream: 'rollup-plugin-polyfill-node/polyfills/stream',
      util: 'rollup-plugin-polyfill-node/polyfills/util',
      buffer: 'rollup-plugin-polyfill-node/polyfills/buffer',
      crypto: 'rollup-plugin-polyfill-node/polyfills/crypto',
      process: 'rollup-plugin-polyfill-node/polyfills/process',
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        nodePolyfills(), // Ensure this plugin is included during the build
      ],
    },
  },
});

