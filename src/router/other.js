export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/richTextCt',
        name: '模玩百科',
        component: () => import (/* webpackChunkName: 'richTextCt' */ '@/views/richTextCt/richTextCt'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/theme',
        name: '主题',
        component: () => import (/* webpackChunkName: 'theme' */ '@/views/theme/theme'),
        meta: {
          icon: 'iconfont icon-yanse',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/vueEcharts',
        name: '图表',
        component: () => import (/* webpackChunkName: 'vueEcharts' */ '@/views/vueEcharts/vueEcharts'),
        meta: {
          icon: 'iconfont icon-bianji',
          permissions: [1, 2, 3]
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/chatCt',
        name: '客服聊天',
        component: () => import (/* webpackChunkName: 'chatCt' */ '@/views/chatCt/chatCt'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      }
    ]
  },
]