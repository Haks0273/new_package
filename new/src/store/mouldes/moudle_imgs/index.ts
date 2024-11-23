import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getmoudle } from "../../../api";
import qs from "qs"
export const useMoudle_imgs = defineStore("moudle_imgs", () => {
  // 声明数据
  let moudle_list = reactive(
  []
  )
  let i = ref(1)
  ;
  // 声明操作数据的方法
	const GetMoudles = ()=>{
		// console.log(1)
		let index = i.value
		let data = {index}
		getmoudle(qs.stringify(data)).then( res=>{
			// console.log(res)
			let id = 1
			moudle_list.length = 0
			for(let item of res.data){
				let url = 'https://api.xiaofang.design:8999/intelligent_packaging_upload_img/common/creativity_box/'+item.url
				let txt = item.txt
				// console.log(item)
				moudle_list.push({url,txt,id})
				id++
			}
			// console.log(moudle_list)
		},
		err=>{
			console.log(err.msg)
		})
	}
  // 声明getters相关
  return {
	i,
	moudle_list,
	GetMoudles
  };
},
{
  persist:true
}
);