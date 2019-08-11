import Vue from 'vue'
import App from './App.vue'
// 导入element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入router
import router from '@/router'

// 导入样式
import '../styles/index.less'

// 导入axios
import axios from './api'

import myPlugin from './components'
Vue.use(myPlugin)

// import components from './components'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
