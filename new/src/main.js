import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// const pinia  = createPinia()
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const Vue = createApp(App)
Vue.config.productionTip = false
Vue.use(ElementPlus)
Vue.use(store)
Vue.use(router)
Vue.mount('#app')
