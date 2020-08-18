<template>
  <div>
    <div class="classify">
      <div class="classify-ct">
        <div class="side-bar">
          <dl class="classify-level-one">
            <dd v-for="(item, index) in classifyLevelOneList" :class="{on:item.active}" :data-index="index" @click="clickClassifyLevelOneList($event)">{{item.name}}</dd>
          </dl>
        </div>
        <div class="classify-main">
          <dl class="classify-module-list">
            <dt class="classify-module-add" @click="showClassifyModuleAllList">+绑定模块</dt>
            <dd class="classify-module" v-for="(item, index) in classifyModuleList">
              <dl>
                <dt class="classify-module-name">{{item.tbModel.name}}</dt>
                <dd class="classify-level-two" v-for="(item2, index2) in item.classifyLevelTwoList">{{item2.tbClassify.name}}</dd>
                <dd class="classify-level-two-add" @click="showClassifyLevelTwoAllList(item.modelId)">+绑定分类</dd>
              </dl>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="请选择模块" :visible.sync="classifyModuleDialogVisible">
        <div class="choose-list">
          <span v-for="(item, index) in classifyModuleAllList" :class="{on:item.active}" :data-id="item.id" :data-index="index" @click="chooseModule($event)">{{item.name}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addModule()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="请选择二级分类" :visible.sync="classifyLevelTwoDialogVisible">
        <div class="choose-list">
          <span v-for="(item, index) in classifyLevelTwoAllList" :class="{on:item.active}" :data-index="index" @click="chooseClassifyLevelTwo($event)">{{item.name}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addClassifyLevelTwo()">确 定</el-button>
        </span>
      </el-dialog>
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
      classifyModuleList: [], // 模块列表，包括下边的二级分类
      classifyModuleId: null,
      // classifyLevelTwoList: [],
      // classifyLevelTwoId: null,
      classifyIpList: [],
      classifyIpListId: null,
      classifyModuleDialogVisible: false, // 选择模块弹窗
      classifyModuleAllList: [],
      classifyLevelTwoDialogVisible: false, // 选择二级分类弹窗
      classifyLevelTwoAllList: [],
    }
  },
  created() {
    this.getClassifyLevelOneList()
  },
  mounted() {
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    getClassifyLevelOneList() {
      this.$http({
        url: '/goodsmanage/backadmin/classify',
        method: 'GET',
        params: {
          level: 1,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyLevelOneList = res.data.list
          this.$set(this.classifyLevelOneList[0], 'active', true)
          this.classifyLevelOneId = this.classifyLevelOneList[0].id
          this.getClassifyModuleList()
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
      this.getClassifyModuleList()
    },
    getClassifyModuleList() {
      this.$http({
        url: '/goodsmanage/backadmin/classify/classifymode',
        method: 'GET',
        params: {
          classifyId: this.classifyLevelOneId,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyModuleList = res.data.list
          for (let i = 0; i < this.classifyModuleList.length; i++) {
            this.getClassifyLevelTwoList(this.classifyModuleList[i].modelId)
          }
        }).catch(e => {console.log(e)})
    },
    getClassifyLevelTwoList(modelId) {
      this.$http({
        url: '/goodsmanage/backadmin/classify/modeclassify',
        method: 'GET',
        params: {
          modelId: modelId,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          for (let i = 0; i < this.classifyModuleList.length; i++) {
            if(this.classifyModuleList[i].modelId == modelId) {
              this.$set(this.classifyModuleList[i], 'classifyLevelTwoList', res.data.list)
            }
          }
        }).catch(e => {console.log(e)})
    },
    getClassifyIpList(classifyId) {
      this.$http({
        url: '/goodsmanage/backadmin/classify/classifyip',
        method: 'GET',
        params: {
          classifyId: classifyId,
        }
      })
        .then(res => {
          this.classifyIpList = res.data.list
        }).catch(e => {console.log(e)})
    },
    showClassifyModuleAllList() {
      this.classifyModuleDialogVisible = true
      this.$http({
        url: '/goodsmanage/backadmin/classify/model',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyModuleAllList = res.data.list
        }).catch(e => {console.log(e)})
    },
    chooseModule(event) {
      // let id = event.currentTarget.getAttribute("data-id")
      let index = event.currentTarget.getAttribute("data-index")
      let active = this.classifyModuleAllList[index].active
      this.$set(this.classifyModuleAllList[index], 'active', !active)
    },
    addModule() {
      let addModuleIds = []
      for (var i = 0; i < this.classifyModuleAllList.length; i++) {
        if (this.classifyModuleAllList[i].active == true) {
          addModuleIds.push(this.classifyModuleAllList[i].id)
        }
      }
      this.$http({
        url: '/goodsmanage/backadmin/classify/classifyandmodel',
        method: 'POST',
        data: {
          type: 1,
          classifyId: this.classifyLevelOneId,
          ids: addModuleIds,
        }
      })
        .then(res => {
          this.$message.success(res.msg)
          this.getClassifyModuleList(this.classifyLevelOneId)
          this.classifyModuleDialogVisible = false
        }).catch(e => {console.log(e)})
    },
    showClassifyLevelTwoAllList(moduleId) {
      this.classifyLevelTwoDialogVisible = true
      this.classifyModuleId = moduleId
      this.$http({
        url: '/goodsmanage/backadmin/classify',
        method: 'GET',
        params: {
          level: 2,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyLevelTwoAllList = res.data.list
        }).catch(e => {console.log(e)})
    },
    chooseClassifyLevelTwo(event) {
      let index = event.currentTarget.getAttribute("data-index")
      let active = this.classifyLevelTwoAllList[index].active
      this.$set(this.classifyLevelTwoAllList[index], 'active', !active)
    },
    addClassifyLevelTwo() {
      let addClassifyLevelTwoIds = []
      for (var i = 0; i < this.classifyLevelTwoAllList.length; i++) {
        if (this.classifyLevelTwoAllList[i].active == true) {
          addClassifyLevelTwoIds.push(this.classifyLevelTwoAllList[i].id)
        }
      }
      this.$http({
        url: '/goodsmanage/backadmin/classify/classifyandmodel',
        method: 'POST',
        data: {
          type: 2,
          modelId: this.classifyModuleId,
          ids: addClassifyLevelTwoIds,
        }
      })
        .then(res => {
          this.$message.success(res.msg)
          this.getClassifyModuleList()
          this.classifyModuleDialogVisible = false
        }).catch(e => {console.log(e)})
    },
  }
}
</script>

<style lang="stylus" scoped>
.classify{
  padding: 20px
  background-color: #fff
  .classify-ct{
    display: flex
    max-width 1000px
    min-height 600px
    padding: 20px
    font-size 16px
  }
}
.side-bar{
  width: 200px
  dd{
    padding: 15px
    cursor: pointer
    &.on{
      font-weight: bold
      background-color: #f5f5f5
    }
  }
}
.classify-main{
  flex: 1
  padding: 20px
  background-color: #f5f5f5
  .classify-module-add{
    margin-bottom: 10px
    color: blue;
  }
  .classify-module{
    padding: 10px 0
    .classify-module-name{
      margin-bottom: 10px
    }
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
}

.choose-list{
  span{
    display: inline-block
    padding: 5px 10px
    margin-right: 20px
    border: 1px solid #ccc
    border-radius: 4px;
    cursor: pointer
    &.on{
      border-color: blue
    }
  }
}
.on{
  color: blue
}
</style>