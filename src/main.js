import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios'
import store from './store'
// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.prototype.$http = axios
Vue.config.productionTip = false

import common from './utils/filters/common'
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(common).forEach(key => {
  Vue.filter(key, common[key])
})

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')