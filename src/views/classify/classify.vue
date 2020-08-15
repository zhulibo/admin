<template>
  <div>
    <div class="classify">
      <div class="classify-ct">
        <div class="side-bar">
          <dl class="classify-level-one">
            <dt class="classify-level-one-add">+添加分类</dt>
            <dd>手办</dd>
            <dd>手办</dd>
            <dd>模型</dd>
          </dl>
        </div>
        <div class="classify-main">
          <dl class="classify-module-list">
            <dt class="classify-module-add">+添加模块</dt>
            <dd class="classify-module">
              <dl>
                <dt class="classify-module-name">热销</dt>
                <dd class="classify-level-two">奥特曼</dd>
                <dd class="classify-level-two">军事</dd>
                <dd class="classify-level-two-add">+添加分类</dd>
              </dl>
            </dd>
            <dd class="classify-module">
              <dl>
                <dt class="classify-module-name">中秋</dt>
                <dd class="classify-level-two">漫威</dd>
                <dd class="classify-level-two">乐高</dd>
                <dd class="classify-level-two-add">+添加分类</dd>
              </dl>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'classify',
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
.classify{
  padding: 20px
  background-color: #fff
  .classify-ct{
    display: flex
    padding: 20px
    font-size 16px
    border: 1px solid #aaa
  }
}
.side-bar{
  padding: 20px
  width: 200px
  border-right: 1px solid #aaa
  dt{
    margin-bottom: 10px
    color: blue;
  }
  dd{
    padding: 5px 0
  }
}
.classify-main{
  flex: 1
  margin-left: 20px
  padding: 20px
  background-color: #f5f5f5
  .classify-module-add{
    margin-bottom: 10px
    color: blue;
  }
  .classify-module{
    padding: 10px 0
    .classify-module-name{
      margin-bottom: 10px
    }
    .classify-level-two{
      display: inline-block
      margin-right: 10px
      padding: 0 5px
      border: 1px solid #ddd
      border-radius: 5px;
    }
    .classify-level-two-add{
      display: inline-block
      margin-right: 10px
      padding: 0 5px
      border: 1px solid blue
      border-radius: 5px;
      color: blue
    }
  }
}
</style>