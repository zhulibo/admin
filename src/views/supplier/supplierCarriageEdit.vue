<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="运费类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">省内</el-radio>
            <el-radio :label="2">省外</el-radio>
            <el-radio :label="3">偏远</el-radio>
            <el-radio :label="4">到付</el-radio>
            <el-radio :label="5">统一运费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="运费金额" prop="carriagePrice">
          <el-input v-model="ruleForm.carriagePrice">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      shopId: '',
      type: '',
      carriagePrice: '',
      detail: {},
      areaList: [],
      ruleForm: {
        type: '',
        carriagePrice: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        carriagePrice: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  components: {
    imgUpload
  },
  created() {
    this.id = this.$route.query.id
    this.shopId = this.$route.query.shopId
    this.type = this.$route.query.type
    this.carriagePrice = this.$route.query.carriagePrice
    this.ruleForm.type = this.type
    this.ruleForm.carriagePrice = this.carriagePrice
    // if(this.id) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/shopaddress/detail/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.type = this.detail.type
          this.ruleForm.carriagePrice = this.detail.carriagePrice
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/carriage',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              shopId: this.id ? this.shopId : '',
              type: this.ruleForm.type,
              carriagePrice: this.ruleForm.carriagePrice,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/supplierCarriageList'})
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
