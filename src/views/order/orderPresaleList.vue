<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="订单状态">
            <el-select v-model="formInline.status" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="待付款" value="1"></el-option>
              <el-option label="待发货" value="2"></el-option>
              <el-option label="待收货" value="3"></el-option>
              <el-option label="用户已确认收货" value="4"></el-option>
              <el-option label="支付后用户取消" value="5"></el-option>
              <el-option label="支付后后台取消" value="6"></el-option>
              <el-option label="未支付超时取消" value="7"></el-option>
              <el-option label="未支付用户取消" value="8"></el-option>
              <el-option label="删除" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预售状态">
            <el-select v-model="formInline.preStatus" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="已预订" value="1"></el-option>
              <el-option label="已付尾款" value="2"></el-option>
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
          <template slot-scope="scope">{{ scope.row.creatTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="number" label="订单号" align="center" width="220px">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="number" label="商品信息" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              trigger="hover">
              <table class="goods-list">
                <tr>
                  <th>商品名</th>
                  <th>图片</th>
                  <th>数量</th>
                  <th>价格(元)</th>
                </tr>
                <tr v-for="item in scope.row.goods">
                  <td v-copy="item.goodsName" title="点击可复制" class="copy-span">{{ item.goodsName }}</td>
                  <td><img :src="item.goodsPhoto" alt=""></td>
                  <td>{{ item.goodsNumber }}</td>
                  <td>{{ item.goodsMoney }}</td>
                </tr>
              </table>
              <el-button slot="reference" type="text">查看商品</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="prePayMoney" label="预付金额(元)" align="center">
          <template slot-scope="scope">{{ scope.row.prePayMoney | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="payMoney" label="实付总金额(元)" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.payMoney">{{ scope.row.payMoney | noneToLine }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="userDetail" label="用户名" align="center">
          <template slot-scope="scope">{{ scope.row.userDetail.nickName }}</template>
        </el-table-column>
        <el-table-column prop="tbOrderDetail" label="收货人" align="center">
          <template slot-scope="scope" v-if="scope.row.tbOrderDetail">{{ scope.row.tbOrderDetail.name }}</template>
        </el-table-column>
        <el-table-column prop="tbOrderDetail" label="收货人电话" align="center">
          <template slot-scope="scope" v-if="scope.row.tbOrderDetail">{{ scope.row.tbOrderDetail.phone }}</template>
        </el-table-column>
        <el-table-column prop="isBalance" label="是否结算" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isBalance == 0">未结算</span>
            <span v-else-if="scope.row.isBalance == 1">未结算</span>
            <span v-else-if="scope.row.isBalance == 2">已结算</span>
          </template>
        </el-table-column>
        <el-table-column prop="preStatus" label="预售订单状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.preStatus == 1">未付定金</span>
            <span v-else-if="scope.row.preStatus == 2">已预订</span>
            <span v-else-if="scope.row.preStatus == 3">开始交尾款</span>
            <span v-else-if="scope.row.preStatus == 4">已付尾款</span>
            <span v-else-if="scope.row.preStatus == 5">付尾款已结束</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">已删除</span>
            <span v-else-if="scope.row.status == 1">待付款</span>
            <span v-else-if="scope.row.status == 2">待发货</span>
            <span v-else-if="scope.row.status == 3">待收货</span>
            <span v-else-if="scope.row.status == 4">用户已确认收货</span>
            <span v-else-if="scope.row.status == 5">支付后用户取消</span>
            <span v-else-if="scope.row.status == 6">支付后后台取消</span>
            <span v-else-if="scope.row.status == 7">未支付超时取消</span>
            <span v-else-if="scope.row.status == 8">未支付用户取消</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="cancleOrder(scope.row)">取消订单</el-button>
            <el-button type="text" size="medium" class="detail" @click="sendMsg(scope.row)">发消息</el-button>
            <el-button type="text" size="medium" class="detail" @click="checkItem(scope.row)">查看</el-button>
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
        preStatus: '',
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
    this.currentPage = this.global.getContextData('currentPage') || 1  // 获取缓存的页码
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/order/backadmin/paasorder/pre',
        method: 'GET',
        params: {
          status: this.formInline.status,
          number: this.formInline.number,
          startTime: this.formInline.time ? this.formInline.time[0] : '',
          endTime: this.formInline.time ? this.formInline.time[1] : '',
          preStatus: this.formInline.preStatus,
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
    cancleOrder(scope) {
      this.$confirm('取消订单 ' + scope.number, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/order/backadmin/paasorder/pre',
          method: 'PUT',
          data: {
            id: scope.id,
            status: 5,
          }
        })
          .then(res => {
            this.$message.success(res.msg + scope.number)
            this.getList()
          })
      }).catch(e => {
        console.log(e)
      })
    },
    sendMsg(scope) {
      this.$router.push({path: '/notificationEdit', query: {userId: scope.userDetail.userId, nickName: scope.userDetail.nickName}})
    },
    checkItem(scope) {
      this.$router.push({path: '/orderPresaleDetail', query: {id: scope.id}})
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val
      this.global.setContextData('currentPage', this.currentPage)  // 缓存页码
      this.getList()
    },
  }
}
</script>

<style lang="stylus" scoped>
.goods-list {
  width: 100%
  border-collapse: collapse;
  tr{
    border-bottom: 1px solid #ddd
  }
  th {
    padding: 10px 0
    text-align: center
  }
  td {
    padding: 5px
    min-width 100px
    text-align: center
  }
  img {
    height: 3em
  }
}
</style>