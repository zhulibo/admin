<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="热词" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="ruleForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="typeList">
          <el-select v-model="ruleForm.typeList" multiple filterable placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="brandList">
          <el-select v-model="ruleForm.brandList" multiple filterable placeholder="请选择">
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IP" prop="ipList">
          <el-select v-model="ruleForm.ipList" multiple filterable placeholder="请选择">
            <el-option
              v-for="item in ipList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性" prop="attributeList">
          <el-select v-model="ruleForm.attributeList" multiple filterable placeholder="请选择">
            <el-option
              v-for="item in attributeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
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
export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      detail: {},
      moduleList: [],
      typeList: [],
      brandList: [],
      ipList: [],
      attributeList: [],
      ruleForm: {
        name: '',
        sort: '',
        typeList: [],
        brandList: [],
        ipList: [],
        attributeList: [],
      },
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        sort: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) this.getDetail()
    this.getTypeList()
    this.getBrandList()
    this.getIpList()
    this.getAttributeList()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/goodsmanage/backadmin/hotWord/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.name = this.detail.name
          if (this.detail.sort != null) this.ruleForm.sort = this.detail.sort
          if (this.detail.types) this.ruleForm.typeList = this.detail.types.split(',').map(Number)
          if (this.detail.brands) this.ruleForm.brandList = this.detail.brands.split(',').map(Number)
          if (this.detail.ips) this.ruleForm.ipList = this.detail.ips.split(',').map(Number)
          if (this.detail.attributes) this.ruleForm.attributeList = this.detail.attributes.split(',').map(Number)
        }).catch(e => {
        console.log(e)
      })
    },
    getTypeList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/goodtypes',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.typeList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    getBrandList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/goodbrand',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.brandList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    getIpList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/goodip',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.ipList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    getAttributeList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/goodattribute',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.attributeList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/hotWord',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id,
              name: this.ruleForm.name,
              sort: this.ruleForm.sort,
              types: this.ruleForm.typeList.toString(),
              brands: this.ruleForm.brandList.toString(),
              ips: this.ruleForm.ipList.toString(),
              attributes: this.ruleForm.attributeList.toString(),
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/hotWordList'})
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
