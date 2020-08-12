<template>
  <div>
    test1
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'test1',
  data() {
    return {}
  },
  created() {
    // var _this = this
    // async function fn() {
    //   await _this.$http({
    //     url: 'https://back.goku.vip/backSoftware/backAppList',
    //     method: 'GET',
    //   })
    //     .then(res => {
    //     })
    //   console.log(4)
    // }
    // fn()

    // let promise = new Promise((resolve, reject) => {
    //   resolve(res)
    // })
    // promise.then(function (res) {
    // })
  },
  mounted() {
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
</style>