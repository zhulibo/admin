<template>
  <div class="chatCt">
    <p @click="chatVisible = !chatVisible">开关</p>
    <div class="chatCt" v-if="chatVisible">
      <chat @closeChat="closeChat"></chat>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'chatCt',
  components: {
    'chat': () => import(/* webpackChunkName: "chat" */ '../../components/chat/chat')
  },
  data() {
    return {
      chatVisible: true
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {},
  methods: {
    closeChat() {
      this.chatVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.chatCt {
  padding: 20px;
  background-color: #fff;
}
</style>