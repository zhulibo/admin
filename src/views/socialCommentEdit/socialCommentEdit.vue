<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="评论内容" prop="content">
          <el-input type="textarea" v-model="ruleForm.content" maxlength="200" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="是否屏蔽" prop="del">
          <el-switch
            v-model="ruleForm.del"
            :active-value="1"
            :inactive-value="0">
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
export default {
  name: 'itemEdit',
  data() {
    return {
      articleId: '',
      id: '',
      detail: {},
      ruleForm: {
        content: '',
        del: '',
      },
      rules: {
      },
    }
  },
  created() {
    this.articleId = this.$route.query.articleId
    this.id = this.$route.query.id
    this.ruleForm.content = this.$route.query.content
    this.ruleForm.del = this.$route.query.del
  },
  mounted() {
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/articlecomment',
            method: 'PUT',
            data: {
              id: this.id,
              content: this.ruleForm.content,
              del: this.ruleForm.del,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/socialComment', query: {articleId: this.articleId}})
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
