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
        component: () => import (/* webpackChunkName: 'tribeMember' */ '@/views/tribeMember/tribeMember'),
        meta: {},
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
        component: () => import (/* webpackChunkName: 'tribeEdit' */ '@/views/tribeEdit/tribeEdit'),
        meta: {},
      }
    ]
  },
]