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

          if(item.hidden == true) { // 减少维护成本，不然...
            addRouter.push(item)
          }else{

            let filterRouter = { // 复制单个路由，下面循环把符合条件的子路由赋值给children属性
              path: item.path,
              name: item.name,
              meta: item.meta,
              component: item.component,
              children: [],
            }

            for (let i = 0; i < item.children.length; i++) { // 循环需要权限的路由
              for (let j = 0; j < permission.length; j++) { // 权限第一层(模块权限)
                for (let k = 0; k < permission[j].children.length; k++) { // 权限第二层(页面权限)

                  if(item.children[i].meta.permission == permission[j].children[k].path) { // 有页面权限

                    let btnPermissions = [] // 存放权限第三层(按钮操作权限)的数组
                    if(permission[j].children[k].children) {
                      for (let l = 0; l < permission[j].children[k].children.length; l++) { // 权限第三层(按钮权限)
                        btnPermissions.push(permission[j].children[k].children[l].path) // 把各个按钮权限合并进btnPermissions数组
                      }
                    }
                    item.children[i].meta.btnPermissions = btnPermissions // 给路由添加btnPermissions按钮权限属性

                    filterRouter.children.push(item.children[i]) // 合并筛选的路由
                  }

                }
              }
            }

            addRouter.push(item)

            // if(filterRouter.children.length > 0) {
            //   addRouter.push(filterRouter)
            // }

          }

        })

        commit('setRouter', addRouter)
        resolve()
      })
    }
  }
}

export default permission