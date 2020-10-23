export default [
  {
    path: '/',
    name: '统计管理',
    meta: {
      icon: 'iconfont icon-fenlei1',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/dayActiveNumber',
        name: '日活',
        component: () => import (/* webpackChunkName: 'dayActiveNumber' */ '@/views/statistics/dayActiveNumber'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      },
      {
        path: '/registerNumber',
        name: '注册数',
        component: () => import (/* webpackChunkName: 'registerNumber' */ '@/views/statistics/registerNumber'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      }
    ]
  },
]