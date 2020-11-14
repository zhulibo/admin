<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <div class="vue-echarts-wrap">
        <div class="chart-bar clearfix">
          <div class="timeType">
            <div :class="dayRange == 0 ? '' : 'disabled'"><span :class="timeType == 1 ? 'on' : ''" @click="changeTimeType(1)">小时</span></div>
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
      <div class="order-number-banner">
        <div>
          <p><span>已完成</span><span>{{allOrderList.b}}</span></p>
          <p><span>总额</span><span>{{allOrderList.a}}元</span></p>
        </div>
        <div>
          <p><span>待收货</span><span>{{allOrderList.c}}</span></p>
          <p><span>总额</span><span>{{allOrderList.d}}元</span></p>
        </div>
        <div>
          <p><span>代发货</span><span>{{allOrderList.e}}</span></p>
          <p><span>总额</span><span>{{allOrderList.f}}元</span></p>
        </div>
        <div>
          <p><span>已取消</span><span>{{allOrderList.g}}</span></p>
          <p><span>总额</span><span>{{allOrderList.h}}元</span></p>
        </div>
      </div>
      <h2 class="statistics-title">地区订单</h2>
      <div class="chart-goods">
        <v-chart :options="mapEChartsOptions"/>
      </div>
      <div class="pagination-ct clearfix">
        <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage2" :page-count="totalPages2"
                       @current-change="handleCurrentChange2" background></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import china from '../../../node_modules/echarts/map/js/china.js'

export default {
  name: 'item',
  data() {
    return {
      allOrderList: {},
      eChartsOptions: {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['成功订单', '取消订单']
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
            name: '成功订单',
            data: [],
            type: 'line'
          },
          {
            name: '取消订单',
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
      goodsList: [],
      pageSize2: 10,
      currentPage2: 1,
      totalPages2: null,
      mapEChartsOptions: {
        backgroundColor: '#ddd',
        title: {
          text: '地区订单',
          left: 'center',
          bottom: 0,
          textStyle: {
            fontSize : 16,
            fontWeight: 'normal',
          }
        },
        visualMap: {
          // min: 0,
          // max: 1000,
          inRange: {
            color: ['#f1f1f1', '#2791ff'] //颜色
          },
          textStyle: {
            color: '#333'
          },
        },
        tooltip:{
          trigger: 'item',
          formatter: function (params,ticket,callback) {
            // console.log(params)
            let str = ''
            str += params.data.name + '：' + params.data.value + '<br/>'
            if(params.data.children && params.data.children.length > 0){
              for (let i = 0; i < params.data.children.length; i++) {
                str += params.data.children[i].cityName + '：' + params.data.children[i].numbers + '<br/>'
              }
            }
            // console.log(str)
            return str
          },
        },
        series:[
          {
            //图形上的文本标签，可用于说明图形的一些数据信息
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              //normal 是图形在默认状态下的样式；
              normal: {
                show: true,
                borderColor:"#ccc",
                borderWidth:"1"
              },
              //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              emphasis: {
                show: true,
                areaColor:"#d55",
              }
            },
            type: 'map',
            map: 'china',
            data:[
              {name: '北京',value: 0},
              {name: '天津',value: 0},
              {name: '上海',value: 0},
              {name: '河南',value: 0},
              {name: '重庆',value: 0},
              {name: '河北',value: 0},
              {name: '河南',value: 0},
              {name: '云南',value: 0},
              {name: '辽宁',value: 0},
              {name: '黑龙江',value: 0},
              {name: '湖南',value: 0},
              {name: '安徽',value: 0},
              {name: '山东',value: 0},
              {name: '新疆',value: 0},
              {name: '江苏',value: 0},
              {name: '浙江',value: 0},
              {name: '江西',value: 0},
              {name: '湖北',value: 0},
              {name: '广西',value: 0},
              {name: '甘肃',value: 0},
              {name: '山西',value: 0},
              {name: '内蒙古',value: 0},
              {name: '陕西',value: 0},
              {name: '吉林',value: 0},
              {name: '福建',value: 0},
              {name: '贵州',value: 1},
              {name: '广东',value: 0},
              {name: '青海',value: 0},
              {name: '西藏',value: 0},
              {name: '四川',value: 0},
              {name: '宁夏',value: 0},
              {name: '海南',value: 0},
              {name: '台湾',value: 0},
              {name: '香港',value: 0},
              {name: '澳门',value: 0},
              {name: '南海诸岛',value: 0}
            ],
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
    this.getMapList()
  },
  mounted() {
  },
  computed: {},
  methods: {
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
        url: '/order/backadmin/stOrder/allorders',
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
    getOrderList() {
      this.$http({
        url: '/order/backadmin/stOrder/orderinfo',
        method: 'POST',
        data: {
          startTime: this.time[0],
          endTime: this.time[1],
        }
      })
        .then(res => {
          this.allOrderList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    getMapList() {
      this.$http({
        url: '/order/backadmin/stOrder/areaorders',
        method: 'POST',
      })
        .then(res => {
          let map = this.mapEChartsOptions.series[0].data

          for (let i = 0; i < map.length; i++) {
            for (let key in res.data) {
              if (key.indexOf(map[i].name) != -1){
                this.mapEChartsOptions.series[0].data[i].children = res.data[key]
                let numbers = 0
                for (let j = 0; j < res.data[key].length; j++) {
                  numbers += res.data[key][j].numbers
                }
                this.mapEChartsOptions.series[0].data[i].value = numbers
                break
              }
            }
          }
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getOrderList()
    },
    handleCurrentChange2: function (val) { // 页码变更
      this.currentPage2 = val
      this.getMapList()
    },
  },
  watch: {
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
.echarts {
  width: 100%;
  height: 100%;
}
.chart-goods{
  margin-top: 20px
  width: 1100px
  height: 800px
}
.statistics-title{
  margin-top: 30px
  padding-left: 10px
  font-size 16px
  border-left: 4px solid #999;
  line-height: 1.4;
}
</style>