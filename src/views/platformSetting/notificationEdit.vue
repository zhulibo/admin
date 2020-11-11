<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="要跳转的类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">纯文字不跳转</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择用户" prop="nickName">
          <el-input v-model="ruleForm.nickName" @focus="openSelectDialog"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="推送图片" prop="iconImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.iconImg" :options="iconImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="内容(500字以内)" prop="content">
          <el-input type="textarea" v-model="ruleForm.content" maxlength="500" rows="8"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <select-user @confirmSelectItem="confirmSelectItem" :dialogVisible.sync="selectItemOption.dialogVisible" :singleSelect="selectItemOption.singleSelect"></select-user>
  </div>
</template>

<script>
import selectUser from "@/components/selectItem/selectUser";
const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      detail: {},
      iconImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        type: 1,
        userId: '',
        nickName: '',
        title: '',
        iconImg: [],
        content: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        nickName: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        title: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        iconImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        content: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
      selectItemOption: { // 选择组件配置参数
        dialogVisible: false,
        singleSelect: true, // 只可以单选
      },
    }
  },
  components: {
    imgUpload,
    selectUser,
  },
  created() {
    this.ruleForm.userId = this.$route.query.userId
    this.ruleForm.nickName = this.$route.query.nickName
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/message',
            method: 'POST',
            data: {
              type: this.ruleForm.type,
              userId: this.ruleForm.userId,
              title: this.ruleForm.title,
              image: this.ruleForm.iconImg[0],
              content: this.ruleForm.content,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/notificationList'})
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    openSelectDialog() {
      this.selectItemOption.dialogVisible = true
    },
    confirmSelectItem(multipleSelection) {
      console.log(multipleSelection)
      let ids = []
      for (let i = 0; i < multipleSelection.length; i++) {
        ids.push({
          userId: multipleSelection[i].userId,
          nickName: multipleSelection[i].nickName,
        })
      }
      console.log(ids)
      this.ruleForm.userId = ids[0].userId
      this.ruleForm.nickName = ids[0].nickName
      this.selectItemOption.dialogVisible = false
    },
    confirm() {
    },
  },
}
</script>

<style lang="stylus" scoped>
// 隐藏全选
>>> .el-table__header .el-checkbox{
  display: none
}
</style>
