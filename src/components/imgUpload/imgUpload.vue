<template>
  <div class="el-upload-ct">
    <el-upload
      :headers="{Authorization: token}"
      :action="this.global.baseUrl + '/userorg/backadmin/uploading'"
      list-type="picture-card"
      :accept='options.accept'
      :multiple="true"
      :limit="options.limit"
      :file-list="options.fileList"
      :before-upload="handleImgBeforeUpload"
      :on-success="handleImgSuccess"
      :on-error="handleImgError"
      :on-remove="handleImgRemove"
      :on-exceed="handleImgexceed">
<!--      兼容视频返显开始-->
      <div v-if="options.type == 2" slot="file" slot-scope="{file}" class="video">
        <video v-if="file.response" :src="file.response.data" controls alt=""></video>
        <video v-else :src="file.url" controls alt="" controls alt=""></video>
        <i class="el-icon-delete" @click="removeItem(file)"></i>
      </div>
<!--      兼容视频返显结束-->

      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
// import {renameFileName} from '@/utils/renameFileName/renameFileName'

export default {
  name: 'imgUpload',
  props: {
    options: {},
  },
  data() {
    return {
      fileList: [] // 反显图片列表
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    token() {
      return this.$store.getters.userInfo.token
    },
  },
  methods: {
    // 删除视频
    removeItem(file) {
      console.log(file)
      for (let i = 0; i < this.fileList.length; i++) {
        if(this.fileList[i].uid == file.uid){
          this.fileList.splice(i,1)
          break
        }
      }
    },
    handleImgBeforeUpload(file) {

      if (/.*[\u4e00-\u9fa5]+.*$/.test(file.name)) {
        this.$message.warning('暂不支持包含汉字的文件上传')
        return false
      }

      // if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif') {
      //   if (file.size / 1024 / 1024 >= 10) {
      //     this.$message.warning('图片最大10M')
      //     return false
      //   }
      //   // const fileTypeIndex = file.name.lastIndexOf('.')
      //   // const fileType = file.name.substring(fileTypeIndex)
      //   // const fileName = renameFileName() + fileType
      //   // const copyFile = new File([file], fileName)
      //   // return Promise.resolve(copyFile)
      // }
    },
    handleImgSuccess(res, file, fileList) {
      console.log('res', res)
      console.log('file', file)
      console.log('fileList', fileList)
      if (res.code == 0) {
        this.fileList = fileList
      } else {
        this.$message.error(res.msg)
      }
    },
    handleImgError(err, file, fileList) {
      console.log('err', err)
      console.log('file', file)
      console.log('fileList', fileList)
      this.$message.error('逻辑处理错误')
    },
    handleImgRemove(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
      this.fileList = fileList
    },
    handleImgexceed(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
      this.$message.warning(`最多${this.options.limit}张图片←_←`)
    },
  },
  watch: {
    'options.fileList': { // 复制fileList给子组件
      handler: function (fileList) {
        this.fileList = fileList
      },
      immediate: true
    },
    'fileList': {
      handler: function (fileList) { // 子组件fileList发生变化，把imgUrls赋值给父组件的ruleForm
        let imgUrls = []
        for (let i = 0; i < fileList.length; i++) {
          // 上传过程中fileList.status会发生变化
          // console.log(JSON.parse(JSON.stringify(fileList[i])))
          if (fileList[i].status && fileList[i].status != 'success') {
            return
          }
          if (fileList[i].response) {
            imgUrls.push(fileList[i].response.data)
          } else {
            imgUrls.push(fileList[i].url)
          }
        }

        this.$emit('input', imgUrls)
      },
      deep: true,
      immediate: true
    },
  }
}
</script>

<style lang="stylus" scoped>
.video{
  position: relative
  i{
    display: none
    position: absolute
    z-index: 100
    top: 50%
    left: 50%
    transform translate(-50%, -50%)
    color: #fff
    font-size 20px
    cursor: pointer
  }
  &:hover i{
    display: block
  }
}
</style>