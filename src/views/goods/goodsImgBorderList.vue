<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.creatTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="url" label="边框图片" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="detail" @click="openSelectDialog(scope.row)">绑定商品</el-button>
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
    <select-goods @confirmSelectItem="confirmSelectItem" :dialogVisible.sync="selectItemOption.dialogVisible" :itemType="selectItemOption.itemType"></select-goods>
  </div>
</template>

<script>
import selectGoods from "@/components/selectItem/selectGoods";

export default {
  name: 'item',
  data() {
    return {
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
      imgBorderId: '',
      selectItemOption: { // 选择商品组件配置参数
        dialogVisible: false,
        itemType: [true, true, true], // 是否可以选择现货商品，预售商品，抽奖商品
      }
    }
  },
  components: {
    selectGoods,
  },
  created() {
    this.currentPage = this.global.getContextData('currentPage') || 1  // 获取缓存的页码
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
      this.global.setContextData('currentPage', this.currentPage)  // 缓存页码
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
      this.$router.push({path: '/goodsImgBorderBlindList', query: {id: scope.id}})
    },
    openSelectDialog(scope) {
      this.imgBorderId = scope.id
      this.selectItemOption.dialogVisible = true
    },
    confirmSelectItem(type, multipleSelection) {
      console.log(type, multipleSelection)
      let ids = []
      for (let i = 0; i < multipleSelection.length; i++) {
        ids.push(multipleSelection[i].id)
      }
      this.$http({
        url: '/goodsmanage/backadmin/frame/goods',
        method: 'POST',
        data: {
          frameId: this.imgBorderId,
          type: type,
          ids: ids,
        }
      })
        .then(res => {
          this.$message.success(res.msg)
          this.selectItemOption.dialogVisible = false
        }).catch(e => {
        console.log(e)
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>