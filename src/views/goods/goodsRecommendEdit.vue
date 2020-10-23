<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">现货商品</el-radio>
          <el-radio v-model="ruleForm.type" label="2">预售商品</el-radio>
        </el-form-item>
        <el-form-item label="商品id" prop="goodId">
          <el-input v-model="ruleForm.goodsId"></el-input>
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
      ruleForm: {
        type: '1',
        goodsId: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        goodsId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/goods/recommendgoods',
            method: 'POST',
            data: {
              type: this.ruleForm.type,
              goodId: this.ruleForm.goodsId,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goodsRecommendList'})
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
