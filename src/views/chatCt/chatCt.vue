<template>
  <div class="chatCt">
    <chat></chat>
  </div>
</template>

<script>
const chat = () => import(/* webpackChunkName: "chat" */ '@/components/chat/chat')

export default {
  name: 'chatCt',
  components: {
    chat
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
</style>