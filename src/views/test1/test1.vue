<template>
  <div>test1</div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'test1',
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
</style>