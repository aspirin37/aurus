import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const redirectIfNotAuthorized = (to, from, next) => {
  if (!localStorage.jwtacc || !localStorage.user) {
    next('/sign-in');
    return;
  }

  next();
};

const routes = [
  {
    path: '/',
    exact: true,
    name: 'AppLayout',
    component: () => import('@/components/app/AppLayout'),
    beforeEnter: redirectIfNotAuthorized,
    children: [{
      path: '',
      redirect: 'users',
    }, {
      path: 'users',
      name: 'UserList',
      component: () => import('@/views/UserList'),
    }, {
      path: 'orders/order-groups',
      name: 'OrderGroupList',
      component: () => import('@/views/OrderGroupList'),
    }, {
      path: 'orders/order-groups/:id',
      name: 'OrderGroup',
      props: true,
      component: () => import('@/views/OrderGroup'),
    }, {
      path: 'reports',
      name: 'ReportList',
      component: () => import('@/views/ReportList'),
    }, {
      path: 'emails',
      name: 'EmailList',
      component: () => import('@/views/EmailList'),
    }, {
      path: 'emails/:id',
      name: 'Email',
      props: true,
      component: () => import('@/views/Email'),
    }, {
      path: 'roles',
      name: 'RoleList',
      component: () => import('@/views/RoleList'),
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
