export default [
  {
    path: '/',
    name: '供货商订单管理',
    meta: {
      icon: 'iconfont icon-dingdan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/orderSupplierList',
        name: '现货订单管理 ',
        component: () => import (/* webpackChunkName: 'orderSupplierList' */ '@/views/orderSupplier/orderSupplierList'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/orderSupplierPresaleList',
        name: '预售订单管理 ',
        component: () => import (/* webpackChunkName: 'orderSupplierPresaleList' */ '@/views/orderSupplier/orderSupplierPresaleList'),
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
        path: '/orderSupplierDetail',
        name: '供货商现货订单详情',
        component: () => import (/* webpackChunkName: 'orderSupplierDetail' */ '@/views/orderSupplier/orderSupplierDetail'),
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
        component: () => import (/* webpackChunkName: 'orderSupplierPresaleDetail' */ '@/views/orderSupplier/orderSupplierPresaleDetail'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderSupplierPresaleShip',
        name: '供货商预售订单发货',
      }
    ]
  },
]