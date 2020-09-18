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
        <el-form-item label="材质" prop="material">
          <el-input v-model="ruleForm.material"></el-input>
        </el-form-item>
        <el-form-item label="尺寸" prop="size">
          <el-input v-model="ruleForm.size"></el-input>
        </el-form-item>
        <el-form-item label="货号" prop="cargoNo">
          <el-input v-model="ruleForm.cargoNo"></el-input>
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
        isUp: 0,
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
          {required: true, message: '请输入', trigger: 'change'}
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
        url: '/goodsmanage/backadmin/presellgoods/detail/' + this.id,
        method: 'GET',
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
          this.ruleForm.material = this.detail.tbPresellGoodsDetail.material
          this.ruleForm.size = this.detail.tbPresellGoodsDetail.size
          this.ruleForm.cargoNo = this.detail.tbPresellGoodsDetail.cargoNo
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
            url: '/goodsmanage/backadmin/presellgoods/detail',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              title: this.ruleForm.title,
              listedImage: this.ruleForm.listedImg[0],
              tbPresellGoodsDetail: {
                id: this.detail.tbPresellGoodsDetail.id,
                material: this.ruleForm.material,
                size: this.ruleForm.size,
                cargoNo: this.ruleForm.cargoNo,
              },
              images: imgs,
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