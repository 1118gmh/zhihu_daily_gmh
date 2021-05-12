import { fetchLongComments, fetchShortComments } from '@/api/comment';
import * as types from '../actions-type';

export default {
  namespaced: true,
  state: {
    longComments: [],
    shortComments: [],
    isLong: true,
    isShort: true,
    comment: 0,
  },
  mutations: {
    [types.SET_COMMENT](state, content) {
      state.longComments = content.longComments.comments;
      state.shortComments = content.shortComments.comments;
      state.isLong = content.longComments.comments.length !== 0;
      state.isShort = content.shortComments.comments.length !== 0;
      state.comment = content.longComments.comments.length + content.shortComments.comments.length;
    },
  },
  actions: {
    async [types.SET_COMMENT]({ commit }, id) {
      try {
        const longComments = await fetchLongComments(id);
        const shortComments = await fetchShortComments(id);
        commit(types.SET_COMMENT, { longComments, shortComments });
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
