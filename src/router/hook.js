import store from '@/store';
import * as types from '@/store/actions-type';
import axios from '@/utils/ajaxRequest';

export default {
  cancelToken: (to, from, next) => {
    // 清除token
    store.commit(types.CLEAR_TOKEN); // 发布，清除所有请求
    next(); // 继续往下走
  },
  cancelLoading: (to, from, next) => {
    // 在清除token后，让loading模块隐藏
    axios.toast.hide();
    next(); // 继续往下走
  },
};
