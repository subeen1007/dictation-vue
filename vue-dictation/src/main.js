import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
// 컴포넌트에서 axios를 import 하지 않고 바로 쓰기 위한 전역 설정.
Vue.prototype.$http = axios
Vuex.Store.prototype.$http = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
