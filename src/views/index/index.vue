<template>
  <div class="app-wrapper" :style="{ background: 'url(' + theme.bg[0] + ') center center/cover no-repeat', cursor: 'url(' + theme.cursorImg + ') 0 0, auto!important'}">
    <side-nav></side-nav>
    <head-bar></head-bar>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import sideNav from '@/components/sideNav/sideNav'
import headBar from '@/components/headBar/headBar'

export default {
  name: 'index',
  data() {
    return {}
  },
  components: {
    sideNav,
    headBar
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapState({
      theme: state => state.theme.theme,
    }),
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.app-wrapper{
  width: 100%
  height: 100%
}
.main-content {
  overflow-x auto
  position: absolute
  top: 60px
  left: 200px
  right: 0
  bottom: 0
  padding: 10px;
}
</style>
