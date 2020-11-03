<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.userId" placeholder="用户id" @keyup.enter.native="getList"></el-input>
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
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="number" label="抽奖码" align="center">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="tbAppUser" label="漫想家id" align="center">
          <template slot-scope="scope">{{ scope.row.tbAppUser.tbAppUserDetail.homesickId }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
          <el-button type="text" size="medium" class="edit" @click="setItem(scope.row)">设置TA中奖</el-button>
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
      id: '',
      formInline: {
        isAuthority: '',
        phone: '',
        homesickId: '',
        nickName: '',
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
  methods: {
    getList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/drawgoods/user/detail',
        method: 'GET',
        params: {
          userId: this.formInline.userId,
          id: this.formInline.id,
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
    setItem(scope) {
      this.$confirm('确定设置用户id ' + scope.userId + ' 中奖', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/drawgoods/drawNumber',
          method: 'PUT',
          data: {
            id: this.id,
            drawNumber: scope.number,
          }
        })
          .then(res => {
            this.$message.success('已设置用户id ' + scope.userId + ' 中奖')
            this.getList()
          }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getList()
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>