import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import vSelect from 'vue-select';
import Multiselect from 'vue-multiselect';
import VueJsonPretty from 'vue-json-pretty';

import App from './App.vue';
import router from './router';
import store from './store';
import http from './api';

import 'vue-select/dist/vue-select.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import '@/assets/styles/index.scss';

import config from './utils/config';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';

Vue.use(BootstrapVue);
Vue.use(VueMoment, {
  moment,
});
Vue.moment.locale(localStorage.getItem('locale') || 'en');

Vue.component('vue-select', vSelect);
Vue.component('multiselect', Multiselect);
Vue.component('vue-json-pretty', VueJsonPretty);

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
