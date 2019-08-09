<template>
  <div class="container">
    <!-- 筛选区域  -->
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
           <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <!-- slot="content"   指定插槽的名字 -->
    <!-- slot-scope="data" 指定将接收插槽传递过来的自定义数据 -->
    <my-test>
      <div slot="content" slot-scope="scope">韩丽晓最美 获取组件内部数据:{{scope.a}}</div>
      <div slot="footer">最好</div>
    </my-test>
  </div>
</template>

<script>
// import MyTest from '../../components/my-test.vue'
// import MyBread from '../../components/my-bread.vue'
export default {
  // components: { MyTest, MyBread },
  data () {
    return {
      // 收集请求参数（表单数据）
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [{ label: 'js', value: '1000' }],
      dateArr: []
    }
  }
}
</script>

<style scoped lang="less">

</style>
