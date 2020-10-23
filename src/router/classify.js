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
        },
      },
      {
        path: '/classifyLevelOneList',
        name: '一级分类列表',
        component: () => import (/* webpackChunkName: 'classifyLevelOne' */ '@/views/classify/classifyLevelOne'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyModuleList',
        name: '模块列表',
        component: () => import (/* webpackChunkName: 'classifyModule' */ '@/views/classify/classifyModule'),
        meta: {
          icon: 'iconfont icon-danmokuai',
        },
      },
      {
        path: '/classifyLevelTwoList',
        name: '二级分类列表',
        component: () => import (/* webpackChunkName: 'classifyLevelTwo' */ '@/views/classify/classifyLevelTwo'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyLevelThreeList',
        name: '三级分类列表',
        component: () => import (/* webpackChunkName: 'classifyLevelThree' */ '@/views/classify/classifyLevelThree'),
        meta: {
          icon: 'iconfont icon-fenlei',
        },
      },
      {
        path: '/classifyTypeList',
        name: '类别列表',
        component: () => import (/* webpackChunkName: 'classifyType' */ '@/views/classify/classifyType'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyBrandList',
        name: '品牌列表',
        component: () => import (/* webpackChunkName: 'classifyBrand' */ '@/views/classify/classifyBrand'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyIpList',
        name: 'IP列表',
        component: () => import (/* webpackChunkName: 'classifyIp' */ '@/views/classify/classifyIp'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyAttributeList',
        name: '属性列表',
        component: () => import (/* webpackChunkName: 'classifyAttribute' */ '@/views/classify/classifyAttribute'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyIndexList',
        name: '首页分类列表',
        component: () => import (/* webpackChunkName: 'classifyIndex' */ '@/views/classify/classifyIndex'),
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
        path: '/classifyTypeEdit',
        name: '类别编辑',
        component: () => import (/* webpackChunkName: 'classifyTypeEdit' */ '@/views/classify/classifyTypeEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyTypeDel',
        name: '类别删除',
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
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyBrandDel',
        name: '品牌删除',
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
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyIpDel',
        name: 'IP删除',
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
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/classifyAttributeDel',
        name: '属性删除',
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