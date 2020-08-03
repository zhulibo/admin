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
        <el-form-item label="账户状态" prop="status">
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
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'appEdit',
    data() {
      return {
        userId: '',
        detail: {},
        ruleForm: {
          phone: '',
          name: '',
          passWord: '',
          status: '',
        },
        rules: {
          phone: [
          ],
          name: [
          ],
          passWord: [
          ],
          status: [
          ],
        },
      }
    },
    created() {
      this.userId = this.$route.query.userId
      this.ruleForm.phone = this.$route.query.phone
      this.ruleForm.name = this.$route.query.name
      this.ruleForm.passWord = this.$route.query.passWord
      this.ruleForm.status = this.$route.query.status
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              url: '/userorg/backadmin/user',
              method: 'PUT',
              data: {
                id: this.userId,
                phone: this.ruleForm.phone,
                name: this.ruleForm.name,
                passWord: this.ruleForm.passWord,
                status: this.ruleForm.status,
              },
            }).then(res => {
              if (res.code == 0){
                this.$message({
                  type: 'success',
                  message: res.msg
                });
                this.$router.push({path: '/admin'})
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                });
              }
            })
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
