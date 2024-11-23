<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="400px">
				<el-card style="width: 360px;height: 85vh;position: absolute;left: 100px;top: 90px;border-radius: 20px;">
					<div style="position: relative;text-align: center;font-size: 20px;top: 10px;">
						<span>
							图片生成(未完善)
						</span>
					</div>
					<div>
						<span style="position: relative;top: 30px;">需求描述</span>
						<el-card style="width: 320px;position: relative;top: 5vh;max-height: 200px;" shadow="hover">
							<el-input v-model="text"
								style="width: 320px;height: 200px;position: relative;left: -20px;top: -20px;"
								maxlength="50" placeholder="您可以进行描述:" show-word-limit type="text" clearable
								class=" demo_input" />
						</el-card>
					</div>
					<span style="position: relative;top: 60px;font-size: 17px;">图片参考</span>
					<el-card style="position: absolute;width: 320px;top: 48vh;height: 23vh;">
						  <el-upload
						    class="avatar-uploader"
						    action=""
						    :show-file-list="false"
						    :on-success="handleAvatarSuccess"
						    :before-upload="beforeAvatarUpload"
							
						  >
						    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
						    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
						  </el-upload>
					</el-card>
					<div>
						<el-button type="primary" @click="onSubmit" style="position: relative;top:37vh;width: 20vw;height: 40px;left:7px;">一键生成</el-button>
					</div>
				</el-card>
			</el-aside>
			<el-main>
				<div style="width: 55vw;height:85vh;position: absolute;left: 35vw;" v-if="key">
					<el-card shadow="hover" style="width: 12vw;height: 30vh;position:absolute;left: 5vw;top: 25vh;">
						<img  src="" id="demo_img1"/>
					</el-card>
					<el-card shadow="hover" style="width: 12vw;height: 30vh;position:absolute;left: 22vw;top: 25vh;">
						<img  src="" id="demo_img1"/>
					</el-card>
					<el-card shadow="hover" style="width: 12vw;height: 30vh;position:absolute;left: 40vw;top: 25vh;">
						<img  src="" id="demo_img1"/>
					</el-card>					
				</div>
				<div style="position: absolute;left: 35.2vw;top: 91px;" v-else>
					<img :src='Create_list' id="demo_img2"/>
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
import { useCreate_imgs } from '../../../store';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
	const useimg = useCreate_imgs()
	let {Create_list} = storeToRefs(useimg)
	let {CreateImg,Del} = useimg
	let text =ref()
	let key = ref(1)
	const onSubmit = ()=>{
		let data = text.value
		let url = imageUrl.value
		CreateImg({data,url})
		key.value = 0
	}
	const del = ()=>{
		Del()
		key.value = 1
	}
	const handleAvatarSuccess: UploadProps['onSuccess'] = (
	  response,
	  uploadFile
	) => {
	  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
		console.log(imageUrl.value)
	}
	const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	  if (rawFile.type !== 'image/jpeg') {
	    ElMessage.error('Avatar picture must be JPG format!')
	    return false
	  } else if (rawFile.size / 1024 / 1024 > 2) {
	    ElMessage.error('Avatar picture size can not exceed 2MB!')
	    return false
	  }
	  return false
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
		top: -20px;
		width: 12vw;
		height: 30vh;
	}
	#demo_img2{
		position: absolute;
		width: 55vw;
		height: 85vh;
	}
	.avatar-uploader .avatar {
	  width: 178px;
	  height: 178px;
	  display: block;
	}
	.avatar-uploader{
		position: absolute;
		left: -0px;
		top: -0px;
	}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 318px;
  height: 22.8vh;
  text-align: center;
}
</style>