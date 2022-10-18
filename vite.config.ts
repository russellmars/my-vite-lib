// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    target: 'es2015',
    minify: false,
    chunkSizeWarningLimit: 10,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'myViteLib',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      exclude: ['./src/global.d.ts'],
    }),
  ],
})
