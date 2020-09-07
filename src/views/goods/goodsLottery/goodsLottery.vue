<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.title" placeholder="商品名称" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建</el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{scope.row.creatTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="goodsId" label="商品id" align="center">
          <template slot-scope="scope">{{scope.row.goodsId}}</template>
        </el-table-column>
        <el-table-column prop="skuId" label="sku-id" align="center">
          <template slot-scope="scope">{{scope.row.skuId}}</template>
        </el-table-column>
        <el-table-column prop="drawTime" label="开奖时间" align="center">
          <template slot-scope="scope">{{scope.row.drawTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="number" label="奖品数量" align="center">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column prop="status" label="抽奖状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">未开始</span>
            <span v-else-if="scope.row.status == 1">已开始</span>
            <span v-else-if="scope.row.status == 2">已结束</span>
            <span v-else-if="scope.row.status == 3">已强制结束</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
            <!--            <el-button type="text" size="medium" class="delete" @click="deleteItem(scope.row)">删除</el-button>-->
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
    this.getList()
  },
  mounted() {
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/drawgoods',
        method: 'GET',
        params: {
          title: this.formInline.title,
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.tableList = res.data.list
          this.totalPages = res.data.pages
          this.currentPage = res.data.pageNum
        }).catch(e => {console.log(e)})
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getList()
    },
    // switchStatus(scope) {
    //   this.loading = true
    //   this.$http({
    //     url: '/userorg/backadmin/appuser',
    //     method: 'PUT',
    //     data: {
    //       userId: scope.userId,
    //       del: scope.del
    //     }
    //   }).then(res => {
    //     this.loading = false
    //     this.$message.success(res.msg)
    //     this.getList()
    //   }).catch(e => {console.log(e)})
    // },
    // deleteItem(scope) {
    //   this.$confirm('确定删除 ' + scope.softName, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'info'
    //   }).then(() => {
    //     this.$http({
    //       url: '/backSoftware/delSoftware',
    //       method: 'DELETE',
    //       params: {
    //         userId: this.userInfo.userId,
    //         softId: scope.softId,
    //       }
    //     })
    //       .then(res => {
    //         if(res.code == 204) {
    //           this.$message({
    //             type: 'success',
    //             message: '已删除 ' + scope.softName,
    //           });
    //           this.getList()
    //         }else {
    //           this.$message({
    //             type: 'error',
    //             message: res.data.message
    //           })
    //         }
    //       }).catch(e => {console.log(e)})
    //   }).catch(e => {console.log(e)})
    // },
    editItem(scope) {
      this.$router.push({path: '/goodsLotteryEdit', query: {id: scope.id}})
    },
    newItem() {
      this.$router.push({path: '/goodsLotteryEdit'})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>