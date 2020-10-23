export default [
  {
    path: '/',
    name: '社交管理',
    meta: {
      icon: 'iconfont icon-pengyouquan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/socialList',
        name: '动态管理',
        component: () => import (/* webpackChunkName: 'socialList' */ '@/views/social/socialList'),
        meta: {
          icon: 'iconfont icon-pengyouquan',
        },
      },
      {
        path: '/tribeList',
        name: '部落管理',
        component: () => import (/* webpackChunkName: 'tribeList' */ '@/views/social/tribeList'),
        meta: {
          icon: 'iconfont icon-zhangpeng',
          permission: '/tribe',
        },
      },
      {
        path: '/articleList',
        name: '文章管理',
        component: () => import (/* webpackChunkName: 'articleList' */ '@/views/social/articleList'),
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
        path: '/socialEdit',
        name: '社交动态编辑',
        component: () => import (/* webpackChunkName: 'socialEdit' */ '@/views/social/socialEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/socialCommentList',
        name: '社交动态评论列表',
        component: () => import (/* webpackChunkName: 'socialCommentList' */ '@/views/social/socialCommentList'),
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
        component: () => import (/* webpackChunkName: 'socialCommentEdit' */ '@/views/social/socialCommentEdit'),
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
        component: () => import (/* webpackChunkName: 'tribeEdit' */ '@/views/social/tribeEdit'),
        meta: {
          permission: '/tribeEdit'
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
        path: '/tribeMemberList',
        name: '部落成员列表',
        component: () => import (/* webpackChunkName: 'tribeMemberList' */ '@/views/social/tribeMemberList'),
        meta: {
          permission: '/tribeMember'
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
        path: '/tribeMemberManage',
        name: '部落成员管理',
      },
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/articleEdit',
        name: '模玩文化编辑',
        component: () => import (/* webpackChunkName: 'article' */ '@/views/social/articleEdit'),
      }
    ]
  },
]