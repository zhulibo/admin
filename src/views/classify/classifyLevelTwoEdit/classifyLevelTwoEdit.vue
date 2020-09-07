<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" prop="classifyImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.classifyImg" :options="classifyImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="ruleForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="备注(200字以内)" prop="remark">
          <el-input v-model="ruleForm.remark"></el-input>
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
      classifyImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        name: '',
        classifyImg: [],
        sort: '',
        remark: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        classifyImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        sort: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        remark: [
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
    if(this.id) this.getDetail()
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
        url: '/userorg/backadmin/tribe/detail/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.name = this.detail.name
          this.classifyImgOptions.fileList.push({url: this.detail.image}) // 图片回显
          this.ruleForm.sort = this.detail.sort
          this.ruleForm.remark = this.detail.remark
        }).catch(e => {console.log(e)})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/classify/classify',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              level: 2,
              name: this.ruleForm.name,
              image: this.ruleForm.classifyImg[0],
              sort: this.ruleForm.sort,
              remark: this.ruleForm.remark,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/classifyLevelTwo'})
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