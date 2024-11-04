import requests from "./request";
// 统一管理接口

// 首页的底部以及探索页面图片接口
export const getmore = () => requests({
	url:'/getmore',
	method:'post'
})
// 图片ai生成界面的模型图片接口（参数：一个从大于1的number)
export const getmoudle = (index:any) => requests({
	url:'/getmoudle',
	method:'post',
	data:index
})
// ai图片生成接口(参数:一个对象,包含描述,产品名,模型名)
export const getcreate = (info:any) => requests({
	url:'xxx',
	method:'post',
	data:info
})
// 参考图片的ai图片生成接口(参数:一个对象,包含描述,图片url)
export const createimg = (info:any) => requests({
	url:'xxx',
	method:'post',
	data:info
})
// 素材生成接口,参数(一个对象,包含描述)
export const getdemo = (info:any) => requests({
	url:'xxx',
	method:'post',
	data:info
})
// 探索界面的搜索功能接口,参数(一个对象,包含搜索的内容)
// 这个接口即根据搜索的内容返回有该内容的所有图片url
export const search = (info:any) => requests({
	url:'xxx',
	method:'post',
	data:info
})
