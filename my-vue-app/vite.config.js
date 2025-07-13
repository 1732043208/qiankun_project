import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

// https://vite.dev/config/
export default defineConfig({
  base: '/sub-vue', // 保证资源路径正确
  server: {
    port: 3002,
    cors: true, // 允许跨域
  },
  plugins: [
    vue(),
    qiankun('sub-vue', {
      useDevMode: true, // 开发模式下使用qiankun
    })
  ]
})
