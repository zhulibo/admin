export default [
  {
    path: '/',
    name: '平台设置',
    meta: {
      icon: 'iconfont icon-guanliyuan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/classifyTypeList',
        name: '类别管理',
        component: () => import (/* webpackChunkName: 'classifyTypeList' */ '@/views/platformSetting/classifyTypeList'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyBrandList',
        name: '品牌管理',
        component: () => import (/* webpackChunkName: 'classifyBrandList' */ '@/views/platformSetting/classifyBrandList'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyIpList',
        name: 'IP管理',
        component: () => import (/* webpackChunkName: 'classifyIpList' */ '@/views/platformSetting/classifyIpList'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/classifyAttributeList',
        name: '属性管理',
        component: () => import (/* webpackChunkName: 'classifyAttributeList' */ '@/views/platformSetting/classifyAttributeList'),
        meta: {
          icon: 'iconfont icon-pinpaitemai',
        },
      },
      {
        path: '/hotWordList',
        name: '热词管理',
        component: () => import (/* webpackChunkName: 'hotWordList' */ '@/views/platformSetting/hotWordList'),
        meta: {
          icon: 'iconfont icon-yonghu',
        },
      },
      {
        path: '/bannerList',
        name: '轮播图管理',
        component: () => import (/* webpackChunkName: 'bannerList' */ '@/views/platformSetting/bannerList'),
        meta: {
          icon: 'iconfont icon-banner',
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
        component: () => import (/* webpackChunkName: 'classifyTypeEdit' */ '@/views/platformSetting/classifyTypeEdit'),
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
        component: () => import (/* webpackChunkName: 'classifyBrandEdit' */ '@/views/platformSetting/classifyBrandEdit'),
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
        component: () => import (/* webpackChunkName: 'classifyIpEdit' */ '@/views/platformSetting/classifyIpEdit'),
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
        component: () => import (/* webpackChunkName: 'classifyAttributeEdit' */ '@/views/platformSetting/classifyAttributeEdit'),
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
        path: '/hotWordEdit',
        name: '热词编辑',
        component: () => import (/* webpackChunkName: 'hotWordEdit' */ '@/views/platformSetting/hotWordEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/hotWordDel',
        name: '热词删除',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/bannerEdit',
        name: '轮播图编辑',
        component: () => import (/* webpackChunkName: 'bannerEdit' */ '@/views/platformSetting/bannerEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/bannerDel',
        name: '轮播图删除',
      }
    ]
  },
]