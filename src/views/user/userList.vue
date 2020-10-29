<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="是否官方账号">
            <el-select v-model="formInline.isAuthority" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-select v-model="formInline.isRecommendFocus" placeholder="请选择" @change="getList">
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
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="userId" label="userId" align="center">
          <template slot-scope="scope">{{ scope.row.userId | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="homesickId" label="漫想家id" align="center">
          <template slot-scope="scope">{{ scope.row.homesickId | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="userPhone" label="手机号" align="center">
          <template slot-scope="scope">{{ scope.row.userPhone | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="iconUrl" label="img" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img :src="scope.row.header" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" align="center">
          <template slot-scope="scope">{{ scope.row.nickName | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="del" label="账号状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.del"
              :active-value="0"
              :inactive-value="1"
              @change=switchStatus(scope.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
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
        isRecommendFocus: '',
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
    this.currentPage = this.global.getContextData('currentPage') || 1  // 获取缓存的页码
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/userorg/backadmin/appuser',
        method: 'GET',
        params: {
          isAuthority: this.formInline.isAuthority,
          isRecommendFocus: this.formInline.isRecommendFocus,
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
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.global.setContextData('currentPage', this.currentPage)  // 缓存页码
      this.getList()
    },
    switchStatus(scope) {
      this.$http({
        url: '/userorg/backadmin/appuser',
        method: 'PUT',
        data: {
          userId: scope.userId,
          del: scope.del,
        }
      }).then(res => {
        this.$message.success(res.msg)
        this.getList()
      }).catch(e => {
        this.getList()
        console.log(e)
      })
    },
    editItem(scope) {
      this.$router.push({path: '/userEdit', query: {userId: scope.userId}})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>