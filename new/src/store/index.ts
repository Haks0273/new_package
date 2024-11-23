//index.ts文件
import { createPinia } from 'pinia';
//Pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useMore_imgs } from './mouldes/more_imgs';
import { useMoudle_imgs } from './mouldes/moudle_imgs';
import { useCreate_imgs } from './mouldes/create_imgs';
import { useDemo_imgs } from './mouldes/demo';
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

//对外暴露大仓库
export default pinia;
export{useMore_imgs,useMoudle_imgs,useCreate_imgs,useDemo_imgs}