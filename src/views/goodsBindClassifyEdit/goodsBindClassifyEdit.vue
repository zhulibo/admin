<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="分类类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option label="普通分类" value="2"></el-option>
            <el-option label="首页分类" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择分类" prop="classifyId">
          <el-select v-model="ruleForm.classifyId" placeholder="请选择">
            <el-option v-for="item in classifyList" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      classifyList: [],
      ruleForm: {
        type: '2',
        classifyId: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        classifyId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    this.id = this.$route.query.id
    this.goodsType = this.$route.query.goodsType
  },
  mounted() {
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    getClassifyList() {
      this.$http({
        url: '/goodsmanage/backadmin/classify',
        method: 'GET',
        params: {
          name: this.name,
          level: 2,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyList = res.data.list
        }).catch(e => {console.log(e)})
    },
    getClassifyIndexList() {
      this.$http({
        url: '/goodsmanage/backadmin/indexclassify/indexclassify',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          let list = res.data.list
          for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].children.length; j++) {
              this.classifyList.push({
                id: list[i].children[j].id,
                name: list[i].children[j].name,
              })
            }
          }
        }).catch(e => {console.log(e)})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/goods/bindgoods',
            method: 'POST',
            data: {
              goodsType: this.goodsType,
              type: this.ruleForm.type,
              classifyId: this.ruleForm.classifyId,
              goodsId: this.id,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goodsBindClassify', query: {id: this.id}})
          }).catch(e => {console.log(e)})
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
  },
  watch: {
    'ruleForm.type': {
      handler: function (val) {
        this.classifyList = []
        this.ruleForm.classifyId = ''
        if(val == 2) {
          this.getClassifyList()
        }else if(val == 1) {
          this.getClassifyIndexList()
        }
      },
      immediate: true
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>
