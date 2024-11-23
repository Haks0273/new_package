import httpInstance from "./http";

// const getProgress = (progress) => {
//   return httpInstance({
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "/api/internal/progress",
//     data: progress,
//   });
// };
const txt2img = (params) => {
  return httpInstance({
    method: "post",
    maxBodyLength: Infinity,
    url: "/user/sdapi/v1/txt2img",
    headers: {
      "Content-Type": "application/json",
    },
    data: params,
  });
};
export const txt2imgAPI = async (params) => {
  
  
  try {
    const res = await txt2img(params);

    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error while requesting txt2img:", error);
    return null;
  }
};
export const checkTaskStatus = async(taskId)=>{
  return httpInstance({
    method: "GET",
    maxBodyLength: Infinity,
    url: `/user/sdapi/v1/txt2img/${taskId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export const transAPI = async (params) => {
  return httpInstance({
    method: "post",
    url: "/user/trans",
    data: {
      from: "zh",
      to: "en",
      query: params,
    }
  })
}