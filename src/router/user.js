export default [
  {
    path: '/',
    name: '用户',
    meta: {
      icon: 'iconfont icon-guanliyuan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/user',
        name: '用户 ',
        component: () => import (/* webpackChunkName: 'user' */ '@/views/user/user'),
        meta: {
          icon: 'iconfont icon-yonghu',
          permission: '/user',
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
        path: '/userEdit',
        name: '用户编辑',
        component: () => import (/* webpackChunkName: 'userEdit' */ '@/views/user/userEdit'),
        meta: {
          icon: 'iconfont icon-yonghu',
          permission: '/userEdit',
        },
      }
    ]
  },
]