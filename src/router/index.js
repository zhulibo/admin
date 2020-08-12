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
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/user',
        name: '用户',
        component: () => import (/* webpackChunkName: "user" */ '@/views/user/user'),
        meta: {
          icon: 'iconfont icon-yonghu',
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
        name: '用户编辑',
        component: () => import (/* webpackChunkName: "userEdit" */ '@/views/userEdit/userEdit'),
        meta: {
          icon: 'iconfont icon-yonghu',
        },
      }
    ]
  },
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
        name: '管理员列表',
        component: () => import (/* webpackChunkName: "admin" */ '@/views/admin/admin'),
        meta: {
          icon: 'iconfont icon-guanliyuan',
        },
      },
      {
        path: '/role',
        name: '角色列表',
        component: () => import (/* webpackChunkName: "role" */ '@/views/role/role'),
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
        component: () => import (/* webpackChunkName: "adminEdit" */ '@/views/adminEdit/adminEdit'),
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
        component: () => import (/* webpackChunkName: "roleEdit" */ '@/views/roleEdit/roleEdit'),
        meta: {},
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/social',
        name: '社交动态',
        component: () => import (/* webpackChunkName: "social" */ '@/views/social/social'),
        meta: {
          icon: 'iconfont icon-pengyouquan',
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
        path: '/socialEdit',
        name: '社交动态编辑',
        component: () => import (/* webpackChunkName: "socialEdit" */ '@/views/socialEdit/socialEdit'),
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
        path: '/socialComment',
        name: '社交动态评论',
        component: () => import (/* webpackChunkName: "socialComment" */ '@/views/socialComment/socialComment'),
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
        path: '/socialCommentEdit',
        name: '社交动态评论编辑',
        component: () => import (/* webpackChunkName: "socialCommentEdit" */ '@/views/socialCommentEdit/socialCommentEdit'),
        meta: {},
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
          icon: 'iconfont icon-bianji',
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
          icon: 'iconfont icon-bianji',
          permissions: [1, 2, 3]
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
          icon: 'iconfont icon-bianji',
        },
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/oss',
        name: 'oss上传图片',
        component: () => import (/* webpackChunkName: "oss" */ '@/views/oss/oss'),
        meta: {
          icon: 'iconfont icon-bianji',
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
      icon: 'iconfont icon-bianji',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/test1',
        name: '权限1',
        component: () => import (/* webpackChunkName: "test1" */ '@/views/test1/test1'),
        meta: {
          roleSet: ['admin', 'superAdmin'],
          icon: 'iconfont icon-bianji',
        },
      },
      {
        path: '/test2',
        name: '权限2',
        component: () => import (/* webpackChunkName: "test2" */ '@/views/test2/test2'),
        meta: {
          roleSet: [],
          icon: 'iconfont icon-bianji',
        },
      },
    ]
  },
]