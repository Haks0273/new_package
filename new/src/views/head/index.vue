<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<div style=" background: linear-gradient(#f9dafc,#fbf9fc);position: relative;left:-20px;height: 90vh;width: 100vw;">
				<span ref="title1" id="title1">包装设计进入</span>
				<span ref="title2" id="title2">AI时代</span>
				<div id="head-box">
					<input v-model="content" placeholder="请输入:" id="head-search" @keyup.enter.native="search" />
					<button id="head-botton" @click="search">发送</button>
				</div>
				<rollVue></rollVue>
				</div>
			</el-header>
			<el-main>
				<div style="position: absolute;top: 100vh;padding-bottom: 1000px;">
					<div id="main_box" style="padding-bottom: 30px;">
						<span style="font-weight: 1000;font-size: 50px;">AI生图</span><br />
						<span style="font-size: 30px;">创意无限</span>
					</div>
					<el-space wrap>
						<el-card v-for="(item,index) in img_list" :key="index" class="box-card" shadow="hover"
							style="width: 23.5vw;height: 40vh;">
							<router-link to="/createtool">
								<img :src="item" id="img1">
							</router-link>
						</el-card>
					</el-space>
				</div>
				<div style="position: absolute;top: 180vh;">
					<div id="main_box" style="padding-bottom: 30px;">
						<span style="font-weight: 1000;font-size: 50px;">思维碰撞</span><br />
						<span style="font-size: 30px;">创意无限</span>
					</div>
					<el-space wrap>
						<el-card v-for="(item,index) in head_more_list" :key="index" class="box-card" shadow="hover"
							style="width: 23.5vw;height: 30vh;">
							<router-link to="/more">
								<img :src="item.url" id="img2" v-bind:title="item.txt">
							</router-link>
						</el-card>
					</el-space>
				</div>
				<div id="head_bottom">
					<div style="position: relative;left: 7px; text-align: center;top: 90px;z-index: 100;">
						<router-link to="/more">
							<el-button style="width: 100px;height: 50px;border-radius: 30px;">
								<svg t="1730628489089" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4434" width="50" height="50"><path d="M835.920926 709.185988c38.736233-63.135946 60.438511-149.049664 60.438511-228.548276 0-229.402737-185.964412-415.372266-415.367149-415.372266-229.39762 0-415.368172 185.969529-415.368172 415.372266 0 229.398644 185.969529 415.367149 415.368172 415.367149 74.952063 0 145.265478-19.851117 205.973118-54.586223 31.038924-17.758456 173.628456 155.566078 246.050905 110.546745C1019.28614 898.334929 818.068326 738.276537 835.920926 709.185988zM301.696762 533.598924c-31.378661 0-56.814983-25.438369-56.814983-56.816007s25.436322-56.816007 56.814983-56.816007c31.379685 0 56.814983 25.438369 56.814983 56.816007S333.076446 533.598924 301.696762 533.598924zM479.332485 533.598924c-31.378661 0-56.81703-25.438369-56.81703-56.816007s25.438369-56.816007 56.81703-56.816007 56.814983 25.438369 56.814983 56.816007S510.711146 533.598924 479.332485 533.598924zM656.966161 533.598924c-31.377638 0-56.814983-25.438369-56.814983-56.816007s25.437345-56.816007 56.814983-56.816007c31.378661 0 56.81703 25.438369 56.81703 56.816007S688.344822 533.598924 656.966161 533.598924z" fill="#8a8a8a" p-id="4435" data-spm-anchor-id="a313x.search_index.0.i0.39963a81PExDVG" class="selected"></path></svg>
							</el-button>
						</router-link>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
	import rollVue from '../../components/roll.vue';
	import { onBeforeMount, reactive, ref } from 'vue';
	import img1 from './assets/1.png'
	import img2 from './assets/2.png'
	import img3 from './assets/3.png'
	import img4 from './assets/4.png'
	import { storeToRefs } from 'pinia';
	import { useMore_imgs } from '../../store';
	import router from '../../router';
	let content = ref('')
	let img_list = reactive([
		img1,
		img2,
		img3,
		img4
	])
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