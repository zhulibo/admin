<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="商品类型">
            <el-select v-model="formInline.type" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="现货" value="1"></el-option>
              <el-option label="预售" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="openSelectDialog" icon="el-icon-plus">新建
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.creatTime }}</template>
        </el-table-column>
        <el-table-column prop="title" label="商品标题" align="center" show-overflow-tooltip>
          <template slot-scope="scope"><span v-copy="scope.row.title" title="点击可复制" class="copy-span">{{ scope.row.title }}</span></template>
        </el-table-column>
        <el-table-column prop="url" label="商品图片" align="center" class-name="row-img">
          <template slot-scope="scope"><img :src="scope.row.url" alt=""></template>
        </el-table-column>
        <el-table-column prop="type" label="商品类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">现货</span>
            <span v-else-if="scope.row.type == 2">预售</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="delete" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-ct clearfix">
        <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages"
                       @current-change="handleCurrentChange" background></el-pagination>
      </div>
    </div>
    <select-goods @confirmSelectItem="confirmSelectItem" :dialogVisible.sync="selectItemOption.dialogVisible" :itemType="selectItemOption.itemType" :singleSelect="selectItemOption.singleSelect"></select-goods>
  </div>
</template>

<script>
import selectGoods from "@/components/selectItem/selectGoods";

export default {
  name: 'item',
  data() {
    return {
      formInline: {
        type: '',
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
      selectItemOption: { // 选择商品组件配置参数
        dialogVisible: false,
        itemType: [true, true, false], // 是否可以选择现货商品，预售商品，抽奖商品
        singleSelect: true, // 只可以单选
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
        url: '/goodsmanage/backadmin/goods/recommendgoods',
        method: 'GET',
        params: {
          type: this.formInline.type,
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].tbPresellGoods){
              res.data.list[i].title = res.data.list[i].tbPresellGoods.title
              res.data.list[i].url = res.data.list[i].tbPresellGoods.listedImage
            }else if(res.data.list[i].tbGoods){
              res.data.list[i].title = res.data.list[i].tbGoods.title
              res.data.list[i].url = res.data.list[i].tbGoods.listedImage
            }
          }
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
      this.$confirm('确定删除 ' + scope.title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/goods/recommenddel',
          method: 'DELETE',
          data: {
            goodId: scope.goodId
          }
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.title)
            this.getList()
          })
      }).catch(e => {
        console.log(e)
      })
    },
    openSelectDialog() {
      this.selectItemOption.dialogVisible = true
    },
    confirmSelectItem(type, multipleSelection) {
      console.log(type, multipleSelection)
      let ids = []
      for (let i = 0; i < multipleSelection.length; i++) {
        ids.push(multipleSelection[i].id)
      }
      this.$http({
        url: '/goodsmanage/backadmin/goods/recommendgoods',
        method: 'POST',
        data: {
          goodId: ids[0],
          type: type,
        }
      })
        .then(res => {
          this.$message.success(res.msg)
          this.selectItemOption.dialogVisible = false
          this.getList()
        }).catch(e => {
        console.log(e)
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>