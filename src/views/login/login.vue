<template>
  <div class="bg">
    <div class="ct wrap clearfix">
      <div class="l">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="r">
        <div class="form-ct">
          <h2 class="form-title">漫想家管理后台</h2>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="log-form">
            <el-form-item label="" prop="account">
              <el-input v-model="ruleForm.account" placeholder="请输入手机号" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item label="" prop="randomCode" class="code-item">
              <el-input v-model="ruleForm.randomCode" placeholder="请输入验证码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              <random-code :value.sync="randomCode"></random-code>
            </el-form-item>
            <el-form-item class="submit-item">
              <el-button class="log-button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
<!--          <div class="link clearfix">-->
<!--            <router-link class="register" :to="{path: '/register'}">去注册</router-link>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import randomCode from '../../components/randomCode/randomCode'

  export default {
    name: 'login',
    data() {
      let validateRandomCode = (rule, value, callback) => {
        if (this.ruleForm.randomCode.toLowerCase() != this.randomCode.toLowerCase()) {
          callback(new Error('验证码有误(╯°□°)╯︵ ┻━┻'));
        } else {
          callback();
        }
      };
      return {
        type: null,
        ruleForm: {
          account: '',
          password: '',
          randomCode: '',
        },
        rules: {
          account: [
            { required: true, message: '请输入', trigger: 'change' },
          ],
          password: [
            { required: true, message: '请输入', trigger: 'change' },
          ],
          randomCode: [
            { validator: validateRandomCode, trigger: 'blur' }
          ],
        },
        randomCode: null
      }
    },
    components: {
      randomCode
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
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$http({
              url: '/userorg/login/back',
              method: 'POST',
              data: {
                phone: this.ruleForm.account,
                passWord: this.ruleForm.password,
              }
            })
              .then(res => {
                if (res.code == 0) {
                  localStorage.setItem('userInfo', JSON.stringify(res.data))
                  this.setUserInfo(res.data)
                  // this.updateRouter(res.data.roleSet)
                  this.$router.push({path: '/user'})
                }else {
                  this.$message({
                    type: 'info',
                    message: res.msg,
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
  >>> .code-item .el-form-item__content{
    display: flex;
  }
  >>> .code-item .el-form-item__content .el-input{
    margin-right: 10px
    flex 1
  }
</style>
