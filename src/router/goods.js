export default [
  {
    path: '/',
    name: '商品',
    meta: {
      icon: 'iconfont icon-shangpin1',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/goods',
        name: '商品 ',
        component: () => import (/* webpackChunkName: 'goods' */ '@/views/goods/goods'),
        meta: {
          icon: 'iconfont icon-shangpin',
          permission: '/goods',
        },
      },
      {
        path: '/goodsPresale',
        name: '预售商品',
        component: () => import (/* webpackChunkName: 'goodsPresale' */ '@/views/goods/goodsPresale'),
        meta: {
          icon: 'iconfont icon-yushou',
          permission: '/goodsPresale',
        },
      },
      {
        path: '/goodsPresaleActivity',
        name: '预售活动',
        component: () => import (/* webpackChunkName: 'goodsPresaleActivity' */ '@/views/goods/goodsPresaleActivity'),
        meta: {
          icon: 'iconfont icon-RectangleCopy',
          permission: '/goodsPresaleActivity',
        },
      },
      {
        path: '/goodsLottery',
        name: '抽奖商品',
        component: () => import (/* webpackChunkName: 'goodsLottery' */ '@/views/goods/goodsLottery'),
        meta: {
          icon: 'iconfont icon-jiangpin',
          permission: '/goodsLottery',
        },
      },
      {
        path: '/goodsImgBorder',
        name: '图片边框设置',
        component: () => import (/* webpackChunkName: 'goodsImgBorder' */ '@/views/goods/goodsImgBorder'),
        meta: {
          icon: 'iconfont icon-xiabiankuang',
          permission: '/goodsImgBorder',
        },
      },
      {
        path: '/goodsRecommend',
        name: '推荐商品',
        component: () => import (/* webpackChunkName: 'goodsRecommend' */ '@/views/goods/goodsRecommend'),
        meta: {
          icon: 'iconfont icon-xiabiankuang',
          permission: '/goodsRecommend',
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
        name: '商品发布',
        component: () => import (/* webpackChunkName: 'goodsNew' */ '@/views/goods/goodsNew'),
        meta: {
          permission: '/goodsNew',
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
        path: '/goodsEdit',
        name: '商品编辑',
        component: () => import (/* webpackChunkName: 'goodsEdit' */ '@/views/goods/goodsEdit'),
        meta: {
          permission: '/goodsEdit',
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
        path: '/goodsSkuEdit',
        name: '商品sku编辑',
        component: () => import (/* webpackChunkName: 'goodsSkuEdit' */ '@/views/goods/goodsSkuEdit'),
        meta: {
          permission: '/goodsSkuEdit',
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
        path: '/goodsPresaleNew',
        name: '预售商品发布',
        component: () => import (/* webpackChunkName: 'goodsPresaleNew' */ '@/views/goods/goodsPresaleNew'),
        meta: {
          permission: '/goodsPresaleNew',
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
        path: '/goodsPresaleEdit',
        name: '预售商品编辑',
        component: () => import (/* webpackChunkName: 'goodsPresaleEdit' */ '@/views/goods/goodsPresaleEdit'),
        meta: {
          permission: '/goodsPresaleEdit',
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
        path: '/goodsPresaleSkuEdit',
        name: '预售商品sku编辑',
        component: () => import (/* webpackChunkName: 'goodsPresaleSkuEdit' */ '@/views/goods/goodsPresaleSkuEdit'),
        meta: {
          permission: '/goodsPresaleSkuEdit',
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
        path: '/goodsPresaleActivityEdit',
        name: '预售商品活动编辑',
        component: () => import (/* webpackChunkName: 'goodsPresaleActivityEdit' */ '@/views/goods/goodsPresaleActivityEdit'),
        meta: {
          permission: '/goodsPresaleActivityEdit',
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
        path: '/goodsLotteryEdit',
        name: '抽奖商品编辑',
        component: () => import (/* webpackChunkName: 'goodsLotteryEdit' */ '@/views/goods/goodsLotteryEdit'),
        meta: {
          permission: '/goodsLotteryEdit',
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
        path: '/goodsLotteryCode',
        name: '抽奖码',
        component: () => import (/* webpackChunkName: 'goodsLotteryCode' */ '@/views/goods/goodsLotteryCode'),
        meta: {
          permission: '/goodsLotteryCode',
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
        path: '/goodsImgBorderEdit',
        name: '商品图片边框编辑',
        component: () => import (/* webpackChunkName: 'goodsImgBorderEdit' */ '@/views/goods/goodsImgBorderEdit'),
        meta: {
          permission: '/goodsImgBorderEdit',
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
        path: '/goodsImgBorderBlind',
        name: '商品图片边框绑定',
        component: () => import (/* webpackChunkName: 'goodsImgBorderBlind' */ '@/views/goods/goodsImgBorderBlind'),
        meta: {
          permission: '/goodsImgBorderBlind',
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
        path: '/goodsRecommendEdit',
        name: '推荐商品编辑',
        component: () => import (/* webpackChunkName: 'goodsRecommendEdit' */ '@/views/goods/goodsRecommendEdit'),
        meta: {
          permission: '/goodsRecommendEdit',
        },
      }
    ]
  },
]