<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline" @submit.native.prevent>
          <el-form-item label="">
            <el-input v-model="formInline.roleName" placeholder="请输入昵称" @keyup.enter.native="getList"></el-input>
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
        <el-table-column prop="roleName" label="角色名" align="center">
          <template slot-scope="scope">{{ scope.row.roleName | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
          <template slot-scope="scope">{{ scope.row.description | noneToLine }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)" v-permission="['/roleEdit']">编辑</el-button>
            <el-button type="text" size="medium" class="delete" @click="deleteItem(scope.row)" v-permission="['/roleDel']">删除</el-button>
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
        roleName: '',
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
        url: '/userorg/backadmin/backrole',
        method: 'GET',
        params: {
          roleName: this.formInline.roleName,
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
      this.$confirm('确定删除 ' + scope.roleName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/userorg/backadmin/backrole/' + scope.id,
          method: 'DELETE',
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.roleName)
            this.getList()
          }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    editItem(scope) {
      this.$router.push({path: '/roleEdit', query: {id: scope.id}})
    },
    newItem() {
      this.$router.push({path: '/roleEdit'})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>