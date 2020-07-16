<template>
  <div class="chat">
    <div class="chat-title clearfix">
      <div class="chat-host-name"><i class="el-icon-service"></i> 客服A</div>
      <div class="chat-close" @click="closeChat"><i class="el-icon-close"></i></div>
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
        <div class="chat-list">
          <ul>
            <li v-for="item in msgList">
              {{item.msg}}<br>
              {{item.time}}
            </li>
          </ul>
        </div>
        <div class="chat-enter">
          <pre contenteditable="plaintext-only" ref="msgPre" @keyup.enter.native="sendMsg"></pre>
          <el-popover
            placement="top"
            trigger="manual"
            content="不能发送空消息"
            v-model="sendMsgTipVisible">
            <el-button slot="reference" class="send-msg" type="primary" size="small" @click="sendMsg">发送</el-button>
          </el-popover>
          <el-button class="send-msg" type="primary" size="small" @click="sendMsg">发送</el-button>
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
        msgList: [],
        msg: '',
        sendMsgTipVisible: false
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      sendMsg() {
        let _this = this
        this.msg = this.$refs.msgPre.innerHTML
        this.$refs.msgPre.innerHTML = ''
        if(this.msg.replace(/\s/g,'').length < 1){
          this.sendMsgTipVisible = true
          setTimeout(function () {
            _this.sendMsgTipVisible = false
          },2000)
          return false
        }

        let nowTime = new Date();
        this.msgList.push({
          msg: this.msg,
          time: nowTime
        })
      },
      closeChat(){
        this.$emit('closeChat')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .chat{
    position: fixed
    top: 50%
    left: 50%
    z-index 1000
    margin-left: -300px
    margin-top: -200px
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
    .chat-list{
      box-sizing border-box
      height: 310px
      border-bottom: 1px solid #e1e1e1
      background-color: #f7f7f7
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
</style>