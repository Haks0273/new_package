<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="400px">
				<el-card style="width: 360px;height: 85vh;position: absolute;left: 100px;top: 90px;border-radius: 20px;">
					<div style="position: relative;text-align: center;font-size: 20px;top: 10px;">
						<span>
							素材生成(未完善)
						</span>
					</div>
					<div>
						<span style="position: relative;top: 30px;">素材描述</span>
						<el-card style="width: 320px;position: relative;top: 5vh;max-height: 200px;" shadow="hover">
							<el-input v-model="text"
								style="width: 320px;height: 200px;position: relative;left: -20px;top: -20px;"
								maxlength="50" placeholder="您可以输入:菠萝,写实风格风车等" show-word-limit type="text" clearable
								class=" demo_input" />
						</el-card>
					</div>
					<div>
						<el-button type="primary" @click="onSubmit" style="position: relative;top:40vh;width: 20vw;height: 40px;left:7px;">一键生成</el-button>
					</div>
				</el-card>
			</el-aside>
			<el-main>
				<div style="width: 55vw;height:85vh;position: absolute;left: 35vw;" v-if="key">
					<el-card shadow="hover" style="width: 12vw;height: 30vh;position:absolute;left: 5vw;top: 25vh;">
						<img  src="../../assets/logo.png" id="demo_img1"/>
					</el-card>
					<el-card shadow="hover" style="width: 12vw;height: 30vh;position:absolute;left: 22vw;top: 25vh;">
						<img  src="../../assets/logo.png" id="demo_img1"/>
					</el-card>
					<el-card shadow="hover" style="width: 12vw;height: 30vh;position:absolute;left: 40vw;top: 25vh;">
						<img  src="../../assets/logo.png" id="demo_img1"/>
					</el-card>					
				</div>
				<div style="position: absolute;left: 35.2vw;top: 91px;" v-else>
					<img :src='demo_list' id="demo_img2"/>
				</div>
				<div style="position: absolute;left: 95vw;top: 100px;"v-if="!key">
					<el-button type="primary" style="position: relative;left: -70px;top: -12px;" @click="del">x</el-button>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDemo_imgs } from '../../store';
import { storeToRefs } from 'pinia';
	const useDemo = useDemo_imgs()
	let {demo_list} = storeToRefs(useDemo)
	let {GetDemoImg,Del} = useDemo
	let text =ref()
	let key = ref(1)
	const onSubmit = ()=>{
		let data = text.value
		if (data === undefined){
			alert("内容不能为空")
		}
		else{
			GetDemoImg({data})
			key.value = 0
		}		
		
	}
	const del = ()=>{
		Del()
		key.value = 1
	}
</script>

<style scoped>
/* 	.demo_input .el-input__inner {		
		padding-top: 10px;
		padding-left: 5px;
		text-align: left;
		vertical-align: top;
		position: relative;
	}
	.demo_input .el-input__inner::placeholder {
		  position: absolute;
		  top: -200px; 
		  left: 5px;
		  opacity: 1; 
	} */
	#demo_img1{
		position: relative;
		left: -20px;
		top: -10px;
		width: 12vw;
		height: 30vh;
	}
	#demo_img2{
		position: absolute;
		width: 55vw;
		height: 85vh;
	}
</style>