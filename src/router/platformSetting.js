export default [
  {
    path: '/',
    name: '平台设置',
    meta: {
      icon: 'iconfont icon-shezhi',
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
      },
      {
        path: '/orderSettingList',
        name: '订单设置管理',
        component: () => import (/* webpackChunkName: 'orderSettingList' */ '@/views/platformSetting/orderSettingList'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/notificationList',
        name: '消息推送管理',
        component: () => import (/* webpackChunkName: 'notificationList' */ '@/views/platformSetting/notificationList'),
        meta: {
          icon: 'iconfont icon-shouye',
        },
      },
      {
        path: '/startupList',
        name: '启动页管理',
        component: () => import (/* webpackChunkName: 'startupList' */ '@/views/platformSetting/startupList'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/helpClassifyOneList',
        name: '帮助中心',
        component: () => import (/* webpackChunkName: 'helpClassifyOneList' */ '@/views/platformSetting/helpClassifyOneList'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/feedbackList',
        name: '意见反馈',
        component: () => import (/* webpackChunkName: 'feedbackList' */ '@/views/platformSetting/feedbackList'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/reportList',
        name: '举报管理',
        component: () => import (/* webpackChunkName: 'reportList' */ '@/views/platformSetting/reportList'),
        meta: {
          icon: 'iconfont icon-dingdan',
        },
      },
      {
        path: '/sensitiveWordList',
        name: '敏感词管理',
        component: () => import (/* webpackChunkName: 'sensitiveWordList' */ '@/views/platformSetting/sensitiveWordList'),
        meta: {
          icon: 'iconfont icon-dingdan',
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
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/orderSettingEdit',
        name: '订单设置编辑',
        component: () => import (/* webpackChunkName: 'orderSettingEdit' */ '@/views/platformSetting/orderSettingEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/notificationEdit',
        name: '消息推送编辑',
        component: () => import (/* webpackChunkName: 'notificationEdit' */ '@/views/platformSetting/notificationEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/startupEdit',
        name: '启动页编辑',
        component: () => import (/* webpackChunkName: 'startupEdit' */ '@/views/platformSetting/startupEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/helpClassifyOneEdit',
        name: '帮助中心一级编辑',
        component: () => import (/* webpackChunkName: 'helpClassifyOneEdit' */ '@/views/platformSetting/helpClassifyOneEdit'),
        meta: {
          icon: 'iconfont icon-yonghu',
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
        path: '/helpClassifyTwoList',
        name: '帮助中心二级列表',
        component: () => import (/* webpackChunkName: 'helpClassifyTwoList' */ '@/views/platformSetting/helpClassifyTwoList'),
        meta: {
          icon: 'iconfont icon-yonghu',
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
        path: '/helpClassifyTwoEdit',
        name: '帮助中心二级编辑',
        component: () => import (/* webpackChunkName: 'helpClassifyTwoEdit' */ '@/views/platformSetting/helpClassifyTwoEdit'),
        meta: {
          icon: 'iconfont icon-yonghu',
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
        path: '/helpQuestionList',
        name: '帮助中心问题列表',
        component: () => import (/* webpackChunkName: 'helpQuestionList' */ '@/views/platformSetting/helpQuestionList'),
        meta: {
          icon: 'iconfont icon-yonghu',
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
        path: '/helpQuestionEdit',
        name: '帮助中心问题编辑',
        component: () => import (/* webpackChunkName: 'helpQuestionEdit' */ '@/views/platformSetting/helpQuestionEdit'),
        meta: {
          icon: 'iconfont icon-yonghu',
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
        path: '/reportDetail',
        name: '举报详情',
        component: () => import (/* webpackChunkName: 'reportDetail' */ '@/views/platformSetting/reportDetail'),
        meta: {
          icon: 'iconfont icon-yonghu',
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
        path: '/sensitiveWordEdit',
        name: '敏感词编辑',
        component: () => import (/* webpackChunkName: 'sensitiveWordEdit' */ '@/views/platformSetting/sensitiveWordEdit'),
        meta: {
          icon: 'iconfont icon-yonghu',
        },
      }
    ]
  },
]