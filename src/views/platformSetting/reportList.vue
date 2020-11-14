<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="table">
      <el-table :data="tableList" v-loading="loading">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="type" label="举报类型" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">动态</span>
            <span v-else-if="scope.row.type == 2">评论</span>
            <span v-else-if="scope.row.type == 3">用户</span>
          </template>
        </el-table-column>
        <el-table-column prop="complainCategory" label="举报原因" align="center">
          <template slot-scope="scope">{{ scope.row.complainCategory.name }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color: #e00;">未处理</span>
            <span v-else-if="scope.row.status == 1">已处理</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="detail" @click="checkItem(scope.row)">查看</el-button>
          </template>
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
      loading: false,
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
      this.loading = true
      this.$http({
        url: '/userorg/backadmin/complain',
        method: 'GET',
        params: {
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.tableList = res.data.list
          this.totalPages = res.data.pages
          this.currentPage = res.data.pageNum
          this.loading = false
        }).catch(e => {
        this.loading = false
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.global.setContextData('currentPage', this.currentPage)  // 缓存页码
      this.getList()
    },
    checkItem(scope) {
      this.$router.push({path: '/reportDetail', query: {id: scope.id}})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>