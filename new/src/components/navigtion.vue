<template>
  <el-menu
    ellipsis
    class="el-menu-popper-demo"
    mode="horizontal"
    :popper-offset="16"
    style="width: 100%;
	background-color: white;"
	:default-active="activeIndex"
  >
  
    <el-menu-item index="/head" style="width: 170px;" @click="$router.push('/head')">首页</el-menu-item>
	<el-sub-menu  :popper-offset="8">
	      <template #title >AI创作</template>
	      <el-menu-item index="/createtool" @click="$router.push('/createtool')">概念创作</el-menu-item>
	      <el-menu-item index="/createimg" @click="$router.push('/createimg')">图片创作</el-menu-item>
	</el-sub-menu>
	<el-menu-item index="/demo" style="width: 170px;" @click="$router.push('/demo')">素材生成</el-menu-item>
	<el-menu-item index="/more"style="width: 200px;padding-right: 100px;" @click="$router.push('/more')">探索</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();  
	 
	const activeIndex = computed(() => {  
	  return route.path
	})
</script>
<style scoped>
</style>