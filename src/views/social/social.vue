<template>
  <div>
    <div class="table-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
      <div class="sch">
        <el-form :inline="true" :model="formInline" class="table-form-inline">
          <el-form-item label="动态类型">
            <el-select v-model="formInline.type" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="图片" value="1"></el-option>
              <el-option label="视频" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否删除">
            <el-select v-model="formInline.del" placeholder="请选择" @change="getList">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.goodId" placeholder="请输入商品id" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.isUser" placeholder="请输入发布人id" @keyup.enter.native="getList"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="yyyy-MM-dd HH:mm"
              value-format="timestamp"
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
      <el-table :data="tableList" v-loading="loading">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="title" label="动态标题" align="center">
          <template slot-scope="scope">{{ scope.row.title | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="content" label="内容" align="center">
          <template slot-scope="scope">{{ scope.row.content | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="isUser" label="发布人" align="center">
          <template slot-scope="scope">{{ scope.row.isUser | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="commentNum" label="评论数" align="center">
          <template slot-scope="scope">{{ scope.row.commentNum | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="supportNum" label="点赞数" align="center">
          <template slot-scope="scope">{{ scope.row.supportNum | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="shareNum" label="分享量" align="center">
          <template slot-scope="scope">{{ scope.row.shareNum | noneFilter }}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | dateFormat }}</template>
        </el-table-column>
        <el-table-column prop="del" label="是否屏蔽" align="center" class-name="row-switch">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.del"
              :active-value="1"
              :inactive-value="0"
              @change=switchStatus(scope.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
<!--            <el-button type="text" @click="delete(scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-ct">
      <el-pagination layout="prev, pager, next, jumper" :current-page.sync="currentPage" :page-count="totalPages" @current-change="handleCurrentChange" background></el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'social',
    data() {
      return {
        formInline: {
          type: null,
          del: null,
          goodId: '',
          isUser: '',
          time: '',
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
        loading: false, // 加载中
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
      getList: function() {
        this.$http({
          url: '/userorg/backadmin/article',
          method: 'GET',
          params: {
            type: this.formInline.type,
            del: this.formInline.del,
            goodId: this.formInline.goodId,
            isUser: this.formInline.isUser,
            pageSize: this.pageSize,
            pageNumber: this.currentPage,
          }
        })
          .then(res => {
            this.tableList = res.data.list
            this.totalPages = res.data.pages
            this.currentPage = res.data.pageNum
          })
      },
      handleCurrentChange: function(val) { // 页码变更
        this.currentPage = val;
        this.getList()
      },
      switchStatus(scope){
        this.loading = true
        this.$http({
          url: '/userorg/backadmin/appuser',
          method: 'PUT',
          data: {
            userId: scope.userId,
            del: scope.del
          }
        }).then(res => {
          this.loading = false
          this.$message({
            type: 'success',
            message: res.msg,
          });
          this.getList()
        })
      },
      edit(scope) {
        this.$router.push({path: '/socialEdit', query: {userId: scope.userId}})
      },
    }
  }
</script>

<style lang="stylus" scoped>
</style>