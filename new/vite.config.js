import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  server:{
    port: 3000, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
	proxy: {
	      '/api': {
	        target: 'http://localhost:8080',
	        changeOrigin: true,
			ws: true,
	        rewrite: (path) => path.replace(/^\/api/, '')
	      }
	    }
  }
});
