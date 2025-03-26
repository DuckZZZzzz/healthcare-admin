// vite.config.ts
import vue from '@vitejs/plugin-vue'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import removeConsole from "vite-plugin-remove-console";
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('echarts')) {
            return 'vendor-echarts';
          }
        },
      },
    },
  },
  plugins: [
    // ...
    [vue()],
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    removeConsole(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
    }),
    visualizer({ open: true,  gzipSize: true })
  ],
})