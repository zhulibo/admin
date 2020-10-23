<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="parentId" prop="parentId">
          <el-cascader
            :show-all-levels="false"
            v-model="ruleForm.parentId"
            :options="list"
            :props="{ expandTrigger: 'hover' ,label: 'privilege', value: 'id'}"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="privilege" prop="privilege">
          <el-input v-model="ruleForm.privilege"></el-input>
        </el-form-item>
        <el-form-item label="privilegeName" prop="privilegeName">
          <el-input v-model="ruleForm.privilegeName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemEdit',
  data() {
    return {
      userId: '',
      detail: {},
      list: [],
      ruleForm: {
        parentId: '-1',
        privilege: '',
        privilegeName: '',
      },
      rules: {
        parentId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        privilege: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        privilegeName: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    this.userId = this.$route.query.userId
    if (this.userId) this.getDetail()
    this.getRoleList()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/appuser/detail/' + this.userId,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.privilege = this.detail.privilege
        }).catch(e => {
        console.log(e)
      })
    },
    getRoleList() {
      this.$http({
        url: '/userorg/backadmin/backprivilege/privilege',
        method: 'GET',
      }).then(res => {
        this.list = res.data.child[0].child
      }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/appuser',
            method: 'PUT',
            data: {
              parentId: this.ruleForm.parentId,
              privilege: this.ruleForm.privilege,
              privilegeName: this.ruleForm.privilegeName,
            },
          }).then(res => {
            this.$message.success(res.msg)
          }).catch(e => {
            console.log(e)
          })
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
