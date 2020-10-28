<template>
  <div class="bg">
    <div class="log-in wrap clearfix">
      <div class="l">
        <img src="../../assets/img/logIn2.png" alt="">
      </div>
      <div class="r">
        <div class="form-ct">
          <h2 class="form-title">漫想家管理后台</h2>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="log-form">
            <el-form-item label="用户类型" prop="type">
              <el-radio v-model="ruleForm.type" label="1">管理员登录</el-radio>
              <el-radio v-model="ruleForm.type" label="2">供货商登录</el-radio>
            </el-form-item>
            <el-form-item label="" prop="account">
              <el-input v-model="ruleForm.account" placeholder="请输入手机号"
                        @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"
                        @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item label="" prop="randomCode" class="code-item">
              <el-input v-model="ruleForm.randomCode" placeholder="请输入验证码"
                        @keyup.enter.native="submitForm('ruleForm')"></el-input>
              <random-code :value.sync="randomCode"></random-code>
            </el-form-item>
            <el-form-item class="submit-item">
              <el-button class="log-button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import randomCode from '@/components/randomCode/randomCode'
import permissionList from "@/store/modules/permissionList";

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
        type: '',
        account: '',
        password: '',
        randomCode: '',
      },
      rules: {
        type: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        account: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
        randomCode: [
          {validator: validateRandomCode, trigger: 'blur'}
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
    this.ruleForm.randomCode = this.randomCode
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.$http({
            url: '/userorg/login/back',
            method: 'POST',
            data: {
              type: this.ruleForm.type,
              phone: this.ruleForm.account,
              passWord: this.ruleForm.password,
            }
          })
            .then(res => {
              let userInfo = {
                type: this.ruleForm.type,
                phone: this.ruleForm.account,
                token: res.data.token,
                permission: res.data.list,
              }
              this.$store.dispatch('updateUserInfo', userInfo)
              this.$store.dispatch('updateRouter', userInfo.permission)
              localStorage.setItem('userInfo', JSON.stringify(userInfo))
              this.$router.push({path: '/'})
            }).catch(e => {
            console.log(e)
          })

        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
  }
}
</script>

<style lang="stylus" scoped>
.bg {
  flexCenter()
  height: 100%
}
.bg:after {
  filter: blur(2px)
  content ''
  position: absolute;
  z-index -1
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: url(../../assets/img/logIn1.png) center center / 100% auto no-repeat
}
.log-in {
  display: flex
  padding-bottom: 50px
  .l {
    flex: 1
    flexCenter()
    img {
      padding-bottom: 5em
      width: 20em
      filter drop-shadow(0 0 5px rgba(255, 255, 255, .5))
    }
  }
  .r {
    flex: 1
  }
}
.form-ct {
  box-sizing border-box
  width: 400px
  padding: 20px 30px
  border-radius: 10px;
  background-color: rgba(255, 255, 255, .9);
}
.log-button {
  width: 100%
}
.form-title {
  margin-bottom: 30px
  text-align: center;
  font-size 24px
  font-weight: bold
  color: #555
}
.el-form-item {
  margin-bottom: 20px;
}
.submit-item {
  margin-bottom: 10px
}
>>> .code-item .el-form-item__content {
  display: flex;
}
>>> .code-item .el-form-item__content .el-input {
  margin-right: 10px
  flex 1
}
</style>
