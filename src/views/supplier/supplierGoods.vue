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
                <th>creatTime</th>
                <th>sku-id</th>
                <th>名称</th>
                <th>图片</th>
                <th>操作</th>
              </tr>
              <tr v-for="item in props.row.skus">
                <td>{{ item.creatTime | timestampToDate }}</td>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td><img :src="item.skuImage" alt=""></td>
                <td class="row-manage">
                  <el-dropdown @command="handleCommand" :show-timeout="50">
                    <el-button size="small" class="el-dropdown-link">修改库存</el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="store" v-for="store in item.storeList" :key="store.id">
                        id:{{ store.id }} 库存:{{ store.store }} 剩余:{{ store.number }} 价格:{{ store.price }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="title" label="商品名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column prop="id" label="商品id" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="listedImage" label="列表图片" align="center" class-name="row-img">
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
    this.currentPage = this.global.getContextData('currentPage') || 1
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
      this.global.setContextData('currentPage', this.currentPage)
      this.getList()
    },
    handleCommand(command) {
      console.log(command)
      this.$router.push({path: '/supplierGoodsStockEdit', query: {id: command.id, price: command.price}})
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