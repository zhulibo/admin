<template>
  <div>
    <div class="classify">
      <div class="classify-ct">
        <div class="top-bar">
          <dl class="classify-level-one-list">
            <dt class="classify-level-one-add" @click="addClassifyLevelOne">+一级分类</dt>
            <dd v-for="(item, index) in classifyLevelOneList" :class="{on:item.active}" :data-index="index" @click="clickClassifyLevelOneList($event)">{{item.name}}</dd>
          </dl>
        </div>
        <div class="classify-main">
          <dl class="classify-level-two-list">
            <dt class="classify-level-two-add" @click="addClassifyLevelTwo">+二级模块</dt>
            <dd class="classify-level-two" v-for="(item, index) in classifyLevelTwoList">
              {{item.name}}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'classify',
  data() {
    return {
      classifyLevelOneList: [], // 一级分类
      classifyLevelOneId: null, // 一级分类选中状态的id
      classifyLevelTwoList: [],
      classifyLevelTwoId: null,
    }
  },
  created() {
    this.getClassifyAllList()
  },
  mounted() {
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    getClassifyAllList() {
      this.$http({
        url: '/goodsmanage/backadmin/indexclassify/indexclassify',
        method: 'GET',
        params: {
          level: 2,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyLevelOneList = res.data.list
          this.$set(this.classifyLevelOneList[0], 'active', true)
          this.classifyLevelOneId = this.classifyLevelOneList[0].id
          this.classifyLevelTwoList = this.classifyLevelOneList[0].children
        }).catch(e => {console.log(e)})
    },
    clickClassifyLevelOneList(event) {
      for (let i = 0; i < this.classifyLevelOneList.length; i++) {
        this.$set(this.classifyLevelOneList[i], 'active', false)
      }
      let index = event.currentTarget.getAttribute("data-index")
      let active = this.classifyLevelOneList[index].active
      this.$set(this.classifyLevelOneList[index], 'active', !active)
      this.classifyLevelOneId = this.classifyLevelOneList[index].id
      this.classifyLevelTwoList = this.classifyLevelOneList[index].children
    },
    addClassifyLevelOne() {
      this.$router.push({path: '/classifyIndexEdit', query: {level: 1}})
    },
    addClassifyLevelTwo() {
      this.$router.push({path: '/classifyIndexEdit', query: {level: 2, parentId: this.classifyLevelOneId}})
    },
    editClassifyLevelOne() {
      this.$router.push({path: '/classifyIndexEdit', query: {level: 1, id: this.classifyLevelOneId}})
    },
    editClassifyLevelTwo() {
      this.$router.push({path: '/classifyIndexEdit', query: {level: 2, id: this.classifyLevelOneId}})
    },
  }
}
</script>

<style lang="stylus" scoped>
.classify{
  padding: 20px
  background-color: #fff
  .classify-ct{
    padding: 20px
    font-size 16px
  }
}
.top-bar{
  .classify-level-one-add{
    display: inline-block
    margin-right: 10px
    padding: 0 5px
    border: 1px solid blue
    border-radius: 5px;
    color: blue
  }
  dd{
    display: inline-block
    padding: 15px
    cursor: pointer
    &.on{
      font-weight: bold
      background-color: #f5f5f5
    }
  }
}
.classify-main{
  min-height 600px
  padding: 20px
  background-color: #f5f5f5
  .classify-level-two{
    display: inline-block
    margin-right: 10px
    padding: 0 5px
    border: 1px solid #ddd
    border-radius: 5px;
  }
  .classify-level-two-add{
    display: inline-block
    margin-right: 10px
    padding: 0 5px
    border: 1px solid blue
    border-radius: 5px;
    color: blue
  }
}
.on{
  color: blue
}
</style>