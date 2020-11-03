<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="轮播图名称" prop="itemName">
          <el-input v-model="ruleForm.itemName"></el-input>
        </el-form-item>
        <el-form-item label="要跳转的类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">现货商品</el-radio>
            <el-radio :label="2">预售商品</el-radio>
            <el-radio :label="3">品牌</el-radio>
            <el-radio :label="4">类别</el-radio>
            <el-radio :label="5">属性</el-radio>
            <el-radio :label="6">ip</el-radio>
            <el-radio :label="7">抽奖商品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="要跳转的类型id" prop="itemId">
          <el-input v-model="ruleForm.itemId"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="iconImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.iconImg" :options="iconImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="背景图" prop="brandBgImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.brandBgImg" :options="brandBgImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="url" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="内容(200字以内)" prop="content">
          <el-input type="textarea" v-model="ruleForm.content" maxlength="200" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="ruleForm.sort"></el-input>
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
      iconImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      brandBgImgOptions: {
        fileList: [],
        accept: '.jpg,.jpeg,.png,.gif',
        limit: 1
      },
      ruleForm: {
        itemName: '',
        type: '',
        itemId: '',
        iconImg: [],
        brandBgImg: [],
        url: '',
        content: '',
        sort: '',
      },
      rules: {
        itemName: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        itemId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        iconImg: [
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
    if (this.id) this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/goodsmanage/backadmin/viewpager/viewdetail',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.itemName = this.detail.itemName
          this.ruleForm.type = this.detail.type
          this.ruleForm.itemId = this.detail.itemId
          this.iconImgOptions.fileList.push({url: this.detail.image}) // 图片回显
          if (this.detail.backMage) this.brandBgImgOptions.fileList.push({url: this.detail.backMage}) // 图片回显
          this.ruleForm.url = this.detail.url
          this.ruleForm.content = this.detail.content
          if (this.detail.sort != null) this.ruleForm.sort = this.detail.sort
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.id ? '/goodsmanage/backadmin/viewpager/updateview' : '/goodsmanage/backadmin/viewpager/insertview',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              itemName: this.ruleForm.itemName,
              type: this.ruleForm.type,
              itemId: this.ruleForm.itemId,
              image: this.ruleForm.iconImg[0],
              backMage: this.ruleForm.brandBgImg[0],
              url: this.ruleForm.url,
              content: this.ruleForm.content,
              sort: this.ruleForm.sort,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/bannerList'})
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
