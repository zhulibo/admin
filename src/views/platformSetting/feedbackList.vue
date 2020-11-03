<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="name" label="反馈者名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="content" label="反馈内容" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-ct clearfix">
        <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages"
                       @current-change="handleCurrentChange" background></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
    }
  },
  created() {
    this.currentPage = this.global.getContextData('currentPage') || 1  // 获取缓存的页码
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/userorg/backadmin/feedback',
        method: 'GET',
        params: {
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.tableList = res.data
          this.totalPages = res.data.pages
          this.currentPage = res.data.pageNum
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.global.setContextData('currentPage', this.currentPage)  // 缓存页码
      this.getList()
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>