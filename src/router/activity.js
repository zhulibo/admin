export default [
  {
    name: '活动管理',
    path: '/',
    meta: {
      icon: 'iconfont icon-jiangpin',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/giftPackList',
        name: '礼包管理',
        component: () => import (/* webpackChunkName: 'giftPackList' */ '@/views/activity/giftPackList'),
        meta: {
          icon: 'iconfont icon-jiangpin',
        },
      },
      {
        path: '/appCouponImgList',
        name: '优惠券图片管理',
        component: () => import (/* webpackChunkName: 'appCouponImgList' */ '@/views/activity/appCouponImgList'),
        meta: {
          icon: 'iconfont icon-jiangpin',
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
        path: '/giftPackEdit',
        name: '礼包编辑',
        component: () => import (/* webpackChunkName: 'giftPackEdit' */ '@/views/activity/giftPackEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/giftPackDel',
        name: '礼包删除',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/couponList',
        name: '优惠券列表',
        component: () => import (/* webpackChunkName: 'couponList' */ '@/views/activity/couponList'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/couponEdit',
        name: '优惠券编辑',
        component: () => import (/* webpackChunkName: 'couponEdit' */ '@/views/activity/couponEdit'),
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/couponDel',
        name: '优惠券删除',
      }
    ]
  },
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    hidden: true,
    children: [
      {
        path: '/appCouponImgEdit',
        name: '优惠券图片编辑',
        component: () => import (/* webpackChunkName: 'appCouponImgEdit' */ '@/views/activity/appCouponImgEdit'),
      }
    ]
  },
]