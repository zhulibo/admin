<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <div class="base-info">
        <div class="title"><h3>基本信息</h3></div>
        <ul>
          <li>
            <div class="l">
              <span>订单时间</span>
            </div>
            <div class="r">
              <span>{{ detail.creatTime | timestampToDate }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>订单号</span>
            </div>
            <div class="r">
              <span>{{ detail.number }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>订单状态</span>
            </div>
            <div class="r">
              <span v-if="detail.status == 0">已删除</span>
              <span v-else-if="detail.status == 1">待付款</span>
              <span v-else-if="detail.status == 2">待发货</span>
              <span v-else-if="detail.status == 3">待收货</span>
              <span v-else-if="detail.status == 4">用户已确认收货</span>
              <span v-else-if="detail.status == 5">支付后用户取消</span>
              <span v-else-if="detail.status == 6">支付后后台取消</span>
              <span v-else-if="detail.status == 7">未支付超时取消</span>
              <span v-else-if="detail.status == 8">未支付用户取消</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>预售订单状态</span>
            </div>
            <div class="r">
              <span v-if="detail.preStatus == 1">已预订</span>
              <span v-else-if="detail.preStatus == 2">已付尾款</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>是否结算</span>
            </div>
            <div class="r">
              <span v-if="detail.isBalance == 0">未结算</span>
              <span v-else-if="detail.isBalance == 1">未结算</span>
              <span v-else-if="detail.isBalance == 2">已结算</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>订单应付总金额</span>
            </div>
            <div class="r">
              <span>{{ detail.allMoney }}元</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>订单实付总金额</span>
            </div>
            <div class="r">
              <span>{{ detail.payMoney }}元</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>应付尾款</span>
            </div>
            <div class="r">
              <span>{{ detail.endPayMoney }}元</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>预付金额</span>
            </div>
            <div class="r">
              <span>{{ detail.prePayMoney }}元</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>订单优惠价格</span>
            </div>
            <div class="r">
              <span>{{ detail.discounts }}元</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>供货商id</span>
            </div>
            <div class="r">
              <span>{{ detail.shopId }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>用户id</span>
            </div>
            <div class="r">
              <span>{{ detail.userId }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>服务费比例</span>
            </div>
            <div class="r">
              <span>{{ detail.serviceRatio }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="goods-info">
        <div class="title"><h3>商品信息</h3></div>
        <ul v-for="item in detail.goods">
          <li>
            <div class="l">
              <span>主商品id</span>
            </div>
            <div class="r">
              <span>{{ item.goodsId }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>sku-id</span>
            </div>
            <div class="r">
              <span>{{ item.skuId }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>商品名称</span>
            </div>
            <div class="r">
              <span>{{ item.goodsName }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>商品图片</span>
            </div>
            <div class="r">
              <img :src="item.goodsPhoto" alt="">
            </div>
          </li>
          <li>
            <div class="l">
              <span>商品规格</span>
            </div>
            <div class="r">
              <span>{{ item.goodsModels }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>商品价格</span>
            </div>
            <div class="r">
              <span>{{ item.goodsMoney }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>购买数量</span>
            </div>
            <div class="r">
              <span>{{ item.goodsNumber }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="order-info">
        <div class="title"><h3>订单信息</h3></div>
        <ul>
          <li>
            <div class="l">
              <span>收货人电话</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.phone }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>收货人姓名</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.name }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>收货人地址</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.address }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>订单编号</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.logNumber | noneToLine }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>买家备注</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.remark | noneToLine}}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>订单运费</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.carriage }}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.payTime">
            <div class="l">
              <span>支付时间</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.payTime }}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.payType">
            <div class="l">
              <span>支付方式</span>
            </div>
            <div class="r">
              <span v-if="detail.tbOrderDetail.payType == 1">支付宝</span>
              <span v-else-if="detail.tbOrderDetail.payType == 2">微信</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.sendTime">
            <div class="l">
              <span>发货时间</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.sendTime | timestampToDate}}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.passTime">
            <div class="l">
              <span>订单取消时间</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.passTime | timestampToDate }}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.autoTakeTime">
            <div class="l">
              <span>自动确认收货时间</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.autoTakeTime | timestampToDate }}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.takeTime">
            <div class="l">
              <span>用户确认收货时间</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.takeTime | timestampToDate }}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.beAddress">
            <div class="l">
              <span>发货地址</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.beAddress }}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.originalNumber">
            <div class="l">
              <span>原订单编号</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.originalNumber }}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.separateTime">
            <div class="l">
              <span>拆单时间</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.separateTime | timestampToDate }}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.prePayTime">
            <div class="l">
              <span>预付支付时间</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.prePayTime | timestampToDate }}</span>
            </div>
          </li>
          <li v-if="detail.tbOrderDetail.endPayTime">
            <div class="l">
              <span>尾款支付时间</span>
            </div>
            <div class="r">
              <span>{{ detail.tbOrderDetail.endPayTime | timestampToDate }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      detail: {},
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/order/backadmin/shoporder',
        method: 'GET',
        params: {
          id: this.id,
        }
      })
        .then(res => {
          this.detail = res.data
        }).catch(e => {
        console.log(e)
      })
    },
  },
  watch: {}
}
</script>

<style lang="stylus" scoped>
.base-info{
  .title{
    margin-top: 20px
    h3{
      display: inline-block
      font-size 16px
      font-weight: bold
      color: #666
      border-bottom: 2px solid #999
    }
  }
  ul{
    margin-left: 30px
  }
  li{
    display: flex
    margin-top: 10px
    margin-bottom: 10px
    .l {
      width: 200px
    }
    .r {
      flex: 1
    }
  }
}
.goods-info{
  .title{
    margin-top: 20px
    h3{
      display: inline-block
      font-size 16px
      font-weight: bold
      color: #666
      border-bottom: 2px solid #999
    }
  }
  ul{
    margin-left: 30px
    border-bottom: 1px dashed #aaa
    &:last-child{
      border: none
    }
  }
  li{
    display: flex
    margin-top: 10px
    margin-bottom: 10px
    .l {
      width: 200px
    }
    .r {
      flex: 1
      img {
        height: 5em
      }
    }
  }
}
.order-info{
  .title{
    margin-top: 20px
    h3{
      display: inline-block
      font-size 16px
      font-weight: bold
      color: #666
      border-bottom: 2px solid #999
    }
  }
  ul{
    margin-left: 30px
  }
  li{
    display: flex
    margin-top: 10px
    margin-bottom: 10px
    .l {
      width: 200px
    }
    .r {
      flex: 1
    }
  }
}
.split-order {
  padding: 50px
  h3 {
    font-weight: bold
    font-size 16px
  }
}
</style>
