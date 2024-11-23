<template>
	<div class="container">
		<el-container>
			<!-- 左侧输入区域 -->
			<el-aside width="450px" class="sidebar">
				<el-card class="card" style="border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); padding: 10px 15px;">
					<el-form label-width="auto" class="form">
						<h5>包装模型</h5>
						<div class="tagscontainer">
							<!-- 标签区域 -->
							<div class="tags">
								<el-tag
								v-for="(item, index) in tabs"
								:key="index"
								:type="selectedTab === item ? 'success' : 'info'"
								@click="selectTab(item)"
								class="tag"
								>
								{{ item.name }}
								</el-tag>
							</div>

							<!-- 内容区域 -->
							<div class="tab-content">
								<div class="small-tag-container">
									<div
									v-for="item in selectedTab?.items || []"
									:key="item.name"
									@click="selectItem(item)"
									:class="['small-tag', { 'selected': selectedItem === item }]"
									>
									<img :src="item.img" alt="tag-img" class="tag-img" />
									<div class="message">{{ item.name }}</div>
									</div>
								</div>
							</div>
						</div>

						<h5>包装画面描述</h5>
						<el-input
							v-model="inputValue"
							size="small"
							type="textarea"
							placeholder="请输入内容"
							rows="6"
							style="margin-bottom: 20px; border-radius: 8px;"
						/>
						<el-form-item>
							<el-button type="primary" :disabled="buttonDisabled" @click="start" style="width: 100%; padding: 10px; border-radius: 8px;">
								生成
							</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-aside>

			<!-- 右侧展示区域 -->
			<el-main style="padding: 20px;">
				<el-card class="tool-main" v-if="key" style="border-radius: 10px;">
					<div class="image-container">
						<!-- 图片列表 -->
						<div
							v-for="(img, index) in Create_list"
							:key="index"
							class="image-wrapper"
						>
							<div
							class="image-card"
							@mouseover="hoveredIndex = index"
							@mouseleave="hoveredIndex = null"
							@click="showImagePreview(img)"
							:class="{ 'selected': hoveredIndex === index }"
							>
							<img :src="img" class="image" />
							</div>
						</div>

						<!-- 图片弹出层 -->
						<div v-if="showimg" class="overlay" @click="showimg = false">
							<div class="popup-content">
							<img :src="Img" class="full-image" />
							<div class="image-info">
								<h2>图片详情</h2>
								<p>这里可以添加图像描述信息...</p>
							</div>
							</div>
						</div>
					</div>
				</el-card>
			</el-main>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, watch, toRefs } from 'vue'
	import { useMoudle_imgs } from '../../../store';
	import { storeToRefs } from 'pinia';
	import { useCreate_imgs } from '../../../store';
	import { txt2imgAPI,checkTaskStatus,transAPI } from '@/api/txt2img';
	import can from '@/assets/can.png';
	import canning from '@/assets/canning.png';
	import Insert_lock_card from '@/assets/Insert_lock_card.png';
	import plasticBottle from '@/assets/plasticBottle.png';
	import jar from '@/assets/jar.png';
	import octagonal_seal_bag from '@/assets/octagonal_seal_bag.png';
	import stand_up_pouch from '@/assets/stand_up_pouch.png';
	import three_side_seal_bag from '@/assets/three_side_seal_bag.png';
	import { ElNotification } from 'element-plus';

	const hoveredIndex = ref(null);
    const showimg = ref(false);
    const Img = ref('');
    const showImagePreview = (img) => {
      Img.value = img;
      showimg.value = true;
    };

	const selectedItem = ref(null); // 当前选中的小标签
	function selectItem(item) {
		selectedItem.value = item;
	}
	const selectTab = (tab) => {
	selectedTab.value = tab;
	};

	const inputValue = ref('设计风格：复古 \n设计元素：蓝莓的线描画插画\n主题配色：蓝白色清新');
	const subscribe = ref('')
	const name = ref('')
	let index = ref(1)
	let model : string = ''
	let key = ref(1)
	let specifiedId = ref(0)
	const tabs = reactive([
	{
		name: '包装盒/箱',
		items: [
		{
			name: "插锁卡盒",
			img: Insert_lock_card,
			code: '<lora:Insert_lock_card2-000000:1>'
		},
		]
	},
	{
		name: '包装袋',
		items: [
		{
			name: "自立袋",
			img: stand_up_pouch,
			code: '<lora:stand-up_pouch2:1>,'
		},
		{
			name: "三边封袋",
			img: three_side_seal_bag,
			code: '<lora:three-side_seal_bag2:1>,'
		},
		{
			name: "八边封袋",
			img: octagonal_seal_bag,
			code: '<lora:octagonal_seal_bag2:1>,'
		}
		]
	},
	{
		name: '包装瓶',
		items: [
		{
			name: "矿泉水瓶",
			img: plasticBottle,
			code: '<lora:pb2-000000:1>,bottle'
		},
		{
			name: "果酱瓶",
			img: jar,
			code: '<lora:gb2-000000:1>,'
		}
		]
	},
	{
		name: '包装罐',
		items: [
		{
			name: "塑料罐",
			img: canning,
			code: '<lora:canning2-000000:1>,'
		},
		{
			name: "易拉罐",
			img: can,
			code: '<lora:can2-000000:1>,'
		}
		]
	}
	]);
	const selectedTab = ref(tabs[0]);

	// const getLorasData = async() => {
    // const res = await getLoras();
	// 	lorasList = res.map((item) =>{
	// 		return{
	// 			name : item.name,
	// 			val : item.val,
	// 			selected : false,
	// 		}
	// 	});
	// };
	const buttonDisabled = ref(false);
	const useMoudle_img = useMoudle_imgs()
	const { moudle_list, i } = storeToRefs(useMoudle_img)
	const { GetMoudles } = useMoudle_img
	const useCreate_img = useCreate_imgs()
	const { Create_list } = storeToRefs(useCreate_img)
	const { GetCreateImg, Del } = useCreate_img
	GetMoudles()
	const params = reactive({
	    prompt: "",
		negativePrompt: "",
		width: 512,
		height: 512,
		steps: 20,
		seed: -1,
		batchSize: 1,
	})
	const { prompt } = toRefs(params);

	const start = async() => {
		let str = inputValue.value.replace(/[\r\n]/g, ', ');
		const res = await transAPI(str);
		if(selectedItem.value == null){
			ElNotification({
				title: '提示',
				message: '选择一个模型',
				type: 'info',
				duration: 3000  // 设置通知显示的时间（毫秒）
			});

		}else{
			str = selectedItem.value?.code + ',' + res.data.dst
			console.log(str)
			if(1){
				buttonDisabled.value = true;
				prompt.value = str
				const taskId = await txt2imgAPI(params);

				const intervalId = setInterval(async () => {
					const statusResponse = await checkTaskStatus(taskId);
					const statusData = statusResponse.data;
					if (statusResponse.msg === "FAILD") {
						clearInterval(intervalId);
						buttonDisabled.value = false;
						ElNotification({
							title: '提示',
							message: '第一次使用时模型在载入可能会超时',
							type: 'info',
							duration: 3000  // 设置通知显示的时间（毫秒）
						});
					} else if (statusData.status === "COMPLETED") {
						clearInterval(intervalId);
						let imgurl = statusData.imageUrl;
						console.log("Image URL:",imgurl );
						
						for(let item of imgurl){
							// console.log(item)
							Create_list.value.push(item)
						}
						console.log(Create_list.value)
						buttonDisabled.value = false;
						
						// 可以在前端显示图片
					}  
				}, 5000);
			}
		}

	};
	const selectedLora = (selectedItem) => {
	// 取消所有标签的选中状态
		tabs.forEach(item => {
			item.selected = (item === selectedItem);
		});
		
		// 设置当前点击的标签为选中状态
		selectedItem.selected = true;

		// 根据选中状态更新 prompt 内容
		// prompt.value = `<lora:${selectedItem.value}:1>, `;
	};
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
.small-tag {
  border: 1px solid transparent;
  border-radius: 15px;
  padding: 5px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.small-tag.selected {
  border: 1px solid #000000; /* 使用你喜欢的颜色 */
  font-weight: bold; /* 加粗字体 */
}
.container {
  padding: 20px;
}

.sidebar {
  background-color: #f7f7f7;
}

.card {
  padding: 20px;
  background-color: white;
}

.form-header {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tag {
  margin: 5px;
}

.generated-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.text-overlay {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-wrapper {
  width: 150px;
  height: 150px;
}

.image-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  display: inline-block;
  transform-origin: center;
}

.image-card.selected {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 2px solid #007bff;
  z-index: 1; /* 提升层级，避免放大时被遮挡 */
}


.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  display: flex;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.full-image {
  max-width: 400px;
  max-height: 400px;
  margin-right: 20px;
}

.image-info {
  max-width: 300px;
}

.tag {
  cursor: pointer;
  border-radius: 16px;
}

.tab-content {
  margin-top: 20px;
}
.tagscontainer{
	height: 150px;
	margin: 0 0;
	padding: 0 0;
}
.tab-item {
  display: flex;
  gap: 15px;
}

.small-tag {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
}

.tag-img {
  width: 70%;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
}

.message {
  margin-top: 5px;
  font-size: 12px;
  color: #333;
}

.tags {
  display: flex;
  gap: 0; /* 标签之间的间距 */
}

.tag {
  cursor: pointer;
  margin: 0 1px;
}

.tab-content {
  margin-top: 20px;
}

.small-tag-container {
  display: flex;
  gap: 0; /* 小标签之间的横向间距 */
  flex-wrap: wrap; /* 当空间不足时，换行 */
}

.small-tag {
  width: 80px;
  text-align: center;
}

.tag-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}

.message {
  margin-top: 8px;
  font-size: 12px;
}
.h5{
	margin: 0 0;
}
</style>
