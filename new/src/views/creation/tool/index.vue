<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="650px" style="padding-left: 30px;height: 88vh;">
				<el-card style="width: 600px;height: 83vh;position: relative;top:20px;">
					<div>
						<el-form label-width="auto" style="position: relative;left: -25px;">
							<div style="position: relative;top: 10px;">
								<span style="position: absolute;left: 25px;top: 10px;font-size: 18px;">包装模型</span>
								<button v-for="(tab,j) in tabs" @click="tabClick(j)" id="tool_tab">
									{{tab}}
								</button>
								<template v-if="1">
									<div style="position: absolute;left: 35px;top: 100px;">
										<el-space wrap>
											<el-card v-for="item in moudle_list" :key="item.id"
												style="width: 8vw;height: 24vh;" @click="get(item.txt,item.id)" :class="{ 'selected': item.id === specifiedId }" 
												shadow="hover">
												<img :src="item.url" id="img2" >
												<span style="font-size: 15px;">{{item.txt}}</span>
											</el-card>
										</el-space>
									</div>
								</template>
							</div>
							<div style="position: relative;top: 40vh;left: 35px;">
								<span>
									包装画面描述
								</span>
								<div>
									<el-input v-model="subscribe" style="width: 70.5vh;height: 70px;" maxlength="50"
										placeholder="Please input" show-word-limit type="text" autosize clearable />
								</div>
							</div>
							<div style="position: relative;top: 43vh;left: 35px;">
								<span>
									产品
								</span>
								<div>
									<el-input v-model="name" style="width: 70.5vh;height: 40px;" maxlength="10"
										placeholder="请输入产品名" show-word-limit type="text" autosize clearable />
								</div>
							</div>
							<el-form-item>
								<el-button type="primary"
									style="position: relative;left:57px;top: 47vh;width: 30vw;height: 40px;"
									@click="onSubmit">Create</el-button>
								<el-button type="primary" style="position: relative;top: 47vh;left: 70px;"
									@click="del">x</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-card>
			</el-aside>

			<el-main>
				<el-card style="border: dashed 1px;" id="tool_main">
					<div>
						<div v-if="key">
							<img src="https://www.xiaofang.design/assets/initial-YFlkWqyt.png" id="tool_main_img1" />
							<span id="tool_main_font" v-if=" key=1">在左侧输入你的创意想法！</span>
						</div>
						<div v-else>
							<img :src="Create_list" id="tool_main_img2">
						</div>
					</div>
				</el-card>
			</el-main>
		</el-container>
	</div>
</template>


<script lang="ts" setup>
	import { reactive, ref, watch } from 'vue'
	import { useMoudle_imgs } from '../../../store';
	import { storeToRefs } from 'pinia';
	import { useCreate_imgs } from '../../../store';
	const subscribe = ref('')
	const name = ref('')
	let index = ref(1)
	let model : string = ''
	let key = ref(1)
	let specifiedId = ref(0)
	let tabs = reactive([
		'包装盒',
		'精品盒',
		'手提袋',
		'包装袋',
		'包装瓶',
		'包装罐'
	])
	

	const useMoudle_img = useMoudle_imgs()
	const { moudle_list, i } = storeToRefs(useMoudle_img)
	const { GetMoudles } = useMoudle_img
	const useCreate_img = useCreate_imgs()
	const { Create_list } = storeToRefs(useCreate_img)
	const { GetCreateImg, Del } = useCreate_img
	GetMoudles()
	const tabClick = (j) => {
		index.value = (j + 1)
		i.value = index.value
		// console.log(index.value)
	}
	const get = (txt : string,id:number) => {
		model = txt
		specifiedId.value = id
	}
	const onSubmit = () => {
		let sub = subscribe.value
		let nam = name.value
		let data = { sub, nam, model }
		// console.log(data)
		GetCreateImg(data)
		key.value = 0
	}
	const del = () => {
		Del()
		key.value = 1
	}

	watch(index, () => {
		GetMoudles()
		// console.log(1)
	})
</script>

<style scoped>
	#tool_tab {
		position: relative;
		top: 55px;
		left: 25px;
		margin-right: 12.5px;
		border-radius: 10px;
		width: 60px;
		height: 30px;
	}

	#img2 {
		position: relative;
		left: -20px;
		top: -20px;
		width: 8vw;
		height: 15vh;
	}

	#tool_main {
		height: 83vh;
		border: dashed 1px;
		border-radius: 30px;
	}

	#tool_main_img1 {
		width: 30vw;
		height: 40vh;
		position: relative;
		left: 13vw;
		top: 14vh;
	}

	#tool_main_img2 {
		width: 52vw;
		height: 78vh;
		position: absolute;
		left: 45.3vw;
		top: 15vh;
	}

	#tool_main_font {
		position: relative;
		left: -8vw;
		top: 16vh;
	}

	.el-card {
		transition: all 0.3s ease;
	}

	.el-card:hover {
		cursor: pointer;
		/* 鼠标悬浮时变成小手 */
	}

	.el-card.selected {  
	            border: 2px dashed black; /* 选中状态添加黑色边框 */  
	            box-sizing: border-box; /* 确保内边距和边框被包含在内 */  
	        }  
</style>