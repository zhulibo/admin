<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="列表图" prop="listedImg" class="form-item-img-logo">
          <img-upload v-model="ruleForm.listedImg" :options="listedImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="轮播图" prop="bannerImg" class="form-item-img-logo">
          <img-upload v-model="ruleForm.bannerImg" :options="bannerImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="详情图" prop="contentImg" class="form-item-img-logo">
          <img-upload v-model="ruleForm.contentImg" :options="contentImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="官网维护销量" prop="sellNumber">
          <el-input v-model="ruleForm.sellNumber"></el-input>
        </el-form-item>
        <el-form-item label="材质" prop="material">
          <el-input v-model="ruleForm.material"></el-input>
        </el-form-item>
        <el-form-item label="尺寸" prop="size">
          <el-input v-model="ruleForm.size"></el-input>
        </el-form-item>
        <el-form-item label="货号" prop="cargoNo">
          <el-input v-model="ruleForm.cargoNo"></el-input>
        </el-form-item>
        <el-form-item label="排序分值" prop="sort">
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
      typeList: [],
      brandList: [],
      ipList: [],
      attributeList: [],
      listedImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      bannerImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 5
      },
      contentImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
      },
      ruleForm: {
        title: '',
        listedImg: [],
        bannerImg: [],
        contentImg: [],
        material: '',
        size: '',
        cargoNo: '',
        sellNumber: '',
        sort: '',
        typeList: [],
        brandList: [],
        ipList: [],
        attributeList: [],
      },
      rules: {
        title: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        listedImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        bannerImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        contentImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        material: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        size: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        cargoNo: [
          // {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  components: {
    imgUpload,
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
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/goodsmanage/backadmin/goods/detail',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.title = this.detail.title
          this.listedImgOptions.fileList.push({url: this.detail.listedImage}) // 图片回显
          for (let i = 0; i < this.detail.images.length; i++) {
            if (this.detail.images[i].type == 1) {
              this.bannerImgOptions.fileList.push({url: this.detail.images[i].url})
            }
            if (this.detail.images[i].type == 2) {
              this.contentImgOptions.fileList.push({url: this.detail.images[i].url})
            }
          }
          this.ruleForm.brandId = this.detail.tbGoodsDetail.brandId
          this.ruleForm.material = this.detail.tbGoodsDetail.material
          this.ruleForm.size = this.detail.tbGoodsDetail.size
          this.ruleForm.cargoNo = this.detail.tbGoodsDetail.cargoNo
          this.ruleForm.sellNumber = this.detail.sellNumber
          if(this.detail.goodTypes) this.ruleForm.typeList = [this.detail.goodTypes]
          if(this.detail.goodBrand) this.ruleForm.brandList = [this.detail.goodBrand]
          if(this.detail.goodIp) this.ruleForm.ipList = [this.detail.goodIp]
          if(this.detail.goodAttribute) this.ruleForm.attributeList = [this.detail.goodAttribute]
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
          let imgs = []
          for (let i = 0; i < this.ruleForm.bannerImg.length; i++) {
            imgs.push({
              url: this.ruleForm.bannerImg[i],
              type: 1
            })
          }
          for (let i = 0; i < this.ruleForm.contentImg.length; i++) {
            imgs.push({
              url: this.ruleForm.contentImg[i],
              type: 2
            })
          }

          this.$http({
            url: '/goodsmanage/backadmin/goods',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              title: this.ruleForm.title,
              listedImage: this.ruleForm.listedImg[0],
              images: imgs,
              brandId: this.ruleForm.brandId,
              tbGoodsDetail: {
                id: this.detail.tbGoodsDetail.id,
                material: this.ruleForm.material,
                size: this.ruleForm.size,
                cargoNo: this.ruleForm.cargoNo,
              },
              sellNumber: this.ruleForm.sellNumber,
              sort: this.ruleForm.sort,
              goodTypes: this.ruleForm.typeList[0],
              goodBrand: this.ruleForm.brandList[0],
              goodIp: this.ruleForm.ipList[0],
              goodAttribute: this.ruleForm.attributeList[0],
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goods'})
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
.sku-ct {
  position: relative
  margin-bottom: 20px
  padding-right: 120px
  padding-top: 20px
  border: 1px dashed #ccc
  border-radius: 4px;
  .delete {
    position: absolute
    right: 20px
    top: 20px
  }
}
.form-item-add-sku {
  text-align: right
}
</style>