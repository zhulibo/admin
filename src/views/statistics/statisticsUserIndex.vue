<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <ul class="data-status">
        <li>
          <div class="ct" v-if="ratio1.y1">
            <h2>7天总活跃用户</h2>
            <h3>{{ratio1.y1.number}}</h3>
            <p>环比 {{ratio1.y1.ratioBean}}%<i v-if="ratio1.y1.ratioBean != 0" class="iconfont icon-jiantou-copy" :class="ratio1.y1.ratioBean > 0 ? 'up' : 'down'"></i></p>
          </div>
          <div class="ct" v-if="ratio1.y1">
            <h2>7天总新增用户</h2>
            <h3>{{ratio1.y2.number}}</h3>
            <p>环比 {{ratio1.y2.ratioBean}}%<i v-if="ratio1.y2.ratioBean != 0" class="iconfont icon-jiantou-copy" :class="ratio1.y2.ratioBean > 0 ? 'up' : 'down'"></i></p>
          </div>
          <div class="ct" v-if="ratio1.y1">
            <h2>7天总启动次数</h2>
            <h3>{{ratio1.y3.number}}</h3>
            <p>环比 {{ratio1.y3.ratioBean}}%<i v-if="ratio1.y3.ratioBean != 0" class="iconfont icon-jiantou-copy" :class="ratio1.y3.ratioBean > 0 ? 'up' : 'down'"></i></p>
          </div>
        </li>
        <li>
          <div class="ct" v-if="ratio2.y1">
            <h2>30天总活跃用户</h2>
            <h3>{{ratio2.y1.number}}</h3>
            <p>环比 {{ratio2.y1.ratioBean}}%<i v-if="ratio2.y1.ratioBean != 0" class="iconfont icon-jiantou-copy" :class="ratio2.y1.ratioBean > 0 ? 'up' : 'down'"></i></p>
          </div>
          <div class="ct" v-if="ratio2.y1">
            <h2>30天总新增用户</h2>
            <h3>{{ratio2.y2.number}}</h3>
            <p>环比 {{ratio2.y2.ratioBean}}%<i v-if="ratio2.y3.ratioBean != 0" class="iconfont icon-jiantou-copy" :class="ratio2.y2.ratioBean > 0 ? 'up' : 'down'"></i></p>
          </div>
          <div class="ct" v-if="ratio2.y1">
            <h2>30天总启动次数</h2>
            <h3>{{ratio2.y3.number}}</h3>
            <p>环比 {{ratio2.y3.ratioBean}}%<i v-if="ratio2.y3.ratioBean != 0" class="iconfont icon-jiantou-copy" :class="ratio2.y3.ratioBean > 0 ? 'up' : 'down'"></i></p>
          </div>
          <div class="ct" v-if="ratio2.y1">
            <h2>总累计用户</h2>
            <h3>{{topList.y7}}</h3>
          </div>
        </li>
      </ul>
      <ul class="data-ul">
        <li @click="goStatisticsUserItem(1)">
          <h3><i class="iconfont icon-shezhi"></i>新增用户</h3>
          <p>今日<b>{{topList.y1}}</b></p>
          <p>昨日<b>{{topList.y2}}</b></p>
        </li>
        <li @click="goStatisticsUserItem(2)">
          <h3><i class="iconfont icon-shezhi"></i>活跃用户</h3>
          <p>今日<b>{{topList.y3}}</b></p>
          <p>昨日<b>{{topList.y4}}</b></p>
        </li>
        <li @click="goStatisticsUserItem(3)">
          <h3><i class="iconfont icon-shezhi"></i>启动次数</h3>
          <p>今日<b>{{topList.y5}}</b></p>
          <p>昨日<b>{{topList.y6}}</b></p>
        </li>
        <li>
          <h3><i class="iconfont icon-shezhi"></i>累计用户(总{{topList.y7}})</h3>
          <p>安卓<b>{{topList.y8}}</b></p>
          <p>IOS<b>{{topList.y9}}</b></p>
        </li>
        <li class="pay-money-user">
          <h3><i class="iconfont icon-shezhi"></i>成功付费用户</h3>
          <p><b>{{ratio3.y1}}</b></p>
          <h3><i class="iconfont icon-shezhi"></i>复购成功用户</h3>
          <p><b>{{ratio3.y2}}</b><em>{{ (ratio3.y3 * 100).toFixed(2)}}%</em></p>
        </li>
      </ul>
      <div class="vue-echarts-wrap">
        <div class="chart-sex">
          <v-chart :options="sexEChartsOptions"/>
        </div>
        <div class="chart-age">
          <v-chart :options="ageEChartsOptions"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  name: 'item',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      ratio1: {},
      ratio2: {},
      ratio3: {},
      topList: {},
      sexList: {},
      ageList: {},
      sexEChartsOptions: {
        title: {
          text: '用户男女比例',
          left: 'center',
          bottom: 0,
          textStyle: {
            fontSize : 16,
            fontWeight: 'normal',
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}人<br/>{d}%',
        },
        color: ['#7287ff','#ff7e7e', '#ffa1f3'],
        series: [{
          type: 'pie',
          radius: '140',
          label: {
            position: 'inner',
            formatter: '{b}:{c}人\n{d}%',
            fontSize: 14,
            lineHeight: 20,
          },
          data: [
            {value: 0, name: '男'},
            {value: 0, name: '女'},
            {value: 0, name: '未知'},
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
            }
          }
        }]
      },
      ageEChartsOptions: {
        title: {
          text: '用户年龄比例',
          left: 'center',
          bottom: 0,
          textStyle: {
            fontSize : 16,
            fontWeight: 'normal',
          }
        },
        legend: {
          orient: 'vertical',
          right: 0,
          bottom: 10,
          data: ['00后(2000年以后—20岁以下)', '95后(1995年-1999年—21岁-25岁)', '90后(1990年-1994年—26岁-30岁)', '85后(1985年-1989年—31岁-35岁)', '80后(1980年-1984年—36岁-40岁)', '40岁以上(1979年以前)', '未统计']
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}人 {d}%',
        },
        color: ['#1e00b0', '#00b050', '#5b9bd5', '#d86153', '#8c5bb5', '#ffc000', '#ffa1f3'],
        series: [{
          type: 'pie',
          radius: '140',
          center: ['35%', '50%'],
          label: {
            formatter: '{d}%',
            fontSize: 14,
            lineHeight: 20,
          },
          data: [
            {value: 0, name: '00后(2000年以后—20岁以下)'},
            {value: 0, name: '95后(1995年-1999年—21岁-25岁)'},
            {value: 0, name: '90后(1990年-1994年—26岁-30岁)'},
            {value: 0, name: '85后(1985年-1989年—31岁-35岁)'},
            {value: 0, name: '80后(1980年-1984年—36岁-40岁)'},
            {value: 0, name: '40岁以上(1979年以前)'},
            {value: 0, name: '未统计'},
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
            }
          }
        }]
      }
    }
  },
  created() {
    this.getRatio1()
    this.getRatio2()
    this.getRatio3()
    this.getTopList()
    this.getSexList()
    this.getAgeList()
  },
  mounted() {
  },
  computed: {},
  methods: {
    getRatio1() {
      this.$http({
        url: '/userorg/backadmin/stUser/ratio',
        method: 'POST',
      })
        .then(res => {
          this.ratio1 = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    getRatio2() {
      this.$http({
        url: '/userorg/backadmin/stUser/ratiofive',
        method: 'POST',
      })
        .then(res => {
          this.ratio2 = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    getRatio3() {
      this.$http({
        url: '/order/backadmin/stOrder/orders',
        method: 'POST',
      })
        .then(res => {
          this.ratio3 = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    getTopList() {
      this.$http({
        url: '/userorg/backadmin/stUser/index',
        method: 'POST',
      })
        .then(res => {
          this.topList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    getSexList() {
      this.$http({
        url: '/userorg/backadmin/stUser/sex',
        method: 'POST',
      })
        .then(res => {
          this.sexList = res.data
          this.sexEChartsOptions.series[0].data[0].value = this.sexList.y1
          this.sexEChartsOptions.series[0].data[1].value = this.sexList.y2
          this.sexEChartsOptions.series[0].data[2].value = this.sexList.y3
        }).catch(e => {
        console.log(e)
      })
    },
    getAgeList() {
      this.$http({
        url: '/userorg/backadmin/stUser/birth',
        method: 'POST',
      })
        .then(res => {
          this.ageList = res.data
          this.ageEChartsOptions.series[0].data[0].value = this.ageList.y6
          this.ageEChartsOptions.series[0].data[1].value = this.ageList.y5
          this.ageEChartsOptions.series[0].data[2].value = this.ageList.y4
          this.ageEChartsOptions.series[0].data[3].value = this.ageList.y3
          this.ageEChartsOptions.series[0].data[4].value = this.ageList.y2
          this.ageEChartsOptions.series[0].data[5].value = this.ageList.y1
          this.ageEChartsOptions.series[0].data[6].value = this.ageList.y7
        }).catch(e => {
        console.log(e)
      })
    },
    goStatisticsUserItem(e) {
      this.$router.push({path: '/statisticsUserDetail', query: {dataType: e}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.vue-echarts-wrap {
  padding: 10px
  background-color: #fff;
}
.echarts {
  width: 100%;
  height: 100%;
}
.chart-sex{
  display: inline-block
  width: 400px
  height: 400px
}
.chart-age{
  display: inline-block
  width: 700px
  height: 400px
}
.data-ul{
  overflow: hidden
  padding: 20px
  li{
    float: left
    display: inline-block
    box-sizing border-box
    margin-left: 20px
    margin-bottom: 20px
    width: 240px
    height: 125px
    padding: 15px 20px
    border-radius: 10px;
    font-size 16px
    color: #fff
    cursor: pointer
    h3{
      i{
        display: inline-block
        margin-right: 10px
      }
    }
    p{
      margin-top: 10px
      b{
        margin-left: 20px
      }
    }
    &:nth-child(1){
      background-color: #4c3fff
    }
    &:nth-child(2){
      background-color: #ff943f
    }
    &:nth-child(3){
      background-color: #ff3fcb
    }
    &:nth-child(4){
      cursor: initial
      background-color: #0fdd4a
    }
    &:nth-child(5){
      cursor: default
      background-color: #00f0bd
    }
    &.pay-money-user{
      p {
        margin-top: 0
        em{
          display: inline-block
          margin-left: 20px
          font-style normal
        }
      }
    }
  }
}
.data-status{
  margin-top: 10px
  li{
    display: inline-block
    margin-right: 20px
    padding: 0 20px
    padding-top: 15px
    width: 500px
    height: 180px
    border-radius: 10px
    background-color: #ffe3e3
    overflow: hidden
    .ct{
      float: left
      margin-bottom: 15px
      width: 50%
    }
    h3{
      font-weight: bold
      font-size 18px
    }
    p{
      color: #999
      i{
        font-size 16px
        &.up{
          color: #f00
        }
        &.down{
          display: inline-block
          transform: rotateZ(180deg);
          color: #00e211
        }
      }
    }
  }
}
</style>