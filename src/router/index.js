import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


//添加路由懒加载
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
