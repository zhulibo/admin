export default [
  {
    path: '/',
    name: '提现',
    meta: {
      icon: 'iconfont icon-guanliyuan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/cashOut',
        name: '提现 ',
        component: () => import (/* webpackChunkName: 'cashOut' */ '@/views/cashOut/cashOut'),
        meta: {
          icon: 'iconfont icon-yonghu',
          permission: '/cashOut',
        },
      },
    ]
  },
]