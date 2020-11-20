<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <div class="supplier-sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.name" placeholder="请输入手机号或昵称" @keyup.enter.native="getList" width="200"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-table">
        <el-table :data="tableList" border>
          <el-table-column prop="submitTime" label="日期" align="center">
            <template slot-scope="scope">{{scope.row.submitTime | timestampToDate}}</template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center">
            <template slot-scope="scope">{{scope.row.phone | noneToLine}}</template>
          </el-table-column>
          <el-table-column prop="name" label="昵称" align="center"></el-table-column>
<!--          <el-table-column prop="userId" label="申请人userId" align="center">-->
<!--            <template slot-scope="scope">{{scope.row.userId | noneToLine}}</template>-->
<!--          </el-table-column>-->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope"><el-button @click="goDetail(scope.row)" type="text" size="medium">查看</el-button></template>
          </el-table-column>
        </el-table>
        <div class="pagination-ct clearfix">
          <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages"
                         @current-change="handleCurrentChange" background></el-pagination>
        </div>
      </div>
      <h2 class="statistics-title">已售商品排行</h2>
      <div class="chart-goods">
        <v-chart :options="goodsEChartsOptions"/>
      </div>
      <div class="pagination-ct clearfix">
        <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage2" :page-count="totalPages2"
                       @current-change="handleCurrentChange2" background></el-pagination>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="供应商详情" :visible.sync="supplierDetailDialogVisible">
        <ul class="supplier-detail-ct">
          <li><span>账号创建日期</span><span>{{supplierDetail.submitTime | timestampToDate}}</span></li>
          <li><span>手机号</span><span v-if="supplierDetail.tbUser">{{supplierDetail.tbUser.phone}}</span></li>
          <li><span>供应商用户名</span><span v-if="supplierDetail.tbUser">{{supplierDetail.tbUser.name}}</span></li>
          <li><span>申请人userId</span><span>{{supplierDetail.userId}}</span></li>
          <li><span>总销售额</span><span v-if="supplierDetail.map">￥{{supplierDetail.map.allPrice}}元</span></li>
          <li><span>平台盈利取佣金比例</span><span>{{supplierDetail.serviceRatio}}</span></li>
          <li><span>平台总盈收</span><span v-if="supplierDetail.map">￥{{supplierDetail.map.inPrice}}元</span></li>
          <li><span>成功订单数</span><span v-if="supplierDetail.map">{{supplierDetail.map.allNumber}}</span></li>
          <li><span>取消订单数</span><span v-if="supplierDetail.map">{{supplierDetail.map.quNumber}}</span></li>
          <li><span>微信提现金额</span><span v-if="supplierDetail.map">￥{{supplierDetail.map.wall}}元</span></li>
          <li><span>支付宝提现金额</span><span v-if="supplierDetail.map">￥{{supplierDetail.map.aall}}元</span></li>
          <li><span>账户余额</span><span>￥{{supplierDetail.balance}}元</span></li>
          <li><span>提现手续费</span><span>1%</span></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeSupplierDetailDialog">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  name: 'item',
  data() {
    return {
      formInline: {
        name: '',
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
      supplierDetailDialogVisible: false,
      supplierDetail: {},
      goodsList: [],
      pageSize2: 10,
      currentPage2: 1,
      totalPages2: null,
      goodsEChartsOptions: {
        title: {
          text: '已售商品排行',
          left: 'center',
          bottom: 0,
          textStyle: {
            fontSize : 16,
            fontWeight: 'normal',
          }
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{b}:{c}人<br/>{d}%',
        },
        color: ['#7287ff','#ff7e7e', '#ffa1f3'],
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: [],
          axisLabel:{
            margin: 8,
            formatter:function(params){
              var val="";
              if(params.length >4){
                val = params.substr(0,4)+'...';
                return val;
              }else{
                return params;
              }
            }
          },

        },
        series: [
          {
            type: 'bar',
            data: []
          },
        ]
      },
    }
  },
  components: {
    'v-chart': ECharts
  },
  created() {
    this.getList()
    this.getGoodsList()
  },
  mounted() {
  },
  computed: {},
  methods: {
    getList() {
      this.$http({
        url: '/userorg/backadmin/stUser/shopNumber',
        method: 'POST',
        data: {
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
    getGoodsList() {
      this.$http({
        url: '/order/backadmin/stOrder/sellGoods',
        method: 'POST',
        data: {
          pageSize: this.pageSize2,
          pageNumber: this.currentPage2,
        }
      })
        .then(res => {
          this.goodsEChartsOptions.yAxis.data = []
          this.goodsEChartsOptions.series[0].data = []
          this.goodsList = res.data.list
          for (let i = 0; i < this.goodsList.length; i++) {
            this.goodsEChartsOptions.yAxis.data.push(this.goodsList[i].goodsName)
            this.goodsEChartsOptions.series[0].data.push(this.goodsList[i].goodsNumber)
          }
          this.goodsEChartsOptions.yAxis.data.reverse()
          this.goodsEChartsOptions.series[0].data.reverse()
          this.totalPages2 = res.data.pages
          this.currentPage2 = res.data.pageNum
        }).catch(e => {
        console.log(e)
      })
    },
    goDetail(scope) {
      this.supplierDetailDialogVisible = true
      this.$http({
        url: '/userorg/backadmin/stUser/shopDetail',
        method: 'POST',
        data: {
          id: scope.id,
        }
      })
        .then(res => {
          this.supplierDetail = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    closeSupplierDetailDialog() {
      this.supplierDetailDialogVisible = false
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getList()
    },
    handleCurrentChange2: function (val) { // 页码变更
      this.currentPage2 = val
      this.getGoodsList()
    },
  }
}
</script>

<style lang="stylus" scoped>
.chart-table{
  margin-top: 20px
}
.table-form-inline .el-form-item__content .el-input {
  width: 200px;
}
.supplier-detail-ct{
  padding-left: 50px
  li{
    margin-top: 10px
    font-size 16px
    span{
      display: inline-block
      &:nth-child(1){
        color: #666
        min-width 10em
      }
    }
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
.chart-goods{
  display: inline-block
  width: 1100px
  height: 600px
}
.statistics-title{
  margin-top: 30px
  padding-left: 10px
  font-size 16px
  border-left: 4px solid #999;
  line-height: 1.4;
}
</style>