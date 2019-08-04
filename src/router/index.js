// 职责：初始化路由对象，提供给main.js 去使用
// 下载之后需要导入这个 vue-router包
import VueRouter from 'vue-router'
import Vue from 'vue'
// 导入login
import Login from '../views/login/index.vue'

// 导入之后需要使用
Vue.use(VueRouter)

// 初始化一个路由实例
const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }]
})

// 导出
export default router
