<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="sku名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="sku图片" prop="skuImage" class="form-item-img-logo">
          <img-upload v-model="ruleForm.skuImage" :options="skuImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
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
      skuImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        name: '',
        skuImage: [],
        price: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        skuImage: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        price: [
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
        url: '/goodsmanage/backadmin/goods/detail/sku',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.name = this.detail.name
          this.skuImgOptions.fileList.push({url: this.detail.skuImage}) // 图片回显
          this.ruleForm.price = this.detail.price
        }).catch(e => {console.log(e)})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.$http({
            url: '/goodsmanage/backadmin/goods/sku',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              mainId: this.detail.mainId,
              name: this.detail.name,
              skuImage: this.ruleForm.skuImage[0],
              price: this.ruleForm.price,
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
