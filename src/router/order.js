export default [
  {
    path: '/',
    name: '订单管理',
    meta: {
      icon: 'iconfont icon-dingdan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/orderList',
        name: '现货订单管理',
        component: () => import (/* webpackChunkName: 'orderList' */ '@/views/order/orderList'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/orderPresaleList',
        name: '预售订单管理',
        component: () => import (/* webpackChunkName: 'orderPresaleList' */ '@/views/order/orderPresaleList'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/orderRepairList',
        name: '修复订单管理',
        component: () => import (/* webpackChunkName: 'orderRepairList' */ '@/views/order/orderRepairList'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderDetail',
        name: '现货订单详情',
        component: () => import (/* webpackChunkName: 'orderDetail' */ '@/views/order/orderDetail'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderConfirmReceipt',
        name: '现货订单确认收货',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderCancleOrder',
        name: '现货订单取消',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderPresaleDetail',
        name: '预售订单详情',
        component: () => import (/* webpackChunkName: 'orderPresaleDetail' */ '@/views/order/orderPresaleDetail'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderPresaleCancleOrder',
        name: '预售订单取消',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderRepairDetail',
        name: '修复订单详情',
        component: () => import (/* webpackChunkName: 'orderRepairDetail' */ '@/views/order/orderRepairDetail'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderRepairFirstEvaluation',
        name: '修复订单初次评审',
      },
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderRepairSecondEvaluation',
        name: '修复订单二次评估',
      },
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderRepairReceived',
        name: '修复订单平台已收货',
      },
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderRepairRepairOver',
        name: '修复订单修复完成',
      },
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderRepairShip',
        name: '修复订单发货',
      },
    ]
  },
]