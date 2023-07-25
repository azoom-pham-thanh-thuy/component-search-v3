import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'url'
import path from 'path'
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    // cssInjectedByJsPlugin({ topExecutionPriority: false })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@root': fileURLToPath(new URL('.', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: pkg.name,
      // formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `component-search-v3.${format}.js`,
    },
    rollupOptions: {
      // input: {
      //   main: path.resolve(__dirname, 'src/components/main.ts')
      // },
      external: [...Object.keys(pkg.dependencies || {})],
      output: {
        // format: 'iife',
        globals: { vue: 'Vue', vuetify: 'Vuetify' },
        // assetFileNames: (assetInfo) => (
        //   assetInfo.name == 'style.css' ? 'component-search-v3.css' : assetInfo.name
        // ),
      },
    },
    // cssCodeSplit: false
  },
})
