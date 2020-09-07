import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouter = [
  {
    path: '/',
    redirect: {path: '/admin'},
    hidden: true,
  },
  {
    path: '/',
    name: 'index',
    component: () => import (/* webpackChunkName: 'index' */ '@/views/index/index'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import (/* webpackChunkName: 'login' */ '@/views/login/login'),
    hidden: true,
  },
  {
    path: '/',
    name: '用户',
    meta: {
      icon: 'iconfont icon-guanliyuan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/user',
        name: '用户 ',
        component: () => import (/* webpackChunkName: 'user' */ '@/views/user/user'),
        meta: {
          icon: 'iconfont icon-yonghu',
        },
      },
      // {
      //   path: '/businessMan',
      //   name: '商家',
      //   component: () => import (/* webpackChunkName: 'businessMan' */ '@/views/businessMan/businessMan'),
      //   meta: {
      //     icon: 'iconfont icon-shangjia',
      //   },
      // }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/userEdit',
        name: '用户编辑',
        component: () => import (/* webpackChunkName: 'userEdit' */ '@/views/userEdit/userEdit'),
        meta: {
          icon: 'iconfont icon-yonghu',
        },
      }
    ]
  },
  // {
  //   path: '/',
  //   component: () => import ('@/views/index/index'),
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/businessManEdit',
  //       name: '商家编辑',
  //       component: () => import (/* webpackChunkName: 'businessManEdit' */ '@/views/businessManEdit/businessManEdit'),
  //       meta: {
  //         icon: 'iconfont icon-yonghu',
  //       },
  //     }
  //   ]
  // },
  {
    path: '/',
    name: '管理员',
    meta: {
      icon: 'iconfont icon-guanliyuan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/admin',
        name: '管理员 ',
        component: () => import (/* webpackChunkName: 'admin' */ '@/views/admin/admin'),
        meta: {
          icon: 'iconfont icon-guanliyuan',
        },
      },
      {
        path: '/role',
        name: '角色',
        component: () => import (/* webpackChunkName: 'role' */ '@/views/role/role'),
        meta: {
          icon: 'iconfont icon-jiaoseleixing',
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
        path: '/adminEdit',
        name: '管理员编辑',
        component: () => import (/* webpackChunkName: 'adminEdit' */ '@/views/adminEdit/adminEdit'),
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
        path: '/roleEdit',
        name: '角色编辑',
        component: () => import (/* webpackChunkName: 'roleEdit' */ '@/views/roleEdit/roleEdit'),
        meta: {},
      }
    ]
  },
  {
    path: '/',
    name: '分类',
    meta: {
      icon: 'iconfont icon-fenlei1',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/classifyLevelOne',
        name: '一级分类',
        component: () => import (/* webpackChunkName: 'classifyLevelOne' */ '@/views/classify/classifyLevelOne/classifyLevelOne'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyLevelTwo',
        name: '二级分类',
        component: () => import (/* webpackChunkName: 'classifyLevelTwo' */ '@/views/classify/classifyLevelTwo/classifyLevelTwo'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyModule',
        name: '模块',
        component: () => import (/* webpackChunkName: 'classifyModule' */ '@/views/classify/classifyModule/classifyModule'),
        meta: {
          icon: 'iconfont icon-danmokuai',
        },
      },
      {
        path: '/classifyConsole',
        name: '管理分类',
        component: () => import (/* webpackChunkName: 'classifyConsole' */ '@/views/classify/classifyConsole/classifyConsole'),
        meta: {
          icon: 'iconfont icon-ziyuan',
        },
      },
      {
        path: '/classifyIndexHot',
        name: '头部多行分类',
        // name: '首页热门分类',
        component: () => import (/* webpackChunkName: 'classifyIndexHot' */ '@/views/classify/classifyIndexHot/classifyIndexHot'),
        meta: {
          icon: 'iconfont icon-fenlei2',
        },
      },
      {
        path: '/classifyIndexTab',
        name: '横向单行分类',
        // name: '首页列表分类',
        component: () => import (/* webpackChunkName: 'classifyIndexTab' */ '@/views/classify/classifyIndexTab/classifyIndexTab'),
        meta: {
          icon: 'iconfont icon-fenlei2',
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
        path: '/classifyLevelOneEdit',
        name: '一级分类编辑',
        component: () => import (/* webpackChunkName: 'classifyLevelOneEdit' */ '@/views/classify/classifyLevelOneEdit/classifyLevelOneEdit'),
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
        path: '/classifyLevelTwoEdit',
        name: '二级分类编辑',
        component: () => import (/* webpackChunkName: 'classifyLevelTwoEdit' */ '@/views/classify/classifyLevelTwoEdit/classifyLevelTwoEdit'),
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
        path: '/classifyModuleEdit',
        name: '模块编辑',
        component: () => import (/* webpackChunkName: 'classifyModuleEdit' */ '@/views/classify/classifyModuleEdit/classifyModuleEdit'),
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
        path: '/classifyIndexHotEdit',
        name: '首页热门分类编辑',
        component: () => import (/* webpackChunkName: 'classifyIndexHotEdit' */ '@/views/classify/classifyIndexHotEdit/classifyIndexHotEdit'),
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
        path: '/classifyIndexTabEdit',
        name: '首页列表分类编辑',
        component: () => import (/* webpackChunkName: 'classifyIndexTabEdit' */ '@/views/classify/classifyIndexTabEdit/classifyIndexTabEdit'),
        meta: {},
      }
    ]
  },
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
        },
      },
      {
        path: '/goodsPresale',
        name: '预售商品',
        component: () => import (/* webpackChunkName: 'goodsPresale' */ '@/views/goods/goodsPresale/goodsPresale'),
        meta: {
          icon: 'iconfont icon-yushou',
        },
      },
      {
        path: '/goodsPresaleActivity',
        name: '预售活动',
        component: () => import (/* webpackChunkName: 'goodsPresaleActivity' */ '@/views/goods/goodsPresaleActivity/goodsPresaleActivity'),
        meta: {
          icon: 'iconfont icon-RectangleCopy',
        },
      },
      {
        path: '/goodsLottery',
        name: '抽奖商品',
        component: () => import (/* webpackChunkName: 'goodsLottery' */ '@/views/goods/goodsLottery/goodsLottery'),
        meta: {
          icon: 'iconfont icon-jiangpin',
        },
      },
      {
        path: '/goodsImgBorder',
        name: '图片边框设置',
        component: () => import (/* webpackChunkName: 'goodsImgBorder' */ '@/views/goods/goodsImgBorder/goodsImgBorder'),
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
          icon: 'iconfont icon-cangku',
        },
      },
    ]
  },
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
        component: () => import (/* webpackChunkName: 'supplierStore' */ '@/views/supplier/supplierStore/supplierStore'),
        meta: {
          icon: 'iconfont icon-cangku',
        },
      },
      {
        path: '/supplierAddress',
        name: '发货地址',
        component: () => import (/* webpackChunkName: 'supplierAddress' */ '@/views/supplier/supplierAddress/supplierAddress'),
        meta: {
          icon: 'iconfont icon-dizhi',
        },
      },
      {
        path: '/supplierCarriage',
        name: '运费',
        component: () => import (/* webpackChunkName: 'supplierCarriage' */ '@/views/supplier/supplierCarriage/supplierCarriage'),
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
        component: () => import (/* webpackChunkName: 'supplierAddressEdit' */ '@/views/supplier/supplierAddressEdit/supplierAddressEdit'),
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
        component: () => import (/* webpackChunkName: 'supplierCarriageEdit' */ '@/views/supplier/supplierCarriageEdit/supplierCarriageEdit'),
        meta: {},
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/social',
        name: '社交动态',
        component: () => import (/* webpackChunkName: 'social' */ '@/views/social/social'),
        meta: {
          icon: 'iconfont icon-pengyouquan',
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
        path: '/socialEdit',
        name: '社交动态编辑',
        component: () => import (/* webpackChunkName: 'socialEdit' */ '@/views/socialEdit/socialEdit'),
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
        path: '/socialComment',
        name: '社交动态评论',
        component: () => import (/* webpackChunkName: 'socialComment' */ '@/views/socialComment/socialComment'),
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
        path: '/socialCommentEdit',
        name: '社交动态评论编辑',
        component: () => import (/* webpackChunkName: 'socialCommentEdit' */ '@/views/socialCommentEdit/socialCommentEdit'),
        meta: {},
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/tribe',
        name: '部落',
        component: () => import (/* webpackChunkName: 'tribe' */ '@/views/tribe/tribe'),
        meta: {
          icon: 'iconfont icon-zhangpeng',
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
        path: '/tribeMember',
        name: '部落成员',
        component: () => import (/* webpackChunkName: 'tribeMember' */ '@/views/tribeMember/tribeMember'),
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
        path: '/tribeEdit',
        name: '部落编辑',
        component: () => import (/* webpackChunkName: 'tribeEdit' */ '@/views/tribeEdit/tribeEdit'),
        meta: {},
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/richTextCt',
        name: '模玩百科',
        component: () => import (/* webpackChunkName: 'richTextCt' */ '@/views/richTextCt/richTextCt'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/theme',
        name: '主题',
        component: () => import (/* webpackChunkName: 'theme' */ '@/views/theme/theme'),
        meta: {
          icon: 'iconfont icon-yanse',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/vueEcharts',
        name: '图表',
        component: () => import (/* webpackChunkName: 'vueEcharts' */ '@/views/vueEcharts/vueEcharts'),
        meta: {
          icon: 'iconfont icon-bianji',
          permissions: [1, 2, 3]
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/chatCt',
        name: '客服聊天',
        component: () => import (/* webpackChunkName: 'chatCt' */ '@/views/chatCt/chatCt'),
        meta: {
          icon: 'iconfont icon-bianji',
        },
      }
    ]
  },
]

export default new Router({
  routes: constantRouter,
});

export const asyncRouter = [
  {
    path: '/',
    name: '权限',
    meta: {
      roleSet: ['admin', 'superAdmin'],
      icon: 'iconfont icon-bianji',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/test1',
        name: '权限1',
        component: () => import (/* webpackChunkName: 'test1' */ '@/views/test1/test1'),
        meta: {
          roleSet: ['admin', 'superAdmin'],
          icon: 'iconfont icon-bianji',
        },
      },
      {
        path: '/test2',
        name: '权限2',
        component: () => import (/* webpackChunkName: 'test2' */ '@/views/test2/test2'),
        meta: {
          roleSet: [],
          icon: 'iconfont icon-bianji',
        },
      },
    ]
  },
]