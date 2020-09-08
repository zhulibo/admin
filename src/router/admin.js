export default [
  {
    path: '/',
    name: '管理员',
    meta: {
      icon: 'iconfont icon-guanliyuan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/admin',
        name: '管理员 ',
        component: () => import (/* webpackChunkName: 'admin' */ '@/views/admin/admin'),
        meta: {
          icon: 'iconfont icon-guanliyuan',
        },
      },
      {
        path: '/role',
        name: '角色',
        component: () => import (/* webpackChunkName: 'role' */ '@/views/role/role'),
        meta: {
          icon: 'iconfont icon-jiaoseleixing',
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
        path: '/adminEdit',
        name: '管理员编辑',
        component: () => import (/* webpackChunkName: 'adminEdit' */ '@/views/adminEdit/adminEdit'),
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
        path: '/roleEdit',
        name: '角色编辑',
        component: () => import (/* webpackChunkName: 'roleEdit' */ '@/views/roleEdit/roleEdit'),
        meta: {},
      }
    ]
  },
]