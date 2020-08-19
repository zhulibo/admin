<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.title" placeholder="请输入商品名称" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="上下架">
            <el-select v-model="formInline.isUp" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="上架" value="0"></el-option>
              <el-option label="下架" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.minSort" placeholder="最小分值" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.maxSort" placeholder="最大分值" @keyup.enter.native="getList"></el-input>
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
                <th>id</th>
                <th>skuImage</th>
                <th>name</th>
                <th>操作</th>
              </tr>
              <tr v-for="item in props.row.skus">
                <td>{{ item.creatTime | timestampToDate}}</td>
                <td>{{ item.id }}</td>
                <td><img :src="item.skuImage" alt=""></td>
                <td>{{ item.name }}</td>
                <td class="row-manage">
                  <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
                  <el-button type="text" size="medium" class="delete" @click="deleteItem(scope.row)">删除</el-button>
                </td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="title" label="商品名称" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column prop="listedImage" label="列表图片" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img :src="scope.row.listedImage" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="sellPrice" label="销售价格" align="center">
          <template slot-scope="scope">{{scope.row.sellPrice}}</template>
        </el-table-column>
        <el-table-column prop="realNumber" label="真实销量" align="center">
          <template slot-scope="scope">{{scope.row.realNumber}}</template>
        </el-table-column>
        <el-table-column prop="sellNumber" label="维护销量" align="center">
          <template slot-scope="scope">{{scope.row.sellNumber}}</template>
        </el-table-column>
        <el-table-column prop="sort" label="排序分值" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column prop="isUp" label="是否上架" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isUp"
              :active-value="0"
              :inactive-value="1"
              @change=switchStatus(scope.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" class-name="row-manage">
          <template slot-scope="scope">
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'item',
  data() {
    return {
      formInline: {
        title: '',
        isUp: '',
        minSort: '',
        maxSort: '',
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
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/goods',
        method: 'GET',
        params: {
          title: this.formInline.title,
          isUp: this.formInline.isUp,
          minSort: this.formInline.minSort,
          maxSort: this.formInline.maxSort,
          startTime: this.formInline.time ? this.formInline.time[0] : '',
          endTime: this.formInline.time ? this.formInline.time[1] : '',
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.tableList = res.data.list
          let arr =  [{
              "id": 15,
              "mainId": 15,
              "skuImage": "http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/png7041.png",
              "name": "11",
              "price": 0.00,
              "del": 0,
              "isUp": 0,
              "creatTime": 1597827142000,
              "store": 0,
              "storeList": []
            },
              {
                "id": 16,
                "mainId": 15,
                "skuImage": "http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/png8558.png",
                "name": "12",
                "price": 0.00,
                "del": 0,
                "isUp": 0,
                "creatTime": 1597827142000,
                "store": 0,
                "storeList": []
              }]
          for (let i = 0; i < arr.length; i++) {
            this.$set(this.tableList[i], 'skus', arr)
          }
          this.totalPages = res.data.pages
          this.currentPage = res.data.pageNum
        }).catch(e => {console.log(e)})
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val;
      this.getList()
    },
    switchStatus(scope) {
      this.$http({
        url: '/goodsmanage/backadmin/goods/goodsisup',
        method: 'PUT',
        data: {
          id: scope.id,
          isUp: scope.isUp
        }
      }).then(res => {
        this.$message.success(res.msg)
        this.getList()
      }).catch(e => {
        this.getList()
      })
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/goodsmanage/backadmin/goods',
          method: 'PUT',
          data: {
            id: scope.id,
            del: 1,
          }
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.title)
            this.getList()
          })
      }).catch(e => {console.log(e)})
    },
    editItem(scope) {
      this.$router.push({path: '/goodsEdit', query: {id: scope.id}})
    },

    newItem() {
      this.$router.push({path: '/goodsNew'})
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
    background-color: #fafafa
  }
  td{
    padding: 5px 0
    text-align: center
    border:1px solid #ddd;
    background-color: #fafafa
  }
  img{
    height: 3em
  }
}
</style>