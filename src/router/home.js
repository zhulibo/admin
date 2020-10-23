export default [
  // {
  //   path: '/',
  //   redirect: {path: '/admin'},
  //   hidden: true,
  // },
  {
    path: '/',
    name: 'index',
    component: () => import (/* webpackChunkName: 'index' */ '@/views/index/index'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import (/* webpackChunkName: 'login' */ '@/views/login/login'),
    hidden: true,
  },
  // {
  //   path: '/permissionEdit',
  //   name: 'permissionEdit',
  //   component: () => import (/* webpackChunkName: 'permissionEdit' */ '@/views/admin/permissionEdit'),
  //   hidden: true,
  // },
]