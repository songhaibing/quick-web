// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles.scss'
import HTTP from 'axios'
import  PROPERTYNAME from './lib/propertyName'
import 'weui-vue/weui.css'

import {Toast,PullRefresh,Button} from 'vant'
[Toast,PullRefresh,Button].map(item => {
  Vue.use(item)
})

//配置通用axios请求
Vue.prototype.$HTTP = HTTP
//配置代理跨域
Vue.prototype.HOST = '/api'
//对应字段All和Cashier字段
Vue.prototype.$PROPERTYNAME =PROPERTYNAME
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
