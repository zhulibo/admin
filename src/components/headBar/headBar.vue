<template>
  <div class="head-bar" :style="{ backgroundColor: theme.colorHead}">
    <div class="navbar clearfix">
      <div class="user clearfix">
<!--        <div class="pic">-->
<!--          <img src="../../assets/img/logo.png" alt="">-->
<!--        </div>-->
        <span v-if="userInfo.type == 1">管理员{{ userInfo.phone }}</span>
        <span v-if="userInfo.type == 2">供货商{{ userInfo.phone }}</span>
        <i class="el-icon-caret-bottom"></i>
        <p @click="logOut">退出</p>
      </div>
    </div>
  </div>
</template>

<script>
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
    userInfo() {
      return this.$store.getters.userInfo
    },
    theme() {
      return this.$store.getters.theme
    },
  },
  methods: {
    logOut: function () {
      this.$http({
        url: '/userorg/login/back/out',
        method: 'POST',
        data: {
          token: this.userInfo.token
        }
      })
        .then(res => {
          localStorage.removeItem('userInfo')
          // this.$router.push({path: '/login'})
          location.reload() // 防止不清空全局变量引起bug，待优化
        }).catch(e => {
        console.log(e)
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.head-bar {
  position: absolute
  z-index 100
  top: 0
  left: 200px
  right: 0
  height: 60px;
  background-color: #fff;
  box-shadow 0 0 5px rgba(0, 0, 0, .1)
}
.user {
  float: right;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
}
.user .pic {
  float: left;
  overflow: hidden;
  display: inline-block;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow 0 2px 5px rgba(0, 0, 0, .2)
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
