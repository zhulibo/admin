<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="预售方式" prop="type">
          <el-radio v-model="ruleForm.type" label="1">按发售时间</el-radio>
          <el-radio v-model="ruleForm.type" label="2">按发售数量</el-radio>
        </el-form-item>
        <el-form-item label="预售时间" prop="presaleTime">
          <el-date-picker
            v-model="ruleForm.presaleTime"
            type="datetimerange"
            value-format="timestamp"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <div class="sku-ct" v-for="(sku, index) in ruleForm.skus" v-if="ruleForm.skus && ruleForm.type == 2">
          <el-form-item :label="'sku名称'">
            <el-input v-model="sku.name" disabled></el-input>
          </el-form-item>
          <el-form-item :label="'预售数量'" :prop="'skus.' + index + '.store'"
                        :rules="{required: true, message: '请输入sku预售数量', trigger: 'change'}">
            <el-input v-model="sku.store"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="生效方式" prop="isNow">
          <el-radio v-model="ruleForm.isNow" label="1">及时生效</el-radio>
          <el-radio v-model="ruleForm.isNow" label="2">按开始时间生效</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="min-width: 150px">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemEdit',
  data() {
    return {
      id: '',
      detail: {},
      ruleForm: {
        title: '',
        type: '',
        isNow: '',
        presaleTime: [],
        skus: [],
      },
      rules: {
        type: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        isNow: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        presaleTime: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
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
        url: '/goodsmanage/backadmin/presellgoods/detail/' + this.id,
        method: 'GET',
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.title = this.detail.title
          for (let i = 0; i < this.detail.skus.length; i++) {
            this.ruleForm.skus.push({
              skuId: this.detail.skus[i].id,
              mainId: this.detail.skus[i].mainId,
              name: this.detail.skus[i].name,
              store: '',
            })
          }
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let skus = []
          for (let i = 0; i < this.ruleForm.skus.length; i++) {
            skus.push({
              skuId: this.ruleForm.skus[i].skuId,
              mainId: this.ruleForm.skus[i].mainId,
              store: this.ruleForm.skus[i].store,
            })
          }

          this.$http({
            url: '/goodsmanage/backadmin/presellgoods/presell',
            method: 'POST',
            data: {
              goodsId: this.id,
              type: this.ruleForm.type,
              isNow: this.ruleForm.isNow,
              startTime: this.ruleForm.presaleTime ? this.ruleForm.presaleTime[0] : '',
              endTime: this.ruleForm.presaleTime ? this.ruleForm.presaleTime[1] : '',
              skuStores: this.ruleForm.type == 2 ? skus : [],
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goodsPresaleList'})
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