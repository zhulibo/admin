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
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="expand">
          <template slot-scope="props">
            <table class="table-sku">
              <tr>
                <th>sku-id</th>
                <th>sku名称</th>
                <th>sku图片</th>
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
                <td width="500px" class="row-manage">
                  <table class="table-store" v-if="item.storeList.length > 0">
                    <tr>
                      <th>总库存</th>
                      <th>剩余库存</th>
                      <th>出售价格</th>
                      <th>状态</th>
                      <th>操作</th>
                    </tr>
                    <tr v-for="store in item.storeList" :key="store.id">
                      <td>{{ store.store }}</td>
                      <td>{{ store.number }}</td>
                      <td>{{ store.price }}</td>
                      <td>
                        <span class="store-status" v-if="store.status == 0">正在出售</span>
                        <span class="store-status" v-else-if="store.status == 1">出售完</span>
                        <span class="store-status" v-else-if="store.status == 2">供货商撤销</span>
                        <span class="store-status" v-else-if="store.status == 3">sku被下架</span>
                        <span class="store-status" v-else-if="store.status == 4">sku被删除</span>
                        <span class="store-status" v-else-if="store.status == 5">主商品被删除</span>
                        <span class="store-status" v-else-if="store.status == 6">主商品被下架</span>
                        <span class="store-status" v-else-if="store.status == 7">供货商删除</span>
                      </td>
                      <td>
                        <el-button type="text" size="medium" class="edit" @click="cancleItem(store)">撤销</el-button>
                        <el-button type="text" size="medium" class="delete" @click="deleteItem(store)">删除</el-button>
                      </td>
                    </tr>
                  </table>
                  <span v-else>此sku还没添加库存</span>
                </td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="title" label="商品名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope"><span v-copy="scope.row.title" title="点击可复制" class="copy-span">{{ scope.row.title }}</span></template>
        </el-table-column>
        <el-table-column prop="id" label="商品id" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="isUp" label="主商品上架状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isUp == 0">正常</span>
            <span v-else-if="scope.row.isUp == 1">已下架</span>
          </template>
        </el-table-column>
        <el-table-column prop="listedImage" label="商品图片" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img :src="scope.row.listedImage" alt="">
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-ct clearfix">
        <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages"
                       @current-change="handleCurrentChange" background></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
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
        url: '/goodsmanage/backadmin/shopgoods',
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
    cancleItem(store) {
      this.$confirm('确定撤销 ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/shopgoods',
          method: 'PUT',
          data: {
            id: store.id,
            status: 2,
          },
        })
          .then(res => {
            this.$message.success('已撤销该库存 ')
            this.getList()
          }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    deleteItem(store) {
      this.$confirm('确定删除 ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/shopgoods',
          method: 'PUT',
          data: {
            id: store.id,
            status: 7,
          },
        })
          .then(res => {
            this.$message.success('已删除该库存 ')
            this.getList()
          }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
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
    &.row-manage{
      padding: 0
    }
  }
  img {
    height: 3em
  }
}
.table-store {
  width: 100%
  border-collapse: collapse;
  th {
    padding: 10px 0
    text-align: center
    border: none
    color: #999
  }
  td {
    padding: 5px 0
    text-align: center
    border: none
    border-top: 1px dashed #ddd;
  }
  img {
    height: 3em
  }
}
.store-status{
  display: inline-block
  min-width 7em
  text-align: center
  font-weight: bold
}
</style>