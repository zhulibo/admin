export default [
  {
    path: '/',
    name: '供货商',
    meta: {
      icon: 'iconfont icon-huowudui',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/supplierStore',
        name: '仓库',
        component: () => import (/* webpackChunkName: 'supplierStore' */ '@/views/supplier/supplierStore'),
        meta: {
          icon: 'iconfont icon-cangku',
        },
      },
      {
        path: '/supplierAddress',
        name: '发货地址',
        component: () => import (/* webpackChunkName: 'supplierAddress' */ '@/views/supplier/supplierAddress'),
        meta: {
          icon: 'iconfont icon-dizhi',
        },
      },
      {
        path: '/supplierCarriage',
        name: '运费',
        component: () => import (/* webpackChunkName: 'supplierCarriage' */ '@/views/supplier/supplierCarriage'),
        meta: {
          icon: 'iconfont icon-mianyunfei',
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
        path: '/supplierAddressEdit',
        name: '发货地址编辑',
        component: () => import (/* webpackChunkName: 'supplierAddressEdit' */ '@/views/supplier/supplierAddressEdit'),
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
        path: '/supplierCarriageEdit',
        name: '运费编辑',
        component: () => import (/* webpackChunkName: 'supplierCarriageEdit' */ '@/views/supplier/supplierCarriageEdit'),
        meta: {},
      }
    ]
  },
]