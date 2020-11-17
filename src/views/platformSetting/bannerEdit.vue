<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="标题" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="要跳转的类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">现货商品</el-radio>
            <el-radio :label="2">预售商品</el-radio>
            <el-radio :label="7">抽奖商品</el-radio>
            <el-radio :label="3">品牌</el-radio>
            <el-radio :label="4">类别</el-radio>
            <el-radio :label="5">属性</el-radio>
            <el-radio :label="6">ip</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择要跳转的目标" prop="itemName" v-if="ruleForm.type == 1 || ruleForm.type == 2 || ruleForm.type == 7">
          <el-input v-model="ruleForm.itemName" @focus="openSelectDialog"></el-input>
        </el-form-item>
        <el-form-item label="选择要跳转的目标" prop="itemName" v-if="ruleForm.type == 3 || ruleForm.type == 4 || ruleForm.type == 5 || ruleForm.type == 6">
          <el-input v-model="ruleForm.itemName" @focus="openSelectDialog2"></el-input>
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
    <select-goods @confirmSelectItem="confirmSelectItem" :dialogVisible.sync="selectItemOption.dialogVisible" :itemType="selectItemOption.itemType" :singleSelect="selectItemOption.singleSelect"></select-goods>
    <select-classify @confirmSelectItem2="confirmSelectItem2" :dialogVisible.sync="selectItemOption2.dialogVisible" :itemType="selectItemOption2.itemType" :singleSelect="selectItemOption2.singleSelect"></select-classify>
  </div>
</template>

<script>
const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')
import selectGoods from "@/components/selectItem/selectGoods";
import selectClassify from "@/components/selectItem/selectClassify";

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
        name: '',
        type: '',
        itemName: '',
        itemId: '',
        iconImg: [],
        brandBgImg: [],
        url: '',
        content: '',
        sort: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        itemName: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        itemId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        iconImg: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        content: [
          // {required: true, message: '请输入', trigger: 'change'}
        ],
        sort: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
      selectItemOption: { // 选择商品组件配置参数
        dialogVisible: false,
        itemType: [false, false, false], // 是否可以选择现货商品，预售商品，抽奖商品
        singleSelect: true, // 只可以单选
      },
      selectItemOption2: { // 选择组件配置参数
        dialogVisible: false,
        itemType: [false, false, false, false],
        singleSelect: true, // 只可以单选
      },
    }
  },
  components: {
    imgUpload,
    selectGoods,
    selectClassify,
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
          this.ruleForm.name = this.detail.name
          this.ruleForm.type = this.detail.type
          setTimeout(() => {
            this.ruleForm.itemId = this.detail.itemId
            this.ruleForm.itemName = this.detail.itemName
          },600)
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
              name: this.ruleForm.name,
              type: this.ruleForm.type,
              itemId: this.ruleForm.itemId,
              itemName: this.ruleForm.itemName,
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
    openSelectDialog() {
      this.selectItemOption.dialogVisible = true
    },
    openSelectDialog2() {
      this.selectItemOption2.dialogVisible = true
    },
    confirmSelectItem(type, multipleSelection) {
      console.log(type, multipleSelection)
      let ids = []
      for (let i = 0; i < multipleSelection.length; i++) {
        ids.push({
          id: multipleSelection[i].id,
          name: multipleSelection[i].title,
        })
      }
      this.selectItemOption.dialogVisible = false
      this.ruleForm.itemName = ids[0].name
      this.ruleForm.itemId = ids[0].id
    },
    confirmSelectItem2(type, multipleSelection) {
      console.log(type, multipleSelection)
      let ids = []
      for (let i = 0; i < multipleSelection.length; i++) {
        ids.push({
          id: multipleSelection[i].id,
          name: multipleSelection[i].name,
        })
      }
      this.selectItemOption2.dialogVisible = false
      this.ruleForm.itemName = ids[0].name
      this.ruleForm.itemId = ids[0].id
    },
  },
  watch: {
    'ruleForm.type': {
      handler: function (val){
        this.ruleForm.itemName = ''
        this.ruleForm.itemId = ''
        if (val ==1) {
          this.selectItemOption.itemType = [true, false, false]
        }else if(val ==2){
          this.selectItemOption.itemType = [false, true, false]
        }else if(val ==7){
          this.selectItemOption.itemType = [false, false, true]
        }else if(val ==3){
          this.selectItemOption2.itemType = [true, false, false, false]
        }else if(val ==4){
          this.selectItemOption2.itemType = [false, true, false, false]
        }else if(val ==5){
          this.selectItemOption2.itemType = [false, false, true, false]
        }else if(val ==6){
          this.selectItemOption2.itemType = [false, false, false, true]
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
