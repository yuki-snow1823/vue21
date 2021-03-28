import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeComponent from '@/views/Home.vue';
import CalendarComponent from '@/views/Calendar.vue';
import ProfileComponent from '@/views/Profile.vue';
import ShareComponent from '@/views/Share.vue';
import SignInComponent from '@/views/SignIn.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
