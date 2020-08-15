<template>
  <div class="el-upload-ct">
    <el-upload
      :headers="{Authorization: userInfo}"
      :action="this.global.baseUrl + '/userorg/backadmin/uploading'"
      list-type="picture-card"
      :accept='options.accept'
      :multiple="true"
      :limit="options.limit"
      :file-list="options.fileList"
      :on-success="handleImageSuccess"
      :on-remove="handleImageRemove"
      :on-exceed="handleImageexceed">
      <div v-if="options.type == 2" slot="file" slot-scope="{file}">
        <video v-if="file.response" :src="file.response.data" controls alt=""></video>
      </div>
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

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
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    handleImageSuccess(res, file, fileList) {
      console.log('res', res)
      console.log('file', file)
      console.log('fileList', fileList)
      this.fileList = fileList
    },
    handleImageRemove(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
      this.fileList = fileList
    },
    handleImageexceed(file, fileList) {
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
          if(fileList[i].status != 'success') { // 多图上传此判断有性能漏洞，待优化
            return
          }
          // console.log('---')
          // console.log(JSON.parse(JSON.stringify(fileList[i])))
          if (fileList[i].response) {
            imgUrls.push(fileList[i].response.data)
          }else{
            imgUrls.push(fileList[i].url)
          }
        }
        this.$emit('input', imgUrls)
      },
      deep: true
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>