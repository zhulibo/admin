export default [
  {
    path: '/',
    name: '用户管理',
    meta: {
      icon: 'iconfont icon-guanliyuan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/userList',
        name: '漫想家用户',
        component: () => import (/* webpackChunkName: 'userList' */ '@/views/user/userList'),
        meta: {
          icon: 'iconfont icon-yonghu',
        },
      },
      {
        path: '/supplierUserList',
        name: '供货商用户',
        component: () => import (/* webpackChunkName: 'supplierUserList' */ '@/views/user/supplierUserList'),
        meta: {
          icon: 'iconfont icon-shangjia',
        },
      },
      {
        path: '/adminList',
        name: '管理员',
        component: () => import (/* webpackChunkName: 'adminList' */ '@/views/user/adminList'),
        meta: {
          icon: 'iconfont icon-guanliyuan',
        },
      },
      {
        path: '/roleList',
        name: '角色',
        component: () => import (/* webpackChunkName: 'roleList' */ '@/views/user/roleList'),
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
        path: '/userEdit',
        name: '漫想家用户编辑',
        component: () => import (/* webpackChunkName: 'userEdit' */ '@/views/user/userEdit'),
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
        path: '/userDetail',
        name: '漫想家用户详情',
        component: () => import (/* webpackChunkName: 'userDetail' */ '@/views/user/userDetail'),
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
        path: '/supplierUserEdit',
        name: '供货商用户编辑',
        component: () => import (/* webpackChunkName: 'supplierUserEdit' */ '@/views/user/supplierUserEdit'),
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
        path: '/supplierUserOrderList',
        name: '供货商订单列表',
        component: () => import (/* webpackChunkName: 'supplierUserOrderList' */ '@/views/user/supplierUserOrderList'),
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
        path: '/supplierUserGoodsList',
        name: '供货商出售商品列表',
        component: () => import (/* webpackChunkName: 'supplierUserGoodsList' */ '@/views/user/supplierUserGoodsList'),
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
        path: '/supplierUserBrandList',
        name: '供货商出售品牌列表',
        component: () => import (/* webpackChunkName: 'supplierUserBrandList' */ '@/views/user/supplierUserBrandList'),
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
        path: '/adminEdit',
        name: '管理员编辑',
        component: () => import (/* webpackChunkName: 'adminEdit' */ '@/views/user/adminEdit'),
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
        component: () => import (/* webpackChunkName: 'roleEdit' */ '@/views/user/roleEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/roleDel',
        name: '角色删除',
      }
    ]
  },
]