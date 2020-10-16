export default [
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
          permission: '/social',
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
        component: () => import (/* webpackChunkName: 'socialEdit' */ '@/views/social/socialEdit'),
        meta: {
          permission: '/socialEdit',
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
        path: '/socialComment',
        name: '社交动态评论',
        component: () => import (/* webpackChunkName: 'socialComment' */ '@/views/social/socialComment'),
        meta: {
          permission: '/socialComment',
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
        path: '/socialCommentEdit',
        name: '社交动态评论编辑',
        component: () => import (/* webpackChunkName: 'socialCommentEdit' */ '@/views/social/socialCommentEdit'),
        meta: {
          permission: '/socialCommentEdit',
        },
      }
    ]
  },
]