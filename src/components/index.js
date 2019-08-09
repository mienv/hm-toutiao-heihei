// 封装一个Vue插件
// 作用： 注册components下的所有组件为全局组件
// Vue插件定义规则  暴露一个对象{}，在对象中有选项，install  对应的一个函数  函数形参 Vue对象

import MyBread from './my-bread'
import MyTest from './my-test'

export default {
  install (Vue) {
    // vue.use  使用插件 此时的Vue就是你use前的Vue
    // 全局注册组件
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
  }
}
