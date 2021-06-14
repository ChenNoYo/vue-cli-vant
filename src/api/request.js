
import { create } from 'axios'
import { Toast } from 'vant';
import router from '../router'
const axios = create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL: process.env.VUE_APP_BASE_URL
})

// 请求拦截器
axios.interceptors.request.use(
  res => {
    return res
  },
  err => {
    return Promise.reject(err)
  })

// 响应拦截器
axios.interceptors.response.use(
  res => {
    if (res.data.code === 'SUCCESS') {
      return Promise.resolve(res.data)
    } else if (res.data.code === 'LOGIN_TIMEOUT') {
      Toast({
        message: res.data.message,
        duration: 1000,
        onClose: () => {
          router.push({ path: '/login' })
        }
      })
      return Promise.reject(res.data)
    } else {
      Toast(res.data.message)
      return Promise.reject(res.data)
    }
  },
  err => {
    return Promise.reject(err)
  })
// get，post请求方法
export default {
  get (url, params) {
    return axios({
      url: url,
      method: 'get',
      params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Session-Id': localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
      },
      withCredentials: true
    })
  },
  post (url, data) {
    return axios({
      url: url,
      method: 'post',
      data,
      headers: {
        'Session-Id': localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
      },
      withCredentials: true
    })
  }
}
