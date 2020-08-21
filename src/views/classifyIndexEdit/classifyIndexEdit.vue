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
        <el-form-item label="部落classify" prop="classifyImg" class="form-item-img-classify">
          <img-upload v-model="ruleForm.classifyImg" :options="classifyImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="网页地址" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
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
        name: '',
        classifyImg: [],
        url: '',
        remark: '',
        sort: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        classifyImg: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      },
    }
  },
  components: {
    imgUpload
  },
  created() {
    this.level = this.$route.query.level
    this.parentId = this.$route.query.parentId
    this.id = this.$route.query.id
    if(this.id) this.getDetail()
  },
  mounted() {
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/tribe/detail/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.name = this.detail.name
          this.classifyImgOptions.fileList.push({url: this.detail.image}) // 图片回显
          this.ruleForm.remark = this.detail.remark
          this.ruleForm.sort = this.detail.sort
        }).catch(e => {console.log(e)})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/indexclassify/indexclassify',
            method: this.id ? 'PUT' : 'POST',
            data: {
              level: this.level,
              parentId: this.parentId ? this.parentId : '',
              id: this.id ? this.id : '',
              name: this.ruleForm.name,
              image: this.ruleForm.classifyImg[0],
              url: this.ruleForm.url,
              remark: this.ruleForm.remark,
              sort: this.ruleForm.sort,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/classifyIndex'})
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
