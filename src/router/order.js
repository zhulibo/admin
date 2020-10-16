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
          icon: 'iconfont icon-dingdan',
          permission: '/order',
        },
      },
      {
        path: '/orderPresale',
        name: '预售订单',
        component: () => import (/* webpackChunkName: 'order' */ '@/views/order/orderPresale'),
        meta: {
          icon: 'iconfont icon-dingdan',
          permission: '/orderPresale',
        },
      },
      {
        path: '/orderSupplier',
        name: '供货商订单',
        component: () => import (/* webpackChunkName: 'orderSupplier' */ '@/views/order/orderSupplier'),
        meta: {
          icon: 'iconfont icon-dingdan',
          permission: '/orderSupplier',
        },
      },
      {
        path: '/orderSupplierPresale',
        name: '供货商预售订单',
        component: () => import (/* webpackChunkName: 'orderSupplier' */ '@/views/order/orderSupplierPresale'),
        meta: {
          icon: 'iconfont icon-dingdan',
          permission: '/orderSupplierPresale',
        },
      },
      {
        path: '/orderRepair',
        name: '修复订单',
        component: () => import (/* webpackChunkName: 'orderRepair' */ '@/views/order/orderRepair'),
        meta: {
          icon: 'iconfont icon-dingdan',
          permission: '/orderRepair',
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
        name: '订单详情',
        component: () => import (/* webpackChunkName: 'orderDetail' */ '@/views/order/orderDetail'),
        meta: {
          permission: '/orderDetail',
        },
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
        meta: {
          permission: '/orderPresaleDetail',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderSupplierDetail',
        name: '供货商订单详情',
        component: () => import (/* webpackChunkName: 'orderSupplierDetail' */ '@/views/order/orderSupplierDetail'),
        meta: {
          permission: '/orderSupplierDetail',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderSupplierPresaleDetail',
        name: '供货商预售订单详情',
        component: () => import (/* webpackChunkName: 'orderSupplierPresaleDetail' */ '@/views/order/orderSupplierPresaleDetail'),
        meta: {
          permission: '/orderSupplierPresaleDetail',
        },
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
        meta: {
          permission: '/orderRepairDetail',
        },
      }
    ]
  },
]