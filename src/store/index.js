import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './actions-type';
import home from './modules/home';
import detail from './modules/detail';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    ajaxToken: [],
  },
  mutations: {
    // 发布订阅
    [types.PUSH_TOKEN](state, cancel) {
      state.ajaxToken = [...state.ajaxToken, cancel];
    },
    [types.CLEAR_TOKEN](state, cancel) {
      state.ajaxToken.forEach((cancel) => cancel());
    },
  },
  actions: {},
  modules: {
    home,
    detail,
  },
});
