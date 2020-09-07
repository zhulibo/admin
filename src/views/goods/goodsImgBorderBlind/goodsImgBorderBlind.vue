<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="商品类型">
            <el-select v-model="formInline.type" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="普通商品" value="1"></el-option>
              <el-option label="预售商品" value="2"></el-option>
              <el-option label="抽奖商品" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.title" placeholder="商品名称" @keyup.enter.native="getList" :disabled="!formInline.type"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="goodsId" label="商品id" align="center">
          <template slot-scope="scope">{{scope.row.goodsId | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="title" label="名称" align="center">
          <template slot-scope="scope">{{scope.row.title | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="type" label="商品类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">普通商品</span>
            <span v-else-if="scope.row.type == 2">预售商品</span>
            <span v-else-if="scope.row.type == 3">抽奖商品</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="delete" @click="deleteItem(scope.row)">删除</el-button>
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
      articleId: '',
      formInline: {
        content: '',
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList()
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/frame/goods',
        method: 'GET',
        params: {
          frameId: this.id,
          type: this.formInline.type,
          title: this.formInline.title,
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      }).then(res => {
        this.tableList = res.data.list
        this.totalPages = res.data.pages
        this.currentPage = res.data.pageNum
      }).catch(e => {console.log(e)})
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getList()
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/frame/goods',
          method: 'DELETE',
          data: {
            ids: scope.id,
          }
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.name)
            this.getList()
          })
      }).catch(e => {console.log(e)})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>