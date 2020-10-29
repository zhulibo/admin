<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">分享礼包</el-radio>
          <el-radio v-model="ruleForm.type" label="2">邀请码礼包</el-radio>
        </el-form-item>
        <el-form-item label="礼包图片" prop="iconImg" class="form-item-img-top">
          <img-upload v-model="ruleForm.iconImg" :options="iconImgOptions"></img-upload>
        </el-form-item>
        <el-form-item label="发放时间" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            type="datetimerange"
            value-format="timestamp"
            placeholder="选择日期时间">
          </el-date-picker>
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
      ruleForm: {
        name: '',
        type: '1',
        iconImg: [],
        time: [],
      },
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        iconImg: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        time: [
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
        // url: '/order/backadmin/discount/page/detail',
        url: '/order/backadmin/discount/page/' + this.id,
        method: 'GET',
        // params: {
        //   id: this.id
        // }
      })
        .then(res => {
          this.detail = res.data
          this.ruleForm.name = this.detail.name
          this.ruleForm.type = String(this.detail.type)
          this.iconImgOptions.fileList.push({url: this.detail.img}) // 图片回显
          if (this.detail.startTime) this.ruleForm.time.push(this.detail.startTime)
          if (this.detail.endTime) this.ruleForm.time.push(this.detail.endTime)
        }).catch(e => {
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/order/backadmin/discount/page',
            method: this.id ? 'PUT' : 'POST',
            data: {
              id: this.id ? this.id : '',
              name: this.ruleForm.name,
              type: this.ruleForm.type,
              img: this.ruleForm.iconImg[0],
              startTime: this.ruleForm.time[0],
              endTime: this.ruleForm.time[1],
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/giftPackList'})
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
