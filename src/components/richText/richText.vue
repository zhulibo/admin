<template>
  <div class="quill-ct">
    <quill-editor
      ref="richTextQuillEditor"
      v-model="content"
      :options="editorOption"
    >
    </quill-editor>
    <el-upload
      class="el-upload-rich-text"
      :headers="{Authorization: userInfo}"
      :action="this.global.baseUrl + '/userorg/backadmin/uploading'"
      list-type="picture-card"
      accept='.jpg,.jpeg,.png,.gif'
      :multiple="true"
      :on-success="handleLogoImageSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
// 富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import "../../assets/css/quillFontSizeReset.css"
import {quillEditor, Quill} from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'; // 图片缩放组件

Quill.register('modules/ImageResize', ImageResize);

// 添加title
import {addQuillTitle} from '@/utils/quill/addQuillTitle'

// 设置字体
let fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = ['12px', false, '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '36px']
Quill.register(fontSizeStyle, true)

export default {
  name: 'richText',
  components: {
    quillEditor
  },
  props: {
    value: {} // 父组件传来的富文本内容(html片段)
  },
  data() {
    return {
      content: '', // 富文本内容(html片段)
      editorOption: { // 富文本框参数设置
        placeholder: '请输入内容',
        modules: {
          ImageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          toolbar: {
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
              'image': function (value) { // 劫持原来的图片点击按钮事件
                let _this = this // quill插件实例
                if (value) {
                  document.querySelector('.el-upload-rich-text input').click()
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
  computed: {
    userInfo() {
      return this.$store.getters.userInfo.token
    },
  },
  methods: {
    handleLogoImageSuccess(res, file, fileList) {
      // console.log('res', res)
      // console.log('file', file)
      // console.log('fileList', fileList)
      let quill = this.$refs.richTextQuillEditor.quill // 富文本实例
      let index = quill.getSelection().index // 光标位置
      quill.insertEmbed(index, 'image', res.data) // 插入图片
      quill.setSelection(index + 1)
    },
  },
  watch: {
    'value': { // 将props中的value赋值给content，富文本会修改content，而props在子组件中是不允许修改的
      handler: function (val) {
        this.content = val
      },
      immediate: true
    },
    'content': function (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.quill-ct {
  line-height initial
}
.el-upload-rich-text {
  display: none
}
</style>