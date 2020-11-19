<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="订单类型">
            <el-select v-model="formInline.type" placeholder="请选择" @change="getList">
              <el-option label="现货" value="1"></el-option>
              <el-option label="预售" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="getList"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="export" type="primary" plain size="small" @click="exportOrderData()">导出Excel</el-button>
    </div>
    <div class="table">
      <el-table :data="tableList" id="out-table">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.creatTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="number" label="订单号" align="center">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">已删除</span>
            <span v-else-if="scope.row.status == 1">待付款</span>
            <span v-else-if="scope.row.status == 2">待发货</span>
            <span v-else-if="scope.row.status == 3">待收货</span>
            <span v-else-if="scope.row.status == 4">用户已确认收货</span>
            <span v-else-if="scope.row.status == 5">支付后用户取消</span>
            <span v-else-if="scope.row.status == 6">支付后后台取消</span>
            <span v-else-if="scope.row.status == 7">未支付超时取消</span>
            <span v-else-if="scope.row.status == 8">未支付用户取消</span>
          </template>
        </el-table-column>
        <el-table-column prop="isBalance" label="是否结算" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isBalance == 0">未结算</span>
            <span v-else-if="scope.row.isBalance == 1">未结算</span>
            <span v-else-if="scope.row.isBalance == 2">已结算</span>
            <span v-else-if="scope.row.isBalance == 3">延迟打款中</span>
          </template>
        </el-table-column>
        <el-table-column prop="tbOrderDetail" label="物流单号" align="center">
          <template slot-scope="scope">{{ scope.row.tbOrderDetail.logNumber | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="goods" label="商品名" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in scope.row.goods"> {{item.goodsName}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="payMoney" label="实付总金额(元)" align="center">
          <template slot-scope="scope">{{ scope.row.payMoney }}</template>
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
      formInline: {
        type: '1',
        time: [],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近二天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
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
        this.$message.info('TA没有订单，无法导出')
        return
      }
      let xlsxParam = { raw: true };
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'),xlsxParam);
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '供应商-' + this.excelName + '订单.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    getList: function () {
      this.$http({
        url: this.formInline.type == 1 ? '/order/backadmin/shoporder' : '/order/backadmin/shoporder/pre',
        method: 'GET',
        params: {
          shopId: this.shopId,
          startTime: this.formInline.time ? this.formInline.time[0] : '',
          endTime: this.formInline.time ? this.formInline.time[1] : '',
          pageSize: 1000,
          currentPage: 1,
        }
      })
        .then(res => {
          this.tableList = res.data.list
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
  .export{
    position: absolute
    right: 10px
    bottom: 5px
  }
}
</style>