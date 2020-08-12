<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import imgUploadOss from '@/components/imgUploadOss/imgUploadOss';

export default {
  name: 'oss',
  data() {
    return {
      ruleForm: {
        title: '',
        imgUrl: []
      },
      rules: {},
    }
  },
  components: {
    imgUploadOss
  },
  created() {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/userorg/backadmin/article',
            method: 'PUT',
            data: {
              id: this.id,
              title: this.ruleForm.title,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/social'})
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
}
</script>

<style lang="stylus" scoped>
</style>
