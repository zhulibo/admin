export default [
  {
    path: '/',
    name: '订单',
    meta: {
      icon: 'iconfont icon-dingdan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/order',
        name: '订单 ',
        component: () => import (/* webpackChunkName: 'order' */ '@/views/order/order'),
        meta: {
          icon: 'iconfont icon-cangku',
        },
      },
    ]
  },
]