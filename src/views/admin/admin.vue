<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.phone" placeholder="请输入手机号" @keyup.enter.native="getList">
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.name" placeholder="请输入昵称" @keyup.enter.native="getList">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建</el-button>
    </div>
    <div class="table">
      <el-table :data="tableList" v-loading="loading">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | dateFormat }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
          <template slot-scope="scope">{{ scope.row.phone | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="name" label="昵称" align="center">
          <template slot-scope="scope">{{ scope.row.name | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="status" label="账号状态" align="center" class-name="row-switch">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              @change=switchStatus(scope.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-ct">
      <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages" @current-change="handleCurrentChange" background></el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'admin',
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
      loading: false, // 加载中
    }
  },
  created() {
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
    getList: function() {
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
        })
    },
    handleCurrentChange: function(val) { // 页码变更
      this.currentPage = val;
      this.getList()
    },
    switchStatus(scope){
      this.loading = true
      this.$http({
        url: '/userorg/backadmin/user',
        method: 'PUT',
        data: {
          userId: scope.userId,
          status: scope.status
        }
      }).then(res => {
        this.loading = false
        if (res.code == 0){
          this.$message({
            type: 'success',
            message: res.msg,
          });
        } else {
          this.$message({
            type: 'info',
            message: res.msg,
          });
        }
        this.getList()
      })
    },
    edit(scope) {
      this.$router.push({path: '/adminEdit', query: {userId: scope.userId, phone: scope.phone, name: scope.name, passWord: scope.passWord, status: scope.status}})
    },
    newItem() {
      this.$router.push({path: '/adminNew'})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>