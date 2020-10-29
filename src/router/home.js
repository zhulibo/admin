export default [
  {
    path: '/',
    redirect: {path: '/welcome'},
    hidden: true,
  },
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
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/welcome',
        name: '欢迎页',
        component: () => import (/* webpackChunkName: 'welcome' */ '@/views/index/welcome'),
      },
    ]
  },
]