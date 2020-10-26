<template>
  <div class="theme">
    <ul class="theme-ct">
      <li>
        <div class="l"><span>导航栏背景颜色</span></div>
        <div class="r">
          <el-color-picker v-model="theme.colorNav" show-alpha :predefine="['#252a2f']" disabled></el-color-picker>
        </div>
      </li>
      <li>
        <div class="l"><span>顶部栏背景颜色</span></div>
        <div class="r">
          <el-color-picker v-model="theme.colorHead" show-alpha :predefine="['#fff']"></el-color-picker>
        </div>
      </li>
      <li>
        <div class="l"><span>表格、编辑区域背景色</span></div>
        <div class="r">
          <el-color-picker v-model="theme.colorBg" show-alpha :predefine="['rgba(255, 255, 255, 1)']"></el-color-picker>
        </div>
      </li>
      <li>
        <div class="l"><span>按键声音(z-p对应a-g3)</span></div>
        <div class="r">
          <el-switch
            v-model="theme.keyboardPiano"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </div>
      </li>
      <li>
        <div class="l"><span>背景图</span></div>
        <div class="r">
          <img-upload v-model="theme.bg" :options="bgImgOptions"></img-upload>
        </div>
      </li>
      <li>
        <div class="l"><span>鼠标指针</span></div>
        <div class="r">
          <ul>
            <li>
              <img @click="changeCursorImg($event)"
                   src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/11644.png" alt="">
              <span>坂本</span>
            </li>
            <li>
              <img @click="changeCursorImg($event)"
                   src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/32926.png" alt="">
              <span>我妻善逸</span>
            </li>
            <li>
              <img @click="changeCursorImg($event)"
                   src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/57825.png" alt="">
              <span>凶真</span>
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
    if (this.theme.bg[0]) {
      this.bgImgOptions.fileList.push({url: this.theme.bg[0]})
    }
  },
  computed: {
    theme() {
      return this.$store.getters.theme
    },
  },
  methods: {
    changeCursorImg(event) {
      let src = event.currentTarget.getAttribute("src")
      this.theme.cursorImg = src
    },
    resetTheme() {
      localStorage.removeItem('theme')
      this.$router.go(0)
    }
  },
  watch: {
    'theme': {
      handler: function (theme, oldTheme) {
        this.$store.dispatch('updateTheme', theme)
        localStorage.setItem('theme', JSON.stringify(theme))
      },
      deep: true,
    },
    'theme.keyboardPiano': {
      handler: function (val, oldVal) {
        console.log(val, oldVal)
        if (val != oldVal) {
          this.global.keyboardPiano()
          this.$router.go(0)
        }
      },
    },
  }
}
</script>

<style lang="stylus" scoped>
.theme {
  padding: 100px
  background-color: rgba(255, 255, 255, .6)
  .theme-ct {
    & > li {
      margin-top: 20px
      display: flex
      .l {
        margin-right: 1em
        width: 15em
        text-align: right
        font-weight: bold
      }
      .r {
        flex: 1
        ul {
          li {
            display: inline-block
            text-align: center
            margin-right: 10px
            width: 100px
            img {
              display: inline-block
              width: 100%
              height: 100%
              border: 1px dashed #ccc
              cursor: pointer
            }
            span {
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