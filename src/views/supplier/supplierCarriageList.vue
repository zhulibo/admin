<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.phone" placeholder="请输入手机号" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="setFreeShipping" icon="el-icon-plus">
        设置包邮
      </el-button>
      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建
      </el-button>
    </div>
    <div class="table">
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="shopId" label="shopId" align="center">
          <template slot-scope="scope">{{ scope.row.shopId }}</template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">省内</span>
            <span v-else-if="scope.row.type == 2">省外</span>
            <span v-else-if="scope.row.type == 3">偏远</span>
            <span v-else-if="scope.row.type == 4">到付</span>
            <span v-else-if="scope.row.type == 5">统一运费</span>
            <span v-else-if="scope.row.type == 6">满多少包邮</span>
          </template>
        </el-table-column>
        <el-table-column prop="carriagePrice" label="邮费(元)" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 6">{{ scope.row.price }}</span>
            <span v-else>{{ scope.row.carriagePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage" width="300px">
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
    <div class="dialog">
      <el-dialog title="包邮设置" :visible.sync="freeShippingDialogVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
          <el-form-item label="满多少包邮金额">
            <el-input v-model="ruleForm.price"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="freeShippingDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
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
        isAuthority: '',
        phone: '',
        homesickId: '',
        nickName: '',
      },
      tableList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: null,
      freeShippingDialogVisible: false,
      ruleForm: {
        price: ''
      },
      rules: {
        price: [
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
    getList: function () {
      this.$http({
        url: '/order/backadmin/carriage',
        method: 'GET',
        params: {
          phone: this.formInline.phone,
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.tableList = res.data
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
      this.$router.push({
        path: '/supplierCarriageEdit',
        query: {id: scope.id, shopId: scope.shopId, type: scope.type, carriagePrice: scope.carriagePrice}
      })
    },
    deleteItem(scope) {
      this.$confirm('确定删除 ' + scope.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$http({
          url: '/userorg/backadmin/shopaddress/delete/' + scope.id,
          method: 'DELETE',
        })
          .then(res => {
            this.$message.success('已删除 ' + scope.id)
            this.getList()
          })
      }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/carriage',
            method: 'POST',
            data: {
              type: 6,
              price: this.ruleForm.price,
            }
          }).then(res => {
            this.$message.success(res.msg)
            this.freeShippingDialogVisible = false
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    newItem() {
      this.$router.push({path: '/supplierCarriageEdit'})
    },
    setFreeShipping() {
      this.freeShippingDialogVisible = true
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>