<template>
  <div class="dialog">
    <el-dialog title="请选择供货商" :visible.sync="itemDialogVisible" @close="$emit('update:dialogVisible', false)">
      <el-form :inline="true" :model="formInline" class="table-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.remark" placeholder="备注" @keyup.enter.native="getList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="choose-list" :class="{'single-select': singleSelect}">
        <el-table :data="itemList" @selection-change="handleSelectionChange" ref="table">
          <el-table-column prop="tbAppUser" label="供货商手机号" align="center">
            <template slot-scope="scope" v-if="scope.row.tbAppUser">{{ scope.row.tbAppUser.phone | noneToLine }}</template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.remark | noneToLine }}</template>
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
        remark: '',
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
        url: 'userorg/backadmin/shop',
        method: 'GET',
        params: {
          remark: this.formInline.remark,
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
