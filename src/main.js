import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import http from './api';

import '@/assets/styles/index.scss';

import config from './utils/config';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';

Vue.use(BootstrapVue);

Vue.prototype.$config = config;
Vue.prototype.$http = http;
Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  store,
  router,
  i18n,
  vuetify,
  render: (h) => h(App),
});

export default app;
