export default [
  {
    path: '/',
    name: '分类',
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
          permission: '/classifyPreview',
        },
      },
      {
        path: '/classifyLevelOne',
        name: '一级分类',
        component: () => import (/* webpackChunkName: 'classifyLevelOne' */ '@/views/classify/classifyLevelOne'),
        meta: {
          icon: 'iconfont icon-fenlei',
          permission: '/classifyLevelOne',
        },
      },
      {
        path: '/classifyModule',
        name: '模块',
        component: () => import (/* webpackChunkName: 'classifyModule' */ '@/views/classify/classifyModule'),
        meta: {
          icon: 'iconfont icon-danmokuai',
          permission: '/classifyModule',
        },
      },
      {
        path: '/classifyLevelTwo',
        name: '二级分类',
        component: () => import (/* webpackChunkName: 'classifyLevelTwo' */ '@/views/classify/classifyLevelTwo'),
        meta: {
          icon: 'iconfont icon-fenlei',
          permission: '/classifyLevelTwo',
        },
      },
      {
        path: '/classifyLevelThree',
        name: '三级分类',
        component: () => import (/* webpackChunkName: 'classifyLevelThree' */ '@/views/classify/classifyLevelThree'),
        meta: {
          icon: 'iconfont icon-fenlei',
          permission: '/classifyLevelThree',
        },
      },
      {
        path: '/classifyType',
        name: '类别',
        component: () => import (/* webpackChunkName: 'classifyType' */ '@/views/classify/classifyType'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
          permission: '/classifyType',
        },
      },
      {
        path: '/classifyBrand',
        name: '品牌',
        component: () => import (/* webpackChunkName: 'classifyBrand' */ '@/views/classify/classifyBrand'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
          permission: '/classifyBrand',
        },
      },
      {
        path: '/classifyIp',
        name: 'IP',
        component: () => import (/* webpackChunkName: 'classifyIp' */ '@/views/classify/classifyIp'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
          permission: '/classifyIp',
        },
      },
      {
        path: '/classifyAttribute',
        name: '属性',
        component: () => import (/* webpackChunkName: 'classifyAttribute' */ '@/views/classify/classifyAttribute'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
          permission: '/classifyAttribute',
        },
      },
      {
        path: '/classifyIndex',
        name: '首页分类',
        component: () => import (/* webpackChunkName: 'classifyIndex' */ '@/views/classify/classifyIndex'),
        meta: {
          icon: 'iconfont icon-fenlei2',
          permission: '/classifyIndex',
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
        meta: {
          permission: '/classifyLevelOneEdit'
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
        path: '/classifyModuleEdit',
        name: '模块编辑',
        component: () => import (/* webpackChunkName: 'classifyModuleEdit' */ '@/views/classify/classifyModuleEdit'),
        meta: {
          permission: '/classifyModuleEdit'
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
        path: '/classifyLevelTwoEdit',
        name: '二级分类编辑',
        component: () => import (/* webpackChunkName: 'classifyLevelTwoEdit' */ '@/views/classify/classifyLevelTwoEdit'),
        meta: {
          permission: '/classifyLevelTwoEdit'
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
        path: '/classifyLevelThreeEdit',
        name: '三级分类编辑',
        component: () => import (/* webpackChunkName: 'classifyLevelThreeEdit' */ '@/views/classify/classifyLevelThreeEdit'),
        meta: {
          permission: '/classifyLevelThreeEdit'
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
        path: '/classifyTypeEdit',
        name: '类别编辑',
        component: () => import (/* webpackChunkName: 'classifyTypeEdit' */ '@/views/classify/classifyTypeEdit'),
        meta: {
          permission: '/classifyTypeEdit'
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
        path: '/classifyBrandEdit',
        name: '品牌编辑',
        component: () => import (/* webpackChunkName: 'classifyBrandEdit' */ '@/views/classify/classifyBrandEdit'),
        meta: {
          permission: '/classifyBrandEdit'
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
        path: '/classifyIpEdit',
        name: 'IP编辑',
        component: () => import (/* webpackChunkName: 'classifyIpEdit' */ '@/views/classify/classifyIpEdit'),
        meta: {
          permission: '/classifyIpEdit'
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
        path: '/classifyAttributeEdit',
        name: '属性编辑',
        component: () => import (/* webpackChunkName: 'classifyAttributeEdit' */ '@/views/classify/classifyAttributeEdit'),
        meta: {
          permission: '/classifyAttributeEdit'
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
        path: '/classifyIndexEdit',
        name: '首页编辑',
        component: () => import (/* webpackChunkName: 'classifyIndexEdit' */ '@/views/classify/classifyIndexEdit'),
        meta: {
          permission: '/classifyIndexEdit'
        },
      }
    ]
  },
]