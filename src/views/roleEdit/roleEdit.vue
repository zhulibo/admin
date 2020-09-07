<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述(200字以内)" prop="description">
          <el-input type="textarea" v-model="ruleForm.description" maxlength="200" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="分配权限" prop="privilegeIds" class="form-item-tree">
          <el-tree
            ref="tree"
            :data="roleList"
            :default-expanded-keys="ruleForm.privilegeIds"
            :default-checked-keys="ruleForm.privilegeIds"
            show-checkbox
            node-key="id"
            :props="{label: 'privilegeName',children: 'child'}"
            @check-change="getCheckedKeys">
          </el-tree>
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
      id: '',
      detail: {},
      roleList: [],
      checkedKeys: [],
      ruleForm: {
        roleName: '',
        description: '',
        privilegeIds: [],
      },
      rules: {
        roleName: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        description: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        privilegeIds: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
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
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/backrole',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id,
              roleName: this.ruleForm.roleName,
              description: this.ruleForm.description,
              privilegeIds: this.ruleForm.privilegeIds,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/role'})
          }).catch(e => {console.log(e)})
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    getCheckedKeys() {
      this.ruleForm.privilegeIds = this.$refs.tree.getCheckedKeys(true)
    },
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/backrole/' + this.id,
        method: 'GET',
      }).then(res => {
        this.detail = res.data
        this.ruleForm.roleName = this.detail.roleName
        this.ruleForm.description = this.detail.description
        this.ruleForm.privilegeIds = this.detail.privilegeIds
      }).catch(e => {console.log(e)})
    },
    getRoleList() {
      this.$http({
        url: '/userorg/backadmin/backprivilege/privilege',
        method: 'GET',
      }).then(res => {
        this.roleList = res.data.child[0].child
      }).catch(e => {console.log(e)})
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
