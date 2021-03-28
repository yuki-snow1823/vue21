import Vue from 'vue';
import VueRouter from 'vue-router';
import { calendarRoutes } from '@/router/calendar/calendar';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      title: 'home',
    },
  },
  ...calendarRoutes,
  {
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
    meta: {
      title: 'profile',
    },
  },
  {
    path: '/share',
    name: 'share',
    component: () =>
      import(/* webpackChunkName: "share" */ '@/views/Share.vue'),
    meta: {
      title: 'share',
    },
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () =>
      import(/* webpackChunkName: "signIn" */ '@/views/SignIn.vue'),
    meta: {
      title: 'sign-in',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach(to => {
  if (!to.meta.title) {
    return;
  }

  document.title = to.meta.title;
});

router.beforeEach((to, from, next) => {
  if (to.path === '/sign-in') {
    next();
    return;
  }

  if (store.getters['profile/profile']) {
    next();
    return;
  }

  next('/sign-in');
});

export default router;
