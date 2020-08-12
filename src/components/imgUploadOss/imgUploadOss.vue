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
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
        <el-form-item label="截图（1-5张）" prop="imgUrl">
          <el-upload
            action=""
            :http-request="uploadAliOss"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif"
            :multiple="true"
            :limit="5"
            :file-list="ScreenshotFileList"
            :on-remove="handleScreenshotRemove"
            :on-exceed="handleScreenshotexceed">
          <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { client, getFileNameUUID } from '@/utils/aliOss/aliOss'

export default {
  name: 'imgUploadOss',
  data() {
    return {
      aliOssConfig: {},
      progress: 0,
      ruleForm: {
        title: '',
        imgUrl: []
      },
      rules: {},
    }
  },
  created() {
    this.getAliOssConfig()
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
    getAliOssConfig() {
      this.$http({
        url: '/userorg/backadmin/article',
        method: 'POST',
      }).then(res => {
        this.aliOssConfig = res.data
      })
    },
    uploadAliOss(file) {
      const _this = this

      const fileTypeIndex = file.file.name.lastIndexOf('.')
      const fileType = file.file.name.substring(fileTypeIndex)
      const fileTypeList = ['.jpg', '.jpeg', '.png', '.gif']

      if (fileTypeList.indexOf(fileType) < 0) {
        this.$message.warning('不支持的格式!')
        return
      }

      if (file.size > 1024 * 1024 * 3) {
        this.$message.warning('图片最大3M')
        return
      }

      async function multipartUpload() {

        const fileName = getFileNameUUID() + fileType

        client(_this.aliOssConfig).put(fileName, file.file,
          {
            progress: function (p) { // 获取进度条的值
              _this.progress = p * 100
            }
          }).then(res => {
          // 下面是如果对返回结果再进行处理，根据项目需要
          console.log(res)
          _this.ruleForm.imgUrl.push({
            name: file.file.name,
            url: res.url
          })
        }).catch(err => {
          console.log('err:', err)
        })
      }

      multipartUpload()
    },
    handleScreenshotRemove(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
      for (let i = 0; i < this.ruleForm.imgUrl.length; i++) {
        if (this.ruleForm.imgUrl[i] == file.url) {
          this.ruleForm.imgUrl.splice(i, 1)
        }
        if (file.response && this.ruleForm.imgUrl[i] == file.response.data) {
          this.ruleForm.imgUrl.splice(i, 1)
        }
      }
    },
    handleScreenshotexceed(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
      this.$message.warning('最多只可以上传5张图片哦')
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
