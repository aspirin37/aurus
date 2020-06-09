import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import en from 'vuetify/es5/locale/en';
import i18n from './i18n';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    // dark: true,
    themes: {
      light: {
        primary: '#ad7c59',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: '#ad7c59',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    locales: { ru, en },
    current: i18n.locale,
  },
  icons: {
    iconfont: 'md',
  },
});
