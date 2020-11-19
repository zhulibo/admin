export default [
  {
    path: '/',
    name: '商品管理',
    meta: {
      icon: 'iconfont icon-shangpin1',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/goodsList',
        name: '现货商品管理',
        component: () => import (/* webpackChunkName: 'goodsList' */ '@/views/goods/goodsList'),
        meta: {
          icon: 'iconfont icon-shangpin',
        },
      },
      {
        path: '/goodsPresaleList',
        name: '预售商品管理',
        component: () => import (/* webpackChunkName: 'goodsPresaleList' */ '@/views/goods/goodsPresaleList'),
        meta: {
          icon: 'iconfont icon-yushou',
        },
      },
      {
        path: '/goodsPresaleActivityList',
        name: '预售活动管理',
        component: () => import (/* webpackChunkName: 'goodsPresaleActivityList' */ '@/views/goods/goodsPresaleActivityList'),
        meta: {
          icon: 'iconfont icon-RectangleCopy',
        },
      },
      {
        path: '/goodsLotteryList',
        name: '抽奖商品管理',
        component: () => import (/* webpackChunkName: 'goodsLotteryList' */ '@/views/goods/goodsLotteryList'),
        meta: {
          icon: 'iconfont icon-jiangpin',
        },
      },
      {
        path: '/goodsRecommendList',
        name: '推荐商品管理',
        component: () => import (/* webpackChunkName: 'goodsRecommendList' */ '@/views/goods/goodsRecommendList'),
        meta: {
          icon: 'iconfont icon-tuijian',
        },
      },
      {
        path: '/goodsImgBorderList',
        name: '图片边框管理',
        component: () => import (/* webpackChunkName: 'goodsImgBorderList' */ '@/views/goods/goodsImgBorderList'),
        meta: {
          icon: 'iconfont icon-xiabiankuang',
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
        path: '/goodsNew',
        name: '现货商品发布',
        component: () => import (/* webpackChunkName: 'goodsNew' */ '@/views/goods/goodsNew'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsEdit',
        name: '现货商品编辑',
        component: () => import (/* webpackChunkName: 'goodsEdit' */ '@/views/goods/goodsEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsSellerSupplier',
        name: '现货商品在售供货商',
        component: () => import (/* webpackChunkName: 'goodsSellerSupplier' */ '@/views/goods/goodsSellerSupplier'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsDel',
        name: '现货商品删除',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsSkuEdit',
        name: '现货商品sku编辑',
        component: () => import (/* webpackChunkName: 'goodsSkuEdit' */ '@/views/goods/goodsSkuEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsPresaleNew',
        name: '预售商品发布',
        component: () => import (/* webpackChunkName: 'goodsPresaleNew' */ '@/views/goods/goodsPresaleNew'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsPresaleEdit',
        name: '预售商品编辑',
        component: () => import (/* webpackChunkName: 'goodsPresaleEdit' */ '@/views/goods/goodsPresaleEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsPresaleDel',
        name: '预售商品删除',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsPresaleSkuEdit',
        name: '预售商品sku编辑',
        component: () => import (/* webpackChunkName: 'goodsPresaleSkuEdit' */ '@/views/goods/goodsPresaleSkuEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsPresaleActivityEdit',
        name: '预售设置',
        component: () => import (/* webpackChunkName: 'goodsPresaleActivityEdit' */ '@/views/goods/goodsPresaleActivityEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsPresaleActivityStartPay',
        name: '开始付尾款',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsPresaleActivityEndPay',
        name: '结束预售',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsLotteryEdit',
        name: '抽奖商品编辑',
        component: () => import (/* webpackChunkName: 'goodsLotteryEdit' */ '@/views/goods/goodsLotteryEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsLotteryCodeList',
        name: '抽奖码列表',
        component: () => import (/* webpackChunkName: 'goodsLotteryCodeList' */ '@/views/goods/goodsLotteryCodeList'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsRecommendDel',
        name: '推荐商品删除',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsImgBorderEdit',
        name: '图片边框编辑',
        component: () => import (/* webpackChunkName: 'goodsImgBorderEdit' */ '@/views/goods/goodsImgBorderEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsImgBorderBlindNew',
        name: '图片边框绑定新商品',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/goodsImgBorderBlindList',
        name: '图片边框已绑商品列表',
        component: () => import (/* webpackChunkName: 'goodsImgBorderBlindList' */ '@/views/goods/goodsImgBorderBlindList'),
      }
    ]
  },
]