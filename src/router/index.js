import Vue from 'vue'
import Router from 'vue-router'
import home from './home'

import user from './user'
import classify from './classify'
import platformSetting from './platformSetting'
import goods from './goods'
import order from './order'
import orderSupplier from './orderSupplier'
import coupon from './activity'
import social from './social'
import cashOut from './cashOut'
import supplier from './supplier'
import statistics from './statistics'
import other from './other'
import test from './test'

Vue.use(Router)

export const constantRouter = [
  ...home,
]

export default new Router({
  routes: constantRouter,
})

export const asyncRouter = [
  ...user,
  ...classify,
  ...goods,
  ...supplier,
  ...order,
  ...orderSupplier,
  ...platformSetting,
  ...coupon,
  ...social,
  ...cashOut,
  ...statistics,
  ...other,
  ...test,
]