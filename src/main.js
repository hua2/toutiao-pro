// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import api from './api' // 导入api接口

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './assets/style/global.less' // global style
import './assets/style/utilities.css' // global style

Vue.config.productionTip = false

Vue.prototype.$api = api // 将api挂载到vue的原型上

// mount axios to `Vue.$http` and `this.$http`

// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

new Vue({
  router,
  store,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
