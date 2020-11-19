<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="首图" prop="topImg">
          <img-upload v-model="ruleForm.topImg" :options="topImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="分类" prop="content">
          <rich-text v-model="ruleForm.content"></rich-text>
        </el-form-item>
        <el-form-item v-if="id" label="推荐" prop="isRecommend">
          <el-switch
            v-model="ruleForm.isRecommend"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="文章类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">原创</el-radio>
          <el-radio v-model="ruleForm.type" label="2">转载</el-radio>
        </el-form-item>
        <el-form-item label="转载自" prop="reship" v-if="ruleForm.type == 2">
          <el-input v-model="ruleForm.reship"></el-input>
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
const richText = () => import(/* webpackChunkName: "richText" */ '@/components/richText/richText')

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      detail: {},
      topImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        title: '',
        topImg: [],
        content: '',
        isRecommend: '',
        type: '',
        reship: '',
      },
      rules: {
        title: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        topImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        content: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        isRecommend: [
          // {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  components: {
    imgUpload,
    richText,
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
        url: '/userorg/backadmin/news/detail',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.title = this.detail.title
          this.topImgOptions.fileList.push({url: this.detail.topImage}) // 图片回显
          this.ruleForm.content = this.detail.content
          this.ruleForm.isRecommend = this.detail.isRecommend
          if(this.detail.reship) {
            this.ruleForm.type = '2'
            this.ruleForm.reship = this.detail.reship
          }else{
            this.ruleForm.type = '1'
          }
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/news',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              title: this.ruleForm.title,
              topImage: this.ruleForm.topImg[0],
              content: this.ruleForm.content,
              isRecommend: this.ruleForm.isRecommend,
              reship: this.ruleForm.type == 1 ? '' : this.ruleForm.reship,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/articleList'})
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
