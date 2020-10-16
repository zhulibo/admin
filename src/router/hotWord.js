export default [
  {
    path: '/',
    name: '热词',
    meta: {
      icon: 'iconfont icon-guanliyuan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/hotWord',
        name: '热词 ',
        component: () => import (/* webpackChunkName: 'hotWord' */ '@/views/hotWord/hotWord'),
        meta: {
          icon: 'iconfont icon-yonghu',
          permission: '/hotWord',
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
        path: '/hotWordEdit',
        name: '热词编辑',
        component: () => import (/* webpackChunkName: 'hotWordEdit' */ '@/views/hotWord/hotWordEdit'),
        meta: {
          permission: '/hotWordEdit',
        },
      }
    ]
  },
]