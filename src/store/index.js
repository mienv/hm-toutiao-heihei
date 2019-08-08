// 封装操作sessionStorage的函数，提供给其他模块的使用
// 1.约定好key的名字
// 2. 约定好value 的格式  字符串格式 json数据

const KEY = 'hm-toutiao-heihei-user'

export default {
  setUser (user) {
    // 存储
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    // 获取用户信息
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 移出用户信息
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }

}
