<template>
  <div class="head-bar">
    <div class="navbar clearfix">
      <div class="user clearfix">
        <div class="pic">
          <img src="../../assets/img/logo.png" alt="">
        </div>
<!--        <span>{{userInfo.username}}</span>-->
        <i class="el-icon-caret-bottom"></i>
        <p @click="logOut">退出</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'headBar',
  data() {
    return {}
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
    ...mapMutations(['setUserInfo']),
    logOut: function () {
      this.$http({
        url: '/userorg/login/back/out',
        method: 'POST',
        data: {
          token: this.userInfo
        }
      })
        .then(res => {
          localStorage.clear();
          this.$router.push({path: '/login'})
        }).catch(res => {console.log(res)})
    },
  }
}
</script>

<style lang="stylus" scoped>
.head-bar {
  position: absolute
  z-index 100
  top: 0
  left: 220px
  right: 0
  height: 70px;
  background-color: #fff;
  box-shadow 0 0 5px rgba(0, 0, 0, .1)
}
.user {
  float: right;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  padding-bottom: 0
}
.user .pic {
  float: left;
  overflow: hidden;
  display: inline-block;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.user .pic img {
  width: 100%;
  height: 100%;
}
.user span {
  margin-left: 15px;
  margin-right: 10px;
  margin-top: 7px;
  float: left;
  font-size: 16px;
}
.user i {
  margin-top: 10px;
  font-size: 20px;
  color: #666;
}
.user p {
  overflow: hidden;
  height: 0;
  position: absolute;
  z-index: 100;
  top: 100%;
  right: 0;
  width: 100%;
  line-height: 3;
  font-size: 16px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(100, 100, 100, .5);
  transition: all .2s;
  opacity: .5;
  cursor: pointer;
}
.user:hover p {
  height: 3em;
  opacity: 1;
}
</style>
