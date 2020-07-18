<template>
  <div class="chat">
    <div class="chat-title clearfix" v-drag>
      <div class="chat-host-name"><i class="el-icon-service"></i> 客服A</div>
      <div class="chat-close" @click="closeChat" v-stopdrag><i class="el-icon-close"></i></div>
    </div>
    <div class="chat-body clearfix">
      <div class="side-nav">
        <dl class="chat-list chat-list-active">
          <dt>对话中</dt>
          <dd v-for="item in chatCurrentList" :key="item.avatarUrl">
            <div class="l">
              <el-avatar shape="square" :size="38" :src='item.avatarUrl'></el-avatar>
            </div>
            <div class="r">
              <h6>
                <b>{{item.name}}</b>
                <span>{{item.time}}</span>
              </h6>
              <p>
                <template v-if="item.status == 1">[在线]</template>
                <template v-else-if="item.status == 0">[离线]</template>
                {{item.lastWold}}
              </p>
            </div>
          </dd>
        </dl>
        <dl class="chat-list chat-list-history">
          <dt>最近聊天</dt>
          <dd v-for="item in chatHistoryList" :key="item.avatarUrl">
            <div class="l">
              <el-avatar shape="square" :size="38" :src='item.avatarUrl'></el-avatar>
            </div>
            <div class="r">
              <h6>
                <b>{{item.name}}</b>
                <span>{{item.time}}</span>
              </h6>
              <p>
                <template v-if="item.status == 1">[在线]</template>
                <template v-else-if="item.status == 0">[离线]</template>
                {{item.lastWold}}
              </p>
            </div>
          </dd>
        </dl>
      </div>
      <div class="chat-main">
        <div class="chat-header">
          <span>小明</span>
        </div>
        <div class="chat-ct" ref="chatct">
          <ul>
            <li v-for="item in msgList" :class="item.type == 1? 'chat-li-costumer chat-li' : 'chat-li-user chat-li'">
              <div class="li-time"><span>{{item.time}}</span></div>
              <div class="li-ct clearfix">
                <el-avatar shape="square" :size="38" :src='item.avatarUrl'></el-avatar>
                <pre v-html="item.msg"></pre>
              </div>
            </li>
          </ul>
        </div>
        <div class="chat-enter">
          <pre contenteditable="true" ref="msgPre" @keydown.enter.exact="sendMsg($event)"></pre>
          <el-popover
            placement="top"
            trigger="manual"
            content="不能发送空消息"
            v-model="sendMsgTipVisible">
            <el-button slot="reference" class="send-msg" type="primary" size="small" @click="sendMsg">发送</el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'chat',
    data() {
      return {
        webSocket: null,
        webSocketUrl: '',
        chatCurrentList: [
          {
            name: '用户名字',
            avatarUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            status: 1,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
          {
            name: '用户名字用户名字用户名字用户名字用户名字用户名字',
            avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            status: 0,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
        ],
        chatHistoryList: [
          {
            name: '用户名字',
            avatarUrl: '8',
            status: 0,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
          {
            name: '用户名字用户名字用户名字用户名字用户名字用户名字',
            avatarUrl: '7',
            status: 1,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
          {
            name: '用户名字用户名字用户名字用户名字用户名字用户名字',
            avatarUrl: '6',
            status: 0,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
          {
            name: '用户名字',
            avatarUrl: '5',
            status: 0,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
          {
            name: '用户名字用户名字用户名字用户名字用户名字用户名字',
            avatarUrl: '4',
            status: 1,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
          {
            name: '用户名字',
            avatarUrl: '3',
            status: 0,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
          {
            name: '用户名字用户名字用户名字用户名字用户名字用户名字',
            avatarUrl: '2',
            status: 1,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
          {
            name: '用户名字用户名字用户名字用户名字用户名字用户名字',
            avatarUrl: '1',
            status: 0,
            time: '2020/7/16',
            lastWold: '拜拜'
          },
        ],
        msgList: [
          {
            type: 1,
            time: '2019/12/12',
            name: '小明',
            avatarUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            msg: '歪，在家吗',
          },
          {
            type: 2,
            time: '2019/12/12',
            name: '小明',
            avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            msg: '法国恢复的规划法规和顾客家航空法国恢复的规划法规和顾客家航空法国恢复的规划法规和顾客家航空',
          },
          {
            type: 1,
            time: '2019/12/12',
            name: '小明',
            avatarUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            msg: '国恢复的规划法规',
          },
          {
            type: 2,
            time: '2019/12/12',
            name: '小明',
            avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            msg: '233333333',
          },
        ],
        msg: '',
        sendMsgTipVisible: false // 发送空信息提示
      }
    },
    created() {
      // this.webSocketInit()
    },
    mounted() {
      this.$refs.chatct.scrollTop = this.$refs.chatct.scrollHeight; // 对话滚动到最下边
    },
    updated() {
      this.$refs.chatct.scrollTop = this.$refs.chatct.scrollHeight; // 对话滚动到最下边
    },
    methods: {
      webSocketInit: function () {
        this.webSocket = new WebSocket(this.WebSocketUrl)
        this.webSocket.onopen = this.onopen
        this.webSocket.onmessage = this.onmessage
        this.webSocket.onerror = this.onerror
        this.webSocket.onclose = this.onclose
      },
      onopen: function () {
        console.log('onopen')
      },
      onmessage: function (res) {
        console.log(res)
      },
      onerror: function () {
        console.log('onopen')
      },
      onclose: function () {
        console.log('onclose')
      },
      send: function () {
        this.webSocket.send(params)
      },
      close: function () {
        this.webSocket.close()
      },
      sendMsg(event) {
        event.preventDefault(); // 阻止换行

        let _this = this
        this.msg = this.$refs.msgPre.innerHTML
        this.$refs.msgPre.innerHTML = ''
        // 判断是否为空
        if(this.msg.replace(/\s/g,'').length < 1){
          this.sendMsgTipVisible = true
          setTimeout(function () {
            _this.sendMsgTipVisible = false
          },2000)
          return false
        }
        // 发送信息
        this.msg = this.msg.replace(/\r?\n/g,'<br>') // 回车转换成<br>
        this.msg = this.msg.replace(/ /g,'&nbsp;') // 空格转换成&nbsp;
        let nowTime = this.getTime()
        this.msgList.push({
          type: 2,
          time: nowTime,
          name: '小明',
          avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          msg: this.msg,
        })
      },
      getTime() {
        let nowTime = new Date();
        let year = nowTime.getFullYear();
        let month = nowTime.getMonth() + 1;
        let day = nowTime.getDate();
        let hour = nowTime.getHours();
        let minute = nowTime.getMinutes();
        let second = nowTime.getSeconds();
        function checkTime(i) {
          if (i < 10) {
            i = "0" + i;
          }
          return i;
        }
        minute = checkTime(minute);
        second = checkTime(second);
        return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second
      },
      closeChat(){
        this.$emit('closeChat')
      },
    },
    directives: {
      drag: function(el) {
        el.onmousedown = e => {
          let dragBox = document.querySelector(".chat")
          // 点击处和div左上角的位差
          let disX = e.clientX - dragBox.offsetLeft;
          let disY = e.clientY - dragBox.offsetTop;
          document.onmousemove = e => {
            // 鼠标移动时计算出div左上角的坐标值
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            // 防止拖出可视区域
            if (left < 0) {
              left = 0;
            } else if (left > document.documentElement.clientWidth - dragBox.offsetWidth + 600) {
              left = document.documentElement.clientWidth - dragBox.offsetWidth + 600;
            }
            if (top < 0) {
              top = 0;
            } else if (top > document.documentElement.clientHeight - dragBox.offsetHeight + 500) {
              top = document.documentElement.clientHeight - dragBox.offsetHeight + 500;
            }
            dragBox.style.right = "auto";
            dragBox.style.bottom = "auto";
            dragBox.style.left = left + "px";
            dragBox.style.top = top + "px";
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
          };
          document.onmouseup = e => {
            // 鼠标弹起来的时候不再移动
            document.onmousemove = null;
            // 退出onmouseup时间循环
            document.onmouseup = null;
          };
        };
      },
      stopdrag: function(el) {
        el.onmousedown = function(e) {
          e.stopPropagation()
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .chat{
    position: fixed
    right: 100px
    bottom: 100px
    z-index 1000
    width: 700px
    background-color: #fff
    box-shadow 0 0 8px rgba(0,0,0,.2)
  }
  .chat-title{
    color: #fff
    background-color: #414345
    .chat-host-name{
      display: inline-block
      box-sizing border-box
      float: left
      padding-top: 10px
      padding-left: 10px
      user-select none
      cursor: default
      i{
        font-size 16px
        vertical-align: text-bottom;
      }
    }
    .chat-close{
      box-sizing border-box
      float: right
      width: 40px
      height: 40px
      text-align: center
      cursor: pointer
      i{
        margin-top: 11px
        font-size 18px
      }
      &:hover i{
        color: #fff
      }
    }
  }
  .chat-body{
    height: 500px
  }
  .side-nav{
    float: left
    overflow-y auto
    width: 270px
    height: 100%
    background-color: #eee
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,.15)
    }
    &::-webkit-scrollbar-track {
      background-color: transparent
    }
    .chat-list{
      dt{
        padding: 5px 10px
        border-left: 5px solid #ccc
      }
      dd{
        overflow: hidden
        display: flex
        padding: 10px
        line-height: 1.2
        cursor: pointer
        &:hover{
          background-color: #e1e1e1
        }
        .l{
          margin-right: 10px
          width: 38px
          height: 38px
        }
        .r{
          flex: 1
          width: 0
          h6{
            display: flex
            padding-bottom: 5px
            b{
              flex: 1;
              width: 0
              line1()
            }
            span{
              overflow: hidden
              text-align: right
              width: 80px
              color: #666
            }
          }
          p{
            line1()
            color: #666
          }
        }
      }
    }
  }
  .chat-main{
    float: right;
    width: 430px;
    height: 100%;
    .chat-header{
      box-sizing border-box
      padding: 10px
      height: 40px
      border-bottom: 1px solid #e1e1e1
      background-color: #f7f7f7
    }
    .chat-ct{
      overflow-y auto
      box-sizing border-box
      height: 310px
      border-bottom: 1px solid #e1e1e1
      background-color: #f7f7f7
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,.15)
      }
      &::-webkit-scrollbar-track {
        background-color: transparent
      }
    }
    .chat-enter{
      height: 150px
      background-color: #fff
      pre{
        box-sizing border-box
        padding: 10px
        height: 100%
        overflow-x hidden
        overflow-y: auto;
        outline none
        &::-webkit-scrollbar {
          width: 8px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,.15)
        }
        &::-webkit-scrollbar-track {
          background-color: transparent
        }
      }
      .send-msg{
        position: absolute
        right: 20px
        bottom: 10px
      }
    }
  }
  .chat-ct{
    padding: 10px
    .chat-li{
      margin-top: 10px
      margin-bottom: 10px
      .li-time{
        margin-bottom: 10px
        text-align: center
        span{
          display: inline-block
          padding: 0 5px
          color: #fff
          background-color: rgba(0,0,0,.2)
          border-radius: 3px;
        }
      }
      .li-ct{
        pre{
          display: inline-block
          padding: 5px 7px
          max-width: 60%
          border-radius: 3px;
          white-space: normal;
        }
      }
    }
    .chat-li-costumer{
      .li-ct{
        pre{
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
        .el-avatar{
          float: left
        }
      }
    }
    .chat-li-user{
      .li-ct{
        pre{
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
        .el-avatar{
          float: right
        }
      }
    }
  }
</style>