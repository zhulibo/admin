export default [
  {
    path: '/',
    name: '模玩文化',
    meta: {
      icon: 'iconfont icon-dingdan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/articleList',
        name: '模玩文化列表',
        component: () => import (/* webpackChunkName: 'article' */ '@/views/article/article'),
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
        path: '/articleEdit',
        name: '模玩文化编辑',
        component: () => import (/* webpackChunkName: 'article' */ '@/views/article/articleEdit'),
      }
    ]
  },
]