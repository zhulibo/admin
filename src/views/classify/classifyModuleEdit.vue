<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="绑定一级分类" prop="parentId">
          <el-select v-model="ruleForm.parentId" placeholder="请选择" filterable>
            <el-option v-for="item in classifyList" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="模块顶部图" prop="moduleImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.moduleImg" :options="moduleImgOptions"></img-upload>
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
      classifyList: [],
      moduleImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        parentId: '',
        name: '',
        moduleImg: [],
        sort: '',
      },
      rules: {
        parentId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        name: [
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
    this.getClassifyList()
    if (this.id) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/goodsmanage/backadmin/model/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.parentId = this.detail.classifyId
          this.ruleForm.name = this.detail.name
          if (this.detail.image) this.moduleImgOptions.fileList.push({url: this.detail.image}) // 图片回显
          if (this.detail.sort != null) this.ruleForm.sort = this.detail.sort
        }).catch(e => {
        console.log(e)
      })
    },
    getClassifyList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/classify',
        method: 'GET',
        params: {
          level: 1,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/model',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              classifyId: this.ruleForm.parentId,
              name: this.ruleForm.name,
              image: this.ruleForm.moduleImg[0],
              sort: this.ruleForm.sort,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/classifyModuleList'})
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
