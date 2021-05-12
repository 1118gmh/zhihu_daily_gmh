import axios from '@/utils/ajaxRequest';

export const fetchLongComments = (id) => axios.request({
  url: `/story/${id}/long-comments`,
});
export const fetchShortComments = (id) => axios.request({
  url: `/story/${id}/short-comments`,
});
