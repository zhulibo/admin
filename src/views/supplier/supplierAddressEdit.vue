<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="发货人" prop="sender">
          <el-input v-model="ruleForm.sender"></el-input>
        </el-form-item>
        <el-form-item label="发货电话" prop="sendPhone">
          <el-input v-model="ruleForm.sendPhone"></el-input>
        </el-form-item>
        <el-form-item label="发货地址" prop="sendAddressArea">
          <el-cascader v-model="ruleForm.sendAddressArea" :options="areaList"
                       :props="{ value: 'id', label: 'name', children: 'children' }"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="sendAddress">
          <el-input v-model="ruleForm.sendAddress"></el-input>
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
      detail: {},
      areaList: [],
      ruleForm: {
        sender: '',
        sendPhone: '',
        sendAddressArea: [],
        sendAddress: '',
      },
      rules: {
        sender: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        sendPhone: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        sendAddressArea: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        sendAddress: [
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
    this.getAreaList()
    if (this.id) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getAreaList() {
      this.$http({
        url: '/userorg/backadmin/shopaddress/selectaddress',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.areaList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/shopaddress/detail/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.sender = this.detail.sender
          this.ruleForm.sendPhone = this.detail.sendPhone
          this.ruleForm.sendAddressArea.push(this.detail.provinceId)
          this.ruleForm.sendAddressArea.push(this.detail.cityId)
          this.ruleForm.sendAddressArea.push(this.detail.areaId)
          this.ruleForm.sendAddress = this.detail.sendAddress
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.id ? '/userorg/backadmin/shopaddress/update' : '/userorg/backadmin/shopaddress/insert',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              sender: this.ruleForm.sender,
              sendPhone: this.ruleForm.sendPhone,
              provinceId: this.ruleForm.sendAddressArea[0],
              cityId: this.ruleForm.sendAddressArea[1],
              areaId: this.ruleForm.sendAddressArea[2],
              sendAddress: this.ruleForm.sendAddress,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/supplierAddressList'})
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
