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
          icon: 'iconfont icon-tixian1',
        },
      },
    ]
  },
  {
    path: '/',
    hidden: true,
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/cashOutChangeStatus',
        name: '修改提现状态',
      },
    ]
  },
  {
    path: '/',
    hidden: true,
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/cashOutChangeBalance',
        name: '修改提现余额',
      },
    ]
  },
]