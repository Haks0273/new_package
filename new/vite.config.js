import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port: 3000, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
	proxy: {
	      '/api': {
	        target: 'http://localhost:8080',
	        changeOrigin: true,
			ws: true,
	        rewrite: (path) => path.replace(/^\/api/, '')
	      },
		//   '/sdapi':{
		// 	target:'http://localhost:7860',
		// 	changeOrigin:true,
		// 	rewrite: (path) => path.replace(/^\/sdapi/, ''),
		//   },
		  "/user": {
			target: "http://121.199.168.184:8080",  // 代理到 Spring Boot 应用
			changeOrigin: true,
		  },
	    }
  }
});
