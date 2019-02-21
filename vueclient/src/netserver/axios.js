import axios from 'axios'
import Qs from 'querystring'
let http = axios.create({
  //这边原本是'http://localhost:3000'，因为使用跨域代理，这边改成了/api
  baseURL:'/api',
  timeout:10000,
  /** 跨域保存session有用 */
  withCredentials:true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
  }],
})
/**
 * 添加请求拦截器
 */
http.interceptors.request.use( config =>{
  return config;
},error=>{
  return Promise.reject(error);
})
/**
 * 添加响应拦截器
 */
http.interceptors.response.use( response =>{
  return response;
},error=>{
  return Promise.reject(error)
})

export default function(){
  return http
}
