import websdk from "easemob-websdk"
import config from "@/utils/WebIM/config"

let WebIM = {}
WebIM = websdk
WebIM.config = config

WebIM.conn = new WebIM.connection({
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

WebIM.conn.listen({
  onOpened: (e) => {console.log('连接成功回调', e)},
  onClosed: (e) => {console.log('连接关闭回调', e)},
  // onTextMessage: (e) => {console.log('收到文本消息', e)},
  onError: (e) => {console.log('失败回调', e)},
  onReceivedMessage: (e) => {console.log('收到消息送达服务器回执', e)},
  onDeliveredMessage: (e) => {console.log('收到消息送达客户端回执', e)},
  onReadMessage: (e) => {console.log('收到消息已读回执', e)},
})

export default WebIM