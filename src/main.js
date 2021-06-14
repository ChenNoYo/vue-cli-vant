import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './api'

import './assets/css/reset.css'
import './assets/css/common.css'

import './utils/plugin'
import './utils/FastClick'
import filters from './utils/filter'
import utils from './utils/utils'
import VueScroller from 'vue-scroller'

import Vant from 'vant'
import 'vant/lib/index.css';
Vue.use(Vant)

Vue.use(VueScroller)
Vue.use(utils)

Vue.prototype.$api = api

// 注入全局过滤器
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
