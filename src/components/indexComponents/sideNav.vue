<template>
  <div class="side-nav">
    <div class="logo">
      <img src="../../assets/img/logo.png" alt="">
    </div>
    <el-menu router :default-active="$route.path" background-color="#333" text-color="#ccc" active-text-color="#fff">
      <template v-for="(item,index) in routers" v-if="!item.meta.hidden">
        <el-menu-item :index="item.children[0].path">
          <i :class="item.meta.icon"></i>
          <span class="li">{{item.children[0].name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'sideNav',
    data() {
      return {
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapState({
        userInfo: state => state.login.userInfo,
        routers: state => state.permission.routers
      }),
    },
    methods: {
      ...mapMutations(['setUserInfo']),
    }
  }
</script>

<style lang="stylus" scoped>
  .logo{
    margin-bottom: 20px
    padding: 10px
    img{
      height: 3em
    }
  }
  .side-nav{
    overflow-y: auto;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    width: 220px;
    background-color: #333;
  }
  .iconfont{
    font-size 18px
  }
  .li{
    padding-left: 10px
  }
  .el-menu {
    border-right: none;
  }
</style>
