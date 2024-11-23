
import Vue from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NavigtionVue from '../components/navigtion.vue';
import Head from '../views/head/index.vue';
import More from '../views/more/index.vue';
import Createtool from '../views/creation/tool/index.vue'
import Createimg from '../views/creation/createimg/index.vue'
import Demo from '../views/demo/index.vue'
const routes: Array<RouteRecordRaw> = [
	{
		path:"/:catchAll(.*)",
		redirect:'/head'
	},
	{
		path:'/nanavigtionVue',
		component:NavigtionVue
	},
	{
		path:'/head',
		component:Head
	},
	{
		path:'/more',
		component:More
	},
	{
		path:'/createtool',
		component:Createtool
	},
	{
		path:'/createimg',
		component:Createimg
	},
	{
		path:'/demo',
		component:Demo
	},
	{
		path:'/editor',
		component:()=>import('@/views/editor/index.vue')
	},

];
 
const router = createRouter({
  history: createWebHistory(),
  routes,
});
 
// 在这里添加路由的导航守卫
router.beforeEach((to, from, next) => {
    console.log('Navigating to:', to.path);
    next();
  });
 
export default router;