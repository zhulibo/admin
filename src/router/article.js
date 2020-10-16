export default [
  {
    path: '/',
    name: '',
    meta: {
      icon: 'iconfont icon-dingdan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/article',
        name: '模玩文化',
        component: () => import (/* webpackChunkName: 'article' */ '@/views/article/article'),
        meta: {
          icon: 'iconfont icon-dingdan',
          permission: '/article',
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
        path: '/articleEdit',
        name: '模玩文化编辑',
        component: () => import (/* webpackChunkName: 'article' */ '@/views/article/articleEdit'),
        meta: {
          permission: '/articleEdit'
        },
      }
    ]
  },
]