<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="订单状态">
            <el-select v-model="formInline.status" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="待平台分配维修师" value="1"></el-option>
              <el-option label="维修师待评估" value="2"></el-option>
              <el-option label="初步待用户确认" value="3"></el-option>
              <el-option label="待用户邮寄" value="4"></el-option>
              <el-option label="平台待收货" value="5"></el-option>
              <el-option label="平台已收货待评估" value="6"></el-option>
              <el-option label="平台已评估待用户确认" value="7"></el-option>
              <el-option label="用户已确认待支付" value="8"></el-option>
              <el-option label="用户已支付修复中" value="9"></el-option>
              <el-option label="修复完成用户待收货" value="10"></el-option>
              <el-option label="用户确认收货已完成" value="11"></el-option>
              <el-option label="用户拒绝初步维修" value="12"></el-option>
              <el-option label="用户再次拒绝平台待填收货地址" value="13"></el-option>
              <el-option label="用户再次拒绝平台，平台已邮寄待收货" value="14"></el-option>
              <el-option label="用户再次拒绝平台，确认收货维修单已取消" value="15"></el-option>
              <el-option label="修复完成待填写收货地址" value="16"></el-option>
              <el-option label="修复完成已填写收货地址" value="17"></el-option>
              <el-option label="二次确认放弃修复" value="18"></el-option>
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
      <el-button class="new-btn" type="primary" plain round size="medium" @click="editRepairOrderNumberFlag = true">修改修复订单数
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{ scope.row.creatTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="number" label="订单号" align="center" width="250px">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="tbAppUserDetail" label="用户名" align="center">
          <template slot-scope="scope">{{ scope.row.tbAppUserDetail.nickName | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">已删除</span>
            <span v-else-if="scope.row.status == 1">待平台分配维修师</span>
            <span v-else-if="scope.row.status == 2">维修师待评估</span>
            <span v-else-if="scope.row.status == 3">初步待用户确认</span>
            <span v-else-if="scope.row.status == 4">待用户邮寄</span>
            <span v-else-if="scope.row.status == 5">平台待收货</span>
            <span v-else-if="scope.row.status == 6">平台已收货待评估</span>
            <span v-else-if="scope.row.status == 7">平台已评估待用户确认</span>
            <span v-else-if="scope.row.status == 8">用户已确认待支付</span>
            <span v-else-if="scope.row.status == 9">用户已支付修复中</span>
            <span v-else-if="scope.row.status == 10">修复完成用户待收货</span>
            <span v-else-if="scope.row.status == 11">用户确认收货已完成</span>
            <span v-else-if="scope.row.status == 12">用户拒绝初步维修</span>
            <span v-else-if="scope.row.status == 13">用户再次拒绝平台待填收货地址</span>
            <span v-else-if="scope.row.status == 14">用户再次拒绝平台，平台已邮寄待收货</span>
            <span v-else-if="scope.row.status == 15">用户再次拒绝平台，确认收货维修单已取消</span>
            <span v-else-if="scope.row.status == 16">修复完成待填写收货地址</span>
            <span v-else-if="scope.row.status == 17">修复完成已填写收货地址</span>
            <span v-else-if="scope.row.status == 18">二次确认放弃修复</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" v-if="scope.row.status == 2" @click="firstEvaluation(scope.row)">初次评审</el-button>
            <el-button type="text" size="medium" class="edit" v-else-if="scope.row.status == 5" @click="received(scope.row)">平台已收货</el-button>
            <el-button type="text" size="medium" class="edit" v-else-if="scope.row.status == 6" @click="secondEvaluation(scope.row)">二次评估</el-button>
            <el-button type="text" size="medium" class="edit" v-else-if="scope.row.status == 9" @click="repairOver(scope.row)">修复完成</el-button>
            <el-button type="text" size="medium" class="edit" v-else-if="scope.row.status == 17" @click="ship(scope.row)">修复完成发货</el-button>
            <el-button type="text" size="medium" class="edit" v-else-if="scope.row.status == 18" @click="ship(scope.row)">拒绝后平台发货</el-button>
            <el-button type="text" size="medium" class="edit" v-else-if="scope.row.status == 10 || scope.row.status == 17 || scope.row.status == 18" @click="changeAddress(scope.row)">修改收货地址</el-button>
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
      <el-dialog title="修改APP显示修复订单数" :visible.sync="editRepairOrderNumberFlag">
        <el-form :model="ruleFormRepair" :rules="rulesRepair" ref="ruleFormRepair"
                 label-width="150px" class="edit-form">
          <el-form-item label="数量" prop="number">
            <el-input v-model="ruleFormRepair.number"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editRepairOrderNumber('ruleFormRepair')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="初次评审" :visible.sync="firstEvaluationDialogVisible">
        <el-form :model="firstEvaluationRuleForm" :rules="firstEvaluationRules" ref="firstEvaluationRuleForm"
                 label-width="150px" class="edit-form">
          <el-form-item label="修复师" prop="repairerId">
            <el-select v-model="firstEvaluationRuleForm.repairerId" filterable placeholder="请选择">
              <el-option
                v-for="item in repairerList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="初步评估价格/低" prop="firstMinPrice">
            <el-input v-model="firstEvaluationRuleForm.firstMinPrice"></el-input>
          </el-form-item>
          <el-form-item label="初步评估价格/高" prop="firstMaxPrice">
            <el-input v-model="firstEvaluationRuleForm.firstMaxPrice"></el-input>
          </el-form-item>
          <el-form-item label="初次运费" prop="firstFreight">
            <el-input v-model="firstEvaluationRuleForm.firstFreight"></el-input>
          </el-form-item>
          <el-form-item label="保价费用" prop="firstGuarantee">
            <el-input v-model="firstEvaluationRuleForm.firstGuarantee"></el-input>
          </el-form-item>
          <el-form-item label="寄修人名称" prop="receiveName">
            <el-input v-model="firstEvaluationRuleForm.receiveName"></el-input>
          </el-form-item>
          <el-form-item label="寄修人手机号" prop="receivePhone">
            <el-input v-model="firstEvaluationRuleForm.receivePhone"></el-input>
          </el-form-item>
          <el-form-item label="寄修地址" prop="receiveAddress">
            <el-input v-model="firstEvaluationRuleForm.receiveAddress"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="firstEvaluationSubmitForm('firstEvaluationRuleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="二次评估" :visible.sync="secondEvaluationDialogVisible">
        <el-form :model="secondEvaluationRuleForm" :rules="secondEvaluationRules" ref="secondEvaluationRuleForm"
                 label-width="150px" class="edit-form">
          <el-form-item label="最终价格" prop="finalPrice">
            <el-input v-model="secondEvaluationRuleForm.finalPrice"></el-input>
          </el-form-item>
          <el-form-item label="最终运费" prop="finalFreight">
            <el-input v-model="secondEvaluationRuleForm.finalFreight"></el-input>
          </el-form-item>
          <el-form-item label="最终保价" prop="finalGuarantee">
            <el-input v-model="secondEvaluationRuleForm.finalGuarantee"></el-input>
          </el-form-item>
          <el-form-item label="维修图片" prop="image">
            <img-upload v-model="secondEvaluationRuleForm.image" :options="repairImgOptions"></img-upload>
          </el-form-item>
          <el-form-item label="维修部位" prop="repairParts">
            <el-input v-model="secondEvaluationRuleForm.repairParts"></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="weight">
            <el-input v-model="secondEvaluationRuleForm.weight"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="secondEvaluationSubmitForm('secondEvaluationRuleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修复完成发货" :visible.sync="shipDialogVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
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
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改收货地址" :visible.sync="addressDialogVisible">
        <el-form :model="ruleFormAddress" :rules="rulesAddress" ref="ruleFormAddress" label-width="100px" class="edit-form">
          <el-form-item label="选择城市" prop="sendAddressArea">
            <el-cascader v-model="ruleFormAddress.sendAddressArea" :options="areaList"
                         :props="{ value: 'name', label: 'name', children: 'children' }"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="sendAddress">
            <el-input v-model="ruleFormAddress.sendAddress"></el-input>
          </el-form-item>
          <el-form-item label="收货人" prop="userName">
            <el-input v-model="ruleFormAddress.userName"></el-input>
          </el-form-item>
          <el-form-item label="收货人电话" prop="userPhone">
            <el-input v-model="ruleFormAddress.userPhone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormAddress('ruleFormAddress')">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')

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
      firstEvaluationDialogVisible: false,
      secondEvaluationDialogVisible: false,
      shipDialogVisible: false,
      scope: {},
      repairerList: [],
      firstEvaluationRuleForm: {
        repairerId: '',
        firstMinPrice: '',
        firstMaxPrice: '',
        firstFreight: '',
        firstGuarantee: '',
        receiveName: '',
        receivePhone: '',
        receiveAddress: '',
      },
      firstEvaluationRules: {},
      repairImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      secondEvaluationRuleForm: {
        finalPrice: '',
        finalFreight: '',
        finalGuarantee: '',
        repairImg: [],
        repairParts: '',
        weight: '',
      },
      secondEvaluationRules: {},
      expressList: [],
      ruleForm: {
        companyCode: '',
        logNumber: '',
      },
      rules: {},
      areaList: [],
      addressDialogVisible: false,
      ruleFormAddress: {
        sendAddressArea: [],
        sendAddress: '',
        userName: '',
        userPhone: '',
      },
      rulesAddress: {
      },
      editRepairOrderNumberFlag: false,
      ruleFormRepair: {
        number: '',
      },
      rulesRepair: {
      },
    }
  },
  components: {
    imgUpload
  },
  created() {
    this.currentPage = this.global.getContextData('currentPage') || 1  // 获取缓存的页码
    this.getList()
    this.getAreaList()
    this.getRepairNumber()
  },
  mounted() {
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/order/backadmin/repair',
        method: 'GET',
        params: {
          status: this.formInline.status,
          number: this.formInline.number,
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
    getRepairNumber() {
      this.$http({
        url: '/order/backadmin/repair/setting',
        method: 'GET',
      })
        .then(res => {
          this.ruleFormRepair.number = res.data[0].number
        }).catch(e => {
        console.log(e)
      })
    },
    received(scope) {
      this.$confirm('确认收到 ' + scope.number, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/order/backadmin/repair',
          method: 'PUT',
          data: {
            id: scope.id,
            status: 6,
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
    repairOver(scope) {
      this.$confirm('确认修复 ' + scope.number + '完成？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/order/backadmin/repair',
          method: 'PUT',
          data: {
            id: scope.id,
            status: 16,
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
    firstEvaluation(scope) {
      this.firstEvaluationDialogVisible = true
      this.scope = scope
      this.getRepairerList()
    },
    secondEvaluation(scope) {
      this.secondEvaluationDialogVisible = true
      this.scope = scope
    },
    getRepairerList: function () {
      this.$http({
        url: '/order/backadmin/repair/repairer',
        method: 'GET',
        params: {
          id: this.scope.id,
        }
      })
        .then(res => {
          this.repairerList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    editRepairOrderNumber(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/repair/setting',
            method: 'POST',
            data: {
              number: this.ruleFormRepair.number,
            }
          }).then(res => {
            this.$message.success(res.msg)
            this.editRepairOrderNumberFlag = false
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    firstEvaluationSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/repair',
            method: 'PUT',
            data: {
              id: this.scope.id,
              status: 3,
              repairerId: this.firstEvaluationRuleForm.repairerId,
              receiveName: this.firstEvaluationRuleForm.receiveName,
              receivePhone: this.firstEvaluationRuleForm.receivePhone,
              receiveAddress: this.firstEvaluationRuleForm.receiveAddress,
              tbRepairOrderMoving: {
                firstMinPrice: this.firstEvaluationRuleForm.firstMinPrice,
                firstMaxPrice: this.firstEvaluationRuleForm.firstMaxPrice,
                firstFreight: this.firstEvaluationRuleForm.firstFreight,
                firstGuarantee: this.firstEvaluationRuleForm.firstGuarantee,
              }
            }
          }).then(res => {
            this.$message.success(res.msg)
            this.firstEvaluationDialogVisible = false
            this.getList()
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    secondEvaluationSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/repair',
            method: 'PUT',
            data: {
              id: this.scope.id,
              status: 7,
              tbRepairOrderMoving: {
                finalPrice: this.secondEvaluationRuleForm.finalPrice,
                finalFreight: this.secondEvaluationRuleForm.finalFreight,
                finalGuarantee: this.secondEvaluationRuleForm.finalGuarantee,
                image: this.secondEvaluationRuleForm.repairImg[0],
                repairParts: this.secondEvaluationRuleForm.repairParts,
                weight: this.secondEvaluationRuleForm.weight,
              }
            }
          }).then(res => {
            this.$message.success(res.msg)
            this.secondEvaluationDialogVisible = false
            this.getList()
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    ship(scope) {
      this.shipDialogVisible = true
      this.scope = scope
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
    submitForm(formName) {
      console.log(this.scope.status)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/repair',
            method: 'PUT',
            data: {
              id: this.scope.id,
              status: this.scope.status == 17 ? 10 : 14,
              tbRepairOrderMoving: {
                companyCode: this.ruleForm.companyCode,
                logNumber: this.ruleForm.logNumber,
              }
            }
          }).then(res => {
            this.$message.success(res.msg)
            this.shipDialogVisible = false
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    changeAddress(scope) {
      this.addressDialogVisible = true
      this.scope = scope
    },
    submitFormAddress(formName) {
      console.log(this.scope.status)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/repair/address',
            method: 'PUT',
            data: {
              id: this.scope.id,
              userAddress: this.ruleFormAddress.sendAddressArea[0] + this.ruleFormAddress.sendAddressArea[1] + this.ruleFormAddress.sendAddressArea[2] + this.ruleFormAddress.sendAddress,
              userPhone: this.ruleFormAddress.userPhone,
              userName: this.ruleFormAddress.userName,
            }
          }).then(res => {
            this.$message.success(res.msg)
            this.addressDialogVisible = false
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    sendMsg(scope) {
      this.$router.push({path: '/notificationEdit', query: {userId: scope.tbAppUserDetail.userId, nickName: scope.tbAppUserDetail.nickName}})
    },
    checkItem(scope) {
      this.$router.push({path: '/orderRepairDetail', query: {id: scope.id}})
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
</style>