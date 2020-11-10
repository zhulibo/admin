<template>
  <div class="chat" v-drag ref="chat">
    <div class="chat-title clearfix">
      <div class="chat-host-name"><i class="el-icon-service"></i> 客服</div>
      <div class="chat-close" @click="mini" v-stopDrag>
        <i class="el-icon-remove-outline"></i>
      </div>
    </div>
    <div class="chat-body clearfix" v-stopDrag>
      <div class="side-nav">
        <dl class="chat-list">
          <dd v-for="item in msgList" :key="item.customerId" @click="changeChatUser(item.customerId,item.nick,item.avatar)" :class="[{'selected': item.customerId == customerId},{'new-msg': item.status == 1}]">
            <div class="l">
              <el-avatar shape="square" :size="38" :src='item.avatar'></el-avatar>
            </div>
            <div class="r">
              <h6>
                <b>{{ item.nick }}</b>
                <span>{{item.msg[item.msg.length -1].time | timestampToDate}}</span>
              </h6>
              <p v-if="item.msg[item.msg.length -1].contentsType == 'TEXT'">{{item.msg[item.msg.length -1].data}}</p>
              <p v-else-if="item.msg[item.msg.length -1].contentsType == 'IMAGE'">图片</p>
            </div>
          </dd>
        </dl>
      </div>
      <div class="chat-main">
        <div class="chat-header">
          <span>客户:{{activeMsgList.nick}}</span>
        </div>
        <div class="chat-ct" ref="chatct">
          <p class="load-more" v-if="customerId" @click="fetchHistoryMsg"><span>加载更多</span></p>
          <ul>
            <li v-for="item in activeMsgList.msg" :class="item.to == userId? 'chat-li-costumer chat-li' : 'chat-li-user chat-li'">
              <div class="li-time"><span>{{ item.time | timestampToDate }}</span></div>
              <div class="li-ct clearfix">
                <el-avatar shape="square" :size="38" :src='item.to == userId ? activeMsgList.avatar : "http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/11644.png"'></el-avatar>
                <pre v-if="item.contentsType == 'TEXT'" v-html="item.data"></pre>
                <pre v-else-if="item.contentsType == 'IMAGE'">
                  <img :src="item.url" :alt="item.time">
                </pre>
              </div>
            </li>
          </ul>
        </div>
        <div class="chat-enter">
          <pre contenteditable="true" ref="msgPre" @keydown.enter.exact="trimMsg($event)"></pre>
          <el-popover
            placement="top"
            trigger="manual"
            content="不能发送空消息"
            v-model="sendMsgTipVisible">
            <el-button slot="reference" class="send-msg" type="primary" size="small" @click="trimMsg">发送</el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebIM from "@/utils/WebIM/WebIM"

