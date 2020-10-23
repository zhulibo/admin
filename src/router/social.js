export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/socialList',
        name: '社交动态列表',
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
        component: () => import (/* webpackChunkName: 'socialComment' */ '@/views/social/socialComment'),
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
]