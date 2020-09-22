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
        },
      },
      {
        path: '/orderPresale',
        name: '预售订单 ',
        component: () => import (/* webpackChunkName: 'order' */ '@/views/order/orderPresale'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/orderSupplier',
        name: '供应商订单',
        component: () => import (/* webpackChunkName: 'orderSupplier' */ '@/views/order/orderSupplier'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/orderSupplierPresale',
        name: '供应商预售订单 ',
        component: () => import (/* webpackChunkName: 'orderSupplier' */ '@/views/order/orderSupplierPresale'),
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
        name: '订单详情',
        component: () => import (/* webpackChunkName: 'orderDetail' */ '@/views/order/orderDetail'),
        meta: {},
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
        meta: {},
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
        name: '供应商订单详情',
        component: () => import (/* webpackChunkName: 'orderSupplierDetail' */ '@/views/order/orderSupplierDetail'),
        meta: {},
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
        name: '供应商预售订单详情',
        component: () => import (/* webpackChunkName: 'orderSupplierPresaleDetail' */ '@/views/order/orderSupplierPresaleDetail'),
        meta: {},
      }
    ]
  },
]