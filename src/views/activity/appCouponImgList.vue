<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
<!--      <div class="sch">-->
<!--        <el-form :inline="true" :model="formInline" class="table-form-inline">-->
<!--          <el-form-item label="">-->
<!--            <el-input v-model="formInline.nickName" placeholder="请输入昵称" @keyup.enter.native="getList"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" plain @click="getList">查询</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="type" label="优惠券类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">分享优惠券</span>
            <span v-if="scope.row.type == 2">新人优惠券</span>
          </template>
        </el-table-column>
        <el-table-column prop="image" label="优惠券图片" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="">
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
        url: '/order/backadmin/discount/image',
        method: 'GET',
        params: {
          // nickName: this.formInline.nickName,
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.tableList = res.data
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
      this.$router.push({path: '/appCouponImgEdit', query: {type: scope.type, image: scope.image}})
    },
    newItem(scope) {
      this.$router.push({path: '/appCouponImgEdit'})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>