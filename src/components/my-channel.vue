<template>
     <el-select :value="value" @change="fn" clearable placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
      </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      myValue: null,
      channelOptions: []
    }
  },
  watch: {
    // total(newVal,oldVal){}
    'myValue': function (newVal, oldVal) {
      // console.log(newVal)
      if (newVal === '') {
        // axios不会将参数提交给后台
        this.myValue = null
      }
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 发布事件，子组件
    fn (newVal) {
      if (newVal === '') newVal = null
      this.$emit('input', newVal)
    }
  }
}
</script>

<style scoped lang="less">

</style>
