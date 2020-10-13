<template>
  <div class="chat" v-drag>
    <div class="chat-title clearfix">
      <div class="chat-host-name"><i class="el-icon-service"></i> 客服:{{userId}}</div>
      <div class="chat-close" @click="closeChat" v-stopDrag><i class="el-icon-close"></i></div>
    </div>
    <div class="chat-body clearfix" v-stopDrag>
      <div class="side-nav">
        <dl class="chat-list">
          <dd v-for="item in msgList" :key="item.customerId" @click="changeChatUser(item.customerId)" :class="item.customerId == customerId ? 'selected' : ''">
            <div class="l">
              <el-avatar shape="square" :size="38" src='http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/timg2595.jpg'></el-avatar>
            </div>
            <div class="r">
              <h6>
                <b>{{ item.customerId }}</b>
                <span>{{item.msg[item.msg.length -1].time | timestampToDate}}</span>
              </h6>
              <p>{{item.msg[item.msg.length -1].data}}</p>
            </div>
          </dd>
        </dl>
      </div>
      <div class="chat-main">
        <div class="chat-header">
          <span>客户:{{customerId}}</span>
        </div>
        <div class="chat-ct" ref="chatct">
          <p class="load-more" v-if="customerId" @click="fetchHistoryMsg"><span>加载更多</span></p>
          <ul>
            <li v-for="item in activeMsgList" :class="item.to == userId? 'chat-li-costumer chat-li' : 'chat-li-user chat-li'">
              <div class="li-time"><span>{{ item.time | timestampToDate }}</span></div>
              <div class="li-ct clearfix">
                <el-avatar shape="square" :size="38" src='http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/timg2595.jpg'></el-avatar>
                <pre v-html="item.data"></pre>
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
      userId: 182036639611,
      customerId: null, // 当前聊天顾客
      msgList: [], // 消息二维数组
      activeMsgList: [], // 当前聊天消息列表
      msg: '',
      sendMsgTipVisible: false, // 发送空信息提示
    }
  },
  created() {
    if(localStorage.getItem('msgList')){
      this.msgList = JSON.parse(localStorage.getItem('msgList'))
    }
    if(this.msgList.length>0) this.customerId = this.msgList[0].customerId
    this.logIn()
  },
  mounted() {
    WebIM.conn.listen({
      onTextMessage: (e) => {
        console.log('收到文本消息2', e)
        for (let i = 0; i < this.msgList.length; i++) {
          if(e.from == this.msgList[i].customerId) { // 消息列表已存在用户新消息
            this.msgList[i].status = 1 // 消息状态
            this.msgList[i].msg.push(e) // 添加消息
            // 移到最前
            let latelyItem = this.msgList.splice(i, 1)
            this.msgList.unshift(latelyItem[0])
            if(this.customerId == e.from) {
              this.$nextTick(() => {
                this.$refs.chatct.scrollTop = this.$refs.chatct.scrollHeight // 对话滚动到最下边
              })
            }
            return
          }
        }
        this.msgList.unshift({ // 新用户新消息
          customerId: e.from,
          status: 1,
          msg: [e],
        })
      },
    })
  },
  methods: {
    logIn() {
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
          for (let i = 0; i < this.msgList.length; i++) {
            if(this.msgList[i].customerId == this.customerId) {
              this.msgList[i].msg.push({
                from: this.userId,
                to: this.customerId,
                data: this.msg,
                id: serverMsgId,
                time: new Date().getTime(),
              }) // 添加消息
              this.$nextTick(() => {
                this.$refs.chatct.scrollTop = this.$refs.chatct.scrollHeight // 对话滚动到最下边
              })
              this.msg = ''
              return
            }
          }
        },
        fail: (e) => {
          console.log("Send private text error", e)
        }
      })
      WebIM.conn.send(msg.body)
    },
    changeChatUser(customerId) {
      if (customerId == this.userId) return
      this.customerId = customerId
    },
    fetchHistoryMsg() {
      let options = {
        queue: this.customerId,
        isGroup: false,
        count: 3,
        success: (e) => {
          console.log('拉取历史消息成功', e)
          for (let i = 0; i < this.msgList.length; i++) {
            if(this.msgList[i].customerId == this.customerId) { // 消息列表已存在用户新消息
              console.log(i)
              this.msgList[i].msg = e.concat(this.msgList[i].msg) // 保存信息
              this.activeMsgList = this.msgList[i].msg // 复制到聊天窗口
              return
            }
          }
        },
        fail: (e) => {console.log('拉取历史消息失败', e)},
      }
      WebIM.conn.fetchHistoryMessages(options)
    },
    trimMsg(event) {
      event.preventDefault() // 阻止换行

      this.msg = this.$refs.msgPre.innerHTML
      this.$refs.msgPre.innerHTML = ''

      // 判断是否为空
      if (this.msg.replace(/\s/g, '').length < 1) {
        this.sendMsgTipVisible = true
        setTimeout(() => {
          this.sendMsgTipVisible = false
        }, 2000)
        return false
      }

      // 发送信息
      this.msg = this.msg.replace(/\r?\n/g, '<br>') // 回车转换成<br>
      this.msg = this.msg.replace(/ /g, '&nbsp;') // 空格转换成&nbsp

      this.sendMsg()
    },
    closeChat() {
      this.$emit('closeChat')
    },
  },
  watch: {
    customerId: {
      handler: function (customerId){
        for (let i = 0; i < this.msgList.length; i++) {
          if(customerId == this.msgList[i].customerId) {
            this.activeMsgList = this.msgList[i].msg
            this.$nextTick(() => {
              this.$refs.chatct.scrollTop = this.$refs.chatct.scrollHeight // 对话滚动到最下边
            })
            return
          }
        }
      },
    },
    msgList: {
      handler: function (val){
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
  right: 100px
  bottom: 100px
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
      &:hover,&.selected {
        background-color: #e1e1e1
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