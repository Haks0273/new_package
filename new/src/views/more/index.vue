<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<div>
					<span id="more-font">包装探索</span>
				</div>
				<div id="more-box">
					<input v-model="content" :placeholder="place" id="more-search"   @keyup.enter.native="search"/>
					<button id="more-botton" @click="search">搜索</button>
				</div>
			</el-header>
			<el-main>
				<div style="position: absolute;top: 47vh;padding-bottom: 5vh;">
					<el-space wrap>
						<el-card v-for="(item,index) in more_list" :key="index" class="box-card"
							style="width: 23.5vw;height: 30vh;">
							<img :src="item.url" id="img2" v-bind:title="item.txt"/>
						</el-card>
					</el-space>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMore_imgs } from '../../store';
import { ref } from 'vue';
	let content = ref('')
	let place = ref('')
	const usemore = useMore_imgs()
	const {more_list,Content} = storeToRefs(usemore)
	const { GetMore,Search } = usemore
	if (Content.value === ''){
		place.value ='请输入关键字'
	}
	else{
	content.value=Content.value
	}
	GetMore()
	const search = () =>{
		if(content.value ===''){
			GetMore()			
		}
		else{
			let data = content.value
			Search({data})			
		}
	}
</script>

<style scoped>
	#more-box {
		position: absolute;
		left: 34.6vw;
		top: 25vh;

	}

	#more-search {
		position: absolute;
		width: 30vw;
		height: 50px;
		border-radius: 30px;
	}

	#more-botton {
		position: absolute;
		left: 24.7vw;
		top: 7px;
		width: 80px;
		height: 40px;
		border-radius: 20px;
	}

	#more-font {
		position: absolute;
		left: 46vw;
		top: 16vh;
		font-size: 30px;
	}

	#img2 {
		position: relative;
		left: -20px;
		top: -20px;
		width: 23.5vw;
		height: 30vh;
	}
</style>