import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'

window.echarts = echarts
Vue.use(ElementUI)

import Table from '../packages/table/index'

Vue.use(Table, {
  fetchSetting: {
    pageField: 'pageNum1',
    sizeField: 'pageSize',
  },
  a: 1,
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
