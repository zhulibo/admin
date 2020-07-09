import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import (/* webpackChunkName: "login" */ '@/views/login/login'),
    meta: {
      hidden: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import (/* webpackChunkName: "login" */ '@/views/register/register'),
    meta: {
      hidden: true,
    }
  },
  {
    path: '/home',
    component: () => import ('@/views/index/index'),
    meta: {
      icon: 'iconfont icon-liebiao',
    },
    children: [
      {
        path: '/home',
        name: '统计',
        component: () => import (/* webpackChunkName: "home" */ '@/views/home/home'),
      },
    ]
  }
]

export default new Router({
  routes: constantRouter,
});

export const asyncRouter = [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    meta: {
      roleSet: ['admin','superAdmin'],
      icon: 'iconfont icon-guanliyuan',
    },
    children: [
      {
        path: '/test',
        name: '权限',
        component: () => import (/* webpackChunkName: "test" */ '@/views/test/test'),
      },
    ]
  },
]