<template>
  <div class="app-wrapper">
    <side-nav></side-nav>
    <head-bar></head-bar>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import sideNav from '../../components/indexComponents/sideNav'
  import headBar from '../../components/indexComponents/headBar'

  export default {
    name: 'index',
    data() {
      return {
      }
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
        userInfo: 'userInfo'
      }),
    },
    methods: {
      ...mapMutations(['setUserInfo']),
    }
  }
</script>

<style lang="stylus" scoped>
  .main-content {
    overflow-x auto
    position: absolute
    top: 70px
    left: 220px
    right: 0
    bottom: 0
    padding: 10px;
  }
</style>
