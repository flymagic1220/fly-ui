// enhanceApp.js

import ElementUI from 'element-ui'
import Fui from '../../packages/components/index.js'
import 'element-ui/lib/theme-chalk/index.css'

export default ({
  Vue,
}) => {
    Vue.use(ElementUI),
    Vue.use(Fui),
    Vue.prototype.$message = ElementUI.Message
}
