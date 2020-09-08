import Vue from 'vue'

Vue.directive('permission', {
  inserted(el, binding, vnode) {
    const {value} = binding
    const roles = vnode.context.$route.meta.permissions || [] // 获取mate中的权限
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`需要的权限， v-permission="['1','2','3','4']"`)
    }
  },
})