<template>
  <div class="app-wrapper"
       :style="{ background: 'url(' + theme.bg[0] + ') center center/cover no-repeat', cursor: 'url(' + theme.cursorImg + ') 0 0, auto!important'}">
    <side-nav></side-nav>
    <head-bar></head-bar>
    <div class="main-content">
<!--      <div class="back" @click="back">返回</div>-->
<!--      <breadcrumb></breadcrumb>-->
      <router-view></router-view>
    </div>
<!--    13193440666 为客服账号-->
    <div class="chatCt" v-if="userInfo.phone == 13193440666">
      <chat></chat>
    </div>
  </div>
</template>

<script>
import sideNav from '@/components/sideNav/sideNav'
import headBar from '@/components/headBar/headBar'
import breadcrumb from '@/components/breadcrumb/breadcrumb'
const chat = () => import(/* webpackChunkName: "chat" */ '@/components/chat/chat')

export default {
  name: 'index',
  data() {
    return {
    }
  },
  components: {
    sideNav,
    headBar,
    breadcrumb,
    chat,
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
    theme() {
      return this.$store.getters.theme
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // back() {
    //   this.$router.go(-1)
    // },
  }
}
</script>

<style lang="stylus" scoped>
.app-wrapper {
  width: 100%
  height: 100%
}
.main-content {
  overflow-y auto
  position: absolute
  top: 50px
  left: 200px
  right: 0
  bottom: 0
  padding: 10px;
  // chrome
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .2)
  }
  &::-webkit-scrollbar-track {
    background-color: transparent
  }
  // 火狐
  scrollbar-color: rgba(0, 0, 0, .2) transparent
  scrollbar-width: thin
}
.back{
  display: inline-block
  padding: 0 10px
  border: 1px solid #ddd
  cursor: pointer
  background-color: #fff
}
</style>
