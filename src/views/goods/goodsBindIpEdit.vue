<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{ this.$route.name }}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="选择ip" prop="ipId">
          <el-cascader :props="props" v-model="ruleForm.ipId"></el-cascader>
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
    let _this = this
    return {
      id: '',
      ruleForm: {
        ipId: [],
      },
      rules: {
        ipId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.level == 0) {
            _this.$http({
              url: '/goodsmanage/backadmin/classify',
              method: 'GET',
              params: {
                level: 1,
                pageSize: 1000,
                pageNumber: 1,
              }
            })
              .then(res => {
                const items = res.data.list.map((value, i) => ({
                  value: value.id,
                  label: value.name,
                  leaf: node.level >= 3
                }));
                resolve(items);
              }).catch(e => {
              console.log(e)
            })
          } else if (node.level == 1) {
            _this.$http({
              url: '/goodsmanage/backadmin/classify/classifymode',
              method: 'GET',
              params: {
                classifyId: node.path[0],
                pageSize: 1000,
                pageNumber: 1,
              }
            })
              .then(res => {
                const items = res.data.list.map((value, i) => ({
                  value: value.modelId,
                  label: value.tbModel.name,
                  leaf: node.level >= 3
                }));
                resolve(items);
              }).catch(e => {
              console.log(e)
            })
          } else if (node.level == 2) {
            console.log(node)
            _this.$http({
              url: '/goodsmanage/backadmin/classify/modeclassify',
              method: 'GET',
              params: {
                modelId: node.path[1],
                pageSize: 1000,
                pageNumber: 1,
              }
            })
              .then(res => {
                const items = res.data.list.map((value, i) => ({
                  value: value.classifyId,
                  label: value.tbClassify.name,
                  leaf: node.level >= 3
                }));
                resolve(items);
              }).catch(e => {
              console.log(e)
            })
          } else if (node.level == 3) {
            console.log(node)
            _this.$http({
              url: '/goodsmanage/backadmin/classify/classifyip',
              method: 'GET',
              params: {
                modelId: node.path[2],
                pageSize: 1000,
                pageNumber: 1,
              }
            })
              .then(res => {
                const items = res.data.list.map((value, i) => ({
                  value: value.classifyId,
                  label: value.name,
                  leaf: node.level >= 3
                }));
                resolve(items);
              }).catch(e => {
              console.log(e)
            })
          }
        }
      },
      // props: {
      //   lazy: true,
      //   lazyLoad (node, resolve) {
      //     if (node.level == 0){
      //       _this.$http({
      //         url: '/goodsmanage/backadmin/classifyPreview',
      //         method: 'GET',
      //         params: {
      //           level: 2,
      //           pageSize: 1000,
      //           pageNumber: 1,
      //         }
      //       })
      //         .then(res => {
      //           const items = res.data.list.map((value, i) => ({
      //             value: value.id,
      //             label: value.name,
      //             leaf: node.level >= 1
      //           }));
      //           resolve(items);
      //         }).catch(e => {console.log(e)})
      //     }else if (node.level == 1){
      //       console.log(node)
      //       _this.$http({
      //         url: '/goodsmanage/backadmin/classifyPreview/classifyip',
      //         method: 'GET',
      //         params: {
      //           classifyId: node.path[0],
      //           pageSize: 1000,
      //           pageNumber: 1,
      //         }
      //       })
      //         .then(res => {
      //           const items = res.data.list.map((value, i) => ({
      //             value: value.id,
      //             label: value.name,
      //             leaf: node.level >= 1
      //           }));
      //           resolve(items);
      //         }).catch(e => {console.log(e)})
      //     }
      //   }
      // }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.goodsType = this.$route.query.goodsType
  },
  mounted() {
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/goods/bindip',
            method: 'POST',
            data: {
              goodsType: this.goodsType,
              goodsId: this.id,
              ipId: this.ruleForm.ipId[3],
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goodsBindIp', query: {id: this.id}})
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
