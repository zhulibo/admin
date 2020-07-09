<template>
  <div class="app-wrapper">
    <side-nav></side-nav>
    <div class="main-container">
      <head-bar></head-bar>
      <div class="main-body">
        <router-view></router-view>
      </div>
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
  .app-wrapper {
    position: relative;
    height: 100%;
  }
  .main-container{
    overflow-x: hidden;
    margin-left: 220px;
    min-height: 100%;
  }
  .main-body {
    padding: 0 20px;
  }
</style>
