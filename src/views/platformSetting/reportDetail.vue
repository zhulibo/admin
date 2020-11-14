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
              <span>投诉时间</span>
            </div>
            <div class="r">
              <span>{{ detail.createTime | timestampToDate }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>投诉人昵称</span>
            </div>
            <div class="r">
              <span v-if="detail.detail">{{ detail.detail.nickName | noneToLine}}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>投诉人漫想家id</span>
            </div>
            <div class="r">
              <span v-if="detail.detail">{{ detail.detail.homesickId | noneToLine}}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>举报原因</span>
            </div>
            <div class="r">
              <span v-if="detail.complainCategory">{{ detail.complainCategory.name }}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>被举报内容类型</span>
            </div>
            <div class="r">
              <span v-if="detail.type == 1">动态</span>
              <span v-else-if="detail.type == 2">评论</span>
              <span v-else-if="detail.type == 3">用户</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>处理状态</span>
            </div>
            <div class="r">
              <span v-if="detail.status == 0" style="color:#e00;">未处理</span>
              <span v-else-if="detail.status == 1" style="color:#0e0;">已处理</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="report-info">
        <div class="title"><h3>被举报内容</h3></div>
        <ul v-if="detail.type == 1">
          <li>
            <div class="l">
              <span>标题</span>
            </div>
            <div class="r">
              <span>{{ detail.tbArticle.title | noneToLine}}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>内容</span>
            </div>
            <div class="r">
              <span>{{ detail.tbArticle.content | noneToLine}}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>图片/视频</span>
            </div>
            <div class="r">
              <div v-for="item in detail.tbArticle.images" class="img-li">
                <img v-if="item.type == 1" :src="item.url" alt="">
                <video v-else-if="item.type == 2" :src="item.url" controls></video>
              </div>
            </div>
          </li>
        </ul>
        <ul v-if="detail.type == 3">
          <li>
            <div class="l">
              <span>昵称</span>
            </div>
            <div class="r">
              <span>{{ detail.itemdetail.nickName | noneToLine}}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>头像</span>
            </div>
            <div class="r">
              <img :src="detail.itemdetail.header" alt="" style="height: 5em;">
            </div>
          </li>
          <li>
            <div class="l">
              <span>签名</span>
            </div>
            <div class="r">
              <span>{{ detail.itemdetail.signature | noneToLine}}</span>
            </div>
          </li>
          <li>
            <div class="l">
              <span>漫想家id</span>
            </div>
            <div class="r">
              <span>{{ detail.itemdetail.homesickId | noneToLine}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="report-btn" v-if="detail.status == 0">
        <el-button type="primary" @click="del" style="min-width: 150px">屏蔽</el-button>
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
        url: '/userorg/backadmin/complain/detail/' + this.id,
        method: 'PUT',
      })
        .then(res => {
          this.detail = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    async del() {
      await this.delItem()
      this.changeStatus()
    },
    delItem() {
      let url
      if(this.detail.type == 1){
        url = '/userorg/backadmin/article'
      }else if(this.detail.type == 2){
        url = '/userorg/backadmin/articlecomment'
      }else if(this.detail.type == 3){
        url = '/userorg/backadmin/appuser'
      }

      return new Promise((resolve, reject) => {
        this.$confirm('确定屏蔽 ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$http({
            url: url,
            method: 'PUT',
            data: {
              id: this.detail.type != 3 ? this.detail.itemId : '',
              userId: this.detail.type == 3 ? this.detail.itemdetail.userId: '',
              del: 1,
            }
          })
            .then(res => {
              console.log('已删除')
              resolve()
            }).catch(e => {
            console.log(e)
          })
        }).catch(e => {
          console.log(e)
        })
      })
    },
    changeStatus(){
      this.$http({
        url: '/userorg/backadmin/complain/' + this.id,
        method: 'PUT',
      })
        .then(res => {
          this.$message.success('已屏蔽')
          this.$router.push({path: '/reportList'})
        }).catch(e => {
        console.log(e)
      })
    }
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
.report-info{
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
.img-li{
  margin-top: 20px
  margin-right: 20px
  display: inline-block
  height: 500px
  video,img{
    height: 100%
  }
}
.report-btn{
  position: fixed
  right: 50px
  top: 150px
}
</style>
