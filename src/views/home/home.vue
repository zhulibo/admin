<template>
  <div>home</div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'home',
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
        userInfo: state => state.login.userInfo
      }),
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  div{
    line1()
  }
</style>
