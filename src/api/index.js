import axios from 'axios';
import app from '../main';
import store from '../store';
import appConfig from '../utils/config';

const axiosInstance = axios.create({
  baseURL: `${appConfig.API_BASE_URL}/`,
  withCredentials: true,
});

const jwtacc = localStorage.getItem('jwtacc');

if (jwtacc) {
  console.log(jwtacc);
  axiosInstance.defaults.headers.jwtacc = jwtacc;
}

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    app.$bvToast.toast(error.message, {
      title: 'Ошибка',
      variant: 'danger',
      solid: true,
      autoHideDelay: 15000,
    });
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    // eslint-disable-next-line prefer-destructuring
    const jwt = response.data.jwtacc;
    if (jwt) {
      localStorage.setItem('jwtacc', jwt);
      axiosInstance.defaults.headers.jwtacc = jwt;

      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }

      const user = await axiosInstance.get('main/getself');
      store.commit('setUser', user);
    }
    return response.data;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    // редиректы на страницу авторизации
    if (
      error.response.status === 401
      && app.$route.name !== 'SignIn'
      && app.$route.name !== 'EmailVerification'
      && app.$route.name !== 'PasswordReset'
    ) {
      // if (localStorage.getItem('jwtacc')) {
      //   store.commit('toggleSignOutModal', {
      //     isShown: true,
      //     text: 'Время сессии истекло, вы будете перенаправлены на страницу авторизации',
      //   });
      //   return null;
      // }
      app.$router.push('/sign-in');
    }

    // всплывашка с ошибками
    if (error.response.status !== 401) {
      const message = error.response.data && error.response.data.error
        ? error.response.data.error.message
        : error.message;

      app.$bvToast.toast(message, {
        title: 'Ошибка',
        variant: 'danger',
        solid: true,
        autoHideDelay: 15000,
      });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
