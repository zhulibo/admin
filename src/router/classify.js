export default [
  {
    path: '/',
    name: '分类管理',
    meta: {
      icon: 'iconfont icon-fenlei1',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/classifyPreview',
        name: '分类预览',
        component: () => import (/* webpackChunkName: 'classifyPreview' */ '@/views/classify/classifyPreview'),
        meta: {
          icon: 'iconfont icon-ziyuan',
        },
      },
      {
        path: '/classifyLevelOneList',
        name: '一级分类管理',
        component: () => import (/* webpackChunkName: 'classifyLevelOneList' */ '@/views/classify/classifyLevelOneList'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyModuleList',
        name: '模块管理',
        component: () => import (/* webpackChunkName: 'classifyModuleList' */ '@/views/classify/classifyModuleList'),
        meta: {
          icon: 'iconfont icon-danmokuai',
        },
      },
      {
        path: '/classifyLevelTwoList',
        name: '二级分类管理',
        component: () => import (/* webpackChunkName: 'classifyLevelTwoList' */ '@/views/classify/classifyLevelTwoList'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyLevelThreeList',
        name: '三级分类管理',
        component: () => import (/* webpackChunkName: 'classifyLevelThreeList' */ '@/views/classify/classifyLevelThreeList'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyIndexList',
        name: '首页分类管理',
        component: () => import (/* webpackChunkName: 'classifyIndexList' */ '@/views/classify/classifyIndexList'),
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
        component: () => import (/* webpackChunkName: 'classifyLevelOneEdit' */ '@/views/classify/classifyLevelOneEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyLevelOneDel',
        name: '一级分类删除',
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
        component: () => import (/* webpackChunkName: 'classifyModuleEdit' */ '@/views/classify/classifyModuleEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyModuleDel',
        name: '模块删除',
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
        component: () => import (/* webpackChunkName: 'classifyLevelTwoEdit' */ '@/views/classify/classifyLevelTwoEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyLevelTwoDel',
        name: '二级分类删除',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyLevelThreeEdit',
        name: '三级分类编辑',
        component: () => import (/* webpackChunkName: 'classifyLevelThreeEdit' */ '@/views/classify/classifyLevelThreeEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyLevelThreeDel',
        name: '三级分类删除',
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
        component: () => import (/* webpackChunkName: 'classifyIndexEdit' */ '@/views/classify/classifyIndexEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyIndexDel',
        name: '首页分类删除',
      }
    ]
  },
]