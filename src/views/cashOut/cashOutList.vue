<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.name" placeholder="请输入昵称" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="提交申请" value="1"></el-option>
              <el-option label="同意" value="2"></el-option>
              <el-option label="拒绝" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formInline.status" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="入账" value="1"></el-option>
              <el-option label="提现" value="2"></el-option>
              <el-option label="管理员添加" value="3"></el-option>
              <el-option label="管理员减少" value="4"></el-option>
            </el-select>
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
        <el-table-column prop="createTime" label="申请时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="code" label="提现单号" align="center">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column prop="userId" label="用户id" align="center">
          <template slot-scope="scope">{{ scope.row.userId }}</template>
        </el-table-column>
        <el-table-column prop="money" label="提现金额" align="center">
          <template slot-scope="scope">{{ scope.row.money }}</template>
        </el-table-column>
        <el-table-column prop="actualAmount" label="实际转账金额" align="center">
          <template slot-scope="scope">{{ scope.row.actualAmount }}</template>
        </el-table-column>
        <el-table-column prop="type" label="提现方式" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">支付宝</span>
            <span v-else-if="scope.row.type == 2">微信</span>
            <span v-else-if="scope.row.type == 3">银行卡</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="提现方式" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">申请</span>
            <span v-else-if="scope.row.status == 2">成功</span>
            <span v-else-if="scope.row.status == 3">失败</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="changeStatus(scope.row)">操作状态</el-button>
            <el-button type="text" size="medium" class="edit" @click="changeBalance(scope.row)">修改余额</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-ct clearfix">
        <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages"
                       @current-change="handleCurrentChange" background></el-pagination>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="修改余额" :visible.sync="changeBalanceDialogVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
          <el-form-item label="加减" prop="type">
            <el-radio v-model="ruleForm.type" label="1">增加</el-radio>
            <el-radio v-model="ruleForm.type" label="2">减少</el-radio>
          </el-form-item>
          <el-form-item label="金额" prop="money">
            <el-input v-model="ruleForm.money"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="操作提现" :visible.sync="changeStatusDialogVisible">
        <el-form :model="ruleFormStatus" :rules="rulesStatus" ref="ruleFormStatus" label-width="150px" class="edit-form">
          <el-form-item label="状态" prop="status">
            <el-radio v-model="ruleFormStatus.status" label="2">同意</el-radio>
            <el-radio v-model="ruleFormStatus.status" label="3">拒绝</el-radio>
          </el-form-item>
          <el-form-item label="拒绝原因" prop="reason" v-if="ruleFormStatus.status == 3">
            <el-input v-model="ruleFormStatus.reason"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitFormStatus('ruleFormStatus')">确 定</el-button>
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
        name: '',
        status: '',
        type: '',
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
      scope: null,
      changeBalanceDialogVisible: false,
      ruleForm: {
        type: '',
        money: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        money: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
      changeStatusDialogVisible: false,
      ruleFormStatus: {
        type: '',
        money: '',
      },
      rulesStatus: {
        status: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/userorg/backadmin/shop/balance',
        method: 'GET',
        params: {
          name: this.name,
          status: this.status,
          type: this.type,
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
      this.getList()
    },
    changeBalance(scope) {
      this.scope = scope
      this.changeBalanceDialogVisible = true
    },
    changeStatus(scope) {
      this.scope = scope
      this.changeStatusDialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/shop/storeBalance',
            method: 'PUT',
            data: {
              shopId: this.scope.id,
              type: this.ruleForm.type,
              money: this.ruleForm.money,
            }
          }).then(res => {
            this.$message.success(res.msg)
            this.changeBalanceDialogVisible = false
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    submitFormStatus(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/shop/balance',
            method: 'PUT',
            data: {
              id: this.scope.id,
              status: this.ruleFormStatus.status,
              reason: this.ruleFormStatus.reason,
            }
          }).then(res => {
            this.$message.success(res.msg)
            this.changeStatusDialogVisible = false
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>