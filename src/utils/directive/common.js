import Vue from 'vue'

Vue.directive('permission', {
  inserted(el, binding, vnode) {

    const {value} = binding
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

Vue.directive('drag', {
  inserted(el, binding, vnode) {

    el.onmousedown = e => {
      // 点击处和div左上角的位差
      let disX = e.clientX - el.offsetLeft
      let disY = e.clientY - el.offsetTop
      document.onmousemove = e => {
        // 鼠标移动时计算出div左上角的坐标值
        let left = e.clientX - disX
        let top = e.clientY - disY
        // 防止拖出可视区域
        if (left < 0) {
          left = 0;
        } else if (left > document.documentElement.clientWidth - el.offsetWidth + 600) {
          left = document.documentElement.clientWidth - el.offsetWidth + 600;
        }
        if (top < 0) {
          top = 0;
        } else if (top > document.documentElement.clientHeight - el.offsetHeight + 500) {
          top = document.documentElement.clientHeight - el.offsetHeight + 500
        }
        el.style.right = "auto"
        el.style.bottom = "auto"
        el.style.left = left + "px"
        el.style.top = top + "px"
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
      };
      document.onmouseup = e => {
        // 鼠标弹起来的时候不再移动
        document.onmousemove = null
        // 退出onmouseup时间循环
        document.onmouseup = null
      }
    }

  },
})

Vue.directive('stopDrag', {
  inserted(el, binding, vnode) {

    el.onmousedown = function (e) {
      e.stopPropagation()
    }

  },
})
