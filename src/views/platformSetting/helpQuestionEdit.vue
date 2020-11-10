<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="绑定二级分类" prop="parentId">
          <el-select v-model="ruleForm.parentId" placeholder="请选择" filterable>
            <el-option v-for="item in classifyList" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemEdit',
  data() {
    return {
      classifyTwoId: '',
      id: '',
      detail: {},
      classifyList: [],
      ruleForm: {
        fatherId: '',
        name: '',
      },
      rules: {
        fatherId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    this.classifyTwoId = this.$route.query.classifyTwoId
    this.id = this.$route.query.id
    this.getClassifyList()
    if (this.id) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/help/ls/help/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.categoryId = this.detail.categoryId
          this.ruleForm.title = this.detail.title
          this.ruleForm.content = this.detail.content
        }).catch(e => {
        console.log(e)
      })
    },
    getClassifyList: function () {
      this.$http({
        url: '/userorg/backadmin/help/ls/classify',
        method: 'GET',
        params: {
          level: 2,
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
            url: '/userorg/backadmin/help/ls/help',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              categoryId: this.ruleForm.categoryId,
              title: this.ruleForm.title,
              content: this.ruleForm.content,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/helpClassifyOneList',query: {classifyTwoId: this.classifyTwoId}})
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
