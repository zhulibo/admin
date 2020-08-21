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
        name: '用户列表',
        component: () => import (/* webpackChunkName: 'user' */ '@/views/user/user'),
        meta: {
          icon: 'iconfont icon-yonghu',
        },
      },
      {
        path: '/businessMan',
        name: '商家列表',
        component: () => import (/* webpackChunkName: 'businessMan' */ '@/views/businessMan/businessMan'),
        meta: {
          icon: 'iconfont icon-shangjia',
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
        path: '/userEdit',
        name: '用户编辑',
        component: () => import (/* webpackChunkName: 'userEdit' */ '@/views/userEdit/userEdit'),
        meta: {
          icon: 'iconfont icon-yonghu',
        },
      }
    ]
  },
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
        name: '管理员列表',
        component: () => import (/* webpackChunkName: 'admin' */ '@/views/admin/admin'),
        meta: {
          icon: 'iconfont icon-guanliyuan',
        },
      },
      {
        path: '/role',
        name: '角色列表',
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
    name: '分类',
    meta: {
      icon: 'iconfont icon-fenlei1',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/classifyLevelOne',
        name: '一级分类',
        component: () => import (/* webpackChunkName: 'classifyLevelOne' */ '@/views/classifyLevelOne/classifyLevelOne'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyLevelTwo',
        name: '二级分类',
        component: () => import (/* webpackChunkName: 'classifyLevelTwo' */ '@/views/classifyLevelTwo/classifyLevelTwo'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyModule',
        name: '模块',
        component: () => import (/* webpackChunkName: 'classifyModule' */ '@/views/classifyModule/classifyModule'),
        meta: {
          icon: 'iconfont icon-danmokuai',
        },
      },
      {
        path: '/classify',
        name: '管理分类',
        component: () => import (/* webpackChunkName: 'classify' */ '@/views/classify/classify'),
        meta: {
          icon: 'iconfont icon-ziyuan',
        },
      },
      {
        path: '/classifyIndex',
        name: '首页分类',
        component: () => import (/* webpackChunkName: 'classifyIndex' */ '@/views/classifyIndex/classifyIndex'),
        meta: {
          icon: 'iconfont icon-fenlei2',
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
        path: '/classifyLevelOneEdit',
        name: '一级分类编辑',
        component: () => import (/* webpackChunkName: 'classifyLevelOneEdit' */ '@/views/classifyLevelOneEdit/classifyLevelOneEdit'),
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
        component: () => import (/* webpackChunkName: 'classifyLevelTwoEdit' */ '@/views/classifyLevelTwoEdit/classifyLevelTwoEdit'),
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
        component: () => import (/* webpackChunkName: 'classifyModuleEdit' */ '@/views/classifyModuleEdit/classifyModuleEdit'),
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
        path: '/classifyIndexEdit',
        name: '首页分类编辑',
        component: () => import (/* webpackChunkName: 'classifyIndexEdit' */ '@/views/classifyIndexEdit/classifyIndexEdit'),
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
        name: '商品列表',
        component: () => import (/* webpackChunkName: 'goods' */ '@/views/goods/goods'),
        meta: {
          icon: 'iconfont icon-shangpin',
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
        component: () => import (/* webpackChunkName: 'goodsNew' */ '@/views/goodsNew/goodsNew'),
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
        component: () => import (/* webpackChunkName: 'goodsEdit' */ '@/views/goodsEdit/goodsEdit'),
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
        component: () => import (/* webpackChunkName: 'goodsSkuEdit' */ '@/views/goodsSkuEdit/goodsSkuEdit'),
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
        component: () => import (/* webpackChunkName: 'goodsBindClassify' */ '@/views/goodsBindClassify/goodsBindClassify'),
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
        component: () => import (/* webpackChunkName: 'goodsBindClassifyEdit' */ '@/views/goodsBindClassifyEdit/goodsBindClassifyEdit'),
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
        component: () => import (/* webpackChunkName: 'goodsBindIp' */ '@/views/goodsBindIp/goodsBindIp'),
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
        component: () => import (/* webpackChunkName: 'goodsBindIpEdit' */ '@/views/goodsBindIpEdit/goodsBindIpEdit'),
        meta: {},
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