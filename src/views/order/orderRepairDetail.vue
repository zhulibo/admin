<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <ul class="detail">
        <li>
          <div class="l">
            <span>下单时间</span>
          </div>
          <div class="r">
            <span>{{ detail.creatTime | timestampToDate }}</span>
          </div>
        </li>
        <li>
          <div class="l">
            <span>维修订单id</span>
          </div>
          <div class="r">
            <span>{{ detail.id }}</span>
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
            <span>用户id</span>
          </div>
          <div class="r">
            <span>{{ detail.userId }}</span>
          </div>
        </li>
        <li>
          <div class="l">
            <span>状态</span>
          </div>
          <div class="r">
            <span v-if="detail.status == 1">待平台分配维修师</span>
            <span v-else-if="detail.status == 2">维修师待评估</span>
            <span v-else-if="detail.status == 3">初步待用户确认</span>
            <span v-else-if="detail.status == 4">待用户邮寄</span>
            <span v-else-if="detail.status == 5">平台待收货</span>
            <span v-else-if="detail.status == 6">平台已收货待评估</span>
            <span v-else-if="detail.status == 7">平台已评估待用户确认</span>
            <span v-else-if="detail.status == 8">用户已确认待支付</span>
            <span v-else-if="detail.status == 9">用户已支付修复中</span>
            <span v-else-if="detail.status == 10">修复完成用户待收货</span>
            <span v-else-if="detail.status == 11">用户确认收货已完成</span>
            <span v-else-if="detail.status == 12">用户拒绝初步维修</span>
            <span v-else-if="detail.status == 13">用户再次拒绝平台待填收货地址</span>
            <span v-else-if="detail.status == 14">用户再次拒绝平台，平台已邮寄待收货</span>
            <span v-else-if="detail.status == 15">用户再次拒绝平台，确认收货维修单已取消</span>
            <span v-else-if="detail.status == 16">修复完成待填写收货地址</span>
            <span v-else-if="detail.status == 17">修复完成已填写收货地址</span>
            <span v-else-if="detail.status == 18">二次确认放弃修复</span>
            <span v-else-if="detail.status == 0">删除</span>
          </div>
        </li>
        <li>
          <div class="l">
            <span>外观图片</span>
          </div>
          <div class="r">
            <img v-for="item in detail.outImages" :src="item" alt="">
          </div>
        </li>
        <li>
          <div class="l">
            <span>底座图片</span>
          </div>
          <div class="r">
            <img v-for="item in detail.baseImages" :src="item" alt="">
          </div>
        </li>
        <li>
          <div class="l">
            <span>损坏位置图片</span>
          </div>
          <div class="r">
            <img v-for="item in detail.breakImages" :src="item" alt="">
          </div>
        </li>
        <li v-if="detail.description">
          <div class="l">
            <span>描述</span>
          </div>
          <div class="r">
            <span>{{ detail.description }}</span>
          </div>
        </li>
        <li v-if="detail.price">
          <div class="l">
            <span>支付金额</span>
          </div>
          <div class="r">
            <span>{{ detail.price }}</span>
          </div>
        </li>
        <li v-if="detail.userAddress">
          <div class="l">
            <span>收货人地址</span>
          </div>
          <div class="r">
            <span>{{ detail.userAddress }}</span>
          </div>
        </li>
        <li v-if="detail.userPhone">
          <div class="l">
            <span>收货人电话</span>
          </div>
          <div class="r">
            <span>{{ detail.userPhone }}</span>
          </div>
        </li>
        <li v-if="detail.userName">
          <div class="l">
            <span>收货人</span>
          </div>
          <div class="r">
            <span>{{ detail.userName }}</span>
          </div>
        </li>
        <li v-if="detail.receiveAddress">
          <div class="l">
            <span>维修服务-收货地址</span>
          </div>
          <div class="r">
            <span>{{ detail.receiveAddress }}</span>
          </div>
        </li>
        <li v-if="detail.receiveName">
          <div class="l">
            <span>维修服务-姓名</span>
          </div>
          <div class="r">
            <span>{{ detail.receiveName }}</span>
          </div>
        </li>
        <li v-if="detail.receivePhone">
          <div class="l">
            <span>维修服务-手机号</span>
          </div>
          <div class="r">
            <span>{{ detail.receivePhone }}</span>
          </div>
        </li>
        <li v-if="detail.payType">
          <div class="l">
            <span>支付方式</span>
          </div>
          <div class="r">
            <span v-if="detail.payType == 1">支付宝</span>
            <span v-else-if="detail.payType == 2">微信</span>
          </div>
        </li>
        <li v-if="detail.price">
          <div class="l">
            <span>支付金额</span>
          </div>
          <div class="r">
            <span>{{ detail.price }}</span>
          </div>
        </li>
      </ul>
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
        url: '/order/backadmin/repair/detail',
        method: 'GET',
        params: {
          id: this.id,
        }
      })
        .then(res => {
          res.data.outImages = res.data.outImages.split(";")
          res.data.baseImages = res.data.baseImages.split(";")
          res.data.breakImages = res.data.breakImages.split(";")
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
.detail li {
  display: flex
  margin-top: 10px
  margin-bottom: 10px
  .l {
    width: 200px
  }
  .r {
    flex: 1
    ul {
      padding: 0 10px
      border-top: 1px dashed #ddd
      border-bottom: 1px dashed #ddd
    }
    img {
      margin-right: 10px
      height: 15em
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
