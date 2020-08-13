<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item :label="detail.type == 1 ? '图片' : '视频'" class="form-item-original">
          <ul>
            <li v-for="item in detail.images">
              <div class="ct">
                <img v-if="detail.type == 1" :src="item.url" alt="">
                <video v-else :src="item.url" controls alt=""></video>
              </div>
              <span>是否屏蔽</span>
              <el-switch
                v-model="item.del"
                :active-value="1"
                :inactive-value="0"
                @change="switchStatus(item)"
              >
              </el-switch>
            </li>
          </ul>
        </el-form-item>
        <el-form-item :label="detail.type == 1 ? '添加新的图片' : '添加新的视频'" prop="screenshotUrl" :class="detail.type == 1 ? 'form-item-images' : 'form-item-video'">
          <el-upload
            :headers="{Authorization: userInfo}"
            :action="this.global.baseUrl + '/userorg/backadmin/uploading'"
            list-type="picture-card"
            :accept="detail.type == 1 ? '.jpg,.jpeg,.png,.gif' : '.mp4'"
            :multiple="true"
            :on-success="handleScreenshotSuccess"
            :on-remove="handleScreenshotRemove"
            :on-exceed="handleScreenshotexceed">
            <div v-if="detail.type == 2" slot="file" slot-scope="{file}">
              <video v-if="file.response" :src="file.response.data" controls alt=""></video>
            </div>
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
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
        screenshotUrl: [],
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
    switchStatus(item) {
      this.$http({
        url: '/userorg/backadmin/article/image',
        method: 'PUT',
        data: {
          id: item.id,
          del: item.del,
          updateType: this.detail.type
        }
      }).then(res => {
        this.$message.success(res.msg)
      })
    },
    handleScreenshotSuccess(res, file, fileList) {
      console.log('res', res)
      console.log('file', file)
      console.log('fileList', fileList)
      this.ruleForm.screenshotUrl.push(file.response.data)
    },
    handleScreenshotRemove(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
      for (let i = 0; i < this.ruleForm.screenshotUrl.length; i++) {
        if (file.response && this.ruleForm.screenshotUrl[i] == file.response.data) {
          this.ruleForm.screenshotUrl.splice(i, 1)
        }
      }
    },
    handleScreenshotexceed(file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          // 添加images属性
          let promise = new Promise((resolve,reject) =>{

            if(this.ruleForm.screenshotUrl.length == 0) {
              resolve()
              return
            }

            let images = []
            for (let i = 0; i < this.ruleForm.screenshotUrl.length; i++) {

              if (this.detail.type == 2) { // 视频
                images.push({
                  userId: this.detail.images[0].userId,
                  articleId: this.detail.images[0].articleId,
                  url: this.ruleForm.screenshotUrl[i],
                  type: this.detail.type,
                })
                if (this.ruleForm.screenshotUrl.length == i+1) resolve(images)
              }else{ // 图片
                let img = new Image()
                img.src = this.ruleForm.screenshotUrl[i]
                img.onload = () => {
                  images.push({
                    userId: this.detail.images[0].userId,
                    articleId: this.detail.images[0].articleId,
                    url: this.ruleForm.screenshotUrl[i],
                    type: this.detail.type,
                    imageWidth: img.width,
                    imageHeight: img.height,
                  })
                  if (this.ruleForm.screenshotUrl.length == i+1) resolve(images)
                }
              }
            }
          })

          promise.then(images => {
            this.$http({
              url: '/userorg/backadmin/article',
              method: 'PUT',
              data: {
                id: this.id,
                images: images,
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
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  watch: {

  }
}
</script>

<style lang="stylus" scoped>
.form-item-original{
  li{
    float: left
    display: inline-block
    margin-bottom: 20px
    margin-right: 20px
    text-align: center
    img{
      width 200px
      height 200px
    }
    span{
      display: inline-block
      margin-right: 10px
    }
    video{
      width 200px
      height 400px
      background-color: #000
    }
  }
}
>>> .form-item-video .el-upload-list--picture-card .el-upload-list__item{
  width 200px
  height: 400px
  div{
    width: 100%
    height: 100%
    video{
      width: 100%
      height: 100%
      background-color: #000
    }
  }
}
>>> .form-item-video .el-upload--picture-card{
  width 200px
  height: 400px
  line-height: 400px
}
</style>
