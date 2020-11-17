<template>
  <div class="dialog">
    <el-dialog title="请选择要绑定的目标" :visible.sync="itemDialogVisible" @close="$emit('update:dialogVisible', false)">
      <el-form :inline="true" :model="formInline" class="table-form-inline">
        <el-form-item label="">
          <el-select v-model="formInline.type" placeholder="请选择">
            <el-option v-if="itemType[0]" label="品牌" value="1"></el-option>
            <el-option v-if="itemType[1]" label="类别" value="2"></el-option>
            <el-option v-if="itemType[2]" label="属性" value="3"></el-option>
            <el-option v-if="itemType[3]" label="ip" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.name" placeholder="请输入名称" @keyup.enter.native="getList"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="choose-list" :class="{'single-select': singleSelect}">
        <el-table :data="goodsList" @selection-change="handleSelectionChange" ref="table">
          <el-table-column prop="id" label="id" align="center">
            <template slot-scope="scope">{{ scope.row.id | noneToLine }}</template>
          </el-table-column>
          <el-table-column prop="name" label="名称" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.name | noneToLine }}</template>
          </el-table-column>
<!--          <el-table-column prop="listedImage" label="图片" align="center" class-name="row-img">-->
<!--            <template slot-scope="scope">-->
<!--              <img :src="scope.row.listedImage" alt="">-->
<!--            </template>-->
<!--          </el-table-column>-->
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
        type: '',
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
  },
  mounted() {
  },
  methods: {
    getList() {
      let url = ''
      if (this.formInline.type == 1) {
        url = '/goodsmanage/backadmin/goodbrand'
      } else if (this.formInline.type == 2) {
        url = '/goodsmanage/backadmin/goodtypes'
      } else if (this.formInline.type == 3) {
        url = '/goodsmanage/backadmin/goodattribute'
      } else if (this.formInline.type == 4) {
        url = '/goodsmanage/backadmin/goodip'
      }
      this.$http({
        url: url,
        method: 'GET',
        params: {
          name: this.formInline.name,
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
        }
      })
        .then(res => {
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
        this.$refs.table.toggleRowSelection(val[val.length - 1])
        val.shift()
      }
      this.multipleSelection = val
    },
    confirmSelectItem() {
      this.$emit('confirmSelectItem2', this.formInline.type, this.multipleSelection)
    },
  },
  watch: {
    dialogVisible () {
      this.itemDialogVisible = this.dialogVisible
    },
    'itemType': {
      handler: function () {
        console.log(this.itemType)
        if(this.itemType[0] == true){
          console.log('品牌')
          this.formInline.type = '1'
        }else if(this.itemType[1] == true){
          console.log('类别')
          this.formInline.type = '2'
        }else if(this.itemType[2] == true){
          console.log('属性')
          this.formInline.type = '3'
        }else if(this.itemType[3] == true){
          console.log('ip')
          this.formInline.type = '4'
        }
      }
    },
    'formInline.type': {
      handler: function () {
        this.currentPage = 1
        this.formInline.name = ''
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
