<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">指定商品</el-radio>
          <el-radio v-model="ruleForm.type" label="2">全品类</el-radio>
        </el-form-item>
        <el-form-item v-if="ruleForm.type == 1" label="商品id" prop="goodId">
          <el-input v-model="ruleForm.goodId"></el-input>
        </el-form-item>
        <el-form-item label="满减金额" prop="totalPrice">
          <el-input v-model="ruleForm.totalPrice"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
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
      packageId: '',
      id: '',
      detail: {},
      ruleForm: {
        type: '2',
        name: '',
        goodId: '',
        totalPrice: '',
        price: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        goodId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        totalPrice: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        price: [
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
    this.packageId = this.$route.query.packageId
    if (this.id) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/order/backadmin/discount/discount/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.type = String(this.detail.type)
          this.ruleForm.name = this.detail.name
          this.ruleForm.goodId = this.detail.goodId
          this.ruleForm.totalPrice = this.detail.totalPrice
          this.ruleForm.price = this.detail.price
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/discount/discount',
            method: this.id ? 'PUT' : 'POST',
            data: {
              packageId: this.packageId,
              id: this.id ? this.id : '',
              name: this.ruleForm.name,
              type: this.ruleForm.type,
              goodId: this.ruleForm.type == 1 ? this.ruleForm.goodId : '',
              totalPrice: this.ruleForm.totalPrice,
              price: this.ruleForm.price,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/coupon', query: {packageId: this.packageId}})
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
