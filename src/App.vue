<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    console.log("%c ", "background: url('http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/logIn17419.gif') no-repeat center;padding-left:640px;padding-bottom: 242px;")

    // 读取localStorage用户信息
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo && this.$route.path != '/register') {
      this.$router.push({path: '/login'})
    }
    this.setUserInfo(userInfo)
    if (userInfo) {
      // this.updateRouter(userInfo.roleSet)
    }
    // 主题信息
    let theme = JSON.parse(localStorage.getItem('theme'))
    if (theme){
      this.setTheme(theme)
      if (theme.sheetMusic){
        this.global.sheetMusic()
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapMutations(['setTheme']),
    ...mapActions(['updateRouter']),
  },
}
</script>

<style lang="stylus">
@import '//at.alicdn.com/t/font_1970537_ev2d25c2ptv.css'; // 阿里巴巴图标库
@import './assets/css/base.css'; // 基础样式
@import './assets/css/common.styl'; // 公共样式
@import './assets/css/table.styl'; // 表格样式
@import './assets/css/edit.styl'; // 编辑样式
</style>