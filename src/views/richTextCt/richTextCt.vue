<template>
  <div class="chatCt">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="app-edit-ruleForm">
      <el-form-item label="分类" prop="content">
        <rich-text v-model="ruleForm.content"></rich-text>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const richText = () => import(/* webpackChunkName: "richText" */ '@/components/richText/richText')

export default {
  name: 'richTextCt',
  components: {
    richText
  },
  data() {
    return {
      ruleForm: { // 表单的值
        content: '<p>2333</p>',
      },
      rules: { // 验证规则
        content: [
          // {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {},
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.chatCt{
  padding: 20px
  background-color: #fff
}
</style>