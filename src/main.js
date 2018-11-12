import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import MusicManage from './utils/musicManage.js'
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
import { dragArea } from './utils/devDrag.js'
import svgSprite from '@/static/svgSprite.js'

Vue.directive('drag', dragArea)
Vue.use(MusicManage)
Vue.use(svgSprite)

if (window.location.href.indexOf('debug') > 0) {
  let vConsole = new VConsole() // 初始化
}
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
