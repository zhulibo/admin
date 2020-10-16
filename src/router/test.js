export default [
  {
    path: '/',
    dev: true,
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/chatCt',
        name: '客服聊天',
        component: () => import (/* webpackChunkName: 'chatCt' */ '@/views/test/chatCt'),
        meta: {
          icon: 'iconfont icon-bianji',
          permission: '/chatCt',
        },
      }
    ]
  },
  {
    path: '/',
    dev: true,
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/test',
        name: '测试',
        component: () => import (/* webpackChunkName: 'test' */ '@/views/test/test'),
        meta: {
          icon: 'iconfont icon-bianji',
          permission: '/test',
        },
      },
    ]
  },
]