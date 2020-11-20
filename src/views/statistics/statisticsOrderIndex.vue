<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <ul class="data-status">
        <li>
          <div class="ct" v-if="ratio1.y1">
            <h2>7天总成功订单量</h2>
            <h3>{{ratio1.y1}}</h3>
            <p>环比 {{ratio1.y2}}%<i v-if="ratio1.y2 != 0" class="iconfont icon-jiantou-copy" :class="ratio1.y2 > 0 ? 'up' : 'down'"></i></p>
          </div>
          <div class="ct" v-if="ratio1.y1">
            <h2>7天总盈利</h2>
            <h3>{{ratio1.y3}}</h3>
            <p>环比 {{ratio1.y4}}%<i v-if="ratio1.y4 != 0" class="iconfont icon-jiantou-copy" :class="ratio1.y4 > 0 ? 'up' : 'down'"></i></p>
          </div>
          <div class="ct" v-if="ratio1.y1">
            <h2>7天成功总交易额</h2>
            <h3>{{ratio1.y5}}</h3>
            <p>环比 {{ratio1.y6}}%<i v-if="ratio1.y6 != 0" class="iconfont icon-jiantou-copy" :class="ratio1.y6 > 0 ? 'up' : 'down'"></i></p>
          </div>
        </li>
        <li>
          <div class="ct" v-if="ratio2.y1">
            <h2>30天总成功订单量</h2>
            <h3>{{ratio2.y1}}</h3>
            <p>环比 {{ratio2.y2}}%<i v-if="ratio2.y2 != 0" class="iconfont icon-jiantou-copy" :class="ratio2.y2 > 0 ? 'up' : 'down'"></i></p>
          </div>
          <div class="ct" v-if="ratio2.y1">
            <h2>30天总盈利</h2>
            <h3>{{ratio2.y3}}</h3>
            <p>环比 {{ratio2.y4}}%<i v-if="ratio2.y4 != 0" class="iconfont icon-jiantou-copy" :class="ratio2.y4 > 0 ? 'up' : 'down'"></i></p>
          </div>
          <div class="ct" v-if="ratio2.y1">
            <h2>30天成功总交易额</h2>
            <h3>{{ratio2.y5}}</h3>
            <p>环比 {{ratio2.y6}}%<i v-if="ratio2.y6 != 0" class="iconfont icon-jiantou-copy" :class="ratio2.y6 > 0 ? 'up' : 'down'"></i></p>
          </div>
        </li>
      </ul>
      <ul class="data-ul">
        <li @click="goStatisticsOrderItem(1)">
          <div>
            <p><span>供货商账号</span><b>{{topList.y1}}</b></p>
            <p><span>品牌数</span><b>{{topList.y2}}</b></p>
            <p><span>商品数</span><b>{{topList.y3}}</b></p>
          </div>
        </li>
        <li @click="goStatisticsOrderItem(2)">
          <div>
            <p><span>总订单量</span><b>{{topList.y4}}</b></p>
          </div>
        </li>
        <li @click="goStatisticsOrderItem(3)">
          <div>
            <p><span>总交易额</span><b>{{topList.y5}}元</b></p>
            <p><span>总盈利金额</span><b>{{topList.y6}}元</b></p>
          </div>
        </li>
        <li @click="goStatisticsOrderItem(4)">
          <div>
            <p><span>总物流</span><b>{{topList.y7}}</b></p>
          </div>
        </li>
        <li>
          <div>
            <p><span>支付宝收入</span><b>{{topList.y9}}元</b></p>
            <p><span>微信收入</span><b>{{topList.y10}}元</b></p>
            <p><span>提现</span><b>{{topList.y11}}元</b></p>
            <p><span>供应商余额</span><b>{{topList.y12}}元</b></p>
            <p><span>老物流</span><b>{{topList.y7}}</b></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'item',
  data() {
    return {
      ratio1: {},
      ratio2: {},
      topList: {},
    }
  },
  created() {
    this.getRatio1()
    this.getRatio2()
    this.getTopList()
  },
  mounted() {
  },
  computed: {},
  methods: {
    getRatio1() {
      this.$http({
        url: '/order/backadmin/stOrder/ratio',
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
        url: '/order/backadmin/stOrder/ratiofive',
        method: 'POST',
      })
        .then(res => {
          this.ratio2 = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    getTopList() {
      this.$http({
        url: '/order/backadmin/stOrder/index',
        method: 'POST',
      })
        .then(res => {
          this.topList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    goStatisticsOrderItem(e) {
      if(e == 1) this.$router.push({path: '/statisticsOrderSupplier'})
      else if(e == 2) this.$router.push({path: '/statisticsOrderNumber'})
      else if(e == 3) this.$router.push({path: '/statisticsOrderDeal'})
      else if(e == 4) this.$router.push({path: '/statisticsOrderLogistics'})
    },
  }
}
</script>

<style lang="stylus" scoped>
.data-ul{
  overflow: hidden
  padding: 20px
  li{
    float: left
    display: flex
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
    align-items center
    justify-content center
    &>div{
      flex: 1
    }
    p{
      margin-top: 5px
      span{
        display: inline-block
        min-width 5em
      }
      b{
        margin-left: 20px
      }
    }
    &:nth-child(1){
      background-color: #4c3fff
    }
    &:nth-child(2){
      background-color: #ff493f
    }
    &:nth-child(3){
      background-color: #ff3fe6
    }
    &:nth-child(4){
      background-color: #00d51f
    }
    &:nth-child(5){
      margin-right: 1000px
      height: 180px
      cursor: inherit
      background-color: rgb(255,148,63)
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