import { defineStore } from "pinia";
import { reactive} from "vue";
import { getdemo } from "../../../api";
import qs from "qs"
export const useDemo_imgs = defineStore("deno_imgs", () => {
  // 声明数据
  let demo_list = reactive(
  []
  )
  // 声明操作数据的方法
	const GetDemoImg = (data:object)=>{
		console.log(data)
		getdemo(qs.stringify(data)).then( res=>{
			// console.log(res)
			demo_list.length = 0
			for(let item of res.data){
				let url = item.url
				// console.log(item)
				demo_list.push(url)
			}
			// console.log(moudle_list)
		},
		err=>{
			console.log(err.msg)
		})
	}
	const Del = () =>{
		demo_list.length = 0
	}
  // 声明getters相关
  return {
	demo_list,
	GetDemoImg,
	Del
  };
},
{
  persist:true
}
);