import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    exact: true,
    name: 'AppLayout',
    component: () => import('@/components/app/AppLayout'),
    children: [{
      path: 'users',
      name: 'UserList',
      component: () => import('@/views/UserList'),
    }],
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue'),
  }, {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword.vue'),
  }, {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

export default router;
