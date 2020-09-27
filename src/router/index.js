import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import goods from './goods'
import order from './order'
import coupon from './coupon'
import classify from './classify'
import social from './social'
import tribe from './tribe'
import banner from './banner'
import supplier from './supplier'
import user from './user'
import admin from './admin'
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
  ...goods,
  ...order,
  ...coupon,
  ...classify,
  ...social,
  ...tribe,
  ...banner,
  ...supplier,
  ...user,
  ...admin,
  ...other,
  ...test,
]