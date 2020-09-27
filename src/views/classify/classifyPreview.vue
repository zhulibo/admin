<template>
  <div>
    <div class="classify">
      <div class="classify-ct">
        <div class="side-bar">
          <dl class="classify-one">
            <dd v-for="(classifyOne, classifyOneIndex) in classifyAllList" :class="{on:classifyOne.active}"
                :data-index="classifyOneIndex"
                @click="changeClassifyOne($event)">{{ classifyOne.name }}
            </dd>
          </dl>
        </div>
        <div class="classify-main">
          <dl class="classify-module" v-for="(module, moduleIndex) in moduleList">
            <dt class="classify-module-name">{{ module.name }}</dt>
            <dd class="classify-two" v-for="(classifyTwo, classifyTwoIndex) in module.classifies">
              <dl>
                <dt class="classify-two-name">{{ classifyTwo.name }}</dt>
                <dd class="classify-three" v-for="(classifyThree, classifyThreeIndex) in classifyTwo.classifies">
                  {{ classifyThree.name }}
                </dd>
              </dl>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classify',
  data() {
    return {
      classifyAllList: [],
      moduleList: [],
    }
  },
  created() {
    this.getClassifyAllList()
  },
  mounted() {
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  methods: {
    getClassifyAllList() {
      this.$http({
        url: '/goodsmanage/backadmin/classify/pre',
        method: 'GET',
        params: {
          level: 1,
          pageSize: 1000,
          pageNumber: 1,
        }
      })
        .then(res => {
          this.classifyAllList = res.data

          this.$set(this.classifyAllList[0], 'active', true)
          this.moduleList = this.classifyAllList[0].models
        }).catch(e => {
        console.log(e)
      })
    },
    changeClassifyOne(event) {
      let index = event.currentTarget.getAttribute("data-index")

      for (let i = 0; i < this.classifyAllList.length; i++) {
        this.$set(this.classifyAllList[i], 'active', false)
      }
      this.$set(this.classifyAllList[index], 'active', true)

      this.moduleList = this.classifyAllList[index].models
    },
  }
}
</script>

<style lang="stylus" scoped>
.classify {
  padding: 20px
  background-color: #fff
  .classify-ct {
    display: flex
    max-width 1000px
    min-height 600px
    padding: 20px
    font-size 16px
  }
}
.side-bar {
  width: 200px
  dd {
    padding: 15px
    cursor: pointer
    &.on {
      font-weight: bold
      color: blue
      background-color: #f5f5f5
    }
  }
}
.classify-main {
  flex: 1
  padding: 20px
  background-color: #f5f5f5
  .classify-module {
    padding: 10px 0
    .classify-module-name {
      margin-bottom: 10px
      border-bottom: 1px dashed #ddd
    }
    .classify-two {
      display: inline-block
      margin-right: 10px
      padding: 0 5px
      border-radius: 5px
      .classify-two-name {
        padding-left: 10px
        border-left: 5px solid #ddd
      }
      .classify-three {
        display: inline-block
        padding: 5px 10px
      }
    }
  }
}
</style>