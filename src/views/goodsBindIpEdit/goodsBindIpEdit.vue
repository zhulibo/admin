<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="选择ip" prop="classifyId">
          <el-select v-model="ruleForm.ipId" placeholder="请选择">
            <el-option v-for="item in ipList" :label="item.name" :value="item.id" :key="item.id"></el-option>
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
      ipList: [],
      ruleForm: {
        ipId: '',
      },
      rules: {
        ipId: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      },
    }
  },
  created() {
    this.id = this.$route.query.id
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
          this.ipList = res.data.list
        }).catch(e => {console.log(e)})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/goods/bindip',
            method: 'POST',
            data: {
              goodsId: this.id,
              ipId: this.ruleForm.ipId,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goodsBindIp', query: {id: this.id}})
          }).catch(e => {console.log(e)})
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
