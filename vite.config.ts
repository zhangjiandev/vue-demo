import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/cesium/Build/Cesium', // 从 cesium 包复制静态资源
          dest: 'cesium', // 复制到目标目录
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      cesium: path.resolve(__dirname, 'node_modules/cesium/Build/Cesium'),
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    fs: {
      allow: ['..'], // 允许访问父目录（加载 Cesium 静态资源）
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables.scss" as *;`
      }
    }
  },
  build: {
    // Cesium 在打包时的处理配置
    rollupOptions: {
      output: {
        // Cesium 的静态资源路径
        manualChunks: {
          cesium: ['cesium'],
        },
      },
    },
  },
  publicDir: 'public', // 配置 Vite 的公共文件目录
}) 