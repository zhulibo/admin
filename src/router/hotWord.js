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
        path: '/hotWordList',
        name: '热词列表',
        component: () => import (/* webpackChunkName: 'hotWord' */ '@/views/hotWord/hotWord'),
        meta: {
          icon: 'iconfont icon-yonghu',
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
]