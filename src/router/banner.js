export default [
  {
    path: '/',
    component: () => import ('@/views/index/index'),
    children: [
      {
        path: '/bannerList',
        name: '轮播图列表',
        component: () => import (/* webpackChunkName: 'banner' */ '@/views/banner/banner'),
        meta: {
          icon: 'iconfont icon-banner',
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
        path: '/bannerEdit',
        name: '轮播图编辑',
        component: () => import (/* webpackChunkName: 'bannerEdit' */ '@/views/banner/bannerEdit'),
      }
    ]
  },
]