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
        <el-form-item label="官网维护销量" prop="sellNumber">
          <el-input v-model="ruleForm.sellNumber"></el-input>
        </el-form-item>
        <el-form-item label="排序分值" prop="sort">
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
        sellNumber: '',
        sort: '',
        material: '',
        size: '',
        cargoNo: '',
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
        sellNumber: [
          // {required: true, message: '请输入', trigger: 'blur'}
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
          this.listedImgOptions.fileList.push({url: this.detail.listedImage}) // 图片回显
          for (let i = 0; i < this.detail.images.length; i++) {
            if(this.detail.images[i].type == 1) {
              this.bannerImgOptions.fileList.push({url: this.detail.images[i].url})
            }
            if(this.detail.images[i].type == 2) {
              this.contentImgOptions.fileList.push({url: this.detail.images[i].url})
            }
          }
          this.ruleForm.sort = this.detail.sort
          this.ruleForm.material = this.detail.tbGoodsDetail.material
          this.ruleForm.size = this.detail.tbGoodsDetail.size
          this.ruleForm.cargoNo = this.detail.tbGoodsDetail.cargoNo
        }).catch(e => {console.log(e)})
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

          this.$http({
            url: '/goodsmanage/backadmin/goods',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              title: this.ruleForm.title,
              listedImage: this.ruleForm.listedImage[0],
              sellNumber: this.ruleForm.sellNumber,
              sort: this.ruleForm.sort,
              tbGoodsDetail: {
                id: this.detail.tbGoodsDetail.id,
                material: this.ruleForm.material,
                size: this.ruleForm.size,
                cargoNo: this.ruleForm.cargoNo,
              },
              images: images,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goods'})
          }).catch(e => {console.log(e)})
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
