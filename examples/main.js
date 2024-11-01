import Vue from 'vue'
import App from './App.vue'
import FUI from '../packages/components'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(FUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
