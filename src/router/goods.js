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
        component: () => import (/* webpackChunkName: 'goods' */ '@/views/goods/goods/goods'),
        meta: {
          icon: 'iconfont icon-shangpin',
          permission: 'goods',
        },
      },
      {
        path: '/goodsPresale',
        name: '预售商品',
        component: () => import (/* webpackChunkName: 'goodsPresale' */ '@/views/goods/goodsPresale/goodsPresale'),
        meta: {
          icon: 'iconfont icon-yushou',
          permission: 'goodsPresale',
        },
      },
      {
        path: '/goodsPresaleActivity',
        name: '预售活动',
        component: () => import (/* webpackChunkName: 'goodsPresaleActivity' */ '@/views/goods/goodsPresaleActivity/goodsPresaleActivity'),
        meta: {
          icon: 'iconfont icon-RectangleCopy',
          permission: '',
        },
      },
      {
        path: '/goodsLottery',
        name: '抽奖商品',
        component: () => import (/* webpackChunkName: 'goodsLottery' */ '@/views/goods/goodsLottery/goodsLottery'),
        meta: {
          icon: 'iconfont icon-jiangpin',
          permission: '',
        },
      },
      {
        path: '/goodsImgBorder',
        name: '图片边框设置',
        component: () => import (/* webpackChunkName: 'goodsImgBorder' */ '@/views/goods/goodsImgBorder/goodsImgBorder'),
        meta: {
          icon: 'iconfont icon-xiabiankuang',
          permission: '',
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
        component: () => import (/* webpackChunkName: 'goodsNew' */ '@/views/goods/goodsNew/goodsNew'),
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
        path: '/goodsEdit',
        name: '商品编辑',
        component: () => import (/* webpackChunkName: 'goodsEdit' */ '@/views/goods/goodsEdit/goodsEdit'),
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
        path: '/goodsSkuEdit',
        name: '商品sku编辑',
        component: () => import (/* webpackChunkName: 'goodsSkuEdit' */ '@/views/goods/goodsSkuEdit/goodsSkuEdit'),
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
        path: '/goodsBindClassify',
        name: '商品所绑分类',
        component: () => import (/* webpackChunkName: 'goodsBindClassify' */ '@/views/goods/goodsBindClassify/goodsBindClassify'),
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
        path: '/goodsBindClassifyEdit',
        name: '商品所绑分类编辑',
        component: () => import (/* webpackChunkName: 'goodsBindClassifyEdit' */ '@/views/goods/goodsBindClassifyEdit/goodsBindClassifyEdit'),
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
        path: '/goodsBindIp',
        name: '商品所绑ip',
        component: () => import (/* webpackChunkName: 'goodsBindIp' */ '@/views/goods/goodsBindIp/goodsBindIp'),
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
        path: '/goodsBindIpEdit',
        name: '商品所绑ip编辑',
        component: () => import (/* webpackChunkName: 'goodsBindIpEdit' */ '@/views/goods/goodsBindIpEdit/goodsBindIpEdit'),
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
        path: '/goodsPresaleNew',
        name: '预售商品发布',
        component: () => import (/* webpackChunkName: 'goodsPresaleNew' */ '@/views/goods/goodsPresaleNew/goodsPresaleNew'),
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
        path: '/goodsPresaleEdit',
        name: '预售商品编辑',
        component: () => import (/* webpackChunkName: 'goodsPresaleEdit' */ '@/views/goods/goodsPresaleEdit/goodsPresaleEdit'),
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
        path: '/goodsPresaleSkuEdit',
        name: '预售商品sku编辑',
        component: () => import (/* webpackChunkName: 'goodsPresaleSkuEdit' */ '@/views/goods/goodsPresaleSkuEdit/goodsPresaleSkuEdit'),
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
        path: '/goodsPresaleActivityEdit',
        name: '预售商品活动编辑',
        component: () => import (/* webpackChunkName: 'goodsPresaleActivityEdit' */ '@/views/goods/goodsPresaleActivityEdit/goodsPresaleActivityEdit'),
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
        path: '/goodsLotteryEdit',
        name: '抽奖商品编辑',
        component: () => import (/* webpackChunkName: 'goodsLotteryEdit' */ '@/views/goods/goodsLotteryEdit/goodsLotteryEdit'),
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
        path: '/goodsImgBorderEdit',
        name: '商品图片边框编辑',
        component: () => import (/* webpackChunkName: 'goodsImgBorderEdit' */ '@/views/goods/goodsImgBorderEdit/goodsImgBorderEdit'),
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
        path: '/goodsImgBorderBlind',
        name: '商品图片边框绑定',
        component: () => import (/* webpackChunkName: 'goodsImgBorderBlind' */ '@/views/goods/goodsImgBorderBlind/goodsImgBorderBlind'),
        meta: {},
      }
    ]
  },
]