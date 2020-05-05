import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    component: () => import('@/views/auth/Auth.vue'),
    children: [{
      path: 'sign-in',
      name: 'SignIn',
      component: () => import('@/views/auth/SignIn.vue'),
    }, {
      path: 'sign-up',
      name: 'SignUp',
      component: () => import('@/views/auth/SignUp.vue'),
    }, {
      path: 'reset-password',
      name: 'ResetPassword',
      component: () => import('@/views/auth/ResetPassword.vue'),
    }, {
      path: 'change-password',
      name: 'ChangePassword',
      component: () => import('@/views/auth/ChangePassword.vue'),
    }],
  }, {
    path: '*',
    redirect: '/auth/sign-in',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

export default router;
