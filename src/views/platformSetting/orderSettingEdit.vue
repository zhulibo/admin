<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">确认收货时间</el-radio>
            <el-radio :label="2">订单取消时间</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分钟数" prop="minute">
          <el-input v-model="ruleForm.minute"></el-input>
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
      id: '',
      detail: {},
      ruleForm: {
        type: '',
        minute: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        minute: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/order/backadmin/setting/detail',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.type = this.detail.type
          this.ruleForm.minute = this.detail.minute
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/setting',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              type: this.ruleForm.type,
              minute: this.ruleForm.minute,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/orderSettingList'})
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
