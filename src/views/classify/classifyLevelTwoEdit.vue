<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="绑定模块" prop="classifyArr">
          <el-cascader
            v-model="ruleForm.classifyArr"
            :options="classifyAllList"
            :props="{ value: 'id', label: 'name', children: 'classifies' }">
          </el-cascader>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" prop="classifyImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.classifyImg" :options="classifyImgOptions"></img-upload>
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
const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      detail: {},
      classifyAllList: [],
      typeList: [],
      brandList: [],
      ipList: [],
      attributeList: [],
      classifyImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        classifyArr: [],
        name: '',
        classifyImg: [],
        sort: '',
        typeList: [],
        brandList: [],
        ipList: [],
        attributeList: [],
      },
      rules: {
        classifyArr: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        classifyImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        sort: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  components: {
    imgUpload
  },
  created() {
    this.id = this.$route.query.id
    this.getClassifyAllList()
    this.getClassifyList()
    this.getModuleList()
    this.getTypeList()
    this.getBrandList()
    this.getIpList()
    this.getAttributeList()
    if (this.id) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/goodsmanage/backadmin/classify/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.type = this.detail.type
          this.ruleForm.classifyArr = [this.detail.parentId, this.detail.modelId]
          this.ruleForm.name = this.detail.name
          if (this.detail.image) this.classifyImgOptions.fileList.push({url: this.detail.image}) // 图片回显
          if (this.detail.sort != null) this.ruleForm.sort = this.detail.sort
          if (this.detail.types) this.ruleForm.typeList = this.detail.types.split(',').map(Number)
          if (this.detail.brands) this.ruleForm.brandList = this.detail.brands.split(',').map(Number)
          if (this.detail.ips) this.ruleForm.ipList = this.detail.ips.split(',').map(Number)
          if (this.detail.attributes) this.ruleForm.attributeList = this.detail.attributes.split(',').map(Number)
        }).catch(e => {
        console.log(e)
      })
    },
    getClassifyAllList() {
      this.$http({
        url: '/goodsmanage/backadmin/classify/pre',
        method: 'GET',
        params: {
          level: 1,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          res.data.map((value,index,arry)=>{
            res.data[index].classifies = res.data[index].models
            for (let i = 0; i < res.data[index].classifies.length; i++) {
              res.data[index].classifies[i].classifies = null
            }
          })
          this.classifyAllList = res.data

          this.$set(this.classifyAllList[0], 'active', true)
          this.moduleList = this.classifyAllList[0].models
        }).catch(e => {
        console.log(e)
      })
    },
    getClassifyList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/classify',
        method: 'GET',
        params: {
          level: 1,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyList = res.data.list
        }).catch(e => {
        console.log(e)
      })
    },
    getModuleList: function () {
      this.$http({
        url: '/goodsmanage/backadmin/model',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.moduleList = res.data.list
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
            url: '/goodsmanage/backadmin/classify',
            method: this.id ? 'PUT' : 'POST',
            data: {
              type: 1,
              id: this.id ? this.id : '',
              level: 2,
              parentId: this.ruleForm.classifyArr[0],
              modelId: this.ruleForm.classifyArr[1],
              name: this.ruleForm.name,
              image: this.ruleForm.classifyImg[0],
              sort: this.ruleForm.sort,
              typesList: this.ruleForm.typeList,
              brandList: this.ruleForm.brandList,
              ipList: this.ruleForm.ipList,
              attributeList: this.ruleForm.attributeList,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/classifyLevelTwoList'})
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