export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/cashOutList',
        name: '提现管理',
        component: () => import (/* webpackChunkName: 'cashOutList' */ '@/views/cashOut/cashOutList'),
        meta: {
          icon: 'iconfont icon-yonghu',
        },
      },
    ]
  },
]