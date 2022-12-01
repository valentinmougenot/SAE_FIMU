import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";
import VueAxios from "vue-axios";
import VueSession from "vue-session";

axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

var options = {
  persist: true
}
Vue.use(VueSession, options);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
