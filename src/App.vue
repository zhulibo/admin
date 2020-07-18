<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'App',
    data() {
      return {
        userInfo: {},
      }
    },
    created() {
      var _this = this
      // 读取localStorage用户信息
      _this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (!_this.userInfo && this.$route.path != '/register') {
        _this.$router.push({path: '/login'})
      }
      _this.setUserInfo(_this.userInfo)
      if (_this.userInfo) {
        _this.updateRouter(_this.userInfo.roleSet)
      }
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      ...mapActions(['updateRouter']),
    },
  }
</script>

<style lang="stylus">
  @import './assets/css/base.css';
  @import './assets/css/common.css';
  @import 'https://at.alicdn.com/t/font_1787136_crav0nqm947.css';
</style>