// 职责：初始化路由对象，提供给main.js 去使用
// 下载之后需要导入这个 vue-router包
import VueRouter from 'vue-router'
import Vue from 'vue'
// 导入login
import Login from '../views/login/index.vue'
// 导入Home
import Home from '../views/home/index.vue'
// 导入welecome
import Welcome from '../views/welcome/index.vue'
// 导入aritcle
import Article from '../views/article/index.vue'
// 引入404
import NotFont from '../views/404/index.vue'

// 导入之后需要使用
Vue.use(VueRouter)

// 初始化一个路由实例
const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'home',也可以省略掉
    component: Home,
    // redirect: '/welcome',也可以省略掉
    // 二级路由 在首页下
    children: [
      { path: '/', name: 'welcome', component: Welcome },
      { path: '/article', name: 'article', component: Article }
    ]
  },
  // 路径404
  { path: '*', name: '404', component: NotFont }
  ]
})

// 导出
export default router
