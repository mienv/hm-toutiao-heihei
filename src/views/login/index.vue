<template>
    <div class="container">
        <el-card class="my-card">
           <img src="../../assets/images/logo_index.png" alt="">
           <el-form ref='loginForm' :model="loginForm" :rules="loginRules" status-icon>
               <!-- 表单元素 -->
               <el-form-item prop="mobile">
                   <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
               </el-form-item>

               <el-form-item  prop="code">
                   <el-input v-model="loginForm.code" placeholder="请输入验证码" style='width:230px; margin-right:15px'></el-input>
                   <el-button>发送验证码</el-button>
               </el-form-item>
               <el-form-item>
                   <el-checkbox :value="true">我已阅读并同意</el-checkbox>
                   <el-button type="primary" style="width:100%" @click='login' >登录</el-button>
               </el-form-item>
           </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    //   自定义校验函数  在return之前定义
    const checkMobile = (rule, value, callback) => {
      // 按照自己的格式去校验value的值
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机格式不正确'))

      callback()
    }
    return {
      // 表单的数据对象
      loginForm: {
        mobile: '',
        code: ''
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //   对着整个表单进行校验

    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('success')
          // 校验成功发起请求
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // res是响应体
            //   res.data 数据属于响应体
            //   console.log(res.data)
            // 如果成功会跳转到到首页
              this.router.push('/')
            })
            .catch(() => {
              // 请求失败提示手机号或验证码错误
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container{
    width:100%;
    height:100%;
    position: absolute;
    // center/cover  背景图定位  /等比缩放
    background:url(../../assets/images/login_bg.jpg) no-repeat center/cover;
    .my-card{
        width:400px;
        height:350px;
        position: absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-60%);
        img{
            width:200px;
            display: block;
            margin:0px auto 30px;

        }

    }
}
</style>
