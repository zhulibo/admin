import {constantRouter, asyncRouter} from "../../router";
import router from '../../router'

const permission = {
  state: {
    routers: constantRouter,
  },
  mutations: {
    setRouter: (state, addRouter) => {
      // console.log(addRouter)
      state.routers = constantRouter.concat(addRouter);
      router.addRoutes(addRouter)
    }
  },
  actions: {
    updateRouter({ commit }, roleSet) {
      return new Promise(resolve => {

        const addRouter = asyncRouter.filter(v => {
          for (let i = 0; i < v.meta.roleSet.length; i++) {
            for (let j = 0; j < roleSet.length; j++) {
              if (v.meta.roleSet[i] == roleSet[j].rolename) {
                return true
              }
            }
          }
          return false
        })

        commit('setRouter', addRouter)
        resolve()
      })
    }
  }
}

export default permission