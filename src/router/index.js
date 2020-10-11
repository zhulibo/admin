import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import classify from './classify'
import goods from './goods'
import supplier from './supplier'
import order from './order'
import coupon from './coupon'
import banner from './banner'
import social from './social'
import tribe from './tribe'
import article from './article'
import hotWord from './hotWord'
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
  ...classify,
  ...goods,
  ...supplier,
  ...order,
  ...coupon,
  ...banner,
  ...social,
  ...tribe,
  ...article,
  ...hotWord,
  ...user,
  ...admin,
  ...other,
  ...test,
]