<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="列表图" prop="listedImage" class="form-item-img-logo">
          <img-upload v-model="ruleForm.listedImage" :options="listedImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="轮播图" prop="bannerImage" class="form-item-img-logo">
          <img-upload v-model="ruleForm.bannerImage" :options="bannerImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="详情图" prop="contentImage" class="form-item-img-logo">
          <img-upload v-model="ruleForm.contentImage" :options="contentImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="分值" prop="sort">
          <el-input v-model="ruleForm.sort"></el-input>
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
      <div class="sku-ct" v-for="(sku, index) in ruleForm.skus" :key="sku.key">
        <el-form-item :label="'sku' + (index+1) + '名称'" :prop="'skus.' + index + '.name'" :rules="{required: true, message: '请输入sku信息', trigger: 'blur'}">
          <el-input v-model="sku.name"></el-input>
        </el-form-item>
        <el-form-item :label="'sku' + (index+1) + '图片'" :prop="'skus.' + index + '.url'" :rules="{required: true, message: '请选择sku图片', trigger: 'blur'}">
          <img-upload v-model="sku.url" :options="sku.skuImgOptions"></img-upload>
        </el-form-item>
        <el-button type="text" class="delete" @click="removeSku(sku)">删除sku{{index+1}}</el-button>
      </div>
        <el-form-item label="" class="form-item-add-sku">
          <el-button plain type="primary" size="medium" @click="addSku">添加sku</el-button>
        </el-form-item>
        <el-form-item label="状态" prop="isUp">
          <el-switch
            v-model="ruleForm.isUp"
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
const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')

export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      detail: {},
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
        listedImage: [],
        bannerImage: [],
        contentImage: [],
        sort: '',
        material: '',
        size: '',
        cargoNo: '',
        skus: [{
          name: '',
          url: '',
          skuImgOptions: {
            fileList: [],
            accept: '.jpg,.jpeg,.png,.gif',
            limit: 1
          },
          key: Date.now(),
        }],
        isUp: 0,
      },
      rules: {
        title: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        listedImage: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        bannerImage: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        contentImage: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        material: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        size: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        cargoNo: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        isUp: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
      },
    }
  },
  components: {
    imgUpload,
  },
  created() {
    this.id = this.$route.query.id
    if(this.id) this.getDetail()
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
        url: '/goodsmanage/backadmin/goods/detail',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.title = this.detail.title
          this.listedImgOptions.fileList.push({url: this.detail.logoImage}) // 图片回显
          this.bannerImgOptions.fileList.push({url: this.detail.logoImage}) // 图片回显
          this.contentImgOptions.fileList.push({url: this.detail.logoImage}) // 图片回显
          this.ruleForm.sort = this.detail.sort
          this.ruleForm.material = this.detail.material
          this.ruleForm.size = this.detail.size
          this.ruleForm.cargoNo = this.detail.cargoNo
          this.ruleForm.isUp = this.detail.isUp
        }).catch(e => {console.log(e)})
    },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let images = []
          for (let i = 0; i < this.ruleForm.bannerImage.length; i++) {
            images.push({
              url: this.ruleForm.bannerImage[i],
              type: 1
            })
          }
          for (let i = 0; i < this.ruleForm.contentImage.length; i++) {
            images.push({
              url: this.ruleForm.contentImage[i],
              type: 2
            })
          }

          let skus = []
          for (let i = 0; i < this.ruleForm.skus.length; i++) {
            skus.push({
              skuImage: this.ruleForm.skus[i].url[0],
              name: this.ruleForm.skus[i].name
            })
          }
          if(skus.length < 1) this.$message.warning('至少一个sku')

          this.$http({
            url: '/goodsmanage/backadmin/goods',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              title: this.ruleForm.title,
              listedImage: this.ruleForm.listedImage[0],
              sort: this.ruleForm.sort,
              tbGoodsDetail: {
                material: this.ruleForm.material,
                size: this.ruleForm.size,
                cargoNo: this.ruleForm.cargoNo,
              },
              images: images,
              skus: skus,
              isUp: this.ruleForm.isUp,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goods'})
          }).catch(e => {console.log(e)})
        } else {
          console.log('error submit!!')
          return false;
        }
      });
    },
  },
}
</script>

<style lang="stylus" scoped>
.sku-ct{
  position: relative
  margin-bottom: 20px
  padding-right: 120px
  padding-top: 20px
  border: 1px dashed #ccc
  border-radius: 4px;
  .delete{
    position: absolute
    right: 20px
    top: 20px
  }
}
.form-item-add-sku{
  text-align: right
}
</style>
