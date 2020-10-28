<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.phone" placeholder="请输入手机号" @keyup.enter.native="getList"></el-input>
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
          <template slot-scope="scope">{{ scope.row.createTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="sender" label="收货人" align="center">
          <template slot-scope="scope">{{ scope.row.sender | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="sendPhone" label="手机号" align="center">
          <template slot-scope="scope">{{ scope.row.sendPhone | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="provinceName" label="省" align="center">
          <template slot-scope="scope">{{ scope.row.provinceName }}</template>
        </el-table-column>
        <el-table-column prop="cityName" label="市" align="center">
          <template slot-scope="scope">{{ scope.row.cityName }}</template>
        </el-table-column>
        <el-table-column prop="areaName" label="县" align="center">
          <template slot-scope="scope">{{ scope.row.areaName }}</template>
        </el-table-column>
        <el-table-column prop="sendAddress" label="详细地址" align="center">
          <template slot-scope="scope">{{ scope.row.sendAddress }}</template>
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
        url: '/userorg/backadmin/shopaddress/select',
        method: 'GET',
        params: {
          phone: this.formInline.phone,
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
      this.global.setContextData('currentPage', this.currentPage)
      this.getList()
    },
    editItem(scope) {
      this.$router.push({path: '/supplierAddressEdit', query: {id: scope.id}})
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/userorg/backadmin/shopaddress/delete/' + scope.id,
          method: 'DELETE',
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.id)
            this.getList()
          })
      }).catch(e => {
        console.log(e)
      })
    },
    newItem() {
      this.$router.push({path: '/supplierAddressEdit'})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>