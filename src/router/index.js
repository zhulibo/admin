import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouter = [
  {
    path: '/',
    redirect: {path: '/admin'},
    hidden: true,
  },
  {
    path: '/',
    name: 'index',
    component: () => import (/* webpackChunkName: "index" */ '@/views/index/index'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import (/* webpackChunkName: "login" */ '@/views/login/login'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import (/* webpackChunkName: "register" */ '@/views/register/register'),
    hidden: true,
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/user',
        name: '用户管理',
        component: () => import (/* webpackChunkName: "user" */ '@/views/user/user'),
        meta: {
          icon: 'iconfont icon-liebiao',
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
        path: '/userEdit',
        name: '编辑用户信息',
        component: () => import (/* webpackChunkName: "userEdit" */ '@/views/userEdit/userEdit'),
        meta: {
          icon: 'iconfont icon-liebiao',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/admin',
        name: '管理员管理',
        component: () => import (/* webpackChunkName: "admin" */ 'views/admin/admin'),
        meta: {
          icon: 'iconfont icon-liebiao',
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
        name: '编辑管理员信息',
        component: () => import (/* webpackChunkName: "adminEdit" */ '@/views/adminEdit/adminEdit'),
        meta: {
          icon: 'iconfont icon-liebiao',
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
        path: '/adminNew',
        name: '添加管理员',
        component: () => import (/* webpackChunkName: "adminNew" */ '@/views/adminNew/adminNew'),
        meta: {
          icon: 'iconfont icon-liebiao',
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
        path: '/edit',
        name: '编辑',
        component: () => import (/* webpackChunkName: "edit" */ '@/views/edit/edit'),
        meta: {
          icon: 'iconfont icon-liebiao',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/home',
        name: '统计',
        component: () => import (/* webpackChunkName: "home" */ '@/views/home/home'),
        meta: {
          icon: 'iconfont icon-liebiao',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/richText',
        name: '富文本',
        component: () => import (/* webpackChunkName: "richText" */ '@/views/richText/richText'),
        meta: {
          icon: 'iconfont icon-liebiao',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/vueEcharts',
        name: '图表',
        component: () => import (/* webpackChunkName: "vueEcharts" */ '@/views/vueEcharts/vueEcharts'),
        meta: {
          icon: 'iconfont icon-liebiao',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/chatCt',
        name: '客服聊天',
        component: () => import (/* webpackChunkName: "chatCt" */ '@/views/chatCt/chatCt'),
        meta: {
          icon: 'iconfont icon-liebiao',
        },
      }
    ]
  },
]

export default new Router({
  routes: constantRouter,
});

export const asyncRouter = [
  {
    path: '/',
    name: '权限',
    meta: {
      roleSet: ['admin', 'superAdmin'],
      icon: 'iconfont icon-guanliyuan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/test1',
        name: '权限1',
        component: () => import (/* webpackChunkName: "test1" */ '@/views/test1/test1'),
        meta: {
          roleSet: ['admin', 'superAdmin'],
          icon: 'iconfont icon-guanliyuan',
        },
      },
      {
        path: '/test2',
        name: '权限2',
        component: () => import (/* webpackChunkName: "test2" */ '@/views/test2/test2'),
        meta: {
          roleSet: [],
          icon: 'iconfont icon-guanliyuan',
        },
      },
    ]
  },
]