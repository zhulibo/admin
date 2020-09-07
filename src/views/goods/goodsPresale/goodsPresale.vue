<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.title" placeholder="请输入商品名称" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="getList"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建</el-button>
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
                <th>价格</th>
                <th>操作</th>
              </tr>
              <tr v-for="item in props.row.skus">
                <td>{{ item.creatTime | timestampToDate}}</td>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td><img :src="item.skuImage" alt=""></td>
                <td>{{ item.price }}</td>
                <td class="row-manage">
                  <el-button type="text" size="medium" class="edit" @click="editItemSku(item)">编辑</el-button>
                  <el-button type="text" size="medium" class="delete" @click="deleteItemSku(item)">删除</el-button>
                </td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="title" label="商品名称" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column prop="id" label="商品id" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column prop="listedImage" label="列表图片" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img :src="scope.row.listedImage" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="350px" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItemActivity(scope.row)">预售设置</el-button>
            <el-button type="text" size="medium" class="edit" @click="newItemSku(scope.row)">新建sku</el-button>
            <el-dropdown @command="handleCommand" :show-timeout="50">
              <span class="el-dropdown-link">分类<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="beforeHandleCommand(scope.row,'1')">查看分类</el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(scope.row,'2')">查看ip</el-dropdown-item>
                <!--                <el-dropdown-item :command="beforeHandleCommand(scope.row,'3')">一键清空绑定的分类和ip</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
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
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {
      formInline: {
        title: '',
        time: [],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近二天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/presellgoods',
        method: 'GET',
        params: {
          title: this.formInline.title,
          startTime: this.formInline.time ? this.formInline.time[0] : '',
          endTime: this.formInline.time ? this.formInline.time[1] : '',
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.tableList = res.data.list
          this.totalPages = res.data.pages
          this.currentPage = res.data.pageNum
        }).catch(e => {console.log(e)})
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.getList()
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/presellgoods/' + scope.id,
          method: 'DELETE',
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.title)
            this.getList()
          })
      }).catch(e => {console.log(e)})
    },
    beforeHandleCommand(row, command){
      return {
        'row': row,
        'command':command
      }
    },
    handleCommand(command) {
      console.log(command)
      if(command.command == 1) {
        console.log()
        this.$router.push({path: '/goodsBindClassify', query: {id: command.row.id, goodsType: 2}})
      }
      else if(command.command == 2) {
        this.$router.push({path: '/goodsBindIp', query: {id: command.row.id, goodsType: 2}})
      }
      else if(command.command == 3) {
        this.$http({
          url: '/goodsmanage/backadmin/goods/all/' + command.row.id,
          method: 'DELETE',
        })
          .then(res => {
            this.$message.success(res.msg)
          }).catch(e => {console.log(e)})
      }
    },
    deleteItemSku(scope) {
      this.$confirm('确定删除 ' + scope.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/presellgoods/sku/' + scope.id,
          method: 'DELETE',
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.name)
            this.getList()
          })
      }).catch(e => {console.log(e)})
    },
    editItem(scope) {
      this.$router.push({path: '/goodsPresaleEdit', query: {id: scope.id}})
    },
    editItemActivity(scope) {
      this.$router.push({path: '/goodsPresaleActivityEdit', query: {id: scope.id}})
    },
    editItemSku(scope) {
      this.$router.push({path: '/goodsPresaleSkuEdit', query: {id: scope.id, mainId: scope.mainId}})
    },
    goodsPresaleActivity() {
      this.$router.push({path: '/goodsPresaleActivity'})
    },
    newItem() {
      this.$router.push({path: '/goodsPresaleNew'})
    },
    newItemSku(scope) {
      this.$router.push({path: '/goodsPresaleSkuEdit', query: {mainId: scope.id}})
    },
  }
}
</script>

<style lang="stylus" scoped>
.table-sku{
  width: 100%
  border-collapse: collapse;
  th{
    padding: 10px 0
    text-align: center
    border:1px solid #ddd;
  }
  td{
    padding: 5px 0
    text-align: center
    border:1px solid #ddd;
  }
  img{
    height: 3em
  }
}
</style>