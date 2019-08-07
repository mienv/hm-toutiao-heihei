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
import store from '../store'

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
// 加上全局前置导航首位
router.beforeEach((to, from, next) => {
  // // 如果是登录路由，就放行
  // if (to.path === '/login') return next()
  // // 获取用户信息，如果没有登录，就返回登录页面
  // if (!store.getUser().token) return next('/login')
  // // 其他的情况放行
  // next()
// 如果不是登录路由并且没有获取到用户信息 就返回登录页面
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  // 其他的就都放行
  next()
})

// 导出
export default router
