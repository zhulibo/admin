<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <div class="base-info">
        <ul>
          <li>
            <div class="l">
              <span>昵称</span>
            </div>
            <div class="r">
              <span>{{ detail.nickName | noneToLine }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>漫想家id</span>
            </div>
            <div class="r">
              <span>{{ detail.homesickId | noneToLine}}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>头像</span>
            </div>
            <div class="r">
              <img v-if="detail.header" :src="detail.header" alt="" style="height: 5em;">
              <span v-else>--</span>
            </div>
          </li>
          <li>
          <li>
            <div class="l">
              <span>手机号</span>
            </div>
            <div class="r">
              <span>{{ detailRoot.phone | noneToLine }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>性别</span>
            </div>
            <div class="r">
              <span>{{ detail.sex | noneToLine }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>签名</span>
            </div>
            <div class="r">
              <span>{{ detail.signature | noneToLine }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>生日</span>
            </div>
            <div class="r">
              <span v-if="detail.birthday">{{ detail.birthday | timestampToDateDay}}</span>
              <span v-else>--</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>城市</span>
            </div>
            <div class="r">
              <span>{{ detail.cityName | noneToLine }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>收货地址</span>
            </div>
            <div class="r">
              <span>{{ detailRoot.addressesName | noneToLine }}</span>
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
      userId: '',
      detail: {},
      detailRoot: {},
    }
  },
  created() {
    this.userId = this.$route.query.userId
    if (this.userId) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/appuser/detail/' + this.userId,
        method: 'GET',
      })
        .then(res => {
          // 拼接收货地址
          if(res.data.addresses.length == 0) {
            res.data.addressesName = ''
          }else{
            let index = res.data.addresses.length - 1
            let item = res.data.addresses[index]
            res.data.addressesName = item.provinceName + item.cityName + item.areaName + item.address
          }
          this.detailRoot = res.data
          this.detail = res.data.tbAppUserDetail
        }).catch(e => {
        console.log(e)
      })
    },
  },
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
</style>
