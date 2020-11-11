<template>
  <div class="dialog">
    <el-dialog title="请选择用户" :visible.sync="itemDialogVisible" @close="$emit('update:dialogVisible', false)">
      <el-form :inline="true" :model="formInline" class="table-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.nickName" placeholder="请输入用户昵称" @keyup.enter.native="getList"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.homesickId" placeholder="请输入用户漫想家id" @keyup.enter.native="getList"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.phone" placeholder="请输入用户手机号" @keyup.enter.native="getList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="choose-list" :class="{'single-select': singleSelect}">
        <el-table :data="itemList" @selection-change="handleSelectionChange" ref="table">
          <el-table-column prop="homesickId" label="漫想家id" align="center">
            <template slot-scope="scope">{{ scope.row.homesickId | noneToLine }}</template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.nickName | noneToLine }}</template>
          </el-table-column>
          <el-table-column prop="header" label="头像" align="center" class-name="row-img">
            <template slot-scope="scope">
              <img :src="scope.row.header" alt="">
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55"></el-table-column>
        </el-table>
        <div class="pagination-ct clearfix">
          <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage"
                         :page-count="totalPages"
                         @current-change="handleCurrentChange" background></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmSelectItem">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'selectItem',
  props: {
    dialogVisible: {},
    singleSelect: {
      default: false
    },
  },
  data() {
    return {
      itemDialogVisible: this.dialogVisible,
      formInline: {
        nickName: '',
        homesickId: '',
        phone: '',
      },
      itemList: [],
      pageSize: 6,
      currentPage: 1,
      totalPages: null,
      multipleSelection: [],
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList() {
      this.$http({
        url: '/userorg/backadmin/appuser',
        method: 'GET',
        params: {
          phone: this.formInline.phone,
          homesickId: this.formInline.homesickId,
          nickName: this.formInline.nickName,
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          this.itemList = res.data.list
          this.totalPages = res.data.pages
          this.currentPage = res.data.pageNum
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.getList()
    },
    handleSelectionChange(val) {
      if (this.singleSelect && val.length > 1) { // 单选状态下，选择item时，清掉其他item
        this.$refs.table.clearSelection()
        this.$refs.table.toggleRowSelection(val[val.length - 1])
        val.shift()
      }
      this.multipleSelection = val
    },
    confirmSelectItem() {
      this.$emit('confirmSelectItem', this.multipleSelection)
    },
  },
  watch: {
    dialogVisible () {
      this.itemDialogVisible = this.dialogVisible
    },
  }
}
</script>

<style lang="stylus" scoped>
// 隐藏全选
>>> .single-select .el-table__header .el-checkbox{
  display: none
}
</style>
