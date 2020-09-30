export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/chatCt',
        name: '客服聊天',
        component: () => import (/* webpackChunkName: 'chatCt' */ '@/views/test/chatCt'),
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
        path: '/other',
        name: '图表',
        component: () => import (/* webpackChunkName: 'other' */ '@/views/test/vueEcharts'),
        meta: {
          icon: 'iconfont icon-bianji',
          permissions: [1, 2, 3]
        },
      }
    ]
  },
  {
    path: '/',
    name: '权限',
    meta: {
      icon: 'iconfont icon-bianji',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/test',
        name: '测试页',
        component: () => import (/* webpackChunkName: 'test' */ '@/views/test/test'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      },
    ]
  },
]