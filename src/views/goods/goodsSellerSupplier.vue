<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="table">
      <el-table :data="tableList">
<!--        <el-table-column type="expand">-->
<!--          <template slot-scope="props">-->
<!--            <table class="table-sku">-->
<!--              <tr>-->
<!--                <th>creatTime</th>-->
<!--                <th>sku-id</th>-->
<!--                <th>名称</th>-->
<!--                <th>图片</th>-->
<!--                <th>价格</th>-->
<!--              </tr>-->
<!--              <tr v-for="item in props.row.sku">-->
<!--                <td>{{ item.creatTime | timestampToDate }}</td>-->
<!--                <td>{{ item.id }}</td>-->
<!--                <td>{{ item.name }}</td>-->
<!--                <td><img :src="item.skuImage" alt=""></td>-->
<!--                <td>{{ item.price }}</td>-->
<!--              </tr>-->
<!--            </table>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column type="index" label="序号" align="center"></el-table-column>
<!--        <el-table-column prop="createTime" label="开售时间" align="center">-->
<!--          <template slot-scope="scope">{{ scope.row.creatTime | timestampToDate }}</template>-->
<!--        </el-table-column>-->
        <el-table-column prop="sku" label="sku图片" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img :src="scope.row.sku.skuImage" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="sku" label="sku名称" align="center" class-name="row-img" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.sku.name}}</template>
        </el-table-column>
        <el-table-column prop="shopName" label="供货商昵称" align="center">
          <template slot-scope="scope">{{ scope.row.shopName }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="供货商手机号" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="store" label="库存" align="center">
          <template slot-scope="scope">{{ scope.row.store }}</template>
        </el-table-column>
        <el-table-column prop="number" label="已售" align="center">
          <template slot-scope="scope">{{ scope.row.store - scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="price" label="供货商出售价格(元)" align="center">
          <template slot-scope="scope">{{ scope.row.price }}</template>
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
      id: this.$route.query.id,
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
        url: '/goodsmanage/backadmin/goods/shopGoods',
        method: 'GET',
        params: {
          id: this.id,
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
      this.$router.push({path: '/userEdit', query: {userId: scope.userId}})
    },
  }
}
</script>

<style lang="stylus" scoped>
.table-sku {
  width: 100%
  border-collapse: collapse;
  th {
    padding: 10px 0
    text-align: center
    border: 1px solid #ddd;
  }
  td {
    padding: 5px 0
    text-align: center
    border: 1px solid #ddd;
  }
  img {
    height: 3em
  }
}
</style>