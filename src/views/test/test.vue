<template>
  <div class="chatCt">
    <!--    <chat></chat>-->
  </div>
</template>

<script>
import WebIM from "easemob-websdk"
const chat = () => import(/* webpackChunkName: "chat" */ '@/components/chat/chat')

export default {
  name: 'chatCt',
  components: {
    chat,
  },
  data() {
    return {}
  },
  created() {

    let conn = {}
    WebIM.config = {
      socketServer: '//im-api-v2.easemob.com/ws',    // socket Server地址
      restServer: '//a1.easemob.com',               // rest Server地址
      appkey: '1103200103107349#cartoonthiner',        // App key
      https: false,                            // 是否使用https
      isHttpDNS: true,                          // 3.0 SDK支持，防止DNS劫持从服务端获取XMPPUrl、restUrl
      isMultiLoginSessions: false,              // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能
      isDebug: false,                           // 打开调试，会自动打印log，在控制台的console中查看log
      autoReconnectNumMax: 2,                   // 断线重连最大次数
      heartBeatWait: 30000,                     // 心跳间隔（只在小程序中使用）
      delivery: false,                           // 是否发送已读回执
      useOwnUploadFun: false         // 是否使用自己的上传方式（如将图片文件等上传到自己的服务器，构建消息时只传url）
    }

    conn = WebIM.conn = new WebIM.connection({
      appKey: WebIM.config.appkey,
      isHttpDNS: WebIM.config.isHttpDNS,
      isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
      https: WebIM.config.https,
      url: WebIM.config.socketServer,
      apiUrl: WebIM.config.restServer,
      isAutoLogin: WebIM.config.isAutoLogin,
      heartBeatWait: WebIM.config.heartBeatWait,
      autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
      autoReconnectInterval: WebIM.config.autoReconnectInterval,
      delivery: WebIM.config.delivery,
      useOwnUploadFun: WebIM.config.useOwnUploadFun
    })

    conn.listen({
      onOpened: function ( message ) {console.log(1)},         //连接成功回调
      onClosed: function ( message ) {console.log(2)},         //连接关闭回调
      onTextMessage: function ( message ) {console.log(3,message)},    //收到文本消息
      onInviteMessage: function ( message ) {console.log(4)},  //处理群组邀请
      onOnline: function () {console.log(5)},                  //本机网络连接成功
      onOffline: function () {console.log(6)},                 //本机网络掉线
      onError: function ( message ) {console.log(7)},          //失败回调
      onReceivedMessage: function(message){console.log(8)},    //收到消息送达服务器回执
      onDeliveredMessage: function(message){console.log(9)},   //收到消息送达客户端回执
      onReadMessage: function(message){console.log(10)},        //收到消息已读回执
    })

    // 登录
    let options = {
      apiUrl: WebIM.config.apiURL,
      user: '182036639612',
      pwd: 'Cf022044',
      appKey: WebIM.config.appkey,
      success: function () {console.log(13)},
      error: function () {console.log(14)},
    }
    conn.open(options)

  },
  mounted() {
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
</style>