export default {
  name: 'chat',
  data() {
    return {
      userId: '',
      customerId: '', // 当前聊天顾客
      msgList: [], // 消息二维数组
      activeMsgList: [], // 当前聊天消息列表
      msg: '',
      sendMsgTipVisible: false, // 发送空信息提示
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  created() {
    // 获取缓存中的聊天记录
    let msgListStorage = JSON.parse(localStorage.getItem('msgList'))
    if(msgListStorage) {
      this.msgList = msgListStorage
    }
    // 赋值客服id
    if(this.userInfo.phone == 18203663961){
      this.userId = 182036639612
    }

    this.logIn()

    WebIM.conn.listen({
      onTextMessage: (e) => { // 监听文字消息
        console.log('收到文本', e)
        let msg = { // 存放消息，过滤多余字段
          contentsType: 'TEXT',
          from: e.from,
          to: e.to,
          data: e.data,
          id: e.id,
          time: e.time,
        }
        // 保存聊天记录
        for (let i = 0; i < this.msgList.length; i++) {
          if(e.from == this.msgList[i].customerId) { // 已存在的用户的消息
            this.msgList[i].msg.push(msg)
            // 把此人移到消息列表的最前边
            let latelyItem = this.msgList.splice(i, 1)
            this.msgList.unshift(latelyItem[0])

            if(this.customerId == e.from) {// 如果此消息人是正在聊天的对象，则聊天框滚动到最下面
              this.chatWindowScrollBottom()
            }else{
              this.msgList[i].status = 1 // 不是当前聊天则添加提示
            }
            return
          }
        }
        // 新用户直接添加到聊天列表最前面
        this.msgList.unshift({ // 新用户的消息
          customerId: e.from,
          status: 1,
          msg: [msg],
          avatar: e.ext.avatar,
          nick: e.ext.nick,
        })
      },
      onPictureMessage: (e) => { // 监听图片消息
        console.log('收到图片', e)
        let msg = { // 存放消息，过滤多余字段
          contentsType: 'IMAGE',
          from: e.from,
          to: e.to,
          url: e.url,
          id: e.id,
          time: e.time,
        }
        for (let i = 0; i < this.msgList.length; i++) {
          if(e.from == this.msgList[i].customerId) { // 已存在的用户的消息
            this.msgList[i].msg.push(msg)
            // 把此人移到消息列表的最前边
            let latelyItem = this.msgList.splice(i, 1)
            this.msgList.unshift(latelyItem[0])

            if(this.customerId == e.from) {// 如果此消息人是正在聊天的对象，则聊天框滚动到最下面
              this.chatWindowScrollBottom()
            }else{
              this.msgList[i].status = 1 // 不是当前聊天则添加提示
            }
            return
          }
        }
        // 新用户直接添加到聊天列表最前面
        this.msgList.unshift({ // 新用户的消息
          customerId: e.from,
          status: 1,
          msg: [msg],
          avatar: e.ext.avatar,
          nick: e.ext.nick,
        })
      },
    })
  },
  mounted() {
  },
  methods: {
    logIn() { // 环信客服登录
      let options = {
        apiUrl: WebIM.config.apiURL,
        user: this.userId,
        pwd: 'Cf022044',
        appKey: WebIM.config.appkey,
        success: (e) => {console.log('登陆成功');console.log(e)},
        error: (e) => {console.log('登陆失败');console.log(e)},
      }
      WebIM.conn.open(options)
    },
    sendMsg() { // 单聊发送文本消息
      let id = WebIM.conn.getUniqueId() // 生成本地消息id
      let msg = new WebIM.message('txt', id) // 创建文本消息
      msg.set({
        msg: this.msg, // 消息内容
        to: this.customerId, // 接收消息对象（用户id）
        chatType: 'singleChat', // 设置为单聊
        success: (id, serverMsgId) => {
          console.log('send private text Success')
          // 添加此条信息到到聊天窗口
          for (let i = 0; i < this.msgList.length; i++) {
            if(this.msgList[i].customerId == this.customerId) {
              this.msgList[i].msg.push({
                contentsType: 'TEXT',
                from: this.userId,
                to: this.customerId,
                data: this.msg,
                id: serverMsgId,
                time: new Date().getTime(),
              })
              this.$nextTick(() => {
                this.chatWindowScrollBottom()
              })
              // 把此人移到消息列表的最前边
              let latelyItem = this.msgList.splice(i, 1)
              this.msgList.unshift(latelyItem[0])
              this.$refs.msgPre.innerHTML = '' // 输入框清空
              this.msg = '' // 清空消息字段
              return
            }
          }
        },
        fail: (e) => {
          console.log("Send private text error", e)
          this.$message.warning('消息发送失败，请重新发送')
        }
      })
      WebIM.conn.send(msg.body)
    },
    changeChatUser(customerId, nick, avatar) { // 切换联系人
      if (customerId == this.customerId || customerId == this.userId) return
      this.customerId = customerId
    },
    fetchHistoryMsg() { // 获取历史消息
      let options = {
        queue: this.customerId,
        isGroup: false,
        count: 50,
        success: (e) => {
          console.log('拉取历史消息成功', JSON.parse(JSON.stringify(e)))
          if(e.length == 0) {
            this.$message.info('无更多历史消息')
            return
          }
          if(e.length < options.count) {
            this.$message.info('已获取全部历史消息')
          }
          if (this.activeMsgList.msg.length == 0) { // 当前窗口无聊天记录
            this.activeMsgList.msg = e
            return
          }
          if(e[0].time>=this.activeMsgList.msg[0].time){ // 历史聊天记录时间 >= 聊天窗口消息时间，循环拉取
            this.fetchHistoryMsg()
            return
          }
          for (let i = 0; i < e.length; i++) { // 找到id对应处，拼接聊天记录
            if (e[i].id == this.activeMsgList.msg[0].id){
              e.splice(i, e.length -i)
              this.activeMsgList.msg = e.concat(this.activeMsgList.msg)
              return
            }
          }
          this.activeMsgList.msg = e.concat(this.activeMsgList.msg) // id无对应，直接合并聊天记录
        },
        fail: (e) => {console.log('拉取历史消息失败', e)},
      }
      WebIM.conn.fetchHistoryMessages(options)
    },
    trimMsg(event) { // 消息发送前预处理
      event.preventDefault() // 阻止换行
      this.msg = this.$refs.msgPre.innerHTML
      // 判断是否为空
      if (this.msg.replace(/\s/g, '').length < 1) {
        this.sendMsgTipVisible = true
        setTimeout(() => {
          this.sendMsgTipVisible = false
        }, 2000)
        return false
      }
      this.msg = this.msg.replace(/\r?\n/g, '<br>') // 回车转换成<br>
      this.msg = this.msg.replace(/ /g, '&nbsp;') // 空格转换成&nbsp
      this.sendMsg() // 发送消息
    },
    chatWindowScrollBottom() { // 对话框滚动到最下边
      this.$nextTick(() => {
        let img = document.querySelectorAll('.chat-ct li pre img')
        if(img.length == 0) {
          this.$refs.chatct.scrollTop = this.$refs.chatct.scrollHeight
        }else {
          this.$refs.chatct.scrollTop = this.$refs.chatct.scrollHeight
          img[img.length-1].onload = () => { // 图片加载完再执行
            this.$refs.chatct.scrollTop = this.$refs.chatct.scrollHeight
          }
        }
      })
    },
    mini() {
      this.$refs.chat.style.left = document.body.clientWidth - 100 + 'px'
      this.$refs.chat.style.top = document.body.clientHeight - 40 + 'px'
    },
  },
  watch: {
    customerId: { // 联系人切换
      handler: function (customerId){
        for (let i = 0; i < this.msgList.length; i++) {
          if(customerId == this.msgList[i].customerId) {
            this.activeMsgList = this.msgList[i]
            this.chatWindowScrollBottom()
            this.msgList[i].status = 0 // 消息置为已读
            return
          }
        }
      },
    },
    msgList: { // 实时保存消息到localStorage
      handler: function (val){
        // 联系人最多保存100个
        let msgListLength = this.msgList.length
        if(msgListLength > 100){
          this.msgList.splice(100, msgListLength + 1 - 100)
        }
        // 单个联系人最多保留100条信息
        for (let i = 0; i < this.msgList.length; i++) {
          let length = this.msgList[i].msg.length
          if(length > 100){
            this.msgList[i].msg.splice(0, length - 100)
          }
        }
        localStorage.setItem('msgList',JSON.stringify(val))
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.chat {
  position: fixed
  right: 50px
  bottom: -530px
  z-index 1000
  width: 800px
  background-color: #fff
  box-shadow 0 0 8px rgba(0, 0, 0, .2)
}
.chat-title {
  color: #fff
  background-color: #414345
  cursor: move
  .chat-host-name {
    display: inline-block
    box-sizing border-box
    float: left
    padding-top: 10px
    padding-left: 10px
    user-select none
    cursor: move
    i {
      font-size 16px
      vertical-align: text-bottom;
    }
  }
  .chat-close {
    box-sizing border-box
    float: right
    width: 40px
    height: 40px
    text-align: center
    cursor: pointer
    i {
      margin-top: 11px
      font-size 18px
    }
    &:hover i {
      color: #fff
    }
  }
}
.chat-body {
  height: 600px
}
.side-nav {
  float: left
  overflow-y auto
  width: 280px
  height: 100%
  background-color: #eee
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .15)
  }
  &::-webkit-scrollbar-track {
    background-color: transparent
  }
  .chat-list {
    dt {
      padding: 5px 10px
      border-left: 5px solid #ccc
    }
    dd {
      overflow: hidden
      display: flex
      padding: 10px
      line-height: 1.2
      cursor: pointer
      &.selected {
        background-color: #ddd
      }
      &:hover {
        background-color: #e5e5e5
      }
      &.new-msg{
        background-color: #98e165
      }
      .l {
        margin-right: 10px
        width: 38px
        height: 38px
      }
      .r {
        flex: 1
        width: 0
        h6 {
          display: flex
          padding-bottom: 5px
          line-height: 1.2em
          b {
            flex: 1;
            width: 0
            line1()
          }
          span {
            overflow: hidden
            text-align: right
            width: 100px
            font-size 12px
            color: #666
          }
        }
        p {
          line1()
          color: #666
        }
      }
    }
  }
}
.chat-main {
  float: right;
  width: 520px;
  height: 100%;
  .chat-header {
    box-sizing border-box
    padding: 10px
    height: 40px
    border-bottom: 1px solid #e1e1e1
    background-color: #f7f7f7
  }
  .chat-ct {
    overflow-y auto
    box-sizing border-box
    height: 400px
    border-bottom: 1px solid #e1e1e1
    background-color: #f7f7f7
    .load-more{
      text-align: center
      span{
        cursor: pointer
        display: inline-block
        padding: 10px 20px
      }
    }
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, .15)
    }
    &::-webkit-scrollbar-track {
      background-color: transparent
    }
  }
  .chat-enter {
    height: 160px
    background-color: #fff
    pre {
      box-sizing border-box
      padding: 10px
      height: 100%
      overflow-x hidden
      overflow-y: auto;
      outline none
      white-space: normal;
      word-break: break-all;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, .15)
      }
      &::-webkit-scrollbar-track {
        background-color: transparent
      }
    }
    .send-msg {
      position: absolute
      right: 20px
      bottom: 10px
    }
  }
}
.chat-ct {
  padding: 10px
  .chat-li {
    margin-top: 15px
    margin-bottom: 15px
    .li-time {
      font-size 12px
      color: #999
      margin-bottom: 5px
      text-align: center
    }
    .li-ct {
      pre {
        display: inline-block
        padding: 5px 7px
        max-width: 60%
        border-radius: 3px;
        white-space: normal;
        word-break: break-all;
      }
    }
  }
  .chat-li-costumer {
    .li-ct {
      pre {
        position: relative
        float: left
        margin-left: 10px
        background-color: #fff
        &::before {
          content ''
          position: absolute
          top: 8px
          left: -6px;
          width: 0
          height: 0
          border-top: 6px solid transparent
          border-bottom: 6px solid transparent
          border-right: 6px solid #fff
        }
      }
      .el-avatar {
        float: left
      }
    }
  }
  .chat-li-user {
    .li-ct {
      pre {
        position: relative
        float: right
        margin-right: 10px
        color: #000
        background-color: #98e165
        &::after {
          content ''
          position: absolute
          top: 6px
          right: -6px;
          width: 0
          height: 0
          border-top: 6px solid transparent
          border-bottom: 6px solid transparent
          border-left: 6px solid #98e165
        }
      }
      .el-avatar {
        float: right
      }
    }
  }
}
</style>