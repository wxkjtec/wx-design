import Vue from 'vue'
import App from './App.vue'

import './utils/mock'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'

window.echarts = echarts
Vue.use(ElementUI)

import Table from '../packages/table/index'

Vue.use(Table, {
  fetchSetting: {
    pageField: 'pageNum',
    sizeField: 'pageSize',
    totalField: 'total',
  },
  defaultPageSize: 10,
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
