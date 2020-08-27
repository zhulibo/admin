<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.name" placeholder="请输入ip名称" @keyup.enter.native="getList"></el-input>
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
        <el-table-column prop="creatTime" label="绑定时间时间" align="center">
          <template slot-scope="scope">{{scope.row.creatTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="tbIp.name" label="名称" align="center">
          <template slot-scope="scope">{{scope.row.tbIp.name}}</template>
        </el-table-column>
        <el-table-column prop="tbIp.id" label="ip-id" align="center">
          <template slot-scope="scope">{{scope.row.tbIp.id}}</template>
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'item',
  data() {
    return {
      id: '',
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
    this.id = this.$route.query.id
    this.getList()
  },
  mounted() {
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/goods/goodsip',
        method: 'GET',
        params: {
          name: this.name,
          goodsId: this.id,
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
    newItem() {
      this.$router.push({path: '/goodsBindIpEdit', query: {id: this.id}})
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.tbIp.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/goods/ip',
          method: 'DELETE',
          data: {
            ipId: scope.ipId,
            goodsId: scope.goodsId,
          }
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.tbIp.name)
            this.getList()
          })
      }).catch(e => {console.log(e)})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>