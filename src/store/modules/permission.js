import {constantRouter, asyncRouter} from "../../router";
import router from '../../router'

const permission = {
  state: {
    routers: constantRouter,
  },
  getters: {
    routers: state => state.routers,
  },
  mutations: {
    setRouter: (state, addRouter) => {
      // console.log(addRouter)
      state.routers = constantRouter.concat(addRouter)
      router.addRoutes(addRouter)
    }
  },
  actions: {
    updateRouter({commit}, permission) {
      return new Promise(resolve => {

        let addRouter = []
        asyncRouter.forEach(item => {

          let filterRouter = { // 复制单个路由，下面循环把符合条件的子路由赋值给children属性
            path: item.path,
            name: item.name,
            hidden: item.hidden,
            meta: item.meta,
            component: item.component,
            children: [],
          }

          if (item.dev){ // 测试
            filterRouter.children = item.children
          }else{

            for (let i = 0; i < item.children.length; i++) { // 循环需要权限的路由
              for (let j = 0; j < permission.length; j++) { // 权限第一层(模块权限)
                if (item.children[i].path == permission[j].privilege) {
                  filterRouter.children.push(item.children[i]) // 合并筛选的路由
                }
              }
            }

          }

          // addRouter.push(item) // 不启用路由过滤

          if(filterRouter.children.length > 0) { // 添加符合条件的路由
            addRouter.push(filterRouter)
          }

        })

        // console.log(addRouter)
        commit('setRouter', addRouter)
        resolve()
      })
    }
  }
}

export default permission