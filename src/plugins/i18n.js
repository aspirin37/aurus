import Vue from 'vue';
import VueI18n from 'vue-i18n';

import ru from '../locale/ru.json';
import en from '../locale/en.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: { ru, en },
  silentFallbackWarn: true,
});

export default i18n;
