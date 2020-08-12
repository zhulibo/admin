import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios'
import store from './store'
import btnPermissions from'./utils/btnPermissions/btnPermissions'; // 按钮指令
import common from './utils/filters/common' // 过滤器
import global from './components/global/global' // 全局变量
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.prototype.$http = axios

Object.keys(common).forEach(key => {
  Vue.filter(key, common[key])
})

Vue.prototype.global = global // 全局变量

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')