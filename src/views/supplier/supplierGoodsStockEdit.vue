<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="2">撤销</el-radio>
            <el-radio :label="7">删除</el-radio>
          </el-radio-group>
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
        status: '',
      },
      rules: {
        status: [],
      },
    }
  },
  created() {
    this.id = this.$route.query.id
    // this.ruleForm.status = this.$route.query.status
    this.getAddressList()
  },
  mounted() {
  },
  methods: {
    getAddressList: function () {
      this.$http({
        url: '/userorg/backadmin/shopaddress/select',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.addressList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/shopgoods',
            method: 'PUT',
            data: {
              id: this.id,
              status: this.ruleForm.status,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/supplierGoodsList'})
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
