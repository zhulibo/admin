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
        path: '/classifyLevelThree',
        name: '三级分类',
        component: () => import (/* webpackChunkName: 'classifyLevelThree' */ '@/views/classify/classifyLevelThree/classifyLevelThree'),
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
        path: '/classifyType',
        name: '类别',
        component: () => import (/* webpackChunkName: 'classifyType' */ '@/views/classify/classifyType/classifyType'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyBrand',
        name: '品牌',
        component: () => import (/* webpackChunkName: 'classifyBrand' */ '@/views/classify/classifyBrand/classifyBrand'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyIp',
        name: 'IP',
        component: () => import (/* webpackChunkName: 'classifyIp' */ '@/views/classify/classifyIp/classifyIp'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyAttribute',
        name: '属性',
        component: () => import (/* webpackChunkName: 'classifyAttribute' */ '@/views/classify/classifyAttribute/classifyAttribute'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
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
        path: '/classifyLevelThreeEdit',
        name: '三级分类编辑',
        component: () => import (/* webpackChunkName: 'classifyLevelThreeEdit' */ '@/views/classify/classifyLevelThreeEdit/classifyLevelThreeEdit'),
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
        path: '/classifyTypeEdit',
        name: '类别编辑',
        component: () => import (/* webpackChunkName: 'classifyTypeEdit' */ '@/views/classify/classifyTypeEdit/classifyTypeEdit'),
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
        path: '/classifyBrandEdit',
        name: '品牌编辑',
        component: () => import (/* webpackChunkName: 'classifyBrandEdit' */ '@/views/classify/classifyBrandEdit/classifyBrandEdit'),
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
        path: '/classifyIpEdit',
        name: 'IP编辑',
        component: () => import (/* webpackChunkName: 'classifyIpEdit' */ '@/views/classify/classifyIpEdit/classifyIpEdit'),
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
        path: '/classifyAttributeEdit',
        name: '属性编辑',
        component: () => import (/* webpackChunkName: 'classifyAttributeEdit' */ '@/views/classify/classifyAttributeEdit/classifyAttributeEdit'),
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
]