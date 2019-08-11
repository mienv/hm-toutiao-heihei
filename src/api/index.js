// 对axios进行配置，然后对配置好的axios进行导出
import axios from 'axios'
import store from '../store'
import JSONBIG from 'json-bigint'
// 进行配置
// 基准路径
axios.defaults.baseURL = ' http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  // 对data进行转换 return 是转化后的结果  data 是原始数据
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// 请求头配置
//
// }
axios.interceptors.request.use((config) => {
  // 修改 每次发请求前 获取一次token 设置
  config.headers.Authorization = `Bearer ${store.getUser().token}`

  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  return res
}
)
export default axios
