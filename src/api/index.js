// 对axios进行配置，然后对配置好的axios进行导出
import axios from 'axios'
import store from '../store'
// 进行配置
// 基准路径
axios.defaults.baseURL = ' http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头配置
//
// }
axios.interceptors.request.use((config) => {
  // 修改 每次发请求前 获取一次token 设置
  config.headers.Authorization = {
    Authorization: `bearer ${store.getUser().token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  // 获取响应状态吗
  if (err.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(err)
})
export default axios
