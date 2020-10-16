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
                for (let k = 0; k < permission[j].children.length; k++) { // 权限第二层(页面权限)

                  if (item.hidden == true){ // 不在导航栏的路由
                    if (permission[j].children[k].children) { // 有第三层

                      for (let l = 0; l < permission[j].children[k].children.length; l++) { // 权限第三层(按钮权限)
                        if(item.children[0].meta.permission == permission[j].children[k].children[l].path){
                          filterRouter.children.push(item.children[i]) // 合并筛选的路由
                          break
                        }
                      }

                    }
                  }else{ // 在导航栏的路由
                    if (item.children[i].meta.permission == permission[j].children[k].path) { // 有页面权限

                      let btnPermission = [] // 存放权限第三层(按钮操作权限)的数组
                      if (permission[j].children[k].children) { // 有第三层

                        for (let l = 0; l < permission[j].children[k].children.length; l++) { // 权限第三层(按钮权限)
                          btnPermission.push(permission[j].children[k].children[l].path) // 把各个按钮权限合并进btnPermission数组
                        }

                      }
                      item.children[i].meta.btnPermission = btnPermission // 给路由添加btnPermission按钮权限属性
                      filterRouter.children.push(item.children[i]) // 合并筛选的路由

                    }
                  }

                }
              }
            }

          }

          // addRouter.push(item) // 不启用路由过滤

          if(filterRouter.children.length > 0 || item.dev) { // 添加符合条件的路由
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