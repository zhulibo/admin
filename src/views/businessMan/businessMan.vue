<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
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
      <!--      <el-button class="new-btn" type="primary" plain round size="medium" @click="newItem" icon="el-icon-plus">新建</el-button>-->
    </div>
    <div class="table">
      <el-table :data="tableList">
<!--      <el-table :data="tableList" v-loading="loading">-->
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
          <template slot-scope="scope">{{scope.row.phone | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickName | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <template slot-scope="scope">{{scope.row.sex | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="homesickId" label="漫想家id" align="center">
          <template slot-scope="scope">{{scope.row.homesickId | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="signature" label="签名" align="center">
          <template slot-scope="scope">{{scope.row.signature | noneToLine}}</template>
        </el-table-column>
        <!--        <el-admin-column label="img" align="center" class-name="row-img">-->
        <!--          <template slot-scope="scope">-->
        <!--            <img :src="scope.row.iconUrl" alt="">-->
        <!--          </template>-->
        <!--        </el-admin-column>-->
        <el-table-column prop="del" label="账号状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.del == 0">正常</span>
            <span v-if="scope.row.del == 1">停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" class-name="row-manage">
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
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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
      // loading: false, // 加载中
    }
  },
  created() {
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
        url: 'goodsmanage/backadmin/shop',
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
        }).catch(e => {console.log(e)})
    },
    handleCurrentChange: function (val) { // 页码变更
      this.currentPage = val;
      this.getList()
    },
    // switchStatus(scope) {
    //   this.loading = true
    //   this.$http({
    //     url: '/userorg/backadmin/appuser',
    //     method: 'PUT',
    //     data: {
    //       userId: scope.userId,
    //       del: scope.del
    //     }
    //   }).then(res => {
    //     this.loading = false
    //     this.$message.success(res.msg)
    //     this.getList()
    //   }).catch(e => {console.log(e)})
    // },
    // deleteItem(scope) {
    //   this.$confirm('确定删除 ' + scope.softName, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'info'
    //   }).then(() => {
    //     this.$http({
    //       url: '/backSoftware/delSoftware',
    //       method: 'DELETE',
    //       params: {
    //         userId: this.userInfo.userId,
    //         softId: scope.softId,
    //       }
    //     })
    //       .then(res => {
    //         if(res.code == 204) {
    //           this.$message({
    //             type: 'success',
    //             message: '已删除 ' + scope.softName,
    //           });
    //           this.getList()
    //         }else {
    //           this.$message({
    //             type: 'error',
    //             message: res.data.message
    //           })
    //         }
    //       }).catch(e => {console.log(e)})
    //   }).catch(e => {console.log(e)})
    // },
    editItem(scope) {
      this.$router.push({path: '/userEdit', query: {userId: scope.userId}})
    },
    // newItem() {
    //   this.$router.push({path: '/userEdit'})
    // },
  }
}
</script>

<style lang="stylus" scoped>
</style>