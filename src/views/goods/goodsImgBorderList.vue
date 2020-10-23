<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.nickName" placeholder="请输入昵称" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.creatTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="id" label="id" align="center">
          <template slot-scope="scope">{{ scope.row.id | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="url" label="边框图片" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="detail" @click="blindGoods(scope.row)">绑定商品</el-button>
            <el-button type="text" size="medium" class="detail" @click="goBlindGoodsList(scope.row)">已绑商品</el-button>
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
            <el-button type="text" size="medium" class="delete" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-ct clearfix">
        <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages"
                       @current-change="handleCurrentChange" background></el-pagination>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="请选择要绑定的商品" :visible.sync="goodsDialogVisible">
        <el-form :inline="true" :model="formInline2" class="table-form-inline">
          <el-form-item label="">
            <el-select v-model="formInline2.type" placeholder="请选择" @change="getList">
              <el-option label="普通商品" value="1"></el-option>
              <el-option label="预售商品" value="2"></el-option>
              <el-option label="抽奖商品" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline2.name" placeholder="请输入商品名称" @keyup.enter.native="getGoodsList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getGoodsList">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="choose-list">
          <el-table :data="goodsList" @selection-change="handleSelectionChange">
            <el-table-column prop="title" label="名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.title | noneToLine }}</template>
            </el-table-column>
            <el-table-column prop="listedImage" label="边框图片" align="center" class-name="row-img">
              <template slot-scope="scope">
                <img :src="scope.row.listedImage" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="id" label="id" align="center">
              <template slot-scope="scope">{{ scope.row.id | noneToLine }}</template>
            </el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
          </el-table>
          <div class="pagination-ct clearfix">
            <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage2"
                           :page-count="totalPages2"
                           @current-change="handleCurrentChange2" background></el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addGoods()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {
      formInline: {
        homesickId: '',
        nickName: '',
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
      formInline2: {
        type: '',
        name: '',
      },
      imgBorderId: '',
      goodsDialogVisible: false,
      goodsList: [],
      pageSize2: 6,
      currentPage2: 1,
      totalPages2: null,
      multipleSelection: [],
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/frame',
        method: 'GET',
        params: {
          nickName: this.formInline.nickName,
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.tableList = res.data.list
          this.totalPages = res.data.pages
          this.currentPage = res.data.pageNum
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getList()
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/frame',
          method: 'PUT',
          data: {
            id: scope.id,
            url: scope.url,
            del: 1,
          }
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.id)
            this.getList()
          }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    editItem(scope) {
      this.$router.push({path: '/goodsImgBorderEdit', query: {id: scope.id, url: scope.url}})
    },
    newItem() {
      this.$router.push({path: '/goodsImgBorderEdit'})
    },
    goBlindGoodsList(scope) {
      this.$router.push({path: '/goodsImgBorderBlind', query: {id: scope.id}})
    },
    blindGoods(scope) {
      this.imgBorderId = scope.id
      this.goodsDialogVisible = true
      this.formInline2.type = '1'
    },
    getGoodsList() {
      let url = ''
      if (this.formInline2.type == '1') {
        url = '/goodsmanage/backadmin/goods'
      } else if (this.formInline2.type == '2') {
        url = '/goodsmanage/backadmin/presellgoods'
      } else if (this.formInline2.type == '3') {
        url = '/goodsmanage/backadmin/drawgoods'
      }
      this.$http({
        url: url,
        method: 'GET',
        params: {
          title: this.formInline2.name,
          pageSize: this.pageSize2,
          pageNumber: this.currentPage2,
        }
      })
        .then(res => {
          this.goodsList = res.data.list
          this.totalPages2 = res.data.pages
          this.currentPage2 = res.data.pageNum
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange2: function (val) { // 页码变更
      this.currentPage2 = val
      this.getGoodsList()
    },
    // chooseGoods(event) {
    //   // let id = event.currentTarget.getAttribute("data-id")
    //   let index = event.currentTarget.getAttribute("data-index")
    //   let active = this.classifyModuleAllList[index].active
    //   this.$set(this.classifyModuleAllList[index], 'active', !active)
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addGoods() {
      // let addModuleIds = []
      // for (let i = 0; i < this.classifyModuleAllList.length; i++) {
      //   if (this.classifyModuleAllList[i].active == true) {
      //     addModuleIds.push(this.classifyModuleAllList[i].id)
      //   }
      // }
      let ids = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.formInline2.type == '3') {
          ids.push(this.multipleSelection[i].goodsId)
        } else {
          ids.push(this.multipleSelection[i].id)
        }
      }
      this.$http({
        url: '/goodsmanage/backadmin/frame/goods',
        method: 'POST',
        data: {
          frameId: this.imgBorderId,
          type: this.formInline2.type,
          ids: ids,
        }
      })
        .then(res => {
          this.$message.success(res.msg)
          this.getGoodsList()
          this.classifyModuleDialogVisible = false
        }).catch(e => {
        console.log(e)
      })
    },
  },
  watch: {
    'formInline2.type': {
      handler: function () {
        this.getGoodsList()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>