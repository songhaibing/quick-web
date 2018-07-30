import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index'], resolve),
    },
    {
      path: '/ToPay',
      name: 'ToPay',
      component: resolve => require(['@/pages/Topay'], resolve),
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: resolve => require(['@/pages/paySuccess'], resolve),
    }
  ]
})
