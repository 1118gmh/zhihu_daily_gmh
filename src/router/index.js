import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/index.vue';
import hooks from './hook';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: false,
    },
  }, {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/Detail/index.vue'),
    meta: {
      keepAlive: false,
    },
  }, {
    path: '/detail/:id/comment',
    name: 'comment',
    component: () => import('@/views/Comment/index.vue'),
    meta: {
      keepAlive: false,
    },
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '*',
    redirect: '/',
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'hash', // 由于没有后台的支持，无法对url中的id进行处理，则使用hash模式代替history模式，更方便，虽然比较丑
  base: process.env.BASE_URL,
  routes,
});

Object.values(hooks).forEach((hook) => {
  router.beforeEach(hook.bind(router));
});

export default router;
