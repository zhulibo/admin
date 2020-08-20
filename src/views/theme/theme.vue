<template>
  <div class="theme">
    <ul class="theme-ct">
      <li>
        <div class="l"><span>导航栏背景颜色</span></div>
        <div class="r"><el-color-picker v-model="theme.colorNav" show-alpha :predefine="['#252a2f']" disabled></el-color-picker></div>
      </li>
      <li>
        <div class="l"><span>顶部栏背景颜色</span></div>
        <div class="r"><el-color-picker v-model="theme.colorHead" show-alpha :predefine="['#fff']"></el-color-picker></div>
      </li>
      <li>
        <div class="l"><span>表格、编辑区域背景色</span></div>
        <div class="r"><el-color-picker v-model="theme.colorBg" show-alpha :predefine="['rgba(255, 255, 255, 1)']"></el-color-picker></div>
      </li>
      <li>
        <div class="l"><span>背景图</span></div>
        <div class="r"><img-upload v-model="theme.bg" :options="bgImgOptions"></img-upload></div>
      </li>
      <li>
        <div class="l"><span>鼠标指针</span></div>
        <div class="r">
          <ul>
            <li>
              <img @click="changeCursorImg($event)" src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/11644.png" alt="">
              <span>坂本</span>
            </li>
            <li>
              <img @click="changeCursorImg($event)" src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/28930.png" alt="">
              <span>小埋</span>
            </li>
            <li>
              <img @click="changeCursorImg($event)" src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/35471.png" alt="">
              <span>三三</span>
            </li>
            <li>
              <img @click="changeCursorImg($event)" src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/45193.png" alt="">
              <span>书记</span>
            </li>
            <li>
              <el-button type="text" @click="changeCursorImg($event)">恢复默认</el-button>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <div class="l"><span></span></div>
        <div class="r">
          <el-button type="primary" plain @click="resetTheme()">全部恢复默认</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')

export default {
  name: 'theme',
  data() {
    return {
      bgImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
    }
  },
  components: {
    imgUpload,
  },
  created() {
  },
  mounted() {
    if(this.theme.bg[0]){
      this.bgImgOptions.fileList.push({url: this.theme.bg[0]})
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo,
      theme: state => state.theme.theme
    }),
  },
  methods: {
    ...mapMutations(['setTheme']),
    changeCursorImg(event) {
      let src = event.currentTarget.getAttribute("src")
      console.log(src)
      this.theme.cursorImg = src
    },
    resetTheme() {
      localStorage.removeItem('theme')
      this.$router.go(0)
    }
  },
  watch: {
    'theme': {
      handler: function (theme) {
        this.setTheme(theme)
        localStorage.setItem('theme', JSON.stringify(theme))
      },
      deep: true,
      immediate: true,
    },
  }
}
</script>

<style lang="stylus" scoped>
.theme{
  padding: 100px
  background-color: rgba(255,255,255,.6)
  .theme-ct{
    &>li{
      margin-top: 20px
      display: flex
      .l{
        margin-right: 1em
        width: 10em
        text-align: right
        font-weight: bold
      }
      .r{
        flex: 1
        ul{
          li{
            display: inline-block
            text-align: center
            margin-right: 10px
            width: 100px
            img{
              display: inline-block
              width: 100%
              height: 100%
              border: 1px dashed #ccc
            }
            span{
              display: inline-block
              margin-top: 10px
            }
          }
        }
      }
    }
  }
}
</style>