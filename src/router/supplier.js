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
          permission: '/supplierStore',
        },
      },
      {
        path: '/supplierGoods',
        name: '出售商品',
        component: () => import (/* webpackChunkName: 'supplierGoods' */ '@/views/supplier/supplierGoods'),
        meta: {
          icon: 'iconfont icon-cangku',
          permission: '/supplierGoods',
        },
      },
      {
        path: '/supplierAddress',
        name: '发货地址',
        component: () => import (/* webpackChunkName: 'supplierAddress' */ '@/views/supplier/supplierAddress'),
        meta: {
          icon: 'iconfont icon-dizhi',
          permission: '/supplierAddress',
        },
      },
      {
        path: '/supplierCarriage',
        name: '运费',
        component: () => import (/* webpackChunkName: 'supplierCarriage' */ '@/views/supplier/supplierCarriage'),
        meta: {
          icon: 'iconfont icon-mianyunfei',
          permission: '/supplierCarriage',
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
        path: '/supplierGoodsStockAdd',
        name: '添加库存',
        component: () => import (/* webpackChunkName: 'supplierGoodsStockAdd' */ '@/views/supplier/supplierGoodsStockAdd'),
        meta: {
          permission: '/supplierGoodsStockAdd',
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
        path: '/supplierGoodsStockEdit',
        name: '编辑库存',
        component: () => import (/* webpackChunkName: 'supplierGoodsStockEdit' */ '@/views/supplier/supplierGoodsStockEdit'),
        meta: {
          permission: '/supplierGoodsStockEdit',
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
        path: '/supplierAddressEdit',
        name: '发货地址编辑',
        component: () => import (/* webpackChunkName: 'supplierAddressEdit' */ '@/views/supplier/supplierAddressEdit'),
        meta: {
          permission: '/supplierAddressEdit',
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
        path: '/supplierCarriageEdit',
        name: '运费编辑',
        component: () => import (/* webpackChunkName: 'supplierCarriageEdit' */ '@/views/supplier/supplierCarriageEdit'),
        meta: {
          permission: '/supplierCarriageEdit',
        },
      }
    ]
  },
]