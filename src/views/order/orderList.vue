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
<!--              <el-option label="删除" value="0"></el-option>-->
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
        <el-table-column prop="number" label="订单号" align="center" width="200px">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="shopName" label="供货商昵称" align="center">
          <template slot-scope="scope">{{ scope.row.shopName | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="phone" label="供货商手机号" align="center">
          <template slot-scope="scope">{{ scope.row.phone | noneToLine}}</template>
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
        <el-table-column prop="userDetail" label="用户名" align="center">
          <template slot-scope="scope">{{ scope.row.userDetail.nickName }}</template>
        </el-table-column>
        <el-table-column prop="tbOrderDetail" label="收货人" align="center">
          <template slot-scope="scope">{{ scope.row.tbOrderDetail.name }}</template>
        </el-table-column>
        <el-table-column prop="tbOrderDetail" label="收货人电话" align="center">
          <template slot-scope="scope">{{ scope.row.tbOrderDetail.phone }}</template>
        </el-table-column>
        <el-table-column prop="tbOrderDetail" label="物流单号" align="center" width="200px">
          <template slot-scope="scope">{{ scope.row.tbOrderDetail.logNumber | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="payMoney" label="实付总金额(元)" align="center">
          <template slot-scope="scope">{{ scope.row.payMoney | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="isBalance" label="是否结算" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isBalance == 0">未结算</span>
            <span v-else-if="scope.row.isBalance == 1">未结算</span>
            <span v-else-if="scope.row.isBalance == 2">已结算</span>
            <span v-else-if="scope.row.isBalance == 3">延迟打款中</span>
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
            <el-button type="text" size="medium" class="edit" v-if="scope.row.del == 0 && scope.row.status == 2" @click="ship(scope.row)">发货</el-button>
            <el-button type="text" size="medium" class="edit" v-if="scope.row.del == 0 && scope.row.status == 3" @click="ship(scope.row)">修改运单号</el-button>
            <el-button type="text" size="medium" class="edit" v-if="scope.row.del == 0 && scope.row.status == 3 && scope.row.isBalance != 2 && scope.row.isBalance != 3" @click="errorOrder(scope.row)">延迟打款</el-button>
            <el-button type="text" size="medium" class="edit" v-if="scope.row.del == 0 && scope.row.status == 3 && scope.row.isBalance != 0 && scope.row.isBalance != 1" @click="errorOrder(scope.row)">确认打款</el-button>
            <el-button type="text" size="medium" class="edit" v-if="scope.row.del == 0 && scope.row.status == 3" @click="confirmReceipt(scope.row)">确认收货</el-button>
            <el-button type="text" size="medium" class="edit" v-if="scope.row.del == 0 && scope.row.status < 4" @click="cancleOrder(scope.row)">取消订单</el-button>
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
    <div class="dialog">
      <el-dialog title="发货" :visible.sync="shipDialogVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit-form">
          <el-form-item label="快递公司" prop="companyCode">
            <el-select v-model="ruleForm.companyCode" filterable remote :remote-method="getExpressList" placeholder="请输入快递公司名称并选择">
              <el-option
                v-for="item in expressList"
                :key="item.id"
                :label="item.expressName"
                :value="item.expressCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号" prop="logNumber">
            <el-input v-model="ruleForm.logNumber"></el-input>
          </el-form-item>
          <el-form-item label="发货地址" prop="sendAddressArea" v-if="scope.status == 3">
            <el-cascader v-model="ruleForm.sendAddressArea" :options="areaList"
                         :props="{ value: 'name', label: 'name', children: 'children' }"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="sendAddress" v-if="scope.status == 3">
            <el-input v-model="ruleForm.sendAddress"></el-input>
          </el-form-item>
          <el-form-item label="收货人" prop="name" v-if="scope.status == 3">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="收货人电话" prop="phone" v-if="scope.status == 3">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
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
      areaList: [],
      expressList: [],
      shipDialogVisible: false,
      scope: {},
      ruleForm: {
        companyCode: '',
        logNumber: '',
        sendAddressArea: [],
        sendAddress: '',
        name: '',
        phone: '',
      },
      rules: {
        companyCode: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        logNumber: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    this.currentPage = this.global.getContextData('currentPage') || 1  // 获取缓存的页码
    this.getList()
    this.getAreaList()
  },
  mounted() {
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/order/backadmin/paasorder',
        method: 'GET',
        params: {
          status: this.formInline.status,
          number: this.formInline.number,
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
        }).catch(e => {
        console.log(e)
      })
    },
    getAreaList() {
      this.$http({
        url: '/userorg/backadmin/shopaddress/selectaddress',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.areaList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    getExpressList(expressName) {
      this.$http({
        url: '/order/backadmin/express',
        method: 'GET',
        params: {
          expressName: expressName,
          pageSize: 100,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.expressList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    ship(scope) {
      this.shipDialogVisible = true
      this.scope = scope
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.scope.status == 2){ // 发货
            this.$http({
              url: '/order/backadmin/paasorder',
              method: 'PUT',
              data: {
                id: this.scope.id,
                status: 3,
                tbOrderDetail: {
                  companyCode: this.ruleForm.companyCode,
                  logNumber: this.ruleForm.logNumber,
                },
              }
            }).then(res => {
              this.$message.success(res.msg)
              this.shipDialogVisible = false
            }).catch(e => {
              console.log(e)
            })
          }else if (this.scope.status == 3){ // 修改运单号
            this.$http({
              url: '/order/backadmin/paasorder/number',
              method: 'PUT',
              data: {
                number: this.scope.number,
                companyCode: this.ruleForm.companyCode,
                logNumber: this.ruleForm.logNumber,
                name: this.ruleForm.name,
                phone: this.ruleForm.phone,
                address: this.ruleForm.sendAddressArea[0] + this.ruleForm.sendAddressArea[1] + this.ruleForm.sendAddressArea[2] + this.ruleForm.sendAddress
              }
            }).then(res => {
              this.$message.success(res.msg)
              this.shipDialogVisible = false
            }).catch(e => {
              console.log(e)
            })
          }

        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    errorOrder(scope) {
      let txt
      if(scope.isBalance == 3){
        txt = '延迟打款'
      }else{
        txt = '确认打款'
      }
      this.$confirm('确认' + txt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/order/backadmin/paasorder/number/err',
          method: 'PUT',
          data: {
            id: scope.id,
            isBalance: scope.isBalance !=3 ? 3 : 1,
          }
        })
          .then(res => {
            this.$message.success(res.msg)
            this.getList()
          }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    confirmReceipt(scope) {
      this.$confirm('确认收货 ' + scope.number, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/order/backadmin/paasorder',
          method: 'PUT',
          data: {
            id: scope.id,
            status: 4,
          }
        })
          .then(res => {
            this.$message.success(res.msg + scope.number)
            this.getList()
          }).catch(e => {
          console.log(e)
        })
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
          url: '/order/backadmin/paasorder',
          method: 'PUT',
          data: {
            id: scope.id,
            status: 6,
          }
        })
          .then(res => {
            this.$message.success(res.msg + scope.number)
            this.getList()
          }).catch(e => {
          console.log(e)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    sendMsg(scope) {
      this.$router.push({path: '/notificationEdit', query: {userId: scope.userDetail.userId, nickName: scope.userDetail.nickName}})
    },
    checkItem(scope) {
      this.$router.push({path: '/orderDetail', query: {id: scope.id}})
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