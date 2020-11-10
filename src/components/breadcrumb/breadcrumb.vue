<template>
  <div class="example-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item,index) in breadList"
        :key="index"
        :to="{ path: item.path }">
        {{item.name}}
      </el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
export default {
  data() {
    return {
      breadList: [] // 路由集合
    }
  },
  methods: {
    getBreadcrumb() {
      // this.breadList = [
      //   {
      //   name: '首页',
      //   path: '/welcome',
      // }].concat({
      //   name: this.$route.name,
      //   path: this.$route.path,
      // })
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
};
</script>