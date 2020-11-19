export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/test',
        name: '测试',
        component: () => import (/* webpackChunkName: 'test' */ '@/views/test/test'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      },
    ]
  },
]