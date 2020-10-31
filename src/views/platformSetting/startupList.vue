<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="image" label="图片/视频" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img v-if="scope.row.type == 1" :src="scope.row.image" alt="">
            <video v-else-if="scope.row.type == 2" :src="scope.row.image" style="height: 3em;"></video>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="启动页类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">图片</span>
            <span v-else-if="scope.row.type == 2">视频</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center">
          <template slot-scope="scope">{{ scope.row.sort | noneToLine}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
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
      formInline: {
        name: '',
      },
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
        url: '/userorg/backadmin/startimage',
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
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.global.setContextData('currentPage', this.currentPage)  // 缓存页码
      this.getList()
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/userorg/backadmin/startimage',
          method: 'PUT',
          data: {
            id: scope.id,
            del: 1,
          }
        })
          .then(res => {
            this.$message.success('已删除 ')
            this.getList()
          })
      }).catch(e => {
        console.log(e)
      })
    },
    editItem(scope) {
      this.$router.push({path: '/startupEdit', query: {id: scope.id}})
    },
    newItem() {
      this.$router.push({path: '/startupEdit'})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>