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
        <el-form-item label="logo" prop="iconImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.iconImg" :options="iconImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="背景图" prop="iconImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.brandBgImg" :options="brandBgImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="备注(200字以内)" prop="intro">
          <el-input type="textarea" v-model="ruleForm.intro" maxlength="200" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="ruleForm.sort"></el-input>
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
      iconImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      brandBgImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        type: '1',
        name: '',
        iconImg: [],
        brandBgImg: [],
        intro: '',
        sort: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        iconImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        brandBgImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        intro: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        sort: [],
      },
    }
  },
  components: {
    imgUpload
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
        url: '/goodsmanage/backadmin/goodbrand/detail',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.name = this.detail.name
          this.iconImgOptions.fileList.push({url: this.detail.image}) // 图片回显
          this.brandBgImgOptions.fileList.push({url: this.detail.backImag}) // 图片回显
          this.ruleForm.intro = this.detail.describes
          if (this.detail.sort) this.ruleForm.sort = this.detail.sort
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/goodbrand',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              name: this.ruleForm.name,
              image: this.ruleForm.iconImg[0],
              backImag: this.ruleForm.brandBgImg[0],
              describe: this.ruleForm.intro,
              sort: this.ruleForm.sort,
            },
          }).then(res => {
            this.$message.success(res.msg)
            // this.$router.push({path: '/classifyBrand'})
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
