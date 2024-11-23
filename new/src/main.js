import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPersistedState } from 'pinia-plugin-persistedstate';
const pinia = createPinia();


pinia.use(createPersistedState({
  storage: sessionStorage, 
}));

const Vue = createApp(App)
Vue.use(pinia)
Vue.config.productionTip = false
Vue.use(ElementPlus)
Vue.use(store)
Vue.use(router)
Vue.mount('#app')
