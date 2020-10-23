<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="部落名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="部落logo" prop="logoImg" class="form-item-img-logo">
          <img-upload v-model="ruleForm.logoImg" :options="logoImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="部落背景图片" prop="topImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.topImg" :options="topImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="部落公告" prop="notice">
          <el-input v-model="ruleForm.notice"></el-input>
        </el-form-item>
        <el-form-item label="公告标题" prop="noticeTitle">
          <el-input v-model="ruleForm.noticeTitle"></el-input>
        </el-form-item>
        <el-form-item label="管理员id" prop="adminUser">
          <el-input v-model="ruleForm.adminUser"></el-input>
        </el-form-item>
        <el-form-item label="部落类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option label="普通部落" value="1"></el-option>
            <el-option label="明星部落" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐顺序" prop="isRecommend">
          <el-input v-model="ruleForm.isRecommend"></el-input>
        </el-form-item>
        <el-form-item label="部落状态" prop="del">
          <el-switch
            v-model="ruleForm.del"
            :active-value="0"
            :inactive-value="1">
          </el-switch>
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
      logoImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      topImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        name: '',
        logoImg: [],
        topImg: [],
        notice: '',
        noticeTitle: '',
        adminUser: '',
        type: '',
        isRecommend: '',
        del: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'change'}
          // {type: 'number', message: '此项须为数字',trigger: 'blur',transform: Number},
          // {pattern: /^[+]?([\d]{1,12})([\.]{1}[\d]{1,2})?$/, message: '最多12位正数,小数最多两位',trigger: 'blur'},
        ],
        logoImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        topImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        notice: [],
        noticeTitle: [],
        adminUser: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        type: [
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
        url: '/userorg/backadmin/tribe/detail/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.name = this.detail.name
          this.logoImgOptions.fileList.push({url: this.detail.logoImage}) // 图片回显
          this.topImgOptions.fileList.push({url: this.detail.topImage}) // 图片回显
          this.ruleForm.notice = this.detail.notice
          this.ruleForm.noticeTitle = this.detail.noticeTitle
          this.ruleForm.adminUser = this.detail.adminUser
          this.ruleForm.type = String(this.detail.type) // el-select必须字符串
          this.ruleForm.isRecommend = this.detail.isRecommend
          this.ruleForm.del = this.detail.del
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/tribe',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              name: this.ruleForm.name,
              logoImage: this.ruleForm.logoImg[0],
              topImage: this.ruleForm.topImg[0],
              notice: this.ruleForm.notice,
              noticeTitle: this.ruleForm.noticeTitle,
              adminUser: this.ruleForm.adminUser,
              type: this.id ? '' : this.ruleForm.type,
              isRecommend: this.ruleForm.isRecommend,
              del: this.ruleForm.del
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/tribeList'})
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
