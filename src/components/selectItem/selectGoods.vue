<template>
  <div class="dialog">
    <el-dialog title="请选择要绑定的商品" :visible.sync="itemDialogVisible" @close="$emit('update:dialogVisible', false)">
      <el-form :inline="true" :model="formInline" class="table-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="请选择">
            <el-option v-if="itemType[0]" label="普通商品" value="1"></el-option>
            <el-option v-if="itemType[1]" label="预售商品" value="2"></el-option>
            <el-option v-if="itemType[2]" label="抽奖商品" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.name" placeholder="请输入商品名称" @keyup.enter.native="getList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="choose-list" :class="{'single-select': singleSelect}">
        <el-table :data="goodsList" @selection-change="handleSelectionChange">
          <el-table-column prop="id" label="商品id" align="center">
            <template slot-scope="scope">{{ scope.row.id | noneToLine }}</template>
          </el-table-column>
          <el-table-column prop="title" label="商品名称" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.title | noneToLine }}</template>
          </el-table-column>
          <el-table-column prop="listedImage" label="商品图片" align="center" class-name="row-img">
            <template slot-scope="scope">
              <img :src="scope.row.listedImage" alt="">
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
    itemType: {},
    singleSelect: {
      default: false
    },
  },
  data() {
    return {
      itemDialogVisible: this.dialogVisible,
      formInline: {
        type: '1',
        name: '',
      },
      goodsList: [],
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
      let url = ''
      if (this.formInline.type == 1) {
        url = '/goodsmanage/backadmin/goods'
      } else if (this.formInline.type == 2) {
        url = '/goodsmanage/backadmin/presellgoods'
      } else if (this.formInline.type == 3) {
        url = '/goodsmanage/backadmin/drawgoods'
      }
      this.$http({
        url: url,
        method: 'GET',
        params: {
          title: this.formInline.name,
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
          if(this.formInline.type == '3'){
            for (let i = 0; i < res.data.list.length; i++) {
              try {
                res.data.list[i].title = res.data.list[i].tbGoods.title
                res.data.list[i].listedImage = res.data.list[i].tbGoods.listedImage
                res.data.list[i].goodsId = res.data.list[i].tbGoods.id
              }catch (e){
                console.log(e)
              }
            }
          }
          this.goodsList = res.data.list
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
        this.$refs.table.toggleRowSelection(val.pop())
      }
      this.multipleSelection = val
    },
    confirmSelectItem() {
      this.$emit('confirmSelectItem', this.formInline.type, this.multipleSelection)
    },
  },
  watch: {
    dialogVisible () {
      this.itemDialogVisible = this.dialogVisible
    },
    'formInline.type': {
      handler: function () {
        this.currentPage = 1
        this.getList()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// 隐藏全选
>>> .single-select .el-table__header .el-checkbox{
  display: none
}
</style>
