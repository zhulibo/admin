<template>
  <div class="quill-wrap">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
    >
    </quill-editor>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// 富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import {quillEditor, Quill} from 'vue-quill-editor'

import {addQuillTitle} from '@/utils/quill/addQuillTitle.js' // 添加title

import "@/assets/css/quillFontSizeReset.css" // 设置字体
let fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = ['12px', false, '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '36px'];
Quill.register(fontSizeStyle, true)

export default {
  name: 'richText',
  components: {
    quillEditor
  },
  data() {
    return {
      content: '',
      // 富文本框参数设置
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          toolbar: { // 如果不上传图片到服务器，此处不必配置
            container: [
              ["bold", "italic", "underline", "strike"],
              [{'size': fontSizeStyle.whitelist}],
              [{align: []}],
              [{indent: "-1"}, {indent: "+1"}],
              [{list: "ordered"}, {list: "bullet"}],
              ["blockquote"],
              [{color: []}, {background: []}],
              ["image"],
              ["clean"]
            ], // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              'image': function(value) {

                if (value) {
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false);
                }

              }
            }
          }
        }
      }
    }
  },
  created() {
  },
  mounted() {
    addQuillTitle(); // 添加title
  },
  computed: {},
  methods: {
    insertImg(res) {
      let quill = this.$refs.myQuillEditor.quill
      let length = quill.getSelection().index;
      quill.insertEmbed(length, 'image', res.info)
      quill.setSelection(length + 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.quill-wrap {
  padding: 20px
  background-color: #fff
}
</style>