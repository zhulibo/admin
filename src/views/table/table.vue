<template>
  <div>
    <div class="head-bar clearfix">
      <h2>列表</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="状态">
            <el-select v-model="formInline.isVisit" placeholder="请选择" style="width:120px" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="状态1" value="1"></el-option>
              <el-option label="状态0" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.schValue" placeholder="请输入" @keyup.enter.native="getList">
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" plain round size="medium" @click="newApp" icon="el-icon-plus">新建</el-button>
    </div>
    <div class="table">
      <el-table :data="tableList" v-loading="loading">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
<!--        <el-table-column label="img" align="center" class-name="row-img">-->
<!--          <template slot-scope="scope">-->
<!--            <img :src="scope.row.iconUrl" alt="">-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column prop="createDate" label="时间" align="center"></el-table-column>
        <el-table-column prop="fitType" label="类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.fitType == 1">111</span>
            <span v-if="scope.row.fitType == 2">222</span>
          </template>
        </el-table-column>
        <el-table-column prop="isVip" label="开关" align="center" class-name="row-switch">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isVip"
              :active-value="1"
              :inactive-value="0"
              @change=setVip(scope.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="管理" fixed="right" width="250px" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" @click="editApp(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteApp(scope.row)">删除</el-button>
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
    name: 'table0',
    data() {
      return {
        formInline: {
          isVisit: '',
          schValue: '',
        },
        tableList: [],
        pageSize: 10,
        currentPage: 1,
        totalPages: null,
        loading: false,
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
      setVip(scope){
        this.loading = true
        this.$http({
          url: '/backSoftware/setVip',
          method: 'PUT',
          params: {
            userId: this.userInfo.userId,
            softId: scope.softId,
            set: scope.isVip
          }
        }).then(res => {
          this.loading = false
          this.$message({
            type: 'info',
            message: res.msg,
          });
          this.getList()
        })
      },
      getList: function() {
        this.$http({
          url: '/backSoftware/backAppList',
          method: 'GET',
          params: {
            userId: this.userInfo.userId,
            softType: 0,
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            isVisit: this.formInline.isVisit,
            softName: this.formInline.schValue,
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
      editApp(scope) {
        this.$router.push({path: '/edit', query: {a: scope.a}})
      },
      deleteApp(scope) {
        this.$confirm('确定删除 ' + scope.softName, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$http({
            url: '/backSoftware/delSoftware',
            method: 'DELETE',
            params: {
              userId: this.userInfo.userId,
              softId: scope.softId,
            }
          })
            .then(res => {
              if(res.code == 204) {
                this.$message({
                  type: 'success',
                  message: '已删除 ' + scope.softName,
                });
                this.getList()
              }else {
                this.$message({
                  type: 'error',
                  message: res.data.message
                })
              }
            })
        }).catch(() => {});
      },
      newApp() {
        this.$router.push({path: 'edit'})
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .head-bar{
    margin-top: 10px
    h2{
      display: inline-block;
      float: left
      margin-top: 8px
      padding-left: 10px
      min-width 6em;
      border-left: 4px solid _blue
      line-height: 1.4
    }
    .sch{
      display: inline-block;
      margin-left: 80px
      float: left
    }
    button{
      float right
    }
  }
  .sch input.el-input__inner{
    background-color: #fff
  }
  .table{
    margin-top: 15px
  }
  .row-img img{
    height: 3em
  }
  .row-switch{
  }
  .row-manage .el-button--text{
    padding-left: 15px
    padding-right: 15px
  }
  .row-manage .el-button--text:nth-child(1):hover{
    color: blue-hover
  }
  .row-manage .el-button--text:nth-child(2){
    color: #999
  }
  .row-manage .el-button--text:nth-child(2):hover{
    color: _red
  }
  .pagination-ct{
    margin-top: 20px
    text-align: center
  }
  .demo-form-inline .el-form-item{
    margin-bottom: 0
  }
</style>