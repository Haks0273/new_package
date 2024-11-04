import { defineStore } from "pinia";
import { reactive} from "vue";
import { getcreate,createimg } from "../../../api";
import qs from "qs"
export const useCreate_imgs = defineStore("create_imgs", () => {
  // 声明数据
  let Create_list = reactive(
  []
  )
  // 声明操作数据的方法
	const GetCreateImg = (data:object)=>{
		console.log(data)
		getcreate(qs.stringify(data)).then( res=>{
			// console.log(res)
			Create_list.length = 0
			for(let item of res.data){
				let url = item.url
				// console.log(item)
				Create_list.push(url)
			}
			// console.log(moudle_list)
		},
		err=>{
			console.log(err.msg)
		})
	}
	const CreateImg = (data:object)=>{
		console.log(data)
		createimg(qs.stringify(data)).then( res=>{
			// console.log(res)
			Create_list.length = 0
			for(let item of res.data){
				let url = item.url
				// console.log(item)
				Create_list.push(url)
			}
			// console.log(moudle_list)
		},
		err=>{
			console.log(err.msg)
		})
	}
	const Del = () =>{
		Create_list.length = 0
	}
  // 声明getters相关
  return {
	Create_list,
	GetCreateImg,
	CreateImg,
	Del
  };
},
{
  persist:true
}
);