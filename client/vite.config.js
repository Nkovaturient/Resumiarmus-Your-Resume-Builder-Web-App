// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })






import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'
import builtins from 'rollup-plugin-node-builtins';
import { NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill';
import {NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    builtins(),
    inject({
      util: 'util',
      //inject Buffer as global variable
      // Buffer:['buffer', 'Buffer'],
      process: 'process'
    }),
  ],
  optimizeDeps: {
    esbuildOptions:{
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  resolve: {
    alias: {
      util: 'rollup-plugin-node-builtins/polyfills/util',
      stream: 'rollup-plugin-node-builtins/polyfills/stream',
      // buffer: 'rollup-plugin-node-builtins/polyfills/buffer',
      process: 'process/browser'

    }
  }
});
