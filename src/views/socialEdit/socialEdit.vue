<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="ruleForm.content" maxlength="200" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="评论数" prop="commentNum">
          <el-input v-model="ruleForm.commentNum"></el-input>
        </el-form-item>
        <el-form-item label="点赞数" prop="supportNum">
          <el-input v-model="ruleForm.supportNum"></el-input>
        </el-form-item>
        <el-form-item label="分享量" prop="shareNum">
          <el-input v-model="ruleForm.shareNum"></el-input>
        </el-form-item>
        <el-form-item label="评论+点赞+转发总数" prop="totalNum">
          <el-input v-model="ruleForm.totalNum"></el-input>
        </el-form-item>
        <el-form-item label="是否屏蔽" prop="del">
          <el-switch
            v-model="ruleForm.del"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否置顶" prop="isTop">
          <el-switch
            v-model="ruleForm.isTop"
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      detail: {},
      ruleForm: {
        title: '',
        content: '',
        commentNum: '',
        supportNum: '',
        shareNum: '',
        totalNum: '',
        del: '',
        isTop: '',
      },
      rules: {
      },
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getdetail()
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
    getdetail() {
      this.$http({
        url: '/userorg/backadmin/article/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.title = this.detail.title
          this.ruleForm.content = this.detail.content
          this.ruleForm.commentNum = this.detail.commentNum
          this.ruleForm.supportNum = this.detail.supportNum
          this.ruleForm.shareNum = this.detail.shareNum
          this.ruleForm.totalNum = this.detail.totalNum
          this.ruleForm.del = this.detail.del
          this.ruleForm.isTop = this.detail.isTop
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/article',
            method: 'PUT',
            data: {
              id: this.id,
              title: this.ruleForm.title,
              content: this.ruleForm.content,
              commentNum: this.ruleForm.commentNum,
              supportNum: this.ruleForm.supportNum,
              shareNum: this.ruleForm.shareNum,
              totalNum: this.ruleForm.totalNum,
              del: this.ruleForm.del,
              isTop: this.ruleForm.isTop,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/social'})
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
