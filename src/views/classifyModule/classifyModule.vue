<template>
  <div>
    classifyModule
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'classifyModule',
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
  }
}
</script>

<style lang="stylus" scoped>
</style>