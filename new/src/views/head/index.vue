<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<div style=" background: linear-gradient(#f9dafc,#fbf9fc);position: relative;height: 90vh;width: 100%;">
				<span ref="title1" id="title1">包装设计进入</span>
				<span ref="title2" id="title2">AI时代</span>
				<div id="head-box">
					<input v-model="content" placeholder="请输入:" id="head-search" @keyup.enter.native="search" />
					<button id="head-botton" @click="search">发送</button>
				</div>
				<rollVue></rollVue>
				</div>
			</el-header>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
	import rollVue from '../../components/roll.vue';
	import { onBeforeMount, reactive, ref } from 'vue';

	import { storeToRefs } from 'pinia';
	import { useMore_imgs } from '../../store';
	import router from '../../router';
	let content = ref('')

	const usemore = useMore_imgs()
	const {head_more_list,Content} = storeToRefs(usemore)
	const {GetMore} = usemore
	onBeforeMount(()=>{
		GetMore()
	})
	const search =()=>{
		Content.value=content.value
		// console.log(Content.value)
		router.push('/more')
	}
</script>

<style scoped>
	#title1 {
		position: absolute;
		top: 17vh;
		left: 43vw;
		font-size: 40px;
		background: linear-gradient(to right, #100d12, #5a201d); 
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		color: linear-gradient();
		font-weight: 800;
	}

	#title2 {
		position: absolute;
		top: 25vh;
		left: 47vw;
		font-size: 35px;
		background: linear-gradient(to right,#a359ff, #ff9131);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		color: linear-gradient();
		font-weight: 1000;
	}

	#head-box {
		position: absolute;
		width: 700px;
		left: 33vw;
		top: 35vh;
	}

	#head-search {
		width: 520px;
		height: 50px;
		border-radius: 13px;

	}

	#head-botton {
		position: relative;
		left: -90px;
		top: 2px;
		width: 85px;
		height: 38px;
		border-radius: 8px;
	}

	#img1 {
		width: 21vw;
		height: 35vh;

	}
	#head_bottom{
		position: absolute;
		top: 255vh;
		width: 96vw;
		height: 60vh;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 30%); 
	}
	#img2{
		position: relative;
		left: -20px;
		top: -20px;
		width: 23.5vw;
		height: 30vh;
	}
</style>