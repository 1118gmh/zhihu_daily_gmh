import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible';
import filters from './utils/filters';
import '@/assets/css/reset.min.css';

Vue.config.productionTip = false;

for (const key in filters) {
  Vue.filter(key, filters[key]);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
