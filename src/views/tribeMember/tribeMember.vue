<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="提交审核" value="1"></el-option>
              <el-option label="已拒绝" value="2"></el-option>
              <el-option label="已通过" value="3"></el-option>
              <el-option label="被踢出" value="4"></el-option>
            </el-select>
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
      <el-table :data="tableList" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="userId" label="id" align="center">
          <template slot-scope="scope">{{scope.row.id | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="remark" label="申请内容" align="center">
          <template slot-scope="scope">{{scope.row.remark | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="applyImage" label="申请图片" align="center" class-name="row-img">
          <template slot-scope="scope"><img :src="scope.row.applyImage" alt=""></template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">提交审核</span>
            <span v-if="scope.row.status == 2">已拒绝</span>
            <span v-if="scope.row.status == 3">已通过</span>
            <span v-if="scope.row.status == 4">被踢出</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand" :show-timeout="50">
              <span class="el-dropdown-link">操作<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="beforeHandleCommand(scope.row,'3')">通过</el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(scope.row,'2')">拒绝</el-dropdown-item>
                <el-dropdown-item :command="beforeHandleCommand(scope.row,'4')">踢出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-ct clearfix">
        <div class="manage-batch">
          <el-dropdown @command="handleCommand" :show-timeout="50">
            <el-button size="small" class="el-dropdown-link">批量操作</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="3">通过</el-dropdown-item>
              <el-dropdown-item command="2">拒绝</el-dropdown-item>
              <el-dropdown-item command="4">踢出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages"
                       @current-change="handleCurrentChange" background></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'item',
  data() {
    return {
      formInline: {
        status: '',
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
      multipleSelection: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getList()
  },
  mounted() {
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/userorg/backadmin/tribe/userlist',
        method: 'GET',
        params: {
          id: this.id,
          status: this.formInline.status,
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
        }).catch(e => {console.log(e)})
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val;
      this.getList()
    },
    editItem(scope) {
      this.$router.push({path: '/tribeEdit', query: {id: scope.id}})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    beforeHandleCommand(row, command){
      return {
        'row': row,
        'command':command
      }
    },
    handleCommand(command) {
      let type = Object.prototype.toString.call(command)
      let ids = []
      let status = ''
      if(type == '[object Object]') {
        ids = command.row.id
        status = command.command
      }else{
        ids = this.multipleSelection
        status = command
      }
      this.$http({
        url: '/userorg/backadmin/tribe/updatetribeuser',
        method: 'PUT',
        params: {
          ids: ids,
          status: status
        }
      })
        .then(res => {
          this.$message.success(res.msg)
        }).catch(e => {console.log(e)})
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>