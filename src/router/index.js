import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import ToPay from '@/pages/Topay'
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
    }
  ]
})
