<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="分类类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">普通分类</el-radio>
          <el-radio v-model="ruleForm.type" label="2">跳转html的分类</el-radio>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="网页地址" prop="url" v-if="ruleForm.type == 2" :rules="{required: true, message: '请选择sku图片', trigger: 'change'}">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" prop="classifyImg" class="form-item-img-classify">
          <img-upload v-model="ruleForm.classifyImg" :options="classifyImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="备注(200字以内)" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark" maxlength="200" rows="4"></el-input>
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
      level: '',
      id: '',
      detail: {},
      classifyImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        type: '1',
        name: '',
        url: '',
        classifyImg: [],
        remark: '',
        sort: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        classifyImg: [
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
          this.ruleForm.type = this.detail.type
          this.ruleForm.name = this.detail.name
          this.ruleForm.url = this.detail.url
          this.classifyImgOptions.fileList.push({url: this.detail.image}) // 图片回显
          this.ruleForm.remark = this.detail.remark
          this.ruleForm.sort = this.detail.sort
        }).catch(e => {console.log(e)})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/rattle',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              type: this.ruleForm.type,
              name: this.ruleForm.name,
              url: this.ruleForm.url,
              image: this.ruleForm.classifyImg[0],
              remark: this.ruleForm.remark,
              sort: this.ruleForm.sort,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/classifyIndexHot'})
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
