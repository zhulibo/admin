export default [
  {
    dev: true,
    path: '/',
    name: '统计数据',
    meta: {
      icon: 'iconfont icon-tongji',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/statisticsUserIndex',
        name: '用户统计',
        component: () => import (/* webpackChunkName: 'statisticsUserIndex' */ '@/views/statistics/statisticsUserIndex'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      },
      {
        path: '/statisticsOrderIndex',
        name: '订单统计',
        component: () => import (/* webpackChunkName: 'statisticsOrderIndex' */ '@/views/statistics/statisticsOrderIndex'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      },
    ]
  },
  {
    dev: true,
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/statisticsUserDetail',
        name: '用户统计详情',
        component: () => import (/* webpackChunkName: 'statisticsUserDetail' */ '@/views/statistics/statisticsUserDetail'),
      }
    ]
  },
  {
    dev: true,
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/statisticsOrderSupplier',
        name: '订单统计供货商',
        component: () => import (/* webpackChunkName: 'statisticsOrderSupplier' */ '@/views/statistics/statisticsOrderSupplier'),
      }
    ]
  },
  {
    dev: true,
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/statisticsOrderNumber',
        name: '订单统计详情',
        component: () => import (/* webpackChunkName: 'statisticsOrderNumber' */ '@/views/statistics/statisticsOrderNumber'),
      }
    ]
  },
  {
    dev: true,
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/statisticsOrderDeal',
        name: '订单统计交易',
        component: () => import (/* webpackChunkName: 'statisticsOrderDeal' */ '@/views/statistics/statisticsOrderDeal'),
      }
    ]
  },
  {
    dev: true,
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/statisticsOrderLogistics',
        name: '订单统计物流',
        component: () => import (/* webpackChunkName: 'statisticsOrderLogistics' */ '@/views/statistics/statisticsOrderLogistics'),
      }
    ]
  },
]