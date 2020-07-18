<template>
  <div class="bg">
    <div class="ct wrap clearfix">
      <div class="l">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="r">
        <div class="form-ct">
          <h2 class="form-title">管理后台登录</h2>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="log-form">
            <el-form-item label="" prop="account">
              <el-input v-model="ruleForm.account" placeholder="请输入手机号/邮箱" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item class="submit-item">
              <el-button class="log-button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="link clearfix">
            <router-link class="register" :to="{path: '/register'}">去注册</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'login',
    data() {
      return {
        type: null,
        ruleForm: {
          account: '',
          password: '',
        },
        rules: {
          account: [
            { required: true, message: '请输入', trigger: 'change' },
          ],
          password: [
            { required: true, message: '请输入', trigger: 'change' },
          ],
        }
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapState({
        userInfo: state => state.login.userInfo
      }),
    },
    methods: {
      submitForm(formName) {
        var _this = this
        _this.$refs[formName].validate((valid) => {
          if (valid) {

            _this.$http({
              url: '/login/login',
              method: 'GET',
              params: {
                username: _this.ruleForm.account,
                password: _this.ruleForm.password,
              }
            })
              .then(function (res) {
                if (res.data.code == 200) {
                  localStorage.setItem('userInfo', JSON.stringify(res.data.data))
                  _this.setUserInfo(res.data.data)
                  _this.updateRouter(res.data.data.roleSet)
                  _this.$router.push({path: '/table'})
                }else {
                  _this.$message({
                    type: 'info',
                    message: res.data.msg,
                  });
                }
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      ...mapMutations(['setUserInfo']),
      ...mapActions(['updateRouter']),
    }
  }
</script>

<style lang="stylus" scoped>
  .bg{
    height: 100%
  }
  .bg:after{
    filter: blur(10px)
    content ''
    position: absolute;
    z-index -1
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: url(../../assets/img/logo.png) center center/cover no-repeat
  }
  .ct{
    padding-top: 10%
  }
  .l{
    width: 50%
    float: left
    img{
      width: 80%
    }
  }
  .r{
    width: 50%
    float: left
  }
  .form-ct{
    box-sizing border-box
    width: 500px
    padding: 30px
    border-radius: 15px;
    background-color: rgba(255,255,255,.9);
  }
  .log-button{
    width: 100%
  }
  .form-title{
    margin-bottom: 40px
    text-align: center;
    font-size 24px
  }
  .el-form-item {
    margin-bottom: 30px;
  }
  .submit-item{
    margin-bottom: 10px
  }
  .register{
    float: right;
    color: #409EFF
  }
</style>
