<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="商品id" prop="goodsId">
          <el-input v-model="ruleForm.goodsId" :disabled="!!id"></el-input>
        </el-form-item>
        <el-form-item label="sku-id" prop="skuId">
          <el-input v-model="ruleForm.skuId" :disabled="!!id"></el-input>
        </el-form-item>
        <el-form-item label="奖品数量" prop="number">
          <el-input v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="开奖时间" prop="drawTime">
          <el-date-picker
            v-model="ruleForm.drawTime"
            type="datetime"
            value-format="timestamp"
            default-value=""
            default-time="23:00:00"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="抽奖状态" prop="status">
          <el-radio-group v-model="ruleForm.status" :disabled="!id">
            <el-radio :label="0">未开始</el-radio>
            <el-radio :label="1">已开始</el-radio>
            <el-radio :label="2">已结束</el-radio>
            <el-radio :label="3">强制结束</el-radio>
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
        goodsId: '',
        skuId: '',
        number: '',
        drawTime: '',
        status: '',
      },
      rules: {
        goodsId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        skuId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        // number: [
        //   {required: true, message: '请输入', trigger: 'change'}
        // ],
        drawTime: [
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
        url: '/goodsmanage/backadmin/drawgoods/detail',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.goodsId = this.detail.goodsId
          this.ruleForm.skuId = this.detail.skuId
          this.ruleForm.number = this.detail.number
          this.ruleForm.drawTime = this.detail.drawTime
          this.ruleForm.status = this.detail.status
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/drawgoods',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              goodsId: this.ruleForm.goodsId,
              skuId: this.ruleForm.skuId,
              number: this.ruleForm.number,
              drawTime: this.ruleForm.drawTime,
              status: this.id ? this.ruleForm.status : '',
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goodsLottery'})
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
