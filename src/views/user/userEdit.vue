<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="支付密码" prop="payPwd">
          <el-input v-model="ruleForm.payPwd"></el-input>
        </el-form-item>
        <el-form-item label="用户充值密码" prop="passWord">
          <el-input v-model="ruleForm.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemEdit',
  data() {
    return {
      userId: '',
      detail: {},
      ruleForm: {
        payPwd: '',
        passWord: '',
      },
      rules: {
        payPwd: [],
        passWord: [],
      },
    }
  },
  created() {
    this.userId = this.$route.query.userId
    if (this.userId) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/appuser/detail/' + this.userId,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.payPwd = this.detail.tbAppUserDetail.payPwd
          this.ruleForm.passWord = this.detail.passWord
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/appuser',
            method: 'PUT',
            data: {
              userId: this.userId,
              payPwd: this.ruleForm.payPwd,
              passWord: this.ruleForm.passWord,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/userList'})
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
