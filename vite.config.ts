import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import dts from 'vite-plugin-dts'
import { fileURLToPath, URL } from 'url'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import pkg from './package.json' assert { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ styles: process.env.NODE_ENV == 'production' ? 'none' : true }),
    dts(),
    AutoImport({
      imports: ['vue'],
      dts: './src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@root': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: pkg.name,
      fileName: (format) => `component-search-v3.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        'vuetify/lib',
        'vuetify/components',
      ],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
          pinia: 'pinia',
        },
      },
    },
  },
})
