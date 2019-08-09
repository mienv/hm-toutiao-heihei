<template>
  <div class="container">
    <div>header</div>
    <div class="content">
      <!-- 插槽 如果不写名字，就是默认插槽 -->
      <!-- 给插槽取名字就叫具名插槽 -->
      <slot name="content" :msg="msg" a="10"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: '组件内部数据'
    }
  }
}
</script>

<style scoped land="less">

</style>
