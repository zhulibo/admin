<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="passWord">
          <el-input v-model="ruleForm.passWord"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="tbBackRoleList">
          <el-select v-model="ruleForm.tbBackRoleList" multiple placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch
            v-model="ruleForm.status"
            :active-value="0"
            :inactive-value="1">
          </el-switch>
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
      roleList: [],
      detail: {},
      ruleForm: {
        phone: '',
        name: '',
        passWord: '',
        tbBackRoleList: [],
        status: 0,
      },
      rules: {
        phone: [],
        name: [],
        passWord: [],
        tbBackRoleList: [],
        status: [],
      },
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) this.getDetail();
    this.getRoleList()
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
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/user/' + this.id,
        method: 'GET',
      }).then(res => {
        this.detail = res.data
        this.ruleForm.phone = this.detail.phone
        this.ruleForm.passWord = this.detail.passWord
        this.ruleForm.name = this.detail.name
        this.ruleForm.status = this.detail.status
        for (let i = 0; i < this.detail.tbBackRoleList.length; i++){
          this.ruleForm.tbBackRoleList.push(this.detail.tbBackRoleList[i].id)
        }
      }).catch(res => {console.log(res)})
    },
    getRoleList: function () {
      this.$http({
        url: '/userorg/backadmin/backrole',
        method: 'GET',
      })
        .then(res => {
          this.roleList = res.data.list
        }).catch(res => {console.log(res)})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let tbBackRoleList = []
        for (let i = 0; i < this.ruleForm.tbBackRoleList.length; i++){
          tbBackRoleList.push({id: this.ruleForm.tbBackRoleList[i]})
        }
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/user',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id,
              phone: this.ruleForm.phone,
              name: this.ruleForm.name,
              passWord: this.ruleForm.passWord,
              tbBackRoleList: tbBackRoleList,
              status: this.ruleForm.status,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/admin'})
          }).catch(res => {console.log(res)})
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
