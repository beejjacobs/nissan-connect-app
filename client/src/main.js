// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import NissanConnectApi from './plugins/nissan-connect-api';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#b40124',
    secondary: '#4c4c4c',
    accent: '#246899'
  }
});
Vue.use(NissanConnectApi, {hostPort: '192.168.0.2:3001'});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
