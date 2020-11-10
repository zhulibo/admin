<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <div class="statistics-tab">
        <span :class="dataType == 1 ? 'on' : ''" @click="changeUserType(1)">新增用户</span>
        <span :class="dataType == 2 ? 'on' : ''" @click="changeUserType(2)">活跃用户</span>
        <span :class="dataType == 3 ? 'on' : ''" @click="changeUserType(3)">启动次数</span>
      </div>
      <div class="vue-echarts-wrap">
        <div class="chart-bar clearfix">
          <div class="timeType">
            <div :class="dayRange == 0 ? '' : 'disabled'"><span :class="timeType == 1 ? 'on' : ''" @click="changeTimeType(1)">小时</span></div>
            <div :class="dayRange >= 1 ? '' : 'disabled'"><span :class="timeType == 2 ? 'on' : ''" @click="changeTimeType(2)">日</span></div>
            <div :class="dayRange > 7 ? '' : 'disabled'"><span :class="timeType == 3 ? 'on' : ''" @click="changeTimeType(3)">周</span></div>
            <div :class="dayRange > 31 ? '' : 'disabled'"><span :class="timeType == 4 ? 'on' : ''" @click="changeTimeType(4)">月</span></div>
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
        <el-table :data="tableList" border v-loading="tableLoading">
          <el-table-column prop="time" label="日期" align="center"></el-table-column>
          <el-table-column v-if="dataType == 1" prop="android" label="新增android" align="center"></el-table-column>
          <el-table-column v-if="dataType == 1" prop="ios" label="新增ios" align="center"></el-table-column>
          <el-table-column v-if="dataType == 2" prop="android" label="活跃android" align="center"></el-table-column>
          <el-table-column v-if="dataType == 2" prop="ios" label="活跃ios" align="center"></el-table-column>
          <el-table-column v-if="dataType == 3" prop="android" label="启动次数android" align="center"></el-table-column>
          <el-table-column v-if="dataType == 3" prop="ios" label="启动次数ios" align="center"></el-table-column>
          <el-table-column prop="all" label="累计用户" align="center"></el-table-column>
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
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      dataType: '',
      eChartsOptions: {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['安卓', 'ios']
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
            name: '安卓',
            data: [],
            type: 'line'
          },
          {
            name: 'ios',
            data: [], // 人数
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
      tableLoading: false,
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
    }
  },
  created() {
    this.dataType = this.$route.query.dataType
  },
  mounted() {
  },
  computed: {},
  methods: {
    changeUserType(e) {
      this.dataType = e
    },
    changeTimeType(e) {
      if(this.dayRange == 0 && e > 1){ // 选择一天，不可选中天、周、月
        return
      }
      else if(this.dayRange <= 7 && e >= 3){ // 时间选择小于7天，不可选中周、月
        return
      }
      else if(this.dayRange <= 31 && e >= 4){ // 时间选择小于31天，不可选中月
        return
      }

      if(this.dayRange > 0 && e == 1){ // 时间选择大于一天，不可选中小时
        return
      }

      this.timeType = e

      this.getList()
    },
    getList() {
      this.getTableList()
      this.loading = true
      let url
      if(this.dataType == 1){
        url = '/userorg/backadmin/stUser/everyDay'
      }else if(this.dataType == 2){
        url = '/userorg/backadmin/stUser/brisk'
      }else if(this.dataType == 3){
        url = '/userorg/backadmin/stUser/start'
      }
      this.$http({
        url: url,
        method: 'POST',
        data: {
          type: this.timeType,
          startTime: this.time[0],
          endTime: this.time[1],
        }
      })
        .then(res => {
          this.eChartsOptions.xAxis.data = res.data.x
          this.eChartsOptions.series[0].data = res.data.y1
          this.eChartsOptions.series[1].data = res.data.y2
          this.loading = false
        }).catch(e => {
        console.log(e)
        this.loading = false
      })
    },
    getTableList(){
      this.tableLoading = true
      let url
      if(this.dataType == 1){
        url = '/userorg/backadmin/stUser/everyDayList'
      }else if(this.dataType == 2){
        url = '/userorg/backadmin/stUser/briskList'
      }else if(this.dataType == 3){
        url = '/userorg/backadmin/stUser/startList'
      }
      this.$http({
        url: url,
        method: 'POST',
        data: {
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
          this.tableLoading = false
        }).catch(e => {
        console.log(e)
        this.tableLoading = false
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getTableList()
    },
  },
  watch: {
    dataType: {
      handler: function (){
        this.getList()
      }
    },
    // timeType: {
    //   handler: function (){
    //     this.getList()
    //   }
    // },
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
        this.totalPages = null
        this.currentPage = 1
        this.getList()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.statistics-tab{
  padding-top: 10px
  font-size 16px
  span{
    margin-right: 20px
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
.chart-table{
  width: 1100px
}
</style>