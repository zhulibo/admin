export default [
  {
    path: '/',
    name: '优惠券',
    meta: {
      icon: 'iconfont icon-dingdan',
    },
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/giftPackList',
        name: '礼包列表',
        component: () => import (/* webpackChunkName: 'giftPack' */ '@/views/coupon/giftPack'),
        meta: {
          icon: 'iconfont icon-dingdan',
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
        component: () => import (/* webpackChunkName: 'coupon' */ '@/views/coupon/coupon'),
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