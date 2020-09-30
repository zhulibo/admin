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
        path: '/giftPack',
        name: '礼包',
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
        path: '/coupon',
        name: '优惠券 ',
        component: () => import (/* webpackChunkName: 'coupon' */ '@/views/coupon/coupon'),
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
        path: '/couponEdit',
        name: '优惠券编辑',
        component: () => import (/* webpackChunkName: 'couponEdit' */ '@/views/coupon/couponEdit'),
        meta: {},
      }
    ]
  },
]