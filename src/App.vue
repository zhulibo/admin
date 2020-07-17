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
      // 测试
      localStorage.setItem('userInfo','{"userId":6,"username":"18203663961","password":"08d0a2d86f638967ec7b7d33c438ce91","tel":"18203663961","developers":null,"auth":0,"email":null,"idCard":null,"realName":null,"createDate":"2020-04-21T09:17:02.000+0000","authentication":0,"authenticationType":null,"qq":null,"remarks1":null,"remarks2":null,"remarks3":null,"remarks4":null,"remarks5":null,"roleSet":[{"id":1,"rolename":"super","permissionsSet":[{"id":1,"permissions":"all"}]},{"id":2,"rolename":"admin","permissionsSet":[{"id":2,"permissions":"other"}]}],"token":"c5039d3a-3146-48ad-af23-6a290986438e"}')
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