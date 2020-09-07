<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="订单状态">
            <el-select v-model="formInline.status" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="待付款" value="1"></el-option>
              <el-option label="待发货" value="2"></el-option>
              <el-option label="待收货" value="3"></el-option>
              <el-option label="确认收货已完成" value="5"></el-option>
              <el-option label="超时取消" value="6"></el-option>
              <el-option label="用户取消" value="7"></el-option>
              <el-option label="管理员取消" value="8"></el-option>
              <el-option label="删除" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.number" placeholder="请输入订单号" @keyup.enter.native="getList"></el-input>
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
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
          <template slot-scope="scope">{{scope.row.phone | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickName | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <template slot-scope="scope">{{scope.row.sex | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="homesickId" label="漫想家id" align="center">
          <template slot-scope="scope">{{scope.row.homesickId | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="signature" label="签名" align="center">
          <template slot-scope="scope">{{scope.row.signature | noneToLine}}</template>
        </el-table-column>
<!--                <el-table-column prop="iconUrl" label="img" align="center" class-name="row-img">-->
<!--                  <template slot-scope="scope">-->
<!--                    <img :src="scope.row.iconUrl" alt="">-->
<!--                  </template>-->
<!--                </el-table-column>-->
        <el-table-column prop="status" label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">删除</span>
            <span v-else-if="scope.row.status == 1">待付款</span>
            <span v-else-if="scope.row.status == 2">待发货</span>
            <span v-else-if="scope.row.status == 3">待收货</span>
            <span v-else-if="scope.row.status == 5">确认收货已完成</span>
            <span v-else-if="scope.row.status == 6">超时取消</span>
            <span v-else-if="scope.row.status == 7">用户取消</span>
            <span v-else-if="scope.row.status == 8">管理员取消</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
            <!--            <el-button type="text" size="medium" class="delete" @click="deleteItem(scope.row)">删除</el-button>-->
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
        status: '',
        number: '',
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
        url: '/order/backadmin/paasorder',
        method: 'GET',
        params: {
          status: this.formInline.status,
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
  }
}
</script>

<style lang="stylus" scoped>
</style>