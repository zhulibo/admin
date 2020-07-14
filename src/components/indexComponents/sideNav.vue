<template>
  <div class="side-nav">
    <div class="logo">
      <img src="../../assets/img/left-logo.png" alt="">
    </div>
    <el-menu router :default-active="$route.path" background-color="#333" text-color="#ccc" active-text-color="#fff">
      <template v-for="(item,index) in routers" v-if="!item.hidden">
        <el-submenu :index="String(index)" v-if="item.children.length > 1">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="item2 in item.children" :index="item2.path" :key="item2.path">
            <i :class="item2.meta.icon"></i>
            <span>{{item2.name}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.children[0].path" v-if="item.children.length == 1">
          <i :class="item.children[0].meta.icon"></i>
          <span>{{item.children[0].name}}</span>
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
  .side-nav{
    overflow-y: auto;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    width: 220px;
    background-color: #333;
  }
  .logo{
    margin-bottom: 20px
    padding: 10px
    img{
      height: 3em
    }
  }
  .iconfont{
    padding-right: 10px
  }
  .el-menu {
    border-right: none;
  }
</style>
