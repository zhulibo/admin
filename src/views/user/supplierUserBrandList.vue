<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="品牌" align="center">
          <template slot-scope="scope">{{ scope.row.name | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="number" label="商品数" align="center">
          <template slot-scope="scope">{{ scope.row.number | noneToLine }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {
      shopId: '',
      tableList: [],
    }
  },
  created() {
    this.shopId = this.$route.query.shopId
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/shopgoods/shop/saleBrands',
        method: 'GET',
        params: {
          shopId: this.shopId,
        }
      })
        .then(res => {
          this.tableList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>