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
  import "../../assets/css/quillFontSizeReset.css";
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
  // 添加title
  import { addQuillTitle } from '../../utils/quill/quill-title.js';
  // 设置字体
  let fontSizeStyle = Quill.import('attributors/style/size')
  fontSizeStyle.whitelist = ['12px', false, '16px','18px','20px', '22px','24px', '26px', '28px','30px','32px', '36px'];
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
            ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
              name: 'img',  // 图片参数名
              size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
              action: 'https://app.daonong.tech/index.php/Api/Brand/addV2',  // 服务器地址, 如果action为空，则采用base64插入图片
              // response 为一个函数用来获取服务器返回的具体图片地址
              // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
              // 则 return res.url
              response: (res) => {
                // return res.url
                return 'https://www.mxjclub.com/static/home/images/app_left.png'
              },
              headers: (xhr) => {
                // xhr.setRequestHeader('myHeader','myValue')
              },  // 可选参数 设置请求头部
              sizeError: () => {},  // 图片超过大小的回调
              start: () => {},  // 可选参数 自定义开始上传触发事件
              end: () => {},  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
              error: () => {},  // 可选参数 上传失败触发的事件
              success: () => {},  // 可选参数  上传成功触发的事件
              change: (xhr, formData) => {
                // xhr.setRequestHeader('myHeader','myValue')
                // formData.append('token', 'myToken')
              } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
            },
            toolbar: {  // 如果不上传图片到服务器，此处不必配置
              container: [
                ["bold", "italic", "underline", "strike"],
                [{ 'size': fontSizeStyle.whitelist }],
                [{ align: [] }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote"],
                [{ color: [] }, { background: [] }],
                ["image"],
                ["clean"]
              ],  // container为工具栏，此次引入了全部工具栏，也可自行配置
              handlers: {
                'image': function () {  // 劫持原来的图片点击按钮事件
                  QuillWatch.emit(this.quill.id)
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
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  .quill-wrap{
    padding: 20px
    background-color: #fff
  }
</style>