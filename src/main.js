import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Meta from 'vue-meta'
import VueTranslate from 'vue-translate-plugin'

let VueCookie = require('vue-cookie')

Vue.config.productionTip = false
Vue.use(Meta)
Vue.use(VueCookie)
Vue.use(VueTranslate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
