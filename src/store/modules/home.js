import { fetchContent } from '@/api/home';
import * as types from '../actions-type';

export default {
  namespaced: true,
  state: {
    date: '',
    todayNews: [],
    slides: [],
    items: [],
  },
  mutations: {
    [types.SET_CONTENT](state, content) {
      state.slides = content.top_stories;
      state.todayNews = content.stories;
      state.date = content.date;
      state.items.push({ date: content.date, stories: content.stories });
    },
  },
  actions: {
    async [types.SET_CONTENT]({ commit }) {
      try {
        const content = await fetchContent();
        commit(types.SET_CONTENT, content);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
