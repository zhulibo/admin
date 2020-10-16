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
        <el-form-item label="账户状态" prop="del">
          <el-switch
            v-model="ruleForm.del"
            :active-value="0"
            :inactive-value="1">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否推荐" prop="isRecommendFocus">
          <el-switch
            v-model="ruleForm.isRecommendFocus"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
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
        del: '',
        isRecommendFocus: '',
      },
      rules: {
        payPwd: [],
        passWord: [],
        del: [],
        isRecommendFocus: [],
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
          this.ruleForm.del = this.detail.del
          this.ruleForm.isRecommendFocus = this.detail.tbAppUserDetail.isRecommendFocus
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
              del: this.ruleForm.del,
              isRecommendFocus: this.ruleForm.isRecommendFocus,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/user'})
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
