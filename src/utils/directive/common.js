import Vue from 'vue'
import store from '../../store'
import {Message} from 'element-ui'

Vue.directive('permission', {
  inserted(el, binding, vnode) {

    const {value} = binding
    const btnPermission = value
    const roles = store.getters.routers

    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = roles.some(role => {
        if(role.children) {
          for (let i = 0; i < role.children.length; i++) {
            if(btnPermission == role.children[i].path) return true
          }
          return false
        }
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
        } else if (left > document.documentElement.clientWidth - 100) {
          left = document.documentElement.clientWidth - 100;
        }
        if (top < 0) {
          top = 0;
        } else if (top > document.documentElement.clientHeight - 40) {
          top = document.documentElement.clientHeight - 40
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

Vue.directive('copy', {
  inserted(el, binding, vnode) {

    el.onmousedown = (e) => {
      const { value } = binding
      let input = document.createElement('input')
      input.value = value
      document.body.appendChild(input)
      input.select() // 选择input
      document.execCommand("Copy") // 执行浏览器复制命令
      Message({
        message: '复制成功',
        type: 'success'
      })
      input.remove()
    }

  },
})
