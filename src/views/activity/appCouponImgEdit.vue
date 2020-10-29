<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="优惠券图片类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">分享优惠券图片</el-radio>
          <el-radio v-model="ruleForm.type" label="2">新人优惠券图片</el-radio>
        </el-form-item>
        <el-form-item label="边框图片" prop="urlImg" class="form-item-img-logo">
          <img-upload v-model="ruleForm.urlImg" :options="urlImgOptions"></img-upload>
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
      urlImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        type: '',
        urlImg: [],
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        urlImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  components: {
    imgUpload
  },
  created() {
    this.ruleForm.type = String(this.$route.query.type)
    if(this.$route.query.image) this.urlImgOptions.fileList.push({url: this.$route.query.image}) // 图片回显
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/discount/image',
            method: 'POST',
            data: {
              type: this.ruleForm.type,
              image: this.ruleForm.urlImg[0],
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/appCouponImgList'})
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