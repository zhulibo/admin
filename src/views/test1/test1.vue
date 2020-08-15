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
    let fn = async () => {
      let res = await this.getList()
      console.log(res)
    }
    // fn()
  },
  mounted() {
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    getList() {
      return new Promise( (resolve, reject) => {
        this.$http({
          url: '/userorg/backadmin/appuser',
          method: 'GET',
          params: {
            pageSize: 10,
            pageNumber: 1,
          }
        })
          .then(res => {
            resolve(res);
          }).catch(res => {console.log(res)})
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>