import Vue from 'vue';
import Vuex from 'vuex';
import axiosInstance from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    },
    signOut: (state) => {
      state.user = null;

      localStorage.removeItem('jwtacc');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      delete axiosInstance.defaults.headers.jwtacc;
    },
  },
});
