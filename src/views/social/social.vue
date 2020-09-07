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
          <el-form-item label="是否屏蔽">
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
      <el-table :data="tableList">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | timestampToDate}}</template>
        </el-table-column>
        <el-table-column prop="title" label="动态标题" align="center">
          <template slot-scope="scope">{{scope.row.title | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="content" label="内容" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.content | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="isUser" label="发布人id" align="center">
          <template slot-scope="scope">{{scope.row.isUser | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="commentNum" label="评论数" align="center">
          <template slot-scope="scope">{{scope.row.commentNum | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="supportNum" label="点赞数" align="center">
          <template slot-scope="scope">{{scope.row.supportNum | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="shareNum" label="分享量" align="center">
          <template slot-scope="scope">{{scope.row.shareNum | noneToLine}}</template>
        </el-table-column>
        <el-table-column prop="del" label="是否屏蔽" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.del == 0">正常</span>
            <span v-else-if="scope.row.del == 1">已屏蔽</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="row-manage">
          <template slot-scope="scope">
            <el-button type="text" size="medium" class="detail" @click="goSocialCommentList(scope.row)">查看评论</el-button>
            <el-button type="text" size="medium" class="edit" @click="editItem(scope.row)">编辑</el-button>
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
export default {
  name: 'item',
  data() {
    return {
      formInline: {
        type: null,
        del: null,
        goodId: '',
        isUser: '',
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
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    getList: function () {
      this.$http({
        url: '/userorg/backadmin/article',
        method: 'GET',
        params: {
          type: this.formInline.type,
          del: this.formInline.del,
          goodId: this.formInline.goodId,
          isUser: this.formInline.isUser,
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
      this.currentPage = val
      this.getList()
    },
    editItem(scope) {
      this.$router.push({path: '/socialEdit', query: {id: scope.id}})
    },
    goSocialCommentList(scope) {
      this.$router.push({path: '/socialComment', query: {articleId: scope.id}})
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>