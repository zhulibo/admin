<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="启动页类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">图片</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="ruleForm.type == 1" prop="image" label="选择图片" class="form-item-images">
          <img-upload v-model="ruleForm.image" :options="imgOptions"></img-upload>
        </el-form-item>
        <el-form-item v-else-if="ruleForm.type == 2" prop="image" label="选择视频" class="form-item-video">
          <img-upload v-model="ruleForm.image" :options="videoOptions"></img-upload>
        </el-form-item>
        <el-form-item label="排序分数" prop="sort">
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
      imgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1,
        type: 1,
      },
      videoOptions: {
        fileList: [],
        accept: '.mp4',
        limit: 1,
        type: 2,
      },
      ruleForm: {
        type: 1,
        image: [],
        sort: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        image: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        sort: [
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
    if (this.id) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/startimage/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.type = this.detail.type
          if(this.ruleForm.type == 1){
            this.imgOptions.fileList.push({url: this.detail.image})
          }else if(this.ruleForm.type == 2){
            this.videoOptions.fileList.push({url: this.detail.image})
          }
          this.ruleForm.sort = this.detail.sort
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/startimage',
            method: this.id ? 'PUT' : 'POST',
            data: {
              type: this.ruleForm.type,
              image: this.ruleForm.image[0],
              sort: this.ruleForm.sort,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/startupList'})
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
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
>>> .form-item-video .el-upload-list--picture-card .el-upload-list__item {
  width 200px
  height: 400px
  div {
    width: 100%
    height: 100%
    video {
      width: 100%
      height: 100%
      background-color: #000
    }
  }
}
>>> .form-item-video .el-upload--picture-card {
  width 200px
  height: 400px
  line-height: 400px
}
</style>
