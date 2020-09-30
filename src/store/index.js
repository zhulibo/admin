import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import login from './modules/login'
import permission from './modules/permission'
import theme from './modules/theme'

export default new Vuex.Store({
  getters,
  modules: {
    login,
    permission,
    theme,
  }
})