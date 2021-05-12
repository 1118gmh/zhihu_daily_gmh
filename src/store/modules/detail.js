import { fetchDetail, fetchComments } from '@/api/detail';
import comment from './comment';
import * as types from '../actions-type';

export default {
  namespaced: true,
  state: {
    detail: {},
    comments: {},
  },
  mutations: {
    [types.SET_DETAIL](state, detail) {
      state.detail = detail;
    },
    [types.SET_COMMENTS](state, result) {
      state.comments = result;
    },
  },
  actions: {
    async [types.SET_DETAIL]({ commit }, id) {
      try {
        const detail = await fetchDetail(id);
        commit(types.SET_DETAIL, detail);
        return detail;
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async [types.SET_COMMENTS]({ commit }, id) {
      try {
        const result = await fetchComments(id);
        commit(types.SET_COMMENTS, result);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
  modules: {
    comment,
  },
};
