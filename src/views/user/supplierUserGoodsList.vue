<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <el-button type="primary" plain size="small" @click="exportOrderData()">导出Excel</el-button>
    </div>
    <div class="table">
      <el-table :data="tableList" id="out-table">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="tbGoods" label="商品名" align="center" show-overflow-tooltip>
          <template slot-scope="scope" v-if="scope.row.tbGoods">
            <span v-copy="scope.row.tbGoods.title" title="点击可复制" class="copy-span">{{ scope.row.tbGoods.title | noneToLine }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mainId" label="商品id" align="center">
          <template slot-scope="scope">{{scope.row.mainId}}</template>
        </el-table-column>
        <el-table-column prop="skuId" label="sku-id" align="center">
          <template slot-scope="scope">{{scope.row.skuId}}</template>
        </el-table-column>
        <el-table-column prop="tbGoods" label="品牌" align="center">
          <template slot-scope="scope" >
            <span v-if="scope.row.tbGoods && scope.row.tbGoods.brand">{{scope.row.tbGoods.brand.name | noneToLine}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="tbGoods" label="ip" align="center">
          <template slot-scope="scope" >
            <span v-if="scope.row.tbGoods && scope.row.tbGoods.ip">{{scope.row.tbGoods.ip.name | noneToLine}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="tbGoods" label="类别" align="center">
          <template slot-scope="scope" >
            <span v-if="scope.row.tbGoods && scope.row.tbGoods.types">{{scope.row.tbGoods.types.name | noneToLine}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="tbGoods" label="属性" align="center">
          <template slot-scope="scope" >
            <span v-if="scope.row.tbGoods && scope.row.tbGoods.attribute">{{scope.row.tbGoods.attribute.name | noneToLine}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="store" label="总库存" align="center">
          <template slot-scope="scope">{{scope.row.store}}</template>
        </el-table-column>
        <el-table-column prop="numberSold" label="已售" align="center">
          <template slot-scope="scope">{{scope.row.numberSold}}</template>
        </el-table-column>
        <el-table-column prop="price" label="价格(元)" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'item',
  data() {
    return {
      shopId: '',
      excelName: '',
      tableList: [],
    }
  },
  created() {
    this.shopId = this.$route.query.shopId
    if(this.$route.query.shopPhone && this.$route.query.remark){
      this.excelName = this.$route.query.shopPhone + '-' + this.$route.query.remark
    }else if(this.$route.query.shopPhone && !this.$route.query.remark){
      this.excelName = this.$route.query.shopPhone
    }else if(!this.$route.query.shopPhone && this.$route.query.remark){
      this.excelName = this.$route.query.remark
    }
    this.getList()
  },
  mounted() {
  },
  methods: {
    exportOrderData() {
      if(this.tableList.length<1){
        this.$message.info('TA没有在售商品，无法导出')
        return
      }
      let xlsxParam = { raw: true };
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'),xlsxParam);
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '供应商-' + this.excelName + '在售商品.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    getList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/shopgoods/shop/saleGoods',
        method: 'GET',
        params: {
          shopId: this.shopId,
          // pageSize: 1000,
          // currentPage: 1,
        }
      })
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].numberSold = res.data[i].store - res.data[i].number
          }
          this.tableList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.table-head{
  position: relative
  button{
    position: absolute
    right: 10px
    bottom: 0
  }
}
</style>