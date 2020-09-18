import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import classify from './classify'
import goods from './goods'
import order from './order'
import social from './social'
import tribe from './tribe'
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
  ...classify,
  ...goods,
  ...order,
  ...social,
  ...tribe,
  ...supplier,
  ...user,
  ...admin,
  ...other,
  ...test,
]