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
      userInfo: {},
    }
  },
  created() {
    console.log("%c ", "background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596115439024&di=401b419bc24232fee0cedd222d75a68d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D90499bbb692762d0803ea4b790ed0849%2Fd5be7b0928381f30d081a931a3014c086f06f024.jpg) no-repeat center;padding-left:640px;padding-bottom: 242px;")

    // 读取localStorage用户信息
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!this.userInfo && this.$route.path != '/register') {
      this.$router.push({path: '/login'})
    }
    this.setUserInfo(this.userInfo)
    if (this.userInfo) {
      // this.updateRouter(this.userInfo.roleSet)
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapActions(['updateRouter']),
  },
}
</script>

<style lang="stylus">
@import '//at.alicdn.com/t/font_1970537_dkymks5f8x8.css'; // 阿里巴巴图标库
@import './assets/css/base.css'; // 基础样式
@import './assets/css/common.styl'; // 公共样式
@import './assets/css/table.styl'; // 表格样式
@import './assets/css/edit.styl'; // 编辑样式
</style>