<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
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
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="id" label="礼包id" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">分享礼包</span>
            <span v-else-if="scope.row.type == 2">邀请码礼包</span>
          </template>
        </el-table-column>
        <el-table-column prop="img" label="图片" align="center" class-name="row-img">
          <template slot-scope="scope"><img :src="scope.row.img" alt=""></template>
        </el-table-column>
        <el-table-column prop="startTime" label="领取时间" align="center">
          <template slot-scope="scope">{{ scope.row.startTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="endTime" label="截止时间" align="center">
          <template slot-scope="scope">{{ scope.row.endTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="getCount" label="领取个数" align="center">
          <template slot-scope="scope">{{ scope.row.getCount }}</template>
        </el-table-column>
        <el-table-column prop="useCount" label="使用个数" align="center">
          <template slot-scope="scope">{{ scope.row.useCount }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
            <el-button type="text" size="medium" class="edit" @click="checkItemCoupon(scope.row)">查看优惠券</el-button>
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
      formInline: {
        phone: '',
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
        url: '/order/backadmin/discount/page',
        method: 'GET',
        params: {
          name: this.name,
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
      this.global.setContextData('currentPage', this.currentPage)
      this.getList()
    },
    editItem(scope) {
      this.$router.push({path: '/giftPackEdit', query: {id: scope.id}})
    },
    checkItemCoupon(scope) {
      this.$router.push({path: '/couponList', query: {packageId: scope.id}})
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/order/backadmin/discount/page',
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
      this.$router.push({path: '/giftPackEdit'})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>