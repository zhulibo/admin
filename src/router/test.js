export default [
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