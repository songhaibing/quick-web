import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import ToPay from '@/pages/Topay'
import payFinish from '@/pages/payFinish'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/ToPay',
      name: 'ToPay',
      component: ToPay
    },
    {
      path: '/payFinish',
      name: 'payFinish',
      component: payFinish
    }
  ]
})
