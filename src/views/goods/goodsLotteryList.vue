<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
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
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.creatTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="goodsId" label="商品id" align="center">
          <template slot-scope="scope">{{ scope.row.goodsId }}</template>
        </el-table-column>
        <el-table-column prop="skuId" label="sku-id" align="center">
          <template slot-scope="scope">{{ scope.row.skuId }}</template>
        </el-table-column>
        <el-table-column prop="tbGoods" label="商品名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.tbGoods.title }}</template>
        </el-table-column>
        <el-table-column prop="drawTime" label="开奖时间" align="center">
          <template slot-scope="scope">{{ scope.row.drawTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="status" label="抽奖状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">未开始</span>
            <span v-else-if="scope.row.status == 1">已开始</span>
            <span v-else-if="scope.row.status == 2">已结束</span>
            <span v-else-if="scope.row.status == 3">已强制结束</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
            <el-button type="text" size="medium" class="edit" @click="checkItemCode(scope.row)">查看抽奖码</el-button>
            <el-button v-if="scope.row.status == 0 || scope.row.status == 1" type="text" size="medium" class="delete" @click="endItem(scope.row)">强制结束</el-button>
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
    this.currentPage = this.global.getContextData('currentPage') || 1
    this.getList()
  },
  mounted() {
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
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.global.setContextData('currentPage', this.currentPage)
      this.getList()
    },
    editItem(scope) {
      this.$router.push({path: '/goodsLotteryEdit', query: {id: scope.id}})
    },
    checkItemCode(scope) {
      this.$router.push({path: '/goodsLotteryCodeList', query: {id: scope.id}})
    },
    endItem(scope) {
      this.$confirm('确定强制结束 ' + scope.tbGoods.title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/drawgoods',
          method: 'PUT',
          data: {
            id: scope.id,
            status: 3,
          }
        })
          .then(res => {
            this.$message.success('已确定强制结束 ' + scope.tbGoods.title)
            this.getList()
          }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    newItem() {
      this.$router.push({path: '/goodsLotteryEdit'})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>