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
]