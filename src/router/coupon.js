export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/giftPackList',
        name: '活动管理',
        component: () => import (/* webpackChunkName: 'giftPackList' */ '@/views/coupon/giftPackList'),
        meta: {
          icon: 'iconfont icon-jiangpin',
        },
      },
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
        component: () => import (/* webpackChunkName: 'giftPackEdit' */ '@/views/coupon/giftPackEdit'),
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
        component: () => import (/* webpackChunkName: 'couponList' */ '@/views/coupon/couponList'),
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
        component: () => import (/* webpackChunkName: 'couponEdit' */ '@/views/coupon/couponEdit'),
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
]