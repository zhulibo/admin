export default [
  {
    path: '/',
    name: '权限',
    meta: {
      roleSet: ['admin', 'superAdmin'],
      icon: 'iconfont icon-bianji',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/test1',
        name: '权限1',
        component: () => import (/* webpackChunkName: 'test1' */ '@/views/test1/test1'),
        meta: {
          roleSet: ['admin', 'superAdmin'],
          icon: 'iconfont icon-bianji',
        },
      },
      {
        path: '/test2',
        name: '权限2',
        component: () => import (/* webpackChunkName: 'test2' */ '@/views/test2/test2'),
        meta: {
          roleSet: [],
          icon: 'iconfont icon-bianji',
        },
      },
    ]
  },
]