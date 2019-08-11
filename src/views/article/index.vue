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
          <!-- 使用自己的组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
          @change="changeDate"
          value-format="yyyy-MM-dd"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <!-- slot="content"   指定插槽的名字 -->
    <!-- slot-scope="data" 指定将接收插槽传递过来的自定义数据 -->
    <!-- <my-test>
      <div slot="content" slot-scope="scope">韩丽晓最美 获取组件内部数据:{{scope.a}}</div>
      <div slot="footer">最好</div>
    </my-test> -->

    <el-card>
        <div slot="header">根据筛选条件共查询到 {{total}}条结果:</div>
        <!-- 表格组建的使用 -->
        <el-table :data="articles">
          <el-table-column  label="封面">
            <template slot-scope="scope">
              <img :src="scope.row.cover.images[0]" style="width:120px ;height:80px">
            </template>
          </el-table-column>
           <el-table-column  label="标题" prop="title"></el-table-column>
           <el-table-column  label="状态" >
             <template slot-scope="scope">
               <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" >待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
             </template>
           </el-table-column>
           <el-table-column  label="发布时间" prop="pubdate"></el-table-column>
           <el-table-column  label="操作" width="120px" >
             <template slot-scope="scope">
               <el-button type="primary"  @click="edit(scope.row.id)" icon="el-icon-edit" plain circle></el-button>
               <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" plain circle></el-button>
             </template>
           </el-table-column>
        </el-table>
        <!-- 分页组件的使用 -->
        <div style="text-align:center;margin-top:30px;">
          <!--total指定总条数 -->
          <!-- 分页组件   默认每页显示10条数据  page-size每页显示几条 -->
          <!-- 当更改组件当前页码的时候  应该重新向后台发起请求 来渲染列表-->
          <el-pagination background layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
          ></el-pagination>
        </div>
    </el-card>
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
        channel_id: 4,
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 20
      },
      // channelOptions: [],
      // 日期数据
      dateArr: [],

      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },

  // watch: {
  //   // total(newVal,oldVal){}
  //   'reqParams.channel_id': function (newVal, oldVal) {
  //     // console.log(newVal)
  //     if (newVal === '') {
  //       // axios不会将参数提交给后台
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // },

  created () {
  // 获取频道下拉选项数据
    // this.getChannelOptions()
    this.getArticle()
  },
  methods: {
    // 编辑
    edit (id) {
      this.$router.push('publish')
    },

    // 删除文章
    del (id) {
      // 1.弹出一个确认框
      // 2.点击确认，发起删除请求
      // 3.删除成功   提示   更新列表
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        // 上面的请求确实成功了，响应的时候来到前端报错了，阻止下面程序的执行。
        // 提示 更新列表
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => {})
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数s
    search () {
      this.reqParams.page = 1
      this.getArticle()
    },

    // 页码改变时间函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticle()
    },

    // async getChannelOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticle () {
      const {
        data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data.results)
      // 文章列表
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
// 选择日期后函数
</script>

<style scoped lang="less">
.el-card{
  margin-bottom: 20px;
}
</style>
