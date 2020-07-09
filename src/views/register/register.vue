<template>
  <div class="bg">
    <div class="ct wrap clearfix">
      <div class="l">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="r">
        <div class="form-ct">
          <h2 class="form-title">管理后台注册</h2>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="log-form">
            <el-form-item label="" prop="account">
              <el-input v-model="ruleForm.account" placeholder="请输入手机或邮箱"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="code" class="code-item">
              <el-input v-model="ruleForm.code" placeholder="请输入验证码">
              </el-input>
              <el-button @click="getCode" :disabled="!disabledCodeBtn">{{codeText}}</el-button>
            </el-form-item>
            <el-form-item label="" prop="checked" class="check-item">
              <el-checkbox v-model="ruleForm.checked"></el-checkbox>
              <span>
                同意并愿意接受
                <router-link to="/agreement">《服务协议》</router-link>
              </span>
            </el-form-item>
            <el-form-item class="submit-item">
              <el-button class="log-button" type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
          </el-form>
          <div class="link clearfix">
            <router-link class="register" :to="{path: '/login'}">去登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'register',
    data() {
      return {
        type: null,
        ruleForm: {
          account: '',
          password: '',
          code: '',
          checked: true,
        },
        rules: {
          account: [
            { required: true, message: '请输入', trigger: 'change' },
          ],
          password: [
            { required: true, message: '请输入', trigger: 'change' },
          ],
          code: [
            { required: true, message: '请输入', trigger: 'change' },
          ],
        },
        codeText:'获取验证码',
        disabledCodeBtn: true
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
      testType() {
        var _this = this
        var phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

        if(phone.test(_this.ruleForm.account)){
          _this.type = 1
        }else if(email.test(_this.ruleForm.account)){
          _this.type = 2
        }else{
          _this.$message({
            type: 'error',
            message: '请输入正确的账号'
          });
          return false
        }
      },
      getCode() {

        var _this = this
        if(_this.testType() == false){
          return false
        }

        _this.$http({
          url: '/register/getValidCode',
          method: 'GET',
          params: {
            AC: _this.ruleForm.account,
            type: _this.type,
          }
        })
          .then(function (res) {
            if (res.data.code == 200){
              _this.$message({
                type: 'success',
                message: '发送成功'
                // message: res.data.msg
              });
              _this.countDown(60)
            }else{
              _this.$message({
                type: 'warning',
                message: '发送失败',
                // message: res.data.msg
              });
            }
          })
      },
      countDown (time) {
        if (time === 0) {
          this.disabledCodeBtn = true
          this.codeText = "获取验证码"
          return
        } else {
          this.disabledCodeBtn = false;
          this.codeText = '重新发送(' + time + ')'
          time--
        }
        setTimeout(()=> {
          this.countDown(time)
        }, 1000)
      },
      submitForm(formName) {
        var _this = this
        if(_this.testType() == false){
          return false
        }
        if(_this.ruleForm.checked == false){
          _this.$message({
            type: 'info',
            message: '请同意协议',
          });
          return false
        }

        _this.$refs[formName].validate((valid) => {
          if (valid) {

            _this.$http({
              url: '/register/regist',
              method: 'POST',
              params: {
                username: _this.ruleForm.account,
                pass: _this.ruleForm.password,
                code: _this.ruleForm.code,
                type: _this.type,
              }
            })
              .then(function (res) {
                if (res.data == 201){
                  _this.$message({
                    type: 'success',
                    message: res.data.msg
                  });
                  _this.$router.push({path: '/login'})
                }else{
                  _this.$message({
                    type: 'warning',
                    message: res.data.msg
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
  .register{
    float: right;
    color: #409EFF
  }
  .code-item{
    margin-bottom: 10px
  }
  >>> .code-item .el-form-item__content{
    display: flex;
  }
  >>> .code-item .el-form-item__content .el-input{
    margin-right: 10px
    flex 1
  }
  .check-item{
    margin-bottom: 6px
  }
  .submit-item{
    margin-bottom: 10px
  }
  >>> .check-item .el-form-item__content{
    font-size 13px
    text-align: center;
  }
  >>> .check-item .el-form-item__content span{
    color: #666
  }
  >>> .check-item .el-form-item__content span a{
    color: #66b1ff
  }
</style>
