<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="store">
          <el-input v-model="ruleForm.store"></el-input>
        </el-form-item>
        <el-form-item label="运费" prop="carriage">
          <el-input v-model="ruleForm.carriage"></el-input>
        </el-form-item>
        <el-form-item label="邮费方式" prop="isPayment">
          <el-radio v-model="ruleForm.isPayment" label="0">先付邮费</el-radio>
          <el-radio v-model="ruleForm.isPayment" label="1">到付</el-radio>
        </el-form-item>
        <el-form-item label="发货地址" prop="addressId">
          <el-select v-model="ruleForm.addressId" placeholder="请选择" filterable>
            <el-option v-for="item in addressList" :label="item.sendAddress" :value="item.id"
                       :key="item.id"></el-option>
          </el-select>
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
      mainId: '',
      skuId: '',
      addressList: [],
      detail: {},
      ruleForm: {
        price: '',
        isPayment: '',
        store: '',
        carriage: '',
        addressId: null,
      },
      rules: {
        price: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        isPayment: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        store: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        addressId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    this.mainId = this.$route.query.mainId
    this.skuId = this.$route.query.skuId
    this.getAddressList()
    if (this.id) this.getDetail()
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
          this.ruleForm.price = this.detail.price
          this.ruleForm.isPayment = this.detail.isPayment
          this.ruleForm.store = this.detail.store
          if (this.detail.carriage) this.ruleForm.carriage = this.detail.carriage
          this.ruleForm.addressId = this.detail.addressId
        }).catch(e => {
        console.log(e)
      })
    },
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
            method: 'POST',
            data: {
              mainId: this.mainId,
              skuId: this.skuId,
              price: this.ruleForm.price,
              isPayment: this.ruleForm.isPayment,
              store: this.ruleForm.store,
              carriage: this.ruleForm.carriage,
              addressId: this.ruleForm.addressId,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/supplierStore'})
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
