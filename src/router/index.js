import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import user from './user'
import admin from './admin'
import classify from './classify'
import goods from './goods'
import order from './order'
import social from './social'
import tribe from './tribe'
import supplier from './supplier'
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
  ...admin,
  ...classify,
  ...goods,
  ...order,
  ...social,
  ...tribe,
  ...supplier,
  ...other,
  ...test,
]