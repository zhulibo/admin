<template>
  <div>
    <div class="edit-head clearfix">
      <h2 class="head-title">{{this.$route.name}}</h2>
    </div>
    <div class="edit-ct">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="edit-form">
        <el-form-item label="分类类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option label="普通分类" value="2"></el-option>
            <el-option label="首页分类" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.type == 1" label="选择分类" prop="classifyId">
          <el-select v-model="ruleForm.classifyId" placeholder="请选择">
            <el-option v-for="item in classifyList" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.type == 2" label="选择分类" prop="classifyId">
          <el-cascader :props="props" v-model="ruleForm.classifyId"></el-cascader>
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
      classifyList: [],
      props: {
        lazy: true,
        lazyLoad (node, resolve) {
          if (node.level == 0){
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
                  leaf: node.level >= 2
                }));
                resolve(items);
              }).catch(e => {console.log(e)})
          }else if(node.level == 1){
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
                  leaf: node.level >= 2
                }));
                resolve(items);
              }).catch(e => {console.log(e)})
          }else if (node.level == 2){
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
                  leaf: node.level >= 2
                }));
                resolve(items);
              }).catch(e => {console.log(e)})
          }
        }
      },
      ruleForm: {
        type: '2',
        classifyId: '',
      },
      rules: {
        type: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        classifyId: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    this.id = this.$route.query.id
    this.goodsType = this.$route.query.goodsType
    this.getClassifyIndexList()
  },
  mounted() {
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    getClassifyList() {
      this.$http({
        url: '/goodsmanage/backadmin/classify',
        method: 'GET',
        params: {
          name: this.name,
          level: 2,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyList = res.data.list
        }).catch(e => {console.log(e)})
    },
    getClassifyIndexList() {
      this.$http({
        url: '/goodsmanage/backadmin/indexclassify/indexclassify',
        method: 'GET',
        params: {
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          let list = res.data.list
          for (let i = 0; i < list.length; i++) {
            this.classifyList.push({
              id: list[i].id,
              name: list[i].name,
            })
          }
        }).catch(e => {console.log(e)})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: '/goodsmanage/backadmin/goods/bindgoods',
            method: 'POST',
            data: {
              goodsType: this.goodsType,
              type: this.ruleForm.type,
              classifyId: this.ruleForm.type == 1 ? this.ruleForm.classifyId : this.ruleForm.classifyId[2],
              goodsId: this.id,
            },
          }).then(res => {
            this.$message.success(res.msg)
            this.$router.push({path: '/goodsBindClassify', query: {id: this.id}})
          }).catch(e => {console.log(e)})
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
  },
  watch: {
    'ruleForm.type': {
      handler: function (val) {
        // this.classifyList = []
        this.ruleForm.classifyId = ''
        // if(val == 2) {
        //   this.getClassifyList()
        // }else if(val == 1) {
        //   this.getClassifyIndexList()
        // }
      },
      immediate: true
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>
