<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
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
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="name" label="部落名称" align="center">
          <template slot-scope="scope">{{ scope.row.name | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="logoImage" label="部落logo" align="center" class-name="row-img">
          <template slot-scope="scope"><img :src="scope.row.logoImage" alt=""></template>
        </el-table-column>
        <el-table-column prop="adminDetail" label="管理员昵称" align="center">
          <template slot-scope="scope">{{ scope.row.adminDetail.nickName | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="type" label="部落类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">普通部落</span>
            <span v-else-if="scope.row.type == 2">明星部落</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="部落状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">正常</span>
            <span v-if="scope.row.status == 1">已删除</span>
          </template>
        </el-table-column>
        <el-table-column prop="isRecommend" label="推荐顺序" align="center">
          <template slot-scope="scope">{{ scope.row.isRecommend | noneToLine }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="detail" @click="goTribeMemberList(scope.row)">管理成员</el-button>
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
            <el-button type="text" size="medium" class="delete" v-if="scope.row.status != 1" @click="deleteItem(scope.row)">删除</el-button>
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
        type: '',
        name: '',
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
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.global.setContextData('currentPage', this.currentPage)  // 缓存页码
      this.getList()
    },
    editItem(scope) {
      this.$router.push({path: '/tribeEdit', query: {id: scope.id}})
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/userorg/backadmin/tribe',
          method: 'PUT',
          data: {
            id: scope.id,
            status: 1,
          }
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.name)
            this.getList()
          }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    newItem() {
      this.$router.push({path: '/tribeEdit'})
    },
    goTribeMemberList(scope) {
      this.$router.push({path: '/tribeMemberList', query: {id: scope.id}})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>