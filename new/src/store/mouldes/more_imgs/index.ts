import { defineStore } from "pinia";
import { reactive,ref } from "vue";
import { getmore,search } from "../../../api";
import qs from "qs";
export const useMore_imgs = defineStore("more_imgs", () => {
  // 声明数据
  let more_list = reactive(
  [])
	let head_more_list =reactive([])
	let Content = ref('')
  // 声明操作数据的方法
	const Search = (data:object) =>{	
		console.log(data)
		search(qs.stringify(data)).then( res=>{
			more_list.length = 0
			for (let item of res.data){
				let url = 'https://api.xiaofang.design:8999/intelligent_packaging_upload_img/image/2024-11-01/' + item.url
				let txt = item.txt
				more_list.push({url,txt})
			}
		})
	}
	const GetMore = () =>{
		getmore().then( res=>{
			more_list.length =0
			head_more_list.length = 0
			let i:number = 0
			// console.log(res.data)
			for(let item of res.data){
				// console.log(item)
				let url = 'https://api.xiaofang.design:8999/intelligent_packaging_upload_img/image/2024-11-01/' + item.url
				let txt = item.txt
				more_list.push({url,txt})
				if(i<=11){
					let url = 'https://api.xiaofang.design:8999/intelligent_packaging_upload_img/image/2024-11-01/' + item.url
					let txt = item.txt
					head_more_list.push({url,txt})
					i++
				}
			}
			// console.log(head_more_list)
			
		},
		err=>{
			console.log(err.msg)
		})
	}
  // 声明getters相关
 
  return {
	more_list,
	GetMore,
	Search,
	head_more_list,
	Content
  };
},
{
  persist:true
}
);