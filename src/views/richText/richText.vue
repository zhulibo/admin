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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
// 富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import "../../assets/css/quillFontSizeReset.css"
import { quillEditor, Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'; // 图片缩放组件

Quill.register('modules/ImageResize', ImageResize);

// 添加title
import { addQuillTitle } from '@/utils/quill/addQuillTitle'

// 设置字体
let fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = ['12px', false, '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '36px']
Quill.register(fontSizeStyle, true)

export default {
  name: 'richText',
  components: {quillEditor},
  data() {
    return {
      content: '',
      // 富文本框参数设置
      editorOption: {
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
            ],  // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              'image': function() { // 劫持原来的图片点击按钮事件
                // quill插件实例
                let _this = this
                // 创建上传文件input并触发
                let fileInput = document.createElement('input')
                fileInput.setAttribute('type', 'file')
                fileInput.setAttribute('multiple', 'multiple')
                fileInput.setAttribute('accept', 'image/*')
                fileInput.addEventListener('change', () => {
                  if (fileInput.files !== null) {
                    const files = Array.from(fileInput.files).reverse()
                    // 利用es6迭代器异步顺序上传图片，保证图片插入顺序正常
                    const it = files[Symbol.iterator]()
                    uploadFile()

                    function uploadFile () {
                      const { done, value: _file } = it.next()
                      if (done) return
                      let reader = new FileReader()
                      reader.onload = (event) => {
                        const range = _this.quill.getSelection(true)
                        // 设置图片上传地址
                        const uploadImgServer = 'https://upload.chujiayoupin.com/v1/upload/file'
                        // 创建formData参数提交（文件+签名信息）
                        const formData = new FormData()
                        formData.append('file', _file)
                        for (const [key, val] of Object.entries(vm.imgSign)) {
                          formData.append(key, val)
                        }
                        // 发送图片上传请求
                        const xhr = new XMLHttpRequest()
                        xhr.open('POST', uploadImgServer)
                        xhr.timeout = 6000
                        xhr.ontimeout = () => {
                          alert('图片上传超时')
                        }
                        xhr.onreadystatechange = () => {
                          let result
                          if (xhr.readyState === 4) {
                            // http status code
                            if (xhr.status < 200 || xhr.status >= 300) {
                              return alert(`上传图片发生错误，上传图片发生错误，服务器返回状态是 ${xhr.status}`)
                            }
                            result = xhr.responseText
                            if (typeof result !== 'object') {
                              try {
                                result = JSON.parse(result)
                              } catch {
                                return alert('上传图片失败', '上传图片返回结果错误，返回结果是: ' + result)
                              }
                            }
                            // 根据服务器返回的结果自行拼接图片地址
                            const URI = result.data.items.file.map(v => `https://img.chujiayoupin.com${v.filename}`)[0]
                            // 插入到文本
                            _this.quill.updateContents(
                              new Delta()
                                .retain(range.index)
                                .delete(range.length)
                                .insert({ image: URI })
                            )
                          }
                          // 上传下一个图片
                          uploadFile()
                        }
                        xhr.send(formData)
                      }
                      reader.readAsDataURL(_file)
                    }
                  }
                })
                fileInput.click()
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
    ...mapState({
      userInfo: state => state.login.userInfo
    }),
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
.quill-wrap {
  padding: 20px
  background-color: #fff
}
</style>