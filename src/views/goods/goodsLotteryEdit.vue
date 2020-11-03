<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="选择商品" prop="title" v-if="!id">
          <el-input v-model="ruleForm.title" @focus="openSelectDialog"></el-input>
        </el-form-item>
        <el-form-item label="选择sku" prop="skuId" v-if="!id">
          <el-select v-model="ruleForm.skuId" placeholder="请选择" :disabled="skuList.length == 0">
            <el-option v-for="item in skuList" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="真假" prop="type">
          <el-radio v-model="ruleForm.type" label="0">假抽</el-radio>
          <el-radio v-model="ruleForm.type" label="1">真抽</el-radio>
        </el-form-item>
        <el-form-item label="抽奖图片" prop="listedImg" class="form-item-img-logo">
          <img-upload v-model="ruleForm.listedImg" :options="listedImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="官网价格" prop="drawPrice">
          <el-input v-model="ruleForm.drawPrice"></el-input>
        </el-form-item>
        <el-form-item label="开奖时间" prop="drawTime">
          <el-date-picker
            v-model="ruleForm.drawTime"
            type="datetime"
            value-format="timestamp"
            default-value=""
            default-time="23:00:00"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <select-goods @confirmSelectItem="confirmSelectItem" :dialogVisible.sync="selectItemOption.dialogVisible" :itemType="selectItemOption.itemType" :singleSelect="selectItemOption.singleSelect"></select-goods>
  </div>
</template>

<script>
const imgUpload = () => import(/* webpackChunkName: "imgUpload" */ '@/components/imgUpload/imgUpload')
import selectGoods from "@/components/selectItem/selectGoods";

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
      ruleForm: {
        title: '',
        goodsId: '',
        skuId: '',
        type: '1',
        listedImg: '',
        drawPrice: '',
        drawTime: '',
      },
      rules: {
        title: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        skuId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        listedImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        drawPrice: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        drawTime: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
      selectItemOption: { // 选择商品组件配置参数
        dialogVisible: false,
        itemType: [true, false, false], // 是否可以选择现货商品，预售商品，抽奖商品
        singleSelect: true, // 只可以单选
      },
      skuList: [],
    }
  },
  components: {
    imgUpload,
    selectGoods,
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
        url: '/goodsmanage/backadmin/drawgoods/detail',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.goodsId = this.detail.goodsId
          this.ruleForm.skuId = this.detail.skuId
          this.ruleForm.type = String(this.detail.type)
          this.listedImgOptions.fileList.push({url: this.detail.url}) // 图片回显
          this.ruleForm.drawPrice = this.detail.drawPrice
          this.ruleForm.drawTime = this.detail.drawTime
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/drawgoods',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              goodsId: this.ruleForm.goodsId,
              skuId: this.ruleForm.skuId,
              type: this.ruleForm.type,
              url: this.ruleForm.listedImg[0],
              drawPrice: this.ruleForm.drawPrice,
              drawTime: this.ruleForm.drawTime,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goodsLotteryList'})
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
    confirmSelectItem(type, multipleSelection) {
      console.log(type, multipleSelection)
      this.ruleForm.title = multipleSelection[0].title
      this.ruleForm.goodsId = multipleSelection[0].id

      let ids = []
      for (let i = 0; i < multipleSelection.length; i++) {
        ids.push(multipleSelection[i].id)
      }
      this.$http({
        url: '/goodsmanage/backadmin/goods/detail',
        method: 'GET',
        params: {
          id: ids[0],
        }
      })
        .then(res => {
          this.selectItemOption.dialogVisible = false
          console.log(res.data.skus)
          this.skuList = res.data.skus
        }).catch(e => {
        console.log(e)
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
