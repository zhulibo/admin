export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/tribeList',
        name: '部落列表',
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
        path: '/tribeEdit',
        name: '部落编辑',
        component: () => import (/* webpackChunkName: 'tribeEdit' */ '@/views/tribe/tribeEdit'),
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
        path: '/tribeMemberManage',
        name: '部落成员管理',
      },
    ]
  },
]