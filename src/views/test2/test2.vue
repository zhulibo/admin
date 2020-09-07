<template>
  <div>test2</div>
</template>

<script>
export default {
  name: 'test2',
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
</style>