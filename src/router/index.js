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
      path: 'orders/nearest-shipment',
      name: 'NearestShipment',
      component: () => import('@/views/NearestShipment'),
    }, {
      path: 'orders/reports-by-part',
      name: 'ReportListByPart',
      component: () => import('@/views/ReportListByPart'),
    }, {
      path: 'orders/reports-by-parts',
      name: 'ReportListByParts',
      component: () => import('@/views/ReportListByParts'),
    }, {
      path: 'orders/history-by-days',
      name: 'HistoryByDays',
      component: () => import('@/views/HistoryByDays'),
    }, {
      path: 'orders/history-by-weeks',
      name: 'HistoryByWeeks',
      component: () => import('@/views/HistoryByWeeks'),
    }, {
      path: 'orders/promises',
      name: 'PromiseList',
      component: () => import('@/views/PromiseList'),
    }, {
      path: 'bulletins/board',
      name: 'BulletinBoard',
      component: () => import('@/views/bulletins/BulletinBoard'),
    }, {
      path: 'bulletins/board/:id',
      name: 'BulletinDetails',
      props: true,
      component: () => import('@/views/bulletins/BulletinDetails'),
    }, {
      path: 'bulletins/list',
      name: 'BulletinList',
      component: () => import('@/views/bulletins/BulletinList'),
    }, {
      path: 'bulletins/list/create',
      name: 'BulletinCreation',
      component: () => import('@/views/bulletins/BulletinCreation'),
    }, {
      path: 'emails',
      name: 'EmailList',
      component: () => import('@/views/emails/EmailList'),
    }, {
      path: 'emails/:id',
      name: 'Email',
      props: true,
      component: () => import('@/views/emails/Email'),
    }, {
      path: 'roles',
      name: 'RoleList',
      component: () => import('@/views/RoleList'),
    }, {
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/Profile'),
    }, {
      path: 'labels/print',
      name: 'LabelPrinting',
      component: () => import('@/views/labels/LabelPrinting'),
    }, {
      path: 'labels/template',
      name: 'LabelTemplate',
      component: () => import('@/views/labels/LabelTemplate'),
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
