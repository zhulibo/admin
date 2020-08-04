<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="是否官方账号">
            <el-select v-model="formInline.isAuthority" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.phone" placeholder="请输入手机号" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.homesickId" placeholder="请输入漫想家id" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.nickName" placeholder="请输入昵称" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
<!--      <el-button class="new-btn" type="primary" plain round size="medium" @click="new" icon="el-icon-plus">新建</el-button>-->
    </div>
    <div class="table">
      <el-table :data="tableList" v-loading="loading">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
          <template slot-scope="scope">{{ scope.row.phone | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" align="center">
          <template slot-scope="scope">{{ scope.row.nickName | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <template slot-scope="scope">{{ scope.row.sex | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="homesickId" label="漫想家id" align="center">
          <template slot-scope="scope">{{ scope.row.homesickId | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="signature" label="签名" align="center">
          <template slot-scope="scope">{{ scope.row.signature | noneFilter }}</template>
        </el-table-column>
<!--        <el-admin-column label="img" align="center" class-name="row-img">-->
<!--          <template slot-scope="scope">-->
<!--            <img :src="scope.row.iconUrl" alt="">-->
<!--          </template>-->
<!--        </el-admin-column>-->
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | dateFormat }}</template>
        </el-table-column>
        <el-table-column prop="del" label="账号状态" align="center" class-name="row-switch">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.del"
              :active-value="0"
              :inactive-value="1"
              @change=switchStatus(scope.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
<!--            <el-button type="text" @click="delete(scope.row)">删除</el-button>-->
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
    name: 'user',
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
          url: '/userorg/backadmin/appuser',
          method: 'GET',
          params: {
            isAuthority: this.formInline.isAuthority,
            phone: this.formInline.phone,
            homesickId: this.formInline.homesickId,
            nickName: this.formInline.nickName,
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
          url: '/userorg/backadmin/appuser',
          method: 'PUT',
          data: {
            userId: scope.userId,
            del: scope.del
          }
        }).then(res => {
          this.loading = false
          this.$message({
            type: 'success',
            message: res.msg,
          });
          this.getList()
        })
      },
      // delete(scope) {
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
      //       })
      //   }).catch(() => {});
      // },
      edit(scope) {
        this.$router.push({path: '/userEdit', query: {userId: scope.userId}})
      },
      // new() {
      //   this.$router.push({path: '/userEdit'})
      // },
    }
  }
</script>

<style lang="stylus" scoped>
</style>