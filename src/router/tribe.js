export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/tribe',
        name: '部落',
        component: () => import (/* webpackChunkName: 'tribe' */ '@/views/tribe/tribe'),
        meta: {
          icon: 'iconfont icon-zhangpeng',
          permission: '/tribe',
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
        path: '/tribeMember',
        name: '部落成员',
        component: () => import (/* webpackChunkName: 'tribeMember' */ '@/views/tribe/tribeMember'),
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
        path: '/tribeEdit',
        name: '部落编辑',
        component: () => import (/* webpackChunkName: 'tribeEdit' */ '@/views/tribe/tribeEdit'),
        meta: {
          permission: '/tribeEdit'
        },
      }
    ]
  },
]