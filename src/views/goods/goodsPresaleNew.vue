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
        <el-form-item label="供货商id" prop="shopId">
          <el-input v-model="ruleForm.shopId"></el-input>
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
        <div class="sku-ct" v-for="(sku, index) in ruleForm.skus" :key="sku.key">
          <el-form-item :label="'sku' + (index+1) + '名称'" :prop="'skus.' + index + '.name'"
                        :rules="{required: true, message: '请输入sku信息', trigger: 'change'}">
            <el-input v-model="sku.name"></el-input>
          </el-form-item>
          <el-form-item :label="'sku' + (index+1) + '总金额'" :prop="'skus.' + index + '.totalPrice'"
                        :rules="{required: true, message: '请输入sku信息', trigger: 'change'}">
            <el-input v-model="sku.totalPrice"></el-input>
          </el-form-item>
          <el-form-item :label="'sku' + (index+1) + '金额'" :prop="'skus.' + index + '.price'"
                        :rules="{required: true, message: '请输入sku信息', trigger: 'change'}">
            <el-input v-model="sku.price"></el-input>
          </el-form-item>
          <el-form-item :label="'sku' + (index+1) + '图片'" :prop="'skus.' + index + '.url'"
                        :rules="{required: true, message: '请选择sku图片', trigger: 'change'}">
            <img-upload v-model="sku.url" :options="sku.skuImgOptions"></img-upload>
          </el-form-item>
          <el-button type="text" class="delete" @click="removeSku(sku)">删除sku{{ index + 1 }}</el-button>
        </div>
        <el-form-item label="" class="form-item-add-sku">
          <el-button plain type="primary" size="medium" @click="addSku">添加sku</el-button>
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
        shopId: '',
        material: '',
        size: '',
        cargoNo: '',
        sort: '',
        typeList: [],
        brandList: [],
        ipList: [],
        attributeList: [],
        skus: [{
          name: '',
          url: '',
          price: '',
          totalPrice: '',
          skuImgOptions: {
            fileList: [],
            accept: '.jpg,.jpeg,.png,.gif',
            limit: 1
          },
          key: Date.now(),
        }],
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
        shopId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        material: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        size: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        cargoNo: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  components: {
    imgUpload,
  },
  created() {
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
    removeSku(item) {
      var index = this.ruleForm.skus.indexOf(item)
      if (index !== -1) {
        this.ruleForm.skus.splice(index, 1)
      }
    },
    addSku() {
      this.ruleForm.skus.push({
        name: '',
        url: '',
        skuImgOptions: {
          fileList: [],
          accept: '.jpg,.jpeg,.png,.gif',
          limit: 1
        },
        key: Date.now(),
      });
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

          let skus = []
          for (let i = 0; i < this.ruleForm.skus.length; i++) {
            skus.push({
              skuImage: this.ruleForm.skus[i].url[0],
              name: this.ruleForm.skus[i].name,
              totalPrice: this.ruleForm.skus[i].totalPrice,
              price: this.ruleForm.skus[i].price,
            })
          }
          if (skus.length < 1) this.$message.warning('至少一个sku')

          this.$http({
            url: '/goodsmanage/backadmin/presellgoods',
            method: this.id ? 'PUT' : 'POST',
            data: {
              title: this.ruleForm.title,
              listedImage: this.ruleForm.listedImg[0],
              images: imgs,
              brandId: this.ruleForm.brandId,
              tbPresellGoodsDetail: {
                material: this.ruleForm.material,
                size: this.ruleForm.size,
                cargoNo: this.ruleForm.cargoNo,
              },
              skus: skus,
              shopId: this.ruleForm.shopId,
              goodTypes: this.ruleForm.typeList[0],
              goodBrand: this.ruleForm.brandList[0],
              goodIp: this.ruleForm.ipList[0],
              goodAttribute: this.ruleForm.attributeList[0],
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goodsPresale'})
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
