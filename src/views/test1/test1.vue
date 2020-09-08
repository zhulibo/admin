<template>
  <div>
    test1
  </div>
</template>

<script>
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
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    getList() {
      return new Promise((resolve, reject) => {
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
          }).catch(e => {
          console.log(e)
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>