<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="部落类型">
            <el-select v-model="formInline.type" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="普通部落" value="1"></el-option>
              <el-option label="明星部落" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.name" placeholder="部落名称" @keyup.enter.native="getList"></el-input>
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
          <template slot-scope="scope">{{scope.row.createTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="name" label="部落名称" align="center">
          <template slot-scope="scope">{{scope.row.name | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="logoImage" label="部落logo" align="center" class-name="row-img">
          <template slot-scope="scope"><img :src="scope.row.logoImage" alt=""></template>
        </el-table-column>
        <el-table-column prop="adminUser" label="管理员id" align="center">
          <template slot-scope="scope">{{scope.row.adminUser | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="type" label="部落类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">普通部落</span>
            <span v-if="scope.row.type == 2">明星部落</span>
          </template>
        </el-table-column>
        <el-table-column prop="isRecommend" label="推荐部落顺序" align="center">
          <template slot-scope="scope">{{scope.row.isRecommend | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="notice" label="部落公告" align="center">
          <template slot-scope="scope">{{scope.row.notice | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="noticeTitle" label="公告标题" align="center">
          <template slot-scope="scope">{{scope.row.noticeTitle | noneToLine}}</template>
        </el-table-column>
<!--        <el-table-column prop="status" label="部落状态" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <span v-if="scope.row.status == 0">正常</span>-->
<!--            <span v-if="scope.row.status == 1">删除</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="操作" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
            <el-button type="text" size="medium" class="detail" @click="goTribeMemberList(scope.row)">管理成员</el-button>
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
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/userorg/backadmin/tribe/list',
        method: 'GET',
        params: {
          type: this.formInline.type,
          name: this.formInline.name,
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
      this.currentPage = val;
      this.getList()
    },
    editItem(scope) {
      this.$router.push({path: '/tribeEdit', query: {id: scope.id}})
    },
    newItem() {
      this.$router.push({path: '/tribeEdit'})
    },
    goTribeMemberList(scope) {
      this.$router.push({path: '/tribeMember', query: {id: scope.id}})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>