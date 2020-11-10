<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.title" placeholder="请输入商品名称" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="openSelectDialog" icon="el-icon-plus">添加商品
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="expand">
          <template slot-scope="props">
            <table class="table-sku">
              <tr>
                <th>sku-id</th>
                <th>名称</th>
                <th>图片</th>
                <th>sku上架状态</th>
                <th>操作</th>
              </tr>
              <tr v-for="item in props.row.skus">
                <td width="200px">{{ item.id }}</td>
                <td width="500px">{{ item.name }}</td>
                <td width="200px"><img :src="item.skuImage" alt=""></td>
                <td width="200px">
                  <span v-if="item.isUp == 0">正常</span>
                  <span v-else>下架</span>
                </td>
                <td width="200px" class="row-manage">
                  <el-button v-if="props.row.isUp == 0 && item.isUp == 0" type="text" size="medium" class="edit" @click="addItem(item.id, item.mainId)">添加库存
                  </el-button>
                </td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="id" label="商品id" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="title" label="商品名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope"><span v-copy="scope.row.title" title="点击可复制" class="copy-span">{{ scope.row.title }}</span></template>
        </el-table-column>
        <el-table-column prop="listedImage" label="列表图片" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img :src="scope.row.listedImage" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="isUp" label="主商品上架状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isUp == 0">正常</span>
            <span v-else-if="scope.row.isUp == 1">已下架</span>
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
    <select-goods @confirmSelectItem="confirmSelectItem" :dialogVisible.sync="selectItemOption.dialogVisible" :itemType="selectItemOption.itemType"></select-goods>
  </div>
</template>

<script>
import selectGoods from "@/components/selectItem/selectGoods";

export default {
  name: 'item',
  data() {
    return {
      formInline: {
        title: '',
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
      selectItemOption: { // 选择商品组件配置参数
        dialogVisible: false,
        itemType: [true, false, false], // 是否可以选择现货商品，预售商品，抽奖商品
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
        url: '/goodsmanage/backadmin/shopware',
        method: 'GET',
        params: {
          title: this.formInline.title,
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
      this.$confirm('确定删除 ' + scope.title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/shopware',
          method: 'DELETE',
          data: {
            ids: [scope.id]
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
        url: '/goodsmanage/backadmin/shopware',
        method: 'POST',
        data: {
          ids: ids,
        }
      })
        .then(res => {
          this.$message.success(res.msg)
          this.getList()
          this.selectItemOption.dialogVisible = false
        }).catch(e => {
        console.log(e)
      })
    },
    addItem(id, mainId) {
      this.$router.push({path: '/supplierGoodsStockAdd', query: {mainId: mainId, skuId: id}})
    },
  },
  watch: {}
}
</script>

<style lang="stylus" scoped>
.table-sku {
  width: 100%
  border-collapse: collapse;
  th {
    padding: 10px 0
    text-align: center
    border: 1px solid #ddd;
  }
  td {
    padding: 5px 0
    text-align: center
    border: 1px solid #ddd;
  }
  img {
    height: 3em
  }
}
</style>