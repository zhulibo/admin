<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.phone" placeholder="请输入手机号" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.name" placeholder="请输入昵称" @keyup.enter.native="getList"></el-input>
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
        <el-table-column prop="phone" label="手机号" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="name" label="昵称" align="center">
          <template slot-scope="scope">{{ scope.row.name | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="tbBackRoleList" label="角色" align="center">
          <template slot-scope="scope">
            <span v-for="item in scope.row.tbBackRoleList" :key="item.id">{{ item.roleName }}</span>
            <span v-if="!scope.row.tbBackRoleList.length">--</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="账号状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              @change=switchStatus(scope.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)" v-permission="['/adminEdit']">编辑</el-button>
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
        phone: '',
        name: '',
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
        url: '/userorg/backadmin/user',
        method: 'GET',
        params: {
          phone: this.formInline.phone,
          name: this.formInline.name,
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
    switchStatus(scope) {
      this.$http({
        url: '/userorg/backadmin/user',
        method: 'PUT',
        data: {
          id: scope.id,
          status: scope.status,
        }
      }).then(res => {
        this.$message.success(res.msg)
        this.getList()
      }).catch(e => {
        this.getList()
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.global.setContextData('currentPage', this.currentPage)
      this.getList()
    },
    editItem(scope) {
      this.$router.push({
        path: '/adminEdit', query: {id: scope.id,}
      })
    },
    newItem() {
      this.$router.push({path: '/adminEdit'})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>