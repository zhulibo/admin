<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
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
        <el-form-item v-if="!id" label="是否供货商" prop="isSupplier">
          <el-switch
            v-model="ruleForm.isSupplier"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="ruleForm.isSupplier" label="选择漫想家用户" prop="nickName">
          <el-input v-model="ruleForm.nickName" @focus="openSelectDialog"></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.isSupplier" label="营业执照图片" prop="certificate" class="form-item-img-logo">
          <img-upload v-model="ruleForm.certificate" :options="certificateImgOptions"></img-upload>
        </el-form-item>
        <el-form-item v-if="ruleForm.isSupplier" label="品牌资质" prop="qualification" class="form-item-img-top">
          <img-upload v-model="ruleForm.qualification" :options="qualificationImgOptions"></img-upload>
        </el-form-item>
        <el-form-item v-if="ruleForm.isSupplier" label="服务费比例" prop="serviceRatio">
          <el-input v-model="ruleForm.serviceRatio" :rules="rules.serviceRatio">
          </el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.isSupplier" label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark" maxlength="200" rows="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <select-user @confirmSelectItem="confirmSelectItem" :dialogVisible.sync="selectItemOption.dialogVisible" :singleSelect="selectItemOption.singleSelect"></select-user>
  </div>
</template>

<script>
import selectUser from "@/components/selectItem/selectUser";

const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      roleList: [],
      detail: {},
      certificateImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      qualificationImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        phone: '',
        name: '',
        passWord: '',
        tbBackRoleList: [],
        isSupplier: 0,
        userId: '',
        nickName: '',
        certificate: [],
        qualification: [],
        serviceRatio: '',
        remark: '',
      },
      rules: {
        phone: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
        name: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
        passWord: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        tbBackRoleList: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
        nickName: [
          {required: true, message: '请选择', trigger: 'change'},
        ],
        serviceRatio: [
          {required: true, message: '请选择', trigger: 'change'},
          {type: 'number', message: '此项须为数字', trigger: 'change', transform: Number},
        ],
      },
      selectItemOption: { // 选择组件配置参数
        dialogVisible: false,
        singleSelect: true, // 只可以单选
      },
    }
  },
  components: {
    imgUpload,
    selectUser,
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) this.getDetail();
    this.getRoleList()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/userorg/backadmin/user/' + this.id,
        method: 'GET',
      }).then(res => {
        this.detail = res.data
        this.ruleForm.phone = this.detail.phone
        this.ruleForm.passWord = this.detail.passWord
        this.ruleForm.name = this.detail.name
        for (let i = 0; i < this.detail.tbBackRoleList.length; i++) {
          this.ruleForm.tbBackRoleList.push(this.detail.tbBackRoleList[i].id)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getRoleList: function () {
      this.$http({
        url: '/userorg/backadmin/backrole',
        method: 'GET',
      })
        .then(res => {
          this.roleList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    openSelectDialog() {
      this.selectItemOption.dialogVisible = true
    },
    confirmSelectItem(multipleSelection) {
      console.log(multipleSelection)
      let ids = []
      for (let i = 0; i < multipleSelection.length; i++) {
        ids.push({
          userId: multipleSelection[i].userId,
          nickName: multipleSelection[i].nickName,
        })
      }
      console.log(ids)
      this.ruleForm.userId = ids[0].userId
      this.ruleForm.nickName = ids[0].nickName
      this.selectItemOption.dialogVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let tbBackRoleList = []
        for (let i = 0; i < this.ruleForm.tbBackRoleList.length; i++) {
          tbBackRoleList.push({id: this.ruleForm.tbBackRoleList[i]})
        }
        let tbShop = {}
        if(!this.id && this.ruleForm.isSupplier) {
          tbShop = {
            userId: this.ruleForm.userId,
            certificate: this.ruleForm.certificate[0],
            qualification: this.ruleForm.qualification[0],
            serviceRatio: this.ruleForm.serviceRatio,
            remark: this.ruleForm.remark,
            status: 2,
          }
        }
        if (valid) {
          this.$http({
            url: this.ruleForm.isSupplier ? '/userorg/backadmin/user/insertShop' : '/userorg/backadmin/user',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id,
              phone: this.ruleForm.phone,
              name: this.ruleForm.name,
              passWord: this.ruleForm.passWord,
              tbBackRoleList: tbBackRoleList,
              tbShop: tbShop
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/adminList'})
          }).catch(e => {
            console.log(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    chooseUser() {
      this.userDialogVisible = true
      this.getUserList()
    },
    getUserList() {
      this.$http({
        url: '/userorg/backadmin/appuser',
        method: 'GET',
        params: {
          phone: this.formInline2.phone,
          homesickId: this.formInline2.homesickId,
          nickName: this.formInline2.nickName,
          pageSize: this.pageSize2,
          pageNumber: this.currentPage2,
        }
      })
        .then(res => {
          this.userList = res.data.list
          this.totalPages2 = res.data.pages
          this.currentPage2 = res.data.pageNum
        }).catch(e => {
        console.log(e)
      })
    },
    handleCurrentChange2: function (val) { // 页码变更
      this.currentPage2 = val
      this.getUserList()
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.table.clearSelection()
        this.$refs.table.toggleRowSelection(val.pop())
      }
      this.multipleSelection = val;
    },
    confirm() {
      this.ruleForm.userId = this.multipleSelection[0].userId
      this.ruleForm.nickName = this.multipleSelection[0].nickName
      this.userDialogVisible = false
    },
  },
}
</script>

<style lang="stylus" scoped>
// 隐藏全选
>>> .el-table__header .el-checkbox{
  display: none
}
</style>
