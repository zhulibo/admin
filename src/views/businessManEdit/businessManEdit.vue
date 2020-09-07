<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="营业执照图片" prop="certificate" class="form-item-img-logo">
          <img-upload v-model="ruleForm.certificate" :options="certificateImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="品牌资质" prop="qualification" class="form-item-img-top">
          <img-upload v-model="ruleForm.qualification" :options="qualificationImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="服务费比例" prop="serviceRatio">
          <el-input v-model="ruleForm.serviceRatio">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="审核操作" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option label="待审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="审核不通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="失败原因" prop="failReason">
          <el-input type="textarea" v-model="ruleForm.failReason" maxlength="200" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark" maxlength="200" rows="4"></el-input>
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
      certificateImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      qualificationImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        certificate: [],
        qualification: [],
        serviceRatio: '',
        status: '',
        failReason: '',
        remark: '',
      },
      rules: {
        serviceRatio: [
          {required: true, message: '请选择', trigger: 'change'},
          {type: 'number', message: '此项须为数字',trigger: 'change',transform: Number},
          ]
      },
    }
  },
  components: {
    imgUpload
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail()
  },
  mounted() {
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    getDetail() {
      this.$http({
        url: 'userorg/backadmin/shop/detail',
        method: 'GET',
        params:{
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.certificateImgOptions.fileList.push({url: this.detail.certificate}) // 图片回显
          this.qualificationImgOptions.fileList.push({url: this.detail.qualification}) // 图片回显
          this.ruleForm.serviceRatio = this.detail.serviceRatio
          this.ruleForm.status = String(this.detail.status) // el-select必须字符串
          this.ruleForm.failReason = this.detail.failReason
          this.ruleForm.remark = this.detail.remark
        }).catch(e => {console.log(e)})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: 'userorg/backadmin/shop',
            method: 'PUT',
            data: {
              id: this.id,
              certificate: this.ruleForm.certificate[0],
              qualification: this.ruleForm.qualification[0],
              serviceRatio: this.ruleForm.serviceRatio,
              status: this.ruleForm.status,
              failReason: this.ruleForm.failReason,
              remark: this.ruleForm.remark,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/businessMan'})
          }).catch(e => {console.log(e)})
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
