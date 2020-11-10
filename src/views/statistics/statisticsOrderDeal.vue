<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <div class="vue-echarts-wrap">
        <div class="chart-bar clearfix">
          <div class="dataType">
            <span :class="dataType == 1 ? 'on' : ''" @click="changeDataType(1)">总营收</span>
            <span :class="dataType == 2 ? 'on' : ''" @click="changeDataType(2)">微信收入</span>
            <span :class="dataType == 3 ? 'on' : ''" @click="changeDataType(3)">支付宝</span>
            <span :class="dataType == 4 ? 'on' : ''" @click="changeDataType(4)">平台服务费</span>
            <span :class="dataType == 5 ? 'on' : ''" @click="changeDataType(5)">转账手续费</span>
            <span :class="dataType == 6 ? 'on' : ''" @click="changeDataType(6)">总盈收</span>
          </div>
          <div class="timeType">
            <div :class="dayRange >= 1 ? '' : 'disabled'"><span :class="timeType == 2 ? 'on' : ''" @click="changeTimeType(2)">日</span></div>
            <div :class="dayRange > 7 ? '' : 'disabled'"><span :class="timeType == 3 ? 'on' : ''" @click="changeTimeType(3)">周</span></div>
            <div :class="dayRange > 31 ? '' : 'disabled'"><span :class="timeType == 4 ? 'on' : ''" @click="changeTimeType(4)">月</span></div>
            <div :class="dayRange > 365 ? '' : 'disabled'"><span :class="timeType == 5 ? 'on' : ''" @click="changeTimeType(5)">年</span></div>
          </div>
          <div class="time-select">
            <span>选择日期：</span>
            <el-date-picker
              v-model="time"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy MM dd HH SS"
              value-format="timestamp"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="chart-ct" v-loading="loading">
          <v-chart :options="eChartsOptions"/>
        </div>
      </div>
      <div class="chart-table">
        <el-table :data="tableList" border>
          <el-table-column prop="time" label="日期" align="center"></el-table-column>
          <el-table-column prop="all" label="总营收" align="center"></el-table-column>
        </el-table>
        <div class="pagination-ct clearfix">
          <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages"
                         @current-change="handleCurrentChange" background></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

export default {
  name: 'item',
  data() {
    return {
      dataType: 1,
      allOrderList: {},
      eChartsOptions: {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: [] // 日期
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          },
        ]
      },
      loading: false,
      timeType: 2,
      dayRange: 7,
      time: [
        new Date(new Date().toLocaleDateString()).getTime() - 7 * 24 * 60 * 60 * 1000,
        new Date(new Date().toLocaleDateString()).getTime(),
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -1 // 当天23:59时间戳
        },
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
    }
  },
  components: {
    'v-chart': ECharts
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  computed: {},
  methods: {
    changeDataType(e) {
      this.dataType = e
    },
    changeTimeType(e) {
      if(this.dayRange == 0 && e > 1){ // 选择一天，不可选中天、周、月、年
        return
      }
      else if(this.dayRange <= 7 && e >= 3){ // 时间选择小于7天，不可选中周、月、年
        return
      }
      else if(this.dayRange <= 31 && e >= 4){ // 时间选择小于31天，不可选中月、年
        return
      }
      else if(this.dayRange <= 365 && e >= 5){ // 时间选择小于365天，不可选中年
        return
      }

      this.timeType = e

      this.getList()
    },
    getList() {
      this.loading = true
      this.getOrderList()
      this.$http({
        url: '/order/backadmin/stOrder/jiaoyiz',
        method: 'POST',
        data: {
          status: this.dataType,
          type: this.timeType,
          startTime: this.time[0],
          endTime: this.time[1],
        }
      })
        .then(res => {
          this.eChartsOptions.xAxis.data = res.data.x
          this.eChartsOptions.series[0].data = res.data.y1
          this.loading = false
        }).catch(e => {
        console.log(e)
        this.loading = false
      })
    },
    getOrderList(){
      this.$http({
        url: '/order/backadmin/stOrder/jiaoyizList',
        method: 'POST',
        data: {
          status: this.dataType,
          type: this.timeType,
          startTime: this.time[0],
          endTime: this.time[1],
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.tableList = res.data.list
          this.totalPages = res.data.total
          this.currentPage = res.data.pageNum
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getOrderList()
    },
  },
  watch: {
    dataType: {
      handler: function (){
        this.getList()
      }
    },
    time: {
      handler: function (){
        let time = this.time[1] - this.time[0]
        this.dayRange = time / (24 * 60 * 60 * 1000)

        if(this.dayRange == 0){ // 选择一天
          this.timeType = 1
        }
        else if(this.dayRange <= 7){ // 选择一天
          this.timeType = 2
        }
        else if(this.dayRange <= 31){ // 选择大于一周
          this.timeType = 3
        }
        else if(this.dayRange > 31){ // 选择大于一月
          this.timeType = 4
        }
        else if(this.dayRange > 365){ // 选择大于一年
          this.timeType = 5
        }
        this.totalPages = null
        this.currentPage = 1
        this.getList()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.order-number-banner{
  overflow: hidden
  padding: 20px
  div{
    float: left
    display: inline-block
    box-sizing border-box
    margin-left: 20px
    margin-bottom: 20px
    width: 240px
    padding: 15px 20px
    border-radius: 10px;
    font-size 16px
    color: #fff
    cursor: pointer
    p{
      margin-top: 5px
      span{
        display: inline-block
        min-width 5em
        &:last-child{
          font-weight: bold
        }
      }
    }
    &:nth-child(1){
      background-color: rgb(219,2,230)
    }
    &:nth-child(2){
      background-color: rgb(219,214,0)
    }
    &:nth-child(3){
      background-color: rgb(125,255,0)
    }
    &:nth-child(4){
      cursor: initial
      background-color: rgb(191,191,191)
    }
  }
}
.vue-echarts-wrap {
  width: 1100px
  background-color: #fff;
}
.echarts {
  width: 100%;
  height: 100%;
}
.chart-ct{
  display: inline-block
  margin-top: 20px
  width: 1100px
  height: 500px
}
.dataType{
  padding-top: 10px
  span{
    margin-right: 10px
    display: inline-block
    padding: 3px 10px
    color: #333
    border: 1px solid #aaa
    border-radius: 6px
    text-align: center
    cursor: pointer
    &.on{
      color: rgb(112,94,198)
      border: 1px solid rgb(112,94,198)
    }
  }
}
.chart-bar{
  margin-top: 10px
  .timeType{
    padding-top: 10px
    display: inline-block
    div{
      display: inline-block
    }
    .disabled{
      span{
        color: #ccc
        border: 1px solid #ccc
        cursor: not-allowed
      }
    }
    span{
      margin-right: 10px
      display: inline-block
      padding: 3px 10px
      color: #333
      border: 1px solid #aaa
      border-radius: 6px
      width: 50px
      text-align: center
      cursor: pointer
      &.on{
        color: #00bd0e
        border: 1px solid #00bd0e
      }
    }
  }
  .time-select{
    float: right
    display: inline-block
  }
}
</style>