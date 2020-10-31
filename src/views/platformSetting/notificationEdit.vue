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
          <el-input v-model="ruleForm.nickName" @focus="chooseUser"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="推送图片" prop="iconImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.iconImg" :options="iconImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="内容(200字以内)" prop="content">
          <el-input type="textarea" v-model="ruleForm.content" maxlength="200" rows="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog">
      <el-dialog title="请选择用户" :visible.sync="userDialogVisible">
        <el-form :inline="true" :model="formInline2" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline2.nickName" placeholder="请输入用户名" @keyup.enter.native="getUserList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline2.homesickId" placeholder="漫想家id" @keyup.enter.native="getUserList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline2.phone" placeholder="请输入手机号" @keyup.enter.native="getUserList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getUserList">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="choose-list">
          <el-table :data="userList" @selection-change="handleSelectionChange" ref="table">
            <el-table-column prop="homesickId" label="漫想家id" align="center">
              <template slot-scope="scope">{{ scope.row.homesickId | noneToLine }}</template>
            </el-table-column>
            <el-table-column prop="userPhone" label="手机号" align="center">
              <template slot-scope="scope">{{ scope.row.userPhone | noneToLine }}</template>
            </el-table-column>
            <el-table-column prop="header" label="头像" align="center" class-name="row-img">
              <template slot-scope="scope">
                <img :src="scope.row.header" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" align="center">
              <template slot-scope="scope">{{ scope.row.nickName | noneToLine }}</template>
            </el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
          </el-table>
          <div class="pagination-ct clearfix">
            <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage2"
                           :page-count="totalPages2"
                           @current-change="handleCurrentChange2" background></el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm()">确 定</el-button>
        </span>
      </el-dialog>
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
      formInline2: {
        nickName: '',
        homesickId: '',
        phone: '',
      },
      imgBorderId: '',
      userDialogVisible: false,
      userList: [],
      pageSize2: 6,
      currentPage2: 1,
      totalPages2: null,
      multipleSelection: [],
    }
  },
  components: {
    imgUpload
  },
  created() {
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
    chooseUser() {
      this.userDialogVisible = true
      this.getUserList()
    },
    getUserList() {
      this.$http({
        url: '/userorg/backadmin/appuser',
        method: 'GET',
        params: {
          phone: this.formInline2.phone,
          homesickId: this.formInline2.homesickId,
          nickName: this.formInline2.nickName,
          pageSize: this.pageSize2,
          pageNumber: this.currentPage2,
        }
      })
        .then(res => {
          this.userList = res.data.list
          this.totalPages2 = res.data.pages
          this.currentPage2 = res.data.pageNum
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange2: function (val) { // 页码变更
      this.currentPage2 = val
      this.getUserList()
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.table.clearSelection()
        this.$refs.table.toggleRowSelection(val.pop())
      }
        this.multipleSelection = val;
      },
    confirm() {
      this.ruleForm.userId = this.multipleSelection[0].userId
      this.ruleForm.nickName = this.multipleSelection[0].nickName
      this.userDialogVisible = false
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
