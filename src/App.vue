<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    console.log("%c ", "background: url('http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/logIn17419.gif') no-repeat center;padding-left:640px;padding-bottom: 242px;")

    // 读取localStorage用户信息
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo && this.$route.path != '/register') {
      this.$router.push({path: '/login'})
    } else {
      this.$store.dispatch('updateUserInfo', userInfo)
      this.$store.dispatch('updateRouter', userInfo.permission)
    }

    // 主题信息
    let theme = JSON.parse(localStorage.getItem('theme'))
    if (theme) {
      this.$store.dispatch('updateTheme', theme)
      if (theme.keyboardPiano) {
        this.global.keyboardPiano()
      }
    }
  },
  mounted() {
  },
}
</script>

<style lang="stylus">
@import '//at.alicdn.com/t/font_1970537_63gf84elyom.css' // 阿里巴巴图标库
@import './assets/css/base.css' // 基础样式
@import './assets/css/common.styl' // 公共样式
@import './assets/css/table.styl' // 表格样式
@import './assets/css/edit.styl' // 编辑样式
</style>