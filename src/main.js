import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Meta from 'vue-meta'

let VueCookie = require('vue-cookie')

Vue.config.productionTip = false
Vue.use(Meta)
Vue.use(VueCookie)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
