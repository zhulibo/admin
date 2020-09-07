<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.name" placeholder="请输入分类名称" @keyup.enter.native="getList"></el-input>
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
<!--        <el-table-column prop="creatTime" label="绑定时间" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.creatTime | timestampToDate}}</template>-->
<!--        </el-table-column>-->
        <el-table-column prop="name" label="名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column prop="classifyId" label="分类id" align="center">
          <template slot-scope="scope">{{scope.row.classifyId}}</template>
        </el-table-column>
        <el-table-column prop="type" label="分类类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">首页</span>
            <span v-if="scope.row.type == 2">普通</span>
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
      id: '',
      goodsType: '',
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
    this.goodsType = this.$route.query.goodsType
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
        url: '/goodsmanage/backadmin/goods/goodsclassify',
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
          for (let i = 0; i < this.tableList.length; i++) {
            if(this.tableList[i].tbClassify) {
              this.$set(this.tableList[i], 'name', this.tableList[i].tbClassify.name)
            }else{
              this.$set(this.tableList[i], 'name', this.tableList[i].tbIndexClassify.name)
            }
          }
        }).catch(e => {console.log(e)})
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getList()
    },
    newItem() {
      this.$router.push({path: '/goodsBindClassifyEdit', query: {id: this.id, goodsType: this.goodsType}})
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/goods/classify',
          method: 'DELETE',
          data: {
            classifyId: scope.classifyId,
            goodsId: scope.goodsId,
            type: scope.type,
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