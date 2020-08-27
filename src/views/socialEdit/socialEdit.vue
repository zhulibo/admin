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
        <el-form-item :label="detail.type == 1 ? '添加新的图片' : '添加新的视频'" prop="logoImg" :class="detail.type == 1 ? 'form-item-images' : 'form-item-video'">
          <img-upload v-model="ruleForm.logoImg" :options="logoImgOptions"></img-upload>
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
const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      detail: {},
      logoImgOptions: {
        fileList: [],
        type: '',
        accept: '',
        limit: 9
      },
      ruleForm: {
        logoImg: [],
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
  components: {
    imgUpload
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail()
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
    getDetail() {
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
          this.logoImgOptions.type = this.detail.type == 1 ? '1' : '2'
          this.logoImgOptions.accept = this.detail.type == 1 ? '.jpg,.jpeg,.png,.gif' : '.mp4'
        }).catch(e => {console.log(e)})
    },
    switchStatus(item) {
      this.$http({
        url: '/userorg/backadmin/article/image',
        method: 'PUT',
        data: {
          id: item.id,
          // del: item.del,
          updateType: 1
        }
      }).then(res => {
        this.$message.success(res.msg)
      }).catch(e => {
        for (let i = 0; i < this.detail.images.length; i++) {
          if(this.detail.images[i].id == item.id) {
            this.detail.images[i].del = item.del == 1 ? 0 : 1
          }
        }
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let submitForm = async () => {

            let ImgsParams = await this.getImgsParams()

            this.$http({
              url: '/userorg/backadmin/article',
              method: 'PUT',
              data: {
                id: this.id,
                images: ImgsParams,
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
            }).catch(e => {console.log(e)})

          }
          submitForm()

        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    getImgsParams() { // 添加图片参数
      return new Promise( (resolve, reject) => {
        if(this.ruleForm.logoImg.length == 0) {
          resolve()
          return
        }

        let imgs = []
        for (let i = 0; i < this.ruleForm.logoImg.length; i++) {

          if (this.detail.type == 2) { // 视频
            imgs.push({
              userId: this.detail.images[0].userId,
              articleId: this.detail.images[0].articleId,
              url: this.ruleForm.logoImg[i],
              type: this.detail.type,
            })
            if (this.ruleForm.logoImg.length == i+1) resolve(imgs)
          }else{ // 图片
            let img = new Image()
            img.src = this.ruleForm.logoImg[i]
            img.onload = () => {
              imgs.push({
                userId: this.detail.images[0].userId,
                articleId: this.detail.images[0].articleId,
                url: this.ruleForm.logoImg[i],
                type: this.detail.type,
                imageWidth: img.width,
                imageHeight: img.height,
              })
              if (this.ruleForm.logoImg.length == i+1) resolve(imgs)
            }
          }
        }
      })
    }
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
