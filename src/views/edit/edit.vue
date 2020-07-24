<template>
  <div>
    <div class="head-bar clearfix">
      <h2>编辑app</h2>
    </div>
    <div class="ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="app-edit-ruleForm">
        <el-form-item label="名称" prop="softName">
          <el-input v-model="ruleForm.softName"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="classify">
          <el-select v-model="ruleForm.classify" placeholder="请选择">
            <el-option v-for="item in classifyList" :key="item.id" :label="item.classifyName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述（1000字以内）" prop="describes">
          <el-input type="textarea" v-model="ruleForm.describes" maxlength="1000" rows="8"></el-input>
        </el-form-item>
        <el-form-item label="icon" prop="iconUrl">
          <el-upload
            action="https://back.goku.vip/backSoftware/uploadImg"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif"
            :limit="1"
            :file-list="iconFileList"
            :class = "{disabled:isMaxAvatar}"
            :on-success="handleAvatarSuccess"
            :on-remove="handleAvatarRemove"
            :on-exceed="handleAvatarexceed">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="截图（1-5张）" prop="screenshotUrl" :class="softType == 1 ? 'screenshot-item-game' : 'screenshot-item-app'">
          <el-upload
            action="https://back.goku.vip/backSoftware/uploadImg"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif"
            :multiple="true"
            :limit="5"
            :file-list="ScreenshotFileList"
            :class = "{disabled:isMaxScreenshot}"
            :on-success="handleScreenshotSuccess"
            :on-remove="handleScreenshotRemove"
            :on-exceed="handleScreenshotexceed">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'appEdit',
    data() {
      return {
        appDetail: {}, // 存储详情
        softId: null,
        fitType: null,
        softType: null,
        classifyList: {},
        isMaxAvatar: false,
        isMaxScreenshot: false,
        iconFileList: [],
        ScreenshotFileList: [],
        ruleForm: { // 表单的值
          softName: '',
          classify: null,
          describes: '',
          iconUrl: '',
          screenshotUrl: [],
        },
        rules: { // 验证规则
          softName: [
            // {required: true, message: '请输入', trigger: 'change'}
          ],
          classify: [
            // {required: true, message: '请选择', trigger: 'change'}
          ],
          describes: [
            // {required: true, message: '请输入', trigger: 'change'}
          ],
          iconUrl: [
            // {required: true, message: '请上传应用截图', trigger: 'change'}
          ],
          screenshotUrl: [
            // {required: true, message: '请上传应用截图', trigger: 'change'}
          ],
        },
      }
    },
    created() {
      this.softId = this.$route.query.softId
      this.getClassflyList()

      this.$http({ // app信息
        url: '/backSoftware/getBackDetails',
        method: 'GET',
        params: {
          userId: this.userInfo.userId,
          softId: this.softId,
        }
      })
        .then(res => {
          this.appDetail = res.data.data
        })
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
      getClassflyList() {
        this.$http({
          url: '/backSoftware/softwareClassify',
          method: 'GET',
          params: {
            softType: this.softType,
          }
        })
          .then(res => {
            this.classifyList = res.data.data
          })
      },
      handleAvatarSuccess(res, file, fileList) {
        this.ruleForm.iconUrl = res.data;
      },
      handleAvatarRemove(file, fileList) {
        this.ruleForm.iconUrl = ''
      },
      handleAvatarexceed(file, fileList) {
        console.log('file',file)
        console.log('fileList',fileList)
        this.$message({
          type: 'warning',
          message: '最多只可以上传1张icon哦'
        });
      },
      handleScreenshotSuccess(res, file, fileList) {
        console.log('res',res)
        console.log('file',file)
        console.log('fileList',fileList)
        this.ruleForm.screenshotUrl.push(file.response.data)
      },
      handleScreenshotRemove(file, fileList) {
        console.log('file',file)
        console.log('fileList',fileList)
        for (let i = 0; i < this.ruleForm.screenshotUrl.length; i++) {
          if (this.ruleForm.screenshotUrl[i] == file.url) {
            this.ruleForm.screenshotUrl.splice(i, 1)
          }
          if (file.response && this.ruleForm.screenshotUrl[i] == file.response.data) {
            this.ruleForm.screenshotUrl.splice(i, 1)
          }
        }
      },
      handleScreenshotexceed(file, fileList) {
        console.log('file',file)
        console.log('fileList',fileList)
        this.$message({
          type: 'warning',
          message: '最多只可以上传5张截图哦'
        });
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => { // 验证表单
          if (valid) {
            // 提交表单
            this.$http({
              url: '/backSoftware/editSoftware',
              method: 'PUT',
              headers: {
                "content-type": "application/json",
              },
              data: {
                aa: '123',
                bb: '233'
              },
            }).then(function (res) {
              console.log(res)
              if (res.data.code = 201){
                this.$message({
                  type: 'success',
                  message: res.data.msg
                });
                this.$router.push({path: '/table'})
              } else {
                this.$message({
                  type: 'info',
                  message: res.data.msg
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    watch: {
      'ruleForm.iconUrl': function (val) {
        if (this.ruleForm.iconUrl != ''){
          this.isMaxAvatar = true
        }else{
          this.isMaxAvatar = false
        }
      },
      'ruleForm.screenshotUrl': function (val) {
        if (this.ruleForm.screenshotUrl.length >= 5){
          this.isMaxScreenshot = true
        }else{
          this.isMaxScreenshot = false
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  >>> .disabled .el-upload--picture-card{
    display: none
  }
  .head-bar{
    margin-top: 20px
    h2{
      margin-top: 5px
      float: left
      padding-left: 5px
      border-left: 4px solid #409EFF
      display: inline-block;
    }
  }
  .ct{
    margin-top: 20px
    padding: 20px 0
    background-color: #fff
  }

  .app-edit-ruleForm{
    max-width 1020px
    padding: 20px 0
  }
  >>> .screenshot-item-app .el-upload-list--picture-card .el-upload-list__item{
    height: 263px
  }
  >>> .screenshot-item-app .el-upload--picture-card{
    height: 263px
    line-height: 263px
  }
  >>> .screenshot-item-game .el-upload-list--picture-card .el-upload-list__item{
    width: 263px
  }
  >>> .screenshot-item-game .el-upload--picture-card{
    width: 263px
  }
  .upload-app-item .upload-app-li{
    float: left
    width: 360px
    margin-right: 30px
  }
  .upload-app-item .upload-app-li .tip{
    color: #999
  }
  .upload-app-item .upload-app-li .url-input{
  }
</style>
