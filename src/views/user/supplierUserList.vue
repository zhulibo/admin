<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.userId" placeholder="审核人id" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.remark" placeholder="备注" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="提交开始时间"
              end-placeholder="提交结束时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="getList"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="formInline.time2"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="处理开始时间"
              end-placeholder="处理结束时间"
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
    <el-button type="primary" plain size="mini" @click="exportOrderData()">导出</el-button>
    <div class="table">
      <el-table :data="tableList" id="out-table">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="申请时间" align="center">
          <template slot-scope="scope">{{ scope.row.submitTime | timestampToDate }}</template>
        </el-table-column>
        <el-table-column prop="certificate" label="营业执照图片" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img v-if="scope.row.certificate" :src="scope.row.certificate" alt="">
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="qualification" label="品牌资质" align="center" class-name="row-img">
          <template slot-scope="scope">
            <img v-if="scope.row.qualification" :src="scope.row.qualification" alt="">
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="serviceRatio" label="服务费比例" align="center">
          <template slot-scope="scope">{{ scope.row.serviceRatio | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待审核</span>
            <span v-else-if="scope.row.status == 2">审核通过</span>
            <span v-else-if="scope.row.status == 3">审核未通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="failReason" label="拒绝原因" align="center">
          <template slot-scope="scope">{{ scope.row.failReason | noneToLine }}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.remark | noneToLine }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
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
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'item',
  data() {
    return {
      formInline: {
        userId: '',
        remark: '',
        time: [],
        time2: [],
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
    }
  },
  created() {
    this.currentPage = this.global.getContextData('currentPage') || 1  // 获取缓存的页码
    this.getList()
  },
  mounted() {
  },
  methods: {
    exportOrderData() {
      let xlsxParam = { raw: true };
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'),xlsxParam);
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '供应在售商品.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    getList: function () {
      this.$http({
        url: 'userorg/backadmin/shop',
        method: 'GET',
        params: {
          userId: this.formInline.userId,
          remark: this.formInline.remark,
          subStart: this.formInline.time ? this.formInline.time[0] : '',
          subEnd: this.formInline.time ? this.formInline.time[1] : '',
          checkStart: this.formInline.time ? this.formInline.time2[0] : '',
          checkEnd: this.formInline.time ? this.formInline.time2[1] : '',
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
    editItem(scope) {
      this.$router.push({path: '/supplierUserEdit', query: {id: scope.id}})
    },
    changeBalance(scope) {
      this.scope = scope
      this.changeBalanceDialogVisible = true
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
  }
}
</script>

<style lang="stylus" scoped>
</style>