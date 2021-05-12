import axios from '@/utils/ajaxRequest';

export const fetchDetail = (id) => axios.request({
  url: `/news/${id}`,
});

export const fetchComments = (id) => axios.request({
  url: `/story-extra/${id}`,
});
