import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/styles/index.scss';

import config from './utils/config';

Vue.prototype.$config = config;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
