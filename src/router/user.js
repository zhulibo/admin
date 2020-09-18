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
        },
      },
      // {
      //   path: '/businessMan',
      //   name: '商家',
      //   component: () => import (/* webpackChunkName: 'businessMan' */ '@/views/user/businessMan'),
      //   meta: {
      //     icon: 'iconfont icon-shangjia',
      //   },
      // }
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
        },
      }
    ]
  },
  // {
  //   path: '/',
  //   component: () => import ('@/views/index/index'),
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/businessManEdit',
  //       name: '商家编辑',
  //       component: () => import (/* webpackChunkName: 'businessManEdit' */ '@/views/user/businessManEdit'),
  //       meta: {
  //         icon: 'iconfont icon-yonghu',
  //       },
  //     }
  //   ]
  // },
]