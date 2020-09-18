export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/theme',
        name: '主题',
        component: () => import (/* webpackChunkName: 'theme' */ '@/views/other/theme'),
        meta: {
          icon: 'iconfont icon-yanse',
        },
      }
    ]
  },
]