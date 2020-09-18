import Vue from 'vue'

Vue.directive('permission', {
  inserted(el, binding, vnode) {

    const { value } = binding
    const btnPermissions = value
    const roles = vnode.context.$route.meta.btnPermissions || [] // 获取mate中的权限

    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = roles.some(role => {
        return btnPermissions.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`需要的权限，v-permission="[]"`)
    }

  },
